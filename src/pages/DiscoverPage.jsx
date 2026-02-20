import { Link, useParams } from 'react-router-dom';
import {
  PlayCircle,
  FileText,
  Image,
  Star,
  MapPin,
  Globe,
  ArrowRight,
} from 'lucide-react';
import { eventsBySlug } from '../data/eventData';

const EVENT_IMAGES = {
  HkGjx: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  '2': 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
  '3': 'https://images.unsplash.com/photo-1591115765373-5f9cf1da241c?w=800&q=80',
  '4': 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
  '5': 'https://images.unsplash.com/photo-1587825140708-dfaf18c4f8c5?w=800&q=80',
  '6': 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=800&q=80',
};

const DEFAULT_EVENT_IMAGE = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80';

const EVENTS = [
  {
    id: 'HkGjx',
    name: 'Product & Business Strategy in AI',
    subtitle: 'Talks + AI Agent Workshops',
    date: '2026-02-19',
    time: '5:00 PM',
    location: 'Menlo Park, CA',
    organizer: 'TechEquity Ai',
    organizerSlug: 'techequity-ai',
    eventType: 'in-person',
    featured: true,
    externalUrl: 'https://lu.ma/example-event-1',
  },
  {
    id: '2',
    name: 'Spring 2026 AI Forum',
    subtitle: 'Leadership + Product Sessions',
    date: '2026-03-31',
    time: '10:00 AM',
    location: 'Menlo Park, CA',
    organizer: 'TechEquity Ai',
    organizerSlug: 'techequity-ai',
    eventType: 'in-person',
    featured: true,
    externalUrl: 'https://eventbrite.com/example-event-2',
  },
  {
    id: '3',
    name: 'Workforce Transformation with AI',
    subtitle: 'Practical implementation stories',
    date: '2026-04-28',
    time: '5:00 PM',
    location: 'Online',
    organizer: 'TechEquity Ai',
    organizerSlug: 'techequity-ai',
    eventType: 'online',
    featured: false,
    externalUrl: 'https://lu.ma/example-event-3',
  },
  {
    id: '4',
    name: 'TechEquity Event #5',
    subtitle: 'Workshop highlights and demos',
    date: '2026-05-26',
    time: '5:00 PM',
    location: 'Menlo Park, CA',
    organizer: 'TechEquity Ai',
    organizerSlug: 'techequity-ai',
    eventType: 'in-person',
    featured: false,
    externalUrl: 'https://lu.ma/example-event-4',
  },
  {
    id: '5',
    name: 'TechEquity Event #6',
    subtitle: 'Networking + recorded keynotes',
    date: '2026-06-30',
    time: '5:00 PM',
    location: 'Menlo Park, CA',
    organizer: 'TechEquity Ai',
    organizerSlug: 'techequity-ai',
    eventType: 'in-person',
    featured: false,
    externalUrl: 'https://lu.ma/example-event-5',
  },
  {
    id: '6',
    name: 'TechEquity Event #7',
    subtitle: 'Business strategy deep dives',
    date: '2026-07-28',
    time: '5:00 PM',
    location: 'Online',
    organizer: 'TechEquity Ai',
    organizerSlug: 'techequity-ai',
    eventType: 'online',
    featured: false,
    externalUrl: 'https://lu.ma/example-event-6',
  },
];

const ORGANIZATIONS = {
  'techequity-ai': {
    id: 'techequity-ai',
    name: 'TechEquity Ai',
    logo: '/techequityailogo.png',
    banner: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200',
    description:
      'TechEquity events in and around Silicon Valley. Monthly meetups, workshops, and annual summit experiences.',
    members: 2847,
  },
};

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getEventMediaCounts(eventId) {
  const hasRealUrl = (url) => Boolean(url) && url !== '#';
  const eventData = eventsBySlug[eventId];
  if (!eventData) {
    return { videos: 0, slides: 0, photos: 0 };
  }

  const eventVideos = (eventData.videos || []).filter((video) => hasRealUrl(video.url)).length;
  const sessionVideos = (eventData.sessions || []).filter((session) => hasRealUrl(session.videoUrl)).length;

  const eventSlides = (eventData.presentations || []).filter((presentation) => hasRealUrl(presentation.url)).length;
  const sessionSlides = (eventData.sessions || []).filter((session) => hasRealUrl(session.presentationUrl)).length;

  const eventPhotos = (eventData.photos || []).length;
  const sessionPhotos = (eventData.sessions || []).reduce(
    (count, session) => count + (session.photos?.length || 0),
    0
  );

  return {
    videos: eventVideos + sessionVideos,
    slides: eventSlides + sessionSlides,
    photos: eventPhotos + sessionPhotos,
  };
}


function EventCard({ event }) {
  const hasContent = event.media.videos > 0 || event.media.slides > 0 || event.media.photos > 0;
  const eventImage = EVENT_IMAGES[event.id] || DEFAULT_EVENT_IMAGE;

  return (
    <Link to={`/events/${event.id}`} className="group block">
      <article className="bg-white rounded-xl overflow-hidden hover:shadow-md transition-all border border-gray-200">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-gray-100">
          <img
            src={eventImage}
            alt={event.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Location type badge */}
          <div className="absolute top-2 left-2">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-medium backdrop-blur-sm ${
              event.eventType === 'online'
                ? 'bg-blue-500/90 text-white'
                : 'bg-white/90 text-gray-900'
            }`}>
              {event.eventType === 'online' ? <Globe className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
              {event.eventType === 'online' ? 'Online' : 'In Person'}
            </span>
          </div>
          {/* Media counts overlay */}
          <div className="absolute bottom-2 right-2 flex gap-1.5">
            {event.media.videos > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/75 text-white text-xs font-medium">
                <PlayCircle className="w-3 h-3" />
                {event.media.videos}
              </span>
            )}
            {event.media.slides > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/75 text-white text-xs font-medium">
                <FileText className="w-3 h-3" />
                {event.media.slides}
              </span>
            )}
            {event.media.photos > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/75 text-white text-xs font-medium">
                <Image className="w-3 h-3" />
                {event.media.photos}
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2 text-sm">
            {event.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1">{event.organizer}</p>
          <div className="flex items-center justify-between mt-1.5">
            <p className="text-xs text-gray-400">
              {formatDate(event.date)} · {event.location}
            </p>
            {hasContent && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600">
                View Content <ArrowRight className="w-3 h-3" />
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function DiscoverPage({ embedded = false }) {
  const { organizerSlug } = useParams();
  const currentOrganization = organizerSlug ? ORGANIZATIONS[organizerSlug] : null;
  const contentEvents = EVENTS.map((event) => ({
    ...event,
    media: getEventMediaCounts(event.id),
  }));

  const scopedEvents = contentEvents.filter((event) =>
    organizerSlug ? event.organizerSlug === organizerSlug : true
  );
  const featuredEvents = scopedEvents.filter((event) => event.featured).slice(0, 2);

  const content = (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {currentOrganization && (
        <section className="mb-6 bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="h-44 bg-gray-100 relative">
            {currentOrganization.banner && (
              <img
                src={currentOrganization.banner}
                alt={`${currentOrganization.name} banner`}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="p-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-white border border-gray-200 p-2">
                <img
                  src={currentOrganization.logo}
                  alt={currentOrganization.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{currentOrganization.name}</h2>
                <p className="text-sm text-gray-600">{currentOrganization.members.toLocaleString()} members</p>
              </div>
            </div>
            <p className="text-gray-600 mt-4 max-w-3xl">{currentOrganization.description}</p>
          </div>
        </section>
      )}

      {/* Featured — horizontal scroll row */}
      {!currentOrganization && featuredEvents.length > 0 && (
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-4 h-4 text-yellow-500" />
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Featured</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredEvents.map((event) => (
              <Link key={event.id} to={`/events/${event.id}`} className="group block">
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <img
                    src={EVENT_IMAGES[event.id] || DEFAULT_EVENT_IMAGE}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="inline-block px-2 py-0.5 bg-yellow-500 text-black text-[10px] font-bold uppercase rounded mb-2">Featured</span>
                    <h3 className="text-white font-bold text-lg leading-tight">{event.name}</h3>
                    <p className="text-white/70 text-sm mt-1">{event.organizer} · {formatDate(event.date)}</p>
                  </div>
                  <div className="absolute top-3 right-3 flex gap-1.5">
                    {event.media.videos > 0 && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/75 text-white text-xs font-medium">
                        <PlayCircle className="w-3 h-3" /> {event.media.videos}
                      </span>
                    )}
                    {event.media.slides > 0 && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/75 text-white text-xs font-medium">
                        <FileText className="w-3 h-3" /> {event.media.slides}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Events — YouTube-style grid */}
      <section>
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">All Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {scopedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );

  return (
    <div className={embedded ? '' : 'min-h-screen bg-gray-50'}>
      {content}
    </div>
  );
}
