import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/global/Header';
import Footer from './components/global/Footer';
import HeroSection from './components/home/HeroSection';
import FeaturedTemplates from './components/home/FeaturedTemplates';
import BenefitsSection from './components/home/BenefitsSection';
import TestimonialsSection from './components/home/TestimonialsSection';
import HowItWorks from './components/home/HowItWorks';
import LoginPage from './components/auth/LoginPage';

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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={
            <>
              <Header />
              <main>
                <HomePage />
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;