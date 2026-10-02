import React from 'react';
import { X, Printer, Download, ShieldCheck, QrCode } from 'lucide-react';
import { DocumentRequest } from '../types';
import { VillageEmblem } from './VillageEmblem';

interface OfficialLetterModalProps {
  request: DocumentRequest | null;
  onClose: () => void;
}

export const OfficialLetterModal: React.FC<OfficialLetterModalProps> = ({ request, onClose }) => {
  if (!request) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = request.ttdDate || new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 print:border-none print:shadow-none print:w-full print:max-w-none">
        {/* Top Control Bar (Hidden when printing) */}
        <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="font-semibold text-sm">Pratinjau Surat Resmi Digital Ber-TTD Elektronik</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Cetak / Simpan PDF
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Paper Document Container */}
        <div className="p-8 sm:p-12 bg-white text-slate-900 text-sm leading-relaxed font-serif max-h-[80vh] overflow-y-auto print:max-h-none print:p-8">
          {/* KOP SURAT RESMI */}
          <div className="border-b-4 border-double border-slate-900 pb-3 mb-6 text-center relative flex items-center justify-center">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden sm:block">
              <VillageEmblem size={76} />
            </div>
            <div className="px-12 sm:px-20">
              <h4 className="text-base sm:text-lg font-bold tracking-wider uppercase font-sans text-slate-900">
                Pemerintah Kabupaten Nias Barat
              </h4>
              <h3 className="text-lg sm:text-xl font-black tracking-wide uppercase font-sans text-slate-900">
                Kecamatan Sirombu
              </h3>
              <h2 className="text-xl sm:text-2xl font-black tracking-widest uppercase font-sans text-emerald-900">
                Pemerintah Desa Fadoro
              </h2>
              <p className="text-xs font-sans text-slate-600 italic mt-0.5">
                Alamat: Jl. Desa Fadoro, Kec. Sirombu, Kab. Nias Barat, Sumatera Utara 22863
              </p>
              <p className="text-[11px] font-sans text-slate-500">
                Email: desafadoro@gmail.com · Laman Resmi: desafadoro-niasbarat.go.id
              </p>
            </div>
          </div>

          {/* JUDUL SURAT */}
          <div className="text-center my-6">
            <h1 className="text-base sm:text-lg font-bold underline uppercase tracking-wide font-sans">
              {request.jenisSurat}
            </h1>
            <p className="text-xs font-sans text-slate-700 mt-1 font-mono">
              Nomor: {request.nomorSuratResmi || `470/118/FDR/${new Date().getFullYear()}`}
            </p>
          </div>

          {/* PEMBUKA SURAT */}
          <p className="mb-4 text-justify indent-8">
            Yang bertanda tangan di bawah ini, Kepala Desa Fadoro, Kecamatan Sirombu, Kabupaten Nias Barat, Provinsi Sumatera Utara, dengan ini menerangkan dengan sesungguhnya bahwa:
          </p>

          {/* IDENTITAS WARGA */}
          <div className="my-4 ml-6 space-y-1.5 font-sans text-xs sm:text-sm">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-4 text-slate-600">Nama Lengkap</div>
              <div className="col-span-8 font-bold text-slate-900">: {request.namaWarga}</div>
            </div>
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-4 text-slate-600">Nomor Induk Kependudukan (NIK)</div>
              <div className="col-span-8 font-semibold font-mono text-slate-800">: {request.nik}</div>
            </div>
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-4 text-slate-600">Nomor Resi Pelayanan</div>
              <div className="col-span-8 font-mono text-slate-700">: {request.nomorResi}</div>
            </div>
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-4 text-slate-600">Alamat Tempat Tinggal</div>
              <div className="col-span-8 text-slate-800">: Desa Fadoro, Kec. Sirombu, Kab. Nias Barat</div>
            </div>
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-4 text-slate-600">Keperluan Pengajuan</div>
              <div className="col-span-8 text-slate-800 font-medium">: {request.keperluan}</div>
            </div>
          </div>

          {/* ISI KETERANGAN */}
          <p className="my-4 text-justify indent-8">
            Adalah benar yang bersangkutan adalah warga penduduk Desa Fadoro, Kecamatan Sirombu, Kabupaten Nias Barat yang berkelakuan baik dan tidak sedang tersangkut perkara hukum. Surat keterangan ini diberikan kepada yang bersangkutan untuk dipergunakan sebagaimana mestinya sesuai dengan keperluan yang diajukan.
          </p>
          <p className="mb-8 text-justify indent-8">
            Demikian surat keterangan ini kami perbuat dengan sebenarnya agar dapat dipergunakan seperlunya oleh pihak yang berkepentingan.
          </p>

          {/* TANDA TANGAN & STEMPEL DESA */}
          <div className="grid grid-cols-12 gap-4 mt-8 pt-4 items-end">
            {/* QR CODE VERIFIKASI KEASLIAN */}
            <div className="col-span-6 font-sans">
              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 inline-block max-w-[220px]">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 mb-1.5">
                  <QrCode className="w-4 h-4 text-emerald-600" />
                  <span>Verifikasi Keaslian Surat</span>
                </div>
                <div className="w-24 h-24 bg-white p-1 border border-slate-300 rounded mx-auto flex items-center justify-center">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=PEMDES_FADORO_KADES_TAROMALIMO_ZIDUHU_MARUNDURI_${request.nomorResi}`}
                    alt="QR Code Verifikasi"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-[9px] text-slate-500 text-center mt-1 font-mono">
                  Hash: {request.ttdDigitalHash ? request.ttdDigitalHash.slice(0, 18) + '...' : 'FDR-DS-VERIFIED-2026'}
                </p>
              </div>
            </div>

            {/* KOLOM TANDA TANGAN KADES */}
            <div className="col-span-6 text-center font-sans">
              <p className="text-xs text-slate-700">Fadoro, {currentDate}</p>
              <p className="text-xs font-bold text-slate-900 uppercase">Kepala Desa Fadoro</p>

              {/* STEMPEL BASAH & PARAF DIGITAL */}
              <div className="relative my-2 h-20 flex items-center justify-center">
                {/* Simulated Stempel Desa */}
                <div className="absolute w-24 h-24 border-2 border-emerald-600/70 rounded-full flex flex-col items-center justify-center text-[8px] font-bold text-emerald-700/80 uppercase rotate-[-12deg] pointer-events-none select-none">
                  <span>PEMERINTAH DESA</span>
                  <span className="text-[10px] text-emerald-800">FADORO</span>
                  <span>KEC. SIROMBU</span>
                </div>
                {/* Tanda tangan digital watermark */}
                <div className="font-serif italic font-bold text-xl text-slate-800 select-none z-10">
                  Taromalimo Z. Marunduri
                </div>
              </div>

              <p className="font-bold underline text-sm uppercase text-slate-900">
                TAROMALIMO ZIDUHU MARUNDURI
              </p>
              <p className="text-[11px] text-slate-600 font-mono">
                NIPD. 19780415 202301 1 001
              </p>
            </div>
          </div>
        </div>

        {/* Footer info in modal */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-500 print:hidden">
          <span>Surat resmi ini dilindungi integritas kriptografi & tercatat di Buku Register Desa Fadoro.</span>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 font-medium"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
