import React, { useState, useEffect } from 'react';
import { Droplet, Sprout, Volume2, VolumeX } from 'lucide-react';
import { audioService } from '../services/audioService';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<number>(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Phase 0: Bottle & Drop (0 - 1.5s)
    audioService.playCrystalDrop();

    const t1 = setTimeout(() => {
      setPhase(1);
      audioService.playLeafRustle();
    }, 1500);

    // Phase 1: Plant Growing & Blooming (1.5 - 3.5s)
    const t2 = setTimeout(() => {
      setPhase(2);
      audioService.playKalimbaChord();
    }, 3500);

    // Phase 2: Slogan (3.5 - 5.0s)
    const t3 = setTimeout(() => {
      setPhase(3);
      audioService.playWindJingle();
    }, 5000);

    // Phase 3: Logo & Exit (5.0s+)
    const t4 = setTimeout(() => {
      onComplete();
    }, 6500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  const handleToggleMute = () => {
    const muted = audioService.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="fixed inset-0 bg-warm-fog z-50 flex flex-col items-center justify-center overflow-hidden">
      {/* Mute/Unmute ASMR Toggle */}
      <button 
        onClick={handleToggleMute}
        className="absolute top-6 right-6 z-50 bg-white/60 backdrop-blur-md p-3 rounded-full text-soldier-green shadow-sm hover:bg-white/80 transition-all"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* Background Climbing Vines for Splash Screen */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="absolute top-0 left-0 w-48 h-48 text-fresh-green" viewBox="0 0 100 100" fill="none">
          <path d="M0,0 Q30,50 10,100" stroke="currentColor" strokeWidth="2" />
          <circle cx="20" cy="30" r="4" fill="#E897B4" />
          <circle cx="15" cy="70" r="5" fill="#E897B4" />
        </svg>
        <svg className="absolute bottom-0 right-0 w-48 h-48 text-fresh-green" viewBox="0 0 100 100" fill="none">
          <path d="M100,100 Q70,50 90,0" stroke="currentColor" strokeWidth="2" />
          <circle cx="80" cy="40" r="5" fill="#E897B4" />
          <circle cx="85" cy="80" r="4" fill="#E897B4" />
        </svg>
      </div>

      <div className="relative w-72 h-72 flex items-center justify-center">
        
        {/* Phase 0: Bottle Line Art */}
        <div className={`absolute transition-opacity duration-1000 ${phase === 0 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="relative flex flex-col items-center">
            <div className="w-12 h-20 border-2 border-soldier-green rounded-t-xl rounded-b-md relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-6 border-2 border-soldier-green rounded-t-sm"></div>
            </div>
            <Droplet className="text-soldier-green mt-2 animate-bounce" size={24} strokeWidth={1.5} />
          </div>
        </div>

        {/* Phase 1: Plant Growing & Blooming */}
        <div className={`absolute transition-all duration-1000 transform ${phase === 1 ? 'opacity-100 scale-110' : 'opacity-0 scale-50'}`}>
          <div className="relative flex flex-col items-center">
            <Sprout className="text-fresh-green w-24 h-24 animate-pulse-slow" strokeWidth={1.5} />
            
            {/* Blooming Pink Flowers */}
            <div className="absolute -top-2 -left-2 animate-bounce">
              <svg width="24" height="24" viewBox="0 0 24 24" className="text-fresh-pink">
                <circle cx="12" cy="12" r="5" fill="currentColor" />
                <circle cx="12" cy="5" r="3" fill="currentColor" />
                <circle cx="12" cy="19" r="3" fill="currentColor" />
                <circle cx="5" cy="12" r="3" fill="currentColor" />
                <circle cx="19" cy="12" r="3" fill="currentColor" />
                <circle cx="12" cy="12" r="1.5" fill="#425221" />
              </svg>
            </div>
            <div className="absolute -bottom-2 -right-2 animate-bounce delay-150">
              <svg width="20" height="24" viewBox="0 0 24 24" className="text-hot-pink">
                <circle cx="12" cy="12" r="5" fill="currentColor" />
                <circle cx="12" cy="5" r="3" fill="currentColor" />
                <circle cx="12" cy="19" r="3" fill="currentColor" />
                <circle cx="5" cy="12" r="3" fill="currentColor" />
                <circle cx="19" cy="12" r="3" fill="currentColor" />
                <circle cx="12" cy="12" r="1.5" fill="#425221" />
              </svg>
            </div>
          </div>
        </div>

        {/* Phase 2: Slogan */}
        <div className={`absolute transition-opacity duration-1000 text-center w-full ${phase === 2 ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="font-serif text-3xl text-soldier-green italic tracking-wide leading-relaxed">
            Ubah Sisa<br/>
            <span className="text-hot-pink">Menjadi Jiwa.</span>
          </h1>
          {/* Tiny decorative flower under slogan */}
          <div className="flex justify-center mt-4">
            <svg width="16" height="16" viewBox="0 0 24 24" className="text-fresh-pink animate-spin-slow">
              <circle cx="12" cy="12" r="5" fill="currentColor" />
              <circle cx="12" cy="5" r="3" fill="currentColor" />
              <circle cx="12" cy="19" r="3" fill="currentColor" />
              <circle cx="5" cy="12" r="3" fill="currentColor" />
              <circle cx="19" cy="12" r="3" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Phase 3: Logo */}
        <div className={`absolute transition-opacity duration-1000 ${phase === 3 ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="font-serif text-5xl text-soldier-green font-bold tracking-tighter">
            morphic<span className="text-hot-pink">.</span>
          </h1>
        </div>

      </div>
    </div>
  );
};
