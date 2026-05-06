/**
 * ============================================================
 * SHADOW DEV BOT - JSON DATABASE SYSTEM
 * ============================================================
 * No external database needed - everything stored in JSON files
 * ============================================================
 */

const fs = require('fs-extra');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const config = require('../config');

const DATA_DIR = path.join(__dirname, '..', 'data');

// Ensure data directory exists
fs.ensureDirSync(DATA_DIR);

// File paths
const FILES = {
  users: path.join(DATA_DIR, 'users.json'),
  websites: path.join(DATA_DIR, 'websites.json'),
  stats: path.join(DATA_DIR, 'stats.json'),
  referrals: path.join(DATA_DIR, 'referrals.json'),
  admin: path.join(DATA_DIR, 'admin.json')
};

// Initialize files if they don't exist
function initFile(filePath, defaultData = {}) {
  if (!fs.existsSync(filePath)) {
    fs.writeJsonSync(filePath, defaultData, { spaces: 2 });
  }
}

// Initialize all files
Object.values(FILES).forEach(file => initFile(file, {}));
initFile(FILES.stats, {
  totalUsers: 0,
  totalWebsites: 0,
  websitesToday: 0,
  activeToday: 0,
  totalReferrals: 0,
  lastResetDate: new Date().toDateString()
});

// ==================== USER MANAGEMENT ====================

const db = {
  // Register new user
  registerUser(userId, username, referredBy = null) {
    const users = this.getUsers();
    const userIdStr = userId.toString();

    if (!users[userIdStr]) {
      users[userIdStr] = {
        id: userId,
        username: username,
        joinedAt: new Date().toISOString(),
        isVerified: false,
        websitesToday: 0,
        dailyLimit: config.limits.dailyFreeLimit,
        totalWebsites: 0,
        referrals: 0,
        referredBy: referredBy,
        referralCode: `ref_${userId}_${Math.random().toString(36).substr(2, 6)}`,
        websites: [],
        lastResetDate: new Date().toDateString(),
        lastActive: new Date().toISOString()
      };

      // Handle referral
      if (referredBy) {
        const referrer = users[referredBy.toString()];
        if (referrer) {
          referrer.referrals = (referrer.referrals || 0) + 1;
          referrer.dailyLimit = config.limits.dailyFreeLimit + referrer.referrals;
          this.saveUsers(users);

          // Save referral record
          this.addReferral(referredBy, userId);
        }
      }

      this.saveUsers(users);
      this.incrementStat('totalUsers');
      return true;
    }

    // Update last active
    users[userIdStr].lastActive = new Date().toISOString();
    this.saveUsers(users);
    return false;
  },

  // Verify user
  verifyUser(userId) {
    const users = this.getUsers();
    const userIdStr = userId.toString();
    if (users[userIdStr]) {
      users[userIdStr].isVerified = true;
      this.saveUsers(users);
      return true;
    }
    return false;
  },

  // Get user
  getUser(userId) {
    const users = this.getUsers();
    return users[userId.toString()] || null;
  },

  // Get all users
  getUsers() {
    try {
      return fs.readJsonSync(FILES.users) || {};
    } catch {
      return {};
    }
  },

  // Save users
  saveUsers(users) {
    fs.writeJsonSync(FILES.users, users, { spaces: 2 });
  },

  // Get all users array
  getAllUsers() {
    return Object.values(this.getUsers());
  },

  // ==================== WEBSITE MANAGEMENT ====================

  // Check if user can create website
  canCreateWebsite(userId) {
    this.checkAndResetDailyLimit(userId);
    const user = this.getUser(userId);
    if (!user) return { allowed: false, reason: 'User not found' };
    if (!user.isVerified) return { allowed: false, reason: 'Not verified' };

    return {
      allowed: user.websitesToday < user.dailyLimit,
      remaining: user.dailyLimit - user.websitesToday,
      limit: user.dailyLimit,
      used: user.websitesToday
    };
  },

  // Increment website count
  incrementWebsiteCount(userId) {
    this.checkAndResetDailyLimit(userId);
    const users = this.getUsers();
    const userIdStr = userId.toString();

    if (users[userIdStr]) {
      users[userIdStr].websitesToday = (users[userIdStr].websitesToday || 0) + 1;
      users[userIdStr].totalWebsites = (users[userIdStr].totalWebsites || 0) + 1;
      this.saveUsers(users);
      this.incrementStat('totalWebsites');
      this.incrementStat('websitesToday');
      return true;
    }
    return false;
  },

  // Add website to user's list
  addWebsite(userId, websiteData) {
    const users = this.getUsers();
    const userIdStr = userId.toString();

    if (users[userIdStr]) {
      users[userIdStr].websites = users[userIdStr].websites || [];
      users[userIdStr].websites.push(websiteData);
      this.saveUsers(users);

      // Also add to global websites
      const websites = this.getWebsites();
      websites[websiteData.id] = {
        ...websiteData,
        userId: userId,
        username: users[userIdStr].username
      };
      this.saveWebsites(websites);
      return true;
    }
    return false;
  },

  // Delete website
  deleteWebsite(userId, webId) {
    const users = this.getUsers();
    const userIdStr = userId.toString();

    if (users[userIdStr] && users[userIdStr].websites) {
      users[userIdStr].websites = users[userIdStr].websites.filter(w => w.id !== webId);
      users[userIdStr].totalWebsites = Math.max(0, users[userIdStr].totalWebsites - 1);
      this.saveUsers(users);

      // Remove from global
      const websites = this.getWebsites();
      delete websites[webId];
      this.saveWebsites(websites);
      return true;
    }
    return false;
  },

  // Get all websites
  getWebsites() {
    try {
      return fs.readJsonSync(FILES.websites) || {};
    } catch {
      return {};
    }
  },

  // Save websites
  saveWebsites(websites) {
    fs.writeJsonSync(FILES.websites, websites, { spaces: 2 });
  },

  // Get all websites array
  getAllWebsites() {
    return Object.values(this.getWebsites());
  },

  // ==================== DAILY LIMIT ====================

  // Check and reset daily limit
  checkAndResetDailyLimit(userId) {
    const users = this.getUsers();
    const userIdStr = userId.toString();
    const today = new Date().toDateString();

    if (users[userIdStr] && users[userIdStr].lastResetDate !== today) {
      users[userIdStr].websitesToday = 0;
      users[userIdStr].lastResetDate = today;
      this.saveUsers(users);
    }

    // Check global stats reset
    this.checkGlobalReset();
  },

  // Check global daily reset
  checkGlobalReset() {
    const stats = this.getStats();
    const today = new Date().toDateString();

    if (stats.lastResetDate !== today) {
      stats.websitesToday = 0;
      stats.activeToday = 0;
      stats.lastResetDate = today;
      this.saveStats(stats);
    }
  },

  // ==================== REFERRALS ====================

  // Add referral record
  addReferral(referrerId, referredId) {
    const referrals = this.getReferrals();
    const refId = `${referrerId}_${referredId}`;
    referrals[refId] = {
      referrerId,
      referredId,
      date: new Date().toISOString()
    };
    this.saveReferrals(referrals);
    this.incrementStat('totalReferrals');
  },

  // Get referrals
  getReferrals() {
    try {
      return fs.readJsonSync(FILES.referrals) || {};
    } catch {
      return {};
    }
  },

  // Save referrals
  saveReferrals(referrals) {
    fs.writeJsonSync(FILES.referrals, referrals, { spaces: 2 });
  },

  // ==================== STATS ====================

  // Get stats
  getStats() {
    this.checkGlobalReset();
    try {
      return fs.readJsonSync(FILES.stats) || {};
    } catch {
      return {
        totalUsers: 0,
        totalWebsites: 0,
        websitesToday: 0,
        activeToday: 0,
        totalReferrals: 0
      };
    }
  },

  // Save stats
  saveStats(stats) {
    fs.writeJsonSync(FILES.stats, stats, { spaces: 2 });
  },

  // Increment stat
  incrementStat(key) {
    const stats = this.getStats();
    stats[key] = (stats[key] || 0) + 1;
    this.saveStats(stats);
  },

  // ==================== ADMIN FUNCTIONS ====================

  // Set user limit
  setUserLimit(userId, limit) {
    const users = this.getUsers();
    const userIdStr = userId.toString();
    if (users[userIdStr]) {
      users[userIdStr].dailyLimit = limit;
      this.saveUsers(users);
      return true;
    }
    return false;
  },

  // Ban user
  banUser(userId) {
    const users = this.getUsers();
    const userIdStr = userId.toString();
    if (users[userIdStr]) {
      users[userIdStr].banned = true;
      this.saveUsers(users);
      return true;
    }
    return false;
  },

  // Unban user
  unbanUser(userId) {
    const users = this.getUsers();
    const userIdStr = userId.toString();
    if (users[userIdStr]) {
      users[userIdStr].banned = false;
      this.saveUsers(users);
      return true;
    }
    return false;
  },

  // Get user by username
  getUserByUsername(username) {
    const users = this.getUsers();
    return Object.values(users).find(u => u.username === username.replace('@', '')) || null;
  }
};

module.exports = db;
