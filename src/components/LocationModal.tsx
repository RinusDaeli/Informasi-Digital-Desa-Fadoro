import React from 'react';
import { X, MapPin, Navigation, Phone, ShieldCheck, Lock, ExternalLink } from 'lucide-react';
import { PROFIL_DESA } from '../data/mockData';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'location' | 'privacy';
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  type = 'location',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200">
        <div className="bg-[#064E3B] text-white px-6 py-4 flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold">
            {type === 'location' ? 'Lokasi Kantor Pemerintah Desa Fadoro' : 'Kebijakan Enkripsi & Keamanan Data Warga'}
          </h3>
          <button onClick={onClose} className="text-emerald-200 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 text-xs sm:text-sm text-slate-700 space-y-4">
          {type === 'location' ? (
            <>
              <div className="h-48 bg-slate-900 rounded-xl overflow-hidden relative flex items-center justify-center border border-slate-200">
                <svg className="w-full h-full" viewBox="0 0 400 200">
                  <rect width="400" height="200" fill="#0f172a" />
                  {/* Stylized road & coastal map */}
                  <path d="M0,160 Q100,140 200,150 T400,130" stroke="#38bdf8" strokeWidth="18" fill="none" opacity="0.3" />
                  <path d="M50,0 L200,200" stroke="#475569" strokeWidth="10" />
                  <path d="M0,100 L400,100" stroke="#334155" strokeWidth="8" strokeDasharray="6 6" />
                  <circle cx="200" cy="100" r="14" fill="#059669" />
                  <circle cx="200" cy="100" r="6" fill="#ffffff" />
                  <text x="200" y="80" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                    KANTOR DESA FADORO
                  </text>
                  <text x="200" y="130" fill="#67e8f9" fontSize="10" textAnchor="middle">
                    Kec. Sirombu · Kab. Nias Barat
                  </text>
                </svg>
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                  Koordinat: 0.9452° N, 97.4321° E
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Alamat Lengkap:</span>
                    <span>{PROFIL_DESA.kontak.alamat}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-2 border-t border-slate-200/80">
                  <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="font-mono">{PROFIL_DESA.kontak.teleponDisplay}</span>
                </div>
              </div>

              <div className="flex justify-end">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Kantor Desa Fadoro Sirombu Nias Barat')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-4 py-2 rounded-lg inline-flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Buka Petunjuk Arah Google Maps
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-emerald-950 text-sm">Standar Perlindungan Data Pribadi Desa:</h4>
                  <p className="text-xs text-emerald-800 mt-1">
                    Pemerintah Desa Fadoro di bawah komitmen Kepala Desa TAROMALIMO ZIDUHU MARUNDURI memberlakukan standar keamanan informasi tingkat tinggi guna menjaga privasi seluruh warga.
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
                <p>
                  <strong>1. Enkripsi AES-256 GCM:</strong> Seluruh data identitas kependudukan termasuk NIK, Nomor KK, dan data keluarga dienkripsi dengan algoritma standar militer sebelum disimpan dalam database.
                </p>
                <p>
                  <strong>2. Penyamaran Data (Data Masking):</strong> Tampilan umum publik tidak pernah memuat NIK utuh (disamarkan menjadi e.g. 120405******0001) untuk mencegah penyalahgunaan identitas.
                </p>
                <p>
                  <strong>3. Tanda Tangan Digital SHA-256:</strong> Setiap dokumen surat resmi yang diterbitkan dilengkapi tanda tangan elektronik ber-hash kriptografi dan QR Code yang dapat diverifikasi keasliannya.
                </p>
                <p>
                  <strong>4. Audit Trail Log:</strong> Seluruh akses dekripsi data kependudukan dicatat secara permanen dalam Log Audit Keamanan Desa.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs px-4 py-1.5 rounded-lg transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
