import React, { useState, Dispatch, SetStateAction } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

// Define types for form data
interface OnboardingFormData {
  userType: 'developer' | 'designer' | 'startup-founder' | 'business-owner' | 'freelancer' | 'agency' | 'other' | '';
  userTypeOther: string;
  primaryGoal: 'buy' | 'sell' | 'both' | 'exploring' | '';
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert' | '';
  targetPlatforms: string[];
  templateInterests: string[];
  preferredTheme: 'light' | 'dark' | 'both' | 'no-preference' | '';
  designStyle: 'minimalist' | 'creative' | 'corporate' | 'modern' | '';
}

interface OnboardingModalProps {
  isOpen: boolean;
  onSubmit: (data: OnboardingFormData) => void;
  username: string;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onSubmit, username }) => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<OnboardingFormData>({
    userType: '',
    userTypeOther: '',
    primaryGoal: '',
    skillLevel: '',
    targetPlatforms: [],
    templateInterests: [],
    preferredTheme: '',
    designStyle: '',
  });

  const handleNext = () => {
    setDirection(1);
    setStep(prev => prev + 1);
  };
  const handleBack = () => {
    setDirection(-1);
    setStep(prev => prev - 1);
  };
  const handleSubmit = () => onSubmit(formData);

  const stepVariants = {
    hidden: (direction: number) => ({ opacity: 0, x: direction > 0 ? '50%' : '-50%' }),
    visible: { opacity: 1, x: 0 },
    exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? '-50%' : '50%' }),
  };

  const steps = [
    <Step1 data={formData} setData={setFormData} />,
    <Step2 data={formData} setData={setFormData} />,
    <Step3 data={formData} setData={setFormData} />,
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl relative overflow-hidden"
          >
            <div className="p-6 sm:p-8">
              <div className="text-center mb-6">
                 <motion.h2 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl font-bold text-gray-900 dark:text-white"
                 >
                    Welcome, {username}!
                 </motion.h2>
                <motion.p 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-600 dark:text-gray-300 text-sm"
                >
                    Help us personalize your experience.
                </motion.p>
              </div>

              <div className="w-full flex justify-center mb-8">
                <div className="w-1/2 flex items-center">
                  {[1, 2, 3].map((s, i) => (
                    <React.Fragment key={s}>
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                            step >= s ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          {step > s ? <Check size={16} /> : s}
                        </div>
                      </div>
                      {i < 2 && <div className={`flex-1 h-1 transition-all duration-300 ${step > s ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700'}`} />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              
              <div className="overflow-y-auto relative h-80 pr-2 scrollbar-hide">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{
                      x: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    className="absolute w-full"
                  >
                    {steps[step - 1]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800/50 px-6 sm:px-8 py-4 flex justify-between items-center border-t border-gray-200 dark:border-gray-700">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={handleBack}
                    disabled={step === 1}
                    className="py-1.5 px-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
                >
                    Back
                </motion.button>
                {step < 3 ? (
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleNext} className="bg-primary-600 text-white font-bold py-1.5 px-5 rounded-lg hover:bg-primary-700 transition-all shadow-md text-sm">
                        Next
                    </motion.button>
                ) : (
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSubmit} className="bg-green-600 text-white font-bold py-1.5 px-5 rounded-lg hover:bg-green-700 transition-all shadow-md text-sm">
                        Finish
                    </motion.button>
                )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Animation variants for staggered items
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

// Sub-components for each step
interface StepProps {
    data: OnboardingFormData;
    setData: Dispatch<SetStateAction<OnboardingFormData>>;
}

const Step1: React.FC<StepProps> = ({ data, setData }) => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="hidden">
        <h3 className="text-base font-semibold text-center mb-6 dark:text-white">User Profile & Role</h3>
        <Question label="What best describes you?">
            <RadioGroup
                options={[
                    { value: 'developer', label: 'Developer' },
                    { value: 'designer', label: 'Designer' },
                    { value: 'startup-founder', label: 'Startup Founder' },
                    { value: 'business-owner', label: 'Business Owner' },
                    { value: 'freelancer', label: 'Freelancer' },
                    { value: 'agency', label: 'Agency' },
                    { value: 'other', label: 'Other' },
                ]}
                name="userType"
                selectedValue={data.userType}
                onChange={(value) => setData(prev => ({ ...prev, userType: value as any }))}
            />
            <AnimatePresence>
                {data.userType === 'other' && (
                    <motion.input
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        type="text"
                        placeholder="Please specify"
                        className="w-full mt-2 p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                        value={data.userTypeOther}
                        onChange={(e) => setData(prev => ({ ...prev, userTypeOther: e.target.value }))}
                    />
                )}
            </AnimatePresence>
        </Question>
        <Question label="What is your primary goal with PixelForge?">
            <RadioGroup
                options={[
                    { value: 'buy', label: 'Buy templates' },
                    { value: 'sell', label: 'Sell templates' },
                    { value: 'both', label: 'Both' },
                    { value: 'exploring', label: 'Just exploring' },
                ]}
                name="primaryGoal"
                selectedValue={data.primaryGoal}
                onChange={(value) => setData(prev => ({ ...prev, primaryGoal: value as any }))}
            />
        </Question>
    </motion.div>
);

const Step2: React.FC<StepProps> = ({ data, setData }) => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="hidden">
        <h3 className="text-base font-semibold text-center mb-6 dark:text-white">Usage & Skill Level</h3>
        <Question label="What's your web development/design skill level?">
            <RadioGroup
                options={[
                    { value: 'beginner', label: 'Beginner' },
                    { value: 'intermediate', label: 'Intermediate' },
                    { value: 'advanced', label: 'Advanced' },
                    { value: 'expert', label: 'Expert' },
                ]}
                name="skillLevel"
                selectedValue={data.skillLevel}
                onChange={(value) => setData(prev => ({ ...prev, skillLevel: value as any }))}
            />
        </Question>
        <Question label="Which platforms do you use or target most? (multi-select)">
            <CheckboxGroup
                options={['React', 'Vue', 'Angular', 'WordPress', 'Webflow', 'Other']}
                selectedValues={data.targetPlatforms}
                onChange={(values) => setData(prev => ({ ...prev, targetPlatforms: values }))}
            />
        </Question>
    </motion.div>
);

const Step3: React.FC<StepProps> = ({ data, setData }) => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="hidden">
        <h3 className="text-base font-semibold text-center mb-6 dark:text-white">Personalization & Needs</h3>
        <Question label="What type of templates are you looking for? (multi-select)">
            <CheckboxGroup
                options={['Landing Pages', 'Portfolios', 'SaaS', 'E-commerce', 'Blogs', 'Dashboards']}
                selectedValues={data.templateInterests}
                onChange={(values) => setData(prev => ({ ...prev, templateInterests: values }))}
            />
        </Question>
        <Question label="Do you prefer light mode or dark mode templates?">
             <RadioGroup
                options={[
                    { value: 'light', label: 'Light' },
                    { value: 'dark', label: 'Dark' },
                    { value: 'both', label: 'Both' },
                    { value: 'no-preference', label: 'No preference' },
                ]}
                name="preferredTheme"
                selectedValue={data.preferredTheme}
                onChange={(value) => setData(prev => ({ ...prev, preferredTheme: value as any }))}
            />
        </Question>
        <Question label="What is your preferred design style?">
             <RadioGroup
                options={[
                    { value: 'minimalist', label: 'Minimalist' },
                    { value: 'creative', label: 'Creative' },
                    { value: 'corporate', label: 'Corporate' },
                    { value: 'modern', label: 'Modern' },
                ]}
                name="designStyle"
                selectedValue={data.designStyle}
                onChange={(value) => setData(prev => ({ ...prev, designStyle: value as any }))}
            />
        </Question>
    </motion.div>
);

// Reusable form components
const Question: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <motion.div variants={itemVariants} className="mb-4">
        <p className="font-semibold mb-3 dark:text-gray-200 text-sm">{label}</p>
        {children}
    </motion.div>
);

const RadioGroup: React.FC<{
    options: { value: string; label: string }[];
    name: string;
    selectedValue: string;
    onChange: (value: string) => void;
}> = ({ options, name, selectedValue, onChange }) => (
    <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {options.map(({ value, label }) => (
            <motion.label
                key={value}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    selectedValue === value
                        ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-500 shadow-md'
                        : 'bg-white dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 hover:border-primary-400'
                }`}
            >
                <input
                    type="radio"
                    name={name}
                    value={value}
                    checked={selectedValue === value}
                    onChange={(e) => onChange(e.target.value)}
                    className="sr-only"
                />
                <span className="font-semibold dark:text-gray-100 text-sm">{label}</span>
            </motion.label>
        ))}
    </div>
);

const CheckboxGroup: React.FC<{
    options: string[];
    selectedValues: string[];
    onChange: (values: string[]) => void;
}> = ({ options, selectedValues, onChange }) => {
    const handleSelect = (value: string) => {
        const newSelection = selectedValues.includes(value)
            ? selectedValues.filter(v => v !== value)
            : [...selectedValues, value];
        onChange(newSelection);
    };

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {options.map((option) => (
                <motion.button
                    key={option}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`p-3 rounded-lg border-2 font-semibold text-xs transition-all duration-200 text-center ${
                        selectedValues.includes(option)
                            ? 'bg-primary-500 border-primary-500 text-white shadow-md'
                            : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500 text-gray-800 dark:text-gray-200'
                    }`}
                >
                    {option}
                </motion.button>
            ))}
        </div>
    );
};

export default OnboardingModal; 