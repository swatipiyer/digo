import { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import XLogo from '../components/XLogo';
import {
  ArrowLeft,
  Clock,
  Video,
  FileText,
  ExternalLink,
  Mic,
  Star,
  Send,
  CheckCircle,
  MessageCircle,
  Linkedin,
  Share2,
  MapPin,
  UserPlus,
  Copy,
  PlayCircle,
  ChevronLeft,
  ChevronRight,
  Smile,
  Image,
  Plus,
  Upload,
  X,
  Calendar,
  Download,
  Trash2,
} from 'lucide-react';
import { getEvent, getSession, getSpeaker } from '../data/eventData';
import { copyToClipboard } from '../utils/mediaKitGenerator';
import { convertFileToBase64, compressImage } from '../utils/photoStorage';

function normalizeStage(stage) {
  if (stage === 'planning') return 'before';
  if (stage === 'livestream') return 'during';
  if (stage === 'summary') return 'after';
  return stage || 'after';
}

// localStorage helpers
const getSessionKey = (eventId, sessionSlug) => `digo_session_${eventId}_${sessionSlug}`;

function loadSessionData(eventId, sessionSlug) {
  try {
    const data = JSON.parse(localStorage.getItem(getSessionKey(eventId, sessionSlug)) || '{}');
    return {
      comments: data.comments || [],
      posts: data.posts || [],
      uploadedSlides: data.uploadedSlides || [],
      isFollowing: data.isFollowing || false,
    };
  } catch { return { comments: [], posts: [], uploadedSlides: [], isFollowing: false }; }
}

function saveSessionData(eventId, sessionSlug, data) {
  localStorage.setItem(getSessionKey(eventId, sessionSlug), JSON.stringify(data));
}

export default function SessionDetailPage() {
  const { eventId, sessionSlug, stage } = useParams();
  const event = getEvent(eventId);
  const session = getSession(eventId, sessionSlug);
  const speaker = session ? getSpeaker(eventId, session.speakerId) : null;
  const eventStage = stage && ['before', 'during', 'after'].includes(stage) ? stage : normalizeStage(event?.stage);

  // Load persisted data
  const persisted = session ? loadSessionData(eventId, sessionSlug) : { comments: [], posts: [], uploadedSlides: [], isFollowing: false };

  const [isFollowing, setIsFollowing] = useState(persisted.isFollowing);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(persisted.comments);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [resourceIndex, setResourceIndex] = useState(0);
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [posts, setPosts] = useState(persisted.posts);
  const [uploadedSlides, setUploadedSlides] = useState(persisted.uploadedSlides);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const postImageRef = useRef(null);
  const uploadRef = useRef(null);

  // Persist data on changes
  useEffect(() => {
    if (!session) return;
    saveSessionData(eventId, sessionSlug, {
      comments,
      posts,
      uploadedSlides,
      isFollowing,
    });
  }, [comments, posts, uploadedSlides, isFollowing, eventId, sessionSlug, session]);

  // Build resources array — includes both static event data resources + user-uploaded slides
  const resources = [];
  if (session) {
    if (session.videoUrl) {
      resources.push({ type: 'video', url: session.videoUrl, title: 'Recording' });
    }
    if (session.presentationUrl && session.presentationUrl !== '#') {
      resources.push({ type: 'slides', url: session.presentationUrl, title: session.presentationTitle || 'Slides' });
    }
    // Add user-uploaded slides
    uploadedSlides.forEach((slide) => {
      resources.push({ type: 'uploaded', ...slide });
    });
  }

  const showSuccessToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleLinkedInShare = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=600');
  };

  const handleXShare = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${session.title} at ${event.name}`);
    window.open(`https://x.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=600');
  };

  const handleCopyLink = async () => {
    const success = await copyToClipboard(window.location.href);
    if (success) {
      showSuccessToast('Link copied to clipboard!');
    }
  };

  const handlePostComment = () => {
    if (!commentText.trim()) return;
    setComments(prev => [...prev, {
      id: Date.now(),
      author: 'You',
      text: commentText,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    }]);
    setCommentText('');
  };

  const handlePublishPost = async () => {
    if (!postText.trim() && !postImage) return;
    let imageData = null;
    if (postImage) {
      try {
        imageData = await convertFileToBase64(postImage);
        imageData = await compressImage(imageData, 600, 0.7);
      } catch {
        imageData = null;
      }
    }
    setPosts(prev => [...prev, {
      id: Date.now(),
      author: 'Swati Iyer',
      text: postText,
      image: imageData,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    }]);
    setPostText('');
    setPostImage(null);
  };

  // Slide upload handler — converts to base64, stores in localStorage
  const handleSlideUpload = async (file) => {
    if (!file) return;
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'application/pdf',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'image/jpeg', 'image/png', 'image/webp', 'image/gif',
      'video/mp4', 'video/webm', 'video/quicktime',
    ];

    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|ppt|pptx|png|jpg|jpeg|gif|webp|mp4|webm|mov)$/i)) {
      showSuccessToast('Please upload photos, videos, slides, or documents');
      return;
    }
    if (file.size > maxSize) {
      showSuccessToast('File too large. Maximum size is 10MB.');
      return;
    }

    setIsUploading(true);
    try {
      let base64 = await convertFileToBase64(file);

      // Compress images
      if (file.type.startsWith('image/')) {
        base64 = await compressImage(base64, 1200, 0.85);
      }

      const slide = {
        id: `slide_${Date.now()}`,
        title: file.name.replace(/\.[^/.]+$/, ''),
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        dataUrl: base64,
        uploadedAt: new Date().toISOString(),
        uploadedBy: 'Swati Iyer',
      };

      setUploadedSlides(prev => [...prev, slide]);
      showSuccessToast(`"${slide.title}" uploaded successfully!`);
    } catch (err) {
      showSuccessToast('Upload failed. File may be too large for storage.');
    } finally {
      setIsUploading(false);
      if (uploadRef.current) uploadRef.current.value = '';
    }
  };

  const handleRemoveSlide = (slideId) => {
    setUploadedSlides(prev => prev.filter(s => s.id !== slideId));
    showSuccessToast('Slide removed');
  };

  const handleUploadDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleUploadDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleSlideUpload(e.dataTransfer.files[0]);
  };

  if (!event || !session) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Session not found</h1>
          <Link to={`/events/${eventId}`} className="text-blue-600 font-medium hover:underline">
            Back to event
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Back */}
        <Link
          to={`/events/${eventId}`}
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        {/* Title and speaker header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {session.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
              <p className="flex items-center gap-1.5 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              <p className="flex items-center gap-1.5 text-sm text-gray-500">
                <MapPin className="w-4 h-4" />
                {event.location || 'TBD'}
              </p>
            </div>
            {session.description && (
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">{session.description}</p>
            )}
          </div>
          {speaker && (
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg overflow-hidden ${
                eventStage === 'before'
                  ? 'bg-gray-300 ring-4 ring-gray-200 text-gray-500'
                  : 'bg-gradient-to-br from-amber-700 to-amber-900 ring-4 ring-amber-200/60 text-white'
              }`}>
                {eventStage === 'before' ? (
                  <span>{speaker.name.split(' ').map(n => n[0]).join('')}</span>
                ) : speaker.photoUrl || speaker.avatar ? (
                  <img src={speaker.photoUrl || speaker.avatar} alt={speaker.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{speaker.name.split(' ').map(n => n[0]).join('')}</span>
                )}
              </div>
              <div>
                <p className={`text-sm font-semibold ${eventStage === 'before' ? 'text-gray-500' : 'text-gray-900'}`}>{speaker.name}</p>
                <p className="text-xs text-gray-500">{speaker.company}</p>
              </div>
            </div>
          )}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Upload Content Section — moved up, always visible */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-900">
                  Upload content
                </h2>
                {uploadedSlides.length > 0 && (
                  <span className="text-xs text-gray-500">{uploadedSlides.length} file{uploadedSlides.length !== 1 ? 's' : ''} uploaded</span>
                )}
              </div>
              <div
                onDragEnter={handleUploadDrag}
                onDragLeave={handleUploadDrag}
                onDragOver={handleUploadDrag}
                onDrop={handleUploadDrop}
                onClick={() => !isUploading && uploadRef.current?.click()}
                className={`flex items-center justify-center gap-2 px-4 py-3 border border-dashed rounded-lg cursor-pointer transition-colors ${
                  isUploading ? 'border-blue-400 bg-blue-50 cursor-wait' :
                  dragActive ? 'border-gray-900 bg-gray-50' : 'border-gray-300 hover:border-gray-400 bg-white'
                }`}
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs font-medium text-blue-600">Uploading...</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 text-gray-400" />
                    <p className="text-xs font-medium text-gray-700">
                      Drop files or <span className="text-blue-600">browse</span>
                    </p>
                    <span className="text-[10px] text-gray-400 ml-1">Photos, videos, slides, files</span>
                  </>
                )}
                <input
                  ref={uploadRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.ppt,.pptx,.png,.jpg,.jpeg,.gif,.webp,.mp4,.webm,.mov"
                  onChange={(e) => { if (e.target.files?.[0]) handleSlideUpload(e.target.files[0]); }}
                />
              </div>

              {/* Uploaded files list */}
              {uploadedSlides.length > 0 && (
                <div className="mt-3 space-y-2">
                  {uploadedSlides.map((slide) => (
                    <div key={slide.id} className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {slide.fileType?.startsWith('image/') ? (
                          <Image className="w-4 h-4 text-green-600" />
                        ) : slide.fileType?.startsWith('video/') ? (
                          <Video className="w-4 h-4 text-green-600" />
                        ) : (
                          <FileText className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{slide.fileName}</p>
                        <p className="text-xs text-gray-500">{(slide.fileSize / 1024 / 1024).toFixed(2)} MB &middot; {new Date(slide.uploadedAt).toLocaleDateString()}</p>
                      </div>
                      <a
                        href={slide.dataUrl}
                        download={slide.fileName}
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleRemoveSlide(slide.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>


            {/* Livestream/Zoom — During only */}
            {eventStage === 'during' && (
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-3">Join Live</h2>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => window.open(session.livestreamUrl || '#', '_blank')}
                    className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Video className="w-4 h-4 text-red-600" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">Livestream</p>
                      <p className="text-xs text-gray-500">Watch the live broadcast</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                  </button>
                  <button
                    type="button"
                    onClick={() => window.open(session.zoomUrl || '#', '_blank')}
                    className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Video className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">Zoom</p>
                      <p className="text-xs text-gray-500">Join the video call</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                  </button>
                </div>
              </section>
            )}

            {/* Resources Carousel — After only */}
            {eventStage === 'after' && resources.length > 0 && (
              <section>
                {resources.length > 1 && (
                  <div className="flex items-center justify-end gap-2 mb-4">
                    <span className="text-xs text-gray-500">{resourceIndex + 1} / {resources.length}</span>
                      <button
                        type="button"
                        onClick={() => setResourceIndex(Math.max(0, resourceIndex - 1))}
                        disabled={resourceIndex === 0}
                        className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setResourceIndex(Math.min(resources.length - 1, resourceIndex + 1))}
                        disabled={resourceIndex === resources.length - 1}
                        className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                {resources[resourceIndex]?.type === 'video' ? (
                  <div className="rounded-lg overflow-hidden border border-gray-200">
                    <div className="aspect-video">
                      <iframe
                        src={resources[resourceIndex].url}
                        title={resources[resourceIndex].title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="px-4 py-3 bg-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <PlayCircle className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-medium text-gray-900">{resources[resourceIndex].title}</span>
                      </div>
                      <a
                        href={resources[resourceIndex].url.replace('/embed/', '/watch?v=')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Open in YouTube
                      </a>
                    </div>
                  </div>
                ) : resources[resourceIndex]?.type === 'uploaded' ? (
                  <div className="border border-gray-200 rounded-lg p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {resources[resourceIndex].fileType?.startsWith('image/') ? (
                          <Image className="w-6 h-6 text-green-600" />
                        ) : (
                          <FileText className="w-6 h-6 text-green-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900">{resources[resourceIndex].title}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Uploaded by {resources[resourceIndex].uploadedBy} &middot; {(resources[resourceIndex].fileSize / 1024 / 1024).toFixed(2)} MB
                        </p>
                        {resources[resourceIndex].fileType?.startsWith('image/') ? (
                          <img src={resources[resourceIndex].dataUrl} alt={resources[resourceIndex].title} className="mt-3 rounded-lg max-h-80 object-contain" />
                        ) : (
                          <a
                            href={resources[resourceIndex].dataUrl}
                            download={resources[resourceIndex].fileName}
                            className="text-sm text-blue-600 hover:underline flex items-center gap-1 mt-1"
                          >
                            <Download className="w-3 h-3" />
                            Download {resources[resourceIndex].fileName}
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-green-100 text-green-700">
                          {resources[resourceIndex].fileName?.split('.').pop()?.toUpperCase() || 'FILE'}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSlide(resources[resourceIndex].id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          title="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border border-gray-200 rounded-lg p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900">{resources[resourceIndex]?.title}</h4>
                        <a
                          href={resources[resourceIndex]?.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline flex items-center gap-1 mt-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          View slides
                        </a>
                      </div>
                      <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-blue-100 text-blue-700 flex-shrink-0">
                        PDF
                      </span>
                    </div>
                  </div>
                )}

                {/* Resource dots */}
                {resources.length > 1 && (
                  <div className="flex justify-center gap-1.5 mt-3">
                    {resources.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setResourceIndex(i)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          i === resourceIndex ? 'bg-gray-900' : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Comments - LinkedIn-style composer — During and After only */}
            {eventStage !== 'before' && <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Comments</h2>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="flex items-start gap-3 p-4">
                  <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    SI
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">Swati Iyer</p>
                    <p className="text-xs text-gray-500">Post to Anyone</p>
                  </div>
                </div>
                <div className="px-4">
                  <textarea
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    placeholder="What do you say?"
                    className="w-full text-sm text-gray-900 placeholder-gray-400 focus:outline-none resize-none min-h-[120px]"
                    rows={5}
                  />
                  {postImage && (
                    <div className="relative mb-3">
                      <img src={URL.createObjectURL(postImage)} alt="Attached" className="max-h-48 rounded-lg object-cover" />
                      <button
                        type="button"
                        onClick={() => { setPostImage(null); if (postImageRef.current) postImageRef.current.value = ''; }}
                        className="absolute top-2 right-2 w-6 h-6 bg-gray-900/70 text-white rounded-full flex items-center justify-center"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button type="button" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Smile className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => postImageRef.current?.click()}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Image className="w-5 h-5" />
                    </button>
                    <button type="button" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Plus className="w-5 h-5" />
                    </button>
                    <input
                      ref={postImageRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => { if (e.target.files?.[0]) setPostImage(e.target.files[0]); }}
                    />
                    <span className="text-xs text-gray-400 ml-2">{postText.length}/3000</span>
                  </div>
                  <button
                    type="button"
                    onClick={handlePublishPost}
                    disabled={!postText.trim() && !postImage}
                    className="px-5 py-2 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Post
                  </button>
                </div>
              </div>

              {/* Published posts */}
              {posts.length > 0 && (
                <div className="mt-4 space-y-4">
                  {posts.map((post) => (
                    <div key={post.id} className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          SI
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{post.author}</p>
                          <p className="text-xs text-gray-500">{post.date}</p>
                        </div>
                      </div>
                      {post.text && <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{post.text}</p>}
                      {post.image && <img src={post.image} alt="Post" className="mt-3 rounded-lg max-h-64 object-cover" />}
                    </div>
                  ))}
                </div>
              )}
            </section>}

            {/* Back to sessions */}
            <div className="pt-2">
              <Link
                to={`/events/${eventId}`}
                className="inline-flex items-center gap-2 text-sm text-blue-600 font-medium hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                View all sessions
              </Link>
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="space-y-4">
            {/* Follow button */}
            <button
              type="button"
              onClick={() => setIsFollowing(!isFollowing)}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                isFollowing
                  ? 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              {isFollowing ? 'Following' : 'Follow this Session'}
            </button>


            {/* Collaborators */}
            {speaker && (
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Collaborators</h3>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center text-white font-bold text-xs ring-2 ring-amber-200/60 overflow-hidden">
                    {speaker.photoUrl || speaker.avatar ? (
                      <img src={speaker.photoUrl || speaker.avatar} alt={speaker.name} className="w-full h-full object-cover" />
                    ) : (
                      <span>{speaker.name.split(' ').map(n => n[0]).join('')}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">{speaker.name}</p>
                    <p className="text-[10px] text-gray-500">{speaker.company}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Share */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopyLink}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy Link
              </button>
              <button
                onClick={handleXShare}
                className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <XLogo className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleLinkedInShare}
                className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </button>
            </div>
          </aside>
        </div>
      </main>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <p className="text-sm font-medium">{toastMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}
