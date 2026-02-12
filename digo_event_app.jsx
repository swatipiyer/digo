import React, { useState } from 'react';
import { Calendar, Users, DollarSign, FileText, Send, Plus, Download, Edit2, Trash2, Eye, Mail, Building, BarChart3, CheckCircle, Clock, MapPin, Search, Filter, UserPlus, Briefcase, Mic, ChevronDown, X, Bell, Sun, Moon } from 'lucide-react';

const DigoEventApp = () => {
  const [currentPage, setCurrentPage] = useState('organizers');
  const [currentMainTab, setCurrentMainTab] = useState('plan');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New registration for Frontier AI event', time: '5 min ago', read: false },
    { id: 2, message: 'Snowflake confirmed sponsorship', time: '1 hour ago', read: false },
  ]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const [events, setEvents] = useState([
    {
      id: 1,
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
    const [newEvent, setNewEvent] = useState({ name: '', date: '', time: '', location: '', description: '' });
    const [newSession, setNewSession] = useState({ title: '', date: '', time: '', duration: '', topic: '', description: '' });
    const [newSpeakerInvite, setNewSpeakerInvite] = useState({ name: '', email: '', company: '', topic: '' });
    const [newSponsorInvite, setNewSponsorInvite] = useState({ companyName: '', contactName: '', email: '', tier: 'Gold' });

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
      setNewEvent({ name: '', date: '', time: '', location: '', description: '' });
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
          <h1 className="text-4xl font-bold text-black mb-2">Organizer Dashboard</h1>
          <p className="text-gray-600">Manage your events and sessions.</p>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-black mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={action.action}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-300 hover:shadow-sm transition-all text-left group"
              >
                <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <action.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-black mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{action.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2 text-gray-600">
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filters</span>
          </div>
          
          <select 
            value={selectedFilters.groups}
            onChange={(e) => setSelectedFilters({...selectedFilters, groups: e.target.value})}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:border-gray-300 focus:outline-none focus:border-gray-400 bg-white"
          >
            <option>All Groups</option>
            <option>Tech Groups</option>
            <option>Business Groups</option>
          </select>

          <select 
            value={selectedFilters.sponsors}
            onChange={(e) => setSelectedFilters({...selectedFilters, sponsors: e.target.value})}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:border-gray-300 focus:outline-none focus:border-gray-400 bg-white"
          >
            <option>All Sponsors</option>
            <option>Active</option>
            <option>Pending</option>
          </select>

          <select 
            value={selectedFilters.venues}
            onChange={(e) => setSelectedFilters({...selectedFilters, venues: e.target.value})}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:border-gray-300 focus:outline-none focus:border-gray-400 bg-white"
          >
            <option>All Venues</option>
            <option>Silicon Valley</option>
            <option>San Francisco</option>
          </select>

          {(selectedFilters.groups !== 'All Groups' || selectedFilters.sponsors !== 'All Sponsors' || selectedFilters.venues !== 'All Venues') && (
            <button 
              onClick={() => setSelectedFilters({ groups: 'All Groups', sponsors: 'All Sponsors', venues: 'All Venues' })}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-black"
            >
              <X className="w-4 h-4" />
              Clear all
            </button>
          )}
        </div>

        {/* Events Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-black">Events</h2>
            <button
              onClick={() => setShowCreateEvent(true)}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              Create Event
            </button>
          </div>

          {events.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-1">No events found</p>
              <p className="text-gray-400 text-sm">Create your first event to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.map(event => (
                <div key={event.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-300 hover:shadow-sm transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-black mb-1">{event.name}</h3>
                      <p className="text-sm text-gray-600">{event.location}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      event.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100">
                    <div className="text-center">
                      <p className="text-xl font-bold text-black">{event.registered}</p>
                      <p className="text-xs text-gray-500">Registered</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-black">{event.attendees}</p>
                      <p className="text-xs text-gray-500">Attended</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-black">{event.sponsors}</p>
                      <p className="text-xs text-gray-500">Sponsors</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create Event Modal */}
        {showCreateEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-black">Create New Event</h2>
                <button onClick={() => setShowCreateEvent(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Event Name</label>
                    <input
                      type="text"
                      value={newEvent.name}
                      onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                      placeholder="Frontier AI Conference"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Date</label>
                      <input
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Time</label>
                      <input
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Location</label>
                    <input
                      type="text"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                      placeholder="Silicon Valley"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Description</label>
                    <textarea
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                      rows="4"
                      placeholder="Event description..."
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleCreateEvent}
                    className="flex-1 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    Create Event
                  </button>
                  <button
                    onClick={() => setShowCreateEvent(false)}
                    className="px-4 py-3 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-black">Create New Session</h2>
                <button onClick={() => setShowCreateSession(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Session Title</label>
                  <input
                    type="text"
                    value={newSession.title}
                    onChange={(e) => setNewSession({...newSession, title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                    placeholder="AI Agent Building Workshop"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Date</label>
                    <input
                      type="date"
                      value={newSession.date}
                      onChange={(e) => setNewSession({...newSession, date: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Time</label>
                    <input
                      type="time"
                      value={newSession.time}
                      onChange={(e) => setNewSession({...newSession, time: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Duration</label>
                    <select
                      value={newSession.duration}
                      onChange={(e) => setNewSession({...newSession, duration: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black bg-white"
                    >
                      <option value="">Select...</option>
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="90">1.5 hours</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Topic</label>
                  <input
                    type="text"
                    value={newSession.topic}
                    onChange={(e) => setNewSession({...newSession, topic: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                    placeholder="AI, Machine Learning, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Description</label>
                  <textarea
                    value={newSession.description}
                    onChange={(e) => setNewSession({...newSession, description: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                    rows="3"
                    placeholder="Session description..."
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleCreateSession}
                    className="flex-1 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    Create Session
                  </button>
                  <button
                    onClick={() => setShowCreateSession(false)}
                    className="px-4 py-3 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-black">Invite a Speaker</h2>
                <button onClick={() => setShowInviteSpeaker(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Speaker Name</label>
                  <input
                    type="text"
                    value={newSpeakerInvite.name}
                    onChange={(e) => setNewSpeakerInvite({...newSpeakerInvite, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Email</label>
                  <input
                    type="email"
                    value={newSpeakerInvite.email}
                    onChange={(e) => setNewSpeakerInvite({...newSpeakerInvite, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Company</label>
                  <input
                    type="text"
                    value={newSpeakerInvite.company}
                    onChange={(e) => setNewSpeakerInvite({...newSpeakerInvite, company: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                    placeholder="Tech Corp"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Topic</label>
                  <input
                    type="text"
                    value={newSpeakerInvite.topic}
                    onChange={(e) => setNewSpeakerInvite({...newSpeakerInvite, topic: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                    placeholder="Proposed speaking topic"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleInviteSpeaker}
                    className="flex-1 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    Send Invitation
                  </button>
                  <button
                    onClick={() => setShowInviteSpeaker(false)}
                    className="px-4 py-3 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-black">Invite Sponsors</h2>
                <button onClick={() => setShowInviteSponsors(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Company Name</label>
                  <input
                    type="text"
                    value={newSponsorInvite.companyName}
                    onChange={(e) => setNewSponsorInvite({...newSponsorInvite, companyName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                    placeholder="Acme Corp"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Contact Name</label>
                  <input
                    type="text"
                    value={newSponsorInvite.contactName}
                    onChange={(e) => setNewSponsorInvite({...newSponsorInvite, contactName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Email</label>
                  <input
                    type="email"
                    value={newSponsorInvite.email}
                    onChange={(e) => setNewSponsorInvite({...newSponsorInvite, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                    placeholder="jane@acme.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Sponsorship Tier</label>
                  <select
                    value={newSponsorInvite.tier}
                    onChange={(e) => setNewSponsorInvite({...newSponsorInvite, tier: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black bg-white"
                  >
                    <option value="Platinum">Platinum ($10,000)</option>
                    <option value="Gold">Gold ($5,000)</option>
                    <option value="Silver">Silver ($2,500)</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleInviteSponsors}
                    className="flex-1 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    Send Invitation
                  </button>
                  <button
                    onClick={() => setShowInviteSponsors(false)}
                    className="px-4 py-3 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
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
    const [searchQuery, setSearchQuery] = useState('');
    const [newSpeaker, setNewSpeaker] = useState({ name: '', email: '', company: '', topic: '' });

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
      setNewSpeaker({ name: '', email: '', company: '', topic: '' });
      setShowAddSpeaker(false);
    };

    const filteredSpeakers = speakers.filter(speaker =>
      speaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      speaker.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      speaker.topic.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-black mb-2">Speakers</h1>
          <p className="text-gray-600">Manage your event speakers and sessions.</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search speakers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
            />
          </div>
          <button
            onClick={() => setShowAddSpeaker(true)}
            className="px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Invite Speaker
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSpeakers.map(speaker => (
            <div key={speaker.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-300 hover:shadow-sm transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <Mic className="w-6 h-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-black">{speaker.name}</h3>
                  <p className="text-sm text-gray-600">{speaker.company}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-3">{speaker.topic}</p>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                speaker.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {speaker.status}
              </span>
            </div>
          ))}
        </div>

        {/* Add Speaker Modal */}
        {showAddSpeaker && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full">
              <div className="border-b border-gray-200 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-black">Invite Speaker</h2>
                <button onClick={() => setShowAddSpeaker(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Name</label>
                  <input
                    type="text"
                    value={newSpeaker.name}
                    onChange={(e) => setNewSpeaker({...newSpeaker, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                    placeholder="Speaker name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Email</label>
                  <input
                    type="email"
                    value={newSpeaker.email}
                    onChange={(e) => setNewSpeaker({...newSpeaker, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                    placeholder="speaker@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Company</label>
                  <input
                    type="text"
                    value={newSpeaker.company}
                    onChange={(e) => setNewSpeaker({...newSpeaker, company: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Topic</label>
                  <input
                    type="text"
                    value={newSpeaker.topic}
                    onChange={(e) => setNewSpeaker({...newSpeaker, topic: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                    placeholder="Speaking topic"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleAddSpeaker}
                    className="flex-1 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    Send Invitation
                  </button>
                  <button
                    onClick={() => setShowAddSpeaker(false)}
                    className="px-4 py-3 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
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
          <h1 className="text-4xl font-bold text-black mb-2">Sponsors</h1>
          <p className="text-gray-600">Manage sponsor relationships and track ROI.</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search sponsors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
            />
          </div>
          <button
            onClick={() => setShowAddSponsor(true)}
            className="px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Sponsor
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSponsors.map(sponsor => (
            <div key={sponsor.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-300 hover:shadow-sm transition-all">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-black mb-1">{sponsor.name}</h3>
                  <p className="text-sm text-gray-600">Contact: {sponsor.contact}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  sponsor.tier === 'Platinum' ? 'bg-purple-100 text-purple-700' :
                  sponsor.tier === 'Gold' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {sponsor.tier}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Contribution</p>
                  <p className="text-2xl font-bold text-black">${sponsor.amount.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Leads</p>
                  <p className="text-2xl font-bold text-black">{sponsor.leads}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowSponsorDetails(sponsor)}
                  className="flex-1 px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  View Details
                </button>
                <button
                  onClick={() => generateSponsorPDF(sponsor)}
                  className="flex-1 px-3 py-2 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  Generate Report
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Sponsor Modal */}
        {showAddSponsor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full">
              <div className="border-b border-gray-200 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-black">Add Sponsor</h2>
                <button onClick={() => setShowAddSponsor(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Company Name</label>
                  <input
                    type="text"
                    value={newSponsor.name}
                    onChange={(e) => setNewSponsor({...newSponsor, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                    placeholder="Acme Corp"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Contact Name</label>
                  <input
                    type="text"
                    value={newSponsor.contact}
                    onChange={(e) => setNewSponsor({...newSponsor, contact: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Email</label>
                  <input
                    type="email"
                    value={newSponsor.email}
                    onChange={(e) => setNewSponsor({...newSponsor, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                    placeholder="jane@acme.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Tier</label>
                  <select
                    value={newSponsor.tier}
                    onChange={(e) => setNewSponsor({...newSponsor, tier: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black bg-white"
                  >
                    <option value="Platinum">Platinum ($10,000)</option>
                    <option value="Gold">Gold ($5,000)</option>
                    <option value="Silver">Silver ($2,500)</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleAddSponsor}
                    className="flex-1 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    Add Sponsor
                  </button>
                  <button
                    onClick={() => setShowAddSponsor(false)}
                    className="px-4 py-3 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full">
              <div className="border-b border-gray-200 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-black">{showSponsorDetails.name}</h2>
                <button onClick={() => setShowSponsorDetails(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tier</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    showSponsorDetails.tier === 'Platinum' ? 'bg-purple-100 text-purple-700' :
                    showSponsorDetails.tier === 'Gold' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {showSponsorDetails.tier}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Contact</span>
                  <span className="font-medium">{showSponsorDetails.contact}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Contribution</span>
                  <span className="font-medium text-xl">${showSponsorDetails.amount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Leads Generated</span>
                  <span className="font-medium">{showSponsorDetails.leads}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    showSponsorDetails.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {showSponsorDetails.status}
                  </span>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-black mb-3">ROI Metrics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-600">Cost per Lead</p>
                      <p className="text-xl font-bold text-black">
                        ${showSponsorDetails.leads > 0 ? (showSponsorDetails.amount / showSponsorDetails.leads).toFixed(2) : 'N/A'}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-600">Engagement</p>
                      <p className="text-xl font-bold text-black">{Math.floor(Math.random() * 30) + 70}%</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowSponsorDetails(null)}
                  className="w-full px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
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
    const [emailPreview, setEmailPreview] = useState('');

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

    const generateAttendeeEmail = () => {
      return `Subject: Thank You for Attending ${reportData.eventName}!

Hi everyone,

Thank you for joining us at ${reportData.eventName}! We hope you had as much fun as we did.

Event Highlights:
• ${reportData.totalAttended} attendees joined us
• Amazing sessions and workshops
• Great networking opportunities

📷 Photos & Media:
All event photos and materials are available for download.

Stay tuned for upcoming events—we'd love to see you again soon!

Warm regards,
The Event Team`;
    };

    const generateSponsorReport = () => {
      return `${reportData.eventName} - Post-Event Sponsor Report

EVENT SNAPSHOT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${reportData.totalAttended} Total Attendees
${reportData.socialMentions} Social Media Mentions
${reportData.impressions} Total Impressions

ATTENDANCE & DEMOGRAPHICS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Registered: ${reportData.totalRegistered}
Checked In: ${reportData.totalAttended}
Show-Up Rate: ${reportData.showUpRate}%

Attendee Breakdown:
• Software Engineers: ${reportData.engineers}
• Founders: ${reportData.founders}
• Students: ${reportData.students}
• Data Scientists: ${reportData.dataScientists}

CONTENT ENGAGEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Video Views: ${reportData.videoViews}
Slide Downloads: ${reportData.slideDownloads}
LinkedIn Posts: ${reportData.linkedinPosts}`;
    };

    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-black mb-2">Reports & Communications</h1>
          <p className="text-gray-600">Generate professional emails and reports for your events.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('input')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'input' ? 'bg-gray-50 border-b-2 border-black' : 'hover:bg-gray-50'
              }`}
            >
              Event Data
            </button>
            <button
              onClick={() => setActiveTab('attendee')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'attendee' ? 'bg-gray-50 border-b-2 border-black' : 'hover:bg-gray-50'
              }`}
            >
              Attendee Email
            </button>
            <button
              onClick={() => setActiveTab('sponsor')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'sponsor' ? 'bg-gray-50 border-b-2 border-black' : 'hover:bg-gray-50'
              }`}
            >
              Sponsor Report
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'input' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Event Name</label>
                    <input
                      type="text"
                      value={reportData.eventName}
                      onChange={(e) => setReportData({...reportData, eventName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                      placeholder="Frontier AI & AI Agents"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Event Date</label>
                    <input
                      type="date"
                      value={reportData.eventDate}
                      onChange={(e) => setReportData({...reportData, eventDate: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-bold text-black mb-4">Attendance</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Registered</label>
                      <input
                        type="number"
                        value={reportData.totalRegistered}
                        onChange={(e) => setReportData({...reportData, totalRegistered: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Attended</label>
                      <input
                        type="number"
                        value={reportData.totalAttended}
                        onChange={(e) => setReportData({...reportData, totalAttended: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Show-Up Rate (%)</label>
                      <input
                        type="number"
                        value={reportData.showUpRate}
                        onChange={(e) => setReportData({...reportData, showUpRate: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-bold text-black mb-4">Demographics</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Engineers</label>
                      <input
                        type="number"
                        value={reportData.engineers}
                        onChange={(e) => setReportData({...reportData, engineers: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Founders</label>
                      <input
                        type="number"
                        value={reportData.founders}
                        onChange={(e) => setReportData({...reportData, founders: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Students</label>
                      <input
                        type="number"
                        value={reportData.students}
                        onChange={(e) => setReportData({...reportData, students: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Data Scientists</label>
                      <input
                        type="number"
                        value={reportData.dataScientists}
                        onChange={(e) => setReportData({...reportData, dataScientists: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-bold text-black mb-4">Engagement</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Social Mentions</label>
                      <input
                        type="number"
                        value={reportData.socialMentions}
                        onChange={(e) => setReportData({...reportData, socialMentions: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Impressions</label>
                      <input
                        type="number"
                        value={reportData.impressions}
                        onChange={(e) => setReportData({...reportData, impressions: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">LinkedIn Posts</label>
                      <input
                        type="number"
                        value={reportData.linkedinPosts}
                        onChange={(e) => setReportData({...reportData, linkedinPosts: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Video Views</label>
                      <input
                        type="number"
                        value={reportData.videoViews}
                        onChange={(e) => setReportData({...reportData, videoViews: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Slide Downloads</label>
                      <input
                        type="number"
                        value={reportData.slideDownloads}
                        onChange={(e) => setReportData({...reportData, slideDownloads: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setActiveTab('attendee')}
                    className="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    Generate Attendee Email
                  </button>
                  <button
                    onClick={() => setActiveTab('sponsor')}
                    className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                  >
                    Generate Sponsor Report
                  </button>
                </div>
              </div>
            )}

            {(activeTab === 'attendee' || activeTab === 'sponsor') && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-black">
                    {activeTab === 'attendee' ? 'Attendee Follow-Up Email' : 'Sponsor Report'}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        if (activeTab === 'attendee') {
                          setEmailPreview(generateAttendeeEmail());
                        } else {
                          setEmailPreview(generateSponsorReport());
                        }
                      }}
                      className="px-4 py-2 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                      Preview
                    </button>
                    <button
                      onClick={handleExport}
                      className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                    >
                      Export
                    </button>
                  </div>
                </div>

                {emailPreview ? (
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800">{emailPreview}</pre>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-xl p-16 border border-gray-200 text-center">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Click "Preview" to generate the {activeTab === 'attendee' ? 'email' : 'report'}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (currentMainTab !== 'plan') {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-black mb-2">{currentMainTab === 'discover' ? 'Discover' : 'Groups'}</h2>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        </div>
      );
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
      {/* Top Navigation */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-black">digo</h1>
            <nav className="flex gap-6">
              {['plan', 'discover', 'groups'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setCurrentMainTab(tab)}
                  className={`text-base font-medium transition-colors capitalize ${
                    currentMainTab === tab ? 'text-black' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="font-bold text-black">Notifications</h3>
                    <button
                      onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                      className="text-sm text-gray-500 hover:text-black"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">No notifications</div>
                    ) : (
                      notifications.map(notification => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                          onClick={() => setNotifications(notifications.map(n => n.id === notification.id ? { ...n, read: true } : n))}
                        >
                          <p className="text-sm text-gray-800">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-gray-600" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm font-bold">
              SI
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex">
        {/* Left Sidebar - Only show on Plan tab */}
        {currentMainTab === 'plan' && (
          <aside className="w-64 border-r border-gray-200 min-h-screen bg-gray-50 sticky top-[73px] self-start">
            <nav className="p-4 space-y-1">
              <button
                onClick={() => setCurrentPage('organizers')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                  currentPage === 'organizers' ? 'bg-gray-200 text-black font-medium' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Users className="w-5 h-5" />
                <span>Organizers</span>
              </button>
              <button
                onClick={() => setCurrentPage('speakers')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                  currentPage === 'speakers' ? 'bg-gray-200 text-black font-medium' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Mic className="w-5 h-5" />
                <span>Speakers</span>
              </button>
              <button
                onClick={() => setCurrentPage('sponsors')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                  currentPage === 'sponsors' ? 'bg-gray-200 text-black font-medium' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Briefcase className="w-5 h-5" />
                <span>Sponsors</span>
              </button>
              <button
                onClick={() => setCurrentPage('reports')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                  currentPage === 'reports' ? 'bg-gray-200 text-black font-medium' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span>Reports</span>
              </button>
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className={`flex-1 p-8 ${currentMainTab === 'plan' ? 'max-w-[calc(100vw-320px)]' : 'max-w-7xl mx-auto w-full'}`}>
          {renderContent()}
        </main>
      </div>

      {/* Feedback Button */}
      <button
        onClick={() => setShowFeedback(true)}
        className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-black text-white px-3 py-6 rounded-l-lg text-sm font-medium hover:bg-gray-800 transition-colors"
      >
        <span className="transform -rotate-90 inline-block">Feedback</span>
      </button>

      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-black">Send Feedback</h2>
              <button
                onClick={() => {
                  setShowFeedback(false);
                  setFeedbackSubmitted(false);
                  setFeedbackText('');
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              {feedbackSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-black mb-2">Thank you!</h3>
                  <p className="text-gray-600">Your feedback has been submitted.</p>
                  <button
                    onClick={() => {
                      setShowFeedback(false);
                      setFeedbackSubmitted(false);
                      setFeedbackText('');
                    }}
                    className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-gray-600 mb-4">We'd love to hear your thoughts on how we can improve.</p>
                  <textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black resize-none"
                    rows="5"
                    placeholder="Share your feedback..."
                  />
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => {
                        if (feedbackText.trim()) {
                          setFeedbackSubmitted(true);
                        }
                      }}
                      className="flex-1 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                    >
                      Submit Feedback
                    </button>
                    <button
                      onClick={() => {
                        setShowFeedback(false);
                        setFeedbackText('');
                      }}
                      className="px-4 py-3 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigoEventApp;
