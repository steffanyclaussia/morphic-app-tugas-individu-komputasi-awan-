import React from 'react';
import { MOCK_REWARDS } from '../constants';
import { User } from '../types';
import { Sparkles } from 'lucide-react';

// Custom Brand Logo Renderers for maximum crispness and aesthetic appeal
const BrandLogo: React.FC<{ brand: string; isDark: boolean }> = ({ brand, isDark }) => {
  const colorClass = isDark ? 'text-warm-fog' : 'text-soldier-green';

  switch (brand) {
    case 'gopay':
      return (
        <div className="flex items-center gap-1">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={colorClass}>
            <rect x="2" y="4" width="20" height="16" rx="4" stroke="currentColor" strokeWidth="2" />
            <circle cx="8" cy="12" r="3" fill="currentColor" />
            <path d="M16 12h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="font-sans text-[10px] font-bold tracking-wider uppercase">gopay</span>
        </div>
      );
    case 'kopikenangan':
      return (
        <div className="flex items-center gap-1">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={colorClass}>
            <path d="M17 8h1a4 4 0 1 1 0 8h-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8Z" stroke="currentColor" strokeWidth="2" />
            <path d="M6 2v3M10 2v3M14 2v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="font-serif text-[10px] italic font-bold">kenangan</span>
        </div>
      );
    case 'somethinc':
      return (
        <div className="flex items-center gap-1">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={colorClass}>
            <path d="M12 2v6M12 22v-6M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span className="font-sans text-[9px] font-bold tracking-widest uppercase">somethinc</span>
        </div>
      );
    case 'corkcicle':
      return (
        <div className="flex items-center gap-1">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={colorClass}>
            <path d="M8 2h8l-1 4H9L8 2Z" stroke="currentColor" strokeWidth="2" />
            <path d="M9 6h6l-1.5 16h-3L9 6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          <span className="font-sans text-[9px] font-bold tracking-widest uppercase">corkcicle</span>
        </div>
      );
    default:
      return null;
  }
};

export const EcoMarket: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="pt-12 px-6 pb-24 animate-fade-in relative">
      {/* Decorative Flowers */}
      <div className="absolute top-12 right-6 opacity-40">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-fresh-pink">
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="5" r="3" />
          <circle cx="12" cy="19" r="3" />
          <circle cx="5" cy="12" r="3" />
          <circle cx="19" cy="12" r="3" />
        </svg>
      </div>

      <header className="mb-8 relative z-10">
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-fresh-pink/30 text-hot-pink text-[10px] font-sans uppercase tracking-widest px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
            <Sparkles size={10} /> exclusive rewards
          </span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-soldier-green">Eco-Market</h1>
        <p className="font-sans text-sm text-soldier-green/70">Tukar saldo DropPoints dengan hadiah nyata.</p>
      </header>

      {/* Points Balance Card (DropPoints) */}
      <div className="bg-gradient-to-r from-fresh-green to-fresh-green/80 rounded-3xl p-6 text-soldier-green shadow-md mb-8 flex justify-between items-center relative overflow-hidden z-10">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
        <div className="relative z-10">
          <p className="font-sans text-xs opacity-80 mb-1 lowercase tracking-widest font-bold">saldo kamu</p>
          <h2 className="font-serif text-3xl font-bold">{user.points.toLocaleString('id-ID')} <span className="text-lg font-normal">Poin</span></h2>
        </div>
        <div className="w-10 h-10 bg-white/40 rounded-full flex items-center justify-center shadow-sm">
          <Sparkles size={20} className="text-soldier-green" />
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-2 gap-4 relative z-10">
        {MOCK_REWARDS.map((reward) => {
          const isSoldierGreen = reward.color.includes('soldier-green');
          return (
            <div 
              key={reward.id} 
              className={`${reward.color} rounded-3xl p-5 flex flex-col justify-between aspect-square shadow-sm relative overflow-hidden border border-white/20 transition-transform active:scale-95`}
            >
              {/* Decorative background circle */}
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
              
              {/* Top Row: Category Badge & Brand Logo */}
              <div className="flex justify-between items-center w-full relative z-10">
                <div className={`px-2.5 py-1 rounded-md font-sans text-[9px] uppercase tracking-widest font-bold ${
                  isSoldierGreen ? 'bg-white/20 text-warm-fog' : 'bg-white/40 text-soldier-green'
                }`}>
                  {reward.category}
                </div>
                <BrandLogo brand={reward.brand} isDark={isSoldierGreen} />
              </div>
              
              {/* Bottom Row: Title & Price Button */}
              <div className="relative z-10 mt-4">
                <h3 className={`font-serif text-lg leading-tight mb-3 ${
                  isSoldierGreen ? 'text-warm-fog' : 'text-soldier-green font-bold'
                }`}>
                  {reward.title}
                </h3>
                <button className={`w-full py-2.5 rounded-full font-sans text-xs font-bold lowercase tracking-widest shadow-sm transition-colors ${
                  isSoldierGreen 
                    ? 'bg-white/20 text-warm-fog hover:bg-white/30' 
                    : 'bg-white/60 text-soldier-green hover:bg-white/80'
                }`}>
                  {reward.costPoints.toLocaleString('id-ID')} poin
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
