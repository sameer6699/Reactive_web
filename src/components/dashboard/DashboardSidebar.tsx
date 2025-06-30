import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../img/typo-logo.png';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  User, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  ShoppingCart,
  BarChart3,
  Bell,
  Grid,
  Layers
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isCollapsed, onToggle }) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: '/dashboard'
    },
    {
      id: 'templates',
      label: 'My Templates',
      icon: <FileText className="w-5 h-5" />,
      path: '/dashboard/templates'
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: <ShoppingCart className="w-5 h-5" />,
      path: '/dashboard/orders'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      path: '/dashboard/analytics'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Bell className="w-5 h-5" />,
      path: '/dashboard/notifications'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <User className="w-5 h-5" />,
      path: '/dashboard/profile'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      path: '/dashboard/settings'
    }
  ];

  // Marketplace section items
  const marketplaceItems = [
    {
      id: 'marketplace-templates',
      label: 'New Templates',
      icon: <Grid className="w-5 h-5" />,
      path: '/dashboard/marketplace/templates'
    },
    {
      id: 'marketplace-themes',
      label: 'Themes',
      icon: <Layers className="w-5 h-5" />,
      path: '/dashboard/marketplace/themes'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleItemClick = (itemId: string, path: string) => {
    setActiveItem(itemId);
    navigate(path);
  };

  return (
    <motion.div
      initial={{ width: isCollapsed ? 80 : 280 }}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-lg relative"
    >
      {/* Header */}
      <div className={`p-4 border-b border-gray-200 dark:border-gray-700 relative ${isCollapsed ? 'flex flex-col items-center gap-2' : 'flex items-center justify-between'}`}>
        <AnimatePresence mode="wait">
          {!isCollapsed ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center p-1">
                <img src={logo} alt="Logo" className="h-full w-full object-contain" />
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">PixelForge</span>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center absolute -left-3 top-4 p-1"
            >
              <img src={logo} alt="Logo" className="h-full w-full object-contain" />
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={onToggle}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 shadow-md hover:from-secondary-500 hover:to-primary-500 transition-all duration-200"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-white" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-white" />
          )}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2">
        {/* Dashboard item first */}
        {menuItems.slice(0, 1).map((item) => (
          <motion.button
            key={item.id}
            onClick={() => handleItemClick(item.id, item.path)}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
              activeItem === item.id
                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`flex-shrink-0 ${activeItem === item.id ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'}`}>
              {item.icon}
            </div>
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="font-medium text-sm"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
        {/* Marketplace Section next */}
        <div className="pt-4">
          {!isCollapsed && (
            <div className="px-3 pb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Marketplace</div>
          )}
          {marketplaceItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => handleItemClick(item.id, item.path)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                activeItem === item.id
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`flex-shrink-0 ${activeItem === item.id ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'}`}>
                {item.icon}
              </div>
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="font-medium text-sm"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
        {/* The rest of the menu items */}
        {menuItems.slice(1).map((item) => (
          <motion.button
            key={item.id}
            onClick={() => handleItemClick(item.id, item.path)}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
              activeItem === item.id
                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`flex-shrink-0 ${activeItem === item.id ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'}`}>
              {item.icon}
            </div>
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="font-medium text-sm"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
        <motion.button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut className="w-5 h-5" />
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="font-medium text-sm"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default DashboardSidebar; 