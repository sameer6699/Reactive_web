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
import ReactFlagsSelect from 'react-flags-select';

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

  // Add this state for organization name
  const [organization, setOrganization] = useState(user?.organization || '');

  // Add to the component state:
  const [selectedCountry, setSelectedCountry] = React.useState('US');
  const [mobile, setMobile] = React.useState('');
  const countryCodes: { [key: string]: string } = {
    AF: '+93', AL: '+355', DZ: '+213', AS: '+1-684', AD: '+376', AO: '+244', AI: '+1-264', AQ: '+672', AG: '+1-268', AR: '+54', AM: '+374', AW: '+297', AU: '+61', AT: '+43', AZ: '+994', BS: '+1-242', BH: '+973', BD: '+880', BB: '+1-246', BY: '+375', BE: '+32', BZ: '+501', BJ: '+229', BM: '+1-441', BT: '+975', BO: '+591', BA: '+387', BW: '+267', BR: '+55', IO: '+246', VG: '+1-284', BN: '+673', BG: '+359', BF: '+226', BI: '+257', KH: '+855', CM: '+237', CA: '+1', CV: '+238', KY: '+1-345', CF: '+236', TD: '+235', CL: '+56', CN: '+86', CX: '+61', CC: '+61', CO: '+57', KM: '+269', CK: '+682', CR: '+506', HR: '+385', CU: '+53', CW: '+599', CY: '+357', CZ: '+420', CD: '+243', DK: '+45', DJ: '+253', DM: '+1-767', DO: '+1-809', EC: '+593', EG: '+20', SV: '+503', GQ: '+240', ER: '+291', EE: '+372', SZ: '+268', ET: '+251', FK: '+500', FO: '+298', FJ: '+679', FI: '+358', FR: '+33', GF: '+594', PF: '+689', GA: '+241', GM: '+220', GE: '+995', DE: '+49', GH: '+233', GI: '+350', GR: '+30', GL: '+299', GD: '+1-473', GP: '+590', GU: '+1-671', GT: '+502', GG: '+44', GN: '+224', GW: '+245', GY: '+592', HT: '+509', HN: '+504', HK: '+852', HU: '+36', IS: '+354', IN: '+91', ID: '+62', IR: '+98', IQ: '+964', IE: '+353', IM: '+44', IL: '+972', IT: '+39', CI: '+225', JM: '+1-876', JP: '+81', JE: '+44', JO: '+962', KZ: '+7', KE: '+254', KI: '+686', XK: '+383', KW: '+965', KG: '+996', LA: '+856', LV: '+371', LB: '+961', LS: '+266', LR: '+231', LY: '+218', LI: '+423', LT: '+370', LU: '+352', MO: '+853', MG: '+261', MW: '+265', MY: '+60', MV: '+960', ML: '+223', MT: '+356', MH: '+692', MQ: '+596', MR: '+222', MU: '+230', YT: '+262', MX: '+52', FM: '+691', MD: '+373', MC: '+377', MN: '+976', ME: '+382', MS: '+1-664', MA: '+212', MZ: '+258', MM: '+95', NA: '+264', NR: '+674', NP: '+977', NL: '+31', NC: '+687', NZ: '+64', NI: '+505', NE: '+227', NG: '+234', NU: '+683', NF: '+672', KP: '+850', MK: '+389', MP: '+1-670', NO: '+47', OM: '+968', PK: '+92', PW: '+680', PS: '+970', PA: '+507', PG: '+675', PY: '+595', PE: '+51', PH: '+63', PN: '+64', PL: '+48', PT: '+351', PR: '+1-787', QA: '+974', CG: '+242', RE: '+262', RO: '+40', RU: '+7', RW: '+250', BL: '+590', SH: '+290', KN: '+1-869', LC: '+1-758', MF: '+590', PM: '+508', VC: '+1-784', WS: '+685', SM: '+378', ST: '+239', SA: '+966', SN: '+221', RS: '+381', SC: '+248', SL: '+232', SG: '+65', SX: '+1-721', SK: '+421', SI: '+386', SB: '+677', SO: '+252', ZA: '+27', KR: '+82', SS: '+211', ES: '+34', LK: '+94', SD: '+249', SR: '+597', SJ: '+47', SE: '+46', CH: '+41', SY: '+963', TW: '+886', TJ: '+992', TZ: '+255', TH: '+66', TL: '+670', TG: '+228', TK: '+690', TO: '+676', TT: '+1-868', TN: '+216', TR: '+90', TM: '+993', TC: '+1-649', TV: '+688', VI: '+1-340', UG: '+256', UA: '+380', AE: '+971', GB: '+44', US: '+1', UY: '+598', UZ: '+998', VU: '+678', VA: '+39', VE: '+58', VN: '+84', WF: '+681', EH: '+212', YE: '+967', ZM: '+260', ZW: '+263'
  };
  const selectedCountryCode = countryCodes[selectedCountry] || '';

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
                    <div className="relative flex items-center">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="organization"
                        id="organization"
                        value={organization}
                        onChange={e => setOrganization(e.target.value)}
                        className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        placeholder="Your organization"
                      />
                      {organization && (
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 focus:outline-none"
                          onClick={() => setOrganization('')}
                          title="Remove organization"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      )}
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
                    <ReactFlagsSelect
                      selected={selectedCountry}
                      onSelect={code => setSelectedCountry(code)}
                      searchable
                      fullWidth
                      placeholder="Your country"
                      id="country"
                      className="w-full"
                      selectButtonClassName="block w-full pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 appearance-none"
                      optionsSize={16}
                      selectedSize={16}
                      showSelectedLabel
                      showOptionLabel
                      showSecondarySelectedLabel={false}
                      showSecondaryOptionLabel={false}
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Mobile Number
                    </label>
                    <div className="flex w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent transition-all duration-200 overflow-hidden">
                      <div className="flex items-center px-3 bg-white dark:bg-gray-800">
                        <span className="mr-2">
                          <img
                            src={`https://flagcdn.com/24x18/${selectedCountry.toLowerCase()}.png`}
                            alt={selectedCountry}
                            className="inline-block rounded-sm"
                            width={24}
                            height={18}
                          />
                        </span>
                        <span className="text-gray-700 dark:text-gray-200 font-medium whitespace-nowrap">{selectedCountryCode}</span>
                        <span className="mx-2 text-gray-300">|</span>
                      </div>
                      <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        autoComplete="tel"
                        value={mobile}
                        onChange={e => setMobile(e.target.value)}
                        className="flex-1 py-2.5 pr-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none border-0"
                        placeholder="Your mobile number"
                      />
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