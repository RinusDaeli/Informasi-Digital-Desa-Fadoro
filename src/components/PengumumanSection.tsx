import React from 'react';
import { Megaphone, Calendar, ArrowRight, MapPin } from 'lucide-react';
import { Announcement } from '../types';

interface PengumumanSectionProps {
  announcements: Announcement[];
  onSelectAnnouncement: (item: Announcement) => void;
  onViewAll: () => void;
}

export const PengumumanSection: React.FC<PengumumanSectionProps> = ({
  announcements,
  onSelectAnnouncement,
  onViewAll,
}) => {
  return (
    <section id="pengumuman" className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Megaphone className="w-5 h-5 text-emerald-700" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-slate-900 font-sans">
              Pengumuman Terbaru
            </h2>
          </div>

          <button
            onClick={onViewAll}
            className="text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5 transition-colors group cursor-pointer"
          >
            <span>Lihat Semua</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 2-Column Grid Matching the Reference Mockup */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {announcements.slice(0, 2).map((item, idx) => (
            <div
              key={item.id}
              onClick={() => onSelectAnnouncement(item)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer flex flex-col sm:flex-row"
            >
              {/* Thumbnail Container */}
              <div className="sm:w-48 h-40 sm:h-auto bg-slate-800 relative overflow-hidden shrink-0">
                {/* SVG/CSS Artistic Representative Thumbnail */}
                <div className={`w-full h-full flex items-center justify-center ${
                  idx === 0 ? 'bg-gradient-to-br from-emerald-800 to-teal-950' : 'bg-gradient-to-br from-blue-900 to-slate-900'
                }`}>
                  <svg className="w-full h-full opacity-60" viewBox="0 0 200 150">
                    <rect width="200" height="150" fill="none" />
                    {idx === 0 ? (
                      // Gotong royong motif
                      <g fill="#10b981">
                        <circle cx="60" cy="50" r="14" />
                        <path d="M40 85 C40 70 80 70 80 85 L80 110 L40 110 Z" />
                        <circle cx="110" cy="45" r="14" fill="#34d399" />
                        <path d="M90 80 C90 65 130 65 130 80 L130 110 L90 110 Z" fill="#34d399" />
                        <circle cx="155" cy="55" r="12" />
                        <path d="M140 90 C140 75 170 75 170 90 L170 110 L140 110 Z" />
                        <rect x="20" y="110" width="160" height="8" rx="4" fill="#047857" />
                      </g>
                    ) : (
                      // Musyawarah Desa motif
                      <g fill="#38bdf8">
                        <rect x="40" y="40" width="120" height="70" rx="6" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
                        <rect x="55" y="55" width="90" height="6" rx="2" fill="#38bdf8" />
                        <rect x="55" y="70" width="70" height="6" rx="2" fill="#94a3b8" />
                        <rect x="55" y="85" width="80" height="6" rx="2" fill="#94a3b8" />
                        <circle cx="100" cy="25" r="10" fill="#f59e0b" />
                      </g>
                    )}
                  </svg>
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                <div className="absolute top-2.5 left-2.5">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm ${
                    item.kategori === 'Gotong Royong' ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'
                  }`}>
                    {item.kategori}
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                    {item.judul}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-2 mb-3">
                    <span className="flex items-center gap-1 font-sans">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      {item.tanggal}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      <span className="truncate max-w-[120px]">{item.lokasi}</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.isiRingkas}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 group-hover:text-emerald-900 flex items-center gap-1">
                    Baca Selengkapnya
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="text-[11px] text-slate-400 font-sans">Desa Fadoro</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
