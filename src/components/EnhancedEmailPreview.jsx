import { FONT_FAMILIES } from '../data/fontFamilies';

function getFontStack(id) {
  const found = FONT_FAMILIES.find(f => f.id === id);
  return found ? found.stack : FONT_FAMILIES[0].stack;
}

export default function EnhancedEmailPreview({ state }) {
  const { content, sections, images, design, branding, customSections } = state;
  const { colors, typography, spacing, borderRadius, headerStyle, ctaStyle, footerStyle } = design;
  const fontStack = getFontStack(typography.fontFamily);

  const containerStyle = {
    fontFamily: fontStack,
    backgroundColor: colors.background,
    color: colors.text,
    maxWidth: '100%',
    lineHeight: 1.6,
  };

  const sectionGap = spacing.sectionGap || 24;
  const pad = spacing.contentPadding || 40;

  return (
    <div style={containerStyle}>
      {/* Hero Image */}
      {sections.heroImage && images.hero && (
        <div>
          <img
            src={images.hero}
            alt="Hero"
            style={{ width: '100%', display: 'block', borderRadius: borderRadius > 0 ? `${borderRadius}px ${borderRadius}px 0 0` : 0 }}
          />
        </div>
      )}

      {/* Header */}
      {sections.header && (
        <div
          style={{
            background: headerStyle === 'gradient'
              ? `linear-gradient(135deg, ${colors.headerBackground}, ${colors.accent})`
              : headerStyle === 'solid-color'
              ? colors.headerBackground
              : 'transparent',
            color: headerStyle === 'minimal' ? colors.text : colors.headerText,
            padding: `${pad * 0.75}px ${pad}px`,
            textAlign: typography.textAlign,
          }}
        >
          {branding.organizationName && (
            <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 8, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              {branding.organizationName}
            </p>
          )}
          <h1 style={{ fontSize: typography.headingSize, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
            {content.heading || 'Your Heading Here'}
          </h1>
        </div>
      )}

      {/* Subheading */}
      {sections.subheading && (
        <div style={{ padding: `${sectionGap}px ${pad}px 0`, textAlign: typography.textAlign }}>
          <p style={{ fontSize: typography.bodySize + 2, color: colors.secondary, margin: 0 }}>
            {content.subheading || 'Add a subheading to give more context'}
          </p>
        </div>
      )}

      {/* Divider */}
      {sections.divider && (
        <div style={{ padding: `${sectionGap}px ${pad}px 0` }}>
          <hr style={{ border: 'none', borderTop: `1px solid ${colors.secondary}33`, margin: 0 }} />
        </div>
      )}

      {/* Inline Image */}
      {sections.inlineImage && images.inline && (
        <div style={{ padding: `${sectionGap}px ${pad}px 0` }}>
          <img
            src={images.inline}
            alt="Content"
            style={{ width: '100%', display: 'block', borderRadius }}
          />
        </div>
      )}

      {/* Body Text */}
      {sections.bodyText && (
        <div style={{ padding: `${sectionGap}px ${pad}px 0`, textAlign: typography.textAlign }}>
          <p style={{ fontSize: typography.bodySize, margin: 0, whiteSpace: 'pre-wrap' }}>
            {content.body || 'Write your email body content here. Describe your event, share updates, or communicate with your audience.'}
          </p>
        </div>
      )}

      {/* Custom Sections */}
      {(customSections || []).map((sec) => (
        <div key={sec.id} style={{ padding: `${sectionGap}px ${pad}px 0`, textAlign: typography.textAlign }}>
          {sec.title && (
            <h3 style={{ fontSize: typography.bodySize + 2, fontWeight: 600, marginBottom: 8, color: colors.primary }}>
              {sec.title}
            </h3>
          )}
          <p style={{ fontSize: typography.bodySize, margin: 0, whiteSpace: 'pre-wrap' }}>
            {sec.content || 'Custom section content...'}
          </p>
        </div>
      ))}

      {/* CTA Button */}
      {sections.cta && (
        <div style={{ padding: `${sectionGap}px ${pad}px 0`, textAlign: typography.textAlign }}>
          <a
            href={content.ctaUrl || '#'}
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              backgroundColor: colors.accent,
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: typography.bodySize,
              borderRadius: ctaStyle === 'rounded' ? '8px' : ctaStyle === 'pill' ? '999px' : '0px',
            }}
          >
            {content.ctaText || 'Click Here'}
          </a>
        </div>
      )}

      {/* Social Links */}
      {sections.socialLinks && (
        <div style={{ padding: `${sectionGap}px ${pad}px 0`, textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
            {['X', 'LinkedIn', 'Instagram'].map((platform) => (
              <span
                key={platform}
                style={{ fontSize: 13, color: colors.secondary, textDecoration: 'underline', cursor: 'pointer' }}
              >
                {platform}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      {sections.footer && (
        <div
          style={{
            marginTop: sectionGap,
            padding: `${pad * 0.5}px ${pad}px`,
            backgroundColor: footerStyle === 'branded' ? colors.headerBackground : colors.footerBackground,
            color: footerStyle === 'branded' ? colors.headerText : colors.footerText,
            textAlign: 'center',
            fontSize: 12,
          }}
        >
          <p style={{ margin: 0 }}>
            {branding.organizationName || 'Your Organization'} &middot; You received this email because you're subscribed.
          </p>
          <p style={{ margin: '4px 0 0', opacity: 0.7 }}>
            Unsubscribe &middot; Preferences
          </p>
        </div>
      )}
    </div>
  );
}
