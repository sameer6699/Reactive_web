import React from 'react';
import { mockTemplates } from '../../data/mockData';

const MarketplaceTemplates: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">All Templates</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockTemplates.map(template => (
          <div
            key={template.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-200"
          >
            <img
              src={template.thumbnail}
              alt={template.title}
              className="w-full h-44 object-cover"
            />
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">{template.title}</h2>
                <span className="text-primary-600 dark:text-primary-400 font-bold text-base">${template.price}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">{template.description}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-0.5 rounded text-xs font-medium">{template.category}</span>
                {template.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 px-2 py-0.5 rounded text-xs font-medium">{tag}</span>
                ))}
                {template.tags.length > 2 && (
                  <span className="bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-300 px-2 py-0.5 rounded text-xs font-medium">+{template.tags.length - 2} more</span>
                )}
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                <span>Downloads: <b>{template.downloadCount}</b></span>
                <span className="flex items-center text-yellow-500 font-semibold">★ {template.rating} <span className="ml-1 text-gray-400 dark:text-gray-500">({template.reviewCount})</span></span>
              </div>
              <div className="flex items-center mt-auto pt-2">
                <img
                  src={template.author.avatar}
                  alt={template.author.name}
                  className="w-8 h-8 rounded-full mr-2 border border-gray-200 dark:border-gray-700"
                />
                <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">{template.author.name}</span>
                <button className="ml-auto px-4 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs rounded-lg font-semibold transition-colors duration-150 shadow-sm">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketplaceTemplates; 