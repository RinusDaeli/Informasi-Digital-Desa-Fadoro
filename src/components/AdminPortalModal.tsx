import React, { useState } from 'react';
import { 
  X, Shield, Lock, Unlock, CheckCircle, FileText, 
  MessageSquare, UserPlus, Key, 
  CheckCheck, Download, Users, DollarSign
} from 'lucide-react';
import { 
  Citizen, DocumentRequest, DocumentStatus, APBDesSummary, 
  WhatsAppNotification, SecurityAuditEntry 
} from '../types';
import { maskNIK, maskKK, verifyAdminPIN, generateDigitalSignature, encryptData } from '../services/cryptoService';
import { generateWhatsAppMessage, getWhatsAppDirectUrl } from '../services/whatsappService';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  citizens: Citizen[];
  onAddCitizen: (citizen: Citizen) => void;
  requests: DocumentRequest[];
  onUpdateRequestStatus: (
    id: string, 
    newStatus: DocumentStatus, 
    notes?: string, 
    nomorSuratResmi?: string, 
    ttdHash?: string
  ) => void;
  apbdes: APBDesSummary;
  onUpdateApbdesCategory: (type: 'pendapatan' | 'belanja', id: string, newRealisasi: number) => void;
  waLogs: WhatsAppNotification[];
  auditLogs: SecurityAuditEntry[];
  onAddAuditLog: (entry: Omit<SecurityAuditEntry, 'id' | 'timestamp'>) => void;
  onViewLetter: (req: DocumentRequest) => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
  citizens,
  onAddCitizen,
  requests,
  onUpdateRequestStatus,
  apbdes,
  onUpdateApbdesCategory,
  waLogs,
  auditLogs,
  onAddAuditLog,
  onViewLetter,
}) => {
  const [activeTab, setActiveTab] = useState<'surat' | 'kependudukan' | 'apbdes' | 'whatsapp' | 'audit'>('surat');

  // Encryption Decryption State
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);

  // New Citizen Form State
  const [showAddCitizenModal, setShowAddCitizenModal] = useState(false);
  const [newNik, setNewNik] = useState('');
  const [newKk, setNewKk] = useState('');
  const [newNama, setNewNama] = useState('');
  const [newJk, setNewJk] = useState<'Laki-laki' | 'Perempuan'>('Laki-laki');
  const [newTempatLahir, setNewTempatLahir] = useState('Fadoro');
  const [newTglLahir, setNewTglLahir] = useState('1995-01-01');
  const [newAgama, setNewAgama] = useState('Kristen Protestan');
  const [newPekerjaan, setNewPekerjaan] = useState('Petani');
  const [newDusun, setNewDusun] = useState<'Dusun I Hilimbowo' | 'Dusun II Onohonde' | 'Dusun III Fadoro Pantai'>('Dusun I Hilimbowo');
  const [newPhone, setNewPhone] = useState('');

  // Dusun Filter
  const [dusunFilter, setDusunFilter] = useState('all');

  // Export CSV State
  const [exportNotification, setExportNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleExportCSV = () => {
    const headers = [
      'No',
      'ID Warga',
      'Nama Lengkap',
      'NIK (KTP)',
      'Nomor Kartu Keluarga (KK)',
      'Jenis Kelamin',
      'Tempat Lahir',
      'Tanggal Lahir',
      'Agama',
      'Pendidikan',
      'Pekerjaan',
      'Status Perkawinan',
      'Wilayah Dusun',
      'Alamat Lengkap',
      'Nomor Handphone / WhatsApp',
      'Penerima Bantuan Sosial (BLT)',
      'Status Kependudukan',
      'Hash Kriptografi SHA-256',
      'Tanggal Pembaruan'
    ];

    const rows = filteredCitizens.map((c, index) => [
      (index + 1).toString(),
      c.id,
      c.nama,
      isDecrypted ? c.nik : maskNIK(c.nik),
      isDecrypted ? c.noKK : maskKK(c.noKK),
      c.jenisKelamin,
      c.tempatLahir,
      c.tanggalLahir,
      c.agama,
      c.pendidikan,
      c.pekerjaan,
      c.statusKawin,
      c.alamatDusun,
      'Desa Fadoro, Kec. Sirombu, Kab. Nias Barat, Sumatera Utara',
      c.noHp,
      c.isBansosRecipient ? 'Ya (KPM BLT)' : 'Bukan Penerima',
      c.statusKependudukan,
      c.hashVerification,
      c.updatedAt
    ]);

    // Format CSV with proper quoting and UTF-8 BOM (\uFEFF) for Excel
    const csvContent = [
      headers.map(h => `"${h.replace(/"/g, '""')}"`).join(','),
      ...rows.map(row => row.map(cell => `"${(cell ?? '').toString().replace(/"/g, '""')}"`).join(','))
    ].join('\r\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    const modeStr = isDecrypted ? 'LENGKAP_UNLOCKED' : 'TERENKRIPSI_MASKED';
    const fileName = `Data_Kependudukan_Desa_Fadoro_${modeStr}_${dateStr}.csv`;

    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setExportNotification(`Berhasil mengekspor ${filteredCitizens.length} data warga ke file "${fileName}".`);
    setTimeout(() => setExportNotification(null), 6000);

    onAddAuditLog({
      user: 'Kepala Desa (TAROMALIMO ZIDUHU MARUNDURI)',
      role: 'Kepala Desa',
      action: 'EXPORT_DATA_WARGA',
      target: `Ekspor CSV Data Warga (${filteredCitizens.length} baris - ${isDecrypted ? 'Plaintext NIK Terbuka' : 'Sensor Masking NIK'})`,
      ipAddress: '180.252.14.88 (Kantor Desa)',
      status: 'SUCCESS'
    });
  };

  const handleUnlockPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPIN(pinInput)) {
      setIsDecrypted(true);
      setShowPinModal(false);
      setPinError(false);
      setPinInput('');
      onAddAuditLog({
        user: 'Kepala Desa (TAROMALIMO ZIDUHU MARUNDURI)',
        role: 'Kepala Desa',
        action: 'DECRYPT_DATA_WARGA',
        target: 'Buka Kunci Enkripsi NIK & KK Kependudukan',
        ipAddress: '180.252.14.88 (Kantor Desa)',
        status: 'SUCCESS'
      });
    } else {
      setPinError(true);
      onAddAuditLog({
        user: 'Unknown Admin Attempt',
        role: 'Tamu',
        action: 'DECRYPT_DATA_WARGA',
        target: 'Gagal verifikasi PIN Keamanan',
        ipAddress: '180.252.14.88',
        status: 'DENIED'
      });
    }
  };

  const handleAddCitizenSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNik || !newKk || !newNama) return;

    const payloadObj = {
      nik: newNik,
      noKK: newKk,
      nama: newNama,
      dusun: newDusun,
      securedAt: new Date().toISOString()
    };

    const { ciphertext, hash } = await encryptData(payloadObj);

    const newCitizen: Citizen = {
      id: 'ctz-' + Date.now(),
      nik: newNik,
      noKK: newKk,
      nama: newNama,
      jenisKelamin: newJk,
      tempatLahir: newTempatLahir,
      tanggalLahir: newTglLahir,
      agama: newAgama,
      pendidikan: 'SMA / Sederajat',
      pekerjaan: newPekerjaan,
      statusKawin: 'Kawin',
      alamatDusun: newDusun,
      noHp: newPhone || '081200000000',
      isBansosRecipient: false,
      statusKependudukan: 'Tetap',
      encryptedPayload: ciphertext,
      hashVerification: hash,
      updatedAt: new Date().toISOString().split('T')[0],
    };

    onAddCitizen(newCitizen);
    setShowAddCitizenModal(false);

    // Reset Form
    setNewNik('');
    setNewKk('');
    setNewNama('');
    setNewPhone('');

    onAddAuditLog({
      user: 'Kepala Desa (TAROMALIMO ZIDUHU MARUNDURI)',
      role: 'Kepala Desa',
      action: 'UPDATE_STATUS_SURAT',
      target: `Tambah Warga Baru: ${newNama} (Terenkripsi AES-256)`,
      ipAddress: '180.252.14.88 (Kantor Desa)',
      status: 'SUCCESS'
    });
  };

  const handleSignDocument = async (req: DocumentRequest) => {
    const regNo = `470/${Math.floor(100 + Math.random() * 900)}/${req.jenisSurat.includes('SKU') ? 'SKU' : req.jenisSurat.includes('SKTM') ? 'SKTM' : 'FDR'}/${new Date().getFullYear()}`;
    const signHash = await generateDigitalSignature(regNo, req.nomorResi, new Date().toISOString());

    onUpdateRequestStatus(
      req.id,
      'selesai',
      'Dokumen telah diverifikasi dan ditandatangani secara digital oleh Kepala Desa (TAROMALIMO ZIDUHU MARUNDURI).',
      regNo,
      signHash
    );

    onAddAuditLog({
      user: 'Kepala Desa TAROMALIMO ZIDUHU MARUNDURI',
      role: 'Kepala Desa',
      action: 'DIGITAL_SIGN_LETTER',
      target: `Tanda Tangan Digital Surat ${req.jenisSurat} - Pemohon ${req.namaWarga}`,
      ipAddress: '180.252.14.88 (Kantor Desa)',
      status: 'SUCCESS'
    });
  };

  const filteredCitizens = citizens.filter(c => {
    if (dusunFilter === 'all') return true;
    return c.alamatDusun.toLowerCase().includes(dusunFilter.toLowerCase());
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full overflow-hidden border border-slate-200 flex flex-col h-[92vh]">
        {/* Top Header of Admin Workspace */}
        <div className="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-inner">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold">Ruang Kerja Kepala Desa Fadoro</h2>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] px-2 py-0.5 rounded-full font-mono">
                  AES-256 ENCRYPTED
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Pemerintah Desa Fadoro · Kades: <span className="font-semibold text-white">TAROMALIMO ZIDUHU MARUNDURI</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (isDecrypted) {
                  setIsDecrypted(false);
                } else {
                  setShowPinModal(true);
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                isDecrypted
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                  : 'bg-emerald-700 hover:bg-emerald-600 text-white border-emerald-600'
              }`}
            >
              {isDecrypted ? (
                <>
                  <Unlock className="w-3.5 h-3.5" />
                  Kunci Kembali NIK/KK
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  Buka Kunci Enkripsi (PIN)
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg transition-colors bg-slate-800"
              title="Tutup Ruang Kerja"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-100 px-6 pt-2 gap-1 text-xs font-medium">
          <button
            onClick={() => setActiveTab('surat')}
            className={`px-4 py-2.5 rounded-t-lg transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'surat'
                ? 'bg-white text-emerald-800 border-emerald-600 font-bold shadow-sm'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            Verifikasi & TTD Surat ({requests.filter(r => r.status !== 'selesai').length})
          </button>

          <button
            onClick={() => setActiveTab('kependudukan')}
            className={`px-4 py-2.5 rounded-t-lg transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'kependudukan'
                ? 'bg-white text-emerald-800 border-emerald-600 font-bold shadow-sm'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            Brankas Kependudukan Terenkripsi ({citizens.length})
          </button>

          <button
            onClick={() => setActiveTab('apbdes')}
            className={`px-4 py-2.5 rounded-t-lg transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'apbdes'
                ? 'bg-white text-emerald-800 border-emerald-600 font-bold shadow-sm'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            Kelola Transparansi APBDes
          </button>

          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`px-4 py-2.5 rounded-t-lg transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'whatsapp'
                ? 'bg-white text-emerald-800 border-emerald-600 font-bold shadow-sm'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Log WhatsApp Terkirim ({waLogs.length})
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2.5 rounded-t-lg transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'audit'
                ? 'bg-white text-emerald-800 border-emerald-600 font-bold shadow-sm'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <Shield className="w-4 h-4" />
            Audit Keamanan Enkripsi
          </button>
        </div>

        {/* Tab Content Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
          {/* TAB 1: VERIFIKASI & TTD DIGITAL SURAT */}
          {activeTab === 'surat' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Antrean Permohonan Dokumen Administrasi Warga
                  </h3>
                  <p className="text-xs text-slate-500">
                    Periksa berkas persyaratan, bubuhkan Tanda Tangan Digital Kepala Desa, dan kirimkan update otomatis ke WhatsApp warga.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-800 font-medium border border-amber-200">
                    Menunggu: {requests.filter(r => r.status === 'menunggu').length}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-purple-50 text-purple-800 font-medium border border-purple-200">
                    Siap TTD: {requests.filter(r => r.status === 'ttd_kades').length}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 font-medium border border-emerald-200">
                    Selesai: {requests.filter(r => r.status === 'selesai').length}
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 uppercase tracking-wider text-[11px] font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Resi & Tanggal</th>
                      <th className="py-3 px-4">Nama Pemohon & NIK</th>
                      <th className="py-3 px-4">Jenis Surat & Keperluan</th>
                      <th className="py-3 px-4">WhatsApp</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Aksi Kepala Desa / Admin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {requests.map((req) => (
                      <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-4 font-mono">
                          <span className="font-bold text-emerald-900">{req.nomorResi}</span>
                          <span className="block text-[11px] text-slate-500 font-sans mt-0.5">{req.tanggalPengajuan}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-slate-900">{req.namaWarga}</span>
                          <span className="block font-mono text-slate-500 text-[11px]">
                            {isDecrypted ? req.nik : maskNIK(req.nik)}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs">
                          <span className="font-semibold text-slate-800">{req.jenisSurat}</span>
                          <p className="text-[11px] text-slate-600 truncate mt-0.5">{req.keperluan}</p>
                          {req.fileLampiranName && (
                            <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-1 mt-1">
                              📎 {req.fileLampiranName}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[11px]">
                          <a
                            href={getWhatsAppDirectUrl(req.noWhatsApp, generateWhatsAppMessage(req, req.status))}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-700 hover:text-emerald-900 font-medium flex items-center gap-1"
                            title="Kirim Pesan WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                            {req.noWhatsApp}
                          </a>
                        </td>
                        <td className="py-3.5 px-4">
                          {req.status === 'menunggu' && (
                            <span className="bg-amber-100 text-amber-800 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                              Menunggu Verifikasi
                            </span>
                          )}
                          {req.status === 'diproses' && (
                            <span className="bg-blue-100 text-blue-800 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                              Diproses Staf
                            </span>
                          )}
                          {req.status === 'ttd_kades' && (
                            <span className="bg-purple-100 text-purple-800 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                              Menunggu TTD Kades
                            </span>
                          )}
                          {req.status === 'selesai' && (
                            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                              Selesai (Sah)
                            </span>
                          )}
                          {req.status === 'ditolak' && (
                            <span className="bg-rose-100 text-rose-800 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                              Ditolak
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-1 whitespace-nowrap">
                          {req.status === 'menunggu' && (
                            <button
                              onClick={() => onUpdateRequestStatus(req.id, 'diproses', 'Berkas KTP/KK telah diverifikasi oleh Staf Pelayanan Desa.')}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded text-[11px] font-semibold transition-colors"
                            >
                              Verifikasi Berkas
                            </button>
                          )}

                          {req.status === 'diproses' && (
                            <button
                              onClick={() => onUpdateRequestStatus(req.id, 'ttd_kades', 'Konsep surat selesai disusun, diajukan untuk TTD Kepala Desa Taromalimo Ziduhu Marunduri.')}
                              className="bg-purple-600 hover:bg-purple-700 text-white px-2.5 py-1 rounded text-[11px] font-semibold transition-colors"
                            >
                              Ajukan ke Kades
                            </button>
                          )}

                          {req.status === 'ttd_kades' && (
                            <button
                              onClick={() => handleSignDocument(req)}
                              className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1 rounded text-[11px] font-bold flex items-center gap-1.5 transition-colors shadow-sm inline-flex"
                            >
                              <Shield className="w-3.5 h-3.5" />
                              Bubuhkan TTD Kades
                            </button>
                          )}

                          {req.status === 'selesai' && (
                            <button
                              onClick={() => onViewLetter(req)}
                              className="bg-slate-800 hover:bg-slate-900 text-white px-2.5 py-1 rounded text-[11px] font-semibold transition-colors inline-flex items-center gap-1"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              Cetak Surat
                            </button>
                          )}

                          <a
                            href={getWhatsAppDirectUrl(req.noWhatsApp, generateWhatsAppMessage(req, req.status))}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-1 rounded text-[11px] font-semibold inline-flex items-center gap-1"
                            title="Kirim Update ke WhatsApp Warga"
                          >
                            <MessageSquare className="w-3 h-3 text-emerald-600" />
                            Kirim WA
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: BRANKAS DATA KEPENDUDUKAN TERENKRIPSI */}
          {activeTab === 'kependudukan' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">
                      Brankas Data Kependudukan Warga Desa Fadoro
                    </h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      isDecrypted ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {isDecrypted ? 'DECRYPTED (PLAIN SENSITIF TERBUKA)' : 'TERENKRIPSI (AES-256 SENSOR AKTIF)'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Data KTP, KK, dan identitas warga disimpan aman sesuai standar enkripsi ketat untuk melindungi privasi.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={dusunFilter}
                    onChange={(e) => setDusunFilter(e.target.value)}
                    className="text-xs bg-slate-100 border border-slate-300 rounded-lg px-2.5 py-1.5 font-medium text-slate-700"
                  >
                    <option value="all">Semua Dusun (I, II, III)</option>
                    <option value="Dusun I">Dusun I Hilimbowo</option>
                    <option value="Dusun II">Dusun II Onohonde</option>
                    <option value="Dusun III">Dusun III Fadoro Pantai</option>
                  </select>

                  <button
                    onClick={handleExportCSV}
                    className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                    title="Unduh backup data warga ke format file CSV/Excel untuk arsip fisik desa"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Ekspor CSV ({isDecrypted ? 'Plaintext' : 'Tersensor'})</span>
                  </button>

                  <button
                    onClick={() => setShowAddCitizenModal(true)}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    Tambah Data Warga
                  </button>
                </div>
              </div>

              {/* Export Success Notification Banner */}
              {exportNotification && (
                <div className="bg-emerald-100 border border-emerald-300 text-emerald-950 px-4 py-2.5 rounded-xl text-xs flex items-center justify-between shadow-sm animate-in fade-in duration-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="font-semibold">{exportNotification}</span>
                  </div>
                  <button
                    onClick={() => setExportNotification(null)}
                    className="text-emerald-700 hover:text-emerald-900 font-bold ml-3"
                  >
                    Tutup
                  </button>
                </div>
              )}

              {/* Security Advisory & Export Mode Banner */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-emerald-900">
                <div className="flex items-start gap-3">
                  <Lock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Protokol Keamanan Data Kependudukan & Ekspor Arsip Desa:</span>
                    <span>
                      {isDecrypted 
                        ? 'Kunci enkripsi terbuka: Ekspor CSV akan memuat NIK & KK lengkap tanpa sensor untuk arsip buku kependudukan desa. Aksi tercatat di log audit.'
                        : 'Enkripsi aktif: NIK & KK disensor masking (120405******0001). Buka kunci PIN bila ingin mengekspor NIK utuh untuk pencetakan dokumen fisik.'}
                    </span>
                  </div>
                </div>

                {!isDecrypted && (
                  <button
                    onClick={() => setShowPinModal(true)}
                    className="text-emerald-800 hover:text-emerald-950 underline font-semibold shrink-0 cursor-pointer text-[11px]"
                  >
                    Buka PIN untuk NIK Lengkap
                  </button>
                )}
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 uppercase tracking-wider text-[11px] font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Nama Warga</th>
                      <th className="py-3 px-4">NIK (KTP)</th>
                      <th className="py-3 px-4">Nomor KK</th>
                      <th className="py-3 px-4">Jenis Kelamin / Usia</th>
                      <th className="py-3 px-4">Dusun / Alamat</th>
                      <th className="py-3 px-4">Pekerjaan</th>
                      <th className="py-3 px-4">Status Bansos</th>
                      <th className="py-3 px-4 text-right">Integritas Cipher</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredCitizens.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4">
                          <span className="font-bold text-slate-900">{c.nama}</span>
                          <span className="block text-[10px] text-slate-400 font-mono">ID: {c.id}</span>
                        </td>
                        <td className="py-3 px-4 font-mono font-semibold">
                          {isDecrypted ? (
                            <span className="text-slate-900 bg-amber-50 px-1 py-0.5 rounded border border-amber-200">
                              {c.nik}
                            </span>
                          ) : (
                            <span className="text-slate-500">{maskNIK(c.nik)}</span>
                          )}
                        </td>
                        <td className="py-3 px-4 font-mono">
                          {isDecrypted ? (
                            <span className="text-slate-900 bg-amber-50 px-1 py-0.5 rounded border border-amber-200">
                              {c.noKK}
                            </span>
                          ) : (
                            <span className="text-slate-500">{maskKK(c.noKK)}</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span>{c.jenisKelamin}</span>
                          <span className="block text-[11px] text-slate-500">{c.tempatLahir}, {c.tanggalLahir}</span>
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-800">
                          {c.alamatDusun}
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {c.pekerjaan}
                        </td>
                        <td className="py-3 px-4">
                          {c.isBansosRecipient ? (
                            <span className="bg-emerald-100 text-emerald-800 font-semibold text-[10px] px-2 py-0.5 rounded-full">
                              Penerima BLT
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[11px]">Bukan KPM</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200" title={c.encryptedPayload}>
                            SHA-256: {c.hashVerification.slice(0, 8)}...
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: MANAJEMEN APBDES */}
          {activeTab === 'apbdes' && (
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Manajemen Anggaran Pendapatan dan Belanja Desa (APBDes TA 2026)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Perbarui realisasi anggaran kas desa untuk menjaga transparansi kepada seluruh masyarakat Fadoro.
                  </p>
                </div>
                <div className="text-right text-xs">
                  <span className="text-slate-500 block">Total Anggaran Belanja:</span>
                  <span className="text-base font-bold text-emerald-900">
                    Rp {apbdes.totalBelanja.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Pos Pendapatan */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-emerald-800">
                  1. Rincian Pos Pendapatan Desa (DDS, ADD, PADes)
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">Kode</th>
                        <th className="py-2.5 px-3">Uraian Sumber Pendapatan</th>
                        <th className="py-2.5 px-3 text-right">Target Anggaran</th>
                        <th className="py-2.5 px-3 text-right">Realisasi (Rp)</th>
                        <th className="py-2.5 px-3 text-right">Persen</th>
                        <th className="py-2.5 px-3 text-center">Update</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {apbdes.pendapatan.map(item => (
                        <tr key={item.id} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-mono font-semibold">{item.kode}</td>
                          <td className="py-2.5 px-3 font-medium text-slate-900">{item.uraian}</td>
                          <td className="py-2.5 px-3 text-right font-mono">
                            Rp {item.anggaran.toLocaleString('id-ID')}
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono font-semibold text-emerald-800">
                            Rp {item.realisasi.toLocaleString('id-ID')}
                          </td>
                          <td className="py-2.5 px-3 text-right font-bold text-slate-700">
                            {item.persentase.toFixed(1)}%
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <button
                              onClick={() => {
                                const input = prompt(`Masukkan jumlah realisasi baru untuk ${item.uraian} (Rp):`, item.realisasi.toString());
                                if (input && !isNaN(Number(input))) {
                                  onUpdateApbdesCategory('pendapatan', item.id, Number(input));
                                }
                              }}
                              className="text-emerald-700 hover:text-emerald-900 font-semibold text-[11px] underline"
                            >
                              Ubah Realisasi
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pos Belanja */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-emerald-800">
                  2. Rincian Pos Belanja Desa (Bidang Pemerintahan, Pembangunan, Pemberdayaan)
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">Kode</th>
                        <th className="py-2.5 px-3">Bidang Belanja</th>
                        <th className="py-2.5 px-3 text-right">Pagu Anggaran</th>
                        <th className="py-2.5 px-3 text-right">Realisasi (Rp)</th>
                        <th className="py-2.5 px-3 text-right">Serapan (%)</th>
                        <th className="py-2.5 px-3 text-center">Update</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {apbdes.belanja.map(item => (
                        <tr key={item.id} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-mono font-semibold">{item.kode}</td>
                          <td className="py-2.5 px-3 font-medium text-slate-900">{item.uraian}</td>
                          <td className="py-2.5 px-3 text-right font-mono">
                            Rp {item.anggaran.toLocaleString('id-ID')}
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono font-semibold text-blue-800">
                            Rp {item.realisasi.toLocaleString('id-ID')}
                          </td>
                          <td className="py-2.5 px-3 text-right font-bold text-slate-700">
                            {item.persentase.toFixed(1)}%
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <button
                              onClick={() => {
                                const input = prompt(`Masukkan jumlah realisasi baru untuk ${item.uraian} (Rp):`, item.realisasi.toString());
                                if (input && !isNaN(Number(input))) {
                                  onUpdateApbdesCategory('belanja', item.id, Number(input));
                                }
                              }}
                              className="text-emerald-700 hover:text-emerald-900 font-semibold text-[11px] underline"
                            >
                              Ubah Realisasi
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LOG WHATSAPP NOTIFIKASI */}
          {activeTab === 'whatsapp' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Riwayat Transmisi Notifikasi WhatsApp Warga
                  </h3>
                  <p className="text-xs text-slate-500">
                    Log otomatis pengiriman informasi status berkas, surat keluar, dan pengumuman desa via WhatsApp API.
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200">
                  Total Pesan: {waLogs.length} Terkirim
                </span>
              </div>

              <div className="space-y-3">
                {waLogs.length === 0 ? (
                  <div className="text-center py-10 bg-white rounded-xl border border-slate-200 text-slate-500 text-xs">
                    Belum ada notifikasi WhatsApp yang dikirimkan. Notifikasi akan tercatat otomatis saat permohonan surat diproses.
                  </div>
                ) : (
                  waLogs.map(log => (
                    <div key={log.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2 text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-emerald-600" />
                          <span className="font-bold text-slate-900">{log.toNama}</span>
                          <span className="font-mono text-slate-500">({log.toPhone})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 text-[11px]">
                            {new Date(log.timestamp).toLocaleString('id-ID')}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                            <CheckCheck className="w-3.5 h-3.5" /> Terkirim
                          </span>
                        </div>
                      </div>

                      <div className="text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-100 whitespace-pre-line font-sans text-[11px] leading-relaxed">
                        {log.pesanText}
                      </div>

                      <div className="flex justify-end pt-1">
                        <a
                          href={getWhatsAppDirectUrl(log.toPhone, log.pesanText)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-emerald-700 hover:text-emerald-900 font-semibold inline-flex items-center gap-1"
                        >
                          Buka di Aplikasi WhatsApp
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 5: AUDIT LOG KEAMANAN & KRIPTOGRAFI */}
          {activeTab === 'audit' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm">
                  Log Audit Keamanan & Dekripsi Akses Data Kependudukan
                </h3>
                <p className="text-xs text-slate-500">
                  Pencatatan real-time terhadap seluruh aktivitas otentikasi data sensitif warga untuk menjamin akuntabilitas aparatur.
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 uppercase tracking-wider text-[11px] font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Waktu</th>
                      <th className="py-3 px-4">Pengguna / Peran</th>
                      <th className="py-3 px-4">Jenis Aksi Kripto</th>
                      <th className="py-3 px-4">Target / Uraian</th>
                      <th className="py-3 px-4">IP Address</th>
                      <th className="py-3 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {auditLogs.map(log => (
                      <tr key={log.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{log.timestamp}</td>
                        <td className="py-3 px-4 font-semibold text-slate-900">{log.user}</td>
                        <td className="py-3 px-4 font-mono text-emerald-900 text-[11px] font-medium">
                          {log.action}
                        </td>
                        <td className="py-3 px-4 text-slate-700">{log.target}</td>
                        <td className="py-3 px-4 font-mono text-slate-500">{log.ipAddress}</td>
                        <td className="py-3 px-4 text-right">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            log.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* PIN Verification Modal */}
        {showPinModal && (
          <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 space-y-4 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Otorisasi PIN Keamanan Desa</h4>
                  <p className="text-xs text-slate-500">Masukkan PIN Kepala Desa untuk dekripsi NIK/KK</p>
                </div>
              </div>

              <form onSubmit={handleUnlockPin} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    PIN Keamanan (Default Demo: 123456):
                  </label>
                  <input
                    type="password"
                    maxLength={6}
                    value={pinInput}
                    onChange={(e) => { setPinInput(e.target.value); setPinError(false); }}
                    placeholder="6 digit PIN"
                    autoFocus
                    required
                    className="w-full text-center tracking-widest text-lg font-mono py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none"
                  />
                  {pinError && (
                    <p className="text-[11px] text-rose-600 mt-1">PIN salah! Masukkan 123456.</p>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => { setShowPinModal(false); setPinError(false); }}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800 font-semibold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors"
                  >
                    Verifikasi PIN
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Citizen Form Modal */}
        {showAddCitizenModal && (
          <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200 max-h-[90vh] overflow-y-auto text-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-emerald-700" />
                  <h4 className="font-bold text-slate-900 text-sm">Input Data Kependudukan Warga Baru</h4>
                </div>
                <button onClick={() => setShowAddCitizenModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddCitizenSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">NIK (16 Digit):</label>
                    <input
                      type="text"
                      maxLength={16}
                      value={newNik}
                      onChange={(e) => setNewNik(e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder="120405..."
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Nomor Kartu Keluarga (KK):</label>
                    <input
                      type="text"
                      maxLength={16}
                      value={newKk}
                      onChange={(e) => setNewKk(e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder="120405..."
                      required
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Lengkap:</label>
                  <input
                    type="text"
                    value={newNama}
                    onChange={(e) => setNewNama(e.target.value)}
                    placeholder="Nama sesuai KTP..."
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Jenis Kelamin:</label>
                    <select
                      value={newJk}
                      onChange={(e) => setNewJk(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                    >
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Wilayah Dusun:</label>
                    <select
                      value={newDusun}
                      onChange={(e) => setNewDusun(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                    >
                      <option value="Dusun I Hilimbowo">Dusun I Hilimbowo</option>
                      <option value="Dusun II Onohonde">Dusun II Onohonde</option>
                      <option value="Dusun III Fadoro Pantai">Dusun III Fadoro Pantai</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Tempat Lahir:</label>
                    <input
                      type="text"
                      value={newTempatLahir}
                      onChange={(e) => setNewTempatLahir(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Tanggal Lahir:</label>
                    <input
                      type="date"
                      value={newTglLahir}
                      onChange={(e) => setNewTglLahir(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Pekerjaan:</label>
                    <input
                      type="text"
                      value={newPekerjaan}
                      onChange={(e) => setNewPekerjaan(e.target.value)}
                      placeholder="Petani / Nelayan / Guru"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">No. Handphone / WhatsApp:</label>
                    <input
                      type="tel"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      placeholder="0812..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
                    />
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-800 text-[11px]">
                  Data yang disimpan akan langsung dienkripsi menggunakan algoritma AES-256 GCM dengan signature hash SHA-256 otomatis.
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddCitizenModal(false)}
                    className="px-3 py-1.5 text-slate-600 hover:text-slate-800 font-semibold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                  >
                    Enkripsi & Simpan Data Warga
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
