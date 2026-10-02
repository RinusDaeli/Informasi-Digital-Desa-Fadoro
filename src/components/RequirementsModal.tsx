import React from 'react';
import { X, CheckCircle, Clock, FileCheck, PhoneCall, MessageSquare } from 'lucide-react';
import { PROFIL_DESA } from '../data/mockData';

interface RequirementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOnlineForm: () => void;
}

export const RequirementsModal: React.FC<RequirementsModalProps> = ({
  isOpen,
  onClose,
  onOpenOnlineForm,
}) => {
  if (!isOpen) return null;

  const requirementsList = [
    {
      surat: 'Surat Keterangan Usaha (SKU)',
      syarat: [
        'Fotokopi KTP Pemohon (Asli dibawa saat verifikasi)',
        'Fotokopi Kartu Keluarga (KK)',
        'Foto Tempat Usaha / Bukti jenis kegiatan usaha di wilayah Desa Fadoro',
        'Surat Pengantar dari Kepala Dusun setempat (Dusun I, II, atau III)',
      ]
    },
    {
      surat: 'Surat Keterangan Domisili (SKD)',
      syarat: [
        'Fotokopi KTP & Kartu Keluarga',
        'Surat Pengantar RT/Kepala Dusun',
        'Bagi warga pendatang: Surat Pindah dari daerah asal atau surat pengantar kos/sewa',
      ]
    },
    {
      surat: 'Surat Keterangan Tidak Mampu (SKTM)',
      syarat: [
        'Fotokopi KTP Kepala Keluarga & KK',
        'Surat Pengantar Kepala Dusun yang menyatakan kondisi riil keluarga',
        'Surat pernyataan tidak mampu bermaterai (dapat dibantu di balai desa)',
        'Diperuntukkan beasiswa PIP, KIP-Kuliah, atau keringanan biaya RS',
      ]
    },
    {
      surat: 'Surat Pengantar Nikah (Model N1 - N4)',
      syarat: [
        'Fotokopi KTP & KK Calon Mempelai dan Orang Tua',
        'Akta Kelahiran / Surat Kenal Lahir',
        'Ijazah Terakhir',
        'Pas Foto Berwarna 2x3 (4 lembar) dan 4x6 (2 lembar) latar biru',
        'Surat Keterangan Belum Pernah Menikah dari Kepala Desa',
      ]
    },
    {
      surat: 'Surat Pengantar Catatan Kepolisian (SKCK)',
      syarat: [
        'Fotokopi KTP dan Kartu Keluarga (KK)',
        'Fotokopi Akta Kelahiran / Ijazah',
        'Pas foto 4x6 latar merah (3 lembar)',
        'Surat Pengantar Kepala Dusun',
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-[#064E3B] text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold">Persyaratan Berkas & Jam Layanan</h3>
            <p className="text-xs text-emerald-200">Pemerintah Desa Fadoro · Bebas Pungutan Liar (Gratis)</p>
          </div>
          <button onClick={onClose} className="text-emerald-200 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700">
          {/* Schedule Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-emerald-950 text-sm">Jadwal Operasional Kantor Desa:</h4>
                <p className="text-xs text-emerald-800">{PROFIL_DESA.kontak.jamLayanan}</p>
                <p className="text-[11px] text-emerald-700 mt-0.5">Petugas Seksi Pelayanan siap melayani warga.</p>
              </div>
            </div>
            <button
              onClick={() => { onClose(); onOpenOnlineForm(); }}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors shrink-0"
            >
              Ajukan Surat Online
            </button>
          </div>

          {/* List of requirements */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
              Standar Persyaratan Berkas Dokumen:
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {requirementsList.map((item, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2 font-bold text-slate-900 text-xs sm:text-sm">
                    <FileCheck className="w-4 h-4 text-emerald-700" />
                    <span>{item.surat}</span>
                  </div>
                  <ul className="space-y-1.5 pl-6 text-xs text-slate-600 list-disc">
                    {item.syarat.map((s, sIdx) => (
                      <li key={sIdx}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs">
          <span className="text-slate-500">Seluruh pengurusan surat di Kantor Desa Fadoro tidak dipungut biaya apapun (GRATIS).</span>
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
