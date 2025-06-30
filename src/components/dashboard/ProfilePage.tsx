import React from 'react';
import { useStore } from '../../store/useStore';
import { Camera, Mail, User, Building, MapPin, Globe, Clock } from 'lucide-react';

// Let's assume you have an icon library like Heroicons
import { CameraIcon } from '@heroicons/react/24/solid';

const ProfilePage: React.FC = () => {
  const { user } = useStore();
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
                <a
                  href="#"
                  className="whitespace-nowrap py-4 px-1 border-b-2 border-indigo-500 font-semibold text-indigo-600 dark:text-indigo-400"
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="whitespace-nowrap py-4 px-1 border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 font-medium"
                >
                  Notifications
                </a>
                <a
                  href="#"
                  className="whitespace-nowrap py-4 px-1 border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 font-medium"
                >
                  Connections
                </a>
              </nav>
            </div>
          </div>

          <div className="p-6">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 