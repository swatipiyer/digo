import { useEffect, useRef, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  Home, Compass, Calendar, LayoutDashboard, Rocket,
  Bell, Sun, User, Settings,
  Users, Mic, Briefcase, FileText, TrendingUp,
  Clock, Plus, Edit2, Heart, Search,
  Building2, Wrench, ClipboardList, Sparkles, PenLine,
} from 'lucide-react';
import { useWorkspace } from '../contexts/WorkspaceContext';

const MAIN_NAV = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/explore', label: 'Explore', icon: Compass },
  { path: '/calendar', label: 'Calendar', icon: Calendar },
];

const WORKSPACE_NAV = {
  organizer: [
    { section: 'Manage' },
    { page: 'organizers', label: 'Events', icon: Calendar },
    { page: 'people', label: 'People', icon: Users },
    { section: 'Content' },
    { page: 'marketing', label: 'Marketing', icon: TrendingUp },
    { section: 'Analyze' },
    { page: 'reports', label: 'Reports', icon: FileText },
  ],
  speaker: [
    { section: 'My Work' },
    { page: 'speaker-dashboard', label: 'Dashboard', icon: Mic },
    { page: 'speaker-sessions', label: 'My Sessions', icon: Clock },
    { section: 'Actions' },
    { page: 'speaker-submit', label: 'Submit Talk', icon: Plus },
    { page: 'speaker-profile', label: 'My Profile', icon: Edit2 },
  ],
  sponsor: [
    { section: 'My Work' },
    { page: 'sponsor-dashboard', label: 'Dashboard', icon: Briefcase },
    { page: 'sponsor-events', label: 'My Events', icon: Calendar },
    { section: 'Actions' },
    { page: 'sponsor-leads', label: 'Leads', icon: Users },
    { page: 'sponsor-profile', label: 'My Profile', icon: Edit2 },
  ],
  volunteer: [
    { page: 'volunteer-dashboard', label: 'My Volunteering', icon: Heart },
    { page: 'volunteer-opportunities', label: 'Opportunities', icon: Search },
    { page: 'volunteer-schedule', label: 'Schedule', icon: Calendar },
  ],
  'venue-manager': [
    { section: 'Manage' },
    { page: 'my-venues', label: 'Venues', icon: Building2 },
    { page: 'services-hub', label: 'Services', icon: Wrench },
    { section: 'Requests' },
    { page: 'booking-requests', label: 'Bookings', icon: Calendar },
  ],
};

const ROLES = [
  { id: 'organizer', label: 'Organizer', defaultPage: 'organizers' },
  { id: 'speaker', label: 'Speaker', defaultPage: 'speaker-dashboard' },
  { id: 'sponsor', label: 'Sponsor', defaultPage: 'sponsor-dashboard' },
  { id: 'volunteer', label: 'Volunteer', defaultPage: 'volunteer-dashboard' },
  { id: 'venue-manager', label: 'Services Hub', defaultPage: 'my-venues' },
];

export default function AppShell() {
  const location = useLocation();
  const isWorkspace = location.pathname === '/workspace';
  const { currentRole, setCurrentRole, currentPage, setCurrentPage } = useWorkspace();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const profileMenuRef = useRef(null);
  const createMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (createMenuRef.current && !createMenuRef.current.contains(event.target)) {
        setShowCreateMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setShowProfileMenu(false);
    setShowCreateMenu(false);
  }, [location.pathname]);

  const isNavActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const sidebarWidth = isWorkspace ? 'w-64' : 'w-16';
  const contentMargin = isWorkspace ? 'ml-64' : 'ml-16';

  const workspaceItems = WORKSPACE_NAV[currentRole] || WORKSPACE_NAV.organizer;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 z-30 flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src="/digo.png" alt="Digo" className="w-7 h-7 rounded-lg" />
          <span className="text-lg font-bold text-gray-900">digo</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="relative" ref={createMenuRef}>
            <button
              type="button"
              onClick={() => setShowCreateMenu((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 text-gray-900 text-sm font-medium rounded-full hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create
            </button>
            {showCreateMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                <div className="py-1">
                  <Link
                    to="/submit-event"
                    onClick={() => setShowCreateMenu(false)}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Calendar className="w-5 h-5 text-gray-500" />
                    Submit Event
                  </Link>
                  <Link
                    to="/create"
                    onClick={() => setShowCreateMenu(false)}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <PenLine className="w-5 h-5 text-gray-500" />
                    Content
                  </Link>
                  <Link
                    to="/events/HkGjx/sessions/keynote-mcp/after"
                    onClick={() => setShowCreateMenu(false)}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Sparkles className="w-5 h-5 text-gray-500" />
                    Session
                  </Link>
                  <Link
                    to="/events/HkGjx#agenda"
                    onClick={() => setShowCreateMenu(false)}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <ClipboardList className="w-5 h-5 text-gray-500" />
                    Event Plan
                  </Link>
                </div>
              </div>
            )}
          </div>
          <button className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Notifications">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Toggle theme">
            <Sun className="w-5 h-5" />
          </button>
          <div className="relative" ref={profileMenuRef}>
            <button
              type="button"
              onClick={() => setShowProfileMenu((prev) => !prev)}
              className="w-8 h-8 rounded-full bg-gray-900 text-white text-xs font-semibold flex items-center justify-center"
              aria-label="User menu"
            >
              US
            </button>
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">User Profile</p>
                  <p className="text-xs text-gray-500">user@digo.app</p>
                </div>
                <div className="p-1">
                  <Link
                    to="/calendar"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    <Calendar className="w-4 h-4" />
                    Personal Calendar
                  </Link>
                  <Link
                    to="/workspace"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  <button type="button" disabled className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-400 rounded-lg cursor-not-allowed text-left">
                    <Settings className="w-4 h-4" />
                    Settings
                    <span className="ml-auto text-[10px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded">Soon</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed top-14 left-0 bottom-0 ${sidebarWidth} bg-white border-r border-gray-200 z-20 transition-all duration-200 overflow-y-auto`}>
        <div className="flex flex-col h-full">
          {/* Main Nav */}
          <nav className={`${isWorkspace ? 'px-3 pt-3 space-y-1' : 'pt-3 space-y-1'}`}>
            {MAIN_NAV.map((item) => {
              const Icon = item.icon;
              const active = isNavActive(item.path);
              return isWorkspace ? (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    active ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center gap-0.5 px-1 py-2.5 rounded-lg transition-colors mx-1 ${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className={`${isWorkspace ? 'mx-3' : 'mx-2'} my-2 border-t border-gray-200`} />

          {/* Workspace Link / Section */}
          {isWorkspace ? (
            <div className="px-3 flex-1">
              <div className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-900">
                <LayoutDashboard className="w-4 h-4" />
                Workspace
              </div>

              {/* Role Switcher */}
              <div className="bg-gray-50 border border-gray-200 p-1.5 rounded-xl grid grid-cols-2 gap-1.5 mt-1 mb-3">
                {ROLES.filter(r => r.id !== 'venue-manager').map((role) => (
                  <button
                    key={role.id}
                    onClick={() => {
                      setCurrentRole(role.id);
                      setCurrentPage(role.defaultPage);
                    }}
                    className={`px-2 py-2 rounded-lg text-xs font-bold transition-all ${
                      currentRole === role.id
                        ? 'bg-gray-900 text-white shadow-sm'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {role.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setCurrentRole('venue-manager');
                    setCurrentPage('my-venues');
                  }}
                  className={`col-span-2 px-2 py-2 rounded-lg text-xs font-bold transition-all ${
                    currentRole === 'venue-manager'
                      ? 'bg-gray-900 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  Services Hub
                </button>
              </div>

              {/* Role Nav Items */}
              <nav className="space-y-0.5">
                {workspaceItems.map((item, idx) => {
                  if (item.section) {
                    return (
                      <p key={item.section} className={`text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 ${idx > 0 ? 'pt-3' : ''} pb-1`}>
                        {item.section}
                      </p>
                    );
                  }
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.page}
                      onClick={() => setCurrentPage(item.page)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left text-sm ${
                        currentPage === item.page
                          ? 'bg-spring text-forest font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          ) : (
            <Link
              to="/workspace"
              className={`flex flex-col items-center gap-0.5 px-1 py-2.5 rounded-lg transition-colors mx-1 ${
                isWorkspace ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="text-[10px] font-medium">Work</span>
            </Link>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Bottom: Getting Started */}
          <div className={`${isWorkspace ? 'mx-3' : 'mx-2'} mb-2 border-t border-gray-200`} />
          {isWorkspace ? (
            <Link
              to="/getting-started"
              className="flex items-center gap-3 px-3 py-2.5 mx-3 mb-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <Rocket className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">Get Started</span>
            </Link>
          ) : (
            <Link
              to="/getting-started"
              className="flex flex-col items-center gap-0.5 px-1 py-2.5 mx-1 mb-2 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <Rocket className="w-5 h-5" />
              <span className="text-[10px] font-medium">Start</span>
            </Link>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className={`${contentMargin} pt-14 transition-all duration-200 min-h-screen`}>
        <Outlet />
      </main>
    </div>
  );
}
