import React, { useEffect } from 'react';
import { User } from '../types';
import { Droplet, Wind, Box, ChevronRight, Sparkles, HelpCircle } from 'lucide-react';
import { audioService } from '../services/audioService';

interface DashboardProps {
  user: User;
  onNavigateToMarket: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onNavigateToMarket }) => {
  // Play welcoming ASMR sound when the home screen mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      audioService.playKalimbaChord();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pb-24 animate-fade-in relative">
      {/* Header */}
      <header className="pt-12 pb-6 px-6 flex justify-between items-center relative z-10">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-fresh-pink animate-ping"></span>
            <span className="font-sans text-[10px] text-soldier-green uppercase tracking-widest font-bold">ubah sisa menjadi jiwa.</span>
          </div>
          <h1 className="font-serif text-4xl font-bold text-soldier-green tracking-tight">morphic.</h1>
          <p className="font-sans text-xs text-soldier-green font-bold tracking-wide mt-0.5">Hi, {user.name}! • Lvl {user.level} {user.title}</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-fresh-green to-fresh-pink p-0.5 shadow-md">
          <div className="w-full h-full rounded-full bg-warm-fog flex items-center justify-center">
            <span className="font-serif text-xl font-bold text-soldier-green">{user.name.charAt(0)}</span>
          </div>
        </div>
      </header>

      {/* Eco-Avatar Terrarium */}
      <section className="px-6 mb-8 relative z-10">
        <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-white shadow-sm relative overflow-hidden h-52 flex flex-col items-center justify-end">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fresh-pink/5 to-fresh-green/20"></div>
          
          {/* Decorative Flowers inside Terrarium */}
          <div className="absolute top-4 left-4 opacity-80">
            <svg width="32" height="32" viewBox="0 0 32 32" className="text-fresh-pink">
              <circle cx="16" cy="16" r="6" fill="currentColor" />
              <circle cx="16" cy="8" r="4" fill="currentColor" />
              <circle cx="16" cy="24" r="4" fill="currentColor" />
              <circle cx="8" cy="16" r="4" fill="currentColor" />
              <circle cx="24" cy="16" r="4" fill="currentColor" />
              <circle cx="16" cy="16" r="2" fill="#425221" />
            </svg>
          </div>

          {/* CSS Art representation of Terrarium/Plant based on chosen avatar */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 bg-fresh-green/40 rounded-full blur-xl absolute bottom-0"></div>
            
            {user.avatarType === 'cactus' ? (
              <svg width="90" height="110" viewBox="0 0 60 80" className="text-soldier-green drop-shadow-md">
                <path d="M30,80 L30,20 C30,20 30,10 20,10 C10,10 15,30 15,30 M30,40 L45,40 C45,40 55,40 55,30 C55,20 45,25 45,25" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <circle cx="20" cy="10" r="6" fill="#E897B4" opacity="0.9"/>
                <circle cx="55" cy="30" r="5" fill="#B7D487" opacity="0.9"/>
              </svg>
            ) : (
              <svg width="90" height="110" viewBox="0 0 80 100" className="text-soldier-green drop-shadow-md">
                <path d="M40,100 C40,100 40,60 40,40 C40,20 20,10 20,10 C20,10 30,30 40,40 C50,30 60,10 60,10 C60,10 40,20 40,40" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                <circle cx="20" cy="10" r="8" fill="#E897B4" opacity="0.9"/>
                <circle cx="60" cy="10" r="12" fill="#B7D487" opacity="0.9"/>
                <circle cx="40" cy="0" r="6" fill="#D97A9E" opacity="0.8"/>
              </svg>
            )}
            
            <div className="w-32 h-4 bg-soldier-green/10 rounded-[100%] mt-2"></div>
          </div>
          <p className="font-sans text-[10px] text-soldier-green font-bold mt-4 uppercase tracking-widest z-10 flex items-center gap-1">
            <Sparkles size={10} className="text-hot-pink" /> {user.avatarType === 'cactus' ? 'Baby Cactus' : 'Little Fern'} • Growing Beautifully
          </p>
        </div>
      </section>

      {/* Impact Tracker (DropPoints Balance) */}
      <section className="px-6 mb-8 relative z-10">
        <div className="bg-gradient-to-br from-fresh-green to-fresh-green/80 rounded-3xl p-6 text-soldier-green shadow-md relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
          
          {/* Decorative Flower on Card */}
          <div className="absolute top-4 right-4 opacity-30">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="text-fresh-pink">
              <circle cx="12" cy="12" r="5" />
              <circle cx="12" cy="5" r="3" />
              <circle cx="12" cy="19" r="3" />
              <circle cx="5" cy="12" r="3" />
              <circle cx="19" cy="12" r="3" />
            </svg>
          </div>

          <div className="flex justify-between items-end mb-6 relative z-10">
            <div>
              <p className="font-sans text-xs text-soldier-green font-bold mb-1 lowercase tracking-widest">saldo morphic</p>
              <h2 className="font-serif text-4xl font-bold">{user.points.toLocaleString('id-ID')} <span className="text-xl font-normal">Poin</span></h2>
            </div>
            <button 
              onClick={onNavigateToMarket}
              className="bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-full font-sans text-xs lowercase tracking-widest flex items-center hover:bg-white/90 transition-all shadow-sm font-bold"
            >
              tukar <ChevronRight size={14} className="ml-1" />
            </button>
          </div>
          <div className="flex gap-4 relative z-10">
            <div className="flex-1 bg-white/50 rounded-2xl p-4 border border-white/30">
              <Box size={20} className="mb-2 text-soldier-green" />
              <p className="font-serif text-xl font-bold">{user.plasticSavedKg} kg</p>
              <p className="font-sans text-[10px] text-soldier-green font-bold lowercase tracking-wider">plastik diselamatkan</p>
            </div>
            <div className="flex-1 bg-white/50 rounded-2xl p-4 border border-white/30">
              <Wind size={20} className="mb-2 text-soldier-green" />
              <p className="font-serif text-xl font-bold">{user.co2SavedKg} kg</p>
              <p className="font-sans text-[10px] text-soldier-green font-bold lowercase tracking-wider">co2 dicegah</p>
            </div>
          </div>
        </div>
      </section>

      {/* Panduan Nilai Poin (Points Value Guide) */}
      <section className="px-6 mb-8 relative z-10">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-white shadow-sm relative overflow-hidden">
          {/* Decorative background flower */}
          <div className="absolute -right-4 -top-4 opacity-10 text-fresh-pink pointer-events-none">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="5" />
              <circle cx="12" cy="5" r="3" />
              <circle cx="12" cy="19" r="3" />
              <circle cx="5" cy="12" r="3" />
              <circle cx="19" cy="12" r="3" />
            </svg>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <HelpCircle size={18} className="text-hot-pink" />
            <h3 className="font-serif text-lg font-bold text-soldier-green">Panduan Nilai Poin</h3>
          </div>

          <p className="font-sans text-xs text-soldier-green font-bold mb-4 leading-relaxed">
            Setiap botol kosmetik kosong yang kamu selamatkan memiliki nilai poin berbeda berdasarkan kompleksitas daur ulang materialnya:
          </p>

          <div className="space-y-3">
            <div className="flex items-center justify-between bg-fresh-green/20 p-3 rounded-2xl border border-fresh-green/40">
              <div className="flex items-center gap-2">
                <span className="text-lg">🧴</span>
                <div>
                  <h4 className="font-serif text-sm font-bold text-soldier-green">Botol Plastik PP / HDPE</h4>
                  <p className="font-sans text-[10px] text-soldier-green font-bold">Mudah didaur ulang kembali</p>
                </div>
              </div>
              <span className="font-sans text-xs font-bold text-soldier-green bg-white px-2.5 py-1 rounded-full shadow-sm">
                +1.000 Poin
              </span>
            </div>

            <div className="flex items-center justify-between bg-fresh-pink/20 p-3 rounded-2xl border border-fresh-pink/40">
              <div className="flex items-center gap-2">
                <span className="text-lg">✨</span>
                <div>
                  <h4 className="font-serif text-sm font-bold text-soldier-green">Botol Akrilik Tebal</h4>
                  <p className="font-sans text-[10px] text-soldier-green font-bold">Butuh pemisahan komponen khusus</p>
                </div>
              </div>
              <span className="font-sans text-xs font-bold text-hot-pink bg-white px-2.5 py-1 rounded-full shadow-sm">
                +1.500 Poin
              </span>
            </div>

            <div className="flex items-center justify-between bg-soldier-green/10 p-3 rounded-2xl border border-soldier-green/20">
              <div className="flex items-center gap-2">
                <span className="text-lg">💎</span>
                <div>
                  <h4 className="font-serif text-sm font-bold text-soldier-green">Botol Kaca Premium</h4>
                  <p className="font-sans text-[10px] text-soldier-green font-bold">Bernilai tinggi & ramah lingkungan</p>
                </div>
              </div>
              <span className="font-sans text-xs font-bold text-soldier-green bg-white px-2.5 py-1 rounded-full shadow-sm">
                +2.000 Poin
              </span>
            </div>
          </div>

          <p className="font-sans text-[10px] text-center text-soldier-green mt-4 font-bold italic">
            *Poin akan berstatus PENDING dan cair setelah diverifikasi di gudang transit.
          </p>
        </div>
      </section>

      {/* Edu-Stories (3D) */}
      <section className="pl-6 mb-8 relative z-10">
        <h3 className="font-serif text-xl text-soldier-green mb-4 flex items-center gap-2">
          Morphic Edu-Stories <span className="text-xs font-sans text-hot-pink font-bold uppercase tracking-widest bg-fresh-pink/20 px-2 py-0.5 rounded-full">3D Method</span>
        </h3>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pr-6 pb-4">
          <StoryCard title="Drain" desc="Habiskan sisa produk cairan kosmetik" color="bg-fresh-pink" icon={<Droplet size={24} />} />
          <StoryCard title="Dry" desc="Keringkan botol agar tidak berjamur" color="bg-hot-pink" icon={<Wind size={24} />} />
          <StoryCard title="Deliver" desc="Setor ke Eco-Box terdekat" color="bg-fresh-green" icon={<Box size={24} />} />
        </div>
      </section>
    </div>
  );
};

const StoryCard: React.FC<{ title: string, desc: string, color: string, icon: React.ReactNode }> = ({ title, desc, color, icon }) => (
  <div className={`min-w-[150px] h-44 ${color} rounded-3xl p-5 flex flex-col justify-between text-soldier-green shadow-sm flex-shrink-0 border border-white/20 relative overflow-hidden`}>
    <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
    <div className="w-10 h-10 bg-white/40 rounded-full flex items-center justify-center shadow-sm relative z-10">
      {icon}
    </div>
    <div className="relative z-10">
      <h4 className="font-serif text-xl font-bold mb-1">{title}</h4>
      <p className="font-sans text-[10px] text-soldier-green font-bold leading-tight">{desc}</p>
    </div>
  </div>
);
