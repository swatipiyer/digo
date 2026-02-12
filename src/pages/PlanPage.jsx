import { useState } from 'react';
import { Calendar, Users, MapPin, Plus } from 'lucide-react';
import Header from '../components/Header';

export default function PlanPage() {
  const [events] = useState([
    {
      id: 1,
      name: 'Frontier AI & AI Agents',
      date: '2026-03-15',
      location: 'Silicon Valley',
      status: 'completed',
      attendees: 178,
      registered: 210,
    },
    {
      id: 2,
      name: 'Product & Business Strategy in AI',
      date: '2026-02-19',
      location: 'Menlo Park, CA',
      status: 'upcoming',
      attendees: 0,
      registered: 156,
    },
  ]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Events</h1>
            <p className="text-lg text-gray-600">Manage and organize your events</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
            <Plus className="w-4 h-4" />
            Create Event
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Events</p>
                <p className="text-3xl font-bold text-gray-900">{events.length}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Attendees</p>
                <p className="text-3xl font-bold text-gray-900">
                  {events.reduce((sum, event) => sum + event.attendees, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Registrations</p>
                <p className="text-3xl font-bold text-gray-900">
                  {events.reduce((sum, event) => sum + event.registered, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Your Events</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {events.map((event) => (
              <div
                key={event.id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-base font-semibold text-gray-900">
                        {event.name}
                      </h3>
                      <span
                        className={`px-2.5 py-0.5 text-xs font-medium rounded ${
                          event.status === 'completed'
                            ? 'bg-gray-100 text-gray-900'
                            : 'bg-blue-50 text-blue-600'
                        }`}
                      >
                        {event.status === 'completed' ? 'Completed' : 'Upcoming'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        {event.attendees} / {event.registered} attendees
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
