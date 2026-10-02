import React, { useState, useEffect } from 'react';
import { 
  Role, Citizen, DocumentRequest, DocumentStatus, 
  Announcement, NewsItem, GalleryPhoto, WhatsAppNotification, SecurityAuditEntry 
} from './types';
import { 
  INITIAL_CITIZENS, INITIAL_REQUESTS, APBDES_DATA, 
  ANNOUNCEMENTS_DATA, NEWS_DATA, GALLERY_DATA, INITIAL_SECURITY_AUDIT, PROFIL_DESA 
} from './data/mockData';
import { generateWhatsAppMessage, getStoredWhatsAppLogs, saveWhatsAppLog } from './services/whatsappService';

// Layout & Section Components
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SambutanSection } from './components/SambutanSection';
import { PengumumanSection } from './components/PengumumanSection';
import { BeritaSection } from './components/BeritaSection';
import { PelayananSection } from './components/PelayananSection';
import { TransparansiSection } from './components/TransparansiSection';
import { GaleriSection } from './components/GaleriSection';
import { FooterSection } from './components/FooterSection';

// Modals
import { OfficialLetterModal } from './components/OfficialLetterModal';
import { OnlineServiceModal } from './components/OnlineServiceModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { DetailModal } from './components/DetailModal';
import { ProfilModal } from './components/ProfilModal';
import { SearchModal } from './components/SearchModal';
import { RequirementsModal } from './components/RequirementsModal';
import { LocationModal } from './components/LocationModal';
import { WhatsAppPushToast } from './components/WhatsAppPushToast';

export default function App() {
  // Role State
  const [role, setRole] = useState<Role>('public_warga');

  // Persistence State
  const [citizens, setCitizens] = useState<Citizen[]>(() => {
    try {
      const saved = localStorage.getItem('fadoro_citizens_db');
      return saved ? JSON.parse(saved) : INITIAL_CITIZENS;
    } catch {
      return INITIAL_CITIZENS;
    }
  });

  const [requests, setRequests] = useState<DocumentRequest[]>(() => {
    try {
      const saved = localStorage.getItem('fadoro_doc_requests');
      return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
    } catch {
      return INITIAL_REQUESTS;
    }
  });

  const [apbdes, setApbdes] = useState(() => {
    try {
      const saved = localStorage.getItem('fadoro_apbdes_data');
      return saved ? JSON.parse(saved) : APBDES_DATA;
    } catch {
      return APBDES_DATA;
    }
  });

  const [waLogs, setWaLogs] = useState<WhatsAppNotification[]>(() => {
    return getStoredWhatsAppLogs();
  });

  const [auditLogs, setAuditLogs] = useState<SecurityAuditEntry[]>(() => {
    try {
      const saved = localStorage.getItem('fadoro_security_audits');
      return saved ? JSON.parse(saved) : INITIAL_SECURITY_AUDIT;
    } catch {
      return INITIAL_SECURITY_AUDIT;
    }
  });

  // Save to LocalStorage on Change
  useEffect(() => {
    localStorage.setItem('fadoro_citizens_db', JSON.stringify(citizens));
  }, [citizens]);

  useEffect(() => {
    localStorage.setItem('fadoro_doc_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('fadoro_apbdes_data', JSON.stringify(apbdes));
  }, [apbdes]);

  useEffect(() => {
    localStorage.setItem('fadoro_security_audits', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Modal States
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [initialTrackingResi, setInitialTrackingResi] = useState('');
  const [activeLetterReq, setActiveLetterReq] = useState<DocumentRequest | null>(null);
  
  // Detail Reader Modal
  const [detailModalData, setDetailModalData] = useState<{
    type: 'announcement' | 'news' | 'gallery';
    data: Announcement | NewsItem | GalleryPhoto;
  } | null>(null);

  const [isProfilModalOpen, setIsProfilModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isRequirementsModalOpen, setIsRequirementsModalOpen] = useState(false);
  const [locationModalState, setLocationModalState] = useState<{
    isOpen: boolean;
    type: 'location' | 'privacy';
  }>({ isOpen: false, type: 'location' });

  // Floating WhatsApp Push Notification
  const [activeWaToast, setActiveWaToast] = useState<WhatsAppNotification | null>(null);

  // Smooth Scroll Helper
  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'beranda') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (sectionId === 'profil') {
      setIsProfilModalOpen(true);
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Add New Citizen Handler
  const handleAddCitizen = (newCitizen: Citizen) => {
    setCitizens(prev => [newCitizen, ...prev]);
  };

  // Add Security Audit Log Handler
  const handleAddAuditLog = (entry: Omit<SecurityAuditEntry, 'id' | 'timestamp'>) => {
    const newLog: SecurityAuditEntry = {
      ...entry,
      id: 'aud-' + Date.now(),
      timestamp: new Date().toLocaleString('id-ID'),
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Submit New Service Request (Citizen Form)
  const handleSubmitServiceRequest = (
    newReq: Omit<DocumentRequest, 'id' | 'tanggalPengajuan' | 'tanggalUpdate' | 'status'>
  ) => {
    const nowStr = new Date().toLocaleString('id-ID') + ' WIB';
    const completeRequest: DocumentRequest = {
      ...newReq,
      id: 'req-' + Date.now(),
      tanggalPengajuan: nowStr,
      tanggalUpdate: nowStr,
      status: 'menunggu',
      catatanPetugas: 'Permohonan baru masuk, menunggu antrean verifikasi staf tata usaha desa.',
    };

    setRequests(prev => [completeRequest, ...prev]);

    // Generate WhatsApp Notification Log
    const waMsg = generateWhatsAppMessage(completeRequest, 'menunggu');
    const createdNotification = saveWhatsAppLog({
      toNama: completeRequest.namaWarga,
      toPhone: completeRequest.noWhatsApp,
      nomorResi: completeRequest.nomorResi,
      jenisSurat: completeRequest.jenisSurat,
      statusTerkini: 'menunggu',
      pesanText: waMsg,
      deliveryStatus: 'Terkirim',
    });

    setWaLogs(getStoredWhatsAppLogs());
    // Trigger in-app live toast
    setActiveWaToast(createdNotification);
  };

  // Update Request Status (Admin / Kades Action)
  const handleUpdateRequestStatus = (
    id: string,
    newStatus: DocumentStatus,
    notes?: string,
    nomorSuratResmi?: string,
    ttdHash?: string
  ) => {
    const nowStr = new Date().toLocaleString('id-ID') + ' WIB';

    setRequests(prev =>
      prev.map(r => {
        if (r.id === id) {
          const updated: DocumentRequest = {
            ...r,
            status: newStatus,
            tanggalUpdate: nowStr,
            catatanPetugas: notes || r.catatanPetugas,
            nomorSuratResmi: nomorSuratResmi || r.nomorSuratResmi,
            ttdDigitalHash: ttdHash || r.ttdDigitalHash,
            ttdDate: newStatus === 'selesai' ? nowStr : r.ttdDate,
          };

          // Generate Real-time WhatsApp Notification for the Citizen
          const waMsg = generateWhatsAppMessage(updated, newStatus, notes);
          const createdNotif = saveWhatsAppLog({
            toNama: updated.namaWarga,
            toPhone: updated.noWhatsApp,
            nomorResi: updated.nomorResi,
            jenisSurat: updated.jenisSurat,
            statusTerkini: newStatus,
            pesanText: waMsg,
            deliveryStatus: 'Terkirim',
          });

          setWaLogs(getStoredWhatsAppLogs());
          // Show live interactive toast!
          setActiveWaToast(createdNotif);

          return updated;
        }
        return r;
      })
    );
  };

  // Update APBDes Category Realization
  const handleUpdateApbdesCategory = (type: 'pendapatan' | 'belanja', id: string, newRealisasi: number) => {
    setApbdes((prev: typeof APBDES_DATA) => {
      const list = type === 'pendapatan' ? [...prev.pendapatan] : [...prev.belanja];
      const idx = list.findIndex(item => item.id === id);
      if (idx !== -1) {
        list[idx] = {
          ...list[idx],
          realisasi: newRealisasi,
          persentase: (newRealisasi / list[idx].anggaran) * 100,
        };
      }

      if (type === 'pendapatan') {
        const sumReal = list.reduce((acc, curr) => acc + curr.realisasi, 0);
        return {
          ...prev,
          pendapatan: list,
          realisasiPendapatan: sumReal,
        };
      } else {
        const sumReal = list.reduce((acc, curr) => acc + curr.realisasi, 0);
        return {
          ...prev,
          belanja: list,
          realisasiBelanja: sumReal,
        };
      }
    });

    handleAddAuditLog({
      user: 'Kepala Desa (TAROMALIMO ZIDUHU MARUNDURI)',
      role: 'Kepala Desa',
      action: 'UPDATE_STATUS_SURAT',
      target: `Perbarui Realisasi APBDes (${type}) ID: ${id}`,
      ipAddress: '180.252.14.88 (Kantor Desa)',
      status: 'SUCCESS',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-emerald-600 selection:text-white">
      {/* Top Bar Header */}
      <Header
        currentRole={role}
        onSwitchRole={(newRole) => {
          setRole(newRole);
          if (newRole === 'admin_kades') {
            setIsAdminPortalOpen(true);
          }
        }}
        onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
        onOpenServiceModal={() => {
          setInitialTrackingResi('');
          setIsServiceModalOpen(true);
        }}
        onNavigateSection={handleNavigateSection}
        onOpenSearch={() => setIsSearchModalOpen(true)}
      />

      {/* Main Content Sections Matching Mockup */}
      <main className="flex-1">
        {/* Hero Section & 4 Quick Cards */}
        <HeroSection
          onOpenProfil={() => setIsProfilModalOpen(true)}
          onNavigateSection={handleNavigateSection}
          onOpenServiceModal={() => {
            setInitialTrackingResi('');
            setIsServiceModalOpen(true);
          }}
        />

        {/* Pengumuman Terbaru */}
        <PengumumanSection
          announcements={ANNOUNCEMENTS_DATA}
          onSelectAnnouncement={(item) => setDetailModalData({ type: 'announcement', data: item })}
          onViewAll={() => handleNavigateSection('pengumuman')}
        />

        {/* Sambutan Kepala Desa: TAROMALIMO ZIDUHU MARUNDURI */}
        <SambutanSection />

        {/* Berita Desa */}
        <BeritaSection
          news={NEWS_DATA}
          onSelectNews={(item) => setDetailModalData({ type: 'news', data: item })}
          onViewAll={() => handleNavigateSection('informasi')}
        />

        {/* Pelayanan Desa (4 Pillars) */}
        <PelayananSection
          onOpenServiceModal={() => {
            setInitialTrackingResi('');
            setIsServiceModalOpen(true);
          }}
          onOpenRequirements={() => setIsRequirementsModalOpen(true)}
        />

        {/* Transparansi Desa (APBDes TA 2026) */}
        <TransparansiSection apbdes={apbdes} />

        {/* Galeri Desa Fadoro */}
        <GaleriSection
          photos={GALLERY_DATA}
          onSelectPhoto={(photo) => setDetailModalData({ type: 'gallery', data: photo })}
          onViewAll={() => handleNavigateSection('galeri')}
        />
      </main>

      {/* Footer & Contacts */}
      <FooterSection
        onOpenLocationModal={() => setLocationModalState({ isOpen: true, type: 'location' })}
        onOpenPrivacyInfo={() => setLocationModalState({ isOpen: true, type: 'privacy' })}
      />

      {/* Interactive Modals */}
      {/* 1. Official Printable Letter Modal */}
      <OfficialLetterModal
        request={activeLetterReq}
        onClose={() => setActiveLetterReq(null)}
      />

      {/* 2. Public Citizen Online Service & Tracking Modal */}
      <OnlineServiceModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        requests={requests}
        onSubmitRequest={handleSubmitServiceRequest}
        onViewLetter={(req) => setActiveLetterReq(req)}
        initialTrackingResi={initialTrackingResi}
      />

      {/* 3. Ruang Kerja Kepala Desa (Admin Portal Modal) */}
      <AdminPortalModal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
        citizens={citizens}
        onAddCitizen={handleAddCitizen}
        requests={requests}
        onUpdateRequestStatus={handleUpdateRequestStatus}
        apbdes={apbdes}
        onUpdateApbdesCategory={handleUpdateApbdesCategory}
        waLogs={waLogs}
        auditLogs={auditLogs}
        onAddAuditLog={handleAddAuditLog}
        onViewLetter={(req) => setActiveLetterReq(req)}
      />

      {/* 4. Detail Reader Modal (Announcements, News, Photo Lightbox) */}
      <DetailModal
        type={detailModalData?.type || 'news'}
        data={detailModalData?.data || null}
        onClose={() => setDetailModalData(null)}
      />

      {/* 5. Profil Desa Modal */}
      <ProfilModal
        isOpen={isProfilModalOpen}
        onClose={() => setIsProfilModalOpen(false)}
      />

      {/* 6. Instant Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        announcements={ANNOUNCEMENTS_DATA}
        news={NEWS_DATA}
        onSelectAnnouncement={(item) => setDetailModalData({ type: 'announcement', data: item })}
        onSelectNews={(item) => setDetailModalData({ type: 'news', data: item })}
        onSearchTrackingResi={(resi) => {
          setInitialTrackingResi(resi);
          setIsServiceModalOpen(true);
        }}
      />

      {/* 7. Requirements & Schedule Modal */}
      <RequirementsModal
        isOpen={isRequirementsModalOpen}
        onClose={() => setIsRequirementsModalOpen(false)}
        onOpenOnlineForm={() => {
          setIsRequirementsModalOpen(false);
          setInitialTrackingResi('');
          setIsServiceModalOpen(true);
        }}
      />

      {/* 8. Office Location / Privacy Security Modal */}
      <LocationModal
        isOpen={locationModalState.isOpen}
        type={locationModalState.type}
        onClose={() => setLocationModalState(prev => ({ ...prev, isOpen: false }))}
      />

      {/* 9. Live WhatsApp Notification Toast Simulator */}
      <WhatsAppPushToast
        notification={activeWaToast}
        onClose={() => setActiveWaToast(null)}
      />
    </div>
  );
}
