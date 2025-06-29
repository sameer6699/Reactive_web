import { Template, Review } from '../types';

export const mockTemplates: Template[] = [
  {
    id: '1',
    title: 'Modern SaaS Landing Page',
    description: 'A beautiful, responsive landing page template perfect for SaaS products with dark mode support and smooth animations.',
    price: 49,
    originalPrice: 79,
    category: 'Landing Page',
    tags: ['SaaS', 'Modern', 'Responsive', 'Dark Mode'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    previewImages: [
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    demoUrl: 'https://example.com/demo',
    rating: 4.8,
    reviewCount: 124,
    downloadCount: 1250,
    author: {
      name: 'Alex Johnson',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    createdAt: '2024-01-15',
    isFeatured: true,
    isPremium: true
  },
  {
    id: '2',
    title: 'E-commerce Dashboard',
    description: 'Complete admin dashboard template for e-commerce platforms with analytics, inventory management, and order tracking.',
    price: 89,
    originalPrice: 129,
    category: 'Dashboard',
    tags: ['E-commerce', 'Admin', 'Analytics', 'Charts'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
    thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
    previewImages: [
      'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    rating: 4.9,
    reviewCount: 89,
    downloadCount: 892,
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    createdAt: '2024-01-20',
    isFeatured: true,
    isPremium: true
  },
  {
    id: '3',
    title: 'Portfolio Website',
    description: 'Stunning portfolio template for creatives and developers with smooth scrolling and interactive elements.',
    price: 35,
    category: 'Portfolio',
    tags: ['Creative', 'Portfolio', 'Smooth Scroll', 'Interactive'],
    techStack: ['React', 'CSS3', 'GSAP'],
    thumbnail: 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=800',
    previewImages: [
      'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    rating: 4.7,
    reviewCount: 156,
    downloadCount: 2100,
    author: {
      name: 'Mike Rodriguez',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    createdAt: '2024-01-10',
    isFeatured: false,
    isPremium: false
  },
  {
    id: '4',
    title: 'Corporate Website',
    description: 'Professional corporate website template with team sections, services, and contact forms.',
    price: 59,
    category: 'Corporate',
    tags: ['Corporate', 'Professional', 'Business', 'Clean'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    previewImages: [
      'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    rating: 4.6,
    reviewCount: 73,
    downloadCount: 650,
    author: {
      name: 'Emma Wilson',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    createdAt: '2024-01-25',
    isFeatured: false,
    isPremium: false
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Doe',
    userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    templateId: '1',
    rating: 5,
    comment: 'Absolutely amazing template! Clean code and beautiful design. Highly recommended!',
    createdAt: '2024-01-20'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Jane Smith',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    templateId: '1',
    rating: 4,
    comment: 'Great template with excellent documentation. Easy to customize and implement.',
    createdAt: '2024-01-18'
  }
];

export const categories = [
  'All Templates',
  'Landing Page',
  'Dashboard',
  'Portfolio',
  'Corporate',
  'E-commerce',
  'Blog',
  'Agency'
];

export const techStacks = [
  'React',
  'Vue',
  'Angular',
  'Next.js',
  'Nuxt.js',
  'TypeScript',
  'Tailwind CSS',
  'Bootstrap',
  'Framer Motion',
  'GSAP'
];