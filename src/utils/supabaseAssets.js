// utils/supabaseAssets.js
// CyberCaution Asset Management System
// Centralized asset management with fallback support

// Configuration for different environments
const ASSET_CONFIG = {
  development: {
    baseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-supabase-url.supabase.co',
    storageBucket: 'cybercaution-assets'
  },
  production: {
    baseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-supabase-url.supabase.co',
    storageBucket: 'cybercaution-assets'
  }
};

const currentEnv = process.env.NODE_ENV || 'development';
const config = ASSET_CONFIG[currentEnv];

// Asset categories and their mappings
const ASSET_CATEGORIES = {
  images: {
    // Hero and marketing images
    mobileDashboard: {
      supabasePath: 'images/dashboard/mobile-dashboard-preview.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80',
      alt: 'CyberCaution Mobile Dashboard Preview',
      description: 'Mobile-optimized security dashboard interface'
    },
    heroBackground: {
      supabasePath: 'images/backgrounds/cyber-security-hero.jpg',
      fallbackUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'Cybersecurity Background',
      description: 'Main hero background image'
    },
    teamPhotos: {
      ceo: {
        supabasePath: 'images/team/ceo-portrait.jpg',
        fallbackUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        alt: 'CEO Portrait',
        description: 'Chief Executive Officer'
      },
      cto: {
        supabasePath: 'images/team/cto-portrait.jpg',
        fallbackUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        alt: 'CTO Portrait',
        description: 'Chief Technology Officer'
      }
    },
    features: {
      ransomwareProtection: {
        supabasePath: 'images/features/ransomware-shield.svg',
        fallbackUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBzdHJva2U9IiNGRjZCMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=',
        alt: 'Ransomware Protection Shield',
        description: 'Ransomware protection feature icon'
      },
      complianceFramework: {
        supabasePath: 'images/features/compliance-check.svg',
        fallbackUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgMTJMMTEgMTRMMTUgMTBNMjEgMTJDMjEgMTYuOTcwNiAxNi45NzA2IDIxIDEyIDIxQzcuMDI5NDQgMjEgMyAxNi45NzA2IDMgMTJDMyA3LjAyOTQ0IDcuMDI5NDQgMyAxMiAzQzE2Ljk3MDYgMyAyMSA3LjAyOTQ0IDIxIDEyWiIgc3Ryb2tlPSIjMDhBNjA0IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K',
        alt: 'Compliance Framework Check',
        description: 'Compliance framework validation icon'
      }
    }
  },
  documents: {
    whitepapers: {
      nistGuide: {
        supabasePath: 'documents/whitepapers/nist-csf-implementation-guide.pdf',
        fallbackUrl: '/assets/documents/nist-guide-fallback.pdf',
        title: 'NIST CSF Implementation Guide',
        description: 'Comprehensive guide to implementing NIST Cybersecurity Framework'
      },
      ransomwarePlaybook: {
        supabasePath: 'documents/playbooks/ransomware-response-playbook.pdf',
        fallbackUrl: '/assets/documents/ransomware-playbook-fallback.pdf',
        title: 'Ransomware Response Playbook',
        description: 'Step-by-step ransomware incident response procedures'
      }
    },
    templates: {
      securityPolicy: {
        supabasePath: 'documents/templates/security-policy-template.docx',
        fallbackUrl: '/assets/templates/security-policy-template.docx',
        title: 'Security Policy Template',
        description: 'Customizable security policy template'
      }
    }
  },
  videos: {
    demos: {
      platformOverview: {
        supabasePath: 'videos/demos/platform-overview-demo.mp4',
        fallbackUrl: 'https://player.vimeo.com/video/000000000',
        title: 'CyberCaution Platform Overview',
        description: 'Complete platform demonstration video'
      }
    },
    tutorials: {
      ransomwareAssessment: {
        supabasePath: 'videos/tutorials/ransomware-assessment-tutorial.mp4',
        fallbackUrl: 'https://player.vimeo.com/video/000000000',
        title: 'Ransomware Assessment Tutorial',
        description: 'Step-by-step assessment tutorial'
      }
    }
  }
};

// Helper function to construct Supabase storage URL
const getSupabaseUrl = (path) => {
  if (!config.baseUrl || !config.storageBucket) {
    console.warn('Supabase configuration missing, using fallback assets');
    return null;
  }
  return `${config.baseUrl}/storage/v1/object/public/${config.storageBucket}/${path}`;
};

// Asset loader with fallback mechanism
class AssetLoader {
  constructor() {
    this.cache = new Map();
    this.loadAttempts = new Map();
  }

  // Check if asset exists and is accessible
  async checkAssetAvailability(url) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      console.warn(`Asset check failed for ${url}:`, error);
      return false;
    }
  }

  // Get asset URL with fallback logic
  async getAssetUrl(category, subcategory, assetKey) {
    const cacheKey = `${category}-${subcategory}-${assetKey}`;
    
    // Return cached result if available
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    let asset;
    if (subcategory) {
      asset = ASSET_CATEGORIES[category]?.[subcategory]?.[assetKey];
    } else {
      asset = ASSET_CATEGORIES[category]?.[assetKey];
    }

    if (!asset) {
      console.warn(`Asset not found: ${category}.${subcategory}.${assetKey}`);
      return null;
    }

    // Try Supabase URL first
    const supabaseUrl = getSupabaseUrl(asset.supabasePath);
    if (supabaseUrl) {
      const isAvailable = await this.checkAssetAvailability(supabaseUrl);
      if (isAvailable) {
        this.cache.set(cacheKey, supabaseUrl);
        return supabaseUrl;
      }
    }

    // Fallback to fallback URL
    console.info(`Using fallback asset for ${cacheKey}`);
    this.cache.set(cacheKey, asset.fallbackUrl);
    return asset.fallbackUrl;
  }

  // Synchronous getter for immediate use (returns fallback immediately)
  getAssetUrlSync(category, subcategory, assetKey) {
    let asset;
    if (subcategory) {
      asset = ASSET_CATEGORIES[category]?.[subcategory]?.[assetKey];
    } else {
      asset = ASSET_CATEGORIES[category]?.[assetKey];
    }

    if (!asset) {
      console.warn(`Asset not found: ${category}.${subcategory}.${assetKey}`);
      return null;
    }

    // Return Supabase URL if available, otherwise fallback
    const supabaseUrl = getSupabaseUrl(asset.supabasePath);
    return supabaseUrl || asset.fallbackUrl;
  }

  // Preload critical assets
  async preloadCriticalAssets() {
    const criticalAssets = [
      ['images', null, 'mobileDashboard'],
      ['images', null, 'heroBackground'],
      ['images', 'features', 'ransomwareProtection'],
      ['images', 'features', 'complianceFramework']
    ];

    const preloadPromises = criticalAssets.map(([category, subcategory, assetKey]) =>
      this.getAssetUrl(category, subcategory, assetKey)
    );

    try {
      await Promise.all(preloadPromises);
      console.info('Critical assets preloaded successfully');
    } catch (error) {
      console.warn('Some critical assets failed to preload:', error);
    }
  }
}

// Create singleton instance
const assetLoader = new AssetLoader();

// Export the main appAssets object with dynamic loading
export const appAssets = {
  // Images
  get mobileDashboard() {
    return assetLoader.getAssetUrlSync('images', null, 'mobileDashboard');
  },
  get heroBackground() {
    return assetLoader.getAssetUrlSync('images', null, 'heroBackground');
  },
  
  // Team photos
  team: {
    get ceo() {
      return assetLoader.getAssetUrlSync('images', 'teamPhotos', 'ceo');
    },
    get cto() {
      return assetLoader.getAssetUrlSync('images', 'teamPhotos', 'cto');
    }
  },

  // Feature icons
  features: {
    get ransomwareProtection() {
      return assetLoader.getAssetUrlSync('images', 'features', 'ransomwareProtection');
    },
    get complianceFramework() {
      return assetLoader.getAssetUrlSync('images', 'features', 'complianceFramework');
    }
  },

  // Documents
  documents: {
    whitepapers: {
      get nistGuide() {
        return assetLoader.getAssetUrlSync('documents', 'whitepapers', 'nistGuide');
      },
      get ransomwarePlaybook() {
        return assetLoader.getAssetUrlSync('documents', 'whitepapers', 'ransomwarePlaybook');
      }
    },
    templates: {
      get securityPolicy() {
        return assetLoader.getAssetUrlSync('documents', 'templates', 'securityPolicy');
      }
    }
  },

  // Videos
  videos: {
    demos: {
      get platformOverview() {
        return assetLoader.getAssetUrlSync('videos', 'demos', 'platformOverview');
      }
    },
    tutorials: {
      get ransomwareAssessment() {
        return assetLoader.getAssetUrlSync('videos', 'tutorials', 'ransomwareAssessment');
      }
    }
  }
};

// Async asset loader for advanced use cases
export const loadAsset = async (category, subcategory, assetKey) => {
  return await assetLoader.getAssetUrl(category, subcategory, assetKey);
};

// Preload critical assets (call this in your app initialization)
export const preloadAssets = async () => {
  await assetLoader.preloadCriticalAssets();
};

// Asset metadata getter
export const getAssetMetadata = (category, subcategory, assetKey) => {
  let asset;
  if (subcategory) {
    asset = ASSET_CATEGORIES[category]?.[subcategory]?.[assetKey];
  } else {
    asset = ASSET_CATEGORIES[category]?.[assetKey];
  }

  if (!asset) return null;

  return {
    alt: asset.alt,
    title: asset.title,
    description: asset.description,
    supabasePath: asset.supabasePath,
    fallbackUrl: asset.fallbackUrl
  };
};

// Configuration update function for runtime updates
export const updateAssetConfig = (newConfig) => {
  Object.assign(config, newConfig);
  assetLoader.cache.clear(); // Clear cache to force reload with new config
};

// Health check function
export const checkAssetHealth = async () => {
  const results = {
    supabaseConnected: false,
    assetsAvailable: 0,
    totalAssets: 0,
    errors: []
  };

  try {
    // Test Supabase connection
    if (config.baseUrl) {
      const testUrl = `${config.baseUrl}/storage/v1/object/public/${config.storageBucket}/health-check.txt`;
      const response = await fetch(testUrl, { method: 'HEAD' });
      results.supabaseConnected = response.ok;
    }

    // Test critical assets
    const criticalAssets = [
      ['images', null, 'mobileDashboard'],
      ['images', null, 'heroBackground']
    ];

    results.totalAssets = criticalAssets.length;

    for (const [category, subcategory, assetKey] of criticalAssets) {
      try {
        const url = await assetLoader.getAssetUrl(category, subcategory, assetKey);
        if (url) {
          const isAvailable = await assetLoader.checkAssetAvailability(url);
          if (isAvailable) {
            results.assetsAvailable++;
          } else {
            results.errors.push(`Asset not accessible: ${category}.${subcategory}.${assetKey}`);
          }
        }
      } catch (error) {
        results.errors.push(`Error loading ${category}.${subcategory}.${assetKey}: ${error.message}`);
      }
    }
  } catch (error) {
    results.errors.push(`Health check failed: ${error.message}`);
  }

  return results;
};

// Export default for backward compatibility
export default appAssets;