import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AppShell from './components/AppShell';
import { WorkspaceProvider, useWorkspace } from './contexts/WorkspaceContext';
import { Calendar, CalendarDays, Users, DollarSign, FileText, Send, Plus, Download, Edit2, Trash2, Eye, Building, Building2, BarChart3, CheckCircle, Clock, MapPin, Search, Briefcase, Mic, X, Heart, Share2, Bookmark, Globe, TrendingUp, Star, MessageCircle, Settings, Lock, Copy, Linkedin, UtensilsCrossed, Package, Wrench } from 'lucide-react';
import HomePage from './pages/HomePage';
import EventPage from './pages/EventPage';
import SessionDetailPage from './pages/SessionDetailPage';
import MediaKitPage from './pages/MediaKitPage';
import DiscoverPage from './pages/DiscoverPage';
import GroupsPage from './pages/GroupsPage';
import CalendarPage from './pages/CalendarPage';
import OrganizationPage from './pages/OrganizationPage';
import OrganizationEventsPage from './pages/OrganizationEventsPage';
import EmailMakerPage from './pages/EmailMakerPage';
import VenueSubmissionPage from './pages/VenueSubmissionPage';
import VenueDiscoveryPage from './pages/VenueDiscoveryPage';
import OrganizersListPage from './pages/OrganizersListPage';
import EventSubmissionPage from './pages/EventSubmissionPage';
import CertifiedOrganizerPage from './pages/CertifiedOrganizerPage';
import SponsorSubmissionPage from './pages/SponsorSubmissionPage';
import SpeakerSubmissionPage from './pages/SpeakerSubmissionPage';
import CallForSpeakersPage from './pages/CallForSpeakersPage';
import EventServicesPage from './pages/EventServicesPage';
import ServicesPage from './pages/ServicesPage';
import MarketingPage from './pages/MarketingPage';
import GettingStartedPage from './pages/GettingStartedPage';
import ExplorePage from './pages/ExplorePage';
import CreateContentPage from './pages/CreateContentPage';
import EventPlanPage, { PlanDetail, CreatePlan } from './pages/EventPlanPage';
import AppTour from './components/AppTour';

const Dashboard = () => {
  const { currentPage, setCurrentPage, currentRole, setCurrentRole } = useWorkspace();
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    const tourCompleted = localStorage.getItem('digo_tour_completed');
    if (!tourCompleted) {
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

  // Venue Manager Pages
  const MyVenuesPage = () => {
    const [myVenues, setMyVenues] = useState(() => {
      const saved = localStorage.getItem('digo_my_venues');
      return saved ? JSON.parse(saved) : [];
    });
    const [showAddVenue, setShowAddVenue] = useState(false);
    const [showEditVenue, setShowEditVenue] = useState(false);
    const [editingVenue, setEditingVenue] = useState(null);
    const [venueForm, setVenueForm] = useState({
      name: '',
      address: '',
      capacity: '',
      price: '$$',
      description: '',
      amenities: [],
    });

    const amenitiesList = [
      'WiFi', 'Projector', 'Sound System', 'Catering Kitchen', 'Parking',
      'Stage', 'Video Recording', 'Whiteboard', 'Coffee Bar', 'AV Equipment',
      'Auditorium', 'Lecture Halls', 'Conference Rooms', 'Theater', 'Outdoor Space',
      'Museum Access', 'Event Hall'
    ];

    const handleAddVenue = (e) => {
      e.preventDefault();
      const newVenue = {
        id: Date.now(),
        ...venueForm,
        verified: false,
        createdAt: new Date().toISOString(),
        views: 0,
        bookingRequests: 0,
      };
      const updated = [...myVenues, newVenue];
      setMyVenues(updated);
      localStorage.setItem('digo_my_venues', JSON.stringify(updated));
      setShowAddVenue(false);
      setVenueForm({ name: '', address: '', capacity: '', price: '$$', description: '', amenities: [] });
    };

    const handleEditVenue = (e) => {
      e.preventDefault();
      const updated = myVenues.map(v => v.id === editingVenue.id ? { ...v, ...venueForm } : v);
      setMyVenues(updated);
      localStorage.setItem('digo_my_venues', JSON.stringify(updated));
      setShowEditVenue(false);
      setEditingVenue(null);
      setVenueForm({ name: '', address: '', capacity: '', price: '$$', description: '', amenities: [] });
    };

    const handleDeleteVenue = (id) => {
      if (confirm('Are you sure you want to delete this venue?')) {
        const updated = myVenues.filter(v => v.id !== id);
        setMyVenues(updated);
        localStorage.setItem('digo_my_venues', JSON.stringify(updated));
      }
    };

    const toggleAmenity = (amenity) => {
      setVenueForm(prev => ({
        ...prev,
        amenities: prev.amenities.includes(amenity)
          ? prev.amenities.filter(a => a !== amenity)
          : [...prev.amenities, amenity]
      }));
    };

    const quickActions = [
      { icon: Plus, title: 'Add Venue', desc: 'List a new venue', action: () => setShowAddVenue(true) },
      { icon: Calendar, title: 'View Requests', desc: 'Check booking requests', action: () => setCurrentPage('booking-requests') },
    ];

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-forest">My Venues</h2>
          <p className="text-stem mt-1">Manage your event venues and booking requests</p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className="flex items-center gap-3 px-5 py-3 border border-gray-200 rounded-xl hover:border-spring hover:shadow-sm transition-all group bg-white"
              >
                <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <span className="text-[15px] font-semibold text-forest whitespace-nowrap block">{action.title}</span>
                  <span className="text-xs text-stem">{action.desc}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Venues List */}
        {myVenues.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Venues Yet</h3>
            <p className="text-gray-600 mb-6">Start by adding your first venue to the marketplace</p>
            <button
              onClick={() => setShowAddVenue(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Add Your First Venue
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myVenues.map(venue => (
              <div key={venue.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{venue.name}</h3>
                    {venue.verified && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-50 text-orange-700 text-xs font-medium rounded-full">
                        <img src="/digo.png" alt="Verified" className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingVenue(venue);
                        setVenueForm({
                          name: venue.name,
                          address: venue.address,
                          capacity: venue.capacity,
                          price: venue.price,
                          description: venue.description,
                          amenities: venue.amenities,
                        });
                        setShowEditVenue(true);
                      }}
                      className="text-gray-400 hover:text-blue-600"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteVenue(venue.id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4 flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {venue.address}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Capacity</div>
                    <div className="font-bold text-gray-900">{venue.capacity}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Price</div>
                    <div className="font-bold text-gray-900">{venue.price}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Views</div>
                    <div className="font-semibold text-gray-900">{venue.views || 0}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Requests</div>
                    <div className="font-semibold text-gray-900">{venue.bookingRequests || 0}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Venue Modal */}
        {showAddVenue && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Add New Venue</h3>
                <button onClick={() => setShowAddVenue(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleAddVenue} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Venue Name *</label>
                  <input
                    type="text"
                    required
                    value={venueForm.name}
                    onChange={(e) => setVenueForm({ ...venueForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Silicon Valley Tech Hub"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                  <input
                    type="text"
                    required
                    value={venueForm.address}
                    onChange={(e) => setVenueForm({ ...venueForm, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="123 Main St, San Francisco, CA 94105"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacity *</label>
                    <input
                      type="number"
                      required
                      value={venueForm.capacity}
                      onChange={(e) => setVenueForm({ ...venueForm, capacity: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="200"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price Range *</label>
                    <select
                      required
                      value={venueForm.price}
                      onChange={(e) => setVenueForm({ ...venueForm, price: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="$">$ - Budget</option>
                      <option value="$$">$$ - Moderate</option>
                      <option value="$$$">$$$ - Premium</option>
                      <option value="$$$$">$$$$ - Luxury</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    required
                    value={venueForm.description}
                    onChange={(e) => setVenueForm({ ...venueForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                    placeholder="Describe your venue..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {amenitiesList.map(amenity => (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => toggleAmenity(amenity)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          venueForm.amenities.includes(amenity)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddVenue(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Add Venue
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Venue Modal */}
        {showEditVenue && editingVenue && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Edit Venue</h3>
                <button onClick={() => { setShowEditVenue(false); setEditingVenue(null); }} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleEditVenue} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Venue Name *</label>
                  <input
                    type="text"
                    required
                    value={venueForm.name}
                    onChange={(e) => setVenueForm({ ...venueForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                  <input
                    type="text"
                    required
                    value={venueForm.address}
                    onChange={(e) => setVenueForm({ ...venueForm, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacity *</label>
                    <input
                      type="number"
                      required
                      value={venueForm.capacity}
                      onChange={(e) => setVenueForm({ ...venueForm, capacity: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price Range *</label>
                    <select
                      required
                      value={venueForm.price}
                      onChange={(e) => setVenueForm({ ...venueForm, price: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="$">$ - Budget</option>
                      <option value="$$">$$ - Moderate</option>
                      <option value="$$$">$$$ - Premium</option>
                      <option value="$$$$">$$$$ - Luxury</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    required
                    value={venueForm.description}
                    onChange={(e) => setVenueForm({ ...venueForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {amenitiesList.map(amenity => (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => toggleAmenity(amenity)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          venueForm.amenities.includes(amenity)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => { setShowEditVenue(false); setEditingVenue(null); }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const BookingRequestsPage = () => {
    const [bookings, setBookings] = useState(() => {
      const saved = localStorage.getItem('digo_venue_bookings');
      return saved ? JSON.parse(saved) : [];
    });
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedBooking, setSelectedBooking] = useState(null);

    const updateBookingStatus = (id, status) => {
      const updated = bookings.map(b =>
        b.id === id ? { ...b, status, updatedAt: new Date().toISOString() } : b
      );
      setBookings(updated);
      localStorage.setItem('digo_venue_bookings', JSON.stringify(updated));
      setSelectedBooking(null);
    };

    const filteredBookings = filterStatus === 'all'
      ? bookings
      : bookings.filter(b => b.status === filterStatus);

    const stats = {
      pending: bookings.filter(b => b.status === 'pending').length,
      approved: bookings.filter(b => b.status === 'approved').length,
      declined: bookings.filter(b => b.status === 'declined').length,
    };

    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Booking Requests</h1>
          <p className="text-gray-600 mt-1">Manage venue booking requests from event organizers</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Pending</p>
                <p className="text-3xl font-bold text-yellow-900 mt-1">{stats.pending}</p>
              </div>
              <Clock className="w-12 h-12 text-yellow-600" />
            </div>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Approved</p>
                <p className="text-3xl font-bold text-green-900 mt-1">{stats.approved}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Declined</p>
                <p className="text-3xl font-bold text-red-900 mt-1">{stats.declined}</p>
              </div>
              <X className="w-12 h-12 text-red-600" />
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          {[
            { id: 'all', label: 'All Requests' },
            { id: 'pending', label: 'Pending' },
            { id: 'approved', label: 'Approved' },
            { id: 'declined', label: 'Declined' },
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setFilterStatus(filter.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === filter.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Booking Requests</h3>
            <p className="text-gray-600">Booking requests will appear here when organizers request your venues</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map(booking => (
              <div key={booking.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{booking.venueName}</h3>
                    <p className="text-sm text-gray-600">{booking.name} • {booking.email}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    booking.status === 'approved' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Event Date</p>
                    <p className="text-sm font-semibold text-gray-900">{booking.eventDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="text-sm font-semibold text-gray-900">{booking.eventTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Attendees</p>
                    <p className="text-sm font-semibold text-gray-900">{booking.attendees}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Type</p>
                    <p className="text-sm font-semibold text-gray-900">{booking.eventType}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedBooking(booking)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    View Details
                  </button>
                  {booking.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'approved')}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'declined')}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                      >
                        Decline
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View Details Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Booking Request Details</h3>
                <button onClick={() => setSelectedBooking(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{selectedBooking.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{selectedBooking.email}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Event Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Venue:</span>
                      <span className="font-medium">{selectedBooking.venueName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{selectedBooking.eventDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{selectedBooking.eventTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Attendees:</span>
                      <span className="font-medium">{selectedBooking.attendees}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{selectedBooking.eventType}</span>
                    </div>
                  </div>
                </div>
                {selectedBooking.setupRequirements && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Setup Requirements</h4>
                    <p className="text-gray-700">{selectedBooking.setupRequirements}</p>
                  </div>
                )}
                {selectedBooking.cateringNeeds && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Catering Needs</h4>
                    <p className="text-gray-700">{selectedBooking.cateringNeeds}</p>
                  </div>
                )}
                {selectedBooking.avNeeds && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">AV & Tech Needs</h4>
                    <p className="text-gray-700">{selectedBooking.avNeeds}</p>
                  </div>
                )}
                {selectedBooking.message && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Additional Message</h4>
                    <p className="text-gray-700">{selectedBooking.message}</p>
                  </div>
                )}
                {selectedBooking.status === 'pending' && (
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => updateBookingStatus(selectedBooking.id, 'approved')}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                    >
                      Approve Request
                    </button>
                    <button
                      onClick={() => updateBookingStatus(selectedBooking.id, 'declined')}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                    >
                      Decline Request
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };


  // Organizers Dashboard
  const OrganizersDashboard = () => {
    const [showCreateEvent, setShowCreateEvent] = useState(false);
    const [showCreateSession, setShowCreateSession] = useState(false);
    const [showInviteSpeaker, setShowInviteSpeaker] = useState(false);
    const [showInviteSponsors, setShowInviteSponsors] = useState(false);
    const [showCreateGroup, setShowCreateGroup] = useState(false);
    const [showCreateCalendar, setShowCreateCalendar] = useState(false);
    const [newGroup, setNewGroup] = useState({ name: '', description: '', category: 'Technology', isPublic: true });
    const [newCalendar, setNewCalendar] = useState({ name: '', description: '', color: '#3B82F6' });
    const [newEvent, setNewEvent] = useState({ name: '', date: '', time: '', location: '', description: '', url: '' });
    const [newSession, setNewSession] = useState({ title: '', date: '', time: '', duration: '', topic: '', description: '' });
    const [newSpeakerInvite, setNewSpeakerInvite] = useState({ name: '', email: '', company: '', topic: '' });
    const [newSponsorInvite, setNewSponsorInvite] = useState({ companyName: '', contactName: '', email: '', tier: 'Gold' });
    const [shareEvent, setShareEvent] = useState(null);
    const [shareToast, setShareToast] = useState(false);
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

    const handleCreateGroup = () => {
      if (!newGroup.name) return;
      const group = {
        id: groups.length + 1,
        name: newGroup.name,
        description: newGroup.description,
        category: newGroup.category,
        isPublic: newGroup.isPublic,
        members: 1,
        events: 0,
        joined: true
      };
      setGroups([...groups, group]);
      setNewGroup({ name: '', description: '', category: 'Technology', isPublic: true });
      setShowCreateGroup(false);
    };

    const handleCreateCalendar = () => {
      if (!newCalendar.name) return;
      setNewCalendar({ name: '', description: '', color: '#3B82F6' });
      setShowCreateCalendar(false);
    };

    const totalSessions = events.reduce((sum, e) => sum + (e.sessions || 0), 0);
    const totalAttendees = events.reduce((sum, e) => sum + (e.attendees || 0), 0);

    return (
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Events', value: events.length, icon: Calendar },
            { label: 'Speakers', value: speakers.length, icon: Mic },
            { label: 'Sponsors', value: sponsors.length, icon: Briefcase },
            { label: 'Attendees', value: totalAttendees, icon: Users },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <stat.icon className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-500 font-medium">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            { label: 'New Session', action: () => setShowCreateSession(true), icon: Clock },
            { label: 'New Group', action: () => setShowCreateGroup(true), icon: Users },
            { label: 'New Calendar', action: () => setShowCreateCalendar(true), icon: CalendarDays },
          ].map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium border rounded-xl hover:shadow-sm transition-all text-blue-700 bg-blue-50 border-blue-200 hover:bg-blue-100"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
          {[
            { label: 'Find Speakers', path: '/call-for-speakers', icon: Mic },
            { label: 'Find Sponsors', path: '/become-sponsor', icon: Briefcase },
            { label: 'Find Volunteers', path: '/become-organizer', icon: Heart },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium border rounded-xl hover:shadow-sm transition-all text-purple-700 bg-purple-50 border-purple-200 hover:bg-purple-100"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </div>

        {/* Events */}
        <div>
          <div className="flex items-center justify-between mb-4">
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
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {event.slug && (
                      <Link
                        to={`/events/${event.slug}`}
                        className="flex items-center justify-center gap-2 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                      >
                        View event
                      </Link>
                    )}
                    <button
                      onClick={() => setShareEvent(event)}
                      className="flex items-center justify-center gap-2 py-2.5 border-2 border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-900"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
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

        {/* Share Modal */}
        {shareEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full">
              <div className="border-b border-gray-200 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Share Event</h2>
                <button onClick={() => setShareEvent(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{shareEvent.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{shareEvent.location}</p>
                  <p className="text-sm text-gray-600">{shareEvent.date}</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">
{`Join us for ${shareEvent.name}! 🚀

📅 ${shareEvent.date}
📍 ${shareEvent.location}

Register now: ${window.location.origin}/events/${shareEvent.slug || shareEvent.id}`}
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => {
                      const url = `${window.location.origin}/events/${shareEvent.slug || shareEvent.id}`;
                      const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                      window.open(linkedInUrl, '_blank', 'width=600,height=600');
                      setShareEvent(null);
                    }}
                    className="flex items-center gap-3 p-4 bg-[#0077B5] text-white rounded-lg hover:bg-[#006399]"
                  >
                    <Linkedin className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium">Share on LinkedIn</div>
                      <div className="text-xs opacity-90">Share with your network</div>
                    </div>
                  </button>
                  <button
                    onClick={async () => {
                      const message = `Join us for ${shareEvent.name}! 🚀\n\n📅 ${shareEvent.date}\n📍 ${shareEvent.location}\n\nRegister now: ${window.location.origin}/events/${shareEvent.slug || shareEvent.id}`;
                      await navigator.clipboard.writeText(message);
                      setShareToast(true);
                      setTimeout(() => setShareToast(false), 3000);
                      setShareEvent(null);
                    }}
                    className="flex items-center gap-3 p-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                  >
                    <Copy className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium">Copy Message</div>
                      <div className="text-xs opacity-90">Copy to clipboard</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Share Toast */}
        {shareToast && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <p className="text-sm font-medium">Message copied to clipboard!</p>
            </div>
          </div>
        )}

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
                        name="group-visibility"
                        checked={newGroup.isPublic}
                        onChange={() => setNewGroup({...newGroup, isPublic: true})}
                        className="w-4 h-4 accent-growth"
                      />
                      <Globe className="w-4 h-4 text-stem" />
                      <span className="text-sm">Public</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="group-visibility"
                        checked={!newGroup.isPublic}
                        onChange={() => setNewGroup({...newGroup, isPublic: false})}
                        className="w-4 h-4 accent-growth"
                      />
                      <Lock className="w-4 h-4 text-stem" />
                      <span className="text-sm">Private</span>
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

        {/* Create Calendar Modal */}
        {showCreateCalendar && (
          <div className="fixed inset-0 bg-soil/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full">
              <div className="border-b border-mist p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-forest">Create New Calendar</h2>
                <button onClick={() => setShowCreateCalendar(false)} className="p-2 hover:bg-mist rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Calendar Name</label>
                  <input
                    type="text"
                    value={newCalendar.name}
                    onChange={(e) => setNewCalendar({...newCalendar, name: e.target.value})}
                    className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth"
                    placeholder="e.g., Q2 2026 Events"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Description</label>
                  <textarea
                    value={newCalendar.description}
                    onChange={(e) => setNewCalendar({...newCalendar, description: e.target.value})}
                    className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth resize-none"
                    rows="3"
                    placeholder="What is this calendar for?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Color</label>
                  <div className="flex gap-3">
                    {['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'].map((color) => (
                      <button
                        key={color}
                        onClick={() => setNewCalendar({...newCalendar, color})}
                        className={`w-9 h-9 rounded-full transition-all ${newCalendar.color === color ? 'ring-2 ring-offset-2 ring-gray-900 scale-110' : 'hover:scale-105'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleCreateCalendar}
                    className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    Create Calendar
                  </button>
                  <button
                    onClick={() => setShowCreateCalendar(false)}
                    className="px-4 py-3 bg-mist text-forest rounded-lg font-medium hover:bg-spring transition-colors"
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

        {/* Quick Actions for Speaker Role */}
        {currentRole === 'speaker' && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <button className="flex items-center gap-2.5 px-4 py-2.5 border border-gray-200 rounded-xl hover:border-spring hover:shadow-sm transition-all group bg-white">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Eye className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-forest whitespace-nowrap">View Public Profile</span>
            </button>
            <button className="flex items-center gap-2.5 px-4 py-2.5 border border-gray-200 rounded-xl hover:border-spring hover:shadow-sm transition-all group bg-white">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Edit2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-forest whitespace-nowrap">Edit Profile</span>
            </button>
            <button className="flex items-center gap-2.5 px-4 py-2.5 border border-gray-200 rounded-xl hover:border-spring hover:shadow-sm transition-all group bg-white">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Mic className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-forest whitespace-nowrap">My Sessions</span>
            </button>
            <button className="flex items-center gap-2.5 px-4 py-2.5 border border-gray-200 rounded-xl hover:border-spring hover:shadow-sm transition-all group bg-white">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Plus className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-forest whitespace-nowrap">Submit Talk</span>
            </button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-forest">
              {currentRole === 'speaker' ? 'Other Speakers' : 'All Speakers'}
            </h2>
            <p className="text-stem">{speakers.length} speakers</p>
          </div>
          {currentRole !== 'speaker' && (
            <button
              onClick={() => setShowAddSpeaker(true)}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Speaker
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

        {/* Quick Actions for Sponsor Role */}
        {currentRole === 'sponsor' && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <button className="flex items-center gap-2.5 px-4 py-2.5 border border-gray-200 rounded-xl hover:border-spring hover:shadow-sm transition-all group bg-white">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Building className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-forest whitespace-nowrap">My Sponsorships</span>
            </button>
            <button className="flex items-center gap-2.5 px-4 py-2.5 border border-gray-200 rounded-xl hover:border-spring hover:shadow-sm transition-all group bg-white">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-forest whitespace-nowrap">View Leads</span>
            </button>
            <button className="flex items-center gap-2.5 px-4 py-2.5 border border-gray-200 rounded-xl hover:border-spring hover:shadow-sm transition-all group bg-white">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-forest whitespace-nowrap">View Reports</span>
            </button>
            <button className="flex items-center gap-2.5 px-4 py-2.5 border border-gray-200 rounded-xl hover:border-spring hover:shadow-sm transition-all group bg-white">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Edit2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-forest whitespace-nowrap">Edit Profile</span>
            </button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-forest">
              {currentRole === 'sponsor' ? 'Other Sponsors' : 'All Sponsors'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {currentRole !== 'sponsor' && (
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
            )}
            {currentRole !== 'sponsor' && (
              <button
                onClick={() => setShowAddSponsor(true)}
                className="px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Sponsor
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

  // People Page (tabbed Speakers + Sponsors)
  const PeoplePage = () => {
    const [activeTab, setActiveTab] = useState('speakers');
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-forest">People</h1>
          <p className="text-stem mt-1">Manage speakers and sponsors for your events.</p>
        </div>
        <div className="flex gap-1 border-b border-gray-200">
          {[
            { id: 'speakers', label: 'Speakers', icon: Mic },
            { id: 'sponsors', label: 'Sponsors', icon: Briefcase },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 font-medium border-b-2 transition-all text-sm ${
                activeTab === tab.id
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === 'speakers' && <SpeakersPage />}
        {activeTab === 'sponsors' && <SponsorsPage />}
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
                    View Content
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

  const serviceProviders = {
    'food-providers': {
      title: 'Food & Catering',
      providers: [
        { id: 1, name: 'Moveable Feast Catering', location: 'San Francisco, CA', description: 'Full-service event catering specializing in farm-to-table menus for tech conferences.', specialties: ['Corporate Events', 'Farm-to-Table', 'Dietary Friendly'], rating: 4.8, reviewCount: 124, minOrder: '20 people', verified: true },
        { id: 2, name: 'Bay Bites Box Lunches', location: 'Palo Alto, CA', description: 'Premium individually boxed meals perfect for workshops and day-long conferences.', specialties: ['Box Lunches', 'Quick Service', 'Large Orders'], rating: 4.6, reviewCount: 89, minOrder: '10 people', verified: true },
        { id: 3, name: 'Saffron & Sage Catering', location: 'Mountain View, CA', description: 'Upscale catering with globally inspired menus for plated dinners and cocktail receptions.', specialties: ['Plated Dinners', 'Cocktail Events', 'Global Cuisine'], rating: 4.9, reviewCount: 67, minOrder: '30 people', verified: false },
        { id: 4, name: 'Morning Fuel Coffee Bar', location: 'Sunnyvale, CA', description: 'Mobile espresso bar and breakfast catering for morning events and hackathons.', specialties: ['Coffee Bar', 'Breakfast', 'Hackathons'], rating: 4.7, reviewCount: 203, minOrder: '15 people', verified: true },
      ]
    },
    'swag-providers': {
      title: 'Swag & Merch',
      providers: [
        { id: 1, name: 'PrintLab Custom Merch', location: 'San Jose, CA', description: 'High-quality custom t-shirts, hoodies, and apparel with fast turnaround.', specialties: ['Apparel', 'Eco-Friendly', 'Fast Turnaround'], rating: 4.7, reviewCount: 156, minOrder: '50 units', verified: true },
        { id: 2, name: 'Sticker Giant West', location: 'Fremont, CA', description: 'Custom die-cut stickers, laptop decals, and vinyl graphics for conferences.', specialties: ['Stickers', 'Die-Cut', 'Vinyl Decals'], rating: 4.9, reviewCount: 312, minOrder: '100 units', verified: true },
        { id: 3, name: 'SwagBox Co.', location: 'Oakland, CA', description: 'Curated swag boxes with premium branded items shipped to attendees or venues.', specialties: ['Swag Boxes', 'Direct Ship', 'Premium Items'], rating: 4.5, reviewCount: 78, minOrder: '25 boxes', verified: false },
        { id: 4, name: 'EcoSwag Supply', location: 'Berkeley, CA', description: 'Sustainable event swag — reusable bottles, bamboo accessories, recycled products.', specialties: ['Sustainable', 'Reusable', 'Custom Branding'], rating: 4.6, reviewCount: 91, minOrder: '30 units', verified: true },
      ]
    },
    'av-tech': {
      title: 'AV & Tech',
      providers: [
        { id: 1, name: 'EventTech AV Solutions', location: 'San Francisco, CA', description: 'Full-service AV rental and production — projectors, PA systems, live streaming.', specialties: ['AV Rental', 'Live Streaming', 'Sound Systems'], rating: 4.8, reviewCount: 97, minOrder: 'Half-day minimum', verified: true },
        { id: 2, name: 'PixelPerfect Event Photography', location: 'Palo Alto, CA', description: 'Professional event photography and videography with same-day delivery.', specialties: ['Photography', 'Videography', 'Same-Day Delivery'], rating: 4.9, reviewCount: 184, minOrder: '2 hours minimum', verified: true },
        { id: 3, name: 'StreamLine Productions', location: 'Santa Clara, CA', description: 'Hybrid and virtual event production — multi-camera streaming and post-editing.', specialties: ['Virtual Events', 'Multi-Camera', 'Post-Production'], rating: 4.7, reviewCount: 63, minOrder: 'Per event', verified: false },
        { id: 4, name: 'QuickRent AV', location: 'Redwood City, CA', description: 'Affordable AV equipment rental with delivery and setup for meetups.', specialties: ['Equipment Rental', 'Delivery & Setup', 'Budget Friendly'], rating: 4.5, reviewCount: 142, minOrder: 'No minimum', verified: true },
      ]
    }
  };

  const VolunteerDashboard = () => {
    const volunteerOpportunities = [
      { id: 1, event: 'Frontier AI & AI Agents', role: 'Registration Desk', date: '2026-03-15', time: '4:30 PM - 6:00 PM', status: 'confirmed', location: 'Snowflake HQ, Menlo Park' },
      { id: 2, event: 'React Bay Area Meetup', role: 'AV & Setup', date: '2026-03-22', time: '5:00 PM - 6:30 PM', status: 'pending', location: 'GitHub HQ, San Francisco' },
      { id: 3, event: 'Women in Tech Summit', role: 'Speaker Liaison', date: '2026-04-05', time: '8:00 AM - 5:00 PM', status: 'open', location: 'Convention Center, San Jose' },
      { id: 4, event: 'Startup Pitch Night', role: 'Photography', date: '2026-04-12', time: '6:00 PM - 9:00 PM', status: 'open', location: 'WeWork, Palo Alto' },
    ];

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-forest">Volunteer Dashboard</h2>
          <p className="text-stem mt-1">Manage your volunteer activities and find opportunities</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2.5 px-5 py-3 border border-gray-200 rounded-xl hover:border-spring hover:shadow-sm transition-all group bg-white">
            <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <span className="text-[15px] font-semibold text-forest block">Browse Events</span>
              <span className="text-xs text-stem">Find events needing help</span>
            </div>
          </button>
          <button className="flex items-center gap-2.5 px-5 py-3 border border-gray-200 rounded-xl hover:border-spring hover:shadow-sm transition-all group bg-white">
            <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <span className="text-[15px] font-semibold text-forest block">My Schedule</span>
              <span className="text-xs text-stem">View upcoming shifts</span>
            </div>
          </button>
          <button className="flex items-center gap-2.5 px-5 py-3 border border-gray-200 rounded-xl hover:border-spring hover:shadow-sm transition-all group bg-white">
            <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Star className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <span className="text-[15px] font-semibold text-forest block">My Hours</span>
              <span className="text-xs text-stem">Track volunteer hours</span>
            </div>
          </button>
        </div>

        <div>
          <h3 className="text-lg font-bold text-forest mb-4">Opportunities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {volunteerOpportunities.map(opp => (
              <div key={opp.id} className="card-brand rounded-2xl p-6 hover:border-spring hover:shadow-sm transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-forest">{opp.event}</h4>
                    <p className="text-sm text-stem mt-1">{opp.role}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    opp.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    opp.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {opp.status}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-stem">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{opp.date} &middot; {opp.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{opp.location}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-mist">
                  <button className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    opp.status === 'open'
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'bg-mist text-forest'
                  }`}>
                    {opp.status === 'open' ? 'Sign Up' : opp.status === 'pending' ? 'Awaiting Confirmation' : 'Confirmed'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const ServicesInlineView = ({ category }) => {
    const data = serviceProviders[category];
    if (!data) return null;
    return (
      <div>
        <h2 className="text-2xl font-bold text-forest mb-6">{data.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.providers.map(provider => (
            <div key={provider.id} className="card-brand rounded-2xl p-6 hover:border-spring hover:shadow-sm transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-forest">{provider.name}</h3>
                    {provider.verified && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-spring text-forest text-xs font-medium rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-stem mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{provider.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-semibold text-forest">{provider.rating}</span>
                  <span className="text-xs text-stem">({provider.reviewCount})</span>
                </div>
              </div>
              <p className="text-sm text-stem mb-4">{provider.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {provider.specialties.map((s, i) => (
                  <span key={i} className="px-2 py-1 bg-mist text-forest text-xs rounded-full">{s}</span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-mist">
                <span className="text-xs text-stem">Min: {provider.minOrder}</span>
                <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Services Hub Page (tabbed Food + Swag + AV)
  const ServicesHubPage = () => {
    const [activeTab, setActiveTab] = useState('food-providers');
    const tabs = [
      { id: 'food-providers', label: 'Food & Catering', icon: UtensilsCrossed },
      { id: 'swag-providers', label: 'Swag & Merch', icon: Package },
      { id: 'av-tech', label: 'AV & Tech', icon: Wrench },
    ];
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-forest">Services</h1>
          <p className="text-stem mt-1">Find and manage service providers for your events.</p>
        </div>
        <div className="flex gap-1 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 font-medium border-b-2 transition-all text-sm ${
                activeTab === tab.id
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
        <ServicesInlineView category={activeTab} />
      </div>
    );
  };

  const renderContent = () => {
    switch (currentPage) {
      // Organizer pages
      case 'organizers':
        return <OrganizersDashboard />;
      case 'people':
        return <PeoplePage />;
      case 'reports':
        return <ReportsPage />;
      case 'marketing':
        return <MarketingPage embedded />;

      // Speaker pages
      case 'speaker-dashboard':
        return <SpeakersPage />;
      case 'speaker-sessions':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-forest">My Sessions</h2>
              <p className="text-stem mt-1">Sessions you are presenting at</p>
            </div>
            <div className="space-y-3">
              {[
                { title: 'Superintelligence Labs: Building Safe AI', event: 'Frontier AI & AI Agents', date: '2026-03-15', time: '5:00 PM', duration: '30 min', status: 'confirmed' },
                { title: 'Panel: The Future of AI Agents', event: 'AI Summit 2026', date: '2026-04-20', time: '2:00 PM', duration: '45 min', status: 'pending' },
              ].map((session, i) => (
                <div key={i} className="card-brand rounded-2xl p-6 hover:border-spring hover:shadow-sm transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-forest text-lg">{session.title}</h3>
                      <p className="text-sm text-stem mt-1">{session.event}</p>
                      <div className="flex items-center gap-3 text-xs text-stem mt-3">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{session.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{session.time} &middot; {session.duration}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${session.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{session.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'speaker-submit':
        return (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-2xl font-bold text-forest">Submit a Talk</h2>
              <p className="text-stem mt-1">Propose a new talk for an upcoming event</p>
            </div>
            <div className="card-brand rounded-2xl p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-forest mb-2">Talk Title</label>
                <input type="text" className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth" placeholder="e.g., Building Scalable AI Systems" />
              </div>
              <div>
                <label className="block text-sm font-medium text-forest mb-2">Abstract</label>
                <textarea rows={4} className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth" placeholder="Describe what you'll cover..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Topic</label>
                  <select className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth bg-white">
                    <option>AI & Machine Learning</option>
                    <option>Web Development</option>
                    <option>Cloud & Infrastructure</option>
                    <option>Design & UX</option>
                    <option>Product Management</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Duration</label>
                  <select className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth bg-white">
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                    <option>45 minutes</option>
                    <option>60 minutes</option>
                  </select>
                </div>
              </div>
              <button className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">Submit Proposal</button>
            </div>
          </div>
        );
      case 'speaker-profile':
        return (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-2xl font-bold text-forest">My Profile</h2>
              <p className="text-stem mt-1">Manage your speaker profile</p>
            </div>
            <div className="card-brand rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-gray-900 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">N</div>
                <div>
                  <h3 className="text-xl font-bold text-forest">Nayam Rahman</h3>
                  <p className="text-stem">Meta &middot; AI Research</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Bio</label>
                  <textarea rows={3} className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth" defaultValue="AI researcher at Meta focusing on superintelligence safety and alignment." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Topics</label>
                  <div className="flex flex-wrap gap-2">
                    {['AI Safety', 'Superintelligence', 'ML Systems'].map(t => (
                      <span key={t} className="px-3 py-1 bg-mist text-forest text-sm rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
                <button className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">Save Changes</button>
              </div>
            </div>
          </div>
        );

      // Sponsor pages
      case 'sponsor-dashboard':
        return <SponsorsPage />;
      case 'sponsor-events':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-forest">My Events</h2>
              <p className="text-stem mt-1">Events you are sponsoring</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Frontier AI & AI Agents', date: '2026-03-15', location: 'Snowflake HQ, Menlo Park', tier: 'Platinum', status: 'active', attendees: 210 },
                { name: 'React Bay Area Meetup', date: '2026-03-22', location: 'GitHub HQ, San Francisco', tier: 'Gold', status: 'upcoming', attendees: 150 },
              ].map((event, i) => (
                <div key={i} className="card-brand rounded-2xl p-6 hover:border-spring hover:shadow-sm transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-forest text-lg">{event.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      event.tier === 'Platinum' ? 'bg-purple-100 text-purple-700' : 'bg-amber-100 text-amber-700'
                    }`}>{event.tier}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-stem mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{event.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{event.location}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-mist">
                    <span className="text-sm text-stem">{event.attendees} attendees</span>
                    <span className={`text-xs font-medium ${event.status === 'active' ? 'text-green-600' : 'text-blue-600'}`}>{event.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'sponsor-leads':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-forest">Leads</h2>
              <p className="text-stem mt-1">Leads generated from your sponsorships</p>
            </div>
            <div className="card-brand rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-mist">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stem uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stem uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stem uppercase">Event</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stem uppercase">Source</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-stem uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-mist">
                  {[
                    { name: 'Alex Chen', email: 'alex@startup.io', event: 'Frontier AI & AI Agents', source: 'Booth Visit', date: '2026-03-15' },
                    { name: 'Sarah Kim', email: 'sarah@techcorp.com', event: 'Frontier AI & AI Agents', source: 'QR Scan', date: '2026-03-15' },
                    { name: 'James Wu', email: 'james@devlab.co', event: 'Frontier AI & AI Agents', source: 'Booth Visit', date: '2026-03-15' },
                    { name: 'Maria Garcia', email: 'maria@aiventure.io', event: 'React Bay Area Meetup', source: 'Raffle Entry', date: '2026-03-22' },
                  ].map((lead, i) => (
                    <tr key={i} className="hover:bg-dew">
                      <td className="px-6 py-4 text-sm font-medium text-forest">{lead.name}</td>
                      <td className="px-6 py-4 text-sm text-stem">{lead.email}</td>
                      <td className="px-6 py-4 text-sm text-stem">{lead.event}</td>
                      <td className="px-6 py-4"><span className="px-2 py-1 bg-mist text-forest text-xs rounded-full">{lead.source}</span></td>
                      <td className="px-6 py-4 text-sm text-stem">{lead.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'sponsor-profile':
        return (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-2xl font-bold text-forest">Company Profile</h2>
              <p className="text-stem mt-1">Manage your sponsor profile</p>
            </div>
            <div className="card-brand rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">S</div>
                <div>
                  <h3 className="text-xl font-bold text-forest">Snowflake</h3>
                  <p className="text-stem">Platinum Sponsor</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Company Description</label>
                  <textarea rows={3} className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth" defaultValue="Snowflake enables every organization to mobilize their data with Snowflake's Data Cloud." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">Contact Person</label>
                  <input type="text" className="w-full px-4 py-3 border border-mist rounded-lg focus:outline-none focus:border-growth" defaultValue="Chad Walker" />
                </div>
                <button className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">Save Changes</button>
              </div>
            </div>
          </div>
        );

      // Volunteer pages
      case 'volunteer-dashboard':
        return <VolunteerDashboard />;
      case 'volunteer-opportunities':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-forest">Opportunities</h2>
              <p className="text-stem mt-1">Browse events looking for volunteers</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { event: 'React Bay Area Meetup', roles: ['AV Setup', 'Registration', 'Photography'], date: '2026-03-22', location: 'GitHub HQ, San Francisco', spots: 5 },
                { event: 'Women in Tech Summit', roles: ['Speaker Liaison', 'Check-in', 'Social Media'], date: '2026-04-05', location: 'Convention Center, San Jose', spots: 12 },
                { event: 'Startup Pitch Night', roles: ['Photography', 'Setup & Teardown'], date: '2026-04-12', location: 'WeWork, Palo Alto', spots: 3 },
                { event: 'AI Developer Conference', roles: ['Registration', 'AV Support', 'Workshop Assistant'], date: '2026-04-20', location: 'Snowflake HQ, Menlo Park', spots: 8 },
              ].map((opp, i) => (
                <div key={i} className="card-brand rounded-2xl p-6 hover:border-spring hover:shadow-sm transition-all">
                  <h3 className="font-bold text-forest text-lg mb-1">{opp.event}</h3>
                  <div className="flex items-center gap-2 text-sm text-stem mb-2">
                    <Calendar className="w-3.5 h-3.5" /><span>{opp.date}</span>
                    <span className="text-mist">|</span>
                    <MapPin className="w-3.5 h-3.5" /><span>{opp.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {opp.roles.map((r, j) => <span key={j} className="px-2 py-1 bg-mist text-forest text-xs rounded-full">{r}</span>)}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-mist">
                    <span className="text-sm text-stem">{opp.spots} spots left</span>
                    <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">Apply</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'volunteer-schedule':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-forest">My Schedule</h2>
              <p className="text-stem mt-1">Your upcoming volunteer shifts</p>
            </div>
            <div className="space-y-3">
              {[
                { event: 'Frontier AI & AI Agents', role: 'Registration Desk', date: '2026-03-15', time: '4:30 PM - 6:00 PM', location: 'Snowflake HQ, Menlo Park', status: 'confirmed' },
                { event: 'React Bay Area Meetup', role: 'AV & Setup', date: '2026-03-22', time: '5:00 PM - 6:30 PM', location: 'GitHub HQ, San Francisco', status: 'pending' },
              ].map((shift, i) => (
                <div key={i} className="card-brand rounded-2xl p-5 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-forest">{shift.event}</h4>
                    <p className="text-sm text-stem">{shift.role}</p>
                    <div className="flex items-center gap-3 text-xs text-stem mt-2">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{shift.date} &middot; {shift.time}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{shift.location}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${shift.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{shift.status}</span>
                </div>
              ))}
            </div>
          </div>
        );

      // Services pages
      case 'my-venues':
        return <MyVenuesPage />;
      case 'services-hub':
        return <ServicesHubPage />;
      case 'booking-requests':
        return <BookingRequestsPage />;

      default:
        return <OrganizersDashboard />;
    }
  };

  return (
    <div className="p-8">
      {renderContent()}
      {showTour && <AppTour onComplete={() => setShowTour(false)} />}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <WorkspaceProvider>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/workspace" element={<Dashboard />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/explore/organizations/:organizerSlug" element={<DiscoverPage />} />
            <Route path="/groups" element={<GroupsPage />} />
            <Route path="/groups/:orgId" element={<OrganizationPage />} />
            <Route path="/groups/:orgId/events" element={<OrganizationEventsPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/events/:eventId" element={<EventPage />} />
            <Route path="/events/:eventId/media-kit" element={<MediaKitPage />} />
            <Route path="/events/:eventId/sessions/:sessionSlug/:stage" element={<SessionDetailPage />} />
            <Route path="/events/:eventId/sessions/:sessionSlug" element={<SessionDetailPage />} />
            <Route path="/email-builder" element={<EmailMakerPage />} />
            <Route path="/add-venue" element={<VenueSubmissionPage />} />
            <Route path="/venues" element={<VenueDiscoveryPage />} />
            <Route path="/organizers" element={<OrganizersListPage />} />
            <Route path="/submit-event" element={<EventSubmissionPage />} />
            <Route path="/become-organizer" element={<CertifiedOrganizerPage />} />
            <Route path="/become-sponsor" element={<SponsorSubmissionPage />} />
            <Route path="/become-speaker" element={<SpeakerSubmissionPage />} />
            <Route path="/call-for-speakers" element={<CallForSpeakersPage />} />
            <Route path="/event-services" element={<EventServicesPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/marketing" element={<MarketingPage />} />
            <Route path="/getting-started" element={<GettingStartedPage />} />
            <Route path="/create" element={<CreateContentPage />} />
            <Route path="/event-plan" element={<EventPlanPage />} />
            <Route path="/event-plan/new" element={<CreatePlan />} />
            <Route path="/event-plan/:id" element={<PlanDetail />} />
            <Route path="*" element={
              <div className="min-h-screen bg-white flex items-center justify-center p-8">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-xl text-gray-600 mb-6">Page not found</p>
                  <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                    Go Home
                  </Link>
                </div>
              </div>
            } />
          </Route>
        </Routes>
      </WorkspaceProvider>
    </BrowserRouter>
  );
}

export default App;
