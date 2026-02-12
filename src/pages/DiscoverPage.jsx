import { useState } from 'react';
import { Grid, List, ChevronDown, Calendar as CalendarIcon, ChevronLeft, ChevronRight, MapPin, TrendingUp, Star, Building2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';

export default function DiscoverPage() {
  const { organizerSlug } = useParams();
  const [viewMode, setViewMode] = useState('list');
  const [selectedOrganizer, setSelectedOrganizer] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); // February 2026
  const [userLocation, setUserLocation] = useState('Menlo Park, CA'); // Could be dynamic

  // Organization data
  const organizations = {
    'techequity-ai': {
      id: 'techequity-ai',
      name: 'TechEquity Ai',
      logo: '/techequityailogo.png',
      banner: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200',
      description: 'TechEquity events in and around Silicon Valley. Monthly meet ups, workshops and our yearly Ai Summit conference.',
      website: 'https://www.techequity-ai.org',
      members: 2847,
    }
  };

  const currentOrganization = organizerSlug ? organizations[organizerSlug] : null;

  // Sample events for discovery
  const events = [
    {
      id: 'HkGjx',
      name: 'Product & Business Strategy in AI: Talks + AI Agent Workshops',
      date: '2026-02-19',
      time: '5:00 PM',
      location: '135 Constitution Dr, Menlo Park, CA 94025',
      organizer: 'TechEquity Ai',
      organizerSlug: 'techequity-ai',
      category: 'AI & Technology',
      type: 'Workshop',
      featured: true,
      distance: '0.5 miles',
      externalUrl: 'https://lu.ma/example-event-1',
      image: null,
    },
    {
      id: 2,
      name: 'Spring 2026 Ai Forum',
      date: '2026-03-31',
      time: '10:00 AM',
      location: '135 Constitution Dr, Menlo Park, CA 94025',
      organizer: 'TechEquity Ai',
      organizerSlug: 'techequity-ai',
      category: 'AI & Technology',
      type: 'Conference',
      featured: true,
      distance: '0.5 miles',
      externalUrl: 'https://eventbrite.com/example-event-2',
      image: null,
    },
    {
      id: 3,
      name: 'Workforce Transformation with AI',
      date: '2026-04-28',
      time: '5:00 PM',
      location: '135 Constitution Dr, Menlo Park, CA 94025',
      organizer: 'TechEquity Ai',
      organizerSlug: 'techequity-ai',
      category: 'Business & Strategy',
      type: 'Talk',
      featured: false,
      distance: '0.5 miles',
      externalUrl: 'https://lu.ma/example-event-3',
      image: null,
    },
    {
      id: 4,
      name: 'TechEquity Event #5',
      date: '2026-05-26',
      time: '5:00 PM',
      location: '135 Constitution Dr, Menlo Park, CA 94025',
      organizer: 'TechEquity Ai',
      organizerSlug: 'techequity-ai',
      category: 'AI & Technology',
      type: 'Workshop',
      featured: false,
      distance: '0.5 miles',
      externalUrl: 'https://lu.ma/example-event-4',
      image: null,
    },
    {
      id: 5,
      name: 'TechEquity Event #6',
      date: '2026-06-30',
      time: '5:00 PM',
      location: '135 Constitution Dr, Menlo Park, CA 94025',
      organizer: 'TechEquity Ai',
      organizerSlug: 'techequity-ai',
      category: 'AI & Technology',
      type: 'Networking',
      featured: false,
      distance: '0.5 miles',
      externalUrl: 'https://lu.ma/example-event-5',
      image: null,
    },
    {
      id: 6,
      name: 'TechEquity Event #7',
      date: '2026-07-28',
      time: '5:00 PM',
      location: '135 Constitution Dr, Menlo Park, CA 94025',
      organizer: 'TechEquity Ai',
      organizerSlug: 'techequity-ai',
      category: 'Business & Strategy',
      type: 'Talk',
      featured: false,
      distance: '0.5 miles',
      externalUrl: 'https://lu.ma/example-event-6',
      image: null,
    },
  ];

  // Get unique values
  const organizers = ['All', ...new Set(events.map(event => event.organizer))];
  const categories = ['All', ...new Set(events.map(event => event.category))];

  // Filter events
  const filteredEvents = events.filter(event => {
    const matchesOrganizer = selectedOrganizer === 'All' || event.organizer === selectedOrganizer;
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesOrgSlug = !organizerSlug || event.organizerSlug === organizerSlug;
    return matchesOrganizer && matchesCategory && matchesOrgSlug;
  });

  // Get featured events
  const featuredEvents = events.filter(event => event.featured).slice(0, 3);

  // Get nearby events (sorted by distance)
  const nearbyEvents = events
    .filter(event => parseFloat(event.distance) <= 5) // Within 5 miles
    .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
    .slice(0, 4);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getMonthAbbr = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  };

  const getShortLocation = (location) => {
    const parts = location.split(',');
    return parts.length > 1 ? parts.slice(-2).join(',').trim() : location;
  };

  // Calendar functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const getEventsForDate = (date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return filteredEvents.filter((event) => event.date === dateStr);
  };

  const changeMonth = (delta) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1));
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Create calendar grid
  const calendarDays = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Organization Header (when viewing specific organization) */}
        {currentOrganization && (
          <div className="mb-8">
            <div className="relative bg-white border border-gray-200 rounded-lg overflow-hidden">
              {/* Banner Image */}
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                {currentOrganization.banner ? (
                  <img
                    src={currentOrganization.banner}
                    alt={`${currentOrganization.name} banner`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Building2 className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Logo/Profile Picture - Overlapping the banner */}
              <div className="relative px-6 pb-6">
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                  <div className="w-32 h-32 bg-white border-4 border-white rounded-lg shadow-lg flex items-center justify-center overflow-hidden">
                    <img src={currentOrganization.logo} alt={currentOrganization.name} className="w-full h-full object-contain p-3" />
                  </div>
                </div>

                {/* Spacer to account for overlapping logo */}
                <div className="h-20"></div>
              </div>
            </div>
          </div>
        )}

        {/* Page Header (when not viewing specific organization) */}
        {!currentOrganization && (
          <div className="mb-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Discover Events</h1>
                <p className="text-lg text-gray-600">Find events near you, by category, or browse all upcoming events</p>
              </div>
              <Link
                to="/add-venue"
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors whitespace-nowrap"
              >
                <Building2 className="w-4 h-4" />
                Add Venue
              </Link>
            </div>
          </div>
        )}

        {/* View Mode Toggle & Organizer Filter */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <label htmlFor="organizer-filter" className="text-sm font-medium text-gray-700">
              Organizer:
            </label>
            <div className="relative">
              <select
                id="organizer-filter"
                value={selectedOrganizer}
                onChange={(e) => setSelectedOrganizer(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 bg-white text-gray-900 text-sm font-medium cursor-pointer hover:border-gray-300 transition-colors"
              >
                {organizers.map((organizer) => (
                  <option key={organizer} value={organizer}>
                    {organizer}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
            </div>
            {(selectedOrganizer !== 'All' || selectedCategory !== 'All') && (
              <span className="text-sm text-gray-600">
                {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-50'
              }`}
              aria-label="Grid view"
            >
              <Grid className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-50'
              }`}
              aria-label="List view"
            >
              <List className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'calendar' ? 'bg-white shadow-sm' : 'hover:bg-gray-50'
              }`}
              aria-label="Calendar view"
            >
              <CalendarIcon className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Featured Events */}
        {!currentOrganization && featuredEvents.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">Featured Events</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {featuredEvents.slice(0, 2).map((event) => (
                <div
                  key={event.id}
                  className="bg-white border border-blue-600 rounded-lg overflow-hidden hover:shadow-md transition-all group flex"
                >
                  {/* Event Image or Placeholder */}
                  <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 w-32 flex-shrink-0 flex items-center justify-center p-2">
                    {/* Featured Badge */}
                    <div className="absolute top-1 left-1 bg-blue-600 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-0.5">
                      <Star className="w-2 h-2" />
                      Featured
                    </div>

                    {/* Month Badge */}
                    <div className="absolute top-1 right-1 bg-white px-1.5 py-1 rounded shadow-sm">
                      <span className="text-[10px] font-bold text-gray-900">{getMonthAbbr(event.date)}</span>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-2 flex-1 flex flex-col">
                    <h3 className="text-xs font-bold text-gray-900 mb-1 line-clamp-1">
                      {event.name}
                    </h3>

                    <div className="space-y-0.5 text-[10px] text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{getShortLocation(event.location)}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-1 mt-auto">
                      <a
                        href={event.externalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 px-2 py-1 border border-gray-200 text-gray-900 text-[10px] font-medium rounded hover:border-gray-300 hover:bg-gray-50 transition-colors text-center"
                      >
                        Register
                      </a>
                      <Link
                        to={`/events/${event.id}`}
                        className="flex-1 px-2 py-1 bg-gray-900 text-white text-[10px] font-medium rounded hover:bg-gray-800 transition-colors text-center"
                      >
                        Digo
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Browse by Category */}
        {!currentOrganization && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Browse by Category</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
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
        )}

        {/* All Events - Different Views */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all group"
              >
                {/* Event Image or Placeholder */}
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 aspect-[4/3] flex items-center justify-center p-6">
                  {/* Month Badge */}
                  <div className="absolute top-4 left-4 bg-white px-3 py-2 rounded shadow-sm">
                    <span className="text-sm font-bold text-gray-900">{getMonthAbbr(event.date)}</span>
                  </div>

                  {/* Type Badge */}
                  <div className="absolute top-4 right-4 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {event.type}
                  </div>

                  {/* Event Name as Placeholder */}
                  {!event.image && (
                    <div className="bg-white rounded-lg p-6 max-w-full">
                      <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                        {event.name.split(':')[0]}
                      </h3>
                      {event.name.includes(':') && (
                        <p className="text-sm text-gray-600 mt-2">
                          {event.name.split(':')[1].trim()}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Event Details */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                    {event.name}
                  </h3>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{getShortLocation(event.location)}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mb-3">
                    <a
                      href={event.externalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 px-3 py-2 border border-gray-200 text-gray-900 text-xs font-medium rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors text-center"
                    >
                      Register
                    </a>
                    <Link
                      to={`/events/${event.id}`}
                      className="flex-1 px-3 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors text-center"
                    >
                      Digo
                    </Link>
                  </div>

                  {/* Organizer Badge */}
                  <Link
                    to={`/discover/organizations/${event.organizerSlug}`}
                    className="flex items-center gap-2 pt-3 border-t border-gray-200 hover:bg-gray-50 -mx-4 -mb-4 px-4 pb-4 rounded-b-lg transition-colors"
                  >
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-sm font-medium text-blue-600">{event.organizer}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : viewMode === 'calendar' ? (
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-12">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {monthNames[month]} {year}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => changeMonth(-1)}
                  className="p-2 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-900" />
                </button>
                <button
                  onClick={() => changeMonth(1)}
                  className="p-2 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all"
                >
                  <ChevronRight className="w-5 h-5 text-gray-900" />
                </button>
              </div>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {dayNames.map((day) => (
                <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => {
                if (day === null) {
                  return <div key={`empty-${index}`} className="aspect-square" />;
                }

                const date = new Date(year, month, day);
                const dayEvents = getEventsForDate(date);
                const isToday = date.toDateString() === new Date().toDateString();

                return (
                  <div
                    key={day}
                    className={`aspect-square border border-gray-200 rounded-lg p-2 hover:border-gray-300 transition-all ${
                      isToday ? 'bg-blue-50 border-blue-300' : 'bg-white'
                    } ${dayEvents.length > 0 ? 'cursor-pointer' : ''}`}
                  >
                    <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                      {day}
                    </div>
                    {dayEvents.length > 0 && (
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((event) => (
                          <Link
                            key={event.id}
                            to={`/events/${event.id}`}
                            className="block text-[10px] bg-gray-900 text-white px-1.5 py-0.5 rounded truncate hover:bg-gray-800 transition-colors"
                          >
                            {event.name}
                          </Link>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-[10px] text-gray-600 px-1">+{dayEvents.length - 2} more</div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Events Table */
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white mb-12">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="col-span-2 text-sm font-semibold text-gray-600">Date</div>
              <div className="col-span-5 text-sm font-semibold text-gray-600">Name</div>
              <div className="col-span-3 text-sm font-semibold text-gray-600">Location</div>
              <div className="col-span-2 text-sm font-semibold text-gray-600 text-right">Actions</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors"
                >
                  {/* Date Column */}
                  <div className="col-span-2">
                    <p className="text-sm text-gray-900 font-medium">
                      {formatDate(event.date)}
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">{event.time}</p>
                  </div>

                  {/* Name Column */}
                  <div className="col-span-5">
                    <p className="text-sm text-gray-900 mb-2">{event.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-gray-100 text-gray-900 text-xs font-medium rounded">
                        {event.type}
                      </span>
                      <Link
                        to={`/discover/organizations/${event.organizerSlug}`}
                        className="px-2.5 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded hover:bg-blue-100 transition-colors"
                      >
                        {event.organizer}
                      </Link>
                    </div>
                  </div>

                  {/* Location Column */}
                  <div className="col-span-3">
                    <p className="text-sm text-gray-600">{event.location}</p>
                  </div>

                  {/* Event Actions Column */}
                  <div className="col-span-2 flex items-center justify-end gap-2">
                    <a
                      href={event.externalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 border border-gray-200 text-gray-900 text-xs font-medium rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      Register
                    </a>
                    <Link
                      to={`/events/${event.id}`}
                      className="px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Digo
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Events Near You */}
        {!currentOrganization && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Near {userLocation}</h2>
            </div>
            <button className="text-sm text-blue-600 font-medium hover:underline">
              Change location
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {nearbyEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 bg-gray-100 text-gray-900 text-xs font-medium rounded">
                    {event.type}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <MapPin className="w-3 h-3" />
                    {event.distance}
                  </div>
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {event.name}
                </h3>
                <p className="text-xs text-gray-600 mb-3">{formatDate(event.date)}</p>
                <div className="flex gap-2">
                  <a
                    href={event.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 px-2 py-1.5 border border-gray-200 text-gray-900 text-xs font-medium rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors text-center"
                  >
                    Register
                  </a>
                  <Link
                    to={`/events/${event.id}`}
                    className="flex-1 px-2 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors text-center"
                  >
                    Digo
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}
      </main>
    </div>
  );
}
