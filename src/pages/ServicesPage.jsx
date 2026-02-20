import { useState } from 'react';
import { Building2, UtensilsCrossed, Package, Wrench, MapPin, Star, ExternalLink } from 'lucide-react';
import VenueDiscoveryPage from './VenueDiscoveryPage';

const foodProviders = [
  {
    id: 1,
    name: 'Moveable Feast Catering',
    location: 'San Francisco, CA',
    description: 'Full-service event catering specializing in farm-to-table menus for tech conferences and corporate events. Custom dietary accommodations available.',
    specialties: ['Corporate Events', 'Farm-to-Table', 'Dietary Friendly'],
    priceRange: '$$',
    rating: 4.8,
    reviewCount: 124,
    minOrder: '20 people',
    verified: true,
  },
  {
    id: 2,
    name: 'Bay Bites Box Lunches',
    location: 'Palo Alto, CA',
    description: 'Premium individually boxed meals perfect for workshops and day-long conferences. Wide variety of cuisines with easy ordering.',
    specialties: ['Box Lunches', 'Quick Service', 'Large Orders'],
    priceRange: '$',
    rating: 4.6,
    reviewCount: 89,
    minOrder: '10 people',
    verified: true,
  },
  {
    id: 3,
    name: 'Saffron & Sage Catering',
    location: 'Mountain View, CA',
    description: 'Upscale catering with globally inspired menus. Specializes in plated dinners, cocktail receptions, and multi-course tasting events.',
    specialties: ['Plated Dinners', 'Cocktail Events', 'Global Cuisine'],
    priceRange: '$$$',
    rating: 4.9,
    reviewCount: 67,
    minOrder: '30 people',
    verified: false,
  },
  {
    id: 4,
    name: 'Morning Fuel Coffee Bar',
    location: 'Sunnyvale, CA',
    description: 'Mobile espresso bar and breakfast catering for morning events, hackathons, and multi-day conferences. Specialty coffee and pastries.',
    specialties: ['Coffee Bar', 'Breakfast', 'Hackathons'],
    priceRange: '$',
    rating: 4.7,
    reviewCount: 203,
    minOrder: '15 people',
    verified: true,
  },
];

const swagProviders = [
  {
    id: 1,
    name: 'PrintLab Custom Merch',
    location: 'San Jose, CA',
    description: 'High-quality custom t-shirts, hoodies, and apparel with fast turnaround. Eco-friendly printing options and bulk discounts for events.',
    specialties: ['Apparel', 'Eco-Friendly', 'Fast Turnaround'],
    priceRange: '$$',
    rating: 4.7,
    reviewCount: 156,
    minOrder: '50 units',
    verified: true,
  },
  {
    id: 2,
    name: 'Sticker Giant West',
    location: 'Fremont, CA',
    description: 'Custom die-cut stickers, laptop decals, and vinyl graphics. Perfect for developer conferences, hackathons, and community events.',
    specialties: ['Stickers', 'Die-Cut', 'Vinyl Decals'],
    priceRange: '$',
    rating: 4.9,
    reviewCount: 312,
    minOrder: '100 units',
    verified: true,
  },
  {
    id: 3,
    name: 'SwagBox Co.',
    location: 'Oakland, CA',
    description: 'Curated swag boxes with premium branded items. From notebooks and pens to tech accessories — shipped directly to attendees or venues.',
    specialties: ['Swag Boxes', 'Direct Ship', 'Premium Items'],
    priceRange: '$$$',
    rating: 4.5,
    reviewCount: 78,
    minOrder: '25 boxes',
    verified: false,
  },
  {
    id: 4,
    name: 'EcoSwag Supply',
    location: 'Berkeley, CA',
    description: 'Sustainable and eco-conscious event swag. Reusable water bottles, bamboo accessories, and recycled material products with custom branding.',
    specialties: ['Sustainable', 'Reusable', 'Custom Branding'],
    priceRange: '$$',
    rating: 4.6,
    reviewCount: 91,
    minOrder: '30 units',
    verified: true,
  },
];

const avProviders = [
  {
    id: 1,
    name: 'EventTech AV Solutions',
    location: 'San Francisco, CA',
    description: 'Full-service AV rental and production for conferences and meetups. Projectors, PA systems, wireless mics, and live streaming setups.',
    specialties: ['AV Rental', 'Live Streaming', 'Sound Systems'],
    priceRange: '$$$',
    rating: 4.8,
    reviewCount: 97,
    minOrder: 'Half-day minimum',
    verified: true,
  },
  {
    id: 2,
    name: 'PixelPerfect Event Photography',
    location: 'Palo Alto, CA',
    description: 'Professional event photography and videography. Same-day photo delivery, highlight reels, and speaker session recordings.',
    specialties: ['Photography', 'Videography', 'Same-Day Delivery'],
    priceRange: '$$',
    rating: 4.9,
    reviewCount: 184,
    minOrder: '2 hours minimum',
    verified: true,
  },
  {
    id: 3,
    name: 'StreamLine Productions',
    location: 'Santa Clara, CA',
    description: 'Hybrid and virtual event production specialists. Multi-camera live streaming, Zoom integration, and post-event video editing.',
    specialties: ['Virtual Events', 'Multi-Camera', 'Post-Production'],
    priceRange: '$$$',
    rating: 4.7,
    reviewCount: 63,
    minOrder: 'Per event',
    verified: false,
  },
  {
    id: 4,
    name: 'QuickRent AV',
    location: 'Redwood City, CA',
    description: 'Affordable AV equipment rental with delivery and setup. Ideal for meetups, workshops, and smaller community events.',
    specialties: ['Equipment Rental', 'Delivery & Setup', 'Budget Friendly'],
    priceRange: '$',
    rating: 4.5,
    reviewCount: 142,
    minOrder: 'No minimum',
    verified: true,
  },
];

function ProviderCard({ provider }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-gray-900">{provider.name}</h3>
            {provider.verified && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-50 text-orange-700 text-xs font-medium rounded-full">
                <img src="/digo.png" alt="Digo" className="w-3 h-3" />
                Verified
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{provider.location}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-semibold text-gray-900">{provider.rating}</span>
            <span className="text-xs text-gray-500">({provider.reviewCount})</span>
          </div>
          <span className="text-sm font-medium text-gray-700">{provider.priceRange}</span>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">{provider.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {provider.specialties.map((specialty, index) => (
          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
            {specialty}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-500">Min: {provider.minOrder}</span>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          <ExternalLink className="w-3.5 h-3.5" />
          Contact
        </button>
      </div>
    </div>
  );
}

export default function ServicesPage({ embedded = false }) {
  const [activeTab, setActiveTab] = useState('venues');

  const tabs = [
    { id: 'venues', label: 'Venues', icon: Building2 },
    { id: 'food', label: 'Food Providers', icon: UtensilsCrossed },
    { id: 'swag', label: 'Swag Providers', icon: Package },
    { id: 'av', label: 'AV & Tech', icon: Wrench },
  ];

  const content = (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Event Services Marketplace</h1>
          <p className="text-lg text-gray-600">Find venues, catering, swag, and services for your events</p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 font-medium border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'venues' && (
            <div>
              <VenueDiscoveryPage embedded={true} />
            </div>
          )}
          {activeTab === 'food' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {foodProviders.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>
            </div>
          )}
          {activeTab === 'swag' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {swagProviders.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>
            </div>
          )}
          {activeTab === 'av' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {avProviders.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
  );

  if (embedded) return content;
  return (
    <div className="min-h-screen bg-white">
      {content}
    </div>
  );
}
