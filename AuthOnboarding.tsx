import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, Phone, MapPin, Heart, User as UserIcon, GraduationCap, ChevronDown } from 'lucide-react';
import { audioService } from '../services/audioService';

interface AuthOnboardingProps {
  onComplete: (name: string, campus: string, avatar: 'cactus' | 'fern', phone: string, address: string) => void;
}

const CAMPUS_OPTIONS = [
  'Universitas Indonesia (UI)',
  'Universitas Gadjah Mada (UGM)',
  'Institut Teknologi Bandung (ITB)',
  'Institut Teknologi Sepuluh Nopember (ITS)',
  'Universitas Airlangga (UNAIR)',
  'Universitas Brawijaya (UB)',
  'UPN "Veteran" Jawa Timur',
  'UPN "Veteran" Yogyakarta',
  'UPN "Veteran" Jakarta',
  'Universitas Padjadjaran (UNPAD)',
  'Universitas Diponegoro (UNDIP)',
  'Universitas Sebelas Maret (UNS)',
  'Universitas Hasanuddin (UNHAS)',
  'Universitas Negeri Jakarta (UNJ)',
  'Universitas Negeri Yogyakarta (UNY)',
  'Universitas Negeri Semarang (UNNES)',
  'Universitas Negeri Surabaya (UNESA)',
  'Universitas Negeri Malang (UM)',
  'Universitas Sumatera Utara (USU)',
  'Universitas Andalas (UNAND)',
  'Universitas Sriwijaya (UNSRI)',
  'Universitas Udayana (UNUD)',
  'Universitas Pendidikan Indonesia (UPI)',
  'Universitas Syiah Kuala (USK)',
  'Universitas Mulawarman (UNMUL)',
  'Umum / Non-Mahasiswa'
];

export const AuthOnboarding: React.FC<AuthOnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'login' | 'avatar' | 'logistics'>('login');
  const [name, setName] = useState('');
  const [campus, setCampus] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<'cactus' | 'fern'>('fern');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [showCampusDropdown, setShowCampusDropdown] = useState(false);

  const handleSocialLogin = (platform: 'google' | 'tiktok') => {
    if (!name.trim()) {
      audioService.playClick();
      setError('Harap masukkan nama panggilan kamu terlebih dahulu.');
      return;
    }
    if (!campus) {
      audioService.playClick();
      setError('Harap pilih kampus atau kategori umum kamu.');
      return;
    }

    audioService.playCrystalDrop();
    // Simulate social API authentication
    setTimeout(() => {
      audioService.playLeafRustle();
      setStep('avatar');
      setError('');
    }, 800);
  };

  const handleSelectAvatar = (type: 'cactus' | 'fern') => {
    audioService.playClick();
    setSelectedAvatar(type);
  };

  const handleNextToLogistics = () => {
    audioService.playClick();
    setStep('logistics');
  };

  const handleSelectCampus = (option: string) => {
    audioService.playClick();
    setCampus(option);
    setShowCampusDropdown(false);
    setError('');
  };

  const handleFinishOnboarding = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !address) {
      audioService.playClick();
      setError('Harap isi nomor WhatsApp dan alamat penjemputan kamu.');
      return;
    }
    audioService.playWindJingle();
    onComplete(name, campus, selectedAvatar, phone, address);
  };

  return (
    <div className="min-h-full flex flex-col justify-between p-6 relative z-10 animate-fade-in overflow-y-auto no-scrollbar">
      
      {/* Decorative Flowers & Vines specifically for Auth/Onboarding */}
      <div className="absolute top-10 left-10 opacity-30 pointer-events-none">
        <svg width="60" height="60" viewBox="0 0 100 100" className="text-fresh-green">
          <path d="M0,50 Q30,20 50,80" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="30" cy="35" r="6" fill="#E897B4" />
        </svg>
      </div>

      {/* STEP 1: SOCIAL LOGIN + NAME & CAMPUS INPUT */}
      {step === 'login' && (
        <div className="flex-1 flex flex-col justify-between py-4">
          <div className="text-center mt-4">
            <span className="bg-fresh-pink/30 text-hot-pink text-[10px] font-sans uppercase tracking-widest px-3 py-1 rounded-full font-bold inline-flex items-center gap-1 mb-4">
              <Sparkles size={10} /> welcome to morphic.
            </span>
            <h1 className="font-serif text-5xl font-bold text-soldier-green tracking-tighter">
              morphic<span className="text-hot-pink">.</span>
            </h1>
            <p className="font-serif text-lg text-soldier-green font-medium italic mt-1">
              "Ubah Sisa Menjadi Jiwa."
            </p>
          </div>

          <div className="space-y-4 max-w-sm mx-auto w-full my-6">
            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="font-sans text-xs text-soldier-green uppercase tracking-widest font-bold flex items-center gap-1.5">
                <UserIcon size={12} /> nama panggilan
              </label>
              <input 
                type="text" 
                placeholder="tulis nama panggilanmu..."
                value={name}
                onChange={(e) => { setError(''); setName(e.target.value); }}
                className="w-full bg-white border border-soldier-green/20 rounded-2xl py-3.5 px-4 font-sans text-sm text-soldier-green placeholder-soldier-green/60 focus:outline-none focus:border-soldier-green transition-all shadow-sm"
              />
            </div>

            {/* Campus Selection Dropdown */}
            <div className="space-y-1.5 relative">
              <label className="font-sans text-xs text-soldier-green uppercase tracking-widest font-bold flex items-center gap-1.5">
                <GraduationCap size={12} /> pilih kampus kamu
              </label>
              <button
                type="button"
                onClick={() => {
                  audioService.playClick();
                  setShowCampusDropdown(!showCampusDropdown);
                }}
                className="w-full bg-white border border-soldier-green/20 rounded-2xl py-3.5 px-4 font-sans text-sm text-soldier-green flex justify-between items-center focus:outline-none focus:border-soldier-green transition-all text-left shadow-sm"
              >
                <span className={campus ? 'text-soldier-green font-medium' : 'text-soldier-green/60'}>
                  {campus || 'pilih universitas / umum...'}
                </span>
                <ChevronDown size={16} className="text-soldier-green" />
              </button>

              {showCampusDropdown && (
                <div className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-soldier-green/20 max-h-48 overflow-y-auto no-scrollbar animate-slide-up">
                  {CAMPUS_OPTIONS.map((option, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectCampus(option)}
                      className="w-full text-left px-4 py-3 font-sans text-xs text-soldier-green font-medium hover:bg-fresh-pink/20 transition-colors border-b border-soldier-green/10 last:border-none"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {error && (
              <p className="font-sans text-xs text-hot-pink text-center font-bold animate-pulse">
                {error}
              </p>
            )}

            <div className="pt-4 border-t border-soldier-green/20 space-y-3">
              <p className="font-sans text-[10px] text-center text-soldier-green uppercase tracking-widest font-bold">
                kemudian hubungkan akun sosialmu
              </p>
              
              {/* Google Login */}
              <button 
                onClick={() => handleSocialLogin('google')}
                className="w-full bg-white hover:bg-white/90 text-soldier-green font-sans text-sm font-bold lowercase tracking-widest py-3.5 px-6 rounded-full shadow-sm border border-soldier-green/20 flex items-center justify-center gap-3 transition-all active:scale-95"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.47 14.98 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.89 3.02C6.24 7.58 8.88 5.04 12 5.04z"/>
                  <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.27H12v4.51h6.46c-.29 1.48-1.14 2.73-2.44 3.6l3.78 2.93c2.21-3.44 3.49-7.77 3.49-11.04z"/>
                  <path fill="#FBBC05" d="M5.28 14.78c-.24-.72-.38-1.49-.38-2.28s.14-1.56.38-2.28L1.39 7.2C.5 8.97 0 10.93 0 13s.5 4.03 1.39 5.8l3.89-3.02z"/>
                  <path fill="#34A853" d="M12 23c3.24 0 5.97-1.08 7.96-2.91l-3.78-2.93c-1.1.74-2.51 1.18-4.18 1.18-3.12 0-5.76-2.54-6.71-5.54l-3.89 3.02C3.37 20.33 7.35 23 12 23z"/>
                </svg>
                masuk dengan google
              </button>

              {/* TikTok Login */}
              <button 
                onClick={() => handleSocialLogin('tiktok')}
                className="w-full bg-black text-white font-sans text-sm font-bold lowercase tracking-widest py-3.5 px-6 rounded-full shadow-md flex items-center justify-center gap-3 transition-all active:scale-95"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.61 4.17 1.12 1.24 2.69 1.99 4.31 2.13v3.88c-1.78-.03-3.51-.54-4.99-1.58-.17-.12-.33-.26-.49-.4-.06 2.85-.03 5.7-.05 8.56-.06 2.14-.67 4.29-1.91 5.96-1.62 2.28-4.37 3.58-7.16 3.28-2.78-.22-5.26-2.01-6.35-4.65-1.21-2.84-.63-6.34 1.43-8.58 1.64-1.82 4.11-2.67 6.51-2.23v3.93c-1.35-.34-2.84-.05-3.92.84-.99.79-1.38 2.19-1.01 3.41.35 1.27 1.54 2.18 2.86 2.16 1.52-.02 2.68-1.31 2.69-2.82-.01-5.32-.02-10.64-.02-15.97z"/>
                </svg>
                masuk dengan tiktok
              </button>
            </div>
          </div>

          <p className="font-sans text-[10px] text-center text-soldier-green/70 max-w-xs mx-auto leading-relaxed font-medium">
            Dengan masuk, kamu menyetujui Syarat Layanan dan Kebijakan Privasi morphic. dalam menjaga kelestarian bumi.
          </p>
        </div>
      )}

      {/* STEP 2: CHOOSE ECO-AVATAR */}
      {step === 'avatar' && (
        <div className="flex-1 flex flex-col justify-between py-4">
          <div className="text-center">
            <span className="bg-fresh-green/30 text-soldier-green text-[10px] font-sans uppercase tracking-widest px-3 py-1 rounded-full font-bold inline-flex items-center gap-1 mb-3">
              langkah 1 dari 2
            </span>
            <h2 className="font-serif text-3xl font-bold text-soldier-green">Pilih Eco-Avatar Kamu</h2>
            <p className="font-sans text-sm text-soldier-green/90 font-medium mt-1">
              Karakter benih digital ini akan tumbuh seiring kontribusi daur ulang nyatamu.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto w-full my-6">
            {/* Baby Cactus */}
            <button 
              type="button"
              onClick={() => handleSelectAvatar('cactus')}
              className={`rounded-3xl p-6 border-2 text-center transition-all relative overflow-hidden flex flex-col items-center justify-center ${
                selectedAvatar === 'cactus' 
                  ? 'bg-white border-fresh-pink shadow-md' 
                  : 'bg-white/40 border-transparent hover:bg-white/60'
              }`}
            >
              {selectedAvatar === 'cactus' && (
                <div className="absolute top-3 right-3 bg-fresh-pink text-soldier-green p-1 rounded-full">
                  <Check size={12} strokeWidth={3} />
                </div>
              )}
              <div className="w-20 h-24 flex items-center justify-center mb-4">
                <svg width="60" height="80" viewBox="0 0 60 80" className="text-soldier-green">
                  <path d="M30,80 L30,20 C30,20 30,10 20,10 C10,10 15,30 15,30 M30,40 L45,40 C45,40 55,40 55,30 C55,20 45,25 45,25" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="20" cy="10" r="4" fill="#E897B4" />
                  <circle cx="55" cy="30" r="3" fill="#E897B4" />
                </svg>
              </div>
              <h4 className="font-serif text-lg font-bold text-soldier-green">Baby Cactus</h4>
              <p className="font-sans text-[10px] text-soldier-green/80 font-bold mt-1">Tangguh & Minimalis</p>
            </button>

            {/* Little Fern */}
            <button 
              type="button"
              onClick={() => handleSelectAvatar('fern')}
              className={`rounded-3xl p-6 border-2 text-center transition-all relative overflow-hidden flex flex-col items-center justify-center ${
                selectedAvatar === 'fern' 
                  ? 'bg-white border-fresh-green shadow-md' 
                  : 'bg-white/40 border-transparent hover:bg-white/60'
              }`}
            >
              {selectedAvatar === 'fern' && (
                <div className="absolute top-3 right-3 bg-fresh-green text-soldier-green p-1 rounded-full">
                  <Check size={12} strokeWidth={3} />
                </div>
              )}
              <div className="w-20 h-24 flex items-center justify-center mb-4">
                <svg width="60" height="80" viewBox="0 0 60 80" className="text-soldier-green">
                  <path d="M30,80 C30,80 30,40 30,20 C30,10 15,5 15,5 C15,5 20,20 30,30 C40,20 45,5 45,5 C45,5 30,10 30,20" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="15" cy="5" r="4" fill="#E897B4" />
                  <circle cx="45" cy="5" r="4" fill="#E897B4" />
                </svg>
              </div>
              <h4 className="font-serif text-lg font-bold text-soldier-green">Little Fern</h4>
              <p className="font-sans text-[10px] text-soldier-green/80 font-bold mt-1">Anggun & Rimbun</p>
            </button>
          </div>

          <button 
            type="button"
            onClick={handleNextToLogistics}
            className="bg-soldier-green text-warm-fog py-4 px-8 rounded-full font-sans lowercase tracking-widest shadow-lg w-full max-w-sm mx-auto flex items-center justify-center gap-2 hover:bg-soldier-green/90 transition-all font-bold"
          >
            lanjutkan <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* STEP 3: LOGISTICS DATA */}
      {step === 'logistics' && (
        <form onSubmit={handleFinishOnboarding} className="flex-1 flex flex-col justify-between py-4">
          <div className="text-center">
            <span className="bg-fresh-pink/30 text-hot-pink text-[10px] font-sans uppercase tracking-widest px-3 py-1 rounded-full font-bold inline-flex items-center gap-1 mb-3">
              langkah 2 dari 2
            </span>
            <h2 className="font-serif text-3xl font-bold text-soldier-green">Data Logistik Kurir</h2>
            <p className="font-sans text-sm text-soldier-green/90 font-medium mt-1">
              Digunakan untuk rute penjemputan sampah kosmetik kosongmu.
            </p>
          </div>

          <div className="space-y-5 max-w-sm mx-auto w-full my-6">
            {/* WhatsApp Input */}
            <div className="space-y-1.5">
              <label className="font-sans text-xs text-soldier-green uppercase tracking-widest font-bold flex items-center gap-1.5">
                <Phone size={12} /> nomor whatsapp aktif
              </label>
              <input 
                type="tel" 
                placeholder="contoh: 08123456789"
                value={phone}
                onChange={(e) => { setError(''); setPhone(e.target.value); }}
                className="w-full bg-white border border-soldier-green/20 rounded-2xl py-3.5 px-4 font-sans text-sm text-soldier-green placeholder-soldier-green/60 focus:outline-none focus:border-soldier-green transition-all shadow-sm"
              />
            </div>

            {/* Address Input */}
            <div className="space-y-1.5">
              <label className="font-sans text-xs text-soldier-green uppercase tracking-widest font-bold flex items-center gap-1.5">
                <MapPin size={12} /> alamat rumah / kos
              </label>
              <textarea 
                placeholder="tulis alamat lengkap beserta patokan kos/rumah..."
                rows={3}
                value={address}
                onChange={(e) => { setError(''); setAddress(e.target.value); }}
                className="w-full bg-white border border-soldier-green/20 rounded-2xl py-3.5 px-4 font-sans text-sm text-soldier-green placeholder-soldier-green/60 focus:outline-none focus:border-soldier-green transition-all resize-none shadow-sm"
              />
            </div>

            {error && (
              <p className="font-sans text-xs text-hot-pink text-center font-bold animate-pulse">
                {error}
              </p>
            )}
          </div>

          <button 
            type="submit"
            className="bg-soldier-green text-warm-fog py-4 px-8 rounded-full font-sans lowercase tracking-widest shadow-lg w-full max-w-sm mx-auto flex items-center justify-center gap-2 hover:bg-soldier-green/90 transition-all font-bold"
          >
            mulai ubah sisa <Heart size={16} className="fill-current text-fresh-pink" />
          </button>
        </form>
      )}

    </div>
  );
};
