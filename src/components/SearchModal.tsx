import React, { useState } from 'react';
import { X, Search, FileText, Megaphone, Newspaper, ArrowRight } from 'lucide-react';
import { Announcement, NewsItem, DocumentRequest } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  announcements: Announcement[];
  news: NewsItem[];
  onSelectAnnouncement: (item: Announcement) => void;
  onSelectNews: (item: NewsItem) => void;
  onSearchTrackingResi: (resi: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  announcements,
  news,
  onSelectAnnouncement,
  onSelectNews,
  onSearchTrackingResi,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const filteredAnnouncements = q
    ? announcements.filter(a => a.judul.toLowerCase().includes(q) || a.isiRingkas.toLowerCase().includes(q))
    : [];

  const filteredNews = q
    ? news.filter(n => n.judul.toLowerCase().includes(q) || n.ringkasan.toLowerCase().includes(q))
    : [];

  const isResiQuery = q.startsWith('fdr-') || /^[0-9]{4,16}$/.test(q);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-20">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari pengumuman, berita, APBDes, atau nomor resi surat..."
            autoFocus
            className="w-full text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600 p-1">
              <X className="w-4 h-4" />
            </button>
          )}
          <button onClick={onClose} className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg">
            Esc
          </button>
        </div>

        <div className="p-5 max-h-96 overflow-y-auto space-y-4 text-xs">
          {isResiQuery && (
            <div
              onClick={() => { onSearchTrackingResi(query); onClose(); }}
              className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl cursor-pointer hover:bg-emerald-100 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-emerald-700" />
                <div>
                  <span className="font-bold text-emerald-950">Lacak Status Surat Resi: "{query}"</span>
                  <p className="text-[11px] text-emerald-700 mt-0.5">Klik untuk melihat status proses administrasi kependudukan Anda</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-700" />
            </div>
          )}

          {filteredAnnouncements.length > 0 && (
            <div>
              <span className="font-bold uppercase tracking-wider text-[10px] text-slate-400 block mb-2">
                Pengumuman Ditemukan ({filteredAnnouncements.length})
              </span>
              <div className="space-y-2">
                {filteredAnnouncements.map(a => (
                  <div
                    key={a.id}
                    onClick={() => { onSelectAnnouncement(a); onClose(); }}
                    className="p-3 bg-slate-50 hover:bg-emerald-50/50 rounded-xl border border-slate-200 cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Megaphone className="w-4 h-4 text-emerald-600" />
                      <div>
                        <h5 className="font-bold text-slate-900 group-hover:text-emerald-800">{a.judul}</h5>
                        <p className="text-[11px] text-slate-500">{a.tanggal} · {a.kategori}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredNews.length > 0 && (
            <div>
              <span className="font-bold uppercase tracking-wider text-[10px] text-slate-400 block mb-2">
                Berita Desa Ditemukan ({filteredNews.length})
              </span>
              <div className="space-y-2">
                {filteredNews.map(n => (
                  <div
                    key={n.id}
                    onClick={() => { onSelectNews(n); onClose(); }}
                    className="p-3 bg-slate-50 hover:bg-emerald-50/50 rounded-xl border border-slate-200 cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Newspaper className="w-4 h-4 text-blue-600" />
                      <div>
                        <h5 className="font-bold text-slate-900 group-hover:text-blue-800">{n.judul}</h5>
                        <p className="text-[11px] text-slate-500">{n.tanggal} · {n.kategori}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-700" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {q && filteredAnnouncements.length === 0 && filteredNews.length === 0 && !isResiQuery && (
            <div className="text-center py-8 text-slate-500">
              Tidak ada hasil yang sesuai dengan kata kunci "{query}". Coba kata kunci lain seperti "gotong royong", "musdes", atau "pertanian".
            </div>
          )}

          {!q && (
            <div className="text-slate-500 text-center py-4">
              Ketik judul berita, agenda gotong royong, atau nomor resi surat untuk mencari dengan cepat.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
