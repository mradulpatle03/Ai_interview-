import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Home, 
  Calendar, 
  FileText, 
  BarChart3, 
  Settings, 
  User, 
  Bell, 
  Search,
  Mic,
  Video,
  Brain,
  ChevronRight,
  LogOut
} from 'lucide-react';

// Navbar Component
const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              onClick={toggleSidebar}
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex ml-2 md:mr-24">
              <div className="flex items-center">
                <Brain className="h-8 w-8 text-blue-600 mr-2" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-gray-900">
                  AI Interview
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search interviews..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center ml-3">
              <button className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 ml-2">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>

              <div className="relative ml-3">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                >
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                    alt="user photo"
                  />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <User size={16} className="mr-2" />
                      Profile
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Settings size={16} className="mr-2" />
                      Settings
                    </a>
                    <hr className="my-1" />
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Sidebar Component
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, href: '#' },
    { id: 'interviews', label: 'My Interviews', icon: Video, href: '#' },
    { id: 'schedule', label: 'Schedule', icon: Calendar, href: '#' },
    { id: 'practice', label: 'Practice', icon: Mic, href: '#' },
    { id: 'reports', label: 'Reports', icon: BarChart3, href: '#' },
    { id: 'feedback', label: 'Feedback', icon: FileText, href: '#' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '#' }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
          <div className="space-y-2 font-medium">
            {/* Quick Actions */}
            <div className="pt-4 mt-4 space-y-2 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3">
                Quick Actions
              </p>
              <button className="w-full flex items-center p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                <Video size={20} className="mr-3" />
                Start Interview
              </button>
              <button className="w-full flex items-center p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <Mic size={20} className="mr-3" />
                Practice Session
              </button>
            </div>

            {/* Navigation Menu */}
            <div className="pt-4 mt-4 space-y-2 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3">
                Navigation
              </p>
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeItem === item.id;
                
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveItem(item.id);
                    }}
                    className={`flex items-center p-2 rounded-lg transition-colors group ${
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent
                      size={20}
                      className={`mr-3 ${
                        isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                    />
                    <span className="flex-1">{item.label}</span>
                    {isActive && <ChevronRight size={16} className="text-blue-500" />}
                  </a>
                );
              })}
            </div>

            {/* Stats Card */}
            <div className="pt-4 mt-4 border-t border-gray-200">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-lg text-white">
                <h3 className="text-sm font-semibold">Your Progress</h3>
                <div className="mt-2">
                  <div className="flex justify-between text-xs">
                    <span>Interviews Completed</span>
                    <span>12/15</span>
                  </div>
                  <div className="w-full bg-blue-400 rounded-full h-2 mt-1">
                    <div className="bg-white h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

// Main Layout Component
const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="bg-gray-50">
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="p-4 lg:ml-64">
        <div className="p-4 mt-14">
          {children}
        </div>
      </div>
    </div>
  );
};

// Example usage with sample content
const App = () => {
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Video className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Total Interviews</h2>
              <p className="text-2xl font-semibold text-gray-900">24</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Success Rate</h2>
              <p className="text-2xl font-semibold text-gray-900">87%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Mic className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-500">Practice Hours</h2>
              <p className="text-2xl font-semibold text-gray-900">156</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Interviews</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Software Engineer Interview</h4>
                  <p className="text-sm text-gray-500">Completed 2 hours ago</p>
                </div>
                <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                  Passed
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Product Manager Interview</h4>
                  <p className="text-sm text-gray-500">Scheduled for tomorrow</p>
                </div>
                <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                  Upcoming
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Video size={20} className="mr-2" />
                Start New Interview
              </button>
              <button className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Mic size={20} className="mr-2" />
                Practice Mode
              </button>
              <button className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Calendar size={20} className="mr-2" />
                Schedule Interview
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;