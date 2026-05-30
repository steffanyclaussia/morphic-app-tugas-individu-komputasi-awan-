import React from 'react';
import { Home, ShoppingBag, Users, User, Camera } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-warm-fog/90 backdrop-blur-md border-t border-soldier-green/10 pb-safe pt-2 px-6 flex justify-between items-center z-40">
      <NavItem icon={<Home size={24} />} label="home" isActive={activeTab === 'home'} onClick={() => onChangeTab('home')} />
      <NavItem icon={<ShoppingBag size={24} />} label="market" isActive={activeTab === 'market'} onClick={() => onChangeTab('market')} />
      
      {/* FAB for Scan */}
      <div className="relative -top-6">
        <button 
          onClick={() => onChangeTab('scan')}
          className="w-16 h-16 bg-soldier-green rounded-full flex items-center justify-center shadow-lg shadow-soldier-green/30 transform transition-transform active:scale-95"
        >
          <Camera size={28} className="text-warm-fog" />
        </button>
      </div>

      <NavItem icon={<Users size={24} />} label="circles" isActive={activeTab === 'social'} onClick={() => onChangeTab('social')} />
      <NavItem icon={<User size={24} />} label="profile" isActive={activeTab === 'profile'} onClick={() => onChangeTab('profile')} />
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }> = ({ icon, label, isActive, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center p-2 transition-colors ${isActive ? 'text-soldier-green' : 'text-soldier-green/40'}`}>
    {icon}
    <span className="text-[10px] font-sans lowercase tracking-widest mt-1">{label}</span>
  </button>
);
