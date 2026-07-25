import React, { useState } from 'react';
import { LuBell, LuPalette, LuGlobe, LuBadgeHelp , LuMail, LuExternalLink } from 'react-icons/lu';

const Settings = () => {
  // Default tab changed to notifications
  const [activeTab, setActiveTab] = useState('notifications');

  // Simple toggle states
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);

  return (
    <div className="w-full flex flex-col gap-8 animate-in fade-in duration-300 pt-6">
      
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your app experience and personal preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* LEFT SIDEBAR (Tabs) */}
        <div className="w-full md:w-64 flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <TabButton 
            active={activeTab === 'notifications'} 
            onClick={() => setActiveTab('notifications')} 
            icon={<LuBell size={18} />} 
            label="Notifications" 
          />
          <TabButton 
            active={activeTab === 'appearance'} 
            onClick={() => setActiveTab('appearance')} 
            icon={<LuPalette size={18} />} 
            label="Appearance" 
          />
          <TabButton 
            active={activeTab === 'preferences'} 
            onClick={() => setActiveTab('preferences')} 
            icon={<LuGlobe size={18} />} 
            label="Preferences" 
          />
          <TabButton 
            active={activeTab === 'support'} 
            onClick={() => setActiveTab('support')} 
            icon={<LuBadgeHelp size={18} />} 
            label="Help & Support" 
          />
        </div>

        {/* RIGHT CONTENT AREA */}
        <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm min-h-[60vh]">
          
          {/* --- NOTIFICATIONS TAB --- */}
          {activeTab === 'notifications' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-4 mb-6">Notification Preferences</h2>
              
              <div className="flex flex-col gap-6">
                <ToggleRow 
                  title="Email Updates" 
                  description="Receive company announcements and alerts via email." 
                  isOn={emailNotif} 
                  onToggle={() => setEmailNotif(!emailNotif)} 
                />
                <hr className="border-gray-100" />
                <ToggleRow 
                  title="Push Notifications" 
                  description="Receive real-time alerts on your dashboard when assigned a task." 
                  isOn={pushNotif} 
                  onToggle={() => setPushNotif(!pushNotif)} 
                />
                <hr className="border-gray-100" />
                <ToggleRow 
                  title="Weekly Performance Reports" 
                  description="Get a weekly summary of your stats and team leaderboard." 
                  isOn={true} 
                  onToggle={() => {}} 
                />
              </div>
            </div>
          )}

          {/* --- APPEARANCE TAB --- */}
          {activeTab === 'appearance' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-4 mb-6">Appearance</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Light Theme Card */}
                <div className="border-2 border-[#00A97F] bg-white rounded-xl p-4 cursor-pointer relative overflow-hidden">
                  <div className="absolute top-2 right-2 w-4 h-4 bg-[#00A97F] rounded-full flex items-center justify-center border-2 border-white"></div>
                  <div className="w-full h-24 bg-gray-50 rounded-lg border border-gray-200 mb-3 flex flex-col gap-2 p-2">
                    <div className="w-1/2 h-2 bg-gray-200 rounded"></div>
                    <div className="w-3/4 h-2 bg-gray-200 rounded"></div>
                  </div>
                  <p className="text-sm font-bold text-gray-800 text-center">Light Mode</p>
                </div>

                {/* Dark Theme Card */}
                <div className="border border-gray-200 bg-white rounded-xl p-4 cursor-pointer hover:border-gray-300 transition-colors">
                  <div className="w-full h-24 bg-gray-800 rounded-lg border border-gray-700 mb-3 flex flex-col gap-2 p-2">
                    <div className="w-1/2 h-2 bg-gray-600 rounded"></div>
                    <div className="w-3/4 h-2 bg-gray-600 rounded"></div>
                  </div>
                  <p className="text-sm font-medium text-gray-500 text-center">Dark Mode (Coming Soon)</p>
                </div>
              </div>
            </div>
          )}

          {/* --- PREFERENCES TAB (NEW) --- */}
          {activeTab === 'preferences' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-4 mb-6">Regional Preferences</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Display Language</label>
                  <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A97F]/20 focus:border-[#00A97F] transition-all text-sm text-gray-700">
                    <option value="en">English (US)</option>
                    <option value="en-uk">English (UK)</option>
                    <option value="hi">Hindi</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700">Timezone</label>
                  <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A97F]/20 focus:border-[#00A97F] transition-all text-sm text-gray-700">
                    <option value="ist">(UTC+05:30) Asia/Kolkata (IST)</option>
                    <option value="utc">(UTC+00:00) Universal Time Coordinated</option>
                    <option value="est">(UTC-05:00) Eastern Time</option>
                  </select>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4">Note: Date and time formats across the dashboard will reflect your selected timezone.</p>
            </div>
          )}

          {/* --- HELP & SUPPORT TAB (NEW) --- */}
          {activeTab === 'support' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-4 mb-6">Help & Support</h2>
              
              <div className="grid grid-cols-1 gap-4">
                {/* Contact IT Support */}
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                    <LuMail size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-blue-900">IT Helpdesk</h3>
                    <p className="text-xs text-blue-700 mt-1 mb-3">Facing technical issues or need access to a specific tool? Contact the IT team.</p>
                    <button className="px-4 py-2 bg-white text-blue-700 border border-blue-200 text-xs font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-sm">
                      Email support@company.com
                    </button>
                  </div>
                </div>

                {/* Company Wiki / Handbook */}
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex items-start gap-4 mt-2">
                  <div className="p-3 bg-white border border-gray-200 text-gray-600 rounded-lg shadow-sm">
                    <LuExternalLink size={24} />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-sm font-bold text-gray-800">Employee Handbook</h3>
                    <p className="text-xs text-gray-500 mt-1">Read about company policies, leave structures, and FAQs.</p>
                  </div>
                  <button className="self-center p-2 text-gray-400 hover:text-[#00A97F] transition-colors">
                    <LuExternalLink size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// Sub-component for Sidebar Tabs
const TabButton = ({ active, onClick, icon, label }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap
        ${active 
          ? 'bg-[#00A97F]/10 text-[#00A97F]' 
          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
        }`}
    >
      {icon}
      {label}
    </button>
  );
};

// Sub-component for Custom iOS-style Toggle Switches
const ToggleRow = ({ title, description, isOn, onToggle }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="pr-4">
        <h3 className="text-sm font-bold text-gray-800">{title}</h3>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
      <button 
        onClick={onToggle}
        className={`relative w-11 h-6 shrink-0 rounded-full transition-colors duration-300 focus:outline-none ${isOn ? 'bg-[#00A97F]' : 'bg-gray-200'}`}
      >
        <span 
          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${isOn ? 'translate-x-5' : 'translate-x-0'}`}
        />
      </button>
    </div>
  );
};

export default Settings;