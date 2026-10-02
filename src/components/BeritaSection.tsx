import React from 'react';
import { Newspaper, Calendar, ArrowRight, Eye } from 'lucide-react';
import { NewsItem } from '../types';

interface BeritaSectionProps {
  news: NewsItem[];
  onSelectNews: (item: NewsItem) => void;
  onViewAll: () => void;
}

export const BeritaSection: React.FC<BeritaSectionProps> = ({
  news,
  onSelectNews,
  onViewAll,
}) => {
  return (
    <section id="informasi" className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Newspaper className="w-5 h-5 text-emerald-700" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-slate-900 font-sans">
              Berita Desa
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

        {/* 3-Card Grid Matching the Mockup */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.slice(0, 3).map((item, idx) => (
            <div
              key={item.id}
              onClick={() => onSelectNews(item)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
            >
              {/* Photo Banner with SVG/CSS Graphics */}
              <div className="h-48 bg-slate-900 relative overflow-hidden">
                <div className={`w-full h-full flex items-center justify-center ${
                  idx === 0
                    ? 'bg-gradient-to-tr from-emerald-900 to-green-700'
                    : idx === 1
                    ? 'bg-gradient-to-tr from-amber-900 to-amber-700'
                    : 'bg-gradient-to-tr from-blue-950 to-indigo-900'
                }`}>
                  <svg className="w-full h-full opacity-50" viewBox="0 0 300 180">
                    <rect width="300" height="180" fill="none" />
                    {idx === 0 ? (
                      // Agriculture training motif
                      <g fill="#86efac">
                        <path d="M0,140 Q 75,120 150,140 T 300,140 L 300,180 L 0,180 Z" fill="#047857" />
                        <path d="M120 90 Q 150 50 180 90" stroke="#bef264" strokeWidth="6" fill="none" />
                        <circle cx="150" cy="50" r="10" fill="#facc15" />
                        <rect x="145" y="60" width="10" height="70" fill="#a16207" />
                        <circle cx="60" cy="110" r="18" fill="#15803d" />
                        <circle cx="240" cy="110" r="18" fill="#15803d" />
                      </g>
                    ) : idx === 1 ? (
                      // Gotong royong road building
                      <g fill="#fde68a">
                        <polygon points="100,180 200,180 170,80 130,80" fill="#475569" />
                        <line x1="150" y1="80" x2="150" y2="180" stroke="#f8fafc" strokeWidth="4" strokeDasharray="10 10" />
                        <circle cx="80" cy="90" r="12" fill="#d97706" />
                        <circle cx="220" cy="90" r="12" fill="#d97706" />
                      </g>
                    ) : (
                      // Governance meeting
                      <g fill="#93c5fd">
                        <rect x="70" y="50" width="160" height="90" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                        <line x1="90" y1="75" x2="210" y2="75" stroke="#38bdf8" strokeWidth="3" />
                        <line x1="90" y1="95" x2="180" y2="95" stroke="#94a3b8" strokeWidth="2" />
                        <line x1="90" y1="115" x2="195" y2="115" stroke="#94a3b8" strokeWidth="2" />
                      </g>
                    )}
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="absolute top-3 left-3">
                  <span className="bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    {item.kategori}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                    <span className="flex items-center gap-1 font-sans">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      {item.tanggal}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      {item.dibaca}x dibaca
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                    {item.judul}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {item.ringkasan}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 group-hover:text-emerald-900 flex items-center gap-1">
                    Baca Selengkapnya
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="text-[11px] text-slate-400 font-sans">{item.penulis}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
