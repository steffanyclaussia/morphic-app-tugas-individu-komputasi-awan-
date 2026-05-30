import React, { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { BottomNav } from './components/BottomNav';
import { Dashboard } from './views/Dashboard';
import { ScanAndDrop } from './views/ScanAndDrop';
import { EcoMarket } from './views/EcoMarket';
import { GreenCircles } from './views/GreenCircles';
import { Profile } from './views/Profile';
import { AuthOnboarding } from './views/AuthOnboarding';
import { TabType, User, Transaction } from './types';
import { MOCK_USER, MOCK_TRANSACTIONS } from './constants';
import { Volume2, VolumeX } from 'lucide-react';
import { audioService } from './services/audioService';

// Reusable Aesthetic Background Vines & Flowers
const AestheticVines: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    {/* Top Right Vine */}
    <svg className="absolute -top-4 -right-4 w-56 h-56 text-fresh-green/40 transform rotate-12" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M180,10 Q120,80 100,150 Q90,180 50,190" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Leaves */}
      <path d="M150,45 Q170,35 165,25 Q145,35 150,45 Z" fill="currentColor" />
      <path d="M120,90 Q140,85 135,70 Q115,80 120,90 Z" fill="currentColor" />
      <path d="M102,135 Q120,140 122,125 Q105,120 102,135 Z" fill="currentColor" />
      {/* Pink Blossoms */}
      <circle cx="140" cy="60" r="9" fill="#E897B4" opacity="0.9" />
      <circle cx="140" cy="60" r="4" fill="#D97A9E" />
      <circle cx="95" cy="110" r="11" fill="#E897B4" opacity="0.9" />
      <circle cx="95" cy="110" r="5" fill="#D97A9E" />
      <circle cx="60" cy="160" r="7" fill="#E897B4" opacity="0.8" />
    </svg>

    {/* Bottom Left Vine */}
    <svg className="absolute bottom-20 -left-6 w-48 h-48 text-fresh-green/30 transform -rotate-45" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20,190 Q80,120 100,50 Q110,20 150,10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Leaves */}
      <path d="M50,145 Q30,135 35,125 Q55,135 50,145 Z" fill="currentColor" />
      <path d="M80,100 Q60,90 65,75 Q85,85 80,100 Z" fill="currentColor" />
      {/* Pink Blossoms */}
      <circle cx="65" cy="120" r="8" fill="#E897B4" opacity="0.85" />
      <circle cx="65" cy="120" r="3.5" fill="#D97A9E" />
      <circle cx="110" cy="70" r="10" fill="#E897B4" opacity="0.85" />
      <circle cx="110" cy="70" r="4.5" fill="#D97A9E" />
    </svg>

    {/* Floating Petals & Leaves */}
    <div className="absolute top-1/4 left-12 w-3 h-5 bg-fresh-pink/40 rounded-full transform rotate-45 animate-pulse-slow"></div>
    <div className="absolute top-2/3 right-16 w-4 h-6 bg-fresh-green/30 rounded-full transform -rotate-12 animate-pulse-slow"></div>
    <div className="absolute bottom-1/3 left-24 w-3 h-3 bg-hot-pink/30 rounded-full animate-ping"></div>
  </div>
);

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isMuted, setIsMuted] = useState(false);
  
  // Dynamic user state initialized with mock data
  const [user, setUser] = useState<User>({
    ...MOCK_USER,
    avatarType: 'fern',
    phone: '08123456789',
    address: 'Kost Green Canopy, Jl. Margonda Raya No. 12, Depok',
    campus: 'Universitas Indonesia (UI)'
  });

  // Dynamic transactions state
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  // If not logged in, show the beautiful Auth & Onboarding flow
  if (!isLoggedIn) {
    return (
      <div className="w-full w-screen h-screen bg-warm-fog relative overflow-hidden flex flex-col justify-between">
        <AestheticVines />
        <div className="flex-1 overflow-y-auto no-scrollbar relative z-10">
          <AuthOnboarding 
            onComplete={(name, campus, avatar, phone, address) => {
              setUser(prev => ({
                ...prev,
                name: name,
                campus: campus,
                avatarType: avatar,
                phone: phone,
                address: address
              }));
              setIsLoggedIn(true);
              setActiveTab('home');
            }} 
          />
        </div>
      </div>
    );
  }

  const handleTabChange = (tab: TabType) => {
    audioService.playClick();
    setActiveTab(tab);
  };

  const handleToggleMute = () => {
    const muted = audioService.toggleMute();
    setIsMuted(muted);
  };

  // Handle adding a new transaction dynamically with today's date
  const handleAddTransaction = (pointsEarned: number, type: 'ECO_BOX' | 'ECO_PICK') => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      date: formattedDate,
      items: 1,
      pointsEarned: pointsEarned,
      status: 'PENDING',
      type: type
    };

    // Add to transaction list
    setTransactions(prev => [newTx, ...prev]);

    // Update user points and impact statistics
    setUser(prev => ({
      ...prev,
      points: prev.points + pointsEarned,
      plasticSavedKg: parseFloat((prev.plasticSavedKg + 0.3).toFixed(1)), // +300g plastic saved
      co2SavedKg: parseFloat((prev.co2SavedKg + 0.6).toFixed(1)) // +600g CO2 prevented
    }));
  };

  const renderView = () => {
    switch (activeTab) {
      case 'home': return <Dashboard user={user} onNavigateToMarket={() => handleTabChange('market')} />;
      case 'scan': return (
        <ScanAndDrop 
          user={user} 
          onComplete={() => handleTabChange('profile')} 
          onAddTransaction={handleAddTransaction}
        />
      );
      case 'market': return <EcoMarket user={user} />;
      case 'social': return <GreenCircles user={user} />;
      case 'profile': return <Profile user={user} onUpdateUser={setUser} transactions={transactions} />;
      default: return <Dashboard user={user} onNavigateToMarket={() => handleTabChange('market')} />;
    }
  };

  return (
    <div className="w-full w-screen h-screen bg-warm-fog relative overflow-hidden flex flex-col justify-between">
      {/* Global Aesthetic Background Decorations */}
      <AestheticVines />

      {/* Floating ASMR Audio Toggle */}
      <button 
        onClick={handleToggleMute}
        className="absolute top-12 right-6 z-50 bg-white/60 backdrop-blur-md p-2.5 rounded-full text-soldier-green shadow-sm hover:bg-white/80 transition-all active:scale-95"
        title="Toggle ASMR Sounds"
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>

      {/* Main Content Area - Scrollable inside the mobile frame */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative z-10">
        {renderView()}
      </div>

      {/* Bottom Navigation - Fixed at the bottom of the mobile frame */}
      {activeTab !== 'scan' && (
        <BottomNav activeTab={activeTab} onChangeTab={handleTabChange} />
      )}
    </div>
  );
};

export default App;
