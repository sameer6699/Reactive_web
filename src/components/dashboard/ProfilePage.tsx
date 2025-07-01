import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { Camera, Mail, User, Building, MapPin, Globe, Clock, Trash2, Link as LinkIcon, PlugZap } from 'lucide-react';

// Let's assume you have an icon library like Heroicons
import { CameraIcon } from '@heroicons/react/24/solid';

// Add at the top:
// import the images
import fbLogo from '../img/logo/fb-logo.png';
import googleLogo from '../img/logo/google-logo.png';
import slackLogo from '../img/logo/slack-logo.png';
import githubLogo from '../img/logo/github-logo.png';
import mailchimpLogo from '../img/logo/mailchimp-logo.png';
import instaLogo from '../img/logo/insta-logo.png';
import twitterLogo from '../img/logo/twitter-logo.png';
import dribbleLogo from '../img/logo/dribble-logo.png';
import behanceLogo from '../img/logo/behance-logo.png';
import './ProfilePage.css'; // For animation styles

// Add this type above the component
type NotificationSettings = {
  newForYou: { email: boolean; browser: boolean; app: boolean };
  accountActivity: { email: boolean; browser: boolean; app: boolean };
  newBrowser: { email: boolean; browser: boolean; app: boolean };
  newDevice: { email: boolean; browser: boolean; app: boolean };
};

// Define the type for permission keys
type NotificationPermissionKey = 'templateReleases' | 'supportActivity' | 'promotions' | 'location' | 'push' | 'reviewReplies';

const ProfilePage: React.FC = () => {
  const { user, updateUserSocialLinks } = useStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'connections'>('profile');
  const [notificationStatus, setNotificationStatus] = useState<NotificationPermission | null>(null);

  // Toggle state for Connected Accounts
  const [connectedAccounts, setConnectedAccounts] = useState({
    Google: true,
    Slack: false,
    Github: true,
    Mailchimp: true,
    Asana: false,
  });

  // Track disconnected state for each social
  const [disconnected, setDisconnected] = useState<{ [key: string]: boolean }>({});

  // Move the connectedAccountsData array definition inside the ProfilePage component, after useState and before return.
  const connectedAccountsData = [
    {
      name: 'Google',
      desc: 'Calendar and contacts',
      icon: (
        <img src={googleLogo} alt="Google" className="h-8 w-8 object-contain rounded-full bg-white p-1 mr-3" />
      ),
    },
    {
      name: 'Slack',
      desc: 'Communication',
      icon: (
        <img src={slackLogo} alt="Slack" className="h-8 w-8 object-contain rounded-full bg-white p-1 mr-3" />
      ),
    },
    {
      name: 'Github',
      desc: 'Manage your Git repositories',
      icon: (
        <img src={githubLogo} alt="Github" className="h-8 w-8 object-contain rounded-full bg-white p-1 mr-3" />
      ),
    },
    {
      name: 'Mailchimp',
      desc: 'Email marketing service',
      icon: (
        <img src={mailchimpLogo} alt="Mailchimp" className="h-8 w-8 object-contain rounded-full bg-white p-1 mr-3" />
      ),
    },
    {
      name: 'Asana',
      desc: 'Communication',
      icon: (
        <img src="https://cdn.worldvectorlogo.com/logos/asana-1.svg" alt="Asana" className="h-8 w-8 object-contain rounded-full bg-white p-1 mr-3" />
      ),
    },
  ];

  const [showSocialModal, setShowSocialModal] = useState(false);
  const [currentSocial, setCurrentSocial] = useState<string | null>(null);
  const [socialLink, setSocialLink] = useState('');

  // State for delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  // Add these state and handler functions at the top of the component:
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Notification settings state and handlers
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    newForYou: { email: true, browser: true, app: true },
    accountActivity: { email: true, browser: true, app: true },
    newBrowser: { email: true, browser: true, app: false },
    newDevice: { email: true, browser: false, app: false },
  });
  const [notificationFrequency, setNotificationFrequency] = useState("Only when I'm online");
  const handleNotificationChange = (rowKey: keyof NotificationSettings, channel: 'email' | 'browser' | 'app') => {
    setNotificationSettings(prev => ({
      ...prev,
      [rowKey]: { ...prev[rowKey], [channel]: !prev[rowKey][channel] }
    }));
  };
  const handleSaveNotifications = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Save logic here
  };
  const handleResetNotifications = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setNotificationSettings({
      newForYou: { email: true, browser: true, app: true },
      accountActivity: { email: true, browser: true, app: true },
      newBrowser: { email: true, browser: true, app: false },
      newDevice: { email: true, browser: false, app: false },
    });
    setNotificationFrequency("Only when I'm online");
  };

  // Add this state and handler at the top of the component:
  const [notificationPermissions, setNotificationPermissions] = useState<Record<NotificationPermissionKey, boolean>>({
    templateReleases: true,
    supportActivity: true,
    promotions: false,
    location: false,
    push: false,
    reviewReplies: true,
  });
  const handlePermissionToggle = (key: NotificationPermissionKey) => {
    setNotificationPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    if (activeTab === 'notifications' && 'Notification' in window) {
      setNotificationStatus(Notification.permission);
    }
  }, [activeTab]);

  const handleRequestPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        setNotificationStatus(permission);
      });
    }
  };

  // Helper to extract username from social link
  const extractUsername = (platform: string, url: string) => {
    if (!url) return '';
    try {
      const u = new URL(url.startsWith('http') ? url : 'https://' + url.replace(/^\//, ''));
      const path = u.pathname.replace(/^\//, '').replace(/\/$/, '');
      if (!path) return '';
      // For most platforms, username is the first path segment
      let username = path.split('/')[0];
      // For Twitter, Instagram, Dribbble, Behance, Facebook, this is usually correct
      // For Facebook, sometimes the username is in a query param (not handled here)
      return '@' + username;
    } catch {
      // fallback: try to extract after last /
      const parts = url.split('/');
      let username = parts[parts.length - 1] || parts[parts.length - 2];
      if (username) return '@' + username;
      return '';
    }
  };

  return (
    <div className="p-10 sm:p-16 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Cover Image Section */}
        <div className="relative w-full h-56 sm:h-72 bg-gray-200 dark:bg-gray-700 rounded-t-lg overflow-hidden mb-16">
          <img
            src={coverImage || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'}
            alt="Cover"
            className="object-cover w-full h-full"
          />
          <label htmlFor="cover-upload" className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 px-3 py-1 rounded shadow cursor-pointer text-sm font-medium hover:bg-opacity-100 transition">
            Change Cover
            <input id="cover-upload" name="cover-upload" type="file" className="sr-only" onChange={handleCoverChange} />
          </label>
        </div>
        {/* Profile Image Overlapping Cover */}
        <div className="relative flex items-center -mt-20 mb-8 pl-8">
          <div className="relative z-10">
            <img
              className="h-32 w-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
              src={profileImage || 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80'}
              alt="Profile"
            />
            <label
              htmlFor="photo-upload"
              className="absolute bottom-2 right-2 flex items-center justify-center h-8 w-8 bg-indigo-600 rounded-full text-white cursor-pointer hover:bg-indigo-700 shadow"
            >
              <Camera className="h-5 w-5" />
              <input id="photo-upload" name="photo-upload" type="file" className="sr-only" onChange={handleProfileChange} />
            </label>
          </div>
          {/* User Info (optional, can be expanded) */}
          <div className="ml-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.firstName} {user?.lastName}</h2>
            <div className="flex items-center space-x-4 mt-2 text-gray-500 dark:text-gray-400">
              <span className="flex items-center"><User className="h-4 w-4 mr-1" /> UX Designer</span>
              <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" /> Vatican City</span>
              <span className="flex items-center"><Clock className="h-4 w-4 mr-1" /> April 2021</span>
            </div>
          </div>
        </div>
        {/* Main Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="px-6">
              <nav className="-mb-px flex space-x-6">
                <button
                  type="button"
                  onClick={() => setActiveTab('profile')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-semibold focus:outline-none ${activeTab === 'profile' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 font-medium'}`}
                >
                  Profile
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('notifications')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 focus:outline-none ${activeTab === 'notifications' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 font-semibold' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 font-medium'}`}
                >
                  Notifications
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('connections')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 focus:outline-none ${activeTab === 'connections' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 font-semibold' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 font-medium'}`}
                >
                  Connections
                </button>
              </nav>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'profile' && (
              <>
                {/* Form */}
                <form className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                  {/* First Name */}
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      First Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        defaultValue={user?.firstName || ''}
                        readOnly
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        placeholder="Your first name"
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Last Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        defaultValue={user?.lastName || ''}
                        readOnly
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        defaultValue={user?.email || ''}
                        readOnly
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        placeholder="Your email address"
                      />
                    </div>
                  </div>
                  
                  {/* Organization */}
                  <div className="sm:col-span-2">
                    <label htmlFor="organization" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Organization
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="organization"
                        id="organization"
                        defaultValue="ThemeSelection"
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        placeholder="Your organization"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        autoComplete="street-address"
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        placeholder="Your address"
                      />
                    </div>
                  </div>

                  {/* State */}
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      State
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="state"
                        id="state"
                        autoComplete="address-level1"
                        className="block w-full pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        placeholder="Your state"
                      />
                    </div>
                  </div>

                  {/* Zip Code */}
                  <div>
                    <label htmlFor="zip-code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Zip / Postal code
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="zip-code"
                        id="zip-code"
                        autoComplete="postal-code"
                        className="block w-full pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        placeholder="Your zip code"
                      />
                    </div>
                  </div>

                  {/* Country */}
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Country
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 appearance-none"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>
                  </div>

                  {/* Language */}
                  <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Language
                    </label>
                     <div className="relative">
                      <select
                        id="language"
                        name="language"
                        className="block w-full pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 appearance-none"
                      >
                        <option>English</option>
                        <option>Spanish</option>
                      </select>
                    </div>
                  </div>

                  {/* Timezone */}
                  <div className="sm:col-span-2">
                    <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Timezone
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        id="timezone"
                        name="timezone"
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 appearance-none"
                      >
                        <option>Pacific Standard Time</option>
                        <option>Eastern Standard Time</option>
                        <option>Greenwich Mean Time</option>
                      </select>
                    </div>
                  </div>
                </form>

                <div className="pt-8 flex justify-end">
                  <button
                    type="button"
                    className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save changes
                  </button>
                </div>
              </>
            )}
            {activeTab === 'notifications' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
                <p className="text-gray-500 text-sm mb-6">We need permission from your browser to show notifications. <button className="text-indigo-600 hover:underline" onClick={handleRequestPermission}>Request Permission</button></p>
                <div className="space-y-6">
                  {([
                    { label: 'New Template Releases', key: 'templateReleases' },
                    { label: 'Support & Activity Notifications', key: 'supportActivity' },
                    { label: 'Promotions & Discount Alerts', key: 'promotions' },
                    { label: 'Location Access Permission', key: 'location' },
                    { label: 'Push Notifications Permission', key: 'push' },
                    { label: 'Support & Review Replies', key: 'reviewReplies' },
                  ] as { label: string; key: NotificationPermissionKey }[]).map((perm) => (
                    <div key={perm.key} className="flex items-center justify-between py-2 px-2 rounded-lg bg-gray-50 dark:bg-gray-900">
                      <span className="text-gray-800 dark:text-gray-200 font-medium">{perm.label}</span>
                      <button
                        type="button"
                        onClick={() => handlePermissionToggle(perm.key)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${notificationPermissions[perm.key] ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}
                        aria-pressed={notificationPermissions[perm.key]}
                      >
                        <span className="sr-only">Toggle {perm.label}</span>
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ring-0 ${notificationPermissions[perm.key] ? 'translate-x-5' : 'translate-x-1'}`}
                        ></span>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex items-center mt-8">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition-colors duration-200" onClick={handleSaveNotifications}>Save Changes</button>
                </div>
              </div>
            )}
            {activeTab === 'connections' && (
              <div className="w-full">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Connected Accounts */}
                    <div>
                      <h2 className="text-xl font-semibold mb-1">Connected Accounts</h2>
                      <p className="text-gray-500 text-sm mb-4">
                        Display content from your connected accounts on your site
                      </p>
                      <div className="space-y-4">
                        {connectedAccountsData.map((acc, idx) => (
                          <div key={acc.name} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                            <div className="flex items-center">
                              {acc.icon}
                              <div>
                                <div className="font-medium text-gray-900 dark:text-gray-100">{acc.name}</div>
                                <div className="text-xs text-gray-500">{acc.desc}</div>
                              </div>
                            </div>
                            {/* Toggle Switch */}
                            <button
                              type="button"
                              onClick={() => setConnectedAccounts((prev) => ({ ...prev, [acc.name]: !prev[acc.name as keyof typeof prev] }))}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${connectedAccounts[acc.name as keyof typeof connectedAccounts] ? 'bg-indigo-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                              aria-pressed={connectedAccounts[acc.name as keyof typeof connectedAccounts]}
                            >
                              <span className="sr-only">Toggle {acc.name} connection</span>
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ring-0 ${connectedAccounts[acc.name as keyof typeof connectedAccounts] ? 'translate-x-5' : 'translate-x-1'}`}
                                style={{
                                  boxShadow: connectedAccounts[acc.name as keyof typeof connectedAccounts]
                                    ? '0 2px 8px 0 rgba(99,102,241,0.4)'
                                    : '0 1px 2px 0 rgba(0,0,0,0.05)',
                                }}
                              ></span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Social Accounts */}
                    <div>
                      <h2 className="text-xl font-semibold mb-1">Social Accounts</h2>
                      <p className="text-gray-500 text-sm mb-4">
                        Display content from social accounts on your site
                      </p>
                      <div className="space-y-4">
                        {[
                          {
                            name: 'Facebook',
                            key: 'facebook',
                            status: 'Not Connected',
                            icon: (
                              <img src={fbLogo} alt="Facebook" className="h-8 w-8 object-contain rounded-full bg-white p-1 mr-3" />
                            ),
                          },
                          {
                            name: 'Twitter',
                            key: 'twitter',
                            status: 'Not Connected',
                            icon: (
                              <img src={twitterLogo} alt="Twitter" className="h-8 w-8 object-contain rounded-full bg-white p-1 mr-3" />
                            ),
                          },
                          {
                            name: 'Instagram',
                            key: 'instagram',
                            status: 'Not Connected',
                            icon: (
                              <img src={instaLogo} alt="Instagram" className="h-8 w-8 object-contain rounded-full bg-white p-1 mr-3" />
                            ),
                          },
                          {
                            name: 'Dribbble',
                            key: 'dribbble',
                            status: 'Not Connected',
                            icon: (
                              <img src={dribbleLogo} alt="Dribbble" className="h-8 w-8 object-contain rounded-full bg-white p-1 mr-3" />
                            ),
                          },
                          {
                            name: 'Behance',
                            key: 'behance',
                            status: 'Not Connected',
                            icon: (
                              <img src={behanceLogo} alt="Behance" className="h-8 w-8 object-contain rounded-full bg-white p-1 mr-3" />
                            ),
                          },
                        ].map((acc, idx) => {
                          const link = user?.socialLinks?.[acc.key as keyof typeof user.socialLinks];
                          const username = link ? extractUsername(acc.key, link) : '';
                          const isDisconnected = !!disconnected[acc.key];
                          const CardContent = (
                            <div className="flex items-center">
                              {acc.icon}
                              <div>
                                <div className="font-medium text-gray-900 dark:text-gray-100">{acc.name}</div>
                                <div className={`text-xs ${isDisconnected ? 'text-yellow-600' : link ? 'text-indigo-600' : acc.status === 'Not Connected' ? 'text-red-600' : 'text-gray-500'}`}>
                                  {isDisconnected
                                    ? 'Disconnected'
                                    : link
                                      ? (username || link)
                                      : acc.status}
                                </div>
                              </div>
                            </div>
                          );
                          return (
                            link ? (
                              <div key={acc.name} className="flex items-center">
                                <div
                                  className={`flex-1 flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition ${!isDisconnected ? 'hover:bg-indigo-50 dark:hover:bg-indigo-900 cursor-pointer' : 'opacity-80'}`}
                                  onClick={!isDisconnected ? () => window.open(link, '_blank', 'noopener,noreferrer') : undefined}
                                  style={{ textAlign: 'left' }}
                                >
                                  {CardContent}
                                  <button
                                    className="p-2 rounded border border-yellow-200 hover:bg-yellow-50 ml-3"
                                    title={isDisconnected ? "Reconnect" : "Disconnect"}
                                    onClick={e => {
                                      e.stopPropagation();
                                      setDisconnected(prev => ({ ...prev, [acc.key]: !prev[acc.key] }));
                                    }}
                                  >
                                    <img
                                      src={isDisconnected ? "https://img.icons8.com/ios/50/disconnected.png" : "https://img.icons8.com/ios/50/connected.png"}
                                      alt={isDisconnected ? "disconnected" : "connected"}
                                      className={`h-5 w-5 transition-transform duration-300 ${isDisconnected ? 'animate-disconnect' : 'animate-connect'}`}
                                    />
                                  </button>
                                </div>
                                <button
                                  className="p-2 rounded border border-red-200 hover:bg-red-50 ml-4"
                                  style={{ marginLeft: '12px' }}
                                  onClick={e => {
                                    e.stopPropagation();
                                    setPendingDelete(acc.key);
                                    setShowDeleteModal(true);
                                  }}
                                >
                                  <Trash2 className="h-5 w-5 text-red-500" />
                                </button>
                              </div>
                            ) : (
                              <div key={acc.name} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                {CardContent}
                                <button
                                  className="p-2 rounded border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                  onClick={() => {
                                    setCurrentSocial(acc.name);
                                    setShowSocialModal(true);
                                  }}
                                >
                                  <LinkIcon className="h-5 w-5 text-gray-500" />
                              </button>
                          </div>
                            )
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Social Link Modal */}
                {showSocialModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
                      <h2 className="text-lg font-semibold mb-4">
                        Enter your {currentSocial} link
                      </h2>
                      <input
                        type="text"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 mb-4"
                        placeholder={`Paste your ${currentSocial} profile link here`}
                        value={socialLink}
                        onChange={e => setSocialLink(e.target.value)}
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                          onClick={() => {
                            setShowSocialModal(false);
                            setCurrentSocial(null);
                            setSocialLink('');
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-4 py-2 rounded bg-indigo-600 text-white"
                          onClick={async () => {
                            if (user && currentSocial) {
                              const socialKey = currentSocial.toLowerCase();
                              const updatedLinks = {
                                ...(user.socialLinks || {}),
                                [socialKey]: socialLink
                              };
                              await updateUserSocialLinks(user.id, updatedLinks);
                            }
                            setShowSocialModal(false);
                            setCurrentSocial(null);
                            setSocialLink('');
                          }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
                      <h2 className="text-lg font-semibold mb-4">
                        Are you really want to delete the {pendingDelete && ([
                          { key: 'facebook', name: 'Facebook' },
                          { key: 'twitter', name: 'Twitter' },
                          { key: 'instagram', name: 'Instagram' },
                          { key: 'dribbble', name: 'Dribbble' },
                          { key: 'behance', name: 'Behance' },
                        ].find(s => s.key === pendingDelete)?.name)} social connection?
                      </h2>
                      <div className="flex justify-end space-x-2">
                        <button
                          className="px-4 py-2 rounded bg-green-500 text-white font-semibold hover:bg-green-600"
                          onClick={() => {
                            setShowDeleteModal(false);
                            setPendingDelete(null);
                          }}
                        >
                          No
                        </button>
                        <button
                          className="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700"
                          onClick={async () => {
                            if (user && pendingDelete) {
                              const updatedLinks = { ...(user.socialLinks || {}), [pendingDelete]: '' };
                              await updateUserSocialLinks(user.id, updatedLinks);
                              setDisconnected(prev => ({ ...prev, [pendingDelete]: false }));
                            }
                            setShowDeleteModal(false);
                            setPendingDelete(null);
                          }}
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 