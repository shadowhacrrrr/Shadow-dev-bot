/**
 * ============================================================
 * SHADOW DEV BOT - TEMPLATE MANAGEMENT SYSTEM
 * ============================================================
 * 300+ Premium Templates with High-Level Animations
 * ============================================================
 */

const fs = require('fs-extra');
const path = require('path');
const config = require('../config');

const TEMPLATES_DIR = path.join(__dirname, '..', 'templates', 'categories');
const TEMPLATES_INDEX = path.join(__dirname, '..', 'templates', 'index.json');

// Template categories with icons
const CATEGORIES = [
  { id: "landing-pages", name: "Landing Pages", icon: "🚀" },
  { id: "portfolios", name: "Portfolios", icon: "💼" },
  { id: "business", name: "Business", icon: "🏢" },
  { id: "ecommerce", name: "E-Commerce", icon: "🛒" },
  { id: "saas", name: "SaaS", icon: "☁️" },
  { id: "agency", name: "Agency", icon: "🎯" },
  { id: "personal", name: "Personal", icon: "👤" },
  { id: "startup", name: "Startup", icon: "🚀" },
  { id: "restaurant", name: "Restaurant", icon: "🍽️" },
  { id: "medical", name: "Medical", icon: "🏥" },
  { id: "education", name: "Education", icon: "📚" },
  { id: "real-estate", name: "Real Estate", icon: "🏠" },
  { id: "technology", name: "Technology", icon: "💻" },
  { id: "fashion", name: "Fashion", icon: "👗" },
  { id: "photography", name: "Photography", icon: "📸" },
  { id: "fitness", name: "Fitness", icon: "💪" },
  { id: "travel", name: "Travel", icon: "✈️" },
  { id: "automotive", name: "Automotive", icon: "🚗" },
  { id: "entertainment", name: "Entertainment", icon: "🎬" },
  { id: "nonprofit", name: "Non-Profit", icon: "🌍" }
];

// Generate 300+ templates
function generateTemplates() {
  const templates = [];
  let id = 1;

  // Animation presets
  const animations = [
    ["fadeIn", "slideUp", "parallax"],
    ["zoomIn", "scrollReveal", "gradientShift"],
    ["slideLeft", "slideRight", "glow"],
    ["bounceIn", "flipIn", "pulse"],
    ["neon", "glitch", "textScramble"],
    ["rotateIn", "morph", "particle"],
    ["magneticButton", "liquidEffect", "3dTilt"],
    ["waveAnimation", "floatingElements", "matrixRain"],
    ["aurora", "borderGlow", "typewriter"],
    ["shake", "slideUp", "zoomIn", "glow"],
    ["parallax", "scrollReveal", "gradientShift", "neon"],
    ["fadeIn", "slideLeft", "bounceIn", "particle"],
    ["zoomIn", "rotateIn", "flipIn", "magneticButton"],
    ["slideUp", "slideDown", "glow", "liquidEffect"],
    ["fadeIn", "parallax", "3dTilt", "aurora"]
  ];

  // Template name generators per category
  const namePatterns = {
    "landing-pages": [
      "Shadow Launch", "Shadow Landing Pro", "Shadow Convert", "Shadow Lead",
      "Shadow Funnel", "Shadow Capture", "Shadow Boost", "Shadow Spark",
      "Shadow Ignite", "Shadow Blaze", "Shadow Surge", "Shadow Pulse",
      "Shadow Thrust", "Shadow Elevate", "Shadow Ascend", "Shadow Peak",
      "Shadow Summit", "Shadow Apex", "Shadow Prime", "Shadow Elite"
    ],
    "portfolios": [
      "Shadow Portfolio", "Shadow Showcase", "Shadow Gallery", "Shadow Works",
      "Shadow Creative", "Shadow Studio", "Shadow Artisan", "Shadow Craft",
      "Shadow Vision", "Shadow Lens", "Shadow Frame", "Shadow Canvas",
      "Shadow Mosaic", "Shadow Collection", "Shadow Exhibit", "Shadow Display",
      "Shadow Archive", "Shadow Index", "Shadow Catalog", "Shadow Treasury"
    ],
    "business": [
      "Shadow Business", "Shadow Corporate", "Shadow Enterprise", "Shadow Firm",
      "Shadow Company", "Shadow Office", "Shadow Professional", "Shadow Executive",
      "Shadow Ventures", "Shadow Capital", "Shadow Partners", "Shadow Group",
      "Shadow Solutions", "Shadow Services", "Shadow Industries", "Shadow Holdings",
      "Shadow Global", "Shadow World", "Shadow Connect", "Shadow Network"
    ],
    "ecommerce": [
      "Shadow Shop", "Shadow Store", "Shadow Market", "Shadow Mart",
      "Shadow Retail", "Shadow Bazaar", "Shadow Emporium", "Shadow Outlet",
      "Shadow Cart", "Shadow Buy", "Shadow Deal", "Shadow Sale",
      "Shadow Brand", "Shadow Label", "Shadow Tag", "Shadow Price",
      "Shadow Discount", "Shadow Offer", "Shadow Promo", "Shadow Bundle"
    ],
    "saas": [
      "Shadow Cloud", "Shadow App", "Shadow Platform", "Shadow Software",
      "Shadow Service", "Shadow System", "Shadow Hub", "Shadow Dashboard",
      "Shadow Panel", "Shadow Console", "Shadow Interface", "Shadow API",
      "Shadow Sync", "Shadow Flow", "Shadow Stream", "Shadow Wave",
      "Shadow Pulse", "Shadow Signal", "Shadow Grid", "Shadow Matrix"
    ],
    "agency": [
      "Shadow Agency", "Shadow Digital", "Shadow Media", "Shadow Creative",
      "Shadow Design", "Shadow Branding", "Shadow Marketing", "Shadow SEO",
      "Shadow Growth", "Shadow Scale", "Shadow Boost", "Shadow Accelerate",
      "Shadow Drive", "Shadow Push", "Shadow Force", "Shadow Power",
      "Shadow Impact", "Shadow Influence", "Shadow Reach", "Shadow Expand"
    ],
    "personal": [
      "Shadow Personal", "Shadow Profile", "Shadow About", "Shadow Me",
      "Shadow Identity", "Shadow Self", "Shadow Presence", "Shadow Aura",
      "Shadow Vibe", "Shadow Style", "Shadow Look", "Shadow Feel",
      "Shadow Touch", "Shadow Sense", "Shadow Essence", "Shadow Soul",
      "Shadow Spirit", "Shadow Mind", "Shadow Body", "Shadow Life"
    ],
    "startup": [
      "Shadow Startup", "Shadow Launchpad", "Shadow Incubator", "Shadow Accelerator",
      "Shadow Seed", "Shadow Venture", "Shadow Fund", "Shadow Invest",
      "Shadow Pitch", "Shadow Deck", "Shadow Demo", "Shadow Beta",
      "Shadow Alpha", "Shadow MVP", "Shadow Product", "Shadow Build",
      "Shadow Ship", "Shadow Deliver", "Shadow Execute", "Shadow Perform"
    ],
    "restaurant": [
      "Shadow Dine", "Shadow Feast", "Shadow Flavor", "Shadow Taste",
      "Shadow Chef", "Shadow Kitchen", "Shadow Bistro", "Shadow Cafe",
      "Shadow Grill", "Shadow Roast", "Shadow Bake", "Shadow Brew",
      "Shadow Bar", "Shadow Lounge", "Shadow Pub", "Shadow Tavern",
      "Shadow Eatery", "Shadow Joint", "Shadow Spot", "Shadow Place"
    ],
    "medical": [
      "Shadow Health", "Shadow Care", "Shadow Clinic", "Shadow Hospital",
      "Shadow Med", "Shadow Wellness", "Shadow Cure", "Shadow Heal",
      "Shadow Life", "Shadow Vitality", "Shadow Fitness", "Shadow Therapy",
      "Shadow Rehab", "Shadow Recovery", "Shadow Treatment", "Shadow Consult",
      "Shadow Doctor", "Shadow Nurse", "Shadow Pharma", "Shadow Lab"
    ],
    "education": [
      "Shadow Edu", "Shadow Learn", "Shadow Academy", "Shadow School",
      "Shadow Institute", "Shadow College", "Shadow University", "Shadow Class",
      "Shadow Course", "Shadow Lesson", "Shadow Tutorial", "Shadow Training",
      "Shadow Coach", "Shadow Mentor", "Shadow Guide", "Shadow Master",
      "Shadow Expert", "Shadow Pro", "Shadow Skill", "Shadow Knowledge"
    ],
    "real-estate": [
      "Shadow Estate", "Shadow Property", "Shadow Home", "Shadow House",
      "Shadow Villa", "Shadow Apartment", "Shadow Condo", "Shadow Residence",
      "Shadow Living", "Shadow Space", "Shadow Place", "Shadow Habitat",
      "Shadow Haven", "Shadow Retreat", "Shadow Sanctuary", "Shadow Shelter",
      "Shadow Dwelling", "Shadow Abode", "Shadow Mansion", "Shadow Castle"
    ],
    "technology": [
      "Shadow Tech", "Shadow Digital", "Shadow Cyber", "Shadow Net",
      "Shadow Web", "Shadow Code", "Shadow Dev", "Shadow Hack",
      "Shadow Data", "Shadow Info", "Shadow Intel", "Shadow Smart",
      "Shadow AI", "Shadow Bot", "Shadow Auto", "Shadow Robo",
      "Shadow Future", "Shadow Next", "Shadow Inno", "Shadow Vation"
    ],
    "fashion": [
      "Shadow Fashion", "Shadow Style", "Shadow Trend", "Shadow Vogue",
      "Shadow Chic", "Shadow Glam", "Shadow Luxe", "Shadow Couture",
      "Shadow Wear", "Shadow Dress", "Shadow Suit", "Shadow Attire",
      "Shadow Look", "Shadow Outfit", "Shadow Ensemble", "Shadow Collection",
      "Shadow Line", "Shadow Brand", "Shadow Label", "Shadow Tag"
    ],
    "photography": [
      "Shadow Photo", "Shadow Pic", "Shadow Shot", "Shadow Snap",
      "Shadow Capture", "Shadow Frame", "Shadow Lens", "Shadow Focus",
      "Shadow View", "Shadow Sight", "Shadow Vision", "Shadow Eye",
      "Shadow Image", "Shadow Picture", "Shadow Portrait", "Shadow Scene",
      "Shadow Moment", "Shadow Memory", "Shadow Flash", "Shadow Click"
    ],
    "fitness": [
      "Shadow Fit", "Shadow Gym", "Shadow Workout", "Shadow Exercise",
      "Shadow Train", "Shadow Sport", "Shadow Active", "Shadow Move",
      "Shadow Run", "Shadow Lift", "Shadow Build", "Shadow Shape",
      "Shadow Form", "Shadow Tone", "Shadow Sculpt", "Shadow Burn",
      "Shadow Sweat", "Shadow Energy", "Shadow Power", "Shadow Strength"
    ],
    "travel": [
      "Shadow Travel", "Shadow Trip", "Shadow Tour", "Shadow Journey",
      "Shadow Voyage", "Shadow Adventure", "Shadow Explore", "Shadow Discover",
      "Shadow Visit", "Shadow Stay", "Shadow Hotel", "Shadow Resort",
      "Shadow Destination", "Shadow Place", "Shadow Spot", "Shadow Location",
      "Shadow Guide", "Shadow Map", "Shadow Route", "Shadow Path"
    ],
    "automotive": [
      "Shadow Auto", "Shadow Car", "Shadow Drive", "Shadow Ride",
      "Shadow Motor", "Shadow Engine", "Shadow Speed", "Shadow Race",
      "Shadow Wheel", "Shadow Tire", "Shadow Road", "Shadow Track",
      "Shadow Garage", "Shadow Shop", "Shadow Service", "Shadow Repair",
      "Shadow Custom", "Shadow Mod", "Shadow Tune", "Shadow Boost"
    ],
    "entertainment": [
      "Shadow Fun", "Shadow Play", "Shadow Game", "Shadow Entertain",
      "Shadow Show", "Shadow Performance", "Shadow Event", "Shadow Party",
      "Shadow Music", "Shadow Dance", "Shadow Film", "Shadow Movie",
      "Shadow Theater", "Shadow Stage", "Shadow Screen", "Shadow Stream",
      "Shadow Watch", "Shadow Listen", "Shadow Enjoy", "Shadow Experience"
    ],
    "nonprofit": [
      "Shadow Cause", "Shadow Charity", "Shadow Help", "Shadow Aid",
      "Shadow Support", "Shadow Care", "Shadow Love", "Shadow Hope",
      "Shadow Dream", "Shadow Mission", "Shadow Vision", "Shadow Goal",
      "Shadow Purpose", "Shadow Impact", "Shadow Change", "Shadow Transform",
      "Shadow Better", "Shadow Good", "Shadow Best", "Shadow Hero"
    ]
  };

  // Generate templates for each category
  CATEGORIES.forEach((category, catIndex) => {
    const names = namePatterns[category.id] || [];
    names.forEach((name, index) => {
      const animSet = animations[(catIndex + index) % animations.length];
      templates.push({
        id: `shadow_${category.id}_${index + 1}`,
        name: name,
        category: category.name,
        categoryId: category.id,
        description: `Premium ${category.name.toLowerCase()} website template with ${animSet.join(', ')} animations. Fully responsive and customizable.`,
        animations: animSet,
        usageCount: Math.floor(Math.random() * 500),
        previewImage: null,
        demoUrl: null,
        customFields: ["name", "email", "title", "description", "color"],
        features: ["Responsive", "SEO Optimized", "Fast Loading", "Customizable"],
        createdAt: new Date().toISOString()
      });
      id++;
    });
  });

  return templates;
}

// Initialize templates index
function initTemplates() {
  if (!fs.existsSync(TEMPLATES_INDEX)) {
    const templates = generateTemplates();
    fs.writeJsonSync(TEMPLATES_INDEX, {
      version: "1.0.0",
      totalTemplates: templates.length,
      categories: CATEGORIES,
      templates: templates,
      lastUpdated: new Date().toISOString()
    }, { spaces: 2 });
    console.log(`✅ Generated ${templates.length} templates`);
  }
}

// Template manager
const templates = {
  // Initialize
  init() {
    initTemplates();
  },

  // Get all categories
  getCategories() {
    return CATEGORIES;
  },

  // Get category by ID
  getCategoryById(categoryId) {
    return CATEGORIES.find(c => c.id === categoryId) || null;
  },

  // Get all templates
  getAllTemplates() {
    try {
      const data = fs.readJsonSync(TEMPLATES_INDEX);
      return data.templates || [];
    } catch {
      return [];
    }
  },

  // Get templates by category
  getTemplatesByCategory(categoryId) {
    return this.getAllTemplates().filter(t => t.categoryId === categoryId);
  },

  // Get template by ID
  getTemplateById(templateId) {
    return this.getAllTemplates().find(t => t.id === templateId) || null;
  },

  // Get template count
  getTemplateCount() {
    return this.getAllTemplates().length;
  },

  // Increment template usage
  incrementUsage(templateId) {
    try {
      const data = fs.readJsonSync(TEMPLATES_INDEX);
      const template = data.templates.find(t => t.id === templateId);
      if (template) {
        template.usageCount = (template.usageCount || 0) + 1;
        fs.writeJsonSync(TEMPLATES_INDEX, data, { spaces: 2 });
      }
    } catch (error) {
      console.error('Error incrementing usage:', error);
    }
  },

  // Add new template (admin)
  addTemplate(templateData) {
    try {
      const data = fs.readJsonSync(TEMPLATES_INDEX);
      data.templates.push({
        ...templateData,
        id: templateData.id || `shadow_custom_${Date.now()}`,
        createdAt: new Date().toISOString()
      });
      data.totalTemplates = data.templates.length;
      data.lastUpdated = new Date().toISOString();
      fs.writeJsonSync(TEMPLATES_INDEX, data, { spaces: 2 });
      return true;
    } catch (error) {
      console.error('Error adding template:', error);
      return false;
    }
  },

  // Remove template (admin)
  removeTemplate(templateId) {
    try {
      const data = fs.readJsonSync(TEMPLATES_INDEX);
      data.templates = data.templates.filter(t => t.id !== templateId);
      data.totalTemplates = data.templates.length;
      data.lastUpdated = new Date().toISOString();
      fs.writeJsonSync(TEMPLATES_INDEX, data, { spaces: 2 });
      return true;
    } catch (error) {
      console.error('Error removing template:', error);
      return false;
    }
  }
};

// Initialize on load
templates.init();

module.exports = templates;
