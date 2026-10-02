import React from 'react';
import { UserCheck, ShieldCheck, Lock, MessageSquare } from 'lucide-react';

export const SambutanSection: React.FC = () => {
  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading Tag */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <UserCheck className="w-5 h-5 text-emerald-700" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-slate-900 font-sans">
            Sambutan Kepala Desa
          </h2>
        </div>

        {/* Content Container */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Column: Official Head of Village Photo Card */}
            <div className="md:col-span-4 flex flex-col items-center">
              <div className="w-56 sm:w-64 bg-white p-3 rounded-2xl shadow-md border border-slate-200 text-center">
                {/* Formal Portrait Frame */}
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-b from-emerald-800 to-slate-900 relative shadow-inner flex items-center justify-center">
                  {/* SVG Formal Uniform Portrait of Bpk. TAROMALIMO ZIDUHU MARUNDURI */}
                  <svg
                    viewBox="0 0 240 240"
                    className="w-full h-full object-cover"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Studio Gradient Background */}
                    <defs>
                      <linearGradient id="bgStudio" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#064e3b" />
                        <stop offset="100%" stopColor="#022c22" />
                      </linearGradient>
                      <linearGradient id="skin" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#e0a97c" />
                        <stop offset="100%" stopColor="#c58a5c" />
                      </linearGradient>
                    </defs>
                    <rect width="240" height="240" fill="url(#bgStudio)" />

                    {/* Shoulder & Official White PDU Uniform */}
                    <path
                      d="M30 240 C35 185 80 170 120 170 C160 170 205 185 210 240 Z"
                      fill="#ffffff"
                      stroke="#e2e8f0"
                      strokeWidth="2"
                    />

                    {/* Black tie & White collar */}
                    <polygon points="120,175 110,195 120,240 130,195" fill="#0f172a" />
                    <polygon points="105,170 120,185 135,170" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
                    
                    {/* Golden Badges & Epaulettes */}
                    <rect x="55" y="195" width="22" height="12" rx="2" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
                    <circle cx="66" cy="201" r="3" fill="#ffffff" />
                    {/* Golden Garuda / Kades Emblem on Chest */}
                    <polygon points="165,190 175,198 170,210 160,210 155,198" fill="#f59e0b" stroke="#d97706" />

                    {/* Neck */}
                    <rect x="105" y="145" width="30" height="30" fill="#c58a5c" rx="4" />

                    {/* Head / Face */}
                    <ellipse cx="120" cy="120" rx="34" ry="40" fill="url(#skin)" />
                    {/* Hair */}
                    <path d="M86 110 C86 75 154 75 154 110 C154 90 86 90 86 110 Z" fill="#1e293b" />
                    {/* Eyebrows */}
                    <path d="M96 108 Q106 104 114 108" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />
                    <path d="M126 108 Q134 104 144 108" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />
                    {/* Eyes */}
                    <circle cx="106" cy="116" r="3" fill="#0f172a" />
                    <circle cx="134" cy="116" r="3" fill="#0f172a" />
                    {/* Nose */}
                    <path d="M120 115 L118 128 L123 128" stroke="#a16207" strokeWidth="2" strokeLinecap="round" fill="none" />
                    {/* Friendly Smile */}
                    <path d="M110 137 Q120 144 130 137" stroke="#881337" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                    {/* Official Indonesian Civil Service White Peaked Hat (Topi Pet Dinas Kades) */}
                    <g transform="translate(0, -10)">
                      {/* Black visor */}
                      <path d="M80 82 Q120 95 160 82 Q120 75 80 82 Z" fill="#020617" />
                      {/* Golden chin strap cord */}
                      <path d="M82 81 Q120 88 158 81" stroke="#f59e0b" strokeWidth="3" fill="none" />
                      {/* White Crown of Hat */}
                      <path d="M78 80 C75 50 165 50 162 80 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
                      {/* Golden Garuda / Star Crest on Hat */}
                      <polygon points="120,58 124,66 133,67 126,73 128,82 120,77 112,82 114,73 107,67 116,66" fill="#f59e0b" />
                    </g>
                  </svg>

                  <div className="absolute bottom-2 left-2 bg-emerald-950/80 backdrop-blur-sm text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30">
                    Kades Resmi Fadoro
                  </div>
                </div>

                {/* Identity Name Label */}
                <div className="mt-3">
                  <h3 className="font-bold text-sm text-slate-900 uppercase">
                    TAROMALIMO ZIDUHU MARUNDURI
                  </h3>
                  <p className="text-xs text-emerald-800 font-semibold mt-0.5">
                    Kepala Desa Fadoro
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Kec. Sirombu · Kab. Nias Barat
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Greetings Text */}
            <div className="md:col-span-8 space-y-4">
              <div className="border-l-4 border-emerald-600 pl-4 py-1">
                <h3 className="text-lg font-bold text-emerald-900 font-serif">
                  Assalamu'alaikum Warahmatullahi Wabarakatuh / Ya'ahowu.
                </h3>
              </div>

              <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-3 font-sans">
                <p>
                  Selamat datang di <strong>Website Resmi Desa Fadoro</strong>, Kecamatan Sirombu, Kabupaten Nias Barat. Website ini merupakan sarana media informasi dan pelayanan Pemerintah Desa Fadoro kepada seluruh masyarakat dalam menyampaikan informasi tata kelola pemerintahan desa, transparansi anggaran APBDes, kegiatan pembangunan, pemberdayaan masyarakat, serta pelayanan publik online secara terbuka dan transparan.
                </p>
                <p>
                  Sesuai amanah warga, kami terus berinovasi memudahkan urusan administrasi masyarakat. Kini warga Desa Fadoro dapat mengajukan surat keterangan secara online dari rumah, dengan sistem perlindungan <strong>keamanan enkripsi data kependudukan (KTP & KK) yang sangat ketat</strong> untuk menjaga privasi seluruh warga, serta <strong>integrasi notifikasi WhatsApp real-time</strong> langsung ke telepon genggam Anda pada setiap pembaruan proses layanan.
                </p>
                <p>
                  Kami berharap website ini dapat memberikan manfaat yang sebesar-besarnya, menjadi jembatan silaturahmi, serta wadah akuntabilitas bagi kemajuan Desa Fadoro tercinta.
                </p>
              </div>

              {/* Security & Notification Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Privasi & Enkripsi AES-256</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Identitas NIK & KK warga terlindungi sistem kriptografi berstandar ketat.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Notifikasi WhatsApp Real-time</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Pemberitahuan status surat otomatis terkirim langsung ke nomor WhatsApp warga.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-right">
                <p className="text-xs text-slate-500">Hormat kami,</p>
                <p className="font-bold text-sm text-slate-900 uppercase">
                  TAROMALIMO ZIDUHU MARUNDURI
                </p>
                <p className="text-xs text-emerald-800 font-medium">Kepala Desa Fadoro</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
