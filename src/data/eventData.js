// Public event page data – keyed by event slug (e.g. HkGjx)
export const eventsBySlug = {
  HkGjx: {
    id: 'HkGjx',
    name: 'Product & Business Strategy in AI: Talks + AI Agent Workshops',
    subtitle: 'Ft Meta & Snowflake',
    date: '2026-01-27',
    time: '5:00 PM',
    location: 'Snowflake Silicon Valley AI Hub, 8th Floor',
    address: '135 Constitution Dr, Menlo Park, CA 94025',
    registrationUrl: 'https://lu.ma/ay5c9dw3',
    description: 'Join developers, founders, and professionals to explore how frontier AI systems and agent-based architectures are built, evaluated, and applied. Features keynotes from Meta and Snowflake engineers plus hands-on workshops.',
    scheduleNote: '5:00–6:00 PM Registration · 6:00–6:15 PM Welcome · 6:15–7:00 PM Keynotes · 7:20–8:20 PM Workshops · 8:20–9:00 PM Networking',
    speakers: [
      {
        id: 'nayam',
        name: 'Nayam Rahman',
        company: 'Meta',
        topic: 'Superintelligence Labs',
        avatar: null,
        email: 'nayam@meta.com',
        twitter: 'nayamrahman',
        linkedin: 'https://linkedin.com/in/nayamrahman'
      },
      {
        id: 'okhtay',
        name: 'Okhtay Khasmammadov',
        company: 'Snowflake',
        topic: 'AI Agent Building',
        avatar: null,
        email: 'okhtay@snowflake.com',
        twitter: 'okhasmammadov',
        linkedin: 'https://linkedin.com/in/okhasmammadov'
      },
    ],
    sponsors: [
      { id: 1, name: 'Snowflake', tier: 'Platinum' },
      { id: 2, name: 'TechEquity', tier: 'Gold' },
    ],
    // Event-level recap video and materials
    videos: [
      { id: 'welcome', title: 'Welcome Session', description: 'Opening remarks and event overview.', url: 'https://www.youtube.com/embed/1OCKaEpEjhs', thumbnail: null },
    ],
    presentations: [
      { id: 'event-deck', title: 'Event Overview & Agenda', description: 'Full agenda and speaker bios.', url: '#', type: 'pdf' },
    ],
    sessions: [
      {
        id: 'keynote-mcp',
        slug: 'keynote-mcp',
        title: 'Model Context Protocol (MCP)',
        time: '6:15 PM',
        duration: '25 min',
        type: 'keynote',
        speakerId: 'nayam',
        description: 'Deep dive into the Model Context Protocol and how it enables AI systems to interact with external tools and data sources.',
        videoUrl: 'https://www.youtube.com/embed/QYcf1RiKs4U',
        presentationUrl: '#',
        presentationTitle: 'MCP Overview (PDF)',
        tags: ['AI', 'Protocol', 'Integration', 'Tools'],
      },
      {
        id: 'keynote-building-blocks',
        slug: 'keynote-building-blocks',
        title: 'Building Blocks of AI Systems',
        time: '6:45 PM',
        duration: '25 min',
        type: 'keynote',
        speakerId: 'okhtay',
        description: 'Explore the fundamental components and architecture patterns for building production AI systems.',
        videoUrl: 'https://www.youtube.com/embed/yXBXQ_Xd2pc',
        presentationUrl: '#',
        presentationTitle: 'AI Building Blocks (PDF)',
        tags: ['AI', 'Architecture', 'Production', 'Systems'],
      },
      {
        id: 'workshop-ai-agents',
        slug: 'workshop-ai-agents',
        title: 'Hands-On: Building AI Agents',
        time: '7:20 PM',
        duration: '60 min',
        type: 'workshop',
        speakerId: 'okhtay',
        description: 'A practical workshop to build and test AI agents using modern frameworks and tools.',
        videoUrl: 'https://www.youtube.com/embed/vhfWOBSZvf0',
        presentationUrl: '#',
        presentationTitle: 'Workshop Slides (PDF)',
        tags: ['AI Agents', 'Workshop', 'Hands-On', 'Frameworks'],
      },
      {
        id: 'workshop-advanced',
        slug: 'workshop-advanced',
        title: 'Advanced AI Agents',
        time: '8:30 PM',
        duration: '60 min',
        type: 'workshop',
        speakerId: 'nayam',
        description: 'Advanced techniques for building sophisticated AI agents with complex reasoning capabilities.',
        videoUrl: 'https://www.youtube.com/embed/ap4q4sAK4OY',
        presentationUrl: '#',
        presentationTitle: 'Advanced Workshop Slides (PDF)',
        tags: ['AI Agents', 'Advanced', 'Reasoning', 'Workshop'],
      },
    ],
  },
  2: {
    id: '2',
    name: 'TechEquity Event #3',
    date: '2026-03-31',
    time: '5:00 PM',
    location: '135 Constitution Dr, Menlo Park, CA 94025',
    address: '135 Constitution Dr, Menlo Park, CA 94025',
    description: 'Join us for an exciting event focused on technology and equity in the AI space.',
  },
  3: {
    id: '3',
    name: 'TechEquity Event #4',
    date: '2026-04-28',
    time: '5:00 PM',
    location: '135 Constitution Dr, Menlo Park, CA 94025',
    address: '135 Constitution Dr, Menlo Park, CA 94025',
    description: 'Join us for an exciting event focused on technology and equity in the AI space.',
  },
  4: {
    id: '4',
    name: 'TechEquity Event #5',
    date: '2026-05-26',
    time: '5:00 PM',
    location: '135 Constitution Dr, Menlo Park, CA 94025',
    address: '135 Constitution Dr, Menlo Park, CA 94025',
    description: 'Join us for an exciting event focused on technology and equity in the AI space.',
  },
  5: {
    id: '5',
    name: 'TechEquity Event #6',
    date: '2026-06-30',
    time: '5:00 PM',
    location: '135 Constitution Dr, Menlo Park, CA 94025',
    address: '135 Constitution Dr, Menlo Park, CA 94025',
    description: 'Join us for an exciting event focused on technology and equity in the AI space.',
  },
  6: {
    id: '6',
    name: 'TechEquity Event #7',
    date: '2026-07-28',
    time: '5:00 PM',
    location: '135 Constitution Dr, Menlo Park, CA 94025',
    address: '135 Constitution Dr, Menlo Park, CA 94025',
    description: 'Join us for an exciting event focused on technology and equity in the AI space.',
  },
};

export function getEvent(slug) {
  return eventsBySlug[slug] || null;
}

export function getSession(eventSlug, sessionSlug) {
  const event = getEvent(eventSlug);
  if (!event || !event.sessions) return null;
  return event.sessions.find((s) => s.slug === sessionSlug) || null;
}

export function getSpeaker(eventSlug, speakerId) {
  const event = getEvent(eventSlug);
  if (!event || !event.speakers) return null;
  return event.speakers.find((s) => s.id === speakerId) || null;
}
