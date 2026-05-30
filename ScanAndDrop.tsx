import React, { useState, useRef, useEffect } from 'react';
import { Camera, CheckCircle2, MapPin, Truck, AlertCircle, Loader2, Heart, Sparkles, ArrowRight, Navigation, MessageSquare, Phone, Star, ShieldCheck } from 'lucide-react';
import { analyzeCosmeticBottle } from '../services/geminiService';
import { ScanResult, User } from '../types';
import { audioService } from '../services/audioService';

interface ScanAndDropProps {
  user: User;
  onComplete: () => void;
  onAddTransaction: (points: number, type: 'ECO_BOX' | 'ECO_PICK') => void;
}

interface EcoBoxLocation {
  id: string;
  name: string;
  address: string;
  distance: string;
  slots: number;
  partnerBrand: 'Somethinc' | 'Skintific' | 'Wardah';
}

const MOCK_ECO_BOXES: EcoBoxLocation[] = [
  { 
    id: 'box1', 
    name: 'Morphic Box x Somethinc - UPN Veteran Jawa Timur', 
    address: 'Lobby Utama Gedung Kuliah Bersama (GKB) II, UPN "Veteran" Jawa Timur, Gunung Anyar, Surabaya', 
    distance: '0.4 km', 
    slots: 18,
    partnerBrand: 'Somethinc'
  },
  { 
    id: 'box2', 
    name: 'Morphic Box x Skintific - Kampus C UNAIR', 
    address: 'Pusat Kegiatan Mahasiswa (PKM) Kampus C Universitas Airlangga, Mulyorejo, Surabaya', 
    distance: '1.5 km', 
    slots: 12,
    partnerBrand: 'Skintific'
  },
  { 
    id: 'box3', 
    name: 'Morphic Box x Wardah - ITS Sukolilo', 
    address: 'Plaza Dr. Angka, Institut Teknologi Sepuluh Nopember (ITS), Sukolilo, Surabaya', 
    distance: '2.8 km', 
    slots: 25,
    partnerBrand: 'Wardah'
  },
  { 
    id: 'box4', 
    name: 'Morphic Box x Somethinc - Tunjungan Plaza 6', 
    address: 'Lantai 3, Depan Sociolla Store, Tunjungan Plaza 6, Tegalsari, Surabaya', 
    distance: '6.2 km', 
    slots: 40,
    partnerBrand: 'Somethinc'
  }
];

export const ScanAndDrop: React.FC<ScanAndDropProps> = ({ user, onComplete, onAddTransaction }) => {
  const [step, setStep] = useState<number | 'eco_box_map' | 'eco_pick_track'>(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [selectedBox, setSelectedBox] = useState<EcoBoxLocation>(MOCK_ECO_BOXES[0]);
  const [courierEta, setCourierEta] = useState(12); // minutes
  const [courierStatus, setCourierStatus] = useState<'heading' | 'arrived' | 'collected'>('heading');
  const [chatMessage, setChatMessage] = useState('Halo kak, saya Bambang kurir Morphic Surabaya. Sedang menuju ke lokasi kakak ya.');
  
  // Image previews for verification
  const [exteriorImage, setExteriorImage] = useState<string | null>(null);
  const [interiorImage, setInteriorImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const interiorFileInputRef = useRef<HTMLInputElement>(null);

  // Simulate courier movement and status updates
  useEffect(() => {
    if (step === 'eco_pick_track') {
      const interval = setInterval(() => {
        setCourierEta((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCourierStatus('arrived');
            setChatMessage('Saya sudah sampai di depan gerbang kos/rumah kakak ya. Mohon botolnya diserahkan.');
            audioService.playKalimbaChord();
            return 0;
          }
          return prev - 1;
        });
      }, 4000); // Speed up simulation for demo

      return () => clearInterval(interval);
    }
  }, [step]);

  const handleCaptureExterior = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    setStep(2); // Analyzing step

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setExteriorImage(base64);
      const result = await analyzeCosmeticBottle(base64);
      
      setScanResult(result);
      setIsAnalyzing(false);
      setStep(3); // Result & Interior photo step
    };
    reader.readAsDataURL(file);
  };

  const handleCaptureInteriorFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setInteriorImage(base64);
      audioService.playLeafRustle();
      setStep(4); // Proceed to logistics selection only after file is uploaded
    };
    reader.readAsDataURL(file);
  };

  const handleSelectEcoBox = () => {
    audioService.playClick();
    setStep('eco_box_map');
  };

  const handleSelectEcoPick = () => {
    audioService.playClick();
    setStep('eco_pick_track');
  };

  const handleConfirmDropoff = () => {
    audioService.playKalimbaChord();
    // Trigger real-time transaction addition with dynamic points from AI
    onAddTransaction(scanResult?.pointsEarned || 1500, 'ECO_BOX');
    setStep(5); // Success
  };

  const handleConfirmCollection = () => {
    audioService.playKalimbaChord();
    setCourierStatus('collected');
    // Trigger real-time transaction addition with dynamic points from AI
    onAddTransaction(scanResult?.pointsEarned || 1500, 'ECO_PICK');
    setTimeout(() => {
      setStep(5); // Success
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-warm-fog pt-12 px-6 pb-24 animate-slide-up relative">
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

      {step !== 5 && step !== 'eco_box_map' && step !== 'eco_pick_track' && (
        <h1 className="font-serif text-3xl font-bold text-soldier-green mb-2 relative z-10">Scan & Drop</h1>
      )}
      
      {step === 1 && (
        <div className="flex flex-col items-center justify-center h-[60vh] relative z-10">
          <div className="w-full max-w-sm aspect-[3/4] bg-white/80 rounded-3xl border-2 border-dashed border-soldier-green/30 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden shadow-sm">
            <Camera size={48} className="text-soldier-green mb-4" />
            <h3 className="font-serif text-xl text-soldier-green font-bold mb-2">Foto Botol Kosong</h3>
            <p className="font-sans text-sm text-soldier-green font-bold mb-8">Pastikan merek dan bentuk botol terlihat jelas untuk dianalisis oleh AI.</p>
            
            <input 
              type="file" 
              accept="image/*" 
              capture="environment" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleCaptureExterior}
            />
            <button 
              onClick={() => {
                audioService.playClick();
                fileInputRef.current?.click();
              }}
              className="bg-soldier-green text-warm-fog px-8 py-4 rounded-full font-sans lowercase tracking-widest shadow-lg w-full font-bold"
            >
              buka kamera
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center relative z-10">
          <Loader2 size={48} className="text-fresh-pink animate-spin mb-6" />
          <h3 className="font-serif text-2xl text-soldier-green font-bold mb-2">AI sedang menganalisis...</h3>
          <p className="font-sans text-sm text-soldier-green font-bold">Mencocokkan material dengan database global.</p>
        </div>
      )}

      {step === 3 && scanResult && (
        <div className="animate-fade-in relative z-10">
          <div className="bg-white/80 rounded-3xl p-6 mb-6 border border-white shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-sans text-xs text-soldier-green uppercase tracking-widest mb-1 font-bold">{scanResult.brand}</p>
                <h3 className="font-serif text-xl text-soldier-green font-bold leading-tight">{scanResult.productName}</h3>
              </div>
              <div className="bg-fresh-green text-soldier-green px-3 py-1.5 rounded-full font-sans text-xs font-bold shadow-sm whitespace-nowrap">
                +{scanResult.pointsEarned.toLocaleString('id-ID')} Poin
              </div>
            </div>
            <div className="bg-soldier-green/10 rounded-xl p-3 flex items-center">
              <AlertCircle size={16} className="text-soldier-green mr-2" />
              <p className="font-sans text-xs text-soldier-green font-bold">Material terdeteksi: <span className="font-bold">{scanResult.material}</span></p>
            </div>
          </div>

          <div className="bg-fresh-pink/20 rounded-3xl p-6 border border-fresh-pink/40 text-center">
            <h3 className="font-serif text-xl text-soldier-green font-bold mb-2">Verifikasi Anti-Kecurangan</h3>
            <p className="font-sans text-sm text-soldier-green font-medium mb-6">Ambil foto bagian dalam botol untuk memastikan sudah dibilas dan kosong.</p>
            
            {/* Hidden File Input for Interior Photo */}
            <input 
              type="file" 
              accept="image/*" 
              capture="environment" 
              className="hidden" 
              ref={interiorFileInputRef}
              onChange={handleCaptureInteriorFile}
            />

            <button 
              onClick={() => {
                audioService.playClick();
                interiorFileInputRef.current?.click();
              }}
              className="bg-soldier-green text-warm-fog px-8 py-4 rounded-full font-sans lowercase tracking-widest shadow-lg w-full flex justify-center items-center font-bold"
            >
              <Camera size={18} className="mr-2" /> foto bagian dalam
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="animate-fade-in relative z-10">
          <h3 className="font-serif text-2xl text-soldier-green font-bold mb-6">Pilih Metode Penyetoran</h3>
          
          <div className="space-y-4">
            {/* Eco-Box */}
            <button onClick={handleSelectEcoBox} className="w-full bg-white/80 rounded-3xl p-6 border border-white text-left flex items-center transition-transform active:scale-95 shadow-sm">
              <div className="w-12 h-12 bg-fresh-green/40 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <MapPin className="text-soldier-green" />
              </div>
              <div className="flex-1">
                <h4 className="font-serif text-lg text-soldier-green font-bold">Eco-Box Drop-off</h4>
                <p className="font-sans text-xs text-soldier-green font-bold">Setor ke kotak terdekat di mal/kampus Surabaya.</p>
              </div>
              <ChevronRight size={20} className="text-soldier-green" />
            </button>

            {/* Eco-Pick (Locked logic) */}
            <button 
              onClick={handleSelectEcoPick}
              className="w-full bg-white/80 rounded-3xl p-6 border border-white text-left flex items-center transition-transform active:scale-95 shadow-sm"
            >
              <div className="w-12 h-12 bg-soldier-green/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <Truck className="text-soldier-green" />
              </div>
              <div className="flex-1">
                <h4 className="font-serif text-lg text-soldier-green font-bold">Eco-Pick Kurir</h4>
                <p className="font-sans text-xs text-soldier-green font-bold">
                  Jemput di alamatmu oleh kurir khusus.
                </p>
              </div>
              <ChevronRight size={20} className="text-soldier-green" />
            </button>
          </div>
        </div>
      )}

      {/* ECO-BOX DROP-OFF MAP VIEW */}
      {step === 'eco_box_map' && (
        <div className="animate-fade-in relative z-10">
          <h2 className="font-serif text-2xl text-soldier-green font-bold mb-2">Lokasi Eco-Box Surabaya</h2>
          <p className="font-sans text-xs text-soldier-green font-bold mb-6">Pilih lokasi kotak fisik Morphic hasil kolaborasi dengan brand kosmetik favoritmu.</p>

          {/* Simulated Map Graphic */}
          <div className="w-full h-48 bg-gradient-to-br from-fresh-green/20 via-warm-fog to-fresh-pink/20 rounded-3xl border border-white shadow-inner relative overflow-hidden mb-6">
            {/* Simulated Roads */}
            <div className="absolute top-1/2 left-0 right-0 h-4 bg-white/60 transform -translate-y-1/2"></div>
            <div className="absolute left-1/3 top-0 bottom-0 w-4 bg-white/60"></div>
            <div className="absolute left-2/3 top-0 bottom-0 w-4 bg-white/60"></div>

            {/* User Location Pin */}
            <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-4 h-4 bg-soldier-green rounded-full border-2 border-white animate-ping absolute"></div>
              <div className="w-4 h-4 bg-soldier-green rounded-full border-2 border-white relative z-10"></div>
              <span className="bg-soldier-green text-warm-fog text-[8px] font-sans font-bold px-1.5 py-0.5 rounded-md mt-1 shadow-sm">Lokasimu</span>
            </div>

            {/* Eco-Box Pins */}
            {MOCK_ECO_BOXES.map((box, idx) => {
              const isSelected = selectedBox.id === box.id;
              const positions = [
                { top: '25%', left: '60%' },
                { top: '70%', left: '45%' },
                { top: '40%', left: '80%' },
                { top: '15%', left: '85%' }
              ];
              return (
                <button
                  key={box.id}
                  onClick={() => {
                    audioService.playClick();
                    setSelectedBox(box);
                  }}
                  style={positions[idx]}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-transform active:scale-95"
                >
                  <MapPin size={isSelected ? 28 : 20} className={isSelected ? 'text-hot-pink' : 'text-soldier-green'} />
                  <span className={`text-[8px] font-sans font-bold px-1.5 py-0.5 rounded-md mt-0.5 shadow-sm ${
                    isSelected ? 'bg-hot-pink text-white' : 'bg-white text-soldier-green'
                  }`}>
                    {box.distance}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Location Details */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-white shadow-sm mb-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="bg-fresh-pink/30 text-hot-pink text-[9px] font-sans uppercase tracking-widest px-2 py-0.5 rounded-full font-bold">
                    Partner: {selectedBox.partnerBrand}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-soldier-green leading-tight">{selectedBox.name}</h3>
                <p className="font-sans text-xs text-soldier-green font-bold mt-1 flex items-center gap-1">
                  <Navigation size={12} className="text-hot-pink" /> {selectedBox.distance} dari lokasimu
                </p>
              </div>
              <span className="bg-fresh-green/30 text-soldier-green font-sans text-[10px] font-bold px-2.5 py-1 rounded-full">
                {selectedBox.slots} slot kosong
              </span>
            </div>
            <p className="font-sans text-xs text-soldier-green font-bold leading-relaxed mb-4">{selectedBox.address}</p>
            
            <button 
              onClick={handleConfirmDropoff}
              className="w-full bg-soldier-green text-warm-fog py-3.5 rounded-full font-sans text-xs font-bold lowercase tracking-widest shadow-md hover:bg-soldier-green/90 transition-all"
            >
              konfirmasi setor di sini
            </button>
          </div>

          {/* Location List */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-soldier-green uppercase tracking-wider">Daftar Lokasi Lainnya</h4>
            {MOCK_ECO_BOXES.map((box) => (
              <button
                key={box.id}
                onClick={() => {
                  audioService.playClick();
                  setSelectedBox(box);
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex justify-between items-center ${
                  selectedBox.id === box.id 
                    ? 'bg-white border-fresh-pink shadow-sm' 
                    : 'bg-white/40 border-transparent hover:bg-white/60'
                }`}
              >
                <div>
                  <h5 className="font-serif text-sm font-bold text-soldier-green">{box.name}</h5>
                  <p className="font-sans text-[10px] text-soldier-green/70 font-bold mt-0.5">{box.distance} • {box.slots} slot tersedia</p>
                </div>
                <ChevronRight size={16} className="text-soldier-green/50" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ECO-PICK COURIER LIVE TRACKING VIEW */}
      {step === 'eco_pick_track' && (
        <div className="animate-fade-in relative z-10">
          <h2 className="font-serif text-2xl text-soldier-green font-bold mb-2">Pelacakan Penjemputan</h2>
          <p className="font-sans text-xs text-soldier-green font-bold mb-6">Kurir khusus Morphic sedang menuju ke alamatmu.</p>

          {/* Simulated Live Map Route */}
          <div className="w-full h-56 bg-gradient-to-br from-fresh-green/20 via-warm-fog to-fresh-pink/20 rounded-3xl border border-white shadow-inner relative overflow-hidden mb-6">
            {/* Simulated Roads */}
            <div className="absolute top-1/2 left-0 right-0 h-4 bg-white/60 transform -translate-y-1/2"></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-4 bg-white/60"></div>

            {/* User Destination Pin */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-4 h-4 bg-hot-pink rounded-full border-2 border-white animate-ping absolute"></div>
              <div className="w-4 h-4 bg-hot-pink rounded-full border-2 border-white relative z-10"></div>
              <span className="bg-hot-pink text-white text-[8px] font-sans font-bold px-1.5 py-0.5 rounded-md mt-1 shadow-sm">Alamatmu</span>
            </div>

            {/* Courier Moving Pin */}
            <div 
              className="absolute flex flex-col items-center transition-all duration-1000"
              style={{
                top: courierStatus === 'heading' ? '20%' : '45%',
                left: courierStatus === 'heading' ? '20%' : '45%',
              }}
            >
              <div className="w-10 h-10 bg-soldier-green rounded-full border-2 border-white flex items-center justify-center shadow-md">
                <Truck size={18} className="text-warm-fog" />
              </div>
              <span className="bg-soldier-green text-warm-fog text-[8px] font-sans font-bold px-1.5 py-0.5 rounded-md mt-1 shadow-sm">Pak Bambang</span>
            </div>
          </div>

          {/* Courier Profile & ETA Card */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-white shadow-sm mb-6">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-soldier-green/10">
              <div>
                <p className="font-sans text-[10px] text-soldier-green uppercase tracking-widest font-bold">estimasi kedatangan</p>
                <h3 className="font-serif text-3xl font-bold text-soldier-green">
                  {courierStatus === 'heading' ? `${courierEta} Menit` : 'Kurir Tiba!'}
                </h3>
              </div>
              <span className="bg-fresh-pink/30 text-hot-pink font-sans text-[10px] font-bold px-3 py-1.5 rounded-full animate-pulse">
                {courierStatus === 'heading' ? 'sedang jalan' : 'menunggu penyerahan'}
              </span>
            </div>

            {/* Courier Info */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-soldier-green/10 flex items-center justify-center font-serif text-xl font-bold text-soldier-green border border-soldier-green/20">
                  B
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-soldier-green">Bambang Pamungkas</h4>
                  <p className="font-sans text-[10px] text-soldier-green/70 font-bold flex items-center gap-1">
                    <Star size={10} className="text-yellow-500 fill-yellow-500" /> 4.9 • Honda Beat (B 4321 MRF)
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="w-10 h-10 bg-fresh-green/30 text-soldier-green rounded-full flex items-center justify-center hover:bg-fresh-green/40 transition-all">
                  <Phone size={16} />
                </button>
                <button className="w-10 h-10 bg-fresh-pink/30 text-hot-pink rounded-full flex items-center justify-center hover:bg-fresh-pink/40 transition-all">
                  <MessageSquare size={16} />
                </button>
              </div>
            </div>

            {/* Live Chat Simulation Bubble */}
            <div className="bg-soldier-green/5 rounded-2xl p-4 border border-soldier-green/10 mb-6">
              <p className="font-sans text-[10px] text-soldier-green/60 uppercase tracking-widest font-bold mb-1">pesan kurir</p>
              <p className="font-sans text-xs text-soldier-green font-bold leading-relaxed">"{chatMessage}"</p>
            </div>

            {/* Action Button */}
            {courierStatus === 'arrived' ? (
              <button 
                onClick={handleConfirmCollection}
                className="w-full bg-soldier-green text-warm-fog py-4 rounded-full font-sans text-xs font-bold lowercase tracking-widest shadow-md hover:bg-soldier-green/90 transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck size={16} /> serahkan botol ke kurir
              </button>
            ) : (
              <div className="text-center py-2">
                <p className="font-sans text-[10px] text-soldier-green/60 font-bold animate-pulse">
                  Menunggu kurir sampai di lokasimu...
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 5: TOUCHING SUCCESS NOTIFICATION */}
      {step === 5 && (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center animate-slide-up relative z-10 px-2">
          
          {/* Aesthetic Blooming Flower & Heart Container */}
          <div className="relative mb-8">
            <div className="w-28 h-28 bg-gradient-to-tr from-fresh-green via-fresh-pink to-hot-pink rounded-full flex items-center justify-center shadow-xl animate-pulse-slow">
              <Heart size={44} className="text-white fill-white animate-bounce" />
            </div>
            
            {/* Floating Petals around the success badge */}
            <div className="absolute -top-2 -right-2 animate-ping">
              <Sparkles size={20} className="text-hot-pink" />
            </div>
            <div className="absolute -bottom-2 -left-2">
              <svg width="24" height="24" viewBox="0 0 24 24" className="text-fresh-green animate-spin-slow">
                <circle cx="12" cy="12" r="5" fill="currentColor" />
                <circle cx="12" cy="5" r="3" fill="currentColor" />
                <circle cx="12" cy="19" r="3" fill="currentColor" />
                <circle cx="5" cy="12" r="3" fill="currentColor" />
                <circle cx="19" cy="12" r="3" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* Poetic & Touching Message Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-[32px] p-8 border border-white shadow-lg max-w-sm w-full relative overflow-hidden mb-8">
            {/* Subtle background vine inside card */}
            <div className="absolute -right-6 -bottom-6 opacity-20 text-fresh-green pointer-events-none">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                <path d="M0,100 Q50,70 100,100" stroke="currentColor" strokeWidth="3" />
                <circle cx="50" cy="80" r="8" fill="#E897B4" />
              </svg>
            </div>

            <span className="bg-fresh-pink/30 text-hot-pink text-[9px] font-sans uppercase tracking-widest px-3 py-1 rounded-full font-bold inline-flex items-center gap-1 mb-4">
              <Sparkles size={8} /> terima kasih, jiwa baik
            </span>
            
            <h2 className="font-serif text-3xl text-soldier-green font-bold leading-tight mb-4">
              Satu Sisa Telah<br/>
              <span className="text-hot-pink italic">Menemukan Jiwanya.</span>
            </h2>
            
            <p className="font-sans text-xs text-soldier-green font-bold leading-relaxed mb-6">
              Setiap kemasan kosong yang kamu bilas dan kirimkan bukan lagi sekadar sampah. Hari ini, kamu telah mencegah plastik ini meracuni bumi kita tercinta. Kamu telah memberikan napas baru, kehidupan baru, dan jiwa baru bagi alam.
            </p>

            <div className="bg-fresh-green/20 rounded-2xl p-4 border border-fresh-green/30">
              <p className="font-sans text-[11px] text-soldier-green font-bold leading-relaxed">
                Langkah kecilmu hari ini setara dengan memberikan <span className="font-bold text-soldier-green">napas segar bagi 1 tunas pohon selama 30 hari</span>.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-soldier-green/10 flex justify-between items-center">
              <div className="text-left">
                <p className="font-sans text-[9px] text-soldier-green font-bold uppercase tracking-widest">estimasi saldo</p>
                <p className="font-serif text-lg font-bold text-soldier-green">{(scanResult?.pointsEarned || 1500).toLocaleString('id-ID')} Poin</p>
              </div>
              <span className="bg-fresh-pink/20 text-hot-pink font-sans text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold">
                status: pending
              </span>
            </div>
          </div>

          {/* Return Home Button */}
          <button 
            onClick={() => {
              audioService.playClick();
              onComplete();
            }}
            className="bg-soldier-green text-warm-fog py-4 px-8 rounded-full font-sans lowercase tracking-widest shadow-lg w-full max-w-xs flex items-center justify-center gap-2 hover:bg-soldier-green/90 transition-all active:scale-95 font-bold"
          >
            kembali ke rumah <ArrowRight size={16} />
          </button>

        </div>
      )}
    </div>
  );
};

const ChevronRight: React.FC<{size: number, className: string}> = ({size, className}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);
