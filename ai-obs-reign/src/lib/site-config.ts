// Site configuration management
export interface SiteColors {
  id: string;
  name: string;
  hex: string;
  description?: string;
}

export interface SiteConfig {
  id: string;
  siteName: string;
  siteDescription: string;
  brandColors: SiteColors[];
  backgroundColors: SiteColors[];
  updatedAt: string;
}

export const defaultSiteConfig: SiteConfig = {
  id: 'site-config-1',
  siteName: 'R.E.I.G.N',
  siteDescription: 'AI Observability Platform',
  brandColors: [
    { id: 'primary', name: 'Primary Blue', hex: '#2563eb', description: 'Main brand color' },
    { id: 'secondary', name: 'Secondary Blue', hex: '#1d4ed8', description: 'Secondary brand color' },
    { id: 'accent', name: 'Accent Green', hex: '#10b981', description: 'Accent color' },
    { id: 'warning', name: 'Warning Orange', hex: '#f59e0b', description: 'Warning/alert color' },
    { id: 'success', name: 'Success Green', hex: '#059669', description: 'Success color' },
    { id: 'error', name: 'Error Red', hex: '#dc2626', description: 'Error color' },
  ],
  backgroundColors: [
    { id: 'white', name: 'Pure White', hex: '#ffffff', description: 'Clean white background' },
    { id: 'gray-50', name: 'Light Gray', hex: '#f9fafb', description: 'Very light gray' },
    { id: 'gray-100', name: 'Soft Gray', hex: '#f3f4f6', description: 'Soft gray background' },
    { id: 'gray-900', name: 'Dark Gray', hex: '#111827', description: 'Dark background' },
    { id: 'black', name: 'Pure Black', hex: '#000000', description: 'Deep black background' },
    { id: 'blue-900', name: 'Dark Blue', hex: '#1e3a8a', description: 'Dark blue background' },
    { id: 'purple-900', name: 'Dark Purple', hex: '#581c87', description: 'Dark purple background' },
    { id: 'green-900', name: 'Dark Green', hex: '#14532d', description: 'Dark green background' },
    { id: 'gradient-blue', name: 'Blue Gradient', hex: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', description: 'Blue to purple gradient' },
    { id: 'gradient-sunset', name: 'Sunset Gradient', hex: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', description: 'Pink to red gradient' },
    { id: 'gradient-ocean', name: 'Ocean Gradient', hex: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', description: 'Ocean blue gradient' },
    { id: 'gradient-dark', name: 'Dark Gradient', hex: 'linear-gradient(135deg, #232526 0%, #414345 100%)', description: 'Dark gradient' },
  ],
  updatedAt: new Date().toISOString()
};

export class SiteConfigManager {
  private static readonly CONFIG_KEY = 'reign-site-config';

  static getSiteConfig(): SiteConfig {
    if (typeof window === 'undefined') return defaultSiteConfig;
    
    try {
      const stored = localStorage.getItem(this.CONFIG_KEY);
      return stored ? JSON.parse(stored) : defaultSiteConfig;
    } catch (error) {
      console.error('Error loading site config:', error);
      return defaultSiteConfig;
    }
  }

  static saveSiteConfig(config: SiteConfig): void {
    if (typeof window === 'undefined') return;
    
    try {
      const updatedConfig = {
        ...config,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(this.CONFIG_KEY, JSON.stringify(updatedConfig));
    } catch (error) {
      console.error('Error saving site config:', error);
    }
  }

  static addCustomColor(color: SiteColors, type: 'brand' | 'background'): void {
    const config = this.getSiteConfig();
    
    if (type === 'brand') {
      config.brandColors.push(color);
    } else {
      config.backgroundColors.push(color);
    }
    
    this.saveSiteConfig(config);
  }

  static removeCustomColor(colorId: string, type: 'brand' | 'background'): void {
    const config = this.getSiteConfig();
    
    if (type === 'brand') {
      config.brandColors = config.brandColors.filter(c => c.id !== colorId);
    } else {
      config.backgroundColors = config.backgroundColors.filter(c => c.id !== colorId);
    }
    
    this.saveSiteConfig(config);
  }

  static getBackgroundColors(): SiteColors[] {
    return this.getSiteConfig().backgroundColors;
  }

  static getBrandColors(): SiteColors[] {
    return this.getSiteConfig().brandColors;
  }

  static resetToDefaults(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.CONFIG_KEY);
  }
}
