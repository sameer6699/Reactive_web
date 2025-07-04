import React from 'react';
import { RouteObject } from 'react-router-dom';
import Header from './components/global/Header';
import Footer from './components/global/Footer';
import HeroSection from './components/home/HeroSection';
import FeaturedTemplates from './components/home/FeaturedTemplates';
import BenefitsSection from './components/home/BenefitsSection';
import TestimonialsSection from './components/home/TestimonialsSection';
import HowItWorks from './components/home/HowItWorks';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import Dashboard from './components/dashboard/Dashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Home page component
const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <FeaturedTemplates />
      <BenefitsSection />
      <TestimonialsSection />
      <HowItWorks />
    </>
  );
};

// Main layout component with header and footer
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
};

// Route definitions
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout><HomePage /></MainLayout>,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/dashboard/*',
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
  },
  // Add more routes here as needed
  // {
  //   path: '/profile',
  //   element: <MainLayout><Profile /></MainLayout>,
  // },
];

export default routes; 