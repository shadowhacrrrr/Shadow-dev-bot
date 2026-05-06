/**
 * ============================================================
 * SHADOW DEV BOT - HELPER UTILITIES
 * ============================================================
 */

const helpers = {
  /**
   * Escape HTML to prevent XSS
   */
  escapeHtml(text) {
    const div = { toString: () => text };
    if (typeof text !== 'string') return text;
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  /**
   * Format date
   */
  formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  },

  /**
   * Format number with commas
   */
  formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },

  /**
   * Generate random string
   */
  randomString(length = 8) {
    return Math.random().toString(36).substring(2, 2 + length);
  },

  /**
   * Validate email
   */
  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  /**
   * Validate URL
   */
  isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Truncate text
   */
  truncate(text, length = 100) {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  },

  /**
   * Sleep/delay
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  /**
   * Chunk array into smaller arrays
   */
  chunk(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  },

  /**
   * Generate referral link
   */
  getReferralLink(botUsername, userId) {
    return `https://t.me/${botUsername}?start=${userId}`;
  },

  /**
   * Check if valid hex color
   */
  isValidColor(color) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
  },

  /**
   * Sanitize filename
   */
  sanitizeFilename(name) {
    return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  },

  /**
   * Get file extension
   */
  getExtension(filename) {
    return filename.split('.').pop().toLowerCase();
  },

  /**
   * Format bytes to human readable
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  },

  /**
   * Deep clone object
   */
  deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  },

  /**
   * Merge objects
   */
  mergeObjects(...objects) {
    return objects.reduce((acc, obj) => ({ ...acc, ...obj }), {});
  },

  /**
   * Generate timestamp ID
   */
  timestampId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
};

module.exports = helpers;
