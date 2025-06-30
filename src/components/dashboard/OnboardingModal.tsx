import React, { useState, Dispatch, SetStateAction, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, X } from 'lucide-react';

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

  const isStep1Valid =
    formData.userType !== '' &&
    (formData.userType !== 'other' || formData.userTypeOther.trim() !== '') &&
    formData.primaryGoal !== '';

  const isStep2Valid =
    formData.skillLevel !== '' && formData.targetPlatforms.length > 0;

  const isStep3Valid =
    formData.templateInterests.length > 0 &&
    formData.preferredTheme !== '' &&
    formData.designStyle !== '';

  const isNextDisabled = () => {
    if (step === 1) return !isStep1Valid;
    if (step === 2) return !isStep2Valid;
    return false;
  };

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
            <div className="p-4 sm:p-6">
              <div className="text-center mb-4">
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

              <div className="w-full flex justify-center mb-6">
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
              
              <div className="overflow-y-auto relative h-72 pr-2 scrollbar-hide">
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
            
            <div className="bg-gray-50 dark:bg-gray-800/50 px-4 sm:px-6 py-3 flex justify-between items-center border-t border-gray-200 dark:border-gray-700">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={handleBack}
                    disabled={step === 1}
                    className="py-1.5 px-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
                >
                    Back
                </motion.button>
                {step < 3 ? (
                    <motion.button 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }} 
                        onClick={handleNext} 
                        disabled={isNextDisabled()}
                        className="bg-primary-600 text-white font-bold py-1.5 px-5 rounded-lg hover:bg-primary-700 transition-all shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </motion.button>
                ) : (
                    <motion.button 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }} 
                        onClick={handleSubmit} 
                        disabled={!isStep3Valid}
                        className="bg-green-600 text-white font-bold py-1.5 px-5 rounded-lg hover:bg-green-700 transition-all shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
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
        <h3 className="text-base font-semibold text-center mb-4 dark:text-white">User Profile & Role</h3>
        <Question label="What best describes you?">
            <select
                name="userType"
                value={data.userType}
                onChange={(e) => setData(prev => ({ ...prev, userType: e.target.value as any, userTypeOther: '' }))}
                className="w-full p-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700/50 dark:text-white hover:border-primary-400 focus:border-primary-500 focus:ring-primary-500"
            >
                <option value="" disabled>Select your role</option>
                {[
                    { value: 'developer', label: 'Developer' },
                    { value: 'designer', label: 'Designer' },
                    { value: 'startup-founder', label: 'Startup Founder' },
                    { value: 'business-owner', label: 'Business Owner' },
                    { value: 'freelancer', label: 'Freelancer' },
                    { value: 'agency', label: 'Agency' },
                    { value: 'other', label: 'Other' },
                ].map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
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
        <h3 className="text-base font-semibold text-center mb-4 dark:text-white">Usage & Skill Level</h3>
        <Question label="What's your web development/design skill level?">
            <select
                name="skillLevel"
                value={data.skillLevel}
                onChange={(e) => setData(prev => ({ ...prev, skillLevel: e.target.value as any }))}
                className="w-full p-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700/50 dark:text-white hover:border-primary-400 focus:border-primary-500 focus:ring-primary-500"
            >
                <option value="" disabled>Select your skill level</option>
                {[
                    { value: 'beginner', label: 'Beginner' },
                    { value: 'intermediate', label: 'Intermediate' },
                    { value: 'advanced', label: 'Advanced' },
                    { value: 'expert', label: 'Expert' },
                ].map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </Question>
        <Question label="Which platforms do you use or target most? (multi-select)">
            <MultiSelectDropdown
                options={['React', 'Vue', 'Angular', 'WordPress', 'Webflow', 'Other']}
                selectedValues={data.targetPlatforms}
                onChange={(values: string[]) => setData(prev => ({ ...prev, targetPlatforms: values }))}
                placeholder="Select platforms"
            />
        </Question>
    </motion.div>
);

const Step3: React.FC<StepProps> = ({ data, setData }) => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="hidden">
        <h3 className="text-base font-semibold text-center mb-4 dark:text-white">Personalization & Needs</h3>
        <Question label="What type of templates are you looking for? (multi-select)">
            <MultiSelectDropdown
                options={['Landing Pages', 'Portfolios', 'SaaS', 'E-commerce', 'Blogs', 'Dashboards']}
                selectedValues={data.templateInterests}
                onChange={(values) => setData(prev => ({ ...prev, templateInterests: values }))}
                placeholder="Select template types"
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
    <motion.div variants={itemVariants} className="mb-3">
        <p className="font-semibold mb-2 dark:text-gray-200 text-sm">{label}</p>
        {children}
    </motion.div>
);

const RadioGroup: React.FC<{
    options: { value: string; label: string }[];
    name: string;
    selectedValue: string;
    onChange: (value: string) => void;
}> = ({ options, name, selectedValue, onChange }) => (
    <div className="grid grid-cols-2 gap-2">
        {options.map(({ value, label }) => (
            <motion.label
                key={value}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
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

const MultiSelectDropdown: React.FC<{
    options: string[];
    selectedValues: string[];
    onChange: (values: string[]) => void;
    placeholder?: string;
}> = ({ options, selectedValues, onChange, placeholder = "Select options" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);
    
    const handleSelect = (value: string) => {
        const newSelection = selectedValues.includes(value)
            ? selectedValues.filter(v => v !== value)
            : [...selectedValues, value];
        onChange(newSelection);
    };

    const handleRemove = (e: React.MouseEvent, value: string) => {
        e.stopPropagation();
        handleSelect(value);
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700/50 dark:text-white hover:border-primary-400 focus:border-primary-500 focus:ring-primary-500 flex justify-between items-center text-left min-h-[46px]"
            >
                <div className="flex flex-wrap gap-1.5 items-center">
                    {selectedValues.length === 0 ? (
                        <span className="text-gray-500 dark:text-gray-400 ml-1">{placeholder}</span>
                    ) : (
                        selectedValues.map(value => (
                            <div key={value} className="bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-200 text-xs font-semibold px-2 py-1 rounded-full flex items-center">
                                <span>{value}</span>
                                <button
                                    type="button"
                                    onClick={(e) => handleRemove(e, value)}
                                    className="ml-1.5 text-primary-600 dark:text-primary-300 hover:text-primary-800 dark:hover:text-primary-100 focus:outline-none"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
                <ChevronDown size={20} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''} flex-shrink-0 ml-1`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-600"
                    >
                        <div className="p-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
                            {options.map(option => (
                                <label key={option} className="flex items-center w-full p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedValues.includes(option)}
                                        onChange={() => handleSelect(option)}
                                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                    />
                                    <span className="ml-3 text-sm text-gray-800 dark:text-gray-200">{option}</span>
                                </label>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
};

export default OnboardingModal; 