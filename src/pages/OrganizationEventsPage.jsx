import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar as CalendarIcon, MapPin, Users, Globe, ArrowLeft, Clock, Video, FileText, Image as ImageIcon, TrendingUp, Building2 } from 'lucide-react';
import Header from '../components/Header';

export default function OrganizationEventsPage() {
  const { orgId } = useParams();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Organization data
  const organizations = {
    'techequity-ai': {
      id: 'techequity-ai',
      name: 'TechEquity Ai',
      logo: '/techequityailogo.png',
      banner: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200',
      description: 'TechEquity events in and around Silicon Valley.',
      website: 'https://www.techequity-ai.org',
      members: 2847,
      allEvents: [
        {
          id: 'HkGjx',
          name: 'Product & Business Strategy in AI: Talks + AI Agent Workshops',
          date: '2026-02-19',
          time: '5:00 PM - 8:00 PM',
          location: '135 Constitution Dr, Menlo Park, CA 94025',
          category: 'AI & Technology',
          type: 'Workshop',
          status: 'past',
          attendees: 150,
          externalUrl: 'https://lu.ma/example',
          hasVideo: true,
          hasSlides: true,
          hasPhotos: true,
          image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
          description: 'Explore the fundamentals of business strategy in AI and get hands-on with AI agent development.',
        },
        {
          id: 2,
          name: 'Spring 2026 Ai Forum',
          date: '2026-03-31',
          time: '10:00 AM - 4:00 PM',
          location: '135 Constitution Dr, Menlo Park, CA 94025',
          category: 'AI & Technology',
          type: 'Conference',
          status: 'upcoming',
          attendees: 200,
          externalUrl: 'https://lu.ma/example',
          hasVideo: false,
          hasSlides: false,
          hasPhotos: false,
          image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800',
          description: 'Join us for our annual Spring AI Forum featuring industry leaders and innovators.',
        },
        {
          id: 3,
          name: 'Workforce Transformation with AI',
          date: '2026-04-28',
          time: '5:00 PM - 7:00 PM',
          location: '135 Constitution Dr, Menlo Park, CA 94025',
          category: 'Business & Strategy',
          type: 'Talk',
          status: 'upcoming',
          attendees: 120,
          externalUrl: 'https://lu.ma/example',
          hasVideo: false,
          hasSlides: false,
          hasPhotos: false,
          image: 'https://images.unsplash.com/photo-1559223607-0c1e07471d60?w=800',
          description: 'Discover how AI is reshaping the workforce and what it means for your organization.',
        },
        {
          id: 4,
          name: 'Machine Learning Best Practices',
          date: '2025-12-15',
          time: '6:00 PM - 9:00 PM',
          location: '135 Constitution Dr, Menlo Park, CA 94025',
          category: 'AI & Technology',
          type: 'Workshop',
          status: 'past',
          attendees: 180,
          externalUrl: 'https://lu.ma/example',
          hasVideo: true,
          hasSlides: true,
          hasPhotos: true,
          image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800',
          description: 'Learn industry best practices for building and deploying ML models at scale.',
        },
        {
          id: 5,
          name: 'AI Ethics & Governance Summit',
          date: '2025-11-20',
          time: '9:00 AM - 5:00 PM',
          location: '135 Constitution Dr, Menlo Park, CA 94025',
          category: 'Ethics & Policy',
          type: 'Conference',
          status: 'past',
          attendees: 250,
          externalUrl: 'https://lu.ma/example',
          hasVideo: true,
          hasSlides: true,
          hasPhotos: true,
          image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800',
          description: 'Explore the ethical implications and governance frameworks for AI development.',
        },
        {
          id: 6,
          name: 'Deep Learning Foundations',
          date: '2025-10-10',
          time: '5:00 PM - 8:00 PM',
          location: '135 Constitution Dr, Menlo Park, CA 94025',
          category: 'AI & Technology',
          type: 'Workshop',
          status: 'past',
          attendees: 160,
          externalUrl: 'https://lu.ma/example',
          hasVideo: true,
          hasSlides: true,
          hasPhotos: true,
          image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800',
          description: 'Master the fundamentals of deep learning and neural networks.',
        },
      ],
    },
  };

  const org = organizations[orgId];

  if (!org) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Organization not found</h1>
          <p className="text-gray-600 mb-4">We couldn't find an organization with that ID.</p>
          <Link to="/discover" className="text-blue-600 font-medium hover:underline">
            Back to discover
          </Link>
        </div>
      </div>
    );
  }

  // Get unique categories
  const categories = ['All', ...new Set(org.allEvents.map(event => event.category))];

  // Filter events
  const filteredEvents = org.allEvents.filter(event => {
    const matchesTab = event.status === activeTab;
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    return matchesTab && matchesCategory;
  });

  // Get event stats
  const upcomingCount = org.allEvents.filter(e => e.status === 'upcoming').length;
  const pastCount = org.allEvents.filter(e => e.status === 'past').length;
  const totalAttendees = org.allEvents.reduce((sum, e) => sum + e.attendees, 0);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to={`/groups/${orgId}`}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {org.name}
        </Link>

        {/* Organization Header with Banner */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
          {/* Banner Image */}
          <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
            {org.banner ? (
              <img
                src={org.banner}
                alt={`${org.name} banner`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Building2 className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>

          {/* Logo and Stats Section */}
          <div className="relative px-6 pb-6">
            <div className="flex items-start gap-6">
              {/* Logo/Profile Picture - Overlapping the banner */}
              <div className="relative -mt-16">
                <div className="w-32 h-32 bg-white border-4 border-white rounded-lg shadow-lg flex items-center justify-center overflow-hidden">
                  <img src={org.logo} alt={org.name} className="w-full h-full object-contain p-3" />
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm mt-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <CalendarIcon className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold">{upcomingCount}</span>
                  <span className="text-gray-600">Upcoming</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="font-semibold">{pastCount}</span>
                  <span className="text-gray-600">Past Events</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span className="font-semibold">{totalAttendees.toLocaleString()}</span>
                  <span className="text-gray-600">Total Attendees</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'upcoming'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Upcoming ({upcomingCount})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'past'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Past Events ({pastCount})
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all group"
            >
              {/* Event Image */}
              <div className="relative aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                {event.image ? (
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <CalendarIcon className="w-16 h-16 text-gray-400" />
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    event.status === 'upcoming'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-900 text-white'
                  }`}>
                    {event.status === 'upcoming' ? 'Upcoming' : 'Past Event'}
                  </span>
                </div>

                {/* Resource Badges for Past Events */}
                {event.status === 'past' && (
                  <div className="absolute top-3 right-3 flex gap-1">
                    {event.hasVideo && (
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <Video className="w-4 h-4 text-gray-900" />
                      </div>
                    )}
                    {event.hasSlides && (
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <FileText className="w-4 h-4 text-gray-900" />
                      </div>
                    )}
                    {event.hasPhotos && (
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <ImageIcon className="w-4 h-4 text-gray-900" />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Event Details */}
              <div className="p-5">
                {/* Category & Type */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-900 text-xs font-medium rounded">
                    {event.type}
                  </span>
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded">
                    {event.category}
                  </span>
                </div>

                {/* Event Name */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {event.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {event.description}
                </p>

                {/* Event Meta */}
                <div className="space-y-2 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-gray-400" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{event.location.split(',').slice(-2).join(',').trim()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{event.attendees} attendees</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {event.status === 'upcoming' ? (
                    <>
                      <a
                        href={event.externalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-900 text-sm font-medium rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors text-center"
                      >
                        Register
                      </a>
                      <Link
                        to={`/events/${event.id}`}
                        className="flex-1 px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors text-center"
                      >
                        Digo
                      </Link>
                    </>
                  ) : (
                    <Link
                      to={`/events/${event.id}`}
                      className="flex-1 px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors text-center"
                    >
                      View Recap
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-16 bg-white border border-gray-200 rounded-lg">
            <CalendarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600 mb-4">
              {selectedCategory === 'All'
                ? `No ${activeTab} events available.`
                : `No ${activeTab} events in "${selectedCategory}" category.`}
            </p>
            {selectedCategory !== 'All' && (
              <button
                onClick={() => setSelectedCategory('All')}
                className="text-blue-600 font-medium hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
