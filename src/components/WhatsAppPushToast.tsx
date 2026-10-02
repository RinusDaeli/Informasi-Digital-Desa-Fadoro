import React, { useEffect, useState } from 'react';
import { MessageSquare, ExternalLink, X, CheckCheck } from 'lucide-react';
import { WhatsAppNotification } from '../types';
import { getWhatsAppDirectUrl } from '../services/whatsappService';

interface WhatsAppPushToastProps {
  notification: WhatsAppNotification | null;
  onClose: () => void;
}

export const WhatsAppPushToast: React.FC<WhatsAppPushToastProps> = ({ notification, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      onClose();
    }, 9000);
    return () => clearTimeout(timer);
  }, [notification, onClose]);

  if (!notification) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(notification.pesanText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const directUrl = getWhatsAppDirectUrl(notification.toPhone, notification.pesanText);

  return (
    <div className="fixed top-5 right-5 z-50 max-w-sm sm:max-w-md w-full animate-in slide-in-from-top-4 fade-in duration-300">
      <div className="bg-[#128C7E] text-white rounded-xl shadow-2xl overflow-hidden border border-emerald-400/30">
        {/* WhatsApp App Header Bar */}
        <div className="bg-[#075E54] px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-400 flex items-center justify-center text-[#075E54] font-bold">
              <MessageSquare className="w-4 h-4 fill-current" />
            </div>
            <div>
              <p className="text-xs font-semibold text-emerald-100 uppercase tracking-wider">
                WhatsApp · Pemdes Fadoro
              </p>
              <p className="text-[11px] text-emerald-200">
                Pembaruan Layanan Surat Online
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-200 hover:text-white p-1 rounded-md transition-colors"
            title="Tutup Notifikasi"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Bubble Body */}
        <div className="p-3.5 bg-[#EFEAE2] text-slate-800">
          <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200/80 text-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 text-[11px] text-slate-500">
              <span className="font-semibold text-emerald-800">Kepada: {notification.toNama} ({notification.toPhone})</span>
              <span className="flex items-center gap-1 text-emerald-600">
                <CheckCheck className="w-3.5 h-3.5" /> Terkirim
              </span>
            </div>

            <p className="font-medium text-slate-900 leading-snug">
              Resi: <span className="font-mono text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded">{notification.nomorResi}</span> — {notification.jenisSurat}
            </p>

            <div className="text-slate-600 text-[11px] max-h-24 overflow-y-auto whitespace-pre-line bg-slate-50 p-2 rounded border border-slate-100 font-sans leading-relaxed">
              {notification.pesanText}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="bg-[#075E54] px-4 py-2 flex items-center justify-between text-xs">
          <button
            onClick={handleCopy}
            className="text-emerald-100 hover:text-white font-medium flex items-center gap-1 transition-colors"
          >
            {copied ? 'Teks Tersalin!' : 'Salin Pesan'}
          </button>
          
          <a
            href={directUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20ba5a] text-slate-900 font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-sm"
          >
            Buka di WhatsApp Web / App
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
