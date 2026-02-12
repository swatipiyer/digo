import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar as CalendarIcon, MapPin, Users, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import Header from '../components/Header';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); // January 2026

  // Sample events
  const events = [
    {
      id: 'HkGjx',
      name: 'Frontier AI & AI Agents: Talks + Workshops',
      date: '2026-01-27',
      time: '9:00 AM - 5:00 PM',
      location: 'Snowflake Silicon Valley AI Hub',
      attendees: 247,
      category: 'AI & ML',
    },
    {
      id: 2,
      name: 'Product Design Workshop',
      date: '2026-01-15',
      time: '2:00 PM - 4:00 PM',
      location: 'Design Studio SF',
      attendees: 45,
      category: 'Design',
    },
    {
      id: 3,
      name: 'Startup Founder Meetup',
      date: '2026-01-22',
      time: '6:00 PM - 8:00 PM',
      location: 'WeWork SoMa',
      attendees: 120,
      category: 'Networking',
    },
  ];

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
    return events.filter((event) => event.date === dateStr);
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
        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Event Calendar</h1>
          <p className="text-lg text-gray-600">Browse and plan your upcoming events</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
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
          </div>

          {/* Upcoming Events List */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-gray-700" />
                Upcoming Events
              </h3>
              <div className="space-y-3">
                {events
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((event) => (
                    <Link
                      key={event.id}
                      to={`/events/${event.id}`}
                      className="block border border-gray-200 rounded-lg p-3 hover:border-gray-300 hover:shadow-sm transition-all group"
                    >
                      <div className="mb-2">
                        <span className="px-2.5 py-0.5 bg-gray-100 text-gray-900 text-xs font-medium rounded">
                          {event.category}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {event.name}
                      </h4>
                      <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-3 h-3" />
                          {new Date(event.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-3 h-3" />
                          {event.attendees} attending
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
