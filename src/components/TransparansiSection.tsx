import React, { useState } from 'react';
import { DollarSign, TrendingUp, Hammer, CheckCircle2, FileCheck } from 'lucide-react';
import { APBDesSummary } from '../types';

interface TransparansiSectionProps {
  apbdes: APBDesSummary;
}

export const TransparansiSection: React.FC<TransparansiSectionProps> = ({ apbdes }) => {
  const [activeTab, setActiveTab] = useState<'apbdes' | 'realisasi' | 'pembangunan'>('apbdes');

  return (
    <section id="transparansi" className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading Tag */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-emerald-700" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-slate-900 font-sans">
            Transparansi Desa
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 mb-6">
          Pemerintah Desa Fadoro berkomitmen menyampaikan informasi publik pengelolaan keuangan desa secara terbuka, transparan, dan akuntabel sesuai peraturan perundang-undangan.
        </p>

        {/* 3 Main Action Tabs Matching Mockup */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
          <button
            onClick={() => setActiveTab('apbdes')}
            className={`py-3 sm:py-3.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
              activeTab === 'apbdes'
                ? 'bg-[#064E3B] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>APBDes 2026</span>
          </button>

          <button
            onClick={() => setActiveTab('realisasi')}
            className={`py-3 sm:py-3.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
              activeTab === 'realisasi'
                ? 'bg-[#064E3B] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Realisasi Kas</span>
          </button>

          <button
            onClick={() => setActiveTab('pembangunan')}
            className={`py-3 sm:py-3.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
              activeTab === 'pembangunan'
                ? 'bg-[#064E3B] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Hammer className="w-4 h-4" />
            <span>Pembangunan Fisik</span>
          </button>
        </div>

        {/* Summary Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl">
            <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">
              Total Pendapatan Desa
            </span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-950 mt-1">
              Rp {apbdes.totalPendapatan.toLocaleString('id-ID')}
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-emerald-700">
              <span>Realisasi: Rp {apbdes.realisasiPendapatan.toLocaleString('id-ID')}</span>
              <span className="font-bold">62.4%</span>
            </div>
            <div className="w-full bg-emerald-200 h-2 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full" style={{ width: '62.4%' }} />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl">
            <span className="text-[11px] font-semibold text-blue-800 uppercase tracking-wider block">
              Total Belanja Desa
            </span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-blue-950 mt-1">
              Rp {apbdes.totalBelanja.toLocaleString('id-ID')}
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-blue-700">
              <span>Realisasi: Rp {apbdes.realisasiBelanja.toLocaleString('id-ID')}</span>
              <span className="font-bold">65.7%</span>
            </div>
            <div className="w-full bg-blue-200 h-2 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: '65.7%' }} />
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl">
            <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider block">
              Surplus / Sisa Pembiayaan
            </span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-amber-950 mt-1">
              Rp {apbdes.surplusDefisit.toLocaleString('id-ID')}
            </div>
            <p className="text-xs text-amber-700 mt-2">
              Dana cadangan operasional desa & penyertaan modal BUMDes Fadoro Mandiri.
            </p>
          </div>
        </div>

        {/* Dynamic Tab Contents */}
        {activeTab === 'apbdes' && (
          <div className="space-y-6">
            {/* Pos Pendapatan Breakdown */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                Sumber Pendapatan Desa Fadoro TA 2026
              </h3>
              <div className="space-y-4">
                {apbdes.pendapatan.map(item => (
                  <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-200/80">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div>
                        <span className="font-mono text-emerald-800 font-bold mr-2">{item.kode}</span>
                        <span className="font-bold text-slate-900">{item.uraian}</span>
                      </div>
                      <div className="font-mono text-right">
                        <span className="text-slate-500">Target: Rp {item.anggaran.toLocaleString('id-ID')}</span>
                        <span className="text-emerald-700 font-bold ml-3">Realisasi: Rp {item.realisasi.toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full mt-2.5 overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(item.persentase, 100)}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1 text-[11px] text-slate-500">
                      <span>{item.keterangan}</span>
                      <span className="font-bold text-emerald-800">{item.persentase.toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pos Belanja Breakdown */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                Alokasi Belanja Desa Fadoro Berdasarkan Bidang
              </h3>
              <div className="space-y-4">
                {apbdes.belanja.map(item => (
                  <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-200/80">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div>
                        <span className="font-mono text-blue-800 font-bold mr-2">{item.kode}</span>
                        <span className="font-bold text-slate-900">{item.uraian}</span>
                      </div>
                      <div className="font-mono text-right">
                        <span className="text-slate-500">Pagu: Rp {item.anggaran.toLocaleString('id-ID')}</span>
                        <span className="text-blue-700 font-bold ml-3">Realisasi: Rp {item.realisasi.toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full mt-2.5 overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(item.persentase, 100)}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1 text-[11px] text-slate-500">
                      <span>{item.keterangan}</span>
                      <span className="font-bold text-blue-800">{item.persentase.toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'realisasi' && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Tabel Realisasi Kas & Serapan Anggaran APBDes 2026
            </h3>
            <div className="overflow-x-auto bg-white rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Klasifikasi</th>
                    <th className="py-3 px-4 text-right">Anggaran (Rp)</th>
                    <th className="py-3 px-4 text-right">Realisasi (Rp)</th>
                    <th className="py-3 px-4 text-right">Selisih / Sisa (Rp)</th>
                    <th className="py-3 px-4 text-center">Persentase</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="bg-emerald-50/50">
                    <td className="py-3 px-4 font-bold text-emerald-900">Total Pendapatan</td>
                    <td className="py-3 px-4 text-right font-mono">Rp {apbdes.totalPendapatan.toLocaleString('id-ID')}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-emerald-700">Rp {apbdes.realisasiPendapatan.toLocaleString('id-ID')}</td>
                    <td className="py-3 px-4 text-right font-mono text-slate-500">Rp {(apbdes.totalPendapatan - apbdes.realisasiPendapatan).toLocaleString('id-ID')}</td>
                    <td className="py-3 px-4 text-center font-bold text-emerald-800">62.4%</td>
                  </tr>
                  <tr className="bg-blue-50/50">
                    <td className="py-3 px-4 font-bold text-blue-900">Total Belanja</td>
                    <td className="py-3 px-4 text-right font-mono">Rp {apbdes.totalBelanja.toLocaleString('id-ID')}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-blue-700">Rp {apbdes.realisasiBelanja.toLocaleString('id-ID')}</td>
                    <td className="py-3 px-4 text-right font-mono text-slate-500">Rp {(apbdes.totalBelanja - apbdes.realisasiBelanja).toLocaleString('id-ID')}</td>
                    <td className="py-3 px-4 text-center font-bold text-blue-800">65.7%</td>
                  </tr>
                  {apbdes.belanja.map(b => (
                    <tr key={b.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 text-slate-800 pl-8">{b.uraian}</td>
                      <td className="py-2.5 px-4 text-right font-mono text-slate-600">Rp {b.anggaran.toLocaleString('id-ID')}</td>
                      <td className="py-2.5 px-4 text-right font-mono text-slate-800 font-semibold">Rp {b.realisasi.toLocaleString('id-ID')}</td>
                      <td className="py-2.5 px-4 text-right font-mono text-slate-500">Rp {(b.anggaran - b.realisasi).toLocaleString('id-ID')}</td>
                      <td className="py-2.5 px-4 text-center font-mono font-medium">{b.persentase.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'pembangunan' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {apbdes.kegiatanPembangunan.map(item => (
              <div key={item.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {item.sumberDana}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      item.progressPersen === 100 ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    {item.namaKegiatan}
                  </h4>

                  <div className="mt-3 space-y-1 text-xs text-slate-600">
                    <div>Lokasi: <span className="font-medium text-slate-800">{item.lokasi}</span></div>
                    <div>Volume Fisik: <span className="font-medium text-slate-800">{item.volume}</span></div>
                    <div>Anggaran Pagu: <span className="font-mono font-semibold text-slate-900">Rp {item.anggaran.toLocaleString('id-ID')}</span></div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-500">Progress Pembangunan Fisik</span>
                    <span className="font-bold text-emerald-800">{item.progressPersen}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.progressPersen === 100 ? 'bg-emerald-600' : 'bg-blue-600'
                      }`}
                      style={{ width: `${item.progressPersen}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
