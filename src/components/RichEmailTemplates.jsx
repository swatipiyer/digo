import { Video, FileText, Image, Link as LinkIcon, Calendar, Users, MessageSquare } from 'lucide-react';

// Rich email template with multiple sections
export function EventRecapEmailTemplate({ content, organizationName, brandColor = '#1f2937' }) {
  const styles = {
    container: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
    },
    header: {
      position: 'relative',
      height: '200px',
      overflow: 'hidden',
    },
    headerImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    headerOverlay: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0',
      background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
      padding: '24px',
    },
    headerTitle: {
      color: '#ffffff',
      fontSize: '28px',
      fontWeight: 'bold',
      margin: '0',
    },
    content: {
      padding: '32px 24px',
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#111827',
      margin: '32px 0 16px 0',
      paddingBottom: '8px',
      borderBottom: '2px solid #e5e7eb',
    },
    description: {
      fontSize: '16px',
      lineHeight: '1.6',
      color: '#374151',
      margin: '0 0 24px 0',
    },
    watchSection: {
      backgroundColor: '#f9fafb',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '24px',
    },
    watchTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: brandColor,
      margin: '0 0 12px 0',
    },
    resourceGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
      marginTop: '16px',
    },
    resourceCard: {
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '16px',
      textAlign: 'center',
    },
    resourceIcon: {
      width: '32px',
      height: '32px',
      margin: '0 auto 8px',
      color: brandColor,
    },
    resourceTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#111827',
      margin: '0 0 4px 0',
    },
    resourceCount: {
      fontSize: '12px',
      color: '#6b7280',
      margin: '0',
    },
    listItem: {
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '12px',
    },
    listItemTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#111827',
      margin: '0 0 4px 0',
    },
    listItemMeta: {
      fontSize: '14px',
      color: '#6b7280',
      margin: '0',
    },
    photoGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '8px',
      marginTop: '16px',
    },
    photoItem: {
      aspectRatio: '1',
      borderRadius: '8px',
      overflow: 'hidden',
      backgroundColor: '#f3f4f6',
    },
    photoImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    ctaButton: {
      display: 'inline-block',
      backgroundColor: brandColor,
      color: '#ffffff',
      padding: '12px 24px',
      textDecoration: 'none',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '14px',
      marginTop: '16px',
    },
    sponsorSection: {
      backgroundColor: '#f9fafb',
      padding: '24px',
      borderRadius: '8px',
      marginTop: '32px',
    },
    sponsorTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#111827',
      margin: '0 0 16px 0',
    },
    sponsorItem: {
      marginBottom: '16px',
    },
    sponsorName: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#111827',
      margin: '0 0 4px 0',
    },
    sponsorDescription: {
      fontSize: '14px',
      color: '#6b7280',
      margin: '0 0 8px 0',
      lineHeight: '1.5',
    },
    sponsorLink: {
      fontSize: '14px',
      color: brandColor,
      textDecoration: 'none',
      fontWeight: '500',
    },
    footer: {
      backgroundColor: '#111827',
      color: '#ffffff',
      padding: '32px 24px',
      textAlign: 'center',
    },
    footerTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      margin: '0 0 16px 0',
    },
    footerLinks: {
      display: 'flex',
      justifyContent: 'center',
      gap: '24px',
      marginTop: '24px',
    },
    footerLink: {
      color: '#9ca3af',
      textDecoration: 'none',
      fontSize: '14px',
    },
    unsubscribe: {
      marginTop: '24px',
      fontSize: '12px',
      color: '#6b7280',
      textAlign: 'center',
      padding: '16px',
    },
  };

  return (
    <div style={styles.container}>
      {/* Hero Header */}
      <div style={styles.header}>
        {content.headerImage && (
          <img src={content.headerImage} alt={content.heading} style={styles.headerImage} />
        )}
        <div style={styles.headerOverlay}>
          <h1 style={styles.headerTitle}>{content.heading}</h1>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        {/* Introduction */}
        <p style={styles.description}>{content.description}</p>

        {/* Watch/Resources Section */}
        <div style={styles.watchSection}>
          <h3 style={styles.watchTitle}>Watch → Run → Deploy → Get Help</h3>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 12px 0' }}>
            Access all event resources in one place
          </p>

          <div style={styles.resourceGrid}>
            <div style={styles.resourceCard}>
              <div style={styles.resourceIcon}>🎥</div>
              <h4 style={styles.resourceTitle}>Videos</h4>
              <p style={styles.resourceCount}>{content.videoCount || 0} recordings</p>
            </div>
            <div style={styles.resourceCard}>
              <div style={styles.resourceIcon}>📄</div>
              <h4 style={styles.resourceTitle}>Slides</h4>
              <p style={styles.resourceCount}>{content.slideCount || 0} presentations</p>
            </div>
            <div style={styles.resourceCard}>
              <div style={styles.resourceIcon}>📸</div>
              <h4 style={styles.resourceTitle}>Photos</h4>
              <p style={styles.resourceCount}>{content.photoCount || 0} images</p>
            </div>
            <div style={styles.resourceCard}>
              <div style={styles.resourceIcon}>🔗</div>
              <h4 style={styles.resourceTitle}>Links</h4>
              <p style={styles.resourceCount}>Speaker contacts</p>
            </div>
          </div>

          <a href={content.resourcesUrl} style={styles.ctaButton}>
            Access All Resources
          </a>
        </div>

        {/* Keynotes */}
        {content.keynotes && content.keynotes.length > 0 && (
          <>
            <h2 style={styles.sectionTitle}>Keynotes</h2>
            {content.keynotes.map((keynote, index) => (
              <div key={index} style={styles.listItem}>
                <h4 style={styles.listItemTitle}>{keynote.title}</h4>
                <p style={styles.listItemMeta}>{keynote.speaker}</p>
              </div>
            ))}
          </>
        )}

        {/* Workshops */}
        {content.workshops && content.workshops.length > 0 && (
          <>
            <h2 style={styles.sectionTitle}>Workshops</h2>
            {content.workshops.map((workshop, index) => (
              <div key={index} style={styles.listItem}>
                <h4 style={styles.listItemTitle}>{workshop.title}</h4>
                <p style={styles.listItemMeta}>{workshop.speaker}</p>
              </div>
            ))}
          </>
        )}

        {/* Photos */}
        {content.photos && content.photos.length > 0 && (
          <>
            <h2 style={styles.sectionTitle}>Event Highlights</h2>
            <div style={styles.photoGrid}>
              {content.photos.slice(0, 6).map((photo, index) => (
                <div key={index} style={styles.photoItem}>
                  <img src={photo} alt={`Event photo ${index + 1}`} style={styles.photoImage} />
                </div>
              ))}
            </div>
            <a href={content.photosUrl} style={styles.ctaButton}>
              View All Photos
            </a>
          </>
        )}

        {/* Sponsors */}
        {content.sponsors && content.sponsors.length > 0 && (
          <div style={styles.sponsorSection}>
            <h2 style={styles.sponsorTitle}>Thank You to Our Sponsors</h2>
            {content.sponsors.map((sponsor, index) => (
              <div key={index} style={styles.sponsorItem}>
                <h4 style={styles.sponsorName}>{sponsor.name}</h4>
                <p style={styles.sponsorDescription}>{sponsor.description}</p>
                <a href={sponsor.url} style={styles.sponsorLink}>
                  Learn More →
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Your Turn / Engagement */}
        {content.showEngagement && (
          <>
            <h2 style={styles.sectionTitle}>Your Turn!</h2>
            <p style={styles.description}>
              Share your key takeaway, favorite session, or a photo from the event.
              Every post helps grow our community and shows sponsors the impact of events like these.
            </p>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: '16px 0' }}>
              Post about the event on LinkedIn and tag <strong>@{organizationName}</strong> and <strong>@Snowflake</strong>
            </p>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: '0' }}>
              Use hashtags: {content.hashtags || '#Event #Community'}
            </p>
          </>
        )}
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <h3 style={styles.footerTitle}>Stay Connected</h3>
        <div style={styles.footerLinks}>
          <a href={content.upcomingEventsUrl} style={styles.footerLink}>Upcoming Events</a>
          <a href={content.volunteerUrl} style={styles.footerLink}>Volunteer</a>
          <a href={content.getInvolvedUrl} style={styles.footerLink}>Get Involved</a>
        </div>

        <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #374151' }}>
          <p style={{ fontSize: '14px', color: '#9ca3af', margin: '0' }}>
            {organizationName}
          </p>
        </div>
      </div>

      {/* Unsubscribe */}
      <div style={styles.unsubscribe}>
        <p style={{ margin: '0' }}>
          You're receiving this email because you're a member of {organizationName}.
        </p>
        <p style={{ margin: '8px 0 0 0' }}>
          <a href="#" style={{ color: '#6b7280', textDecoration: 'underline' }}>Unsubscribe</a>
          {' · '}
          <a href="#" style={{ color: '#6b7280', textDecoration: 'underline' }}>Update Preferences</a>
        </p>
      </div>
    </div>
  );
}
