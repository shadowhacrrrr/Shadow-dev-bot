/**
 * ============================================================
 * SHADOW DEV BOT - WEBSITE DEPLOYMENT ENGINE
 * ============================================================
 * Deploys customized websites with unique URLs
 * ============================================================
 */

const fs = require('fs-extra');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const config = require('../config');
const templateEngine = require('./template-engine');

const DEPLOYED_DIR = path.join(__dirname, '..', 'deployed');

// Ensure deployed directory exists
fs.ensureDirSync(DEPLOYED_DIR);

const deployer = {
  /**
   * Deploy a customized website
   * @param {Object} options - Deployment options
   * @returns {Object} - Deployment result
   */
  async deploy(options) {
    try {
      const { templateId, userId, customData, template } = options;

      // Generate unique website ID
      const websiteId = `shadow_${uuidv4().substr(0, 8)}`;
      const deployPath = path.join(DEPLOYED_DIR, websiteId);

      // Create deployment directory
      fs.ensureDirSync(deployPath);

      // Generate website HTML using template engine
      const html = templateEngine.generateWebsite({
        templateId,
        customData,
        template,
        websiteId
      });

      // Write index.html
      fs.writeFileSync(path.join(deployPath, 'index.html'), html);

      // Copy template assets if available
      const templateAssetsPath = path.join(config.templates.assetsPath, templateId);
      if (fs.existsSync(templateAssetsPath)) {
        fs.copySync(templateAssetsPath, deployPath);
      }

      // Generate deployment URL
      const deployUrl = `${config.deployment.baseUrl}/deployed/${websiteId}`;

      console.log(`✅ Website deployed: ${deployUrl}`);

      return {
        success: true,
        websiteId,
        url: deployUrl,
        path: deployPath,
        deployedAt: new Date().toISOString()
      };

    } catch (error) {
      console.error('Deployment error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  /**
   * Get deployed website path
   * @param {string} websiteId 
   * @returns {string|null}
   */
  getDeployedPath(websiteId) {
    const deployPath = path.join(DEPLOYED_DIR, websiteId);
    return fs.existsSync(deployPath) ? deployPath : null;
  },

  /**
   * Check if website exists
   * @param {string} websiteId 
   * @returns {boolean}
   */
  websiteExists(websiteId) {
    return fs.existsSync(path.join(DEPLOYED_DIR, websiteId));
  },

  /**
   * Delete deployed website
   * @param {string} websiteId 
   * @returns {boolean}
   */
  deleteWebsite(websiteId) {
    try {
      const deployPath = path.join(DEPLOYED_DIR, websiteId);
      if (fs.existsSync(deployPath)) {
        fs.removeSync(deployPath);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Delete error:', error);
      return false;
    }
  },

  /**
   * Get all deployed websites
   * @returns {Array}
   */
  getAllDeployed() {
    try {
      const dirs = fs.readdirSync(DEPLOYED_DIR);
      return dirs.filter(dir => {
        return fs.statSync(path.join(DEPLOYED_DIR, dir)).isDirectory();
      }).map(dir => ({
        id: dir,
        path: path.join(DEPLOYED_DIR, dir),
        url: `${config.deployment.baseUrl}/deployed/${dir}`
      }));
    } catch {
      return [];
    }
  },

  /**
   * Get deployment stats
   * @returns {Object}
   */
  getStats() {
    const deployed = this.getAllDeployed();
    return {
      totalDeployed: deployed.length,
      totalSize: deployed.reduce((acc, d) => {
        try {
          const stats = fs.statSync(d.path);
          return acc + stats.size;
        } catch {
          return acc;
        }
      }, 0)
    };
  }
};

module.exports = deployer;
