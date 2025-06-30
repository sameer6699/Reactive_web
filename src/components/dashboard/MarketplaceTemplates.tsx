import React from 'react';
import { mockTemplates } from '../../data/mockData';
import { Download, Eye, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';

const MarketplaceTemplates: React.FC = () => {
  const { addToCart } = useStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">All Templates</h1>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {mockTemplates.map((template) => (
          <motion.div
            key={template.id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            {/* Template Image */}
            <div className="relative overflow-hidden">
              <img
                src={template.thumbnail}
                alt={template.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              {/* Overlay Actions */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white/90 hover:bg-white rounded-full shadow-lg"
                  >
                    <Eye className="w-5 h-5 text-gray-700" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => addToCart(template)}
                    className="p-3 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg"
                  >
                    <Download className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
              {/* Premium Badge */}
              {template.isPremium && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
                  PREMIUM
                </div>
              )}
              {/* Price Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-lg font-bold text-gray-900">${template.price}</span>
                {template.originalPrice && (
                  <span className="text-sm text-gray-500 line-through ml-1">
                    ${template.originalPrice}
                  </span>
                )}
              </div>
            </div>
            {/* Template Info */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                  {template.category}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {template.rating}
                  </span>
                  <span className="text-sm text-gray-400">
                    ({template.reviewCount})
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                {template.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                {template.description}
              </p>
              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1 mb-4">
                {template.techStack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md"
                  >
                    {tech}
                  </span>
                ))}
                {template.techStack.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md">
                    +{template.techStack.length - 3}
                  </span>
                )}
              </div>
              {/* Author & Stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src={template.author.avatar}
                    alt={template.author.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {template.author.name}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                  <Download className="w-4 h-4" />
                  <span>{template.downloadCount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MarketplaceTemplates; 