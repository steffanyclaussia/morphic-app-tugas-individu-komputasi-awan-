import React, { useState } from 'react';
import { Share2, Trophy, Sparkles, Heart } from 'lucide-react';
import { LEADERBOARD } from '../constants';
import { audioService } from '../services/audioService';
import { User } from '../types';

interface GreenCirclesProps {
  user: User;
}

export const GreenCircles: React.FC<GreenCirclesProps> = ({ user }) => {
  const [activeFilter, setActiveFilter] = useState<'global' | 'sirkel' | 'kampus'>('global');
  const [showShareModal, setShowShareModal] = useState(false);

  const currentList = LEADERBOARD[activeFilter];

  const handleFilterChange = (filter: 'global' | 'sirkel' | 'kampus') => {
    audioService.playClick();
    setActiveFilter(filter);
  };

  const handleOpenShare = () => {
    audioService.playKalimbaChord();
    setShowShareModal(true);
  };

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

      {/* Header */}
      <header className="mb-8 flex justify-between items-end relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-fresh-pink/30 text-hot-pink text-[10px] font-sans uppercase tracking-widest px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
              <Sparkles size={10} /> social circle
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-soldier-green">Green Circles</h1>
          <p className="font-sans text-sm text-soldier-green/70">Papan peringkat pahlawan bumi.</p>
        </div>
        <button 
          onClick={handleOpenShare}
          className="w-11 h-11 bg-fresh-pink text-soldier-green rounded-full flex items-center justify-center shadow-md hover:bg-hot-pink hover:text-white transition-all active:scale-95"
        >
          <Share2 size={20} />
        </button>
      </header>

      {/* Interactive Badges */}
      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar relative z-10">
        <button 
          onClick={() => handleFilterChange('global')}
          className={`px-5 py-2.5 rounded-full font-sans text-xs whitespace-nowrap transition-all duration-300 ${
            activeFilter === 'global' 
              ? 'bg-soldier-green text-warm-fog shadow-md font-bold' 
              : 'bg-white/60 text-soldier-green border border-white/40 hover:bg-white/80'
          }`}
        >
          Global
        </button>
        <button 
          onClick={() => handleFilterChange('sirkel')}
          className={`px-5 py-2.5 rounded-full font-sans text-xs whitespace-nowrap transition-all duration-300 ${
            activeFilter === 'sirkel' 
              ? 'bg-fresh-pink text-soldier-green shadow-md font-bold' 
              : 'bg-white/60 text-soldier-green border border-white/40 hover:bg-white/80'
          }`}
        >
          Sirkel Teman
        </button>
        <button 
          onClick={() => handleFilterChange('kampus')}
          className={`px-5 py-2.5 rounded-full font-sans text-xs whitespace-nowrap transition-all duration-300 ${
            activeFilter === 'kampus' 
              ? 'bg-fresh-green text-soldier-green shadow-md font-bold' 
              : 'bg-white/60 text-soldier-green border border-white/40 hover:bg-white/80'
          }`}
        >
          Antar-Kampus
        </button>
      </div>

      {/* Leaderboard List */}
      <div className="bg-white/70 backdrop-blur-md rounded-3xl p-3 border border-white/60 shadow-sm relative z-10 mb-8">
        {currentList.map((item, index) => {
          // Synchronize the name dynamically if it matches the placeholder "Rara"
          const isCurrentUser = item.name.includes('Rara') || item.name.includes('(Kamu)');
          const displayName = isCurrentUser ? `${user.name} (Kamu)` : item.name;
          const displayAvatar = isCurrentUser && user.profilePicture ? user.profilePicture : item.avatar;

          return (
            <div 
              key={index} 
              className={`flex items-center p-4 rounded-2xl mb-2 transition-all duration-300 ${
                isCurrentUser 
                  ? 'bg-gradient-to-r from-fresh-pink/30 to-fresh-green/30 border border-fresh-pink/40 shadow-sm' 
                  : 'hover:bg-white/40'
              }`}
            >
              {/* Rank Badge */}
              <div className="w-8 flex items-center justify-center">
                {index === 0 && activeFilter !== 'kampus' ? (
                  <Trophy size={20} className="text-yellow-500" />
                ) : (
                  <span className="font-serif text-xl text-soldier-green/50 font-bold">{item.rank}</span>
                )}
              </div>

              {/* Avatar */}
              {displayAvatar ? (
                <img 
                  src={displayAvatar} 
                  alt={displayName} 
                  className="w-12 h-12 rounded-full border-2 border-white shadow-sm mr-4 object-cover" 
                />
              ) : (
                <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm mr-4 bg-fresh-pink/40 flex items-center justify-center font-serif text-lg font-bold text-soldier-green">
                  {displayName.charAt(0)}
                </div>
              )}

              {/* Name & Detail */}
              <div className="flex-1">
                <h4 className="font-serif text-lg text-soldier-green font-bold flex items-center gap-1.5">
                  {displayName}
                  {isCurrentUser && <Heart size={12} className="text-hot-pink fill-hot-pink" />}
                </h4>
                <p className="font-sans text-xs text-soldier-green/60">
                  {isCurrentUser ? user.campus || item.detail : item.detail}
                </p>
              </div>

              {/* Earnings in Poin */}
              <div className="text-right">
                <p className="font-sans text-sm font-bold text-soldier-green">
                  {isCurrentUser ? user.points.toLocaleString('id-ID') : item.points.toLocaleString('id-ID')}
                </p>
                <p className="font-sans text-[9px] uppercase tracking-widest text-soldier-green/50">Poin</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Shareable Impact Card (Instagram Story Preview) */}
      <div className="bg-gradient-to-br from-fresh-pink/40 via-warm-fog to-fresh-green/40 rounded-3xl p-6 border border-white/80 shadow-md relative overflow-hidden z-10">
        <div className="absolute top-0 right-0 w-24 h-24 bg-fresh-pink/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-fresh-green/20 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <h3 className="font-serif text-xl text-soldier-green font-bold mb-2">Bagikan Dampakmu!</h3>
          <p className="font-sans text-xs text-soldier-green/80 mb-4 leading-relaxed">
            Ekspor statistik mingguanmu menjadi infografis estetik yang siap diunggah ke Instagram Stories atau TikTok.
          </p>
          <button 
            onClick={handleOpenShare}
            className="bg-soldier-green text-warm-fog px-5 py-3 rounded-full font-sans text-xs lowercase tracking-widest shadow-md hover:bg-soldier-green/90 transition-all flex items-center gap-2"
          >
            <Share2 size={14} /> buat story estetik
          </button>
        </div>
      </div>

      {/* Share Modal / Story Preview */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-warm-fog w-full max-w-xs rounded-[32px] overflow-hidden shadow-2xl border border-white/40 relative flex flex-col">
            
            {/* Story Card Content */}
            <div className="p-8 bg-gradient-to-b from-fresh-pink/30 via-warm-fog to-fresh-green/30 flex-1 flex flex-col justify-between relative min-h-[400px]">
              {/* Decorative Vines inside Story */}
              <div className="absolute top-4 right-4 opacity-40">
                <svg width="60" height="60" viewBox="0 0 100 100" className="text-soldier-green">
                  <path d="M10,10 Q50,30 90,10" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="30" cy="18" r="6" fill="#E897B4" />
                  <circle cx="70" cy="18" r="8" fill="#B7D487" />
                </svg>
              </div>

              <div>
                <p className="font-serif text-sm text-soldier-green/60 tracking-widest uppercase">morphic.</p>
                <h2 className="font-serif text-3xl text-soldier-green italic mt-4 leading-tight">
                  "Ubah Sisa<br/>Menjadi Jiwa."
                </h2>
              </div>

              <div className="my-6 space-y-4 bg-white/60 backdrop-blur-md p-5 rounded-2xl border border-white/80">
                <div>
                  <p className="font-sans text-[10px] text-soldier-green/60 uppercase tracking-widest">{user.name}'s impact</p>
                  <p className="font-serif text-2xl font-bold text-soldier-green">3.4 Kg Plastik</p>
                  <p className="font-sans text-xs text-soldier-green/70">Berhasil diselamatkan dari TPA</p>
                </div>
                <div className="border-t border-soldier-green/10 pt-3">
                  <p className="font-serif text-2xl font-bold text-soldier-green">6.8 Kg CO2</p>
                  <p className="font-sans text-xs text-soldier-green/70">Emisi karbon yang berhasil dicegah</p>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-soldier-green/10 pt-4">
                <div>
                  <p className="font-sans text-[9px] text-soldier-green/60 uppercase tracking-widest">gabung sekarang</p>
                  <p className="font-serif text-sm font-bold text-soldier-green">morphic.app</p>
                </div>
                <div className="w-8 h-8 bg-fresh-green rounded-full flex items-center justify-center">
                  <Sparkles size={14} className="text-soldier-green" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 bg-white flex gap-2 border-t border-soldier-green/10">
              <button 
                onClick={() => {
                  audioService.playClick();
                  setShowShareModal(false);
                }}
                className="flex-1 py-3 rounded-full font-sans text-xs text-soldier-green border border-soldier-green/20 lowercase tracking-widest hover:bg-black/5 transition-colors"
              >
                tutup
              </button>
              <button 
                onClick={() => {
                  audioService.playWindJingle();
                  alert("Berhasil dibagikan ke Instagram Stories!");
                  setShowShareModal(false);
                }}
                className="flex-1 py-3 bg-soldier-green text-warm-fog rounded-full font-sans text-xs lowercase tracking-widest hover:bg-soldier-green/90 transition-colors shadow-md"
              >
                bagikan
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
