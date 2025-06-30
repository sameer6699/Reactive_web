import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { Camera, Mail, User, Building, MapPin, Globe, Clock } from 'lucide-react';

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

const ProfilePage: React.FC = () => {
  const { user } = useStore();
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

  return (
    <div className="p-6 sm:p-10 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your account settings and set e-mail preferences.</p>
        </div>

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
                {/* Profile photo section */}
                <div className="flex items-center space-x-5">
                  <div className="relative">
                    <img
                      className="h-24 w-24 rounded-full object-cover"
                      src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80"
                      alt="Profile"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="absolute bottom-0 right-0 flex items-center justify-center h-8 w-8 bg-indigo-600 rounded-full text-white cursor-pointer hover:bg-indigo-700"
                    >
                      <Camera className="h-5 w-5" />
                      <input id="photo-upload" name="photo-upload" type="file" className="sr-only" />
                    </label>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="rounded-md bg-white dark:bg-gray-700 px-3.5 py-2.5 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      Change
                    </button>
                    <button
                      type="button"
                      className="ml-3 rounded-md bg-transparent px-3.5 py-2.5 text-sm font-semibold text-gray-900 dark:text-white"
                    >
                      Reset
                    </button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Allowed JPG, GIF or PNG. Max size of 800K</p>
                  </div>
                </div>

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
              <div className="max-w-lg mx-auto">
                <h2 className="text-xl font-semibold mb-4">Notification Permissions</h2>
                <p className="mb-2">Control your browser notification settings for this app.</p>
                <div className="mb-4">
                  <span className="font-medium">Current status: </span>
                  <span className={
                    notificationStatus === 'granted' ? 'text-green-600' : notificationStatus === 'denied' ? 'text-red-600' : 'text-yellow-600'
                  }>
                    {notificationStatus || 'Not supported'}
                  </span>
                </div>
                {notificationStatus !== 'granted' && (
                  <button
                    type="button"
                    onClick={handleRequestPermission}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  >
                    Request Notification Permission
                  </button>
                )}
                {notificationStatus === 'granted' && (
                  <div className="mt-4 text-green-600">Notifications are enabled!</div>
                )}
                {notificationStatus === 'denied' && (
                  <div className="mt-4 text-red-600">Notifications are blocked. Please enable them in your browser settings.</div>
                )}
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
                            status: 'Not Connected',
                            icon: (
                              <img src={fbLogo} alt="Facebook" className="h-8 w-8 object-contain rounded-full bg-white p-1 mr-3" />
                            ),
                            connected: false,
                            action: 'link',
                          },
                          {
                            name: 'Twitter',
                            status: '@ThemeSelection',
                            icon: (
                              <img src={twitterLogo} alt="Twitter" className="h-8 w-8 object-contain rounded-full bg-white p-1 mr-3" />
                            ),
                            connected: true,
                            action: 'delete',
                          },
                          {
                            name: 'Instagram',
                            status: '@ThemeSelection',
                            icon: (
                              <img src={instaLogo} alt="Instagram" className="h-8 w-8 object-contain rounded-full bg-white p-1 mr-3" />
                            ),
                            connected: true,
                            action: 'delete',
                          },
                          {
                            name: 'Dribbble',
                            status: 'Not Connected',
                            icon: (
                              <img src={dribbleLogo} alt="Dribbble" className="h-8 w-8 object-contain rounded-full bg-white p-1 mr-3" />
                            ),
                            connected: false,
                            action: 'link',
                          },
                          {
                            name: 'Behance',
                            status: 'Not Connected',
                            icon: (
                              <img src={behanceLogo} alt="Behance" className="h-8 w-8 object-contain rounded-full bg-white p-1 mr-3" />
                            ),
                            connected: false,
                            action: 'link',
                          },
                        ].map((acc, idx) => (
                          <div key={acc.name} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                            <div className="flex items-center">
                              {acc.icon}
                              <div>
                                <div className="font-medium text-gray-900 dark:text-gray-100">{acc.name}</div>
                                <div className={`text-xs ${acc.connected ? 'text-indigo-600' : 'text-gray-500'}`}>{acc.status}</div>
                              </div>
                            </div>
                            {/* Action Button */}
                            {acc.action === 'link' ? (
                              <button className="p-2 rounded border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 1 7 7l-1.5 1.5a5 5 0 0 1-7-7l1.5-1.5"/><path d="M14 11a5 5 0 0 0-7-7L5.5 5.5a5 5 0 0 0 7 7l1.5-1.5"/></svg>
                              </button>
                            ) : (
                              <button className="p-2 rounded border border-red-200 hover:bg-red-50">
                                <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 