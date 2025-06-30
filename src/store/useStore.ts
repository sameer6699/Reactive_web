import { create } from 'zustand';
import { CartItem, User, Template } from '../types';
import { useEffect } from 'react';

interface Store {
  // User state
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  updateUserOnboardingInfo: (userId: string, data: object) => Promise<void>;
  updateUserSocialLinks: (userId: string, socialLinks: object) => Promise<void>;
  
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
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null, cart: [] });
  },
  updateUserOnboardingInfo: async (userId, data) => {
    try {
      const response = await fetch(`/api/users/${userId}/onboarding`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Failed to update user onboarding info. Server response:", errorData);
        throw new Error('Failed to update user onboarding info');
      }

      const updatedUser = await response.json();
      
      set({ user: updatedUser.data });
      localStorage.setItem('user', JSON.stringify(updatedUser.data));

    } catch (error) {
      console.error("Error updating user onboarding info:", error);
    }
  },
  updateUserSocialLinks: async (userId: string, socialLinks: object) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ socialLinks }),
      });
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Failed to update social links. Server response:', errorData);
        throw new Error('Failed to update social links');
      }
      const updatedUser = await response.json();
      set({ user: updatedUser.data });
      localStorage.setItem('user', JSON.stringify(updatedUser.data));
    } catch (error) {
      console.error('Error updating social links:', error);
    }
  },
  
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

// Hydrate user from localStorage on first load
export const useHydrateUser = () => {
  const setUser = useStore((state) => state.setUser);
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        // Ensure user object has all required fields before setting
        if (userData && userData.id) {
          setUser(userData);
        } else {
          setUser(null);
          localStorage.removeItem('user');
        }
      } catch {
        setUser(null);
        localStorage.removeItem('user');
      }
    }
  }, [setUser]);
};