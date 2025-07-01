export interface Template {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  tags: string[];
  techStack: string[];
  thumbnail: string;
  previewImages: string[];
  demoUrl?: string;
  rating: number;
  reviewCount: number;
  downloadCount: number;
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  isFeatured: boolean;
  isPremium: boolean;
}

export interface User {
  id: string;
  name?: string;
  email: string;
  avatar?: string;
  isPremium?: boolean;
  purchasedTemplates?: string[];
  firstName?: string;
  lastName?: string;
  fullName?: string;
  onboardingComplete?: boolean;
  userType?: 'developer' | 'designer' | 'startup-founder' | 'business-owner' | 'freelancer' | 'agency' | 'other';
  userTypeOther?: string;
  primaryGoal?: 'buy' | 'sell' | 'both' | 'exploring';
  skillLevel?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  targetPlatforms?: string[];
  templateInterests?: string[];
  preferredTheme?: 'light' | 'dark' | 'both' | 'no-preference';
  designStyle?: 'minimalist' | 'creative' | 'corporate' | 'modern';
  role?: string;
  occupation?: string;
  createdAt?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    dribbble?: string;
    behance?: string;
    [key: string]: string | undefined;
  };
}

export interface CartItem {
  template: Template;
  quantity: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  templateId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface FilterOptions {
  category: string;
  priceRange: [number, number];
  tags: string[];
  techStack: string[];
  rating: number;
}