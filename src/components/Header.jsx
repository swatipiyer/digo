import { Link, useLocation } from 'react-router-dom';
import { Bell, Sun } from 'lucide-react';

export default function Header() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo and Navigation */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
            >
              digo
            </Link>
            <nav className="flex items-center gap-8">
              <Link
                to="/"
                className={`text-base font-medium transition-colors ${
                  isActive('/') ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Plan
              </Link>
              <Link
                to="/discover"
                className={`text-base font-medium transition-colors ${
                  isActive('/discover') ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Discover
              </Link>
              <Link
                to="/calendar"
                className={`text-base font-medium transition-colors ${
                  isActive('/calendar') ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Calendar
              </Link>
              <Link
                to="/groups"
                className={`text-base font-medium transition-colors ${
                  isActive('/groups') ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Groups
              </Link>
            </nav>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            <button
              className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Getting Started
            </button>
            <button
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
            </button>
            <button
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Toggle theme"
            >
              <Sun className="w-5 h-5" />
            </button>
            <button
              className="w-9 h-9 rounded-full overflow-hidden"
              aria-label="User menu"
            >
              <img
                src="https://ui-avatars.com/api/?name=User&background=10b981&color=fff"
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
