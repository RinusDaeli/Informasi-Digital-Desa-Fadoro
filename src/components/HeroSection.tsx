import React from 'react';
import { User, Megaphone, FileText, PieChart, PhoneCall, ArrowRight, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onOpenProfil: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenServiceModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenProfil,
  onNavigateSection,
  onOpenServiceModal,
}) => {
  return (
    <section className="relative bg-slate-900 overflow-hidden">
      {/* Hero Banner with Realistic Village Hall Backdrop Visual */}
      <div className="relative min-h-[440px] sm:min-h-[500px] flex items-center justify-center">
        {/* Background Atmosphere Image Simulation (Kantor Desa Fadoro) */}
        <div className="absolute inset-0 z-0">
          {/* Rich CSS/SVG architectural composition of Indonesian Kantor Desa */}
          <div className="w-full h-full bg-gradient-to-b from-sky-900/60 via-slate-900/80 to-slate-950 relative overflow-hidden">
            {/* Architectural office illustration */}
            <svg
              className="absolute inset-0 w-full h-full object-cover opacity-35"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 600"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0c4a6e" />
                  <stop offset="50%" stopColor="#1e3a8a" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <linearGradient id="roofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#7c2d12" />
                  <stop offset="100%" stopColor="#431407" />
                </linearGradient>
              </defs>
              <rect width="1200" height="600" fill="url(#skyGrad)" />
              {/* Mountain & hill skyline in Nias Barat */}
              <path d="M0 450 Q 200 320 400 400 T 800 360 T 1200 420 L 1200 600 L 0 600 Z" fill="#064e3b" opacity="0.6" />
              <path d="M0 480 Q 300 390 600 450 T 1200 440 L 1200 600 L 0 600 Z" fill="#047857" opacity="0.4" />
              
              {/* Indonesian Village Hall (Kantor Desa Fadoro) */}
              <g transform="translate(360, 240)">
                {/* Traditional Nias pitched roof */}
                <polygon points="240,10 50,110 430,110" fill="url(#roofGrad)" />
                <polygon points="240,0 230,15 250,15" fill="#f59e0b" />
                {/* Building facade */}
                <rect x="70" y="110" width="340" height="150" fill="#f8fafc" />
                <rect x="70" y="240" width="340" height="20" fill="#047857" />
                {/* Windows & Doors */}
                <rect x="100" y="140" width="60" height="70" fill="#0284c7" opacity="0.8" />
                <rect x="320" y="140" width="60" height="70" fill="#0284c7" opacity="0.8" />
                <rect x="210" y="130" width="60" height="130" fill="#78350f" />
                {/* Office Signboard */}
                <rect x="150" y="70" width="180" height="35" rx="4" fill="#ffffff" stroke="#047857" strokeWidth="2" />
                <text x="240" y="85" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                  KANTOR DESA FADORO
                </text>
                <text x="240" y="98" textAnchor="middle" fill="#334155" fontSize="7" fontWeight="bold" fontFamily="sans-serif">
                  KEC. SIROMBU - NIAS BARAT
                </text>
              </g>

              {/* Indonesian Flag Pole & Flag fluttering in wind */}
              <g transform="translate(680, 180)">
                <line x1="0" y1="0" x2="0" y2="280" stroke="#e2e8f0" strokeWidth="4" />
                {/* Red stripe */}
                <path d="M0,10 C 25,0 45,25 75,10 C 105,-5 125,20 150,10 L 150,45 C 125,55 105,30 75,45 C 45,60 25,35 0,45 Z" fill="#dc2626" />
                {/* White stripe */}
                <path d="M0,45 C 25,35 45,60 75,45 C 105,30 125,55 150,45 L 150,80 C 125,90 105,65 75,80 C 45,95 25,70 0,80 Z" fill="#ffffff" />
                {/* Golden finial */}
                <circle cx="0" cy="0" r="5" fill="#f59e0b" />
              </g>
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-slate-900/80 to-emerald-950/85" />
          </div>
        </div>

        {/* Hero Text Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs px-3.5 py-1.5 rounded-full mb-4 font-medium backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Portal Resmi Pemerintah Desa Fadoro · Nias Barat
          </div>

          <h2 className="text-sm sm:text-base tracking-widest uppercase font-semibold text-emerald-200 font-sans mb-1">
            Selamat Datang di Website Resmi
          </h2>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase font-sans mb-2 drop-shadow-sm">
            DESA FADORO
          </h1>

          <p className="text-base sm:text-xl text-emerald-100 font-medium mb-3">
            Kecamatan Sirombu, Kabupaten Nias Barat
          </p>

          <p className="text-xs sm:text-sm text-slate-300 italic max-w-2xl mx-auto mb-8 font-serif">
            "Media informasi dan pelayanan Pemerintah Desa Fadoro"
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onOpenProfil}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-lg flex items-center gap-2 transition-all shadow-lg hover:shadow-emerald-700/50 cursor-pointer uppercase tracking-wider"
            >
              <User className="w-4 h-4" />
              Profil Desa
            </button>

            <button
              onClick={() => onNavigateSection('pengumuman')}
              className="bg-white hover:bg-slate-100 text-emerald-900 font-bold text-xs sm:text-sm px-6 py-3 rounded-lg flex items-center gap-2 transition-all shadow-lg cursor-pointer uppercase tracking-wider"
            >
              <Megaphone className="w-4 h-4 text-emerald-700" />
              Pengumuman
            </button>
          </div>
        </div>
      </div>

      {/* 4 Quick Action Cards (Matching the Mockup Exactly) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Pengumuman */}
          <div
            onClick={() => onNavigateSection('pengumuman')}
            className="bg-[#059669] hover:bg-[#047857] text-white p-5 rounded-2xl shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer flex items-center gap-4 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Megaphone className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Pengumuman</h3>
              <p className="text-xs text-emerald-100 mt-1 leading-snug">
                Informasi terbaru dari desa
              </p>
            </div>
          </div>

          {/* Card 2: Pelayanan */}
          <div
            onClick={onOpenServiceModal}
            className="bg-[#0284C7] hover:bg-[#0369A1] text-white p-5 rounded-2xl shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer flex items-center gap-4 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Pelayanan</h3>
              <p className="text-xs text-sky-100 mt-1 leading-snug">
                Administrasi desa dan layanan masyarakat
              </p>
            </div>
          </div>

          {/* Card 3: Transparansi */}
          <div
            onClick={() => onNavigateSection('transparansi')}
            className="bg-[#D97706] hover:bg-[#B45309] text-white p-5 rounded-2xl shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer flex items-center gap-4 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <PieChart className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Transparansi</h3>
              <p className="text-xs text-amber-100 mt-1 leading-snug">
                APBDes & pembangunan desa
              </p>
            </div>
          </div>

          {/* Card 4: Kontak Desa */}
          <div
            onClick={() => onNavigateSection('kontak')}
            className="bg-[#0D9488] hover:bg-[#0F766E] text-white p-5 rounded-2xl shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer flex items-center gap-4 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <PhoneCall className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Kontak Desa</h3>
              <p className="text-xs text-teal-100 mt-1 leading-snug">
                Hubungi pemerintah desa
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
