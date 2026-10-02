import React, { useState } from 'react';
import { Image, ArrowRight, Eye, Calendar } from 'lucide-react';
import { GalleryPhoto } from '../types';

interface GaleriSectionProps {
  photos: GalleryPhoto[];
  onSelectPhoto: (photo: GalleryPhoto) => void;
  onViewAll: () => void;
}

export const GaleriSection: React.FC<GaleriSectionProps> = ({
  photos,
  onSelectPhoto,
  onViewAll,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = [
    'Semua',
    'Pemerintahan',
    'Pembangunan',
    'Pertanian',
    'Peternakan',
    'Gotong Royong',
    'Kegiatan Masyarakat',
  ];

  const filteredPhotos = selectedCategory === 'Semua'
    ? photos
    : photos.filter(p => p.kategori === selectedCategory);

  return (
    <section id="galeri" className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Image className="w-5 h-5 text-emerald-700" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-slate-900 font-sans">
              Galeri Desa Fadoro
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

        {/* 6 Category Buttons Matching the Mockup */}
        <div className="flex overflow-x-auto pb-2 gap-2 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#064E3B] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.slice(0, 8).map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => onSelectPhoto(photo)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer flex flex-col"
            >
              {/* Photo Frame Container */}
              <div className="h-44 bg-slate-900 relative overflow-hidden flex items-center justify-center">
                <div className={`w-full h-full flex items-center justify-center ${
                  photo.kategori === 'Pertanian'
                    ? 'bg-gradient-to-tr from-emerald-900 to-green-700'
                    : photo.kategori === 'Pembangunan'
                    ? 'bg-gradient-to-tr from-blue-900 to-sky-700'
                    : photo.kategori === 'Peternakan'
                    ? 'bg-gradient-to-tr from-purple-900 to-amber-700'
                    : photo.kategori === 'Gotong Royong'
                    ? 'bg-gradient-to-tr from-teal-900 to-emerald-700'
                    : photo.kategori === 'Kegiatan Masyarakat'
                    ? 'bg-gradient-to-tr from-rose-900 to-pink-700'
                    : 'bg-gradient-to-tr from-slate-900 to-emerald-800'
                }`}>
                  <svg className="w-full h-full opacity-40 group-hover:scale-105 transition-transform duration-300" viewBox="0 0 200 150">
                    <rect width="200" height="150" fill="none" />
                    <circle cx="100" cy="75" r="35" stroke="#ffffff" strokeWidth="3" fill="none" />
                    <circle cx="100" cy="75" r="10" fill="#ffffff" />
                    <rect x="20" y="115" width="160" height="10" rx="3" fill="#ffffff" opacity="0.6" />
                  </svg>
                </div>

                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                <div className="absolute top-2.5 left-2.5">
                  <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {photo.kategori}
                  </span>
                </div>

                <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-sm text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              {/* Caption */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
                    {photo.judul}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {photo.deskripsi}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-emerald-600" />
                    {photo.tanggal}
                  </span>
                  <span className="text-emerald-700 font-semibold group-hover:underline">Buka Foto</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
