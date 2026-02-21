import React from 'react';
import { BrainCircuit, Search } from 'lucide-react';

export type TabKeys = 'home' | 'services' | 'about' | 'contact' | 'faq';

interface NavBarProps {
  activeTab: TabKeys;
  setActiveTab: (tab: TabKeys) => void;
}

export const NavBar: React.FC<NavBarProps> = ({ activeTab, setActiveTab }) => {
  const tabs: { key: TabKeys, label: string }[] = [
    { key: 'home', label: 'HOME' },
    { key: 'services', label: 'SERVICES' },
    { key: 'about', label: 'ABOUT' },
    { key: 'contact', label: 'CONTACT' },
    { key: 'faq', label: 'FAQ' },
  ];

  return (
    <nav className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12 max-w-[1400px] mx-auto w-full">
      <button onClick={() => setActiveTab('home')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <BrainCircuit className="text-indigo-400" size={32} />
        <span className="text-2xl font-black tracking-tighter text-white">
          Stagnation<span className="text-indigo-400">Scanner</span>
        </span>
      </button>

      <div className="hidden md:flex items-center gap-10 text-sm font-semibold tracking-wider text-gray-400">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`transition-colors uppercase ${
              activeTab === t.key ? 'text-indigo-400 border-b-2 border-indigo-400 pb-1' : 'hover:text-white pb-1 border-b-2 border-transparent'
            }`}
          >
            {t.label}
          </button>
        ))}
        <Search size={20} className="cursor-pointer hover:text-white transition-colors ml-4" />
      </div>
    </nav>
  );
};
