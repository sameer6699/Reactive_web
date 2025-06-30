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
  name: string;
  email: string;
  avatar: string;
  isPremium: boolean;
  purchasedTemplates: string[];
  firstName?: string;
  lastName?: string;
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