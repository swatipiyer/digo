// URL Shortening utility for share links
// Integrates with Bitly API for professional short links

const BITLY_API_TOKEN = import.meta.env.VITE_BITLY_API_TOKEN || null;
const BITLY_API_URL = 'https://api-ssl.bitly.com/v4/shorten';

// Cache for shortened URLs to avoid duplicate API calls
const urlCache = new Map();

/**
 * Shorten a URL using Bitly API
 * @param {string} longUrl - The full URL to shorten
 * @returns {Promise<string>} - The shortened URL or original if shortening fails
 */
export async function shortenUrl(longUrl) {
  // Return cached URL if available
  if (urlCache.has(longUrl)) {
    return urlCache.get(longUrl);
  }

  // If no API token, return a mock shortened URL for demo
  if (!BITLY_API_TOKEN) {
    // Generate a mock bit.ly style URL
    const hash = generateMockHash(longUrl);
    const mockShortUrl = `https://bit.ly/${hash}`;
    urlCache.set(longUrl, mockShortUrl);
    return mockShortUrl;
  }

  try {
    const response = await fetch(BITLY_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BITLY_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        long_url: longUrl,
        domain: 'bit.ly', // or your custom domain
      }),
    });

    if (!response.ok) {
      throw new Error(`Bitly API error: ${response.status}`);
    }

    const data = await response.json();
    const shortUrl = data.link;

    // Cache the result
    urlCache.set(longUrl, shortUrl);

    return shortUrl;
  } catch (error) {
    console.error('Error shortening URL:', error);
    // Return original URL if shortening fails
    return longUrl;
  }
}

/**
 * Generate a mock hash for demo purposes
 * @param {string} url - The URL to hash
 * @returns {string} - A short hash string
 */
function generateMockHash(url) {
  // Simple hash function for demo
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    const char = url.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Convert to base36 and take first 6 characters
  const hashStr = Math.abs(hash).toString(36);
  return hashStr.substring(0, 6);
}

/**
 * Batch shorten multiple URLs
 * @param {string[]} urls - Array of URLs to shorten
 * @returns {Promise<Object>} - Map of original URLs to shortened URLs
 */
export async function shortenUrls(urls) {
  const results = {};

  // Process URLs in parallel
  await Promise.all(
    urls.map(async (url) => {
      results[url] = await shortenUrl(url);
    })
  );

  return results;
}

/**
 * Create a shortened URL with UTM parameters for tracking
 * @param {string} baseUrl - The base URL
 * @param {Object} utmParams - UTM parameters (source, medium, campaign, etc.)
 * @returns {Promise<string>} - Shortened URL with UTM parameters
 */
export async function createTrackableShortUrl(baseUrl, utmParams = {}) {
  const url = new URL(baseUrl);

  // Add UTM parameters
  if (utmParams.source) url.searchParams.set('utm_source', utmParams.source);
  if (utmParams.medium) url.searchParams.set('utm_medium', utmParams.medium);
  if (utmParams.campaign) url.searchParams.set('utm_campaign', utmParams.campaign);
  if (utmParams.content) url.searchParams.set('utm_content', utmParams.content);

  const longUrl = url.toString();
  return await shortenUrl(longUrl);
}

// Setup instructions for Bitly integration:
// 1. Sign up for Bitly at https://bitly.com/
// 2. Generate an API token at https://app.bitly.com/settings/api/
// 3. Create a .env file in your project root
// 4. Add: REACT_APP_BITLY_API_TOKEN=your_token_here
// 5. Restart your development server
