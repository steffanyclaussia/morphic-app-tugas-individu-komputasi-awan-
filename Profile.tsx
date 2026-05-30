import React, { useState, useRef } from 'react';
import { User, Transaction } from '../types';
import { Clock, CheckCircle2, Camera, Sparkles, Phone, MapPin, Edit3, Check, Award, ShieldCheck, GraduationCap, ChevronDown } from 'lucide-react';
import { audioService } from '../services/audioService';

interface ProfileProps {
  user: User;
  onUpdateUser: React.Dispatch<React.SetStateAction<User>>;
  transactions: Transaction[];
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

export const Profile: React.FC<ProfileProps> = ({ user, onUpdateUser, transactions }) => {
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'APPROVED'>('ALL');
  const [isEditing, setIsEditing] = useState(false);
  const [phoneInput, setPhoneInput] = useState(user.phone || '');
  const [addressInput, setAddressInput] = useState(user.address || '');
  const [campusInput, setCampusInput] = useState(user.campus || '');
  const [showCampusDropdown, setShowCampusDropdown] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const filteredTx = transactions.filter(tx => filter === 'ALL' || tx.status === filter);

  // Handle Profile Picture Upload
  const handleProfilePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    audioService.playCrystalDrop();
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      onUpdateUser(prev => ({
        ...prev,
        profilePicture: base64
      }));
      audioService.playLeafRustle();
    };
    reader.readAsDataURL(file);
  };

  // Handle Save Logistics Data
  const handleSaveLogistics = () => {
    audioService.playWindJingle();
    onUpdateUser(prev => ({
      ...prev,
      phone: phoneInput,
      address: addressInput,
      campus: campusInput
    }));
    setIsEditing(false);
  };

  const handleToggleEdit = () => {
    audioService.playClick();
    setIsEditing(!isEditing);
  };

  const handleSelectCampus = (option: string) => {
    audioService.playClick();
    setCampusInput(option);
    setShowCampusDropdown(false);
  };

  return (
    <div className="pt-12 px-6 pb-24 animate-fade-in relative">
      
      {/* Decorative Flowers */}
      <div className="absolute top-12 right-6 opacity-40 pointer-events-none">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-fresh-pink">
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="5" r="3" />
          <circle cx="12" cy="19" r="3" />
          <circle cx="5" cy="12" r="3" />
          <circle cx="19" cy="12" r="3" />
        </svg>
      </div>

      {/* Header & Profile Picture Upload */}
      <header className="flex flex-col items-center text-center mb-8 relative z-10">
        <div className="relative mb-4">
          {/* Profile Picture Frame with Fresh Gradient */}
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-fresh-green via-fresh-pink to-hot-pink p-1 shadow-lg relative">
            <div className="w-full h-full rounded-full bg-warm-fog overflow-hidden flex items-center justify-center">
              {user.profilePicture ? (
                <img src={user.profilePicture} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span className="font-serif text-5xl font-bold text-soldier-green">{user.name.charAt(0)}</span>
              )}
            </div>
          </div>
          
          {/* Hidden File Input */}
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handleProfilePicUpload} 
            className="hidden" 
          />
          
          {/* Camera Trigger Button */}
          <button 
            onClick={() => {
              audioService.playClick();
              fileInputRef.current?.click();
            }}
            className="absolute bottom-0 right-0 bg-soldier-green text-warm-fog p-2.5 rounded-full shadow-md hover:bg-soldier-green/90 transition-all active:scale-95 border-2 border-white"
          >
            <Camera size={16} />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="bg-fresh-pink/30 text-hot-pink text-[10px] font-sans uppercase tracking-widest px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
              <Sparkles size={10} /> {user.title}
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-soldier-green">{user.name}</h1>
          <p className="font-sans text-xs text-soldier-green font-bold mt-0.5 flex items-center gap-1">
            <GraduationCap size={12} className="text-soldier-green" /> {user.campus || 'Umum'}
          </p>
        </div>
      </header>

      {/* Morphic Eco-ID Card & Level Progress */}
      <section className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-white shadow-sm mb-6 relative z-10 overflow-hidden">
        <div className="absolute -right-8 -top-8 w-24 h-24 bg-fresh-pink/10 rounded-full blur-xl"></div>
        
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-serif text-lg font-bold text-soldier-green flex items-center gap-1.5">
            <Award size={18} className="text-hot-pink" /> Level {user.level} Progress
          </h4>
          <span className="font-sans text-xs text-soldier-green font-bold">75%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-soldier-green/10 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-gradient-to-r from-fresh-green to-fresh-pink rounded-full" style={{ width: '75%' }}></div>
        </div>
        <p className="font-sans text-[11px] text-soldier-green font-medium leading-relaxed">
          Kumpulkan <span className="font-bold text-hot-pink">2.500 Poin</span> lagi untuk naik ke <span className="font-bold">Level 4: Eco-Guardian</span>!
        </p>
      </section>

      {/* Eco-Badges Gallery */}
      <section className="mb-8 relative z-10">
        <h3 className="font-serif text-xl text-soldier-green mb-4 flex items-center gap-2">
          <ShieldCheck size={20} className="text-fresh-green" /> Lencana Penghargaan
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <BadgeCard title="Zero Waste" desc="Setor 10+ botol" active icon="🌱" />
          <BadgeCard title="Beauty Savior" desc="Daur ulang akrilik" active icon="✨" />
          <BadgeCard title="Forest Friend" desc="Cegah 5kg CO2" icon="🌸" />
        </div>
      </section>

      {/* Logistics & Address Management */}
      <section className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-white shadow-sm mb-8 relative z-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-serif text-lg font-bold text-soldier-green flex items-center gap-2">
            <MapPin size={18} className="text-soldier-green" /> Data Logistik Kurir
          </h3>
          <button 
            onClick={isEditing ? handleSaveLogistics : handleToggleEdit}
            className="text-soldier-green hover:text-soldier-green flex items-center gap-1 font-sans text-xs font-bold lowercase tracking-wider"
          >
            {isEditing ? (
              <span className="flex items-center gap-1 text-hot-pink"><Check size={14} /> simpan</span>
            ) : (
              <span className="flex items-center gap-1"><Edit3 size={14} /> edit</span>
            )}
          </button>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            {/* Campus Edit */}
            <div className="space-y-1 relative">
              <label className="font-sans text-[10px] text-soldier-green uppercase tracking-widest font-bold flex items-center gap-1">
                <GraduationCap size={10} /> kampus
              </label>
              <button
                type="button"
                onClick={() => {
                  audioService.playClick();
                  setShowCampusDropdown(!showCampusDropdown);
                }}
                className="w-full bg-white border border-soldier-green/20 rounded-xl py-2 px-3 font-sans text-xs text-soldier-green flex justify-between items-center text-left"
              >
                <span className="font-medium">{campusInput || 'Pilih kampus...'}</span>
                <ChevronDown size={14} className="text-soldier-green" />
              </button>

              {showCampusDropdown && (
                <div className="absolute z-50 left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-soldier-green/20 max-h-36 overflow-y-auto no-scrollbar">
                  {CAMPUS_OPTIONS.map((option, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectCampus(option)}
                      className="w-full text-left px-3 py-2 font-sans text-xs text-soldier-green font-medium hover:bg-fresh-pink/20 transition-colors border-b border-soldier-green/10 last:border-none"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Phone Edit */}
            <div className="space-y-1">
              <label className="font-sans text-[10px] text-soldier-green uppercase tracking-widest font-bold flex items-center gap-1">
                <Phone size={10} /> whatsapp
              </label>
              <input 
                type="tel" 
                value={phoneInput} 
                onChange={(e) => setPhoneInput(e.target.value)}
                className="w-full bg-white border border-soldier-green/20 rounded-xl py-2 px-3 font-sans text-xs text-soldier-green focus:outline-none focus:border-soldier-green"
              />
            </div>

            {/* Address Edit */}
            <div className="space-y-1">
              <label className="font-sans text-[10px] text-soldier-green uppercase tracking-widest font-bold flex items-center gap-1">
                <MapPin size={10} /> alamat penjemputan
              </label>
              <textarea 
                value={addressInput} 
                onChange={(e) => setAddressInput(e.target.value)}
                rows={2}
                className="w-full bg-white border border-soldier-green/20 rounded-xl py-2 px-3 font-sans text-xs text-soldier-green focus:outline-none focus:border-soldier-green resize-none"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-soldier-green font-medium">
              <GraduationCap size={14} className="text-soldier-green" />
              <span className="font-sans text-xs">{user.campus || 'Umum'}</span>
            </div>
            <div className="flex items-center gap-3 text-soldier-green font-medium">
              <Phone size={14} className="text-soldier-green" />
              <span className="font-sans text-xs">{user.phone || 'Belum diatur'}</span>
            </div>
            <div className="flex items-start gap-3 text-soldier-green font-medium">
              <MapPin size={14} className="text-soldier-green mt-0.5" />
              <span className="font-sans text-xs leading-relaxed">{user.address || 'Belum diatur'}</span>
            </div>
          </div>
        )}
      </section>

      {/* Transaction History Section */}
      <div className="relative z-10">
        <h3 className="font-serif text-xl text-soldier-green mb-4">Riwayat Transaksi</h3>
        
        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6">
          <FilterBtn label="Semua" active={filter === 'ALL'} onClick={() => setFilter('ALL')} />
          <FilterBtn label="Pending" active={filter === 'PENDING'} onClick={() => setFilter('PENDING')} />
          <FilterBtn label="Selesai" active={filter === 'APPROVED'} onClick={() => setFilter('APPROVED')} />
        </div>

        {/* Transaction List */}
        <div className="space-y-3">
          {filteredTx.map(tx => (
            <div key={tx.id} className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-white shadow-sm flex items-center justify-between transition-all hover:bg-white/90">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                  tx.status === 'PENDING' ? 'bg-fresh-pink/30 text-hot-pink' : 'bg-fresh-green/40 text-soldier-green'
                }`}>
                  {tx.status === 'PENDING' ? <Clock size={20} /> : <CheckCircle2 size={20} />}
                </div>
                <div>
                  <h4 className="font-serif text-lg text-soldier-green font-bold leading-tight">
                    {tx.type === 'ECO_BOX' ? 'Drop-off Box' : 'Kurir Jemput'}
                  </h4>
                  <p className="font-sans text-xs text-soldier-green font-medium">{tx.date} • {tx.items} botol</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-sans text-sm font-bold ${tx.status === 'PENDING' ? 'text-hot-pink' : 'text-soldier-green'}`}>
                  +{tx.pointsEarned.toLocaleString('id-ID')} Poin
                </p>
                <span className={`inline-block font-sans text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full mt-1 font-bold ${
                  tx.status === 'PENDING' ? 'bg-fresh-pink/20 text-hot-pink' : 'bg-fresh-green/30 text-soldier-green'
                }`}>
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FilterBtn: React.FC<{label: string, active: boolean, onClick: () => void}> = ({label, active, onClick}) => (
  <button 
    onClick={() => {
      audioService.playClick();
      onClick();
    }}
    className={`px-4 py-2 rounded-full font-sans text-xs transition-all ${
      active 
        ? 'bg-soldier-green text-warm-fog shadow-sm font-bold' 
        : 'bg-white/80 text-soldier-green border border-soldier-green/20 hover:bg-white/90 font-bold'
    }`}
  >
    {label}
  </button>
);

const BadgeCard: React.FC<{ title: string, desc: string, active?: boolean, icon: string }> = ({ title, desc, active, icon }) => (
  <div className={`rounded-2xl p-3 text-center border flex flex-col items-center justify-center transition-all ${
    active 
      ? 'bg-white/90 border-fresh-pink/30 shadow-sm' 
      : 'bg-black/5 border-transparent opacity-40'
  }`}>
    <span className="text-2xl mb-1.5">{icon}</span>
    <h5 className="font-serif text-xs font-bold text-soldier-green leading-tight">{title}</h5>
    <p className="font-sans text-[8px] text-soldier-green font-bold mt-0.5 leading-tight">{desc}</p>
  </div>
);
