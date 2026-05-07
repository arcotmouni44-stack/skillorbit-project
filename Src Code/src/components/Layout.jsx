import React, { useState } from 'react';
import { LayoutDashboard, BookOpen, CheckSquare, Settings, LogOut, Orbit, Menu, X, Plus } from 'lucide-react';

const Layout = ({ children, activeTab, setActiveTab, isDarkMode, onQuickAdd }) => {
  // Mobile sidebar control state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Subjects', icon: BookOpen },
    { name: 'Tasks', icon: CheckSquare },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <div className={`flex h-screen overflow-hidden font-sans ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* 1. SIDEBAR: Mobile lo fixed overlay laaga untundi */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0f172a] text-white transition-transform duration-300 transform 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 flex flex-col shadow-2xl`}>
        
        <div className="p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2 text-indigo-400">
            <Orbit className="w-6 h-6" />
            <span className="text-xl font-bold tracking-tight">SkillOrbit</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-1 hover:bg-slate-800 rounded">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setActiveTab(item.name);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm transition-all ${
                activeTab === item.name 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-slate-400 hover:text-red-400 transition-colors">
            <LogOut size={18} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT: Mobile lo idi 100% width occupy chesthundhi */}
      <main className="flex-1 flex flex-col min-w-0 bg-white overflow-hidden">
        
        {/* Mobile Header - Visible only on mobile */}
        <header className="md:hidden flex items-center justify-between p-4 bg-[#0f172a] text-white sticky top-0 z-40 shadow-md">
          <button onClick={() => setIsSidebarOpen(true)} className="p-1">
            <Menu size={26} />
          </button>
          <div className="flex items-center space-x-2">
            <Orbit className="w-5 h-5 text-indigo-400" />
            <span className="font-bold text-lg">SkillOrbit</span>
          </div>
          <div className="w-8"></div>
        </header>

        {/* Desktop Header - Hidden on mobile */}
        <header className="hidden md:flex h-16 items-center justify-end px-8 border-b border-slate-100 bg-white sticky top-0 z-30">
          <button 
            onClick={onQuickAdd}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-all shadow-md"
          >
            <Plus size={18} />
            <span>Quick Add Task</span>
          </button>
        </header>

        {/* Dashboard Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-full mx-auto">
            {children}
          </div>
        </div>
      </main>

      {/* 3. OVERLAY: Sidebar open ainappudu background dim avvadaniki */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
