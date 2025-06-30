import React from 'react';
import { Search, Download, Palette, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: Search,
      title: 'Browse & Search',
      description: 'Explore our curated collection of premium templates. Use filters to find exactly what you need.',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      step: '01'
    },
    {
      icon: Download,
      title: 'Purchase & Download',
      description: 'Buy your chosen template with secure payment. Get instant access to all files and assets.',
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      step: '02'
    },
    {
      icon: Palette,
      title: 'Customize',
      description: 'Personalize the template with your brand colors, content, and styling preferences.',
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      step: '03'
    },
    {
      icon: Rocket,
      title: 'Launch',
      description: 'Deploy your website to your preferred hosting platform and go live with confidence.',
      color: 'text-orange-500',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      step: '04'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get your website up and running in four simple steps. It's that easy!
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
        >
          {/* Connection Lines - Hidden on mobile */}
          <div className="hidden lg:block absolute top-20 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary-200 via-secondary-200 to-accent-200 dark:from-primary-800 dark:via-secondary-800 dark:to-accent-800"></div>

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              {/* Step Card */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 text-center relative overflow-hidden">
                {/* Step Number Background */}
                <div className="absolute top-4 right-4 text-6xl font-bold text-gray-100 dark:text-gray-700 opacity-50">
                  {step.step}
                </div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-20 h-20 ${step.bgColor} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                  <step.icon className={`w-10 h-10 ${step.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 relative z-10">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed relative z-10">
                  {step.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </div>

              {/* Step Connector - Mobile */}
              {index < steps.length - 1 && (
                <div className="lg:hidden flex justify-center my-6">
                  <div className="w-0.5 h-8 bg-gradient-to-b from-primary-300 to-secondary-300 dark:from-primary-700 dark:to-secondary-700"></div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 2.8-2.2 5-5 5s-5-2.2-5-5 2.2-5 5-5 5 2.2 5 5zm10 0c0 2.8-2.2 5-5 5s-5-2.2-5-5 2.2-5 5-5 5 2.2 5 5z'/%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Build Something Amazing?
              </h3>
              <p className="text-xl mb-6 opacity-90">
                Join thousands of developers who trust PixelForgefor their projects
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Building Now
                <Rocket className="ml-2 w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;