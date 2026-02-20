import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar, MapPin, Users, Compass, ArrowRight, Globe,
  Clock, PlayCircle, FileText, Image, TrendingUp,
} from 'lucide-react';

const EVENT_IMAGES = {
  HkGjx: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  '2': 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
  '3': 'https://images.unsplash.com/photo-1591115765373-5f9cf1da241c?w=800&q=80',
  '4': 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
};

const DEFAULT_EVENT_IMAGE = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80';

const RECENT_EVENTS = [
  {
    id: 'HkGjx',
    name: 'Product & Business Strategy in AI',
    subtitle: 'Talks + AI Agent Workshops',
    date: '2026-01-27',
    time: '5:00 PM',
    location: 'Menlo Park, CA',
    organizer: 'TechEquity Ai',
    eventType: 'in-person',
    contentCount: { videos: 4, slides: 4, photos: 0 },
  },
  {
    id: '2',
    name: 'Spring 2026 AI Forum',
    subtitle: 'Leadership + Product Sessions',
    date: '2026-03-31',
    time: '10:00 AM',
    location: 'Menlo Park, CA',
    organizer: 'TechEquity Ai',
    eventType: 'in-person',
    contentCount: { videos: 0, slides: 0, photos: 0 },
  },
  {
    id: '3',
    name: 'Workforce Transformation with AI',
    subtitle: 'Practical implementation stories',
    date: '2026-04-28',
    time: '5:00 PM',
    location: 'Online',
    organizer: 'TechEquity Ai',
    eventType: 'online',
    contentCount: { videos: 0, slides: 0, photos: 0 },
  },
  {
    id: '4',
    name: 'TechEquity Event #5',
    subtitle: 'Workshop highlights and demos',
    date: '2026-05-26',
    time: '5:00 PM',
    location: 'Menlo Park, CA',
    organizer: 'TechEquity Ai',
    eventType: 'in-person',
    contentCount: { videos: 0, slides: 0, photos: 0 },
  },
];

const ALL_GROUPS = [
  { id: 'techequity-ai', slug: 'techequity-ai', name: 'TechEquity Ai', members: 2847, category: 'Technology', color: 'from-blue-500 to-indigo-600' },
  { id: 1, name: 'AI & Machine Learning Enthusiasts', members: 1247, category: 'Technology', color: 'from-purple-500 to-pink-500' },
  { id: 2, name: 'SF Tech Founders', members: 856, category: 'Entrepreneurship', color: 'from-orange-500 to-red-500' },
  { id: 3, name: 'Product Design Community', members: 532, category: 'Design', color: 'from-emerald-500 to-teal-500' },
  { id: 4, name: 'Web3 Builders', members: 423, category: 'Technology', color: 'from-cyan-500 to-blue-500' },
];


function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  });
}

function getTimeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diffDays = Math.ceil((now - date) / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
  return `${Math.ceil(diffDays / 30)} months ago`;
}

function hasContent(event) {
  const c = event.contentCount;
  return c && (c.videos > 0 || c.slides > 0 || c.photos > 0);
}

export default function HomePage() {
  const [joinedGroupIds, setJoinedGroupIds] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('digo_joined_groups');
    if (saved) {
      try { setJoinedGroupIds(JSON.parse(saved)); } catch {}
    }
  }, []);

  const featuredEvent = RECENT_EVENTS[0];
  const restEvents = RECENT_EVENTS.slice(1, 4);
  const myGroups = ALL_GROUPS.filter(g => joinedGroupIds.includes(g.id));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero — Featured Event */}
      {featuredEvent && (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-2 mb-5">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-400 uppercase tracking-wider">Recent</span>
              <span className="text-sm text-gray-400 ml-2">{getTimeAgo(featuredEvent.date)}</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-3">
                  {featuredEvent.name}
                </h1>
                <p className="text-lg text-gray-300 mb-4">{featuredEvent.subtitle}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {formatDate(featuredEvent.date)} · {featuredEvent.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    {featuredEvent.eventType === 'online' ? <Globe className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                    {featuredEvent.location}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                    featuredEvent.eventType === 'online'
                      ? 'bg-blue-500/20 text-blue-300'
                      : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {featuredEvent.eventType === 'online' ? <Globe className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                    {featuredEvent.eventType === 'online' ? 'Online' : 'In Person'}
                  </span>
                </div>
                {/* Content counts */}
                {hasContent(featuredEvent) && (
                  <div className="flex items-center gap-3 mb-6">
                    {featuredEvent.contentCount.videos > 0 && (
                      <span className="inline-flex items-center gap-1.5 text-sm text-gray-300">
                        <PlayCircle className="w-4 h-4" />
                        {featuredEvent.contentCount.videos} videos
                      </span>
                    )}
                    {featuredEvent.contentCount.slides > 0 && (
                      <span className="inline-flex items-center gap-1.5 text-sm text-gray-300">
                        <FileText className="w-4 h-4" />
                        {featuredEvent.contentCount.slides} slides
                      </span>
                    )}
                    {featuredEvent.contentCount.photos > 0 && (
                      <span className="inline-flex items-center gap-1.5 text-sm text-gray-300">
                        <Image className="w-4 h-4" />
                        {featuredEvent.contentCount.photos} photos
                      </span>
                    )}
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Link
                    to={`/events/${featuredEvent.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors"
                  >
                    View Content
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/explore"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl font-medium text-sm hover:bg-white/20 transition-colors border border-white/10"
                  >
                    Browse All
                  </Link>
                </div>
              </div>
              <Link to={`/events/${featuredEvent.id}`} className="group relative">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
                  <img
                    src={EVENT_IMAGES[featuredEvent.id] || DEFAULT_EVENT_IMAGE}
                    alt={featuredEvent.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  {/* Content badge overlay */}
                  {hasContent(featuredEvent) && (
                    <div className="absolute bottom-3 right-3 flex gap-1.5">
                      {featuredEvent.contentCount.videos > 0 && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-white text-xs font-medium">
                          <PlayCircle className="w-3.5 h-3.5" />
                          {featuredEvent.contentCount.videos}
                        </span>
                      )}
                      {featuredEvent.contentCount.slides > 0 && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-white text-xs font-medium">
                          <FileText className="w-3.5 h-3.5" />
                          {featuredEvent.contentCount.slides}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Recent Events */}
        {restEvents.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-900">Recent</h2>
              <Link to="/explore" className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {restEvents.map(event => (
                <Link key={event.id} to={`/events/${event.id}`} className="group block">
                  <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all h-full">
                    <div className="relative aspect-[2/1] overflow-hidden">
                      <img
                        src={EVENT_IMAGES[event.id] || DEFAULT_EVENT_IMAGE}
                        alt={event.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        <span className={`px-2 py-0.5 rounded-lg text-xs font-medium backdrop-blur-sm ${
                          event.eventType === 'online'
                            ? 'bg-blue-500/90 text-white'
                            : 'bg-white/90 text-gray-900'
                        }`}>
                          {event.eventType === 'online' ? 'Online' : 'In Person'}
                        </span>
                      </div>
                      {/* Content badge */}
                      {hasContent(event) && (
                        <div className="absolute bottom-2 right-2 flex gap-1.5">
                          {event.contentCount.videos > 0 && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/75 text-white text-xs font-medium">
                              <PlayCircle className="w-3 h-3" />
                              {event.contentCount.videos}
                            </span>
                          )}
                          {event.contentCount.slides > 0 && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/75 text-white text-xs font-medium">
                              <FileText className="w-3 h-3" />
                              {event.contentCount.slides}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-1">
                        {event.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{event.subtitle}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(event.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            {event.eventType === 'online' ? <Globe className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                            {event.location}
                          </span>
                        </div>
                        {hasContent(event) && (
                          <span className="text-xs font-medium text-blue-600">View Content</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Featured Groups */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900">Featured Groups</h2>
            <Link to="/explore?tab=groups" className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
              All groups <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ALL_GROUPS.slice(0, 3).map(group => {
              const isJoined = joinedGroupIds.includes(group.id);
              return (
                <Link key={group.id} to={group.slug ? `/groups/${group.slug}` : '/explore?tab=groups'} className="group block">
                  <div className="relative overflow-hidden bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg hover:border-gray-300 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center shadow-md`}>
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-sm group-hover:text-blue-700 transition-colors truncate">{group.name}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{group.members.toLocaleString()} members · {group.category}</p>
                      </div>
                      {isJoined ? (
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md flex-shrink-0">Joined</span>
                      ) : (
                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Stats + Explore CTA */}
        <section className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Stats */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-gray-900">Platform Activity</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Events with Content', value: '1', color: 'text-blue-600' },
                  { label: 'Active Groups', value: '5', color: 'text-purple-600' },
                  { label: 'Community Members', value: '5.9K', color: 'text-emerald-600' },
                ].map(stat => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{stat.label}</span>
                    <span className={`text-lg font-bold ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Explore CTA */}
            <Link to="/explore" className="lg:col-span-2 group block">
              <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 h-full flex items-center hover:shadow-xl transition-all">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative flex items-center justify-between w-full">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                        <Compass className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">Explore Events & Groups</h3>
                    </div>
                    <p className="text-gray-400 max-w-md">
                      Browse the full catalog of events, discover communities, and find your next opportunity to connect and learn.
                    </p>
                  </div>
                  <ArrowRight className="w-8 h-8 text-white/40 group-hover:text-white group-hover:translate-x-2 transition-all flex-shrink-0 ml-4" />
                </div>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
