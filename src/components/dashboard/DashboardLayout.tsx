import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import DashboardContent from './DashboardContent';
import { useHydrateUser } from '../../store/useStore';

const DashboardLayout: React.FC = () => {
  useHydrateUser();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900">
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
            <Route path="/profile" element={<div className="p-6"><h1 className="text-2xl font-bold">Profile</h1></div>} />
            <Route path="/settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings</h1></div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout; 