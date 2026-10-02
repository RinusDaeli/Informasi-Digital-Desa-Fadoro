import React, { useState } from 'react';
import { X, Search, FileText, CheckCircle, Clock, AlertCircle, Send, MessageSquare, Printer, Shield, ArrowRight } from 'lucide-react';
import { DocumentRequest, DocumentType, DocumentStatus } from '../types';
import { generateWhatsAppMessage, getWhatsAppDirectUrl } from '../services/whatsappService';

interface OnlineServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  requests: DocumentRequest[];
  onSubmitRequest: (newReq: Omit<DocumentRequest, 'id' | 'tanggalPengajuan' | 'tanggalUpdate' | 'status'>) => void;
  onViewLetter: (req: DocumentRequest) => void;
  initialTrackingResi?: string;
}

const DOCUMENT_OPTIONS: DocumentType[] = [
  'Surat Keterangan Usaha (SKU)',
  'Surat Keterangan Domisili (SKD)',
  'Surat Keterangan Tidak Mampu (SKTM)',
  'Surat Pengantar Nikah (N1-N4)',
  'Surat Keterangan Kelahiran',
  'Surat Keterangan Kematian',
  'Surat Keterangan Pindah Penduduk',
  'Surat Keterangan Belum Menikah',
  'Surat Pengantar Catatan Kepolisian (SKCK)',
];

export const OnlineServiceModal: React.FC<OnlineServiceModalProps> = ({
  isOpen,
  onClose,
  requests,
  onSubmitRequest,
  onViewLetter,
  initialTrackingResi = '',
}) => {
  const [activeTab, setActiveTab] = useState<'ajukan' | 'lacak'>(initialTrackingResi ? 'lacak' : 'ajukan');
  
  // Form State
  const [nik, setNik] = useState('');
  const [namaWarga, setNamaWarga] = useState('');
  const [noWhatsApp, setNoWhatsApp] = useState('');
  const [jenisSurat, setJenisSurat] = useState<DocumentType>('Surat Keterangan Usaha (SKU)');
  const [keperluan, setKeperluan] = useState('');
  const [lampiranName, setLampiranName] = useState('KTP_dan_KK_Warga.pdf');
  const [submittedResi, setSubmittedResi] = useState<string | null>(null);

  // Tracking State
  const [searchQuery, setSearchQuery] = useState(initialTrackingResi);
  const [trackedItem, setTrackedItem] = useState<DocumentRequest | null>(
    initialTrackingResi ? requests.find(r => r.nomorResi.toLowerCase() === initialTrackingResi.toLowerCase()) || null : null
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nik || !namaWarga || !noWhatsApp || !keperluan) return;

    // Generate Nomor Resi
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const generatedResi = `FDR-2026-${randomNum}`;

    onSubmitRequest({
      nomorResi: generatedResi,
      nik: nik.trim(),
      namaWarga: namaWarga.trim(),
      noWhatsApp: noWhatsApp.trim(),
      jenisSurat,
      keperluan: keperluan.trim(),
      fileLampiranName: lampiranName,
    });

    setSubmittedResi(generatedResi);
    // Reset inputs
    setNik('');
    setNamaWarga('');
    setNoWhatsApp('');
    setKeperluan('');
  };

  const handleSearchTracking = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const found = requests.find(
      r => r.nomorResi.toLowerCase() === query || r.nik.includes(query) || r.namaWarga.toLowerCase().includes(query)
    );
    setTrackedItem(found || null);
  };

  const getStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case 'menunggu':
        return <span className="text-amber-800 bg-amber-50 border border-amber-200 text-xs px-2.5 py-1 rounded-md font-medium inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-amber-600" /> Menunggu Verifikasi Staf</span>;
      case 'diproses':
        return <span className="text-blue-800 bg-blue-50 border border-blue-200 text-xs px-2.5 py-1 rounded-md font-medium inline-flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-blue-600" /> Sedang Diproses Sekretariat</span>;
      case 'ttd_kades':
        return <span className="text-purple-800 bg-purple-50 border border-purple-200 text-xs px-2.5 py-1 rounded-md font-medium inline-flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-purple-600" /> Proses TTD Digital Kades</span>;
      case 'selesai':
        return <span className="text-emerald-800 bg-emerald-50 border border-emerald-200 text-xs px-2.5 py-1 rounded-md font-medium inline-flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Selesai & Sah Diterbitkan</span>;
      case 'ditolak':
        return <span className="text-rose-800 bg-rose-50 border border-rose-200 text-xs px-2.5 py-1 rounded-md font-medium inline-flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5 text-rose-600" /> Perlu Perbaikan Berkas</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-emerald-900 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Layanan Administrasi Online Desa Fadoro</h3>
            <p className="text-xs text-emerald-200">
              Pengajuan surat mandiri & pemantauan berkas terintegrasi WhatsApp
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-200 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2">
          <button
            onClick={() => { setActiveTab('ajukan'); setSubmittedResi(null); }}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'ajukan'
                ? 'bg-white text-emerald-800 border-emerald-600 shadow-sm'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            Ajukan Surat Baru
          </button>
          <button
            onClick={() => setActiveTab('lacak')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === 'lacak'
                ? 'bg-white text-emerald-800 border-emerald-600 shadow-sm'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <Search className="w-4 h-4" />
            Lacak Status Permohonan
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'ajukan' ? (
            submittedResi ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">Permohonan Berhasil Dikirim!</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Petugas Pemerintah Desa Fadoro telah menerima pengajuan Anda. Notifikasi WhatsApp konfirmasi telah disiapkan.
                  </p>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 max-w-sm mx-auto text-left space-y-2">
                  <div className="text-[11px] text-emerald-800 font-semibold uppercase tracking-wider">
                    Nomor Resi / Tiket Anda:
                  </div>
                  <div className="text-xl font-bold font-mono text-emerald-950 bg-white px-3 py-2 rounded-lg border border-emerald-300 flex items-center justify-between">
                    <span>{submittedResi}</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(submittedResi)}
                      className="text-xs font-sans text-emerald-700 font-medium hover:underline"
                    >
                      Salin Resi
                    </button>
                  </div>
                  <p className="text-[11px] text-emerald-700">
                    Simpan nomor resi di atas untuk memeriksa progres surat sewaktu-waktu.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                  <button
                    onClick={() => {
                      setSearchQuery(submittedResi);
                      const req = requests.find(r => r.nomorResi === submittedResi);
                      setTrackedItem(req || null);
                      setActiveTab('lacak');
                    }}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    Lacak Langsung Permohonan Ini
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSubmittedResi(null)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors"
                  >
                    Ajukan Surat Lainnya
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-600 flex items-start gap-2.5">
                  <Shield className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed">
                    Data NIK dan nomor kontak Anda dijamin kerahasiaannya dengan sistem enkripsi data kependudukan desa. Pembaruan status permohonan akan dikirimkan otomatis ke WhatsApp Anda.
                  </p>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Pilih Jenis Surat Layanan:
                  </label>
                  <select
                    value={jenisSurat}
                    onChange={(e) => setJenisSurat(e.target.value as DocumentType)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    {DOCUMENT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Nomor Induk Kependudukan (NIK 16 Digit):
                    </label>
                    <input
                      type="text"
                      maxLength={16}
                      value={nik}
                      onChange={(e) => setNik(e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder="Contoh: 1204051508820001"
                      required
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 font-mono text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Nama Lengkap (Sesuai KTP):
                    </label>
                    <input
                      type="text"
                      value={namaWarga}
                      onChange={(e) => setNamaWarga(e.target.value)}
                      placeholder="Contoh: Yohanes Marunduri"
                      required
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1 flex items-center justify-between">
                      <span>Nomor WhatsApp Aktif:</span>
                      <span className="text-[10px] text-emerald-700 font-normal">Wajib untuk notifikasi</span>
                    </label>
                    <input
                      type="tel"
                      value={noWhatsApp}
                      onChange={(e) => setNoWhatsApp(e.target.value)}
                      placeholder="Contoh: 081264551201"
                      required
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 font-mono text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Lampiran Dokumen Persyaratan (KTP/KK):
                    </label>
                    <input
                      type="text"
                      value={lampiranName}
                      onChange={(e) => setLampiranName(e.target.value)}
                      placeholder="Nama berkas lampiran KTP/KK"
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Tujuan & Keperluan Pengajuan:
                  </label>
                  <textarea
                    rows={3}
                    value={keperluan}
                    onChange={(e) => setKeperluan(e.target.value)}
                    placeholder="Contoh: Syarat pengajuan permohonan kredit usaha mikro di Bank BRI Sirombu..."
                    required
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-slate-600 hover:text-slate-800 font-semibold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    Kirim Permohonan Sekarang
                  </button>
                </div>
              </form>
            )
          ) : (
            <div className="space-y-4">
              <form onSubmit={handleSearchTracking} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Masukkan Nomor Resi (misal: FDR-2026-0042) atau NIK..."
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors shrink-0"
                >
                  Cek Status
                </button>
              </form>

              {trackedItem ? (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div>
                      <span className="text-[11px] text-slate-500 font-mono">Nomor Resi:</span>
                      <h4 className="text-base font-bold font-mono text-emerald-900">{trackedItem.nomorResi}</h4>
                    </div>
                    {getStatusBadge(trackedItem.status)}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 text-[11px]">Nama Pemohon:</span>
                      <p className="font-semibold text-slate-900">{trackedItem.namaWarga}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px]">Jenis Dokumen:</span>
                      <p className="font-semibold text-slate-900">{trackedItem.jenisSurat}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px]">Waktu Pengajuan:</span>
                      <p className="text-slate-700">{trackedItem.tanggalPengajuan}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px]">Pembaruan Terakhir:</span>
                      <p className="text-slate-700">{trackedItem.tanggalUpdate}</p>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
                    <span className="text-[11px] font-semibold text-slate-600 block mb-1">Catatan Petugas Desa:</span>
                    <p className="text-slate-800 leading-relaxed">
                      {trackedItem.catatanPetugas || 'Menunggu peninjauan petugas administrasi kantor desa.'}
                    </p>
                  </div>

                  {/* Flow Steps Indicator */}
                  <div className="pt-2">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                      Tahapan Layanan:
                    </span>
                    <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-medium">
                      <div className={`p-2 rounded-lg border ${trackedItem.status !== 'ditolak' ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                        1. Diajukan
                      </div>
                      <div className={`p-2 rounded-lg border ${['diproses', 'ttd_kades', 'selesai'].includes(trackedItem.status) ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                        2. Diverifikasi
                      </div>
                      <div className={`p-2 rounded-lg border ${['ttd_kades', 'selesai'].includes(trackedItem.status) ? 'bg-purple-50 border-purple-300 text-purple-800' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                        3. TTD Kades
                      </div>
                      <div className={`p-2 rounded-lg border ${trackedItem.status === 'selesai' ? 'bg-emerald-600 text-white border-emerald-600 font-bold' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                        4. Siap Diterbitkan
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons for Document */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200">
                    <a
                      href={getWhatsAppDirectUrl(trackedItem.noWhatsApp, generateWhatsAppMessage(trackedItem, trackedItem.status))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1.5 p-1"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                      Kirim Salinan ke WhatsApp
                    </a>

                    {trackedItem.status === 'selesai' && (
                      <button
                        onClick={() => onViewLetter(trackedItem)}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Printer className="w-4 h-4" />
                        Lihat & Cetak Dokumen Resmi
                      </button>
                    )}
                  </div>
                </div>
              ) : searchQuery ? (
                <div className="text-center py-8 text-slate-500 space-y-2">
                  <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
                  <p className="text-xs">
                    Nomor resi atau data permohonan <span className="font-mono font-bold text-slate-800">"{searchQuery}"</span> tidak ditemukan.
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Pastikan nomor resi ditulis lengkap seperti <span className="font-mono">FDR-2026-0042</span>.
                  </p>
                </div>
              ) : (
                <div className="text-center py-6 text-slate-500 text-xs">
                  <p>Masukkan Nomor Resi Anda di atas untuk memantau status pengajuan secara real-time.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
