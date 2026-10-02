import React from 'react';
import { Layers, FileText, CheckSquare, MessageCircle, Clock, ArrowRight } from 'lucide-react';

interface PelayananSectionProps {
  onOpenServiceModal: () => void;
  onOpenRequirements: () => void;
}

export const PelayananSection: React.FC<PelayananSectionProps> = ({
  onOpenServiceModal,
  onOpenRequirements,
}) => {
  return (
    <section id="pelayanan" className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Layers className="w-5 h-5 text-emerald-700" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-slate-900 font-sans">
              Pelayanan Desa
            </h2>
          </div>

          <button
            onClick={onOpenServiceModal}
            className="text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5 transition-colors group cursor-pointer"
          >
            <span>Lihat Semua</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4 Cards Matching the Mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Item 1: Administrasi Desa */}
          <div
            onClick={onOpenServiceModal}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-700 transition-colors">
                Administrasi Desa
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Informasi persyaratan berbagai pelayanan surat menyurat kependudukan.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-blue-700 flex items-center gap-1">
              Lihat Layanan <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Item 2: Persyaratan */}
          <div
            onClick={onOpenRequirements}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
                <CheckSquare className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
                Persyaratan
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Lihat dokumen yang diperlukan sebelum mengurus pelayanan di kantor desa.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-emerald-700 flex items-center gap-1">
              Cek Syarat Dokumen <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Item 3: Pelayanan Online */}
          <div
            onClick={onOpenServiceModal}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-amber-700 transition-colors">
                Pelayanan Online
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Ajukan permohonan atau pertanyaan melalui formulir & WhatsApp resmi desa.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-amber-700 flex items-center gap-1">
              Ajukan Mandiri <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Item 4: Jam Pelayanan */}
          <div
            onClick={onOpenRequirements}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-700 transition-colors">
                Jam Pelayanan
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Senin - Jumat: 08.00 - 15.00 WIB di Kantor Kepala Desa Fadoro.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-indigo-700 flex items-center gap-1">
              Jadwal Kantor <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Big Centered CTA Button Matching Mockup */}
        <div className="text-center">
          <button
            onClick={onOpenServiceModal}
            className="bg-[#064E3B] hover:bg-[#065F46] text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-full inline-flex items-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer uppercase tracking-wider"
          >
            <span>Lihat Semua Pelayanan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
