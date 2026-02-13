/**
 * Media Kit Generator Utility
 * Generates downloadable media kit packages for events
 */

import { generateShareTemplates } from './shareTemplates';

/**
 * Generate a complete media kit package
 * @param {Object} event - Event object
 * @param {Object} mediaKit - Media kit data
 * @param {Array} speakers - Array of speaker objects
 * @returns {Object} Complete media kit package
 */
export const generateMediaKitPackage = (event, mediaKit, speakers) => {
  return {
    version: '1.0',
    generatedAt: new Date().toISOString(),
    event: {
      name: event.name,
      date: event.date,
      location: event.location,
      description: mediaKit.description || event.description,
      hashtags: mediaKit.hashtags || [],
      venue: event.venue,
      time: event.time,
      category: event.category
    },
    branding: {
      logo: mediaKit.logo,
      banner: mediaKit.banner,
      colors: {
        primary: mediaKit.primaryColor,
        secondary: mediaKit.secondaryColor
      },
      socialHandles: mediaKit.socialHandles || {}
    },
    speakers: speakers.map(s => ({
      id: s.id,
      name: s.name,
      title: s.title || '',
      company: s.company,
      bio: s.bio || '',
      photo: s.photoUrl,
      topic: s.topic,
      social: {
        email: s.email || '',
        linkedin: s.linkedin || '',
        twitter: s.twitter || '',
        website: s.website || ''
      }
    })),
    socialTemplates: generateAllSocialTemplates(event, mediaKit.shareableUrl),
    contact: {
      press: mediaKit.pressContact || {},
      organizer: {
        name: event.organizer || '',
        email: event.organizerEmail || ''
      }
    },
    resources: {
      shareableUrl: mediaKit.shareableUrl,
      isPublic: mediaKit.isPublic || false
    }
  };
};

/**
 * Generate social templates for all platforms and roles
 * @param {Object} event - Event object
 * @param {string} shareableUrl - Shareable URL for the media kit
 * @returns {Object} Social templates organized by platform and role
 */
const generateAllSocialTemplates = (event, shareableUrl) => {
  const platforms = ['linkedin', 'twitter', 'instagram', 'email'];
  const roles = ['organizer', 'speaker', 'attendee'];
  const templates = {};

  platforms.forEach(platform => {
    templates[platform] = {};
    roles.forEach(role => {
      try {
        const templateData = generateShareTemplates(event, role, platform, shareableUrl);
        templates[platform][role] = Array.isArray(templateData) ? templateData : [templateData];
      } catch (error) {
        console.error(`Error generating ${platform} template for ${role}:`, error);
        templates[platform][role] = [];
      }
    });
  });

  return templates;
};

/**
 * Download media kit as JSON file
 * @param {Object} kitPackage - Media kit package
 * @param {string} eventName - Event name for filename
 */
export const downloadMediaKitJSON = (kitPackage, eventName) => {
  const dataStr = JSON.stringify(kitPackage, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${sanitizeFilename(eventName)}_MediaKit.json`;
  link.click();
  URL.revokeObjectURL(url);
};

/**
 * Download individual asset (logo, banner, photo)
 * @param {string} base64Data - Base64 encoded image
 * @param {string} filename - Desired filename
 */
export const downloadAsset = (base64Data, filename) => {
  if (!base64Data) {
    console.error('No data to download');
    return;
  }

  const link = document.createElement('a');
  link.href = base64Data;
  link.download = sanitizeFilename(filename);
  link.click();
};

/**
 * Download speaker photo
 * @param {Object} speaker - Speaker object
 */
export const downloadSpeakerPhoto = (speaker) => {
  if (!speaker.photoUrl) {
    console.error('Speaker has no photo');
    return;
  }

  const filename = `${speaker.name.replace(/\s+/g, '_')}_headshot.jpg`;
  downloadAsset(speaker.photoUrl, filename);
};

/**
 * Generate a speaker one-pager (simplified data format)
 * @param {Object} speaker - Speaker object
 * @param {Object} event - Event object
 * @returns {Object} Speaker one-pager data
 */
export const generateSpeakerOnePager = (speaker, event) => {
  return {
    speaker: {
      name: speaker.name,
      title: speaker.title || '',
      company: speaker.company,
      bio: speaker.bio || '',
      photo: speaker.photoUrl,
      social: {
        linkedin: speaker.linkedin || '',
        twitter: speaker.twitter || '',
        email: speaker.email || '',
        website: speaker.website || ''
      }
    },
    presentation: {
      title: speaker.topic,
      event: event.name,
      date: event.date,
      location: event.location
    },
    contact: {
      forMediaInquiries: 'Contact event organizer',
      eventWebsite: event.website || ''
    }
  };
};

/**
 * Download speaker one-pager as JSON
 * @param {Object} speaker - Speaker object
 * @param {Object} event - Event object
 */
export const downloadSpeakerOnePager = (speaker, event) => {
  const onePager = generateSpeakerOnePager(speaker, event);
  const dataStr = JSON.stringify(onePager, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${sanitizeFilename(speaker.name)}_OnePager.json`;
  link.click();
  URL.revokeObjectURL(url);
};

/**
 * Generate event flyer data
 * @param {Object} event - Event object
 * @param {Object} mediaKit - Media kit data
 * @param {Array} speakers - Speakers array
 * @returns {Object} Event flyer data
 */
export const generateEventFlyer = (event, mediaKit, speakers) => {
  return {
    title: event.name,
    date: event.date,
    time: event.time,
    location: event.location,
    venue: event.venue,
    description: mediaKit.description || event.description,
    hashtags: mediaKit.hashtags || [],
    featuredSpeakers: speakers.slice(0, 6).map(s => ({
      name: s.name,
      title: s.title,
      company: s.company,
      photo: s.photoUrl
    })),
    registration: event.website || '',
    branding: {
      logo: mediaKit.logo,
      banner: mediaKit.banner,
      colors: {
        primary: mediaKit.primaryColor,
        secondary: mediaKit.secondaryColor
      }
    }
  };
};

/**
 * Download event flyer as JSON
 * @param {Object} event - Event object
 * @param {Object} mediaKit - Media kit data
 * @param {Array} speakers - Speakers array
 */
export const downloadEventFlyer = (event, mediaKit, speakers) => {
  const flyer = generateEventFlyer(event, mediaKit, speakers);
  const dataStr = JSON.stringify(flyer, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${sanitizeFilename(event.name)}_Flyer.json`;
  link.click();
  URL.revokeObjectURL(url);
};

/**
 * Sanitize filename for download
 * @param {string} filename - Original filename
 * @returns {string} Sanitized filename
 */
const sanitizeFilename = (filename) => {
  return filename
    .replace(/[^a-z0-9_\-\.]/gi, '_')
    .replace(/_+/g, '_')
    .substring(0, 200);
};

/**
 * Estimate media kit package size
 * @param {Object} kitPackage - Media kit package
 * @returns {Object} Size information
 */
export const estimatePackageSize = (kitPackage) => {
  const jsonString = JSON.stringify(kitPackage);
  const sizeBytes = new Blob([jsonString]).size;
  const sizeMB = (sizeBytes / (1024 * 1024)).toFixed(2);

  return {
    bytes: sizeBytes,
    kilobytes: (sizeBytes / 1024).toFixed(2),
    megabytes: parseFloat(sizeMB)
  };
};

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    // Fallback method
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    } catch (fallbackError) {
      console.error('Fallback copy failed:', fallbackError);
      return false;
    }
  }
};

/**
 * Generate all assets as a downloadable package
 * @param {Object} mediaKit - Media kit data
 * @param {Array} speakers - Speakers array
 * @returns {Object} Assets package
 */
export const generateAssetsPackage = (mediaKit, speakers) => {
  return {
    logo: mediaKit.logo,
    banner: mediaKit.banner,
    speakerPhotos: speakers
      .filter(s => s.photoUrl)
      .map(s => ({
        name: s.name,
        filename: `${sanitizeFilename(s.name)}_headshot.jpg`,
        data: s.photoUrl
      }))
  };
};
