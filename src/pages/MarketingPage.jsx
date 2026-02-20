import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Image, Megaphone, ArrowRight, FileText, Share2, Download, Palette } from 'lucide-react';
import EmailMakerPage from './EmailMakerPage';

const TABS = [
  { id: 'email', label: 'Email Builder', icon: Mail },
  { id: 'media-kit', label: 'Media Kit', icon: Image },
];

export default function MarketingPage({ embedded = false }) {
  const [localTab, setLocalTab] = useState('email');
  const activeTab = localTab;

  const setActiveTab = (tab) => {
    setLocalTab(tab);
  };

  const content = (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Megaphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Marketing</h1>
              <p className="text-gray-600 text-sm">Create emails, media kits, and promotional materials</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex gap-1">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 font-medium border-b-2 transition-all whitespace-nowrap ${
                    isActive
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'email' && <EmailMakerPage embedded />}
        {activeTab === 'media-kit' && <MediaKitHub />}
      </div>
  );

  if (embedded) return content;
  return (
    <div className="min-h-screen bg-gray-50">
      {content}
    </div>
  );
}

function MediaKitHub() {
  const MEDIA_KIT_FEATURES = [
    { icon: Palette, title: 'Brand Assets', description: 'Logos, banners, and color palettes for your events' },
    { icon: FileText, title: 'Social Templates', description: 'Ready-to-post graphics for LinkedIn, X, and Instagram' },
    { icon: Share2, title: 'Speaker Cards', description: 'Professional photo cards for event speakers' },
    { icon: Download, title: 'Export Packages', description: 'Download complete media kits as ZIP packages' },
  ];

  const SAMPLE_EVENTS = [
    { id: 1, name: 'SF AI Summit 2025', date: 'Mar 15, 2025', image: '🤖' },
    { id: 2, name: 'Bay Area Tech Mixer', date: 'Apr 22, 2025', image: '🎯' },
  ];

  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Media Kit Generator</h2>
        <p className="text-blue-100 mb-6 max-w-2xl">
          Create professional media kits for your events. Generate branded assets, speaker cards,
          social media templates, and downloadable press packages — all in one place.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {MEDIA_KIT_FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <Icon className="w-6 h-6 mb-2 text-blue-200" />
                <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-blue-200">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Select Event */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select an Event</h3>
        <p className="text-sm text-gray-600 mb-4">
          Choose an event to create or edit its media kit. Each event gets its own branded assets.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SAMPLE_EVENTS.map((event) => (
            <Link
              key={event.id}
              to={`/events/${event.id}/media-kit`}
              className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{event.image}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                    {event.name}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">{event.date}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1" />
              </div>
            </Link>
          ))}

          {/* Browse all events card */}
          <Link
            to="/explore"
            className="group bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-5 hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-center"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-200 group-hover:bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 transition-colors">
                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
              </div>
              <p className="font-medium text-gray-700 group-hover:text-blue-700">Browse All Events</p>
              <p className="text-xs text-gray-500 mt-1">Find an event to create a media kit</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
