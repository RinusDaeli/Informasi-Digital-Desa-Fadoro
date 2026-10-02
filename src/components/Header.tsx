import React, { useState } from 'react';
import { Search, Shield, User, Menu, X, Lock, CheckCircle2 } from 'lucide-react';
import { VillageEmblem } from './VillageEmblem';
import { Role } from '../types';

interface HeaderProps {
  currentRole: Role;
  onSwitchRole: (role: Role) => void;
  onOpenAdminPortal: () => void;
  onOpenServiceModal: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onSwitchRole,
  onOpenAdminPortal,
  onOpenServiceModal,
  onNavigateSection,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Beranda', id: 'beranda' },
    { label: 'Profil Desa', id: 'profil' },
    { label: 'Informasi', id: 'informasi' },
    { label: 'Pelayanan', id: 'pelayanan' },
    { label: 'Transparansi', id: 'transparansi' },
    { label: 'Galeri', id: 'galeri' },
    { label: 'Kontak', id: 'kontak' },
  ];

  const handleNavClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#065F46] text-white shadow-md border-b border-emerald-800/80">
      {/* Top Bar Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Wordmark & Emblem */}
          <div 
            onClick={() => handleNavClick('beranda')}
            className="flex items-center gap-3.5 cursor-pointer select-none group"
          >
            <div className="transition-transform group-hover:scale-105 duration-200">
              <VillageEmblem size={48} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-wide font-sans text-white leading-tight">
                  DESA FADORO
                </span>
                <span className="bg-emerald-500/20 text-emerald-200 text-[10px] px-2 py-0.5 rounded border border-emerald-400/30 hidden sm:inline-block font-mono">
                  RESMI
                </span>
              </div>
              <p className="text-xs text-emerald-200 tracking-normal font-sans font-medium">
                Kecamatan Sirombu · Kabupaten Nias Barat
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-emerald-100">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="hover:text-white transition-colors relative py-1 hover:underline underline-offset-8 decoration-emerald-400 decoration-2 cursor-pointer font-sans"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Zone: Search, Service & Admin Switcher */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSearch}
              className="p-2 text-emerald-200 hover:text-white hover:bg-emerald-800/50 rounded-full transition-colors cursor-pointer"
              title="Cari Informasi Desa"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Quick Online Service Button */}
            <button
              onClick={onOpenServiceModal}
              className="hidden sm:flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs px-3.5 py-2 rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              Layanan Online
            </button>

            {/* Role Switcher Pill */}
            <div className="flex items-center bg-emerald-950/60 p-1 rounded-xl border border-emerald-700/60">
              {currentRole === 'admin_kades' ? (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={onOpenAdminPortal}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                    title="Buka Ruang Kerja Kepala Desa"
                  >
                    <Shield className="w-3.5 h-3.5 text-slate-900" />
                    <span>Ruang Kades</span>
                  </button>
                  <button
                    onClick={() => onSwitchRole('public_warga')}
                    className="text-emerald-200 hover:text-white text-[11px] px-2 py-1 transition-colors cursor-pointer"
                    title="Kembali ke Mode Warga"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => onSwitchRole('admin_kades')}
                  className="text-emerald-100 hover:text-white text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors hover:bg-emerald-800/50 cursor-pointer"
                  title="Login Sebagai Kepala Desa Taromalimo Ziduhu Marunduri"
                >
                  <Lock className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Akses Admin</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-emerald-100 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#064E3B] border-t border-emerald-800 px-4 pt-3 pb-6 space-y-2 text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="block w-full text-left py-2 px-3 rounded-lg text-emerald-100 hover:text-white hover:bg-emerald-800 transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-emerald-800 flex flex-col gap-2">
            <button
              onClick={() => { onOpenServiceModal(); setMobileMenuOpen(false); }}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold py-2 px-4 rounded-lg text-center"
            >
              Layanan Administrasi Online
            </button>
            <button
              onClick={() => {
                if (currentRole === 'admin_kades') {
                  onOpenAdminPortal();
                } else {
                  onSwitchRole('admin_kades');
                }
                setMobileMenuOpen(false);
              }}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg text-center flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4 text-emerald-400" />
              {currentRole === 'admin_kades' ? 'Buka Ruang Kerja Kades' : 'Masuk Sebagai Kepala Desa (Admin)'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
