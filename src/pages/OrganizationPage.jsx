import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar as CalendarIcon, MapPin, Users, ChevronLeft, ChevronRight, Clock, Globe, Building2, Filter, Mail } from 'lucide-react';
import Header from '../components/Header';

export default function OrganizationPage() {
  const { orgId } = useParams();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); // February 2026
  const [selectedFilters, setSelectedFilters] = useState({
    online: true,
    inPerson: true,
    workshops: true,
    talks: true,
  });

  // Organization data - can be fetched based on orgId
  const organizations = {
    'techequity-ai': {
      id: 'techequity-ai',
      name: 'TechEquity Ai',
      logo: '/techequityailogo.png',
      banner: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200',
      description: 'TechEquity events in and around Silicon Valley. Specifically, monthly meet ups, workshops and our yearly Ai Summit conference.',
      website: 'https://www.techequity-ai.org',
      members: 2847,
      events: [
        {
          id: 'HkGjx',
          name: 'Product & Business Strategy in AI: Talks + AI Agent Workshops',
          date: '2026-02-19',
          time: '5:00 PM',
          location: '135 Constitution Dr, Menlo Park, CA 94025',
          type: 'online',
          category: 'Talks',
          externalUrl: 'https://lu.ma/example',
        },
        {
          id: 2,
          name: 'Spring 2026 Ai Forum',
          date: '2026-03-31',
          time: '10:00 AM',
          location: '135 Constitution Dr, Menlo Park, CA 94025',
          type: 'inPerson',
          category: 'Workshop',
          externalUrl: 'https://lu.ma/example',
        },
        {
          id: 3,
          name: 'Workforce Transformation with AI',
          date: '2026-04-28',
          time: '5:00 PM',
          location: '135 Constitution Dr, Menlo Park, CA 94025',
          type: 'online',
          category: 'Talks',
          externalUrl: 'https://lu.ma/example',
        },
        {
          id: 4,
          name: 'TechEquity Event #5',
          date: '2026-05-26',
          time: '5:00 PM',
          location: '135 Constitution Dr, Menlo Park, CA 94025',
          type: 'inPerson',
          category: 'Workshop',
          externalUrl: 'https://lu.ma/example',
        },
        {
          id: 5,
          name: 'TechEquity Event #6',
          date: '2026-06-30',
          time: '5:00 PM',
          location: '135 Constitution Dr, Menlo Park, CA 94025',
          type: 'online',
          category: 'Talks',
          externalUrl: 'https://lu.ma/example',
        },
        {
          id: 6,
          name: 'TechEquity Event #7',
          date: '2026-07-28',
          time: '5:00 PM',
          location: '135 Constitution Dr, Menlo Park, CA 94025',
          type: 'inPerson',
          category: 'Workshop',
          externalUrl: 'https://lu.ma/example',
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
    return org.events.filter((event) => {
      const matchesDate = event.date === dateStr;
      const matchesFilters =
        (selectedFilters.online && event.type === 'online') ||
        (selectedFilters.inPerson && event.type === 'inPerson');
      return matchesDate && matchesFilters;
    });
  };

  const changeMonth = (delta) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1));
  };

  const toggleFilter = (filter) => {
    setSelectedFilters(prev => ({ ...prev, [filter]: !prev[filter] }));
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

  // Filter events based on selected filters
  const filteredUpcomingEvents = org.events
    .filter(event => {
      const matchesFilters =
        (selectedFilters.online && event.type === 'online') ||
        (selectedFilters.inPerson && event.type === 'inPerson');
      return matchesFilters;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Organization Header with Banner */}
        <div className="mb-8">
          <div className="relative bg-white border border-gray-200 rounded-lg overflow-hidden">
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

              {/* Send Newsletter Button */}
              <div className="absolute top-4 right-4">
                <Link
                  to="/email-builder"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg"
                >
                  <Mail className="w-4 h-4" />
                  Send Newsletter
                </Link>
              </div>
            </div>

            {/* Logo/Profile Picture - Overlapping the banner */}
            <div className="relative px-6 pb-6">
              <div className="absolute -top-16 left-6">
                <div className="w-32 h-32 bg-white border-4 border-white rounded-lg shadow-lg flex items-center justify-center overflow-hidden">
                  <img src={org.logo} alt={org.name} className="w-full h-full object-contain p-3" />
                </div>
              </div>

              {/* Spacer to account for overlapping logo */}
              <div className="h-20"></div>
            </div>
          </div>
        </div>

        {/* Split View: Calendar + Events */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Compact Calendar + Filters */}
          <div className="lg:col-span-1 space-y-4">
            {/* Compact Calendar */}
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-gray-900">
                  {monthNames[month].substring(0, 3)} {year}
                </h2>
                <div className="flex gap-1">
                  <button
                    onClick={() => changeMonth(-1)}
                    className="p-1 border border-gray-200 rounded hover:border-gray-300 hover:bg-gray-50 transition-all"
                  >
                    <ChevronLeft className="w-3 h-3 text-gray-900" />
                  </button>
                  <button
                    onClick={() => changeMonth(1)}
                    className="p-1 border border-gray-200 rounded hover:border-gray-300 hover:bg-gray-50 transition-all"
                  >
                    <ChevronRight className="w-3 h-3 text-gray-900" />
                  </button>
                </div>
              </div>

              {/* Day Names */}
              <div className="grid grid-cols-7 gap-0.5 mb-1">
                {dayNames.map((day) => (
                  <div key={day} className="text-center text-[9px] font-semibold text-gray-500 py-0.5">
                    {day.substring(0, 1)}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-0.5">
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
                      className={`aspect-square border border-gray-200 rounded flex flex-col items-center justify-center text-[10px] font-medium transition-all ${
                        isToday ? 'bg-blue-50 border-blue-300 text-blue-600' : 'bg-white text-gray-900'
                      } ${dayEvents.length > 0 ? 'cursor-pointer hover:border-gray-400' : ''}`}
                    >
                      <span>{day}</span>
                      {dayEvents.length > 0 && (
                        <div className="flex gap-0.5 mt-0.5">
                          {dayEvents.slice(0, 3).map((event, i) => (
                            <div
                              key={i}
                              className={`w-1 h-1 rounded-full ${
                                event.type === 'online' ? 'bg-gray-900' : 'bg-blue-600'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Compact Filters */}
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-3 h-3 text-gray-600" />
                <h3 className="text-xs font-semibold text-gray-900">Filters</h3>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => toggleFilter('online')}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs font-medium transition-all ${
                    selectedFilters.online
                      ? 'bg-gray-900 text-white'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-3 h-3 rounded border flex items-center justify-center flex-shrink-0 ${
                    selectedFilters.online ? 'border-white bg-white' : 'border-gray-300'
                  }`}>
                    {selectedFilters.online && (
                      <svg className="w-2 h-2 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <Globe className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">Online</span>
                </button>
                <button
                  onClick={() => toggleFilter('inPerson')}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs font-medium transition-all ${
                    selectedFilters.inPerson
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-3 h-3 rounded border flex items-center justify-center flex-shrink-0 ${
                    selectedFilters.inPerson ? 'border-white bg-white' : 'border-gray-300'
                  }`}>
                    {selectedFilters.inPerson && (
                      <svg className="w-2 h-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <Building2 className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">In-Person</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Upcoming Events List */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
              <Link
                to={`/groups/${orgId}/events`}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-900 rounded-lg text-sm font-medium hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <CalendarIcon className="w-4 h-4" />
                View All Events
              </Link>
            </div>
            <div className="space-y-4">
              {filteredUpcomingEvents.length > 0 ? (
                filteredUpcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2.5 py-0.5 text-xs font-medium rounded ${
                            event.type === 'online'
                              ? 'bg-gray-100 text-gray-900'
                              : 'bg-blue-50 text-blue-600'
                          }`}>
                            {event.type === 'online' ? 'Online' : 'In-Person'}
                          </span>
                          <span className="px-2.5 py-0.5 bg-gray-100 text-gray-900 text-xs font-medium rounded">
                            {event.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{event.name}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4" />
                            {new Date(event.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span className="truncate">{event.location.split(',').slice(-2).join(',').trim()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 min-w-[200px]">
                        <a
                          href={event.externalUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 border border-gray-200 text-gray-900 text-sm font-medium rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors text-center"
                        >
                          Register
                        </a>
                        <Link
                          to={`/events/${event.id}`}
                          className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors text-center"
                        >
                          Digo
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">No events match your current filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
