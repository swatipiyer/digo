import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Download, Share2, Copy, Image as ImageIcon, Users, Linkedin,
  Twitter, Instagram, Mail, FileText, Palette, ArrowLeft,
  Check, Upload, X, ExternalLink
} from 'lucide-react';
import Header from '../components/Header';
import SpeakerPhotoEditor from '../components/SpeakerPhotoEditor';
import {
  getMediaKit,
  saveMediaKit,
  getSpeakers,
  createDefaultMediaKit,
  validateImageFile,
  compressImage,
  convertFileToBase64
} from '../utils/photoStorage';
import {
  generateMediaKitPackage,
  downloadMediaKitJSON,
  downloadAsset,
  downloadSpeakerPhoto,
  copyToClipboard
} from '../utils/mediaKitGenerator';
import { createTrackableShortUrl } from '../utils/urlShortener';

export default function MediaKitPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [mediaKit, setMediaKit] = useState(null);
  const [speakers, setSpeakers] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState('linkedin');
  const [selectedRole, setSelectedRole] = useState('organizer');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [editingSpeaker, setEditingSpeaker] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  // Load event and media kit data
  useEffect(() => {
    // Get event from data
    const eventData = getEventData(eventId);
    setEvent(eventData);

    // Load or create media kit
    let kit = getMediaKit(eventId);
    if (!kit && eventData) {
      kit = createDefaultMediaKit(eventData);
      saveMediaKit(eventId, kit);
    }
    setMediaKit(kit);
    setLogoPreview(kit?.logo);
    setBannerPreview(kit?.banner);

    // Load speakers
    const allSpeakers = getSpeakers();
    const eventSpeakers = eventData?.speakers?.map(es => {
      const saved = allSpeakers.find(s => s.id === es.id || s.name === es.name);
      return saved || { ...es, photoUrl: es.avatar };
    }) || [];
    setSpeakers(eventSpeakers);
  }, [eventId]);

  const updateMediaKit = (updates) => {
    const updated = { ...mediaKit, ...updates };
    setMediaKit(updated);
    saveMediaKit(eventId, updated);
  };

  const showSuccessToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      validateImageFile(file);
      const base64 = await convertFileToBase64(file);
      const compressed = await compressImage(base64);
      setLogoPreview(compressed);
      updateMediaKit({ logo: compressed });
      showSuccessToast('Logo uploaded successfully!');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleBannerUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      validateImageFile(file);
      const base64 = await convertFileToBase64(file);
      const compressed = await compressImage(base64, 1200);
      setBannerPreview(compressed);
      updateMediaKit({ banner: compressed });
      showSuccessToast('Banner uploaded successfully!');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDownloadFullKit = () => {
    const kitPackage = generateMediaKitPackage(event, mediaKit, speakers);
    downloadMediaKitJSON(kitPackage, event.name);
    showSuccessToast('Media kit downloaded!');
  };

  const handleCopyShareableLink = async () => {
    const baseUrl = `${window.location.origin}/events/${eventId}/media-kit`;
    try {
      const shortUrl = await createTrackableShortUrl(baseUrl, {
        source: 'media_kit',
        medium: 'share',
        campaign: event.name
      });
      await copyToClipboard(shortUrl || baseUrl);
      updateMediaKit({ shareableUrl: shortUrl || baseUrl, isPublic: true });
      showSuccessToast('Link copied to clipboard!');
    } catch (error) {
      await copyToClipboard(baseUrl);
      showSuccessToast('Link copied to clipboard!');
    }
  };

  const handleCopyTemplate = async (template) => {
    const success = await copyToClipboard(template);
    if (success) {
      showSuccessToast('Template copied to clipboard!');
    } else {
      alert('Failed to copy. Please try again.');
    }
  };

  const getSocialTemplate = () => {
    const templates = {
      linkedin: {
        organizer: `🎤 Excited to announce our upcoming event: ${event?.name}!\n\n📅 ${event?.date}\n📍 ${event?.location}\n\nJoin us for an incredible lineup of speakers and sessions.\n\nRegister now: [Link]\n\n#${event?.name?.replace(/\s+/g, '')} #TechEvents #Community`,
        speaker: `I'm thrilled to be speaking at ${event?.name}!\n\n📅 ${event?.date}\n📍 ${event?.location}\n\nI'll be sharing insights on [Your Topic]. Hope to see you there!\n\nRegister: [Link]\n\n#${event?.name?.replace(/\s+/g, '')} #Speaking`,
        attendee: `Looking forward to attending ${event?.name}!\n\n📅 ${event?.date}\n📍 ${event?.location}\n\nGreat lineup of speakers and content. See you there!\n\n#${event?.name?.replace(/\s+/g, '')}`
      },
      twitter: {
        organizer: `🎤 ${event?.name} - ${event?.date}\n\n📍 ${event?.location}\n\nAmazing speakers, incredible content. Register now! 🎟️\n\n[Link]\n\n#${event?.name?.replace(/\s+/g, '')}`,
        speaker: `Excited to speak at ${event?.name}! ${event?.date} 🎤\n\nJoin me to learn about [Topic] 💡\n\nRegister: [Link]`,
        attendee: `Can't wait for ${event?.name}! ${event?.date} 🎉\n\nSee you there! #${event?.name?.replace(/\s+/g, '')}`
      },
      instagram: {
        organizer: `🎤 ${event?.name}\n📅 ${event?.date}\n📍 ${event?.location}\n\n✨ Register now - link in bio!\n\n#${event?.name?.replace(/\s+/g, '')} #TechEvents`,
        speaker: `Speaking at ${event?.name}! 🎤\n${event?.date}\n\nSee you there! ✨\n\n#${event?.name?.replace(/\s+/g, '')}`,
        attendee: `Attending ${event?.name}! 🎉\n${event?.date}\n\n#${event?.name?.replace(/\s+/g, '')}`
      },
      email: {
        organizer: `Subject: You're Invited: ${event?.name}\n\nHello,\n\nWe're excited to invite you to ${event?.name}, taking place on ${event?.date} at ${event?.location}.\n\nJoin us for an incredible day of learning, networking, and inspiration.\n\nRegister here: [Link]\n\nBest regards,\n[Your Name]`,
        speaker: `Subject: Join me at ${event?.name}\n\nHi,\n\nI'm speaking at ${event?.name} on ${event?.date}, and I'd love for you to attend!\n\nI'll be presenting on [Your Topic] and would value your presence and insights.\n\nRegister: [Link]\n\nHope to see you there!\n[Your Name]`,
        attendee: `Subject: ${event?.name} - See you there!\n\nHi,\n\nI wanted to let you know I'm attending ${event?.name} on ${event?.date}.\n\nThe lineup looks amazing! Will I see you there?\n\nRegister: [Link]\n\nBest,\n[Your Name]`
      }
    };

    return templates[selectedPlatform]?.[selectedRole] || '';
  };

  if (!event || !mediaKit) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-gray-600">Loading media kit...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Link */}
        <Link
          to={`/events/${eventId}`}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Event
        </Link>

        {/* Hero Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{event.name}</h1>
                  <p className="text-sm text-gray-600 mt-1">Media Kit</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span>📅 {event.date}</span>
                <span>📍 {event.location}</span>
              </div>
              <p className="text-gray-700 max-w-3xl">{mediaKit.description || event.description}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleDownloadFullKit}
                className="flex items-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Kit
              </button>
              <button
                onClick={handleCopyShareableLink}
                className="flex items-center gap-2 px-4 py-3 border border-gray-200 bg-white text-gray-900 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Copy Link
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Brand Assets Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5 text-teal-600" />
                Brand Assets
              </h2>

              <div className="space-y-6">
                {/* Logo Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Organization Logo
                  </label>
                  {logoPreview && (
                    <div className="mb-3 relative inline-block">
                      <img
                        src={logoPreview}
                        alt="Logo"
                        className="h-20 object-contain border border-gray-200 rounded-lg p-2 bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => downloadAsset(logoPreview, `${event.name}_logo.png`)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center hover:bg-teal-700 transition-colors"
                      >
                        <Download className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                  />
                </div>

                {/* Banner Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Event Banner (Recommended: 1200x400px)
                  </label>
                  {bannerPreview && (
                    <div className="mb-3 relative inline-block max-w-full">
                      <img
                        src={bannerPreview}
                        alt="Banner"
                        className="w-full h-32 object-cover border border-gray-200 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => downloadAsset(bannerPreview, `${event.name}_banner.jpg`)}
                        className="absolute top-2 right-2 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center hover:bg-teal-700 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBannerUpload}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                  />
                </div>

                {/* Color Palette */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Primary Color
                    </label>
                    <input
                      type="color"
                      value={mediaKit.primaryColor}
                      onChange={(e) => updateMediaKit({ primaryColor: e.target.value })}
                      className="w-full h-12 border border-gray-200 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Secondary Color
                    </label>
                    <input
                      type="color"
                      value={mediaKit.secondaryColor}
                      onChange={(e) => updateMediaKit({ secondaryColor: e.target.value })}
                      className="w-full h-12 border border-gray-200 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Speaker Lineup Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-teal-600" />
                  Speaker Lineup ({speakers.length})
                </h2>
              </div>

              {speakers.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {speakers.map((speaker) => (
                    <div
                      key={speaker.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all"
                    >
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className="w-20 h-20 bg-gray-900 rounded-xl overflow-hidden">
                          {speaker.photoUrl ? (
                            <img
                              src={speaker.photoUrl}
                              alt={speaker.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white font-bold text-2xl">
                              {speaker.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="w-full">
                          <p className="text-sm font-bold text-gray-900">{speaker.name}</p>
                          {speaker.title && (
                            <p className="text-xs text-gray-600 mt-0.5">{speaker.title}</p>
                          )}
                          <p className="text-xs text-gray-600">{speaker.company}</p>
                        </div>
                        <div className="flex gap-2 w-full">
                          {speaker.photoUrl && (
                            <button
                              onClick={() => downloadSpeakerPhoto(speaker)}
                              className="flex-1 px-3 py-1.5 text-xs bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                              <Download className="w-3 h-3 inline mr-1" />
                              Photo
                            </button>
                          )}
                          <button
                            onClick={() => setEditingSpeaker(speaker)}
                            className="flex-1 px-3 py-1.5 text-xs bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-600">No speakers added yet</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Social Media Templates */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Social Templates</h2>

              {/* Platform Tabs */}
              <div className="flex gap-2 mb-4 flex-wrap">
                {[
                  { id: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
                  { id: 'twitter', icon: Twitter, label: 'Twitter' },
                  { id: 'instagram', icon: Instagram, label: 'Instagram' },
                  { id: 'email', icon: Mail, label: 'Email' }
                ].map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedPlatform === platform.id
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                  >
                    <platform.icon className="w-4 h-4" />
                    {platform.label}
                  </button>
                ))}
              </div>

              {/* Role Selector */}
              <div className="flex gap-2 mb-4">
                {['organizer', 'speaker', 'attendee'].map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${selectedRole === role
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                  >
                    {role}
                  </button>
                ))}
              </div>

              {/* Template Display */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-3">
                <pre className="text-xs text-gray-700 whitespace-pre-wrap font-sans">
                  {getSocialTemplate()}
                </pre>
              </div>

              <button
                onClick={() => handleCopyTemplate(getSocialTemplate())}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 text-white rounded-lg font-medium text-sm hover:bg-teal-700 transition-colors"
              >
                <Copy className="w-4 h-4" />
                Copy Template
              </button>
            </div>

            {/* Event Info */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Event Details</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-semibold text-gray-900">Date:</span>{' '}
                  <span className="text-gray-600">{event.date}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Location:</span>{' '}
                  <span className="text-gray-600">{event.location}</span>
                </div>
                {event.venue && (
                  <div>
                    <span className="font-semibold text-gray-900">Venue:</span>{' '}
                    <span className="text-gray-600">{event.venue}</span>
                  </div>
                )}
                {event.category && (
                  <div>
                    <span className="font-semibold text-gray-900">Category:</span>{' '}
                    <span className="text-gray-600">{event.category}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Speaker Photo Editor Modal */}
      {editingSpeaker && (
        <SpeakerPhotoEditor
          speaker={editingSpeaker}
          onUpdate={(updatedSpeaker) => {
            setSpeakers(speakers.map(s => s.id === updatedSpeaker.id ? updatedSpeaker : s));
          }}
          onClose={() => setEditingSpeaker(null)}
        />
      )}

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-grow-in">
          <div className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
            <p className="text-sm font-medium">{toastMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to get event data (mimics existing pattern)
function getEventData(eventId) {
  // This would normally fetch from a centralized data source
  // For now, return a mock event
  return {
    id: eventId,
    name: 'Frontier AI & AI Agents',
    date: 'March 15, 2026',
    location: 'San Francisco, CA',
    venue: 'TechHub SF',
    category: 'Technology',
    description: 'Join us for an exploration of frontier AI and intelligent agent systems.',
    speakers: [
      {
        id: 'nayam',
        name: 'Nayam Rahman',
        company: 'Meta',
        topic: 'Superintelligence Labs',
        email: 'nayam@meta.com',
        twitter: 'nayamrahman',
        linkedin: 'https://linkedin.com/in/nayamrahman'
      }
    ]
  };
}
