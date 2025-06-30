import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import DashboardContent from './DashboardContent';
import { useHydrateUser } from '../../store/useStore';
import MarketplaceTemplates from './MarketplaceTemplates';
import { useHydrateUser, useStore } from '../../store/useStore';
import MarketplaceTemplates from './MarketplaceTemplates';
import OnboardingModal from './OnboardingModal';
import { useState, useEffect } from 'react';
import ProfilePage from './ProfilePage';

const DashboardLayout: React.FC = () => {
  useHydrateUser();
  const { user, updateUserOnboardingInfo } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user && !user.onboardingComplete) {
      setIsModalOpen(true);
    }
  }, [user]);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleOnboardingSubmit = async (data: object) => {
    if (user && user.id) {
      await updateUserOnboardingInfo(user.id, data);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900">
      <OnboardingModal
        isOpen={isModalOpen}
        onSubmit={handleOnboardingSubmit}
        username={user?.firstName || 'there'}
      />
      {/* Sidebar */}
      <DashboardSidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={toggleSidebar} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader />

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<DashboardContent />} />
            <Route path="/templates" element={<div className="p-6"><h1 className="text-2xl font-bold">My Templates</h1></div>} />
            <Route path="/orders" element={<div className="p-6"><h1 className="text-2xl font-bold">Orders</h1></div>} />
            <Route path="/analytics" element={<div className="p-6"><h1 className="text-2xl font-bold">Analytics</h1></div>} />
            <Route path="/notifications" element={<div className="p-6"><h1 className="text-2xl font-bold">Notifications</h1></div>} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings</h1></div>} />
            <Route path="/marketplace/templates" element={<MarketplaceTemplates />} />
            <Route path="/marketplace/templates" element={<MarketplaceTemplates />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout; 