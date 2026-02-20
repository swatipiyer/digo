import { useSearchParams } from 'react-router-dom';
import { Calendar, Users } from 'lucide-react';
import DiscoverPage from './DiscoverPage';
import GroupsPage from './GroupsPage';

const TABS = [
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'groups', label: 'Groups', icon: Users },
];

export default function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'events';

  const setActiveTab = (tab) => {
    setSearchParams({ tab });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-white sticky top-14 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3.5 font-medium border-b-2 transition-all whitespace-nowrap ${
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
      </div>

      {/* Tab Content */}
      {activeTab === 'events' && <DiscoverPage embedded />}
      {activeTab === 'groups' && <GroupsPage embedded />}
    </div>
  );
}
