import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Calendar, Users, DollarSign, FileText, Send, Plus, Download, Edit2, Trash2, Eye, Mail, Building, BarChart3, CheckCircle, Clock, MapPin, Search, Filter, UserPlus, Briefcase, Mic, ChevronDown, X, Bell, Sun, Moon, Heart, Share2, Bookmark, Globe, Tag, TrendingUp, Star, MessageCircle, Settings, Lock, Unlock } from 'lucide-react';
import EventPage from './pages/EventPage';
import SessionDetailPage from './pages/SessionDetailPage';
import DiscoverPage from './pages/DiscoverPage';
import GroupsPage from './pages/GroupsPage';
import CalendarPage from './pages/CalendarPage';
import OrganizationPage from './pages/OrganizationPage';
import OrganizationEventsPage from './pages/OrganizationEventsPage';
import EmailMakerPage from './pages/EmailMakerPage';
import VenueSubmissionPage from './pages/VenueSubmissionPage';
import VenueDiscoveryPage from './pages/VenueDiscoveryPage';
import AppTour from './components/AppTour';
import Header from './components/Header';

const PlanDashboard = () => {
  const [currentPage, setCurrentPage] = useState('organizers');
  const [currentRole, setCurrentRole] = useState('organizer');
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    // Check if user has completed the tour
    const tourCompleted = localStorage.getItem('digo_tour_completed');
    if (!tourCompleted) {
      // Show tour after a brief delay
      setTimeout(() => setShowTour(true), 500);
    }
  }, []);

  // Discover page data
  const [discoverEvents, setDiscoverEvents] = useState([
    { id: 1, name: 'AI Summit 2026', date: '2026-04-20', location: 'San Francisco', category: 'Technology', attendees: 500, image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400', organizer: 'Tech Collective', saved: false },
    { id: 2, name: 'Startup Pitch Night', date: '2026-03-28', location: 'Palo Alto', category: 'Networking', attendees: 150, image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400', organizer: 'Founder Hub', saved: true },
    { id: 3, name: 'Design Systems Conference', date: '2026-05-10', location: 'New York', category: 'Design', attendees: 300, image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400', organizer: 'Design Guild', saved: false },
    { id: 4, name: 'Web3 Builders Meetup', date: '2026-02-05', location: 'Miami', category: 'Technology', attendees: 200, image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400', organizer: 'Crypto Network', saved: false },
    { id: 5, name: 'Product Management Workshop', date: '2026-06-02', location: 'Seattle', category: 'Business', attendees: 80, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400', organizer: 'PM Circle', saved: true },
    { id: 6, name: 'Data Science Bootcamp', date: '2026-01-15', location: 'Austin', category: 'Technology', attendees: 120, image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400', organizer: 'Data Labs', saved: false },
  ]);

  // Groups page data
  const [groups, setGroups] = useState([
    { id: 1, name: 'Silicon Valley AI', members: 2450, events: 12, category: 'Technology', description: 'A community for AI enthusiasts and professionals in the Bay Area.', isPublic: true, joined: true },
    { id: 2, name: 'Startup Founders Network', members: 1820, events: 8, category: 'Business', description: 'Connect with fellow founders, share experiences, and grow together.', isPublic: true, joined: true },
    { id: 3, name: 'Women in Tech SF', members: 3200, events: 15, category: 'Community', description: 'Empowering women in technology through events, mentorship, and networking.', isPublic: true, joined: false },
    { id: 4, name: 'Design Thinkers', members: 980, events: 6, category: 'Design', description: 'For designers who love to think big and create beautiful experiences.', isPublic: true, joined: false },
    { id: 5, name: 'Crypto Builders Club', members: 1560, events: 10, category: 'Technology', description: 'Building the future of decentralized applications together.', isPublic: false, joined: false },
    { id: 6, name: 'Product Leaders Bay Area', members: 720, events: 4, category: 'Business', description: 'A private group for senior product managers and leaders.', isPublic: false, joined: true },
  ]);

  const [events, setEvents] = useState([
    {
      id: 1,
      slug: 'HkGjx',
      name: 'Frontier AI & AI Agents',
      date: '2025-03-15',
      location: 'Silicon Valley',
      status: 'completed',
      attendees: 178,
      registered: 210,
      sponsors: 2
    }
  ]);

  const [participants, setParticipants] = useState([
    { id: 1, name: 'Sarah Chen', email: 'sarah@example.com', role: 'Software Engineer', company: 'Meta', status: 'checked-in', eventId: 1 },
    { id: 2, name: 'Michael Rodriguez', email: 'michael@example.com', role: 'Founder', company: 'StartupXYZ', status: 'registered', eventId: 1 },
    { id: 3, name: 'Jessica Park', email: 'jessica@example.com', role: 'Student', company: 'Stanford', status: 'checked-in', eventId: 1 },
  ]);

  const [sponsors, setSponsors] = useState([
    { id: 1, name: 'Snowflake', tier: 'Platinum', amount: 10000, leads: 27, status: 'active', contact: 'Chad Walker' },
    { id: 2, name: 'TechEquity', tier: 'Gold', amount: 5000, leads: 18, status: 'active', contact: 'Sheena Meade' },
  ]);

  const [speakers, setSpeakers] = useState([
    { id: 1, name: 'Nayam Rahman', company: 'Meta', topic: 'Superintelligence Labs', status: 'confirmed' },
    { id: 2, name: 'Okhtay Khasmammadov', company: 'Snowflake', topic: 'AI Agent Building', status: 'confirmed' },
  ]);

  const [reportData, setReportData] = useState({
    eventName: '',
    eventDate: '',
    totalRegistered: '',
    totalAttended: '',
    targetAttendance: '',
    showUpRate: '',
    engineers: '',
    founders: '',
    students: '',
    dataScientists: '',
    socialMentions: '',
    impressions: '',
    linkedinPosts: '',
    videoViews: '',
    slideDownloads: '',
  });

  // Organizers Dashboard
  const OrganizersDashboard = () => {
    const [showCreateEvent, setShowCreateEvent] = useState(false);
    const [showCreateSession, setShowCreateSession] = useState(false);
    const [showInviteSpeaker, setShowInviteSpeaker] = useState(false);
    const [showInviteSponsors, setShowInviteSponsors] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({
      groups: 'All Groups',
      sponsors: 'All Sponsors',
      venues: 'All Venues'
    });
    const [newEvent, setNewEvent] = useState({ name: '', date: '', time: '', location: '', description: '', url: '' });
    const [newSession, setNewSession] = useState({ title: '', date: '', time: '', duration: '', topic: '', description: '' });
    const [newSpeakerInvite, setNewSpeakerInvite] = useState({ name: '', email: '', company: '', topic: '' });
    const [newSponsorInvite, setNewSponsorInvite] = useState({ companyName: '', contactName: '', email: '', tier: 'Gold' });
    const [isLoadingUrl, setIsLoadingUrl] = useState(false);
    const [urlError, setUrlError] = useState('');
    const [urlSuccess, setUrlSuccess] = useState(false);

    // Mock event data database for demo - in production this would be an API call
    const knownEvents = {
      'ay5c9dw3': {
        name: 'Frontier AI & AI Agents: Talks + Workshops, Ft Meta & Snowflake',
        date: '2026-01-27',
        time: '17:00',
        location: 'Snowflake Silicon Valley AI Hub, 8th Floor, 135 Constitution Dr, Menlo Park, CA 94025',
        description: 'Join developers, founders, and professionals to explore how frontier AI systems and agent-based architectures are built, evaluated, and applied. Features keynotes from Meta and Snowflake engineers plus hands-on workshops.\n\nSchedule:\n5:00-6:00 PM: Registration\n6:00-6:15 PM: Welcome\n6:15-7:00 PM: Keynotes\n7:20-8:20 PM: Workshops\n8:20-9:00 PM: Networking'
      }
    };

    const extractEventIdFromUrl = (url) => {
      const patterns = [
        /lu\.ma\/([a-zA-Z0-9]+)/,
        /luma\.com\/([a-zA-Z0-9]+)/,
        /eventbrite\.com\/e\/[^-]+-(\d+)/,
        /meetup\.com\/[^\/]+\/events\/(\d+)/,
      ];

      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
      }
      return null;
    };

    const fetchEventFromUrl = async () => {
      if (!newEvent.url) {
        setUrlError('Please enter an event URL');
        return;
      }

      setIsLoadingUrl(true);
      setUrlError('');
      setUrlSuccess(false);

      try {
        await new Promise(resolve => setTimeout(resolve, 1500));

        const eventId = extractEventIdFromUrl(newEvent.url);

        if (eventId && knownEvents[eventId]) {
          const eventData = knownEvents[eventId];
          setNewEvent(prev => ({
            ...prev,
            name: eventData.name,
            date: eventData.date,
            time: eventData.time,
            location: eventData.location,
            description: eventData.description
          }));
          setUrlSuccess(true);
        } else {
          setUrlError('Could not auto-extract details from this URL. Please enter the details manually, or try a Luma, Eventbrite, or Meetup link.');
        }
      } catch (error) {
        setUrlError('Failed to fetch event details. Please enter manually.');
      } finally {
        setIsLoadingUrl(false);
      }
    };

    const handleCreateEvent = () => {
      if (!newEvent.name || !newEvent.date) return;
      const event = {
        id: events.length + 1,
        name: newEvent.name,
        date: newEvent.date,
        location: newEvent.location || 'TBD',
        status: 'upcoming',
        attendees: 0,
        registered: 0,
        sponsors: 0
      };
      setEvents([...events, event]);
      setNewEvent({ name: '', date: '', time: '', location: '', description: '', url: '' });
      setUrlError('');
      setUrlSuccess(false);
      setShowCreateEvent(false);
    };

    const handleCloseCreateEvent = () => {
      setNewEvent({ name: '', date: '', time: '', location: '', description: '', url: '' });
      setUrlError('');
      setUrlSuccess(false);
      setShowCreateEvent(false);
    };

    const handleCreateSession = () => {
      if (!newSession.title) return;
      setNewSession({ title: '', date: '', time: '', duration: '', topic: '', description: '' });
      setShowCreateSession(false);
    };

    const handleInviteSpeaker = () => {
      if (!newSpeakerInvite.name || !newSpeakerInvite.email) return;
      const speaker = {
        id: speakers.length + 1,
        name: newSpeakerInvite.name,
        company: newSpeakerInvite.company || 'Independent',
        topic: newSpeakerInvite.topic || 'TBD',
        status: 'pending'
      };
      setSpeakers([...speakers, speaker]);
      setNewSpeakerInvite({ name: '', email: '', company: '', topic: '' });
      setShowInviteSpeaker(false);
    };

    const handleInviteSponsors = () => {
      if (!newSponsorInvite.companyName || !newSponsorInvite.email) return;
      const sponsor = {
        id: sponsors.length + 1,
        name: newSponsorInvite.companyName,
        tier: newSponsorInvite.tier,
        amount: newSponsorInvite.tier === 'Platinum' ? 10000 : newSponsorInvite.tier === 'Gold' ? 5000 : 2500,
        leads: 0,
        status: 'pending',
        contact: newSponsorInvite.contactName
      };
      setSponsors([...sponsors, sponsor]);
      setNewSponsorInvite({ companyName: '', contactName: '', email: '', tier: 'Gold' });
      setShowInviteSponsors(false);
    };

    const quickActions = [
      {
        icon: Calendar,
        title: 'Create an Event',
        description: 'Create a new event with dates, venue, and details.',
        action: () => setShowCreateEvent(true)
      },
      {
        icon: Clock,
        title: 'Create a Session',
        description: 'Create a speaking session with details, topics, and scheduling.',
        action: () => setShowCreateSession(true)
      },
      {
        icon: UserPlus,
        title: 'Invite a Speaker',
        description: 'Invite a speaker to create their own session.',
        action: () => setShowInviteSpeaker(true)
      },
      {
        icon: Briefcase,
        title: 'Invite Sponsors',
        description: 'Invite companies to sponsor your events.',
        action: () => setShowInviteSponsors(true)
      }
    ];

    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-forest mb-2">Overview</h1>
          <p className="text-stem">Your organizer workspace for events, speakers, and sponsors.</p>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-forest mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={action.action}
                className="card-brand rounded-2xl p-6 hover:border-spring hover:shadow-md transition-all text-left group"
              >
                <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <action.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-forest mb-2">{action.title}</h3>
                <p className="text-sm text-stem leading-relaxed">{action.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 py-4 border-b border-mist">
          <div className="flex items-center gap-2 text-stem">
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filters</span>
          </div>

          <select
            value={selectedFilters.groups}
            onChange={(e) => setSelectedFilters({...selectedFilters, groups: e.target.value})}
            className="px-4 py-2 border border-mist rounded-lg text-sm hover:border-spring focus:outline-none focus:border-growth bg-white"
          >
            <option>All Groups</option>
            <option>Tech Groups</option>
            <option>Business Groups</option>
          </select>

          <select
            value={selectedFilters.sponsors}
            onChange={(e) => setSelectedFilters({...selectedFilters, sponsors: e.target.value})}
            className="px-4 py-2 border border-mist rounded-lg text-sm hover:border-spring focus:outline-none focus:border-growth bg-white"
          >
            <option>All Sponsors</option>
            <option>Active</option>
            <option>Pending</option>
          </select>

          <select
            value={selectedFilters.venues}
            onChange={(e) => setSelectedFilters({...selectedFilters, venues: e.target.value})}
            className="px-4 py-2 border border-mist rounded-lg text-sm hover:border-spring focus:outline-none focus:border-growth bg-white"
          >
            <option>All Venues</option>
            <option>Silicon Valley</option>
            <option>San Francisco</option>
          </select>

          {(selectedFilters.groups !== 'All Groups' || selectedFilters.sponsors !== 'All Sponsors' || selectedFilters.venues !== 'All Venues') && (
            <button
              onClick={() => setSelectedFilters({ groups: 'All Groups', sponsors: 'All Sponsors', venues: 'All Venues' })}
              className="flex items-center gap-1 text-sm text-stem hover:text-forest"
            >
              <X className="w-4 h-4" />
              Clear all
            </button>
          )}
        </div>

        {/* Events Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-forest">Events</h2>
            <button
              onClick={() => setShowCreateEvent(true)}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              Create Event
            </button>
          </div>

          {events.length === 0 ? (
            <div className="card-brand rounded-2xl p-16 text-center">
              <Calendar className="w-16 h-16 text-spring mx-auto mb-4" />
              <p className="text-stem text-lg mb-1">No events found</p>
              <p className="text-stem/70 text-sm">Create your first event to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.map(event => (
                <div key={event.id} className="card-brand rounded-2xl p-6 hover:border-spring hover:shadow-sm transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-forest mb-1">{event.name}</h3>
                      <p className="text-sm text-stem">{event.location}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      event.status === 'completed' ? 'bg-spring text-forest' : 'bg-rain/20 text-rain'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-stem mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-mist">
                    <div className="text-center">
                      <p className="text-xl font-bold text-forest">{event.registered}</p>
                      <p className="text-xs text-stem">Registered</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-forest">{event.attendees}</p>
                      <p className="text-xs text-stem">Attended</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-forest">{event.sponsors}</p>
                      <p className="text-xs text-stem">Sponsors</p>
                    </div>
                  </div>
                  {event.slug && (
                    <Link
                      to={`/events/${event.slug}`}
                      className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                    >
                      View event page
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create Event Modal */}
        {showCreateEvent && (
          <div className="fixed inset-0 bg-soil/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-mist p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-forest">Create New Event</h2>
                <button onClick={handleCloseCreateEvent} className="p-2 hover:bg-mist rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                {/* Import from URL Section */}
                <div className="mb-6 p-4 bg-mist rounded-xl border border-spring/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="w-5 h-5 text-growth" />
                    <span className="font-medium text-forest">Import from URL</span>
                    <span className="text-xs text-stem bg-spring px-2 py-0.5 rounded-full">Quick Fill</span>
                  </div>
                  <p className="text-sm text-stem mb-3">
                    Paste a link from Luma, Eventbrite, or Meetup to auto-fill event details
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={newEvent.url}
                      onChange={(e) => {
                        setNewEvent({...newEvent, url: e.target.value});
                        setUrlError('');
                        setUrlSuccess(false);
                      }}
                      className="flex-1 px-4 py-2.5 border border-mist rounded-lg focus:outline-none focus:border-growth text-sm"
                      placeholder="https://lu.ma/your-event or https://eventbrite.com/..."
                    />
                    <button
                      onClick={fetchEventFromUrl}
                      disabled={isLoadingUrl}
                      className="px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium disabled:bg-stem disabled:cursor-not-allowed flex items-center gap-2 min-w-[100px] justify-center"
                    >
                      {isLoadingUrl ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Loading</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          <span>Fetch</span>
                        </>
                      )}
                    </button>
                  </div>
                  {urlError && (
                    <p className="mt-2 text-sm text-autumn flex items-center gap-1">
                      <X className="w-4 h-4" /> {urlError}
                    </p>
                  )}
                  {urlSuccess && (
                    <p className="mt-2 text-sm text-growth flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> Event details imported successfully!
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-mist"></div>
                  <span className="text-sm text-stem">or enter manually</span>
                  <div className="flex-1 h-px bg-mist"></div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-forest mb-2">Event Name</label>
                    <input
                      type="text"
                      value={newEvent.name}
                      onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-growth transition-colors ${urlSuccess && newEvent.name ? 'border-spring bg-spring/20' : 'border-mist'}`}
                      placeholder="Frontier AI Conference"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-forest mb-2">Date</label>
                      <input
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-growth transition-colors ${urlSuccess && newEvent.date ? 'border-spring bg-spring/20' : 'border-mist'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-forest mb-2">Time</label>
                      <input
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-growth transition-colors ${urlSuccess && newEvent.time ? 'border-spring bg-spring/20' : 'border-mist'}`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-forest mb-2">Location</label>
                    <input
                      type="text"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-growth transition-colors ${urlSuccess && newEvent.location ? 'border-spring bg-spring/20' : 'border-mist'}`}
                      placeholder="Silicon Valley"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-forest mb-2">Description</label>
                    <textarea
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-growth transition-colors resize-none ${urlSuccess && newEvent.description ? 'border-spring bg-spring/20' : 'border-mist'}`}
                      rows="4"
                      placeholder="Describe your event..."
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-6">
                  <button
                    onClick={handleCreateEvent}
                    className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    Create Event
                  </button>
                  <button
                    onClick={handleCloseCreateEvent}
                    className="px-4 py-3 bg-mist text-forest rounded-lg hover:bg-spring transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Session Modal */}
        {showCreateSession && (
          <div className="fixed inset-0 bg-soil/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full">
              <div className="border-b border-mist p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-forest">Create Session</h2>
                <button onClick={() => setShowCreateSession(false)} className="p-2 hover:bg-mist rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Session Title</label>
                  <input
                    type="text"
                    value={newSession.title}
                    onChange={(e) => setNewSession({...newSession, title: e.target.value})}
                    className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth"
                    placeholder="AI Workshop: Building Agents"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-forest mb-2">Date</label>
                    <input
                      type="date"
                      value={newSession.date}
                      onChange={(e) => setNewSession({...newSession, date: e.target.value})}
                      className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-forest mb-2">Time</label>
                    <input
                      type="time"
                      value={newSession.time}
                      onChange={(e) => setNewSession({...newSession, time: e.target.value})}
                      className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Duration</label>
                  <select
                    value={newSession.duration}
                    onChange={(e) => setNewSession({...newSession, duration: e.target.value})}
                    className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth bg-white"
                  >
                    <option value="">Select duration</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Topic</label>
                  <input
                    type="text"
                    value={newSession.topic}
                    onChange={(e) => setNewSession({...newSession, topic: e.target.value})}
                    className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth"
                    placeholder="Machine Learning, AI Agents..."
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleCreateSession}
                    className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    Create Session
                  </button>
                  <button
                    onClick={() => setShowCreateSession(false)}
                    className="px-4 py-3 bg-mist text-forest rounded-lg hover:bg-spring transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Invite Speaker Modal */}
        {showInviteSpeaker && (
          <div className="fixed inset-0 bg-soil/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full">
              <div className="border-b border-mist p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-forest">Invite Speaker</h2>
                <button onClick={() => setShowInviteSpeaker(false)} className="p-2 hover:bg-mist rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Speaker Name</label>
                  <input
                    type="text"
                    value={newSpeakerInvite.name}
                    onChange={(e) => setNewSpeakerInvite({...newSpeakerInvite, name: e.target.value})}
                    className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Email</label>
                  <input
                    type="email"
                    value={newSpeakerInvite.email}
                    onChange={(e) => setNewSpeakerInvite({...newSpeakerInvite, email: e.target.value})}
                    className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Company</label>
                  <input
                    type="text"
                    value={newSpeakerInvite.company}
                    onChange={(e) => setNewSpeakerInvite({...newSpeakerInvite, company: e.target.value})}
                    className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth"
                    placeholder="Tech Corp"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Topic</label>
                  <input
                    type="text"
                    value={newSpeakerInvite.topic}
                    onChange={(e) => setNewSpeakerInvite({...newSpeakerInvite, topic: e.target.value})}
                    className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth"
                    placeholder="The Future of AI"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleInviteSpeaker}
                    className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Send Invitation
                  </button>
                  <button
                    onClick={() => setShowInviteSpeaker(false)}
                    className="px-4 py-3 bg-mist text-forest rounded-lg hover:bg-spring transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Invite Sponsors Modal */}
        {showInviteSponsors && (
          <div className="fixed inset-0 bg-soil/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full">
              <div className="border-b border-mist p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-forest">Invite Sponsors</h2>
                <button onClick={() => setShowInviteSponsors(false)} className="p-2 hover:bg-mist rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Company Name</label>
                  <input
                    type="text"
                    value={newSponsorInvite.companyName}
                    onChange={(e) => setNewSponsorInvite({...newSponsorInvite, companyName: e.target.value})}
                    className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth"
                    placeholder="Acme Corp"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Contact Name</label>
                  <input
                    type="text"
                    value={newSponsorInvite.contactName}
                    onChange={(e) => setNewSponsorInvite({...newSponsorInvite, contactName: e.target.value})}
                    className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Email</label>
                  <input
                    type="email"
                    value={newSponsorInvite.email}
                    onChange={(e) => setNewSponsorInvite({...newSponsorInvite, email: e.target.value})}
                    className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth"
                    placeholder="john@acme.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Sponsorship Tier</label>
                  <select
                    value={newSponsorInvite.tier}
                    onChange={(e) => setNewSponsorInvite({...newSponsorInvite, tier: e.target.value})}
                    className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth bg-white"
                  >
                    <option value="Platinum">Platinum ($10,000)</option>
                    <option value="Gold">Gold ($5,000)</option>
                    <option value="Silver">Silver ($2,500)</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleInviteSponsors}
                    className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Send Invitation
                  </button>
                  <button
                    onClick={() => setShowInviteSponsors(false)}
                    className="px-4 py-3 bg-mist text-forest rounded-lg hover:bg-spring transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Speakers Page
  const SpeakersPage = () => {
    const [showAddSpeaker, setShowAddSpeaker] = useState(false);
    const [newSpeaker, setNewSpeaker] = useState({ name: '', company: '', topic: '', email: '' });

    const handleAddSpeaker = () => {
      if (!newSpeaker.name || !newSpeaker.email) return;
      const speaker = {
        id: speakers.length + 1,
        name: newSpeaker.name,
        company: newSpeaker.company || 'Independent',
        topic: newSpeaker.topic || 'TBD',
        status: 'pending'
      };
      setSpeakers([...speakers, speaker]);
      setNewSpeaker({ name: '', company: '', topic: '', email: '' });
      setShowAddSpeaker(false);
    };

    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-forest mb-2">
            {currentRole === 'speaker' ? 'Speaker Dashboard' : 'Speakers'}
          </h1>
          <p className="text-stem">
            {currentRole === 'speaker'
              ? 'Manage your speaker profile and sessions.'
              : 'Invite and manage speakers for your events.'}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-stem">{speakers.length} speakers</p>
          <button
            onClick={() => setShowAddSpeaker(true)}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Speaker
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {speakers.map(speaker => (
            <div key={speaker.id} className="card-brand rounded-2xl p-6 hover:border-spring hover:shadow-sm transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                    {speaker.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-forest">{speaker.name}</h3>
                    <p className="text-sm text-stem">{speaker.company}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  speaker.status === 'confirmed' ? 'bg-spring text-forest' : 'bg-bloom/20 text-amber-700'
                }`}>
                  {speaker.status}
                </span>
              </div>
              <div className="bg-mist rounded-lg p-3">
                <p className="text-sm text-stem">Topic</p>
                <p className="font-medium text-forest">{speaker.topic}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Add Speaker Modal */}
        {showAddSpeaker && (
          <div className="fixed inset-0 bg-soil/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full">
              <div className="border-b border-mist p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-forest">Add Speaker</h2>
                <button onClick={() => setShowAddSpeaker(false)} className="p-2 hover:bg-mist rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Name</label>
                  <input
                    type="text"
                    value={newSpeaker.name}
                    onChange={(e) => setNewSpeaker({...newSpeaker, name: e.target.value})}
                    className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth"
                    placeholder="Speaker name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Email</label>
                  <input
                    type="email"
                    value={newSpeaker.email}
                    onChange={(e) => setNewSpeaker({...newSpeaker, email: e.target.value})}
                    className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth"
                    placeholder="speaker@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Company</label>
                  <input
                    type="text"
                    value={newSpeaker.company}
                    onChange={(e) => setNewSpeaker({...newSpeaker, company: e.target.value})}
                    className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth"
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Topic</label>
                  <input
                    type="text"
                    value={newSpeaker.topic}
                    onChange={(e) => setNewSpeaker({...newSpeaker, topic: e.target.value})}
                    className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth"
                    placeholder="What will they speak about?"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleAddSpeaker}
                    className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    Add Speaker
                  </button>
                  <button
                    onClick={() => setShowAddSpeaker(false)}
                    className="px-4 py-3 bg-mist text-forest rounded-lg hover:bg-spring transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Sponsors Page
  const SponsorsPage = () => {
    const [showAddSponsor, setShowAddSponsor] = useState(false);
    const [showSponsorDetails, setShowSponsorDetails] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [newSponsor, setNewSponsor] = useState({ name: '', contact: '', email: '', tier: 'Gold', amount: 5000 });

    const handleAddSponsor = () => {
      if (!newSponsor.name || !newSponsor.contact) return;
      const sponsor = {
        id: sponsors.length + 1,
        name: newSponsor.name,
        tier: newSponsor.tier,
        amount: newSponsor.tier === 'Platinum' ? 10000 : newSponsor.tier === 'Gold' ? 5000 : 2500,
        leads: 0,
        status: 'active',
        contact: newSponsor.contact
      };
      setSponsors([...sponsors, sponsor]);
      setNewSponsor({ name: '', contact: '', email: '', tier: 'Gold', amount: 5000 });
      setShowAddSponsor(false);
    };

    const filteredSponsors = sponsors.filter(sponsor =>
      sponsor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sponsor.contact.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const generateSponsorPDF = (sponsor) => {
      const report = `
SPONSOR REPORT - ${sponsor.name}
================================

Tier: ${sponsor.tier}
Contact: ${sponsor.contact}
Contribution: $${sponsor.amount.toLocaleString()}
Leads Generated: ${sponsor.leads}
Status: ${sponsor.status}

ROI Summary:
- Cost per Lead: $${sponsor.leads > 0 ? (sponsor.amount / sponsor.leads).toFixed(2) : 'N/A'}
- Engagement Score: ${Math.floor(Math.random() * 30) + 70}%

Generated on: ${new Date().toLocaleDateString()}
      `.trim();

      const blob = new Blob([report], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${sponsor.name.replace(/\s+/g, '_')}_report.txt`;
      a.click();
      URL.revokeObjectURL(url);
    };

    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-forest mb-2">
            {currentRole === 'sponsor' ? 'Sponsor Dashboard' : 'Sponsors'}
          </h1>
          <p className="text-stem">
            {currentRole === 'sponsor'
              ? 'Manage your sponsorships and brand presence.'
              : 'Manage sponsor relationships and track ROI.'}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stem w-5 h-5" />
            <input
              type="text"
              placeholder="Search sponsors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth"
            />
          </div>
          <button
            onClick={() => setShowAddSponsor(true)}
            className="px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Sponsor
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSponsors.map(sponsor => (
            <div key={sponsor.id} className="card-brand rounded-2xl p-6 hover:border-spring hover:shadow-sm transition-all">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-forest mb-1">{sponsor.name}</h3>
                  <p className="text-sm text-stem">Contact: {sponsor.contact}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  sponsor.tier === 'Platinum' ? 'bg-purple-100 text-purple-700' :
                  sponsor.tier === 'Gold' ? 'bg-bloom/20 text-amber-700' :
                  'bg-mist text-stem'
                }`}>
                  {sponsor.tier}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-mist p-4 rounded-xl">
                  <p className="text-sm text-stem mb-1">Contribution</p>
                  <p className="text-2xl font-bold text-forest">${sponsor.amount.toLocaleString()}</p>
                </div>
                <div className="bg-mist p-4 rounded-xl">
                  <p className="text-sm text-stem mb-1">Leads</p>
                  <p className="text-2xl font-bold text-forest">{sponsor.leads}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowSponsorDetails(sponsor)}
                  className="flex-1 px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  View Details
                </button>
                <button
                  onClick={() => generateSponsorPDF(sponsor)}
                  className="flex-1 px-3 py-2 bg-mist text-forest rounded-lg hover:bg-spring transition-colors text-sm font-medium"
                >
                  Generate Report
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Sponsor Modal */}
        {showAddSponsor && (
          <div className="fixed inset-0 bg-soil/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full">
              <div className="border-b border-mist p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-forest">Add Sponsor</h2>
                <button onClick={() => setShowAddSponsor(false)} className="p-2 hover:bg-mist rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Company Name</label>
                  <input
                    type="text"
                    value={newSponsor.name}
                    onChange={(e) => setNewSponsor({...newSponsor, name: e.target.value})}
                    className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth"
                    placeholder="Acme Corp"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Contact Name</label>
                  <input
                    type="text"
                    value={newSponsor.contact}
                    onChange={(e) => setNewSponsor({...newSponsor, contact: e.target.value})}
                    className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Email</label>
                  <input
                    type="email"
                    value={newSponsor.email}
                    onChange={(e) => setNewSponsor({...newSponsor, email: e.target.value})}
                    className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth"
                    placeholder="jane@acme.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Tier</label>
                  <select
                    value={newSponsor.tier}
                    onChange={(e) => setNewSponsor({...newSponsor, tier: e.target.value})}
                    className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth bg-white"
                  >
                    <option value="Platinum">Platinum ($10,000)</option>
                    <option value="Gold">Gold ($5,000)</option>
                    <option value="Silver">Silver ($2,500)</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleAddSponsor}
                    className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    Add Sponsor
                  </button>
                  <button
                    onClick={() => setShowAddSponsor(false)}
                    className="px-4 py-3 bg-mist text-forest rounded-lg hover:bg-spring transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sponsor Details Modal */}
        {showSponsorDetails && (
          <div className="fixed inset-0 bg-soil/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full">
              <div className="border-b border-mist p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-forest">{showSponsorDetails.name}</h2>
                <button onClick={() => setShowSponsorDetails(null)} className="p-2 hover:bg-mist rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-stem">Tier</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    showSponsorDetails.tier === 'Platinum' ? 'bg-purple-100 text-purple-700' :
                    showSponsorDetails.tier === 'Gold' ? 'bg-bloom/20 text-amber-700' :
                    'bg-mist text-stem'
                  }`}>
                    {showSponsorDetails.tier}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stem">Contact</span>
                  <span className="font-medium">{showSponsorDetails.contact}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stem">Contribution</span>
                  <span className="font-medium text-xl">${showSponsorDetails.amount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stem">Leads Generated</span>
                  <span className="font-medium">{showSponsorDetails.leads}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stem">Status</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    showSponsorDetails.status === 'active' ? 'bg-spring text-forest' : 'bg-bloom/20 text-amber-700'
                  }`}>
                    {showSponsorDetails.status}
                  </span>
                </div>
                <div className="pt-4 border-t border-mist">
                  <h4 className="font-medium text-forest mb-3">ROI Metrics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-mist p-4 rounded-xl">
                      <p className="text-sm text-stem">Cost per Lead</p>
                      <p className="text-xl font-bold text-forest">
                        ${showSponsorDetails.leads > 0 ? (showSponsorDetails.amount / showSponsorDetails.leads).toFixed(2) : 'N/A'}
                      </p>
                    </div>
                    <div className="bg-mist p-4 rounded-xl">
                      <p className="text-sm text-stem">Engagement</p>
                      <p className="text-xl font-bold text-forest">{Math.floor(Math.random() * 30) + 70}%</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowSponsorDetails(null)}
                  className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Reports Page
  const ReportsPage = () => {
    const [activeTab, setActiveTab] = useState('input');

    const generateAttendeeEmail = () => {
      const eventName = reportData.eventName || 'Our Recent Event';
      return `
THANK YOU FOR ATTENDING
=======================

Dear Attendee,

Thank you for attending ${eventName}! Your presence helped make the event a success.

SHARE YOUR EXPERIENCE
---------------------
Your feedback matters! Help us improve future events by sharing:

* What insights did you find most valuable?
* Which sessions did you enjoy most?
* How can we improve future events?

Share Your Feedback: [Survey Link]

WHAT OUR COMMUNITY IS SAYING
----------------------------

"The knowledge shared was invaluable for my career growth!"
 - Sarah C., Software Engineer

"Every session felt perfectly tailored to our needs."
 - Michael R., Founder

EVENT HIGHLIGHTS
----------------

* ${reportData.totalAttended || '178'} Attendees
* ${speakers.length} Expert Speakers
* Multiple Workshop Tracks
* ${sponsors.length} Sponsors Supported

Thank you for being part of our community!

Best regards,
The Event Team

=======================
hello@events.com | events.com
=======================
      `.trim();
    };

    const generateSponsorReport = () => {
      const eventName = reportData.eventName || 'Frontier AI Event';
      return `
SPONSOR REPORT
==============
${eventName}

Dear Valued Sponsor,

Thank you for your support! Here is your event report.

ATTENDANCE OVERVIEW
-------------------

Total Registered:    ${reportData.totalRegistered || '210'}
Total Attended:      ${reportData.totalAttended || '178'}
Show-up Rate:        ${reportData.showUpRate || '85'}%

ATTENDEE DEMOGRAPHICS
---------------------

Engineers:          ${reportData.engineers || '89'} (50%)
Founders:           ${reportData.founders || '36'} (20%)
Students:           ${reportData.students || '27'} (15%)
Data Scientists:    ${reportData.dataScientists || '26'} (15%)

SOCIAL REACH
------------

Social Mentions:    ${reportData.socialMentions || '150'}+
Total Impressions:  ${reportData.impressions || '50,000'}+
LinkedIn Posts:     ${reportData.linkedinPosts || '45'}
Video Views:        ${reportData.videoViews || '2,500'}+

Thank you for your partnership!

==============
Events Team
==============
      `.trim();
    };

    const handleExport = () => {
      const content = activeTab === 'attendee' ? generateAttendeeEmail() : generateSponsorReport();
      const filename = activeTab === 'attendee' ? 'attendee_email.txt' : 'sponsor_report.txt';
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    };

    const handleCopy = () => {
      const content = activeTab === 'attendee' ? generateAttendeeEmail() : generateSponsorReport();
      navigator.clipboard.writeText(content);
    };

    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-forest mb-2">Reports</h1>
          <p className="text-stem">Generate reports and email templates.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-mist pb-4">
          {[
            { id: 'input', label: 'Event Data' },
            { id: 'attendee', label: 'Attendee Email' },
            { id: 'sponsor', label: 'Sponsor Report' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gray-900 text-white'
                  : 'bg-mist text-stem hover:bg-spring'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'input' && (
          <div className="card-brand rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-forest mb-6">Event Data Input</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-forest mb-2">Event Name</label>
                <input
                  type="text"
                  value={reportData.eventName}
                  onChange={(e) => setReportData({...reportData, eventName: e.target.value})}
                  className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth"
                  placeholder="Frontier AI Event"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-forest mb-2">Event Date</label>
                <input
                  type="date"
                  value={reportData.eventDate}
                  onChange={(e) => setReportData({...reportData, eventDate: e.target.value})}
                  className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-forest mb-2">Total Registered</label>
                <input
                  type="number"
                  value={reportData.totalRegistered}
                  onChange={(e) => setReportData({...reportData, totalRegistered: e.target.value})}
                  className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth"
                  placeholder="210"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-forest mb-2">Total Attended</label>
                <input
                  type="number"
                  value={reportData.totalAttended}
                  onChange={(e) => setReportData({...reportData, totalAttended: e.target.value})}
                  className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth"
                  placeholder="178"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-forest mb-2">Engineers</label>
                <input
                  type="number"
                  value={reportData.engineers}
                  onChange={(e) => setReportData({...reportData, engineers: e.target.value})}
                  className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth"
                  placeholder="89"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-forest mb-2">Founders</label>
                <input
                  type="number"
                  value={reportData.founders}
                  onChange={(e) => setReportData({...reportData, founders: e.target.value})}
                  className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth"
                  placeholder="36"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-forest mb-2">Social Mentions</label>
                <input
                  type="number"
                  value={reportData.socialMentions}
                  onChange={(e) => setReportData({...reportData, socialMentions: e.target.value})}
                  className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth"
                  placeholder="150"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-forest mb-2">Impressions</label>
                <input
                  type="text"
                  value={reportData.impressions}
                  onChange={(e) => setReportData({...reportData, impressions: e.target.value})}
                  className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth"
                  placeholder="50,000"
                />
              </div>
            </div>
          </div>
        )}

        {(activeTab === 'attendee' || activeTab === 'sponsor') && (
          <div className="card-brand rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-forest">
                {activeTab === 'attendee' ? 'Attendee Email' : 'Sponsor Report'}
              </h2>
              <div className="flex gap-2">
                <button onClick={handleCopy} className="px-4 py-2 bg-mist text-forest rounded-lg hover:bg-spring transition-colors text-sm font-medium flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Copy
                </button>
                <button onClick={handleExport} className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium flex items-center gap-2">
                  <Download className="w-4 h-4" /> Export
                </button>
              </div>
            </div>
            <pre className="bg-mist p-6 rounded-xl text-sm font-mono text-soil overflow-x-auto whitespace-pre-wrap">
              {activeTab === 'attendee' ? generateAttendeeEmail() : generateSponsorReport()}
            </pre>
          </div>
        )}
      </div>
    );
  };

  // Discover Page
  const DiscoverPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [timeFilter, setTimeFilter] = useState('upcoming');

    const categories = ['All', 'Technology', 'Networking', 'Design', 'Business'];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const formatDate = (dateString) => (
      new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    );

    const filteredEvents = discoverEvents.filter(event => {
      const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      const eventDate = new Date(event.date);
      if (Number.isNaN(eventDate.getTime())) return false;
      const isUpcoming = eventDate >= today;
      const matchesTime = timeFilter === 'upcoming' ? isUpcoming : !isUpcoming;
      return matchesSearch && matchesCategory && matchesTime;
    });

    const sortedEvents = [...filteredEvents].sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      return timeFilter === 'past' ? bDate - aDate : aDate - bDate;
    });

    const toggleSaveEvent = (eventId) => {
      setDiscoverEvents(discoverEvents.map(event =>
        event.id === eventId ? { ...event, saved: !event.saved } : event
      ));
    };

    return (
      <div className="space-y-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-stem uppercase tracking-wide">
                <img src="/digo.png" alt="Digo" className="w-5 h-5" />
                <span>Discover Digo</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-forest mt-2">Browse events and sessions</h1>
              <p className="text-stem text-lg md:text-xl mt-3 max-w-2xl">
                Find experiences that match your interests and build your calendar in a few clicks.
              </p>
            </div>
            <div className="bg-dew border border-mist p-1 rounded-xl inline-flex">
              {['upcoming', 'past'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter)}
                  className={`px-4 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                    timeFilter === filter
                      ? 'bg-gray-900 text-white shadow-garden-sm'
                      : 'text-stem hover:text-forest'
                  }`}
                >
                  {filter === 'upcoming' ? 'Future Events' : 'Past Events'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-4 xl:items-center xl:justify-between">
            <div className="relative w-full xl:max-w-lg">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stem w-5 h-5" />
              <input
                type="text"
                placeholder="Search events or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border border-mist rounded-xl text-base focus:outline-none focus:border-growth bg-white"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2.5 rounded-lg text-base font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gray-900 text-white'
                      : 'bg-dew text-stem hover:bg-spring'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-base text-stem">
            <p>
              Showing {sortedEvents.length} {timeFilter === 'past' ? 'past' : 'future'} event{sortedEvents.length !== 1 ? 's' : ''}
            </p>
            <div className="hidden md:flex items-center gap-2 text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-growth"></span>
              <span>Updated daily</span>
            </div>
          </div>
        </div>

        <div className="card-brand rounded-2xl overflow-hidden shadow-garden-sm">
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-dew text-stem text-sm font-semibold uppercase tracking-wide">
            <div className="col-span-3">Date</div>
            <div className="col-span-5">Event</div>
            <div className="col-span-3">Location</div>
            <div className="col-span-1 text-right">Link</div>
          </div>

          <div className="divide-y divide-mist">
            {sortedEvents.map(event => (
              <div key={event.id}>
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-5 items-center">
                  <div className="col-span-3">
                    <p className="text-lg font-semibold text-forest">{formatDate(event.date)}</p>
                    <p className="text-sm text-stem mt-1">{event.attendees} attending</p>
                  </div>
                  <div className="col-span-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold text-forest">{event.name}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="px-3 py-1 rounded-full bg-gray-900 text-white text-sm font-medium">Event</span>
                          <span className="px-3 py-1 rounded-full bg-spring text-forest text-sm font-medium">{event.category}</span>
                          <span className="text-sm text-stem">by {event.organizer}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSaveEvent(event.id)}
                        className={`p-2.5 rounded-full border transition-colors ${
                          event.saved ? 'bg-bloom text-white border-bloom' : 'bg-white text-stem border-mist hover:border-growth'
                        }`}
                        aria-label="Save event"
                      >
                        <Bookmark className={`w-5 h-5 ${event.saved ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                  <div className="col-span-3 text-base text-stem">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-stem mt-0.5" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <button className="px-3.5 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-base font-medium">
                      View
                    </button>
                  </div>
                </div>

                <div className="md:hidden px-5 py-5 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-forest">{event.name}</p>
                      <p className="text-base text-stem mt-1">{formatDate(event.date)}</p>
                    </div>
                    <button
                      onClick={() => toggleSaveEvent(event.id)}
                      className={`p-2.5 rounded-full border transition-colors ${
                        event.saved ? 'bg-bloom text-white border-bloom' : 'bg-white text-stem border-mist hover:border-growth'
                      }`}
                      aria-label="Save event"
                    >
                      <Bookmark className={`w-5 h-5 ${event.saved ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-gray-900 text-white text-sm font-medium">Event</span>
                    <span className="px-3 py-1 rounded-full bg-spring text-forest text-sm font-medium">{event.category}</span>
                    <span className="text-sm text-stem">by {event.organizer}</span>
                  </div>
                  <div className="space-y-2 text-base text-stem">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" /> {event.location}
                    </p>
                    <p className="flex items-center gap-2">
                      <Users className="w-5 h-5" /> {event.attendees} attending
                    </p>
                  </div>
                  <button className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-base font-semibold">
                    View Event
                  </button>
                </div>
              </div>
            ))}

            {sortedEvents.length === 0 && (
              <div className="px-6 py-10 text-center">
                <p className="text-lg font-semibold text-forest">No events found</p>
                <p className="text-base text-stem mt-2">Try another category or clear your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Groups Page
  const GroupsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [showCreateGroup, setShowCreateGroup] = useState(false);
    const [showGroupDetails, setShowGroupDetails] = useState(null);
    const [newGroup, setNewGroup] = useState({ name: '', description: '', category: 'Technology', isPublic: true });

    const filters = [
      { id: 'all', label: 'All' },
      { id: 'joined', label: 'My Groups' },
      { id: 'public', label: 'Public' },
      { id: 'private', label: 'Private' },
    ];

    const filteredGroups = groups.filter(group => {
      const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           group.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = selectedFilter === 'all' ||
                           (selectedFilter === 'joined' && group.joined) ||
                           (selectedFilter === 'public' && group.isPublic) ||
                           (selectedFilter === 'private' && !group.isPublic);
      return matchesSearch && matchesFilter;
    });

    const handleCreateGroup = () => {
      if (!newGroup.name) return;
      const group = {
        id: groups.length + 1,
        name: newGroup.name,
        members: 1,
        events: 0,
        category: newGroup.category,
        description: newGroup.description,
        isPublic: newGroup.isPublic,
        joined: true
      };
      setGroups([...groups, group]);
      setNewGroup({ name: '', description: '', category: 'Technology', isPublic: true });
      setShowCreateGroup(false);
    };

    const toggleJoinGroup = (groupId) => {
      setGroups(groups.map(group =>
        group.id === groupId
          ? { ...group, joined: !group.joined, members: group.joined ? group.members - 1 : group.members + 1 }
          : group
      ));
    };

    const getCategoryColor = (category) => {
      const colors = {
        'Technology': 'bg-rain/20 text-rain',
        'Business': 'bg-bloom/20 text-amber-700',
        'Design': 'bg-purple-100 text-purple-700',
        'Community': 'bg-spring text-forest'
      };
      return colors[category] || 'bg-mist text-stem';
    };

    return (
      <div className="space-y-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-forest mb-2">Groups</h1>
            <p className="text-stem">Join communities and connect with like-minded people.</p>
          </div>
          <button
            onClick={() => setShowCreateGroup(true)}
            className="px-4 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Group
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stem w-5 h-5" />
            <input
              type="text"
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth"
            />
          </div>
          <div className="flex gap-2">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedFilter === filter.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-mist text-stem hover:bg-spring'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* My Groups Section */}
        {selectedFilter === 'all' && groups.filter(g => g.joined).length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-forest mb-4">My Groups</h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {groups.filter(g => g.joined).map(group => (
                <div
                  key={group.id}
                  onClick={() => setShowGroupDetails(group)}
                  className="flex-shrink-0 w-48 card-brand rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-3">
                    {group.name.charAt(0)}
                  </div>
                  <h3 className="font-bold text-forest truncate">{group.name}</h3>
                  <p className="text-sm text-stem">{group.members.toLocaleString()} members</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Groups Grid */}
        <div>
          <h2 className="text-xl font-bold text-forest mb-4">
            {selectedFilter === 'joined' ? 'My Groups' : selectedFilter === 'public' ? 'Public Groups' : selectedFilter === 'private' ? 'Private Groups' : 'Discover Groups'}
          </h2>
          {filteredGroups.length === 0 ? (
            <div className="text-center py-16 bg-mist rounded-2xl">
              <Users className="w-12 h-12 text-spring mx-auto mb-4" />
              <p className="text-stem">No groups found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredGroups.map(group => (
                <div key={group.id} className="card-brand rounded-2xl p-6 hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {group.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-forest truncate">{group.name}</h3>
                        {group.isPublic ? (
                          <Globe className="w-4 h-4 text-stem" />
                        ) : (
                          <Lock className="w-4 h-4 text-stem" />
                        )}
                      </div>
                      <p className="text-sm text-stem line-clamp-2 mb-3">{group.description}</p>
                      <div className="flex items-center gap-4 text-sm text-stem">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" /> {group.members.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" /> {group.events} events
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(group.category)}`}>
                          {group.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-mist">
                    <button
                      onClick={() => setShowGroupDetails(group)}
                      className="flex-1 px-4 py-2 bg-mist text-forest rounded-lg text-sm font-medium hover:bg-spring transition-colors"
                    >
                      View Group
                    </button>
                    <button
                      onClick={() => toggleJoinGroup(group.id)}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        group.joined
                          ? 'bg-mist text-stem hover:bg-spring'
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      }`}
                    >
                      {group.joined ? 'Leave' : 'Join'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create Group Modal */}
        {showCreateGroup && (
          <div className="fixed inset-0 bg-soil/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full">
              <div className="border-b border-mist p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-forest">Create New Group</h2>
                <button onClick={() => setShowCreateGroup(false)} className="p-2 hover:bg-mist rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Group Name</label>
                  <input
                    type="text"
                    value={newGroup.name}
                    onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                    className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth"
                    placeholder="e.g., AI Enthusiasts SF"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Description</label>
                  <textarea
                    value={newGroup.description}
                    onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                    className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth resize-none"
                    rows="3"
                    placeholder="What is your group about?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Category</label>
                  <select
                    value={newGroup.category}
                    onChange={(e) => setNewGroup({...newGroup, category: e.target.value})}
                    className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth bg-white"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Business">Business</option>
                    <option value="Design">Design</option>
                    <option value="Community">Community</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Visibility</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="visibility"
                        checked={newGroup.isPublic}
                        onChange={() => setNewGroup({...newGroup, isPublic: true})}
                        className="w-4 h-4 accent-growth"
                      />
                      <Globe className="w-4 h-4 text-stem" />
                      <span>Public</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="visibility"
                        checked={!newGroup.isPublic}
                        onChange={() => setNewGroup({...newGroup, isPublic: false})}
                        className="w-4 h-4 accent-growth"
                      />
                      <Lock className="w-4 h-4 text-stem" />
                      <span>Private</span>
                    </label>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleCreateGroup}
                    className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    Create Group
                  </button>
                  <button
                    onClick={() => setShowCreateGroup(false)}
                    className="px-4 py-3 bg-mist text-forest rounded-lg font-medium hover:bg-spring transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Group Details Modal */}
        {showGroupDetails && (
          <div className="fixed inset-0 bg-soil/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gray-900 p-8 text-white relative">
                <button
                  onClick={() => setShowGroupDetails(null)}
                  className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-forest font-bold text-2xl mb-4">
                  {showGroupDetails.name.charAt(0)}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold">{showGroupDetails.name}</h2>
                  {showGroupDetails.isPublic ? (
                    <Globe className="w-5 h-5 text-spring" />
                  ) : (
                    <Lock className="w-5 h-5 text-spring" />
                  )}
                </div>
                <p className="text-spring">{showGroupDetails.description}</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-mist rounded-xl">
                    <p className="text-2xl font-bold text-forest">{showGroupDetails.members.toLocaleString()}</p>
                    <p className="text-sm text-stem">Members</p>
                  </div>
                  <div className="text-center p-4 bg-mist rounded-xl">
                    <p className="text-2xl font-bold text-forest">{showGroupDetails.events}</p>
                    <p className="text-sm text-stem">Events</p>
                  </div>
                  <div className="text-center p-4 bg-mist rounded-xl">
                    <p className="text-2xl font-bold text-forest">{showGroupDetails.isPublic ? 'Public' : 'Private'}</p>
                    <p className="text-sm text-stem">Visibility</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <button className="w-full flex items-center gap-3 p-3 hover:bg-mist rounded-lg transition-colors text-left">
                    <Calendar className="w-5 h-5 text-stem" />
                    <span>View upcoming events</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 hover:bg-mist rounded-lg transition-colors text-left">
                    <Users className="w-5 h-5 text-stem" />
                    <span>See all members</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 hover:bg-mist rounded-lg transition-colors text-left">
                    <MessageCircle className="w-5 h-5 text-stem" />
                    <span>Group discussions</span>
                  </button>
                  {showGroupDetails.joined && (
                    <button className="w-full flex items-center gap-3 p-3 hover:bg-mist rounded-lg transition-colors text-left">
                      <Settings className="w-5 h-5 text-stem" />
                      <span>Group settings</span>
                    </button>
                  )}
                </div>

                <button
                  onClick={() => {
                    toggleJoinGroup(showGroupDetails.id);
                    setShowGroupDetails({...showGroupDetails, joined: !showGroupDetails.joined, members: showGroupDetails.joined ? showGroupDetails.members - 1 : showGroupDetails.members + 1});
                  }}
                  className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                    showGroupDetails.joined
                      ? 'bg-mist text-stem hover:bg-spring'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {showGroupDetails.joined ? 'Leave Group' : 'Join Group'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    if (currentRole === 'speaker') {
      return <SpeakersPage />;
    }

    if (currentRole === 'sponsor') {
      return <SponsorsPage />;
    }

    switch (currentPage) {
      case 'organizers':
        return <OrganizersDashboard />;
      case 'speakers':
        return <SpeakersPage />;
      case 'sponsors':
        return <SponsorsPage />;
      case 'reports':
        return <ReportsPage />;
      default:
        return <OrganizersDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Main Layout */}
      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-64 border-r border-gray-200 min-h-screen bg-white sticky top-[64px] self-start">
            <div className="px-4 pt-6 pb-2">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-lg bg-gray-900 shadow-garden-sm">
                  <img src="/digo.png" alt="Digo" className="w-7 h-7" />
                </span>
                <span className="text-sm font-semibold text-forest">Digo Workspace</span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-stem mt-4">Workspace</p>
              <h2 className="text-lg font-bold text-forest mt-2">
                {currentRole === 'organizer' ? 'Organizer' : currentRole === 'speaker' ? 'Speaker' : 'Sponsor'}
              </h2>
              <p className="text-xs text-stem mt-1">Switch role view for context as needed.</p>
            </div>
            <div className="px-4 pb-4">
              <div className="bg-dew border border-mist p-1 rounded-xl grid grid-cols-3 gap-1">
                {[
                  { id: 'organizer', label: 'Organizer' },
                  { id: 'speaker', label: 'Speaker' },
                  { id: 'sponsor', label: 'Sponsor' },
                ].map((role) => (
                  <button
                    key={role.id}
                    onClick={() => {
                      setCurrentRole(role.id);
                      setCurrentPage(role.id === 'organizer' ? 'organizers' : role.id === 'speaker' ? 'speakers' : 'sponsors');
                    }}
                    className={`px-2 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      currentRole === role.id
                        ? 'bg-gray-900 text-white shadow-garden-sm'
                        : 'text-stem hover:text-forest'
                    }`}
                  >
                    {role.label}
                  </button>
                ))}
              </div>
            </div>
            {currentRole === 'organizer' ? (
              <nav className="p-4 space-y-1">
                <button
                  onClick={() => setCurrentPage('organizers')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                    currentPage === 'organizers' ? 'bg-spring text-forest font-medium' : 'text-stem hover:bg-mist'
                  }`}
                >
                  <span className="w-9 h-9 rounded-xl bg-gray-100 text-forest flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </span>
                  <span>Overview</span>
                </button>
                <button
                  onClick={() => setCurrentPage('speakers')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                    currentPage === 'speakers' ? 'bg-spring text-forest font-medium' : 'text-stem hover:bg-mist'
                  }`}
                >
                  <span className="w-9 h-9 rounded-xl bg-gray-100 text-forest flex items-center justify-center">
                    <Mic className="w-5 h-5" />
                  </span>
                  <span>Speakers</span>
                </button>
                <button
                  onClick={() => setCurrentPage('sponsors')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                    currentPage === 'sponsors' ? 'bg-spring text-forest font-medium' : 'text-stem hover:bg-mist'
                  }`}
                >
                  <span className="w-9 h-9 rounded-xl bg-gray-100 text-forest flex items-center justify-center">
                    <Briefcase className="w-5 h-5" />
                  </span>
                  <span>Sponsors</span>
                </button>
                <button
                  onClick={() => setCurrentPage('reports')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                    currentPage === 'reports' ? 'bg-spring text-forest font-medium' : 'text-stem hover:bg-mist'
                  }`}
                >
                  <span className="w-9 h-9 rounded-xl bg-gray-100 text-forest flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </span>
                  <span>Reports</span>
                </button>
              </nav>
            ) : (
              <nav className="p-4 space-y-2">
                <p className="text-xs uppercase tracking-wide text-stem font-semibold px-2">Role View</p>
                <div className="px-2 py-3 rounded-lg bg-dew text-forest font-medium flex items-center gap-3">
                  {currentRole === 'speaker' ? <Mic className="w-5 h-5" /> : <Briefcase className="w-5 h-5" />}
                  <span>{currentRole === 'speaker' ? 'Speaker Portal' : 'Sponsor Portal'}</span>
                </div>
                <button
                  onClick={() => {
                    setCurrentRole('organizer');
                    setCurrentPage('organizers');
                  }}
                  className="w-full px-3 py-2 rounded-lg text-sm font-medium text-stem hover:bg-mist"
                >
                  Back to Organizer
                </button>
              </nav>
            )}
          </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 max-w-[calc(100vw-320px)]">
          {renderContent()}
        </main>
      </div>

      {/* App Tour */}
      {showTour && <AppTour onComplete={() => setShowTour(false)} />}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlanDashboard />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/discover/organizations/:organizerSlug" element={<DiscoverPage />} />
        <Route path="/groups" element={<GroupsPage />} />
        <Route path="/groups/:orgId" element={<OrganizationPage />} />
        <Route path="/groups/:orgId/events" element={<OrganizationEventsPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/events/:eventId" element={<EventPage />} />
        <Route path="/events/:eventId/sessions/:sessionSlug" element={<SessionDetailPage />} />
        <Route path="/email-builder" element={<EmailMakerPage />} />
        <Route path="/add-venue" element={<VenueSubmissionPage />} />
        <Route path="/venues" element={<VenueDiscoveryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
