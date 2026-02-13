import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Users, MapPin, Star, Check, Search, TrendingUp } from 'lucide-react';
import Header from '../components/Header';

export default function OrganizersListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Technology', 'Business', 'Networking', 'Education', 'AI/ML', 'Startups'];

  const organizers = [
    {
      id: 'techequity-ai',
      name: 'TechEquity Ai',
      logo: '/techequityailogo.png',
      banner: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200',
      description: 'TechEquity events in and around Silicon Valley. Monthly meet ups, workshops and our yearly Ai Summit conference.',
      category: 'AI/ML',
      location: 'Menlo Park, CA',
      members: 2847,
      upcomingEvents: 12,
      verified: true,
    },
    {
      id: 'silicon-valley-founders',
      name: 'Silicon Valley Founders Network',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200',
      banner: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200',
      description: 'Connecting startup founders and entrepreneurs across the Bay Area for networking and knowledge sharing.',
      category: 'Startups',
      location: 'San Francisco, CA',
      members: 4521,
      upcomingEvents: 8,
      verified: true,
    },
    {
      id: 'bay-area-tech-talks',
      name: 'Bay Area Tech Talks',
      logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=200',
      banner: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200',
      description: 'Weekly tech talks featuring industry leaders and innovators. Topics range from cloud computing to blockchain.',
      category: 'Technology',
      location: 'Mountain View, CA',
      members: 3156,
      upcomingEvents: 15,
      verified: true,
    },
    {
      id: 'women-in-tech-sv',
      name: 'Women in Tech Silicon Valley',
      logo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200',
      banner: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200',
      description: 'Empowering women in technology through mentorship, workshops, and networking events.',
      category: 'Networking',
      location: 'Palo Alto, CA',
      members: 1842,
      upcomingEvents: 6,
      verified: false,
    },
    {
      id: 'product-management-meetup',
      name: 'Product Management Meetup',
      logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=200',
      banner: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200',
      description: 'Learn product management best practices from experienced PMs at top tech companies.',
      category: 'Business',
      location: 'Sunnyvale, CA',
      members: 2341,
      upcomingEvents: 4,
      verified: false,
    },
    {
      id: 'code-academy-sv',
      name: 'Code Academy Silicon Valley',
      logo: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200',
      banner: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200',
      description: 'Hands-on coding workshops and bootcamps for all skill levels, from beginners to advanced developers.',
      category: 'Education',
      location: 'San Jose, CA',
      members: 5678,
      upcomingEvents: 20,
      verified: true,
    },
  ];

  const filteredOrganizers = organizers.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         org.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || org.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Event Organizers</h1>
              <p className="text-lg text-gray-600">Discover and follow organizers hosting events in your area</p>
            </div>
            <Link
              to="/become-organizer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              <Star className="w-4 h-4" />
              Become Certified
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{organizers.length}</p>
                <p className="text-sm text-gray-600">Total Organizers</p>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{organizers.filter(o => o.verified).length}</p>
                <p className="text-sm text-gray-600">Verified Organizers</p>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{organizers.reduce((sum, o) => sum + o.upcomingEvents, 0)}</p>
                <p className="text-sm text-gray-600">Upcoming Events</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  placeholder="Search organizers..."
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Organizers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrganizers.map((organizer) => (
            <Link
              key={organizer.id}
              to={`/groups/${organizer.id}`}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all group"
            >
              {/* Banner */}
              <div className="relative h-32 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                {organizer.banner ? (
                  <img
                    src={organizer.banner}
                    alt={`${organizer.name} banner`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Building2 className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                {organizer.verified && (
                  <div className="absolute top-3 right-3">
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                      <Check className="w-3 h-3" />
                      Verified
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Logo and Name */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                    <img
                      src={organizer.logo}
                      alt={organizer.name}
                      className="w-full h-full object-contain p-1.5"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                      {organizer.name}
                    </h3>
                    <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded mt-1">
                      {organizer.category}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {organizer.description}
                </p>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{organizer.location}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="font-semibold text-gray-900">{organizer.members.toLocaleString()}</span>
                    <span>members</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold text-blue-600">{organizer.upcomingEvents}</span>
                    <span className="text-gray-600"> upcoming</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredOrganizers.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No organizers found</h3>
            <p className="text-sm text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>
    </div>
  );
}
