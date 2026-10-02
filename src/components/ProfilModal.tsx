import React, { useState } from 'react';
import { X, Users, MapPin, Compass, Award, BookOpen, CheckCircle } from 'lucide-react';
import { PROFIL_DESA } from '../data/mockData';
import { VillageEmblem } from './VillageEmblem';

interface ProfilModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfilModal: React.FC<ProfilModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'visi-misi' | 'demografi' | 'aparatur' | 'sejarah'>('visi-misi');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#064E3B] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <VillageEmblem size={38} />
            <div>
              <h3 className="text-base sm:text-lg font-bold">Profil Resmi Desa Fadoro</h3>
              <p className="text-xs text-emerald-200">
                Kecamatan Sirombu, Kabupaten Nias Barat, Sumatera Utara
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-200 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 bg-slate-100 px-6 pt-2 gap-2 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('visi-misi')}
            className={`px-4 py-2.5 rounded-t-lg transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'visi-misi'
                ? 'bg-white text-emerald-800 border-emerald-600 shadow-sm'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            Visi & Misi Desa
          </button>

          <button
            onClick={() => setActiveTab('aparatur')}
            className={`px-4 py-2.5 rounded-t-lg transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'aparatur'
                ? 'bg-white text-emerald-800 border-emerald-600 shadow-sm'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            Aparatur & Struktur Desa
          </button>

          <button
            onClick={() => setActiveTab('demografi')}
            className={`px-4 py-2.5 rounded-t-lg transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'demografi'
                ? 'bg-white text-emerald-800 border-emerald-600 shadow-sm'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            Demografi & Wilayah
          </button>

          <button
            onClick={() => setActiveTab('sejarah')}
            className={`px-4 py-2.5 rounded-t-lg transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'sejarah'
                ? 'bg-white text-emerald-800 border-emerald-600 shadow-sm'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            Sejarah & Letak Geografis
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-slate-700 leading-relaxed">
          {activeTab === 'visi-misi' && (
            <div className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-2">
                  Visi Desa Fadoro (2023 - 2029)
                </span>
                <p className="text-base sm:text-lg font-serif italic text-emerald-950 font-bold max-w-2xl mx-auto">
                  "{PROFIL_DESA.visi}"
                </p>
                <p className="text-xs text-emerald-700 mt-2 font-medium">
                  Kepala Desa: TAROMALIMO ZIDUHU MARUNDURI
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  Misi Pembangunan Desa Fadoro
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {PROFIL_DESA.misi.map((m, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-800 font-medium">
                        {m}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'aparatur' && (
            <div className="space-y-6">
              {/* Leader Highlight */}
              <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-5">
                <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-emerald-400 p-1 flex items-center justify-center text-emerald-300 font-bold text-2xl shrink-0">
                  TZM
                </div>
                <div className="text-center sm:text-left">
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2.5 py-0.5 rounded font-mono uppercase tracking-wider">
                    Pimpinan Tertinggi Desa
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold uppercase mt-1">
                    TAROMALIMO ZIDUHU MARUNDURI
                  </h3>
                  <p className="text-xs text-emerald-200">
                    Kepala Desa Fadoro · Periode Jabatan 2023 - 2029
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-3">
                  Perangkat Desa & Badan Permusyawaratan Desa (BPD)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {PROFIL_DESA.aparatur.slice(1).map((item, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                      <p className="text-xs font-semibold text-emerald-800">
                        {item.jabatan}
                      </p>
                      <h5 className="font-bold text-slate-900 text-sm mt-1">
                        {item.nama}
                      </h5>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'demografi' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
                  <span className="text-xs text-slate-500">Total Penduduk</span>
                  <div className="text-2xl font-bold font-mono text-emerald-900 mt-1">
                    {PROFIL_DESA.demografi.totalPenduduk.toLocaleString('id-ID')}
                  </div>
                  <span className="text-[11px] text-slate-400">Jiwa</span>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
                  <span className="text-xs text-slate-500">Jumlah Kepala Keluarga</span>
                  <div className="text-2xl font-bold font-mono text-blue-900 mt-1">
                    {PROFIL_DESA.demografi.totalKK}
                  </div>
                  <span className="text-[11px] text-slate-400">KK</span>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
                  <span className="text-xs text-slate-500">Laki-laki</span>
                  <div className="text-2xl font-bold font-mono text-slate-800 mt-1">
                    {PROFIL_DESA.demografi.lakiLaki}
                  </div>
                  <span className="text-[11px] text-slate-400">Jiwa (49.5%)</span>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
                  <span className="text-xs text-slate-500">Perempuan</span>
                  <div className="text-2xl font-bold font-mono text-slate-800 mt-1">
                    {PROFIL_DESA.demografi.perempuan}
                  </div>
                  <span className="text-[11px] text-slate-400">Jiwa (50.5%)</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-3">
                  Pembagian Wilayah Dusun
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {PROFIL_DESA.demografi.dusunList.map((d, i) => (
                    <div key={i} className="bg-emerald-50/50 border border-emerald-200 p-4 rounded-xl">
                      <h5 className="font-bold text-emerald-950 text-sm">{d.nama}</h5>
                      <div className="mt-2 text-xs space-y-1 text-slate-600">
                        <div>Jumlah KK: <span className="font-mono font-bold text-slate-800">{d.kk} KK</span></div>
                        <div>Jumlah Jiwa: <span className="font-mono font-bold text-slate-800">{d.penduduk} Orang</span></div>
                        <div>Kepala Dusun: <span className="font-medium text-slate-900">{d.kadus}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sejarah' && (
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                  Sejarah Ringkas Desa Fadoro
                </h4>
                <p>
                  Desa Fadoro merupakan salah satu desa pemukiman tertua di wilayah pesisir barat Pulau Nias, berada dalam naungan Kecamatan Sirombu, Kabupaten Nias Barat. Secara turun temurun, masyarakat Desa Fadoro dikenal memegang teguh adat istiadat persaudaraan Nias (Fa'omasi & Gotong Royong) serta memiliki potensi agromaritim yang melimpah dari hasil perkebunan kelapa, karet, pertanian padi ladang, dan hasil tangkapan laut.
                </p>
                <p>
                  Dengan pemekaran Kabupaten Nias Barat, Desa Fadoro terus berbenah di bawah kepemimpinan Kepala Desa <strong>TAROMALIMO ZIDUHU MARUNDURI</strong> guna mentransformasikan tata kelola desa menuju era digital, pelayanan surat yang bebas pungli, transparansi keterbukaan anggaran APBDes, dan perlindungan privasi data warga berbasis enkripsi modern.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-600" />
                  Batas Wilayah Administratif
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>Utara: Berbatasan dengan Desa Togideu</div>
                  <div>Selatan: Berbatasan dengan Desa Sirombu</div>
                  <div>Timur: Berbatasan dengan Kawasan Perkebunan</div>
                  <div>Barat: Berbatasan langsung dengan Samudera Hindia</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs">
          <span className="text-slate-500">Pemerintah Desa Fadoro, Sirombu, Nias Barat</span>
          <button
            onClick={onClose}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-4 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
