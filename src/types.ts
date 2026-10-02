export type Role = 'public_warga' | 'admin_kades';

export interface Citizen {
  id: string;
  nik: string; // Plaintext (masked in UI by default)
  noKK: string; // Plaintext (masked in UI by default)
  nama: string;
  jenisKelamin: 'Laki-laki' | 'Perempuan';
  tempatLahir: string;
  tanggalLahir: string;
  agama: string;
  pendidikan: string;
  pekerjaan: string;
  statusKawin: 'Kawin' | 'Belum Kawin' | 'Cerai Hidup' | 'Cerai Mati';
  alamatDusun: 'Dusun I Hilimbowo' | 'Dusun II Onohonde' | 'Dusun III Fadoro Pantai';
  noHp: string;
  isBansosRecipient: boolean;
  statusKependudukan: 'Tetap' | 'Pindah' | 'Meninggal';
  encryptedPayload: string; // Simulated AES-GCM 256 cipher string
  hashVerification: string; // SHA-256 integrity hash
  updatedAt: string;
}

export type DocumentType = 
  | 'Surat Keterangan Usaha (SKU)'
  | 'Surat Keterangan Domisili (SKD)'
  | 'Surat Keterangan Tidak Mampu (SKTM)'
  | 'Surat Pengantar Nikah (N1-N4)'
  | 'Surat Keterangan Kelahiran'
  | 'Surat Keterangan Kematian'
  | 'Surat Keterangan Pindah Penduduk'
  | 'Surat Keterangan Belum Menikah'
  | 'Surat Pengantar Catatan Kepolisian (SKCK)';

export type DocumentStatus = 'menunggu' | 'diproses' | 'ttd_kades' | 'selesai' | 'ditolak';

export interface DocumentRequest {
  id: string;
  nomorResi: string; // e.g. FDR-2026-0042
  nik: string;
  namaWarga: string;
  noWhatsApp: string;
  jenisSurat: DocumentType;
  keperluan: string;
  status: DocumentStatus;
  tanggalPengajuan: string;
  tanggalUpdate: string;
  catatanPetugas?: string;
  nomorSuratResmi?: string;
  fileLampiranName?: string;
  ttdDigitalHash?: string;
  ttdDate?: string;
}

export interface APBDesCategory {
  id: string;
  kode: string;
  uraian: string;
  anggaran: number;
  realisasi: number;
  persentase: number;
  keterangan: string;
}

export interface APBDesSummary {
  tahunAnggaran: number;
  totalPendapatan: number;
  realisasiPendapatan: number;
  totalBelanja: number;
  realisasiBelanja: number;
  surplusDefisit: number;
  pendapatan: APBDesCategory[];
  belanja: APBDesCategory[];
  pembiayaan: APBDesCategory[];
  kegiatanPembangunan: {
    id: string;
    namaKegiatan: string;
    lokasi: string;
    anggaran: number;
    realisasi: number;
    volume: string;
    sumberDana: string;
    progressPersen: number;
    status: 'Selesai 100%' | 'Tahap Pengerjaan' | 'Persiapan';
  }[];
}

export interface Announcement {
  id: string;
  judul: string;
  kategori: 'Gotong Royong' | 'Musyawarah Desa' | 'Bansos BLT' | 'Kesehatan' | 'Pemberitahuan';
  tanggal: string;
  lokasi: string;
  isiRingkas: string;
  isiLengkap: string;
  penulis: string;
  isActive: boolean;
}

export interface NewsItem {
  id: string;
  judul: string;
  kategori: string;
  tanggal: string;
  ringkasan: string;
  isiLengkap: string;
  penulis: string;
  dibaca: number;
  thumbnailTag: string;
}

export interface GalleryPhoto {
  id: string;
  judul: string;
  kategori: 'Pemerintahan' | 'Pembangunan' | 'Pertanian' | 'Peternakan' | 'Gotong Royong' | 'Kegiatan Masyarakat';
  tanggal: string;
  deskripsi: string;
  tagColor: string;
}

export interface WhatsAppNotification {
  id: string;
  timestamp: string;
  toNama: string;
  toPhone: string;
  nomorResi: string;
  jenisSurat: string;
  statusTerkini: DocumentStatus;
  pesanText: string;
  deliveryStatus: 'Terkirim' | 'Dibaca';
}

export interface SecurityAuditEntry {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: 'DECRYPT_DATA_WARGA' | 'VIEW_SENSITIVE_NIK' | 'EXPORT_DATA_WARGA' | 'DIGITAL_SIGN_LETTER' | 'UPDATE_STATUS_SURAT';
  target: string;
  ipAddress: string;
  status: 'SUCCESS' | 'DENIED';
}
