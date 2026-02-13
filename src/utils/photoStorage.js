/**
 * Photo Storage Utility
 * Handles photo conversion, validation, compression, and localStorage management for Digo
 */

/**
 * Convert a file to Base64 string
 * @param {File} file - The file to convert
 * @returns {Promise<string>} Base64 encoded string
 */
export const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Validate image file type and size
 * @param {File} file - The file to validate
 * @throws {Error} If validation fails
 * @returns {boolean} True if valid
 */
export const validateImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file type. Please upload JPG, PNG, GIF, or WebP.');
  }

  if (file.size > maxSize) {
    throw new Error('File too large. Maximum size is 5MB.');
  }

  return true;
};

/**
 * Compress an image to reduce file size
 * @param {string} base64String - Base64 encoded image
 * @param {number} maxWidth - Maximum width in pixels
 * @param {number} quality - JPEG quality (0-1)
 * @returns {Promise<string>} Compressed Base64 string
 */
export const compressImage = async (base64String, maxWidth = 800, quality = 0.85) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.src = base64String;
  });
};

/**
 * Get all speakers from localStorage
 * @returns {Array} Array of speaker objects
 */
export const getSpeakers = () => {
  try {
    return JSON.parse(localStorage.getItem('digo_speakers') || '[]');
  } catch (error) {
    console.error('Error loading speakers:', error);
    return [];
  }
};

/**
 * Save a speaker to localStorage
 * @param {Object} speaker - Speaker object
 * @returns {Object} Saved speaker
 */
export const saveSpeaker = (speaker) => {
  const speakers = getSpeakers();
  const index = speakers.findIndex(s => s.id === speaker.id);

  const updatedSpeaker = {
    ...speaker,
    lastPhotoUpdate: new Date().toISOString()
  };

  if (index >= 0) {
    speakers[index] = updatedSpeaker;
  } else {
    speakers.push(updatedSpeaker);
  }

  localStorage.setItem('digo_speakers', JSON.stringify(speakers));
  return updatedSpeaker;
};

/**
 * Delete a speaker from localStorage
 * @param {string} speakerId - Speaker ID to delete
 * @returns {boolean} Success status
 */
export const deleteSpeaker = (speakerId) => {
  const speakers = getSpeakers();
  const filtered = speakers.filter(s => s.id !== speakerId);
  localStorage.setItem('digo_speakers', JSON.stringify(filtered));
  return true;
};

/**
 * Get media kit for a specific event
 * @param {string} eventId - Event ID
 * @returns {Object|null} Media kit object or null
 */
export const getMediaKit = (eventId) => {
  try {
    const kits = JSON.parse(localStorage.getItem('digo_media_kits') || '{}');
    return kits[eventId] || null;
  } catch (error) {
    console.error('Error loading media kit:', error);
    return null;
  }
};

/**
 * Save media kit for an event
 * @param {string} eventId - Event ID
 * @param {Object} kitData - Media kit data
 * @returns {Object} Saved media kit
 */
export const saveMediaKit = (eventId, kitData) => {
  const kits = JSON.parse(localStorage.getItem('digo_media_kits') || '{}');

  const mediaKit = {
    ...kitData,
    id: eventId,
    updatedAt: new Date().toISOString()
  };

  if (!mediaKit.createdAt) {
    mediaKit.createdAt = new Date().toISOString();
  }

  kits[eventId] = mediaKit;
  localStorage.setItem('digo_media_kits', JSON.stringify(kits));
  return mediaKit;
};

/**
 * Check if localStorage is available and has space
 * @returns {boolean} True if storage is available
 */
export const checkStorageAvailable = () => {
  try {
    const test = 'localStorage-test';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    if (e.code === 22 || e.code === 1014 || e.name === 'QuotaExceededError') {
      console.error('Storage limit reached');
      return false;
    }
    return false;
  }
};

/**
 * Get approximate localStorage usage
 * @returns {Object} Storage usage info
 */
export const getStorageUsage = () => {
  let total = 0;

  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length;
    }
  }

  const totalMB = (total / (1024 * 1024)).toFixed(2);
  const limitMB = 5; // Typical limit
  const percentUsed = ((total / (limitMB * 1024 * 1024)) * 100).toFixed(1);

  return {
    totalBytes: total,
    totalMB: parseFloat(totalMB),
    limitMB,
    percentUsed: parseFloat(percentUsed)
  };
};

/**
 * Process and save speaker photo
 * @param {File} file - Photo file
 * @param {Object} speaker - Speaker object
 * @param {boolean} compress - Whether to compress the image
 * @returns {Promise<Object>} Updated speaker object
 */
export const processSpeakerPhoto = async (file, speaker, compress = true) => {
  // Validate file
  validateImageFile(file);

  // Convert to Base64
  let base64 = await convertFileToBase64(file);

  // Compress if needed
  if (compress) {
    base64 = await compressImage(base64);
  }

  // Update speaker object
  const updatedSpeaker = {
    ...speaker,
    photoUrl: base64,
    photoSource: 'upload',
    lastPhotoUpdate: new Date().toISOString()
  };

  // Save to localStorage
  return saveSpeaker(updatedSpeaker);
};

/**
 * Create default media kit structure
 * @param {Object} event - Event object
 * @returns {Object} Default media kit
 */
export const createDefaultMediaKit = (event) => {
  return {
    id: event.id,
    eventName: event.name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    description: event.description || '',
    hashtags: [],
    logo: null,
    banner: null,
    primaryColor: '#1f2937',
    secondaryColor: '#0891b2',
    socialHandles: {
      twitter: '',
      linkedin: '',
      instagram: ''
    },
    pressContact: {
      name: '',
      email: '',
      phone: ''
    },
    shareableUrl: null,
    isPublic: false
  };
};
