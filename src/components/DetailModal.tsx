import React from 'react';
import { X, Calendar, User, MapPin, Share2 } from 'lucide-react';
import { Announcement, NewsItem, GalleryPhoto } from '../types';

interface DetailModalProps {
  type: 'announcement' | 'news' | 'gallery';
  data: Announcement | NewsItem | GalleryPhoto | null;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ type, data, onClose }) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-emerald-900 text-white px-6 py-4 flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider font-semibold text-emerald-300">
            {type === 'announcement' ? 'Pengumuman Resmi Desa' : type === 'news' ? 'Kabar Berita Desa Fadoro' : 'Galeri Kegiatan Warga'}
          </span>
          <button
            onClick={onClose}
            className="text-emerald-200 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-4 max-h-[75vh] overflow-y-auto text-slate-800">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            {data.judul}
          </h2>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 border-b border-slate-100 pb-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              {data.tanggal}
            </span>
            <span aria-hidden="true">·</span>
            <span className="bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded text-[11px]">
              {data.kategori}
            </span>
            {'penulis' in data && (
              <>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  {data.penulis}
                </span>
              </>
            )}
            {'lokasi' in data && (
              <>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  {data.lokasi}
                </span>
              </>
            )}
          </div>

          {/* Body Prose */}
          <div className="text-sm leading-relaxed text-slate-700 whitespace-pre-line space-y-3">
            {'isiLengkap' in data && data.isiLengkap}
            {'deskripsi' in data && data.deskripsi}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">Pemerintah Desa Fadoro, Sirombu, Nias Barat</span>
          <button
            onClick={onClose}
            className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold px-4 py-1.5 rounded-lg transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
