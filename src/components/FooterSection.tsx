import React from 'react';
import { Phone, Mail, MapPin, MessageSquare, ExternalLink, ShieldCheck } from 'lucide-react';
import { PROFIL_DESA } from '../data/mockData';
import { VillageEmblem } from './VillageEmblem';

interface FooterSectionProps {
  onOpenLocationModal: () => void;
  onOpenPrivacyInfo: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onOpenLocationModal,
  onOpenPrivacyInfo,
}) => {
  const whatsappUrl = `https://wa.me/${PROFIL_DESA.kontak.whatsapp}?text=${encodeURIComponent('Halo Pemerintah Desa Fadoro, saya warga ingin menanyakan perihal...')}`;

  return (
    <footer id="kontak" className="bg-[#032e22] text-white pt-12 pb-8 border-t-4 border-emerald-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Banner Matching Mockup */}
        <div className="bg-[#044a37] rounded-3xl p-6 sm:p-10 border border-emerald-600/40 shadow-xl mb-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-white">
              Hubungi Pemerintah Desa Fadoro
            </h3>
            <p className="text-sm text-emerald-200">
              Kantor Desa Fadoro, Kecamatan Sirombu, Kabupaten Nias Barat, Provinsi Sumatera Utara
            </p>
            <p className="text-xs text-emerald-300/80">
              Jam Kerja: {PROFIL_DESA.kontak.jamLayanan}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl flex items-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>WhatsApp Desa</span>
            </a>

            <button
              onClick={onOpenLocationModal}
              className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl flex items-center gap-2 shadow-lg border border-emerald-600/50 transition-all cursor-pointer"
            >
              <MapPin className="w-5 h-5 text-emerald-300" />
              <span>Lokasi Kantor Desa</span>
            </button>
          </div>
        </div>

        {/* Main Footer Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-emerald-800/80 text-xs sm:text-sm">
          {/* Col 1: Identity */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <VillageEmblem size={44} />
              <div>
                <h4 className="font-black text-lg text-white uppercase tracking-wider">
                  Desa Fadoro
                </h4>
                <p className="text-xs text-emerald-300">
                  Kecamatan Sirombu · Kabupaten Nias Barat
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pr-6">
              Website resmi tata kelola pemerintahan, transparansi APBDes, pelayanan administrasi digital kependudukan terenkripsi AES-256, dan integrasi notifikasi WhatsApp warga.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-300 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Sistem Kriptografi Data Kependudukan Terlindungi</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-2">
            <h5 className="font-bold text-sm text-emerald-200 uppercase tracking-wider mb-3">
              Menu Layanan
            </h5>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#beranda" className="hover:text-white transition-colors">Beranda Utama</a>
              </li>
              <li>
                <a href="#pengumuman" className="hover:text-white transition-colors">Pengumuman & Musdes</a>
              </li>
              <li>
                <a href="#informasi" className="hover:text-white transition-colors">Berita & Kegiatan Desa</a>
              </li>
              <li>
                <a href="#pelayanan" className="hover:text-white transition-colors">Layanan Administrasi Online</a>
              </li>
              <li>
                <a href="#transparansi" className="hover:text-white transition-colors">Transparansi APBDes 2026</a>
              </li>
              <li>
                <a href="#galeri" className="hover:text-white transition-colors">Galeri Foto Warga</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="font-bold text-sm text-emerald-200 uppercase tracking-wider mb-3">
              Kontak Resmi Pemdes
            </h5>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{PROFIL_DESA.kontak.alamat}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono">{PROFIL_DESA.kontak.teleponDisplay}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono">{PROFIL_DESA.kontak.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar Matching Mockup */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-400/80 gap-3">
          <p>© 2026 Pemerintah Desa Fadoro. Semua hak dilindungi.</p>
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={onOpenPrivacyInfo}
              className="hover:text-white underline transition-colors cursor-pointer"
            >
              Kebijakan Enkripsi & Privasi Warga
            </button>
            <span aria-hidden="true">·</span>
            <span>Kec. Sirombu · Kab. Nias Barat</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
