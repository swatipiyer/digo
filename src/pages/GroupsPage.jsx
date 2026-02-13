import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, MessageCircle, Calendar, Search, CheckCircle, Check, Filter } from 'lucide-react';
import Header from '../components/Header';

export default function GroupsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [joinedGroups, setJoinedGroups] = useState(() => {
    const saved = localStorage.getItem('digo_joined_groups');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'My Groups', 'Technology', 'Design', 'Entrepreneurship', 'Public', 'Private'];

  const showSuccessToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleJoinGroup = (group) => {
    let newJoinedGroups;
    if (joinedGroups.includes(group.id)) {
      newJoinedGroups = joinedGroups.filter(id => id !== group.id);
      showSuccessToast(`Left ${group.name}`);
    } else {
      newJoinedGroups = [...joinedGroups, group.id];
      showSuccessToast(`Joined ${group.name}! Check your email for details.`);
    }
    setJoinedGroups(newJoinedGroups);
    localStorage.setItem('digo_joined_groups', JSON.stringify(newJoinedGroups));
  };

  const handleViewGroup = (group) => {
    if (group.slug) {
      navigate(`/groups/${group.slug}`);
    } else {
      showSuccessToast(`Opening ${group.name}...`);
    }
  };

  // Sample groups
  const groups = [
    {
      id: 'techequity-ai',
      slug: 'techequity-ai',
      name: 'TechEquity Ai',
      members: 2847,
      description: 'TechEquity events in and around Silicon Valley. Monthly meet ups, workshops and our yearly Ai Summit conference.',
      category: 'Technology',
      logo: '/techequityailogo.png',
      events: 24,
      isPublic: true,
    },
    {
      id: 1,
      name: 'AI & Machine Learning Enthusiasts',
      members: 1247,
      description: 'A community for AI/ML practitioners and enthusiasts to share knowledge and collaborate.',
      category: 'Technology',
      events: 18,
      isPublic: true,
    },
    {
      id: 2,
      name: 'SF Tech Founders',
      members: 856,
      description: 'Connect with fellow founders, share experiences, and grow together.',
      category: 'Entrepreneurship',
      events: 12,
      isPublic: false,
    },
    {
      id: 3,
      name: 'Product Design Community',
      members: 532,
      description: 'Share design inspiration, get feedback, and connect with designers.',
      category: 'Design',
      events: 8,
      isPublic: true,
    },
    {
      id: 4,
      name: 'Web3 Builders',
      members: 423,
      description: 'Building the decentralized future together.',
      category: 'Technology',
      events: 15,
      isPublic: false,
    },
  ];

  const filteredGroups = groups.filter(
    (group) => {
      const matchesSearch =
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.category.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedCategory === 'All') return true;
      if (selectedCategory === 'My Groups') return joinedGroups.includes(group.id);
      if (selectedCategory === 'Public') return group.isPublic === true;
      if (selectedCategory === 'Private') return group.isPublic === false;
      return group.category === selectedCategory;
    }
  );

  // Split into My Groups and Discover Groups
  const myGroups = filteredGroups.filter(group => joinedGroups.includes(group.id));
  const discoverGroups = filteredGroups.filter(group => !joinedGroups.includes(group.id));

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Groups</h1>
          <p className="text-lg text-gray-600">Join communities and connect with like-minded people</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search groups by name, category, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 bg-white text-gray-900"
            />
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="w-4 h-4 text-gray-600 flex-shrink-0" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {(searchQuery || selectedCategory !== 'All') && (
            <p className="mt-3 text-sm text-gray-600">
              Found {filteredGroups.length} group{filteredGroups.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* My Groups Section */}
        {myGroups.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">My Groups</h2>
              <span className="text-sm text-gray-600">({myGroups.length})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myGroups.map((group) => (
                <div
                  key={group.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    {group.logo && (
                      <div className="w-16 h-16 bg-white border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                        <img src={group.logo} alt={group.name} className="w-full h-full object-contain p-2" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="mb-2">
                        <span className="px-2.5 py-0.5 bg-gray-100 text-gray-900 text-xs font-medium rounded">
                          {group.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{group.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{group.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {group.members} members
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {group.events || 0} events
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleJoinGroup(group)}
                      className="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 bg-gray-100 text-gray-900 border border-gray-300"
                    >
                      <Check className="w-4 h-4" />
                      Joined
                    </button>
                    <button
                      onClick={() => handleViewGroup(group)}
                      className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-all"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Discover Groups Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {myGroups.length > 0 ? 'Discover Groups' : 'All Groups'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {discoverGroups.length > 0 ? (
            <>
              {discoverGroups.map((group) => (
                <div
                  key={group.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    {group.logo && (
                      <div className="w-16 h-16 bg-white border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                        <img src={group.logo} alt={group.name} className="w-full h-full object-contain p-2" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="mb-2">
                        <span className="px-2.5 py-0.5 bg-gray-100 text-gray-900 text-xs font-medium rounded">
                          {group.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{group.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{group.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {group.members} members
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {group.events || 0} events
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleJoinGroup(group)}
                      className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                        joinedGroups.includes(group.id)
                          ? 'bg-gray-100 text-gray-900 border border-gray-300'
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      }`}
                    >
                      {joinedGroups.includes(group.id) ? (
                        <>
                          <Check className="w-4 h-4" />
                          Joined
                        </>
                      ) : (
                        'Join Group'
                      )}
                    </button>
                    <button
                      onClick={() => handleViewGroup(group)}
                      className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-all"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 text-lg">
                {searchQuery || selectedCategory !== 'All'
                  ? `No groups found matching your filters`
                  : 'No groups available'}
              </p>
              {(searchQuery || selectedCategory !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="mt-4 text-blue-600 font-medium hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <p className="text-sm font-medium">{toastMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}
