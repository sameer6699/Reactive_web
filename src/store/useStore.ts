import { create } from 'zustand';
import { CartItem, User, Template } from '../types';

interface Store {
  // User state
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Cart state
  cart: CartItem[];
  addToCart: (template: Template) => void;
  removeFromCart: (templateId: string) => void;
  clearCart: () => void;
  
  // Search state
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Filter state
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  
  // Modal state
  isAuthModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  isSignupModalOpen: boolean;
  setSignupModalOpen: (open: boolean) => void;
}

export const useStore = create<Store>((set, get) => ({
  // User state
  user: null,
  setUser: (user) => set({ user }),
  
  // Cart state
  cart: [],
  addToCart: (template) => {
    const { cart } = get();
    const existingItem = cart.find(item => item.template.id === template.id);
    
    if (existingItem) {
      return; // Template already in cart
    }
    
    set({ cart: [...cart, { template, quantity: 1 }] });
  },
  removeFromCart: (templateId) => {
    const { cart } = get();
    set({ cart: cart.filter(item => item.template.id !== templateId) });
  },
  clearCart: () => set({ cart: [] }),
  
  // Search state
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  // Filter state
  selectedCategory: 'all',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  // Modal state
  isAuthModalOpen: false,
  setAuthModalOpen: (open) => set({ isAuthModalOpen: open }),
  isSignupModalOpen: false,
  setSignupModalOpen: (open) => set({ isSignupModalOpen: open }),
}));