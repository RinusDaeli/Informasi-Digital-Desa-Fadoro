import { DocumentRequest, DocumentStatus, WhatsAppNotification } from '../types';

/**
 * Normalisasi format nomor WhatsApp ke format internasional 628xxx
 */
export function normalizeWhatsAppNumber(phone: string): string {
  let cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1);
  } else if (!cleaned.startsWith('62')) {
    cleaned = '62' + cleaned;
  }
  return cleaned;
}

/**
 * Membuat pesan WhatsApp resmi dari Pemerintah Desa Fadoro
 */
export function generateWhatsAppMessage(request: DocumentRequest, status: DocumentStatus, customNote?: string): string {
  const dateStr = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let statusText = '';
  let detailInfo = '';

  switch (status) {
    case 'menunggu':
      statusText = '⏳ DITERIMA & DALAM ANTREAN';
      detailInfo = 'Permohonan Anda telah tercatat dalam sistem layanan online Desa Fadoro dan sedang menunggu verifikasi awal berkas persyaratan oleh staf tata usaha desa.';
      break;
    case 'diproses':
      statusText = '⚙️ SEDANG DIPROSES & DIVERIFIKASI';
      detailInfo = 'Kelengkapan berkas KTP/KK Anda telah diverifikasi oleh Sekretariat Desa Fadoro. Konsep naskah surat resmi sedang disiapkan.';
      break;
    case 'ttd_kades':
      statusText = '✍️ PROSES TANDA TANGAN DIGITAL KEPALA DESA';
      detailInfo = 'Dokumen surat Anda telah diajukan ke meja Kepala Desa Fadoro (Bpk. TAROMALIMO ZIDUHU MARUNDURI) untuk proses otentikasi Tanda Tangan Digital ber-QR Code terenkripsi.';
      break;
    case 'selesai':
      statusText = '✅ SELESAI & DITANDATANGANI KEPALA DESA';
      detailInfo = `Surat resmi Anda telah terbit dengan No. Registrasi: ${request.nomorSuratResmi || '470/FDR/2026'}. Dokumen sudah dapat diunduh digital melalui portal desa atau diambil langsung di Kantor Desa Fadoro pada jam kerja.`;
      break;
    case 'ditolak':
      statusText = '❌ PERLU PERBAIKAN PERSYARATAN';
      detailInfo = `Mohon maaf, permohonan belum dapat diterbitkan karena: ${customNote || 'Berkas persyaratan KTP/KK kurang jelas atau belum sesuai'}. Silakan ajukan ulang atau hubungi layanan desa.`;
      break;
  }

  return (
`*PEMERINTAH KABUPATEN NIAS BARAT*
*KECAMATAN SIROMBU*
*PEMERINTAH DESA FADORO*
_Media Informasi & Pelayanan Administrasi Warga_
Jl. Desa Fadoro, Kec. Sirombu, Kab. Nias Barat

----------------------------------------
*NOTIFIKASI RESMI LAYANAN DESA ONLINE*
----------------------------------------

Yth. Bapak/Ibu *${request.namaWarga}*,

Berikut pembaruan status permohonan administrasi kependudukan Anda:

📄 *Jenis Layanan:* ${request.jenisSurat}
🔖 *Nomor Resi / Tiket:* ${request.nomorResi}
🎯 *Keperluan:* ${request.keperluan}
📅 *Waktu Pembaruan:* ${dateStr}
🚦 *Status Terkini:* ${statusText}

📌 *Catatan Petugas:*
${detailInfo}

${status === 'selesai' ? `🔗 *Lacak & Unduh Surat:*
https://desafadoro-niasbarat.go.id/layanan/cek?resi=${request.nomorResi}
_Dokumen dilengkapi QR Code & Tanda Tangan Elektronik Sah Kepala Desa Taromalimo Ziduhu Marunduri._` : ''}

Jika ada pertanyaan, silakan balas pesan ini atau datang langsung ke Kantor Desa Fadoro (Senin - Jumat, 08.00 - 15.00 WIB).

_Terima kasih atas partisipasi Anda dalam tata kelola desa yang transparan dan tertib administrasi._

*Pemerintah Desa Fadoro*
Kepala Desa: *TAROMALIMO ZIDUHU MARUNDURI*`
  );
}

/**
 * Buat URL WhatsApp Direct Link (Click to Chat)
 */
export function getWhatsAppDirectUrl(phone: string, message: string): string {
  const normPhone = normalizeWhatsAppNumber(phone);
  return `https://wa.me/${normPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Penyimpanan Log Riwayat WhatsApp ke LocalStorage
 */
const WA_LOGS_KEY = 'fadoro_wa_notifications_log';

export function getStoredWhatsAppLogs(): WhatsAppNotification[] {
  try {
    const raw = localStorage.getItem(WA_LOGS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveWhatsAppLog(notification: Omit<WhatsAppNotification, 'id' | 'timestamp'>): WhatsAppNotification {
  const existing = getStoredWhatsAppLogs();
  const newEntry: WhatsAppNotification = {
    ...notification,
    id: 'wa-notif-' + Date.now(),
    timestamp: new Date().toISOString(),
  };
  const updated = [newEntry, ...existing].slice(0, 50); // Simpan 50 log terakhir
  localStorage.setItem(WA_LOGS_KEY, JSON.stringify(updated));
  return newEntry;
}
