import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  FileText, 
  ShoppingCart, 
  DollarSign,
  Eye,
  Download
} from 'lucide-react';
import { useStore } from '../../store/useStore';

const DashboardContent: React.FC = () => {
  const { user } = useStore();
  const stats = [
    {
      title: 'Total Revenue',
      value: '$12,345',
      change: '+12.5%',
      changeType: 'positive',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+8.2%',
      changeType: 'positive',
      icon: <ShoppingCart className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Users',
      value: '5,678',
      change: '+15.3%',
      changeType: 'positive',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-purple-500'
    },
    {
      title: 'Templates',
      value: '89',
      change: '+3.1%',
      changeType: 'positive',
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-orange-500'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'order',
      message: 'New order #1234 received',
      time: '2 minutes ago',
      amount: '$299'
    },
    {
      id: 2,
      type: 'template',
      message: 'Template "Modern Portfolio" uploaded',
      time: '15 minutes ago',
      views: '1.2k'
    },
    {
      id: 3,
      type: 'user',
      message: 'New user registration',
      time: '1 hour ago',
      email: 'john@example.com'
    },
    {
      id: 4,
      type: 'download',
      message: 'Template downloaded 50 times',
      time: '2 hours ago',
      template: 'E-commerce Template'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {(user?.firstName && user?.lastName) ? `${user.firstName} ${user.lastName}` : (user?.name || 'User')}! 👋
        </h1>
        <p className="text-primary-100">Here's what's happening with your account today.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
                <div className="flex items-center mt-2">
                  {stat.changeType === 'positive' ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'order' ? 'bg-blue-100 dark:bg-blue-900/20' :
                  activity.type === 'template' ? 'bg-green-100 dark:bg-green-900/20' :
                  activity.type === 'user' ? 'bg-purple-100 dark:bg-purple-900/20' :
                  'bg-orange-100 dark:bg-orange-900/20'
                }`}>
                  {activity.type === 'order' && <ShoppingCart className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                  {activity.type === 'template' && <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />}
                  {activity.type === 'user' && <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
                  {activity.type === 'download' && <Download className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </p>
                </div>
                {activity.amount && (
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {activity.amount}
                  </span>
                )}
                {activity.views && (
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {activity.views}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardContent; 