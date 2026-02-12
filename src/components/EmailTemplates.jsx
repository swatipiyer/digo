import { Megaphone, Newspaper, Sparkles, Clock, Hand } from 'lucide-react';

// Email template definitions and previews
export const emailTemplates = {
  announcement: {
    id: 'announcement',
    name: 'Event Announcement',
    description: 'Perfect for announcing upcoming events',
    icon: Megaphone,
    iconColor: 'text-blue-600',
    defaultSubject: 'Join us for {{eventName}}',
    defaultContent: {
      heading: 'Upcoming Event',
      subheading: 'You\'re invited!',
      body: 'We\'re excited to announce our next event. Join us for an amazing experience!',
      ctaText: 'Register Now',
      ctaUrl: 'https://example.com/register',
    },
  },
  newsletter: {
    id: 'newsletter',
    name: 'Monthly Newsletter',
    description: 'Share updates, highlights, and news',
    icon: Newspaper,
    iconColor: 'text-purple-600',
    defaultSubject: '{{organizationName}} - Monthly Update',
    defaultContent: {
      heading: 'Monthly Newsletter',
      subheading: 'What\'s new this month',
      body: 'Here are the latest updates from our community. We\'ve been busy organizing great events and bringing people together!',
      ctaText: 'View All Events',
      ctaUrl: 'https://example.com/events',
    },
  },
  recap: {
    id: 'recap',
    name: 'Event Recap',
    description: 'Thank attendees and share event highlights',
    icon: Sparkles,
    iconColor: 'text-yellow-600',
    isRich: true,
    defaultSubject: 'Thank you for attending {{eventName}}',
    defaultContent: {
      heading: 'Frontier AI & AI Agents!',
      description: 'Here are your videos, slides, photos, and speaker contacts. Did we miss something? Reply to let us know!',
      headerImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      videoCount: 12,
      slideCount: 8,
      photoCount: 45,
      resourcesUrl: 'https://example.com/resources',
      photosUrl: 'https://example.com/photos',
      upcomingEventsUrl: 'https://example.com/events',
      volunteerUrl: 'https://example.com/volunteer',
      getInvolvedUrl: 'https://example.com/get-involved',
      hashtags: '#FrontierAI #AIAgents #TechEquity',
      showEngagement: true,
      keynotes: [
        { title: 'Welcome Session', speaker: 'Dave Digo, TechEquity' },
        { title: 'Building Blocks of Agentic AI', speaker: 'Sanyam Bhutani, Meta' },
        { title: 'Using MCP to Unlock Multi-Agentic Frameworks', speaker: 'Okhitay Azarmanesh, Snowflake' }
      ],
      workshops: [
        { title: 'Building your RL Environment', speaker: 'Sanyam Bhutani, Meta' },
        { title: 'Introduction to AI Agents with A2A', speaker: 'Mike Prince, Matchwis' }
      ],
      sponsors: [
        {
          name: 'Snowflake - Silicon Valley AI Hub',
          description: 'Subscribe to the Silicon Valley AI Hub newsletter to stay informed about upcoming AI workshops, panel discussions, and networking opportunities.',
          url: 'https://example.com/snowflake'
        },
        {
          name: 'TechEquity Community',
          description: 'Join the TechEquity Community to keep up with learning programs, networking opportunities, and ways to get involved.',
          url: 'https://example.com/techequity'
        }
      ],
      photos: [
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
        'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400',
        'https://images.unsplash.com/photo-1559223607-0c1e07471d60?w=400',
        'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400',
        'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400',
        'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400',
      ]
    },
  },
  reminder: {
    id: 'reminder',
    name: 'Event Reminder',
    description: 'Remind registered attendees about upcoming events',
    icon: Clock,
    iconColor: 'text-orange-600',
    defaultSubject: 'Reminder: {{eventName}} is coming up!',
    defaultContent: {
      heading: 'Event Reminder',
      subheading: 'See you soon!',
      body: 'This is a friendly reminder that our event is coming up. We can\'t wait to see you there!',
      ctaText: 'View Event Details',
      ctaUrl: 'https://example.com/event',
    },
  },
  welcome: {
    id: 'welcome',
    name: 'Welcome Email',
    description: 'Welcome new members to your community',
    icon: Hand,
    iconColor: 'text-green-600',
    defaultSubject: 'Welcome to {{organizationName}}!',
    defaultContent: {
      heading: 'Welcome!',
      subheading: 'We\'re glad you\'re here',
      body: 'Thank you for joining our community! We\'re excited to have you. Stay tuned for upcoming events and opportunities to connect.',
      ctaText: 'Explore Events',
      ctaUrl: 'https://example.com/events',
    },
  },
};

// Email template preview component
export function EmailPreview({ template, content, organizationName, brandColor = '#1f2937' }) {
  const styles = {
    container: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
    },
    header: {
      backgroundColor: brandColor,
      padding: '32px 24px',
      textAlign: 'center',
    },
    logo: {
      color: '#ffffff',
      fontSize: '24px',
      fontWeight: 'bold',
      margin: '0',
    },
    content: {
      padding: '40px 24px',
    },
    heading: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#111827',
      margin: '0 0 8px 0',
      textAlign: 'center',
    },
    subheading: {
      fontSize: '16px',
      color: '#6b7280',
      margin: '0 0 24px 0',
      textAlign: 'center',
    },
    body: {
      fontSize: '16px',
      lineHeight: '1.6',
      color: '#374151',
      margin: '0 0 32px 0',
    },
    ctaContainer: {
      textAlign: 'center',
      margin: '32px 0',
    },
    cta: {
      display: 'inline-block',
      backgroundColor: brandColor,
      color: '#ffffff',
      padding: '14px 32px',
      textDecoration: 'none',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '16px',
    },
    footer: {
      backgroundColor: '#f9fafb',
      padding: '24px',
      textAlign: 'center',
      fontSize: '14px',
      color: '#6b7280',
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.logo}>{organizationName || 'Your Organization'}</h1>
      </div>

      {/* Content */}
      <div style={styles.content}>
        <h2 style={styles.heading}>{content.heading}</h2>
        <p style={styles.subheading}>{content.subheading}</p>
        <p style={styles.body}>{content.body}</p>

        {content.ctaText && content.ctaUrl && (
          <div style={styles.ctaContainer}>
            <a href={content.ctaUrl} style={styles.cta}>
              {content.ctaText}
            </a>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p style={{ margin: '0 0 8px 0' }}>
          You're receiving this email because you're a member of {organizationName || 'our community'}.
        </p>
        <p style={{ margin: '0' }}>
          <a href="#" style={{ color: '#6b7280', textDecoration: 'underline' }}>Unsubscribe</a>
          {' · '}
          <a href="#" style={{ color: '#6b7280', textDecoration: 'underline' }}>Update Preferences</a>
        </p>
      </div>
    </div>
  );
}
