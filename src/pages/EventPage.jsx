import { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  Mic,
  Briefcase,
  FileText,
  ChevronRight,
  ExternalLink,
  MessageCircle,
  PlayCircle,
  Calendar,
  Video,
  Image,
  MapPin,
  Users,
  Share2,
  Download,
  Clock,
  X,
  Mail,
  Info,
  CheckCircle,
  Copy,
  Linkedin,
  Twitter,
  Instagram,
  Tag,
  X as XIcon,
} from 'lucide-react';
import { getEvent } from '../data/eventData';
import Header from '../components/Header';
import MessagingModal from '../components/MessagingModal';
import { generateShareTemplates, getPlatformTemplateCount } from '../utils/shareTemplates';
import { createTrackableShortUrl } from '../utils/urlShortener';

export default function EventPage() {
  const { eventId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const event = getEvent(eventId);
  const [activeSection, setActiveSection] = useState('about');
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [showShareToast, setShowShareToast] = useState(false);
  const [messagingRecipient, setMessagingRecipient] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareRole, setShareRole] = useState('attendee'); // 'attendee', 'speaker', 'organizer'
  const [sharePlatform, setSharePlatform] = useState('linkedin'); // 'email', 'linkedin', 'twitter', 'instagram'
  const [templateIndex, setTemplateIndex] = useState(0);
  const [shortUrl, setShortUrl] = useState(null);
  const [isGeneratingUrl, setIsGeneratingUrl] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);

  // Handle tag from URL params
  useEffect(() => {
    const tagParam = searchParams.get('tag');
    if (tagParam) {
      setSelectedTag(tagParam);
      // Scroll to sessions section
      setTimeout(() => {
        document.getElementById('sessions')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [searchParams]);

  // Get all unique tags from sessions
  const getAllTags = () => {
    if (!event?.sessions) return [];
    const tags = new Set();
    event.sessions.forEach(session => {
      if (session.tags) {
        session.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  };

  // Filter sessions by selected tag
  const getFilteredSessions = () => {
    if (!event?.sessions) return [];
    if (!selectedTag) return event.sessions;
    return event.sessions.filter(session =>
      session.tags && session.tags.includes(selectedTag)
    );
  };

  const allTags = getAllTags();
  const filteredSessions = getFilteredSessions();

  const handleTagClick = (tag) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
      setSearchParams({});
    } else {
      setSelectedTag(tag);
      setSearchParams({ tag });
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Event not found</h1>
          <p className="text-gray-600 mb-4">We couldn't find an event with that link.</p>
          <Link to="/" className="text-blue-600 font-medium hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  // Show all sections - always visible
  const sectionIds = ['speakers', 'event-details', 'sessions', 'videos', 'livestream', 'photos', 'sponsors'];

  const scrollToSection = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const getSpeaker = (speakerId) => event.speakers?.find((s) => s.id === speakerId);

  const getCurrentTemplate = () => {
    // Use shortened URL if available, otherwise use full URL
    const urlToUse = shortUrl || window.location.href;
    return generateShareTemplates(event, shareRole, sharePlatform, templateIndex, urlToUse);
  };

  const getTemplateText = () => {
    const template = getCurrentTemplate();
    if (sharePlatform === 'email' && template.body) {
      return `Subject: ${template.subject}\n\n${template.body}`;
    }
    return template;
  };

  const handleShare = async () => {
    setShowShareModal(true);

    // Generate shortened URL with UTM tracking if not already generated
    if (!shortUrl) {
      setIsGeneratingUrl(true);
      try {
        const url = window.location.href;
        const shortened = await createTrackableShortUrl(url, {
          source: shareRole,
          medium: sharePlatform,
          campaign: 'event_share'
        });
        setShortUrl(shortened);
      } catch (error) {
        console.error('Error generating short URL:', error);
        setShortUrl(window.location.href);
      } finally {
        setIsGeneratingUrl(false);
      }
    }
  };

  const handleCopyMessage = async () => {
    const message = getTemplateText();
    try {
      await navigator.clipboard.writeText(message);
      setToastMessage('Message copied to clipboard!');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error('Error copying:', err);
    }
  };

  const handleSharePlatform = (platform) => {
    const url = window.location.href;
    const urls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(getTemplateText())}`,
      instagram: url // Instagram doesn't support web sharing, just copy
    };

    if (platform === 'instagram' || platform === 'email') {
      handleCopyMessage();
    } else if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=600');
    }
  };

  const handleCopyLink = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setToastMessage('Link copied to clipboard!');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error('Error copying:', err);
    }
  };

  const handleAddToCalendar = () => {
    const eventDate = new Date(event.date);
    const eventTime = event.time?.split(' - ')[0] || '9:00 AM';
    const [hours, minutes] = eventTime.includes('PM') && !eventTime.includes('12')
      ? [parseInt(eventTime.split(':')[0]) + 12, parseInt(eventTime.split(':')[1])]
      : [parseInt(eventTime.split(':')[0]), parseInt(eventTime.split(':')[1])];

    eventDate.setHours(hours, minutes);
    const endDate = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours later

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${eventDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${event.name}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleGetDirections = () => {
    const query = encodeURIComponent(`${event.location}, ${event.address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const handleDownloadResources = () => {
    scrollToSection('videos');
  };

  const showSuccessToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleLivestreamRegister = () => {
    showSuccessToast('Successfully registered for livestream! You\'ll receive an email notification.');
  };

  const handleViewPhotos = () => {
    showSuccessToast('Photo gallery coming soon!');
  };

  const handleJoinGroup = (groupName) => {
    showSuccessToast(`Joined ${groupName}! Check your email for details.`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        {/* Hero with About and Speakers */}
        <section className="mb-3 sm:mb-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-3">
            {/* Left: Title and About */}
            <div className="lg:col-span-2">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-2 sm:mb-3">
                <div className="flex-1">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">{event.name}</h1>
                  {event.subtitle && (
                    <p className="text-sm sm:text-base text-gray-600">{event.subtitle}</p>
                  )}
                </div>
                {event.registrationUrl && (
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-900 text-white px-6 py-3 rounded-lg font-bold text-sm sm:text-base hover:shadow-lg transition-all hover:scale-105 active:scale-95 whitespace-nowrap self-start sm:self-auto text-center"
                >
                  Register Now
                </a>
                )}
              </div>

              {/* About moved below title */}
              <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4">
                <p className="text-sm text-gray-600 leading-relaxed">{event.description}</p>
              </div>
            </div>

            {/* Right: Featured Speakers */}
            <div className="lg:col-span-1">
              <div id="speakers" className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4">
                <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Mic className="w-4 h-4 text-blue-600" />
                  Featured Speakers
                </h2>
                {event.speakers && event.speakers.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {event.speakers.map((speaker) => (
                      <button
                        key={speaker.id}
                        onClick={() => setSelectedSpeaker(speaker)}
                        className="border border-gray-200 rounded-lg p-2 hover:border-gray-300 hover:shadow-sm transition-all text-left cursor-pointer group"
                      >
                        <div className="flex flex-col items-center text-center gap-2">
                          <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold text-base flex-shrink-0 relative overflow-hidden">
                            {speaker.photoUrl || speaker.avatar ? (
                              <img
                                src={speaker.photoUrl || speaker.avatar}
                                alt={speaker.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              speaker.name.charAt(0)
                            )}
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-growth rounded-full flex items-center justify-center">
                              <Info className="w-2.5 h-2.5 text-white" />
                            </div>
                          </div>
                          <div className="w-full">
                            <p className="text-xs font-bold text-gray-900 leading-tight">{speaker.name}</p>
                            <p className="text-xs text-gray-600 mt-0.5">{speaker.company}</p>
                            <p className="text-[10px] text-blue-600 mt-1 font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                              Click for details
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-600">No speakers listed</p>
                )}
              </div>
            </div>
          </div>

          {/* Navigation tabs - horizontal scroll on mobile */}
          {sectionIds.length > 0 && (
          <nav className="flex items-center gap-1.5 overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0 sm:flex-wrap">
            {sectionIds.map((id) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors capitalize whitespace-nowrap flex-shrink-0 ${
                  activeSection === id ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {id}
              </button>
            ))}
          </nav>
          )}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Left column - Outcomes, Sessions, etc */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">

            {/* Sessions */}
            <section id="sessions" className="scroll-mt-16 sm:scroll-mt-20">
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Sessions</h2>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Click a session to view details</p>

                {/* Tag Filter */}
                {allTags.length > 0 && (
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-semibold text-gray-900">Filter by topic:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleTagClick(tag)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            selectedTag === tag
                              ? 'bg-teal-600 text-white border-2 border-teal-600'
                              : 'bg-teal-50 text-teal-700 border-2 border-teal-200 hover:bg-teal-100'
                          }`}
                        >
                          {tag}
                          {selectedTag === tag && <XIcon className="w-3 h-3" />}
                        </button>
                      ))}
                      {selectedTag && (
                        <button
                          onClick={() => handleTagClick(selectedTag)}
                          className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900"
                        >
                          Clear filter
                        </button>
                      )}
                    </div>
                    {selectedTag && (
                      <p className="text-xs text-gray-600 mt-2">
                        Showing {filteredSessions.length} {filteredSessions.length === 1 ? 'session' : 'sessions'} with "{selectedTag}"
                      </p>
                    )}
                  </div>
                )}

                {filteredSessions && filteredSessions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredSessions.map((session) => {
                    const speaker = getSpeaker(session.speakerId);
                    return (
                      <Link
                        key={session.id}
                        to={`/events/${eventId}/sessions/${session.slug}`}
                        className="block border border-gray-200 rounded-lg p-3 hover:border-gray-300 hover:shadow-sm transition-all group h-full"
                      >
                        <div className="flex flex-col h-full">
                          <div className="flex items-center gap-1.5 mb-2">
                            <span className="text-xs font-medium text-gray-600">
                              {session.time}
                            </span>
                            <span className="px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-900">
                              {session.type}
                            </span>
                          </div>
                          <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight mb-1">
                            {session.title}
                          </h3>
                          {speaker && (
                            <p className="text-xs text-gray-600 mb-2">
                              {speaker.name}
                            </p>
                          )}

                          {/* Tags */}
                          {session.tags && session.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {session.tags.slice(0, 3).map((tag, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-teal-50 text-teal-700 border border-teal-200"
                                >
                                  {tag}
                                </span>
                              ))}
                              {session.tags.length > 3 && (
                                <span className="text-[10px] text-gray-500">+{session.tags.length - 3}</span>
                              )}
                            </div>
                          )}

                          {/* Available content icons */}
                          <div className="flex items-center gap-3 mt-auto pt-2 border-t border-gray-200/50">
                            {session.videoUrl && (
                              <div className="flex items-center gap-1 text-blue-600" title="Video available">
                                <Video className="w-3.5 h-3.5" />
                                <span className="text-xs">Video</span>
                              </div>
                            )}
                            {session.presentationUrl && (
                              <div className="flex items-center gap-1 text-blue-600" title="Slides available">
                                <FileText className="w-3.5 h-3.5" />
                                <span className="text-xs">Slides</span>
                              </div>
                            )}
                            {session.photos && session.photos.length > 0 && (
                              <div className="flex items-center gap-1 text-blue-600" title="Photos available">
                                <Image className="w-3.5 h-3.5" />
                                <span className="text-xs">Photos</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                ) : (
                  <p className="text-xs text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                )}
              </div>
            </section>

            {/* Videos & Slides - Side by side */}
            <section id="videos" className="scroll-mt-16 sm:scroll-mt-20">
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Resources</h2>
                {((event.videos && event.videos.length > 0) || (event.presentations && event.presentations.length > 0)) ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Videos */}
                  <div id="videos-content">
                    <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <Video className="w-4 h-4 text-blue-600" />
                      Videos
                    </h3>
                    {event.videos && event.videos.length > 0 ? (
                      <div className="space-y-2">
                        {event.videos.map((video) => (
                          <a
                            key={video.id}
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-all"
                          >
                            <div className="aspect-video bg-gray-100 relative flex items-center justify-center">
                              {video.thumbnail ? (
                                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-10 h-10 bg-forest/10 rounded-full flex items-center justify-center group-hover:bg-forest/20 transition-colors">
                                  <PlayCircle className="w-6 h-6 text-gray-900" />
                                </div>
                              )}
                            </div>
                            <div className="p-2">
                              <h4 className="text-xs font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{video.title}</h4>
                            </div>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-600 bg-mist rounded-lg p-3 text-center">No videos yet</p>
                    )}
                  </div>

                  {/* Slides */}
                  <div id="slides">
                    <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      Slides
                    </h3>
                    {event.presentations && event.presentations.length > 0 ? (
                      <div className="space-y-2">
                        {event.presentations.map((pres) => (
                          <a
                            key={pres.id}
                            href={pres.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-all"
                          >
                            <div className="aspect-video bg-gray-50 relative flex items-center justify-center">
                              {pres.thumbnail ? (
                                <img src={pres.thumbnail} alt={pres.title} className="w-full h-full object-cover" />
                              ) : (
                                <FileText className="w-8 h-8 text-gray-900/30" />
                              )}
                            </div>
                            <div className="p-2 flex items-center justify-between gap-2">
                              <h4 className="text-xs font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex-1">{pres.title}</h4>
                              <ExternalLink className="w-3 h-3 text-gray-600 group-hover:text-blue-600 flex-shrink-0" />
                            </div>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-600 bg-mist rounded-lg p-3 text-center">No slides yet</p>
                    )}
                  </div>
                </div>
                ) : (
                  <p className="text-xs text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                )}
              </div>
            </section>

            {/* Photos */}

            {/* Suggested Events - Next Steps - Hidden for now as it's placeholder content */}
            {false && (
            <section id="next-steps" className="scroll-mt-16 sm:scroll-mt-20">
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                  <Calendar className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600" />
                  Continue Your Journey
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Suggested events to deepen your learning</p>
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all group cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-gray-900">1</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600">Advanced AI Agents Workshop</h3>
                        <p className="text-xs text-gray-600 mt-1">Hands-on deep dive into production AI systems</p>
                        <p className="text-xs text-blue-600 font-medium mt-2">March 15, 2026</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-600 flex-shrink-0" />
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all group cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-gray-900">2</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600">ML Engineering Best Practices</h3>
                        <p className="text-xs text-gray-600 mt-1">Build scalable ML pipelines and deployment strategies</p>
                        <p className="text-xs text-blue-600 font-medium mt-2">April 2, 2026</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-600 flex-shrink-0" />
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all group cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-gray-900">3</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600">AI Safety & Ethics Summit</h3>
                        <p className="text-xs text-gray-600 mt-1">Responsible AI development and governance</p>
                        <p className="text-xs text-blue-600 font-medium mt-2">April 20, 2026</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-600 flex-shrink-0" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            )}
          </div>

          {/* Right column - Event Details, Quick Actions, Livestream & Sponsors */}
          <div className="space-y-3 sm:space-y-4">
            {/* Event Details */}
            <section id="event-details" className="scroll-mt-16 sm:scroll-mt-20">
              <div className="bg-gray-900 text-white rounded-lg p-2 sm:p-2.5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 flex-shrink-0 opacity-80" />
                    <p className="text-xs font-medium">{event.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 flex-shrink-0 opacity-80" />
                    <p className="text-xs font-medium">{event.time}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0 opacity-80" />
                    <p className="text-xs font-medium">{event.location}</p>
                  </div>
                  {event.attendees && (
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 flex-shrink-0 opacity-80" />
                    <p className="text-xs font-medium">{event.attendees} attending</p>
                  </div>
                  )}
                </div>
              </div>
            </section>

            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 bg-gray-100 text-gray-900 rounded-lg text-xs font-medium  hover:text-white transition-all active:scale-95"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button
                  type="button"
                  onClick={handleAddToCalendar}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 bg-gray-100 text-gray-900 rounded-lg text-xs font-medium  hover:text-white transition-all active:scale-95"
                >
                  <Calendar className="w-4 h-4" />
                  Add to Cal
                </button>
                <button
                  type="button"
                  onClick={handleDownloadResources}
                  className="flex items-center justify-center gap-2 px-3 py-2-5 bg-gray-100 text-gray-900 rounded-lg text-xs font-medium  hover:text-white transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  Resources
                </button>
                <button
                  type="button"
                  onClick={handleGetDirections}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 bg-gray-100 text-gray-900 rounded-lg text-xs font-medium  hover:text-white transition-all active:scale-95"
                >
                  <MapPin className="w-4 h-4" />
                  Directions
                </button>
                <Link
                  to={`/events/${eventId}/media-kit`}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 bg-gray-100 text-gray-900 rounded-lg text-xs font-medium  hover:text-white transition-all active:scale-95"
                >
                  <FileText className="w-4 h-4" />
                  Media Kit
                </Link>
              </div>

              {/* Share confirmation toast */}
              {showShareToast && (
                <div className="mt-3 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg text-center animate-grow-in">
                  Link copied to clipboard!
                </div>
              )}
            </div>

            {/* Livestream */}
            <section id="livestream" className="scroll-mt-16 sm:scroll-mt-20">
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Livestream
                </h2>
                {event.livestreamUrl ? (
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-soil/5">
                  <div className="aspect-video flex items-center justify-center">
                    <iframe
                      src={event.livestreamUrl}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                ) : (
                  <p className="text-xs text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</p>
                )}
              </div>
            </section>

            {/* Photos */}
            <section id="photos" className="scroll-mt-16 sm:scroll-mt-20">
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Image className="w-3.5 h-3.5 text-blue-600" />
                  Photos
                </h3>
                {event.photos && event.photos.length > 0 ? (
                <>
                <div className="grid grid-cols-2 gap-1.5">
                  {event.photos.slice(0, 2).map((photo, i) => (
                    <div
                      key={i}
                      className="aspect-square bg-gray-100 rounded overflow-hidden border border-gray-200 hover:border-gray-400 cursor-pointer transition-all group"
                    >
                      <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleViewPhotos}
                  className="w-full border border-gray-200 text-gray-900 py-1.5 px-2 rounded mt-2 text-xs font-medium hover:border-gray-400 hover:bg-gray-50 transition-all"
                >
                  View All
                </button>
                </>
                ) : (
                  <p className="text-xs text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                )}
              </div>
            </section>

            {/* Sponsors */}
            <section id="sponsors" className="scroll-mt-16 sm:scroll-mt-20">
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Sponsors</h2>
                {event.sponsors && event.sponsors.length > 0 ? (
                  <div className="space-y-3">
                    {event.sponsors.map((sponsor) => (
                      <div
                        key={sponsor.id}
                        className="border border-gray-200 rounded-lg p-3 flex items-center gap-3"
                      >
                        <Briefcase className="w-6 h-6 text-blue-600 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-base font-bold text-gray-900">{sponsor.name}</p>
                          <p className="text-sm text-gray-600">{sponsor.tier}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white mt-4 sm:mt-6 py-4">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 text-center">
          <Link to="/" className="text-sm font-medium text-gray-900 hover:text-blue-600">
            digo
          </Link>
        </div>
      </footer>

      {/* Speaker Modal */}
      {selectedSpeaker && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedSpeaker(null)}>
          <div className="bg-white rounded-xl max-w-md w-full p-6 animate-grow-in" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              onClick={() => setSelectedSpeaker(null)}
              className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Speaker info */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-gray-900 rounded-xl flex items-center justify-center text-white font-bold text-2xl flex-shrink-0 overflow-hidden">
                {selectedSpeaker.photoUrl || selectedSpeaker.avatar ? (
                  <img
                    src={selectedSpeaker.photoUrl || selectedSpeaker.avatar}
                    alt={selectedSpeaker.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  selectedSpeaker.name.charAt(0)
                )}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{selectedSpeaker.name}</h3>
                <p className="text-sm text-gray-600">{selectedSpeaker.company}</p>
                <p className="text-sm text-blue-600 font-medium mt-1">{selectedSpeaker.topic}</p>
              </div>
            </div>

            {/* Contact info */}
            <div className="space-y-3 mb-6">
              <h4 className="text-sm font-bold text-gray-900">Contact Information</h4>
              <div className="space-y-2">
                {selectedSpeaker.email && (
                  <a
                    href={`mailto:${selectedSpeaker.email}`}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    {selectedSpeaker.email}
                  </a>
                )}
                {selectedSpeaker.twitter && (
                  <a
                    href={`https://twitter.com/${selectedSpeaker.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    @{selectedSpeaker.twitter}
                  </a>
                )}
                {selectedSpeaker.linkedin && (
                  <a
                    href={selectedSpeaker.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    LinkedIn Profile
                  </a>
                )}
              </div>
            </div>

            {/* Message button */}
            <button
              onClick={() => {
                setMessagingRecipient(selectedSpeaker);
                setSelectedSpeaker(null);
              }}
              className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium text-sm hover:shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              Message {selectedSpeaker.name.split(' ')[0]}
            </button>
          </div>
        </div>
      )}

      {/* Messaging Modal */}
      {messagingRecipient && (
        <MessagingModal
          recipient={messagingRecipient}
          onClose={() => setMessagingRecipient(null)}
        />
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b border-gray-200 p-6 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">Share Event</h2>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Share as:</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { role: 'attendee', label: 'Attendee', icon: Users },
                    { role: 'speaker', label: 'Speaker', icon: Mic },
                    { role: 'organizer', label: 'Organizer', icon: Briefcase }
                  ].map(({ role, label, icon: Icon }) => (
                    <button
                      key={role}
                      onClick={() => { setShareRole(role); setTemplateIndex(0); }}
                      className={`p-4 rounded-lg border-2 transition-all text-center ${
                        shareRole === role
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className={`w-6 h-6 mx-auto mb-2 ${shareRole === role ? 'text-blue-600' : 'text-gray-600'}`} />
                      <span className={`text-sm font-medium ${shareRole === role ? 'text-blue-600' : 'text-gray-900'}`}>
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Platform Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Platform:</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { platform: 'email', label: 'Email', icon: Mail, color: 'bg-gray-600' },
                    { platform: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'bg-[#0077B5]' },
                    { platform: 'twitter', label: 'Twitter', icon: Twitter, color: 'bg-[#1DA1F2]' },
                    { platform: 'instagram', label: 'Instagram', icon: Instagram, color: 'bg-gradient-to-tr from-[#FCAF45] via-[#E1306C] to-[#C13584]' }
                  ].map(({ platform, label, icon: Icon, color }) => (
                    <button
                      key={platform}
                      onClick={() => { setSharePlatform(platform); setTemplateIndex(0); }}
                      className={`p-3 rounded-lg transition-all text-center ${
                        sharePlatform === platform
                          ? `${color} text-white`
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-5 h-5 mx-auto mb-1" />
                      <span className="text-xs font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Template Navigation */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Template {templateIndex + 1} of {getPlatformTemplateCount(shareRole, sharePlatform)}
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTemplateIndex(Math.max(0, templateIndex - 1))}
                      disabled={templateIndex === 0}
                      className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ← Prev
                    </button>
                    <button
                      onClick={() => setTemplateIndex(Math.min(getPlatformTemplateCount(shareRole, sharePlatform) - 1, templateIndex + 1))}
                      disabled={templateIndex >= getPlatformTemplateCount(shareRole, sharePlatform) - 1}
                      className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next →
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto">
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">{getTemplateText()}</p>
                </div>
              </div>

              {/* Share Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    handleSharePlatform(sharePlatform);
                    setShowShareModal(false);
                  }}
                  className={`flex items-center justify-center gap-2 p-4 text-white rounded-lg hover:opacity-90 transition-all ${
                    sharePlatform === 'email' ? 'bg-gray-600' :
                    sharePlatform === 'linkedin' ? 'bg-[#0077B5]' :
                    sharePlatform === 'twitter' ? 'bg-[#1DA1F2]' :
                    'bg-gradient-to-r from-[#FCAF45] via-[#E1306C] to-[#C13584]'
                  }`}
                >
                  {sharePlatform === 'email' && <Mail className="w-5 h-5" />}
                  {sharePlatform === 'linkedin' && <Linkedin className="w-5 h-5" />}
                  {sharePlatform === 'twitter' && <Twitter className="w-5 h-5" />}
                  {sharePlatform === 'instagram' && <Instagram className="w-5 h-5" />}
                  <span className="font-medium">
                    {sharePlatform === 'email' || sharePlatform === 'instagram' ? 'Copy' : 'Share'}
                  </span>
                </button>
                <button
                  onClick={() => {
                    handleCopyMessage();
                    setShowShareModal(false);
                  }}
                  className="flex items-center justify-center gap-2 p-4 border-2 border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all"
                >
                  <Copy className="w-5 h-5 text-gray-700" />
                  <span className="font-medium text-gray-900">Copy Text</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Success Toast */}
      {showToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-grow-in">
          <div className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <p className="text-sm font-medium">{toastMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}
