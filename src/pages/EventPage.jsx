import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Mic,
  Briefcase,
  FileText,
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
  CheckCircle,
  Copy,
  Linkedin,
  Instagram,
  ArrowLeft,
  UserPlus,
  Send,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Edit3,
  Star,
  Plus,
  Trash2,
  Radio,
  ClipboardList,
  Hand,
  Upload,
} from 'lucide-react';
import XLogo from '../components/XLogo';
import { getEvent } from '../data/eventData';
import MessagingModal from '../components/MessagingModal';
import { generateShareTemplates, getPlatformTemplateCount } from '../utils/shareTemplates';
import { createTrackableShortUrl } from '../utils/urlShortener';

function formatEventDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

// Map old stage names to new ones for backwards compat
function normalizeStage(stage) {
  if (stage === 'planning') return 'before';
  if (stage === 'livestream') return 'during';
  if (stage === 'summary') return 'after';
  return stage || 'after';
}

export default function EventPage() {
  const { eventId } = useParams();
  const event = getEvent(eventId);
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [messagingRecipient, setMessagingRecipient] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareRole, setShareRole] = useState('attendee');
  const [sharePlatform, setSharePlatform] = useState('linkedin');
  const [templateIndex, setTemplateIndex] = useState(0);
  const [shortUrl, setShortUrl] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    attendees: '',
    message: ''
  });
  const [isGeneratingUrl, setIsGeneratingUrl] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [eventResourceIndex, setEventResourceIndex] = useState(0);
  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [summaryText, setSummaryText] = useState('');
  const [isEditingAgenda, setIsEditingAgenda] = useState(false);
  const [agendaSessions, setAgendaSessions] = useState([]);
  const [eventStage, setEventStage] = useState(normalizeStage(event?.stage));
  const [volunteers, setVolunteers] = useState([
    { id: 1, role: 'Note Taker', name: 'Alex M.', status: 'filled' },
  ]);
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);
  const [volunteerName, setVolunteerName] = useState('');
  const [volunteerRole, setVolunteerRole] = useState('');

  // Persist comments & volunteers to localStorage
  useEffect(() => {
    if (!event) return;
    const saved = localStorage.getItem(`digo_event_${eventId}`);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.comments) setComments(data.comments);
        if (data.volunteers) setVolunteers(data.volunteers);
        if (data.isFollowing) setIsFollowing(data.isFollowing);
      } catch { /* ignore */ }
    }
  }, [eventId]);

  useEffect(() => {
    if (!event) return;
    localStorage.setItem(`digo_event_${eventId}`, JSON.stringify({
      comments,
      volunteers,
      isFollowing,
    }));
  }, [comments, volunteers, isFollowing, eventId]);

  // Scroll to hash section on navigation (e.g. #agenda)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  }, []);

  // Initialize editable agenda from event sessions
  useEffect(() => {
    if (event?.sessions && agendaSessions.length === 0) {
      setAgendaSessions(event.sessions.map(s => ({ ...s })));
    }
  }, [event]);

  // Generate AI summary from event data
  useEffect(() => {
    if (event && !summaryText) {
      const speakerNames = (event.speakers || []).map(s => s.name).join(' and ');
      const sessionTopics = (event.sessions || []).slice(0, 3).map(s => s.title).join(', ');
      const generated = `${event.name} brought together industry leaders ${speakerNames ? `including ${speakerNames}` : ''} for an engaging exploration of cutting-edge topics. The event featured sessions on ${sessionTopics || 'various topics'}, offering attendees practical insights and hands-on experience. Hosted at ${event.location}, the event fostered meaningful connections and knowledge sharing across the community.`;
      setSummaryText(generated);
    }
  }, [event]);

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

  const getSpeaker = (speakerId) => event.speakers?.find((s) => s.id === speakerId);

  const sessionsSource = agendaSessions.length > 0 ? agendaSessions : (event.sessions || []);

  const updateSession = (index, field, value) => {
    setAgendaSessions(prev => prev.map((s, i) => i === index ? { ...s, [field]: value } : s));
  };

  const addSession = () => {
    setAgendaSessions(prev => [...prev, {
      id: `new-${Date.now()}`,
      slug: `new-${Date.now()}`,
      title: '',
      time: '',
      duration: '',
      type: 'talk',
      speakerId: null,
      description: '',
    }]);
  };

  const removeSession = (index) => {
    setAgendaSessions(prev => prev.filter((_, i) => i !== index));
  };

  const getCurrentTemplate = () => {
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
      showSuccessToast('Message copied to clipboard!');
    } catch (err) { /* */ }
  };

  const handleSharePlatform = (platform) => {
    const url = window.location.href;
    const urls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      x: `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(getTemplateText())}`,
      instagram: url
    };
    if (platform === 'instagram' || platform === 'email') {
      handleCopyMessage();
    } else if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=600');
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showSuccessToast('Link copied to clipboard!');
    } catch (err) { /* */ }
  };

  const handleAddToCalendar = () => {
    const eventDate = new Date(event.date);
    const eventTime = event.time?.split(' - ')[0] || '9:00 AM';
    const [hours, minutes] = eventTime.includes('PM') && !eventTime.includes('12')
      ? [parseInt(eventTime.split(':')[0]) + 12, parseInt(eventTime.split(':')[1])]
      : [parseInt(eventTime.split(':')[0]), parseInt(eventTime.split(':')[1])];
    eventDate.setHours(hours, minutes);
    const endDate = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000);
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:${eventDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z\nDTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z\nSUMMARY:${event.name}\nDESCRIPTION:${event.description}\nLOCATION:${event.location}\nEND:VEVENT\nEND:VCALENDAR`;
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

  const showSuccessToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleRequestAvailability = () => {
    setShowBookingModal(true);
  };

  const handleBookingFormChange = (field, value) => {
    setBookingForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitBookingRequest = (e) => {
    e.preventDefault();
    // Persist booking request
    const bookings = JSON.parse(localStorage.getItem('digo_venue_bookings') || '[]');
    bookings.push({
      id: Date.now(),
      ...bookingForm,
      eventName: event.name,
      venueName: event.location,
      eventDate: event.date,
      eventTime: event.time,
      eventType: 'event',
      status: 'pending',
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem('digo_venue_bookings', JSON.stringify(bookings));
    showSuccessToast(`Booking request sent! We'll get back to you soon at ${bookingForm.email}`);
    setShowBookingModal(false);
    setBookingForm({ name: '', email: '', date: '', time: '', attendees: '', message: '' });
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

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-tight">
          {event.name}
        </h1>

        {/* Date, time, and register */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            {formatEventDate(event.date)}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            {event.time}
          </span>
          {event.registrationUrl && (() => {
            const url = event.registrationUrl;
            let provider = { name: '', bg: 'bg-gray-900', hover: 'hover:bg-gray-800' };
            if (url.includes('lu.ma')) {
              provider = { name: 'Luma', bg: 'bg-[#FF5C35]', hover: 'hover:bg-[#e64e2d]' };
            } else if (url.includes('eventbrite')) {
              provider = { name: 'Eventbrite', bg: 'bg-[#D1410C]', hover: 'hover:bg-[#b8390a]' };
            } else if (url.includes('meetup.com')) {
              provider = { name: 'Meetup', bg: 'bg-[#ED1C40]', hover: 'hover:bg-[#d4193a]' };
            }
            return (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group/reg inline-flex items-center gap-1.5 px-3 py-1.5 ${provider.bg} ${provider.hover} text-white text-xs font-medium rounded-lg transition-all ml-auto`}
              >
                <span className="group-hover/reg:hidden">Register</span>
                <span className="hidden group-hover/reg:inline">Register on {provider.name || 'site'}</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            );
          })()}
        </div>

        {/* Event Stage Indicator — Before / During / After */}
        <div className="mb-8">
          <div className="flex items-center gap-0 bg-gray-100 rounded-xl p-1">
            {[
              { id: 'before', label: 'Before', icon: ClipboardList },
              { id: 'during', label: 'During', icon: Radio },
              { id: 'after', label: 'After', icon: Sparkles },
            ].map((stage) => {
              const Icon = stage.icon;
              const isActive = eventStage === stage.id;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setEventStage(stage.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {stage.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Event Agenda — shown in ALL views */}
            <section id="agenda">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Event Agenda</h2>
                {eventStage !== 'before' && (
                  <button
                    type="button"
                    onClick={() => setIsEditingAgenda(!isEditingAgenda)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    {isEditingAgenda ? 'Done' : 'Edit'}
                  </button>
                )}
              </div>

              {isEditingAgenda && eventStage !== 'before' ? (
                <div className="space-y-3">
                  {agendaSessions.map((session, idx) => (
                    <div key={session.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                      <div className="flex items-start gap-3">
                        <div className="flex-1 space-y-3">
                          <input
                            type="text"
                            value={session.title}
                            onChange={(e) => updateSession(idx, 'title', e.target.value)}
                            placeholder="Session title"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={session.time || ''}
                              onChange={(e) => updateSession(idx, 'time', e.target.value)}
                              placeholder="Time (e.g. 6:15 PM)"
                              className="w-32 px-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <input
                              type="text"
                              value={session.duration || ''}
                              onChange={(e) => updateSession(idx, 'duration', e.target.value)}
                              placeholder="Duration (e.g. 25 min)"
                              className="w-32 px-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <textarea
                            value={session.description || ''}
                            onChange={(e) => updateSession(idx, 'description', e.target.value)}
                            placeholder="Description"
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeSession(idx)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addSession}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Session
                  </button>
                </div>
              ) : eventStage === 'before' ? (
                /* BEFORE view — bare-bones placeholder agenda with empty slots */
                <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                  {sessionsSource.map((session) => {
                    const speaker = getSpeaker(session.speakerId);
                    return (
                      <Link
                        key={session.id}
                        to={`/events/${eventId}/sessions/${session.slug}/${eventStage}`}
                        className="block px-5 py-4 bg-gray-50/50 hover:bg-gray-100/60 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-0.5">
                          {session.time && (
                            <span className="text-xs text-gray-400 font-medium">{session.time}</span>
                          )}
                          {session.duration && (
                            <span className="text-xs text-gray-300">&middot; {session.duration}</span>
                          )}
                        </div>
                        <h3 className="text-base font-semibold text-gray-900">
                          {session.title || 'Untitled Session'}
                        </h3>
                        {speaker ? (
                          <p className="flex items-center gap-1.5 text-sm text-gray-400 mt-1">
                            <Mic className="w-3.5 h-3.5" />
                            {speaker.name}
                          </p>
                        ) : (
                          <p className="flex items-center gap-1.5 text-sm text-gray-300 mt-1 italic">
                            <Mic className="w-3.5 h-3.5" />
                            Speaker TBD
                          </p>
                        )}
                      </Link>
                    );
                  })}
                  {sessionsSource.length === 0 && (
                    <div className="px-5 py-8 text-center">
                      <p className="text-sm text-gray-400">No sessions planned yet</p>
                    </div>
                  )}
                </div>
              ) : (
                /* DURING / AFTER view — clickable agenda linking to session pages */
                <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                  {sessionsSource.map((session) => {
                    const speaker = getSpeaker(session.speakerId);
                    return (
                      <Link
                        key={session.id}
                        to={`/events/${eventId}/sessions/${session.slug}/${eventStage}`}
                        className="block px-5 py-4 hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex items-center gap-2 mb-0.5">
                          {session.time && (
                            <span className="text-xs text-gray-400 font-medium">{session.time}</span>
                          )}
                          {session.duration && (
                            <span className="text-xs text-gray-300">&middot; {session.duration}</span>
                          )}
                        </div>
                        <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {session.title}
                        </h3>
                        {speaker && (
                          <p className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                            <Mic className="w-3.5 h-3.5" />
                            {speaker.name}
                          </p>
                        )}
                      </Link>
                    );
                  })}
                  {sessionsSource.length === 0 && (
                    <div className="px-5 py-6 text-center text-sm text-gray-500">
                      No sessions yet.
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Volunteer — shown in Before */}
            {eventStage === 'before' && (
              <section>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-bold text-gray-900">Volunteer</h2>
                  <button
                    type="button"
                    onClick={() => setShowVolunteerForm(!showVolunteerForm)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                  >
                    <Hand className="w-3 h-3" />
                    Raise Hand
                  </button>
                </div>

                {/* Open roles */}
                <div className="space-y-1.5 mb-3">
                  {[
                    { role: 'Note Taker' },
                    { role: 'Photos' },
                    { role: 'Live Tweeter' },
                  ].map((item) => {
                    const filled = volunteers.find(v => v.role === item.role);
                    return (
                      <div key={item.role} className={`flex items-center justify-between px-3 py-2 rounded-md border ${filled ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'}`}>
                        <p className="text-xs font-medium text-gray-900">{item.role}</p>
                        {filled ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-[10px] font-medium">
                            <CheckCircle className="w-2.5 h-2.5" />
                            {filled.name}
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setVolunteers(prev => [...prev, { id: Date.now(), role: item.role, name: 'You', status: 'filled' }]);
                            }}
                            className="px-2 py-1 text-[10px] font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                          >
                            Sign up
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Custom volunteer form */}
                {showVolunteerForm && (
                  <div className="border border-gray-200 rounded-md p-3 bg-gray-50">
                    <p className="text-xs font-medium text-gray-900 mb-2">Volunteer for something else</p>
                    <div className="space-y-1.5">
                      <input
                        type="text"
                        value={volunteerName}
                        onChange={(e) => setVolunteerName(e.target.value)}
                        placeholder="Your name"
                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={volunteerRole}
                        onChange={(e) => setVolunteerRole(e.target.value)}
                        placeholder="What would you like to help with?"
                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (volunteerName.trim() && volunteerRole.trim()) {
                            setVolunteers(prev => [...prev, { id: Date.now(), role: volunteerRole, name: volunteerName, status: 'filled' }]);
                            setVolunteerName('');
                            setVolunteerRole('');
                            setShowVolunteerForm(false);
                          }
                        }}
                        className="px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-md hover:bg-gray-800 transition-colors"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* Featured Speakers — During & After show real info, Before shows placeholders */}
            {event.speakers && event.speakers.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Featured Speakers</h2>
                <div className="flex flex-wrap gap-6">
                  {event.speakers.map((speaker) => (
                    <button
                      key={speaker.id}
                      onClick={() => eventStage !== 'before' && setSelectedSpeaker(speaker)}
                      className={`flex flex-col items-center text-center group ${eventStage !== 'before' ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-2 ring-4 overflow-hidden ${
                        eventStage === 'before'
                          ? 'bg-gray-300 ring-gray-200'
                          : 'bg-gradient-to-br from-amber-700 to-amber-900 ring-amber-200/60'
                      }`}>
                        {eventStage === 'before' ? (
                          <span className="text-gray-500">{speaker.name.split(' ').map(n => n[0]).join('')}</span>
                        ) : speaker.photoUrl || speaker.avatar ? (
                          <img
                            src={speaker.photoUrl || speaker.avatar}
                            alt={speaker.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span>{speaker.name.split(' ').map(n => n[0]).join('')}</span>
                        )}
                      </div>
                      <p className={`text-sm font-semibold transition-colors ${
                        eventStage === 'before' ? 'text-gray-500' : 'text-gray-900 group-hover:text-blue-600'
                      }`}>
                        {speaker.name}
                      </p>
                      <p className="text-xs text-gray-500">{speaker.company}</p>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* About This Event */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">About This Event</h2>
              <div className="text-sm text-gray-600 leading-relaxed space-y-3">
                <p>{event.description}</p>
                {event.scheduleNote && (
                  <p>{event.scheduleNote}</p>
                )}
              </div>
            </section>

            {/* BEFORE view — bare-bones placeholders for content that will come later */}
            {eventStage === 'before' && (
              <>
                {/* Placeholder: Resources coming soon */}
                <section>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg px-6 py-10 text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Video className="w-6 h-6 text-gray-300" />
                    </div>
                    <p className="text-sm text-gray-400 font-medium">Videos & slides will appear here after the event</p>
                  </div>
                </section>

                {/* Placeholder: Summary coming soon */}
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Event Summary</h2>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg px-6 py-10 text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Sparkles className="w-6 h-6 text-gray-300" />
                    </div>
                    <p className="text-sm text-gray-400 font-medium">An AI-generated summary will appear here after the event</p>
                  </div>
                </section>

                {/* Placeholder: Photos coming soon */}
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Photos</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
                        <Image className="w-8 h-8 text-gray-300" />
                      </div>
                    ))}
                  </div>
                </section>

                {/* Before stage info banner */}
                <section className="bg-blue-50 border border-blue-200 rounded-lg px-5 py-4">
                  <p className="text-sm text-blue-800 font-medium">This event hasn't happened yet. Finalize the agenda, confirm speakers, and recruit volunteers before the event goes live.</p>
                </section>
              </>
            )}

            {/* AI Summary — After stage only */}
            {eventStage === 'after' && <>
            <section id="summary">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-gray-900">Event Summary</h2>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-[10px] font-semibold">
                    <Sparkles className="w-3 h-3" />
                    AI Generated
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditingSummary(!isEditingSummary)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  {isEditingSummary ? 'Done' : 'Edit'}
                </button>
              </div>
              {isEditingSummary ? (
                <textarea
                  value={summaryText}
                  onChange={(e) => setSummaryText(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                />
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg px-5 py-4">
                  <p className="text-sm text-gray-700 leading-relaxed">{summaryText}</p>
                </div>
              )}
            </section>

            {/* Key Highlights */}
            {event.sessions && event.sessions.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Key Highlights</h2>
                <div className="grid gap-3">
                  {event.sessions.slice(0, 4).map((session) => (
                    <div key={session.id} className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                      <Star className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{session.title}</p>
                        <p className="text-xs text-gray-600 mt-0.5">{session.description?.slice(0, 120)}{session.description?.length > 120 ? '...' : ''}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            </>}

            {/* Resources Carousel — During and After */}
            {(eventStage === 'during' || eventStage === 'after') &&
            (() => {
              const eventResources = [
                ...(event.videos || []).map(v => ({ type: 'video', url: v.url, title: v.title || 'Recording' })),
                ...(event.presentations || []).map(p => ({ type: 'slides', url: p.url, title: p.title || 'Slides' })),
              ];
              if (eventResources.length === 0) return null;
              const current = eventResources[eventResourceIndex] || eventResources[0];
              return (
                <section>
                  {eventResources.length > 1 && (
                    <div className="flex items-center justify-end gap-2 mb-4">
                      <span className="text-xs text-gray-500">{eventResourceIndex + 1} / {eventResources.length}</span>
                        <button
                          type="button"
                          onClick={() => setEventResourceIndex(Math.max(0, eventResourceIndex - 1))}
                          disabled={eventResourceIndex === 0}
                          className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEventResourceIndex(Math.min(eventResources.length - 1, eventResourceIndex + 1))}
                          disabled={eventResourceIndex === eventResources.length - 1}
                          className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                  {current.type === 'video' ? (
                    <div className="rounded-lg overflow-hidden border border-gray-200">
                      <div className="aspect-video">
                        <iframe
                          src={current.url.includes('/embed/') ? current.url : current.url.replace('watch?v=', 'embed/')}
                          title={current.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      <div className="px-4 py-3 bg-gray-50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <PlayCircle className="w-4 h-4 text-red-600" />
                          <span className="text-sm font-medium text-gray-900">{current.title}</span>
                        </div>
                        <a
                          href={current.url.includes('/embed/') ? current.url.replace('/embed/', '/watch?v=') : current.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Open in YouTube
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="border border-gray-200 rounded-lg p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900">{current.title}</h4>
                          <a
                            href={current.url}
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
                  {eventResources.length > 1 && (
                    <div className="flex justify-center gap-1.5 mt-3">
                      {eventResources.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setEventResourceIndex(i)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            i === eventResourceIndex ? 'bg-gray-900' : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </section>
              );
            })()}

            {/* During stage info banner */}
            {eventStage === 'during' && (
              <section className="bg-red-50 border border-red-200 rounded-lg px-5 py-4 flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <p className="text-sm text-red-800 font-medium">This event is live. Resources and recordings will appear here during the event.</p>
              </section>
            )}

            {/* Photos — After stage only */}
            {eventStage === 'after' && event.photos && event.photos.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Photos</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {event.photos.map((photo, i) => (
                    <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              </section>
            )}

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
              {isFollowing ? 'Following' : 'Follow this Event'}
            </button>

            {/* Comments */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Comments ({comments.length})
              </h3>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 resize-none"
                rows={2}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handlePostComment}
                  disabled={!commentText.trim()}
                  className="px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Post
                </button>
              </div>
              {comments.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200 space-y-3 max-h-64 overflow-y-auto">
                  {comments.map((c) => (
                    <div key={c.id} className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600 flex-shrink-0">
                        {c.author[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs">
                          <span className="font-semibold text-gray-900">{c.author}</span>
                          <span className="text-gray-400 ml-1">{c.date}</span>
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5">{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="border border-gray-200 rounded-lg p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Actions</h3>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share Event
                </button>
                <button
                  type="button"
                  onClick={handleAddToCalendar}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  Add to Calendar
                </button>
                <button
                  type="button"
                  onClick={handleGetDirections}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </button>
                <Link
                  to={`/events/${eventId}/media-kit`}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Media Kit
                </Link>
                <button
                  type="button"
                  onClick={handleRequestAvailability}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  Request Availability
                </button>
              </div>
            </div>

            {/* Sponsors */}
            {event.sponsors && event.sponsors.length > 0 && (
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Sponsors</h3>
                <div className="space-y-2">
                  {event.sponsors.map((sponsor) => (
                    <div key={sponsor.id} className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{sponsor.name}</span>
                      <span className="text-xs text-gray-400">&middot; {sponsor.tier}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </aside>
        </div>
      </main>

      {/* Speaker Modal */}
      {selectedSpeaker && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedSpeaker(null)}>
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedSpeaker(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0 overflow-hidden ring-4 ring-amber-200/60">
                {selectedSpeaker.photoUrl || selectedSpeaker.avatar ? (
                  <img src={selectedSpeaker.photoUrl || selectedSpeaker.avatar} alt={selectedSpeaker.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{selectedSpeaker.name.split(' ').map(n => n[0]).join('')}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{selectedSpeaker.name}</h3>
                <p className="text-sm text-gray-600">{selectedSpeaker.company}</p>
                <p className="text-sm text-blue-600 font-medium mt-1">{selectedSpeaker.topic}</p>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <h4 className="text-sm font-bold text-gray-900">Contact Information</h4>
              <div className="space-y-2">
                {selectedSpeaker.email && (
                  <a href={`mailto:${selectedSpeaker.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    <Mail className="w-4 h-4" /> {selectedSpeaker.email}
                  </a>
                )}
                {selectedSpeaker.twitter && (
                  <a href={`https://x.com/${selectedSpeaker.twitter}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    <XLogo className="w-4 h-4" /> @{selectedSpeaker.twitter}
                  </a>
                )}
                {selectedSpeaker.linkedin && (
                  <a href={selectedSpeaker.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    <Linkedin className="w-4 h-4" /> LinkedIn Profile
                  </a>
                )}
              </div>
            </div>
            <button
              onClick={() => { setMessagingRecipient(selectedSpeaker); setSelectedSpeaker(null); }}
              className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium text-sm hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b border-gray-200 p-6 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">Share Event</h2>
              <button onClick={() => setShowShareModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
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
                        shareRole === role ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className={`w-6 h-6 mx-auto mb-2 ${shareRole === role ? 'text-blue-600' : 'text-gray-600'}`} />
                      <span className={`text-sm font-medium ${shareRole === role ? 'text-blue-600' : 'text-gray-900'}`}>{label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Platform:</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { platform: 'email', label: 'Email', icon: Mail, color: 'bg-gray-600' },
                    { platform: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'bg-[#0077B5]' },
                    { platform: 'x', label: 'X', icon: XLogo, color: 'bg-black' },
                    { platform: 'instagram', label: 'Instagram', icon: Instagram, color: 'bg-gradient-to-tr from-[#FCAF45] via-[#E1306C] to-[#C13584]' }
                  ].map(({ platform, label, icon: Icon, color }) => (
                    <button
                      key={platform}
                      onClick={() => { setSharePlatform(platform); setTemplateIndex(0); }}
                      className={`p-3 rounded-lg transition-all text-center ${
                        sharePlatform === platform ? `${color} text-white` : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-5 h-5 mx-auto mb-1" />
                      <span className="text-xs font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Template {templateIndex + 1} of {getPlatformTemplateCount(shareRole, sharePlatform)}
                  </label>
                  <div className="flex gap-2">
                    <button onClick={() => setTemplateIndex(Math.max(0, templateIndex - 1))} disabled={templateIndex === 0} className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
                      Prev
                    </button>
                    <button onClick={() => setTemplateIndex(Math.min(getPlatformTemplateCount(shareRole, sharePlatform) - 1, templateIndex + 1))} disabled={templateIndex >= getPlatformTemplateCount(shareRole, sharePlatform) - 1} className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
                      Next
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto">
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">{getTemplateText()}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { handleSharePlatform(sharePlatform); setShowShareModal(false); }}
                  className={`flex items-center justify-center gap-2 p-4 text-white rounded-lg hover:opacity-90 transition-all ${
                    sharePlatform === 'email' ? 'bg-gray-600' :
                    sharePlatform === 'linkedin' ? 'bg-[#0077B5]' :
                    sharePlatform === 'x' ? 'bg-black' :
                    'bg-gradient-to-r from-[#FCAF45] via-[#E1306C] to-[#C13584]'
                  }`}
                >
                  {sharePlatform === 'email' && <Mail className="w-5 h-5" />}
                  {sharePlatform === 'linkedin' && <Linkedin className="w-5 h-5" />}
                  {sharePlatform === 'x' && <XLogo className="w-5 h-5" />}
                  {sharePlatform === 'instagram' && <Instagram className="w-5 h-5" />}
                  <span className="font-medium">{sharePlatform === 'email' || sharePlatform === 'instagram' ? 'Copy' : 'Share'}</span>
                </button>
                <button
                  onClick={() => { handleCopyMessage(); setShowShareModal(false); }}
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

      {/* Booking Request Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b border-gray-200 p-6 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">Request Availability</h2>
              <button onClick={() => setShowBookingModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleSubmitBookingRequest} className="p-6 space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 mb-2">{event?.name}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>{event?.date}</span></div>
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span>{event?.location}</span></div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                  <input type="text" id="name" required value={bookingForm.name} onChange={(e) => handleBookingFormChange('name', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600" placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input type="email" id="email" required value={bookingForm.email} onChange={(e) => handleBookingFormChange('email', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600" placeholder="john@example.com" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">Preferred Date *</label>
                  <input type="date" id="date" required value={bookingForm.date} onChange={(e) => handleBookingFormChange('date', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600" />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">Preferred Time *</label>
                  <input type="time" id="time" required value={bookingForm.time} onChange={(e) => handleBookingFormChange('time', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600" />
                </div>
                <div>
                  <label htmlFor="attendees" className="block text-sm font-medium text-gray-700 mb-2"># of Attendees *</label>
                  <input type="number" id="attendees" required min="1" value={bookingForm.attendees} onChange={(e) => handleBookingFormChange('attendees', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600" placeholder="50" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Additional Details</label>
                <textarea id="message" rows="4" value={bookingForm.message} onChange={(e) => handleBookingFormChange('message', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 resize-none" placeholder="Tell us about your event needs..."></textarea>
              </div>
              <div className="flex gap-3">
                <button type="submit" className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all">Submit Request</button>
                <button type="button" onClick={() => setShowBookingModal(false)} className="px-6 py-3 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all">Cancel</button>
              </div>
              <p className="text-xs text-gray-500 text-center">We'll review your request and get back to you within 24 hours</p>
            </form>
          </div>
        </div>
      )}

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
