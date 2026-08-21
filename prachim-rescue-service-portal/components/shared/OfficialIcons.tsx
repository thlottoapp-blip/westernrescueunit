'use client';

import React from 'react';

// 1. Authentic Facebook Icon
export function FacebookIcon({ className = 'w-5 h-5', size }: { className?: string; size?: number }) {
  const style = size ? { width: `${size}px`, height: `${size}px` } : undefined;
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Facebook"
    >
      <rect width="24" height="24" rx="12" fill="#1877F2" />
      <path
        d="M16.5 12.0625H13.875V21H10.125V12.0625H8.25V8.9375H10.125V6.75C10.125 5.20312 11.0508 4 13.0625 4C14.0273 4 14.875 4.07422 14.875 4.07422V6.28125H13.7422C12.75 6.28125 12.4453 6.89844 12.4453 7.53125V8.9375H16.2188L15.6562 12.0625H16.5Z"
        fill="white"
      />
    </svg>
  );
}

// 2. Authentic LINE Official Icon
export function LineIcon({ className = 'w-5 h-5', size }: { className?: string; size?: number }) {
  const style = size ? { width: `${size}px`, height: `${size}px` } : undefined;
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="LINE"
    >
      <rect width="24" height="24" rx="12" fill="#06C755" />
      <path
        d="M19.5 10.74C19.5 6.88 15.91 3.75 11.5 3.75C7.09 3.75 3.5 6.88 3.5 10.74C3.5 14.19 6.36 17.07 10.24 17.61C10.7 17.71 10.97 17.9 10.91 18.24C10.84 18.66 10.63 19.89 10.58 20.21C10.51 20.66 10.77 20.73 11.07 20.55C11.37 20.36 14.36 18.42 15.68 17.43C17.99 16.03 19.5 13.62 19.5 10.74Z"
        fill="white"
      />
      {/* LINE text inner letters */}
      <path
        d="M7.75 9.25H8.62V12.75H10.5V13.62H7.75V9.25ZM11.12 9.25H12V13.62H11.12V9.25ZM12.62 9.25H13.5L15.12 11.75V9.25H16V13.62H15.12L13.5 11.12V13.62H12.62V9.25ZM16.62 9.25H19.38V10.12H17.5V11H19.12V11.88H17.5V12.75H19.38V13.62H16.62V9.25Z"
        fill="#06C755"
      />
    </svg>
  );
}

// 3. Authentic TikTok Icon
export function TikTokIcon({ className = 'w-5 h-5', size }: { className?: string; size?: number }) {
  const style = size ? { width: `${size}px`, height: `${size}px` } : undefined;
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="TikTok"
    >
      <rect width="24" height="24" rx="12" fill="#010101" />
      <path
        d="M16.5 7.82C15.54 7.74 14.65 7.27 14.07 6.51C13.5 5.75 13.28 4.79 13.43 3.85H10.72V15.28C10.66 16.29 9.83 17.07 8.82 17.07C8.25 17.07 7.71 16.83 7.32 16.42C6.93 16.01 6.72 15.46 6.75 14.88C6.82 13.78 7.76 12.92 8.87 12.97C9.28 12.98 9.67 13.12 10.01 13.36V10.59C9.62 10.49 9.22 10.44 8.82 10.44C6.38 10.44 4.39 12.43 4.39 14.88C4.39 17.32 6.38 19.31 8.82 19.31C11.19 19.31 13.13 17.43 13.25 15.08V9.72C14.39 10.53 15.77 10.97 17.18 10.97V8.42C16.95 8.42 16.72 8.22 16.5 7.82Z"
        fill="white"
      />
      {/* Cyan offset glow */}
      <path
        d="M13.25 9.72V15.08C13.13 17.43 11.19 19.31 8.82 19.31C7.8 19.31 6.86 18.96 6.13 18.38C6.91 18.95 7.88 19.28 8.92 19.28C11.29 19.28 13.23 17.4 13.35 15.05V9.69C14.49 10.5 15.87 10.94 17.28 10.94V10.69C15.82 10.69 14.42 10.3 13.25 9.72Z"
        fill="#25F4EE"
        opacity="0.9"
      />
      {/* Magenta offset glow */}
      <path
        d="M13.43 3.85H13.18V4.1C13.03 5.04 12.81 6 12.24 6.76C12.82 6 13.04 5.04 13.19 4.1V3.85H13.43Z"
        fill="#FE2C55"
        opacity="0.9"
      />
    </svg>
  );
}

// 4. Authentic YouTube Icon
export function YouTubeIcon({ className = 'w-5 h-5', size }: { className?: string; size?: number }) {
  const style = size ? { width: `${size}px`, height: `${size}px` } : undefined;
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="YouTube"
    >
      <rect width="24" height="24" rx="12" fill="#FF0000" />
      <path
        d="M19.2 8.4C19.01 7.69 18.46 7.14 17.75 6.95C16.47 6.6 12 6.6 12 6.6C12 6.6 7.53 6.6 6.25 6.95C5.54 7.14 4.99 7.69 4.8 8.4C4.45 9.68 4.45 12.35 4.45 12.35C4.45 12.35 4.45 15.02 4.8 16.3C4.99 17.01 5.54 17.56 6.25 17.75C7.53 18.1 12 18.1 12 18.1C12 18.1 16.47 18.1 17.75 17.75C18.46 17.56 19.01 17.01 19.2 16.3C19.55 15.02 19.55 12.35 19.55 12.35C19.55 12.35 19.55 9.68 19.2 8.4Z"
        fill="white"
      />
      <polygon points="10.5,14.7 14.5,12.35 10.5,10" fill="#FF0000" />
    </svg>
  );
}

// 5. NIEMS (สพฉ. 1669) - National Institute for Emergency Medicine Thailand
export function NiemsEmblem({ className = 'w-10 h-10', size }: { className?: string; size?: number }) {
  const style = size ? { width: `${size}px`, height: `${size}px` } : undefined;
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="สถาบันการแพทย์ฉุกเฉินแห่งชาติ (สพฉ. 1669)"
    >
      <defs>
        <linearGradient id="niemsBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e40af" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="niemsGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>
      {/* Outer Blue Circle */}
      <circle cx="50" cy="50" r="46" fill="url(#niemsBlueGrad)" stroke="url(#niemsGoldGrad)" strokeWidth="3" />
      {/* Inner White Border */}
      <circle cx="50" cy="50" r="39" fill="#0f2452" stroke="#ffffff" strokeWidth="1" />
      
      {/* 6-Point Star of Life */}
      <g fill="#2563eb" stroke="#ffffff" strokeWidth="1.5">
        {/* Vertical bar */}
        <rect x="44" y="20" width="12" height="60" rx="3" />
        {/* Diagonal 1 */}
        <rect x="44" y="20" width="12" height="60" rx="3" transform="rotate(60 50 50)" />
        {/* Diagonal 2 */}
        <rect x="44" y="20" width="12" height="60" rx="3" transform="rotate(-60 50 50)" />
      </g>

      {/* Golden Staff of Asclepius with Snake */}
      <path d="M 50,18 L 50,82" stroke="url(#niemsGoldGrad)" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="50" cy="18" r="3.5" fill="url(#niemsGoldGrad)" />
      {/* Snake Body coiling around staff */}
      <path
        d="M 44,28 C 56,32 56,38 44,42 C 32,46 56,52 50,60 C 44,66 54,72 48,76"
        fill="none"
        stroke="url(#niemsGoldGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Thai 1669 Badge at bottom */}
      <rect x="30" y="78" width="40" height="15" rx="7.5" fill="#dc2626" stroke="#ffffff" strokeWidth="1.2" />
      <text x="50" y="89" fill="#ffffff" fontSize="9.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
        1669
      </text>
    </svg>
  );
}

// 6. DDPM (ปภ. กรมป้องกันและบรรเทาสาธารณภัย)
export function DdpmEmblem({ className = 'w-10 h-10', size }: { className?: string; size?: number }) {
  const style = size ? { width: `${size}px`, height: `${size}px` } : undefined;
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="กรมป้องกันและบรรเทาสาธารณภัย (ปภ.)"
    >
      <defs>
        <linearGradient id="ddpmOrange" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#9a3412" />
        </linearGradient>
        <linearGradient id="ddpmGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      {/* Shield Base */}
      <path
        d="M 50,6 L 86,22 C 86,64 50,92 50,92 C 50,92 14,64 14,22 Z"
        fill="url(#ddpmOrange)"
        stroke="url(#ddpmGold)"
        strokeWidth="3.5"
      />
      {/* Inner Shield */}
      <path
        d="M 50,14 L 80,28 C 80,60 50,84 50,84 C 50,84 20,60 20,28 Z"
        fill="#0f172a"
        stroke="#ffffff"
        strokeWidth="1"
      />
      {/* Triangle of Relief */}
      <polygon points="50,26 74,72 26,72" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
      {/* Central Flame / Protective Beacon */}
      <path
        d="M 50,34 C 44,46 40,54 50,68 C 60,54 56,46 50,34 Z"
        fill="#dc2626"
      />
      <circle cx="50" cy="56" r="4.5" fill="#fef08a" />
      <text x="50" y="80" fill="#ffffff" fontSize="7.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
        ปภ. DDPM
      </text>
    </svg>
  );
}

// 7. MOPH (กระทรวงสาธารณสุข)
export function MophEmblem({ className = 'w-10 h-10', size }: { className?: string; size?: number }) {
  const style = size ? { width: `${size}px`, height: `${size}px` } : undefined;
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="กระทรวงสาธารณสุข (MOPH)"
    >
      <defs>
        <radialGradient id="mophGreen" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#15803d" />
          <stop offset="100%" stopColor="#14532d" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#mophGreen)" stroke="#facc15" strokeWidth="3" />
      <circle cx="50" cy="50" r="38" fill="#ffffff" />
      {/* Golden Snake & Staff */}
      <path d="M 50,18 L 50,82" stroke="#ca8a04" strokeWidth="4" strokeLinecap="round" />
      <circle cx="50" cy="18" r="4" fill="#eab308" />
      <path
        d="M 40,30 C 60,36 60,44 40,50 C 60,56 60,66 45,74"
        fill="none"
        stroke="#15803d"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <text x="50" y="88" fill="#14532d" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
        สธ. MOPH
      </text>
    </svg>
  );
}

// 8. Royal Thai Police Star & Shield (สภ.บรบือ)
export function PoliceEmblem({ className = 'w-10 h-10', size }: { className?: string; size?: number }) {
  const style = size ? { width: `${size}px`, height: `${size}px` } : undefined;
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="สำนักงานตำรวจแห่งชาติ / สภ.บรบือ"
    >
      <defs>
        <linearGradient id="policeSilver" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="50%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
      </defs>
      {/* Shield */}
      <path
        d="M 50,8 L 84,24 C 84,62 50,90 50,90 C 50,90 16,62 16,24 Z"
        fill="#7f1d1d"
        stroke="url(#policeSilver)"
        strokeWidth="3.5"
      />
      {/* 8-pointed Police Star */}
      <g fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" transform="translate(50, 48) scale(0.65)">
        <polygon points="0,-35 8,-12 32,-18 18,3 32,24 8,18 0,38 -8,18 -32,24 -18,3 -32,-18 -8,-12" />
        <circle cx="0" cy="0" r="10" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
      </g>
      <text x="50" y="80" fill="#f8fafc" fontSize="7.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
        สภ.บรบือ 191
      </text>
    </svg>
  );
}

// 9. Scuba Diving & Underwater Rescue Seal
export function ScubaRescueSeal({ className = 'w-10 h-10', size }: { className?: string; size?: number }) {
  const style = size ? { width: `${size}px`, height: `${size}px` } : undefined;
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="กู้ภัยทางน้ำและประดาน้ำค้นหา"
    >
      <circle cx="50" cy="50" r="46" fill="#0369a1" stroke="#38bdf8" strokeWidth="3" />
      <circle cx="50" cy="50" r="39" fill="#082f49" stroke="#ffffff" strokeWidth="1" />
      {/* Diver Mask */}
      <rect x="30" y="32" width="40" height="22" rx="11" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
      <line x1="50" y1="32" x2="50" y2="54" stroke="#ffffff" strokeWidth="2" />
      {/* Breathing Regulator & Snorkel */}
      <path d="M 68,44 C 74,44 76,28 74,20" stroke="#facc15" strokeWidth="3.5" strokeLinecap="round" />
      {/* Waves */}
      <path d="M 22,66 Q 36,60 50,66 T 78,66" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 26,74 Q 38,70 50,74 T 74,74" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
      <text x="50" y="86" fill="#facc15" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
        SCUBA RESCUE
      </text>
    </svg>
  );
}

// 10. Hydraulic Extrication & Trauma Seal
export function HydraulicRescueSeal({ className = 'w-10 h-10', size }: { className?: string; size?: number }) {
  const style = size ? { width: `${size}px`, height: `${size}px` } : undefined;
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ตัด-ถ่างไฮดรอลิกช่วยชีวิต"
    >
      <circle cx="50" cy="50" r="46" fill="#b91c1c" stroke="#fbbf24" strokeWidth="3" />
      <circle cx="50" cy="50" r="39" fill="#450a0a" stroke="#ffffff" strokeWidth="1" />
      {/* Jaws / Hydraulic Cutter Blades */}
      <path
        d="M 50,46 L 68,22 C 72,26 70,36 56,48 Z"
        fill="#cbd5e1"
        stroke="#ffffff"
        strokeWidth="1.5"
      />
      <path
        d="M 50,46 L 32,22 C 28,26 30,36 44,48 Z"
        fill="#cbd5e1"
        stroke="#ffffff"
        strokeWidth="1.5"
      />
      {/* Main Body */}
      <rect x="42" y="44" width="16" height="26" rx="4" fill="#fbbf24" stroke="#ffffff" strokeWidth="1.5" />
      <circle cx="50" cy="46" r="4" fill="#0f172a" stroke="#ffffff" strokeWidth="1.5" />
      <rect x="45" y="70" width="10" height="8" rx="2" fill="#475569" />
      <text x="50" y="87" fill="#fbbf24" fontSize="6.8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
        HYDRAULIC CUTTER
      </text>
    </svg>
  );
}

// 11. Official Partner Grid Banner (For Hero/Footer/About display)
export function OfficialPartnersGrid({ className = '' }: { className?: string }) {
  const partners = [
    {
      id: 'niems',
      name: 'สถาบันการแพทย์ฉุกเฉินแห่งชาติ',
      shortName: 'สพฉ. 1669',
      desc: 'ระบบบริการการแพทย์ฉุกเฉินมาตรฐานกระทรวงสาธารณสุข',
      Component: NiemsEmblem,
      badge: 'การแพทย์ฉุกเฉิน',
      badgeColor: 'bg-blue-900/80 text-blue-200 border-blue-600',
    },
    {
      id: 'ddpm',
      name: 'กรมป้องกันและบรรเทาสาธารณภัย',
      shortName: 'ปภ. DDPM',
      desc: 'บูรณาการแผนเผชิญเหตุอุทกภัย วาตภัย และสาธารณภัย',
      Component: DdpmEmblem,
      badge: 'บรรเทาสาธารณภัย',
      badgeColor: 'bg-orange-950/80 text-orange-300 border-orange-600',
    },
    {
      id: 'moph',
      name: 'กระทรวงสาธารณสุข / รพ.บรบือ',
      shortName: 'สธ. MOPH',
      desc: 'ศูนย์รับ-ส่งต่อผู้ป่วยฉุกเฉินและชันสูตรพลิกศพร่วม',
      Component: MophEmblem,
      badge: 'สาธารณสุข',
      badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-600',
    },
    {
      id: 'police',
      name: 'สถานีตำรวจภูธรบรบือ / กุดรัง',
      shortName: 'สภ.บรบือ 191',
      desc: 'สนับสนุนการปิดกั้นจราจรและตรวจสถานที่เกิดเหตุ 24 ชม.',
      Component: PoliceEmblem,
      badge: 'สนับสนุนตำรวจ',
      badgeColor: 'bg-red-950/80 text-red-300 border-red-600',
    },
  ];

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 ${className}`}>
      {partners.map((partner) => {
        const Emblem = partner.Component;
        return (
          <div
            key={partner.id}
            className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-gradient-to-br from-[#0c1c42] to-[#08132b] border border-blue-800/70 hover:border-amber-400/50 shadow-md transition-all group"
          >
            <div className="shrink-0 group-hover:scale-105 transition-transform">
              <Emblem className="w-11 h-11 drop-shadow-md" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span className="text-xs font-bold text-white font-prompt truncate">
                  {partner.shortName}
                </span>
                <span
                  className={`text-[9px] px-2 py-0.5 rounded-full border font-mono font-medium whitespace-nowrap ${partner.badgeColor}`}
                >
                  {partner.badge}
                </span>
              </div>
              <p className="text-[11px] text-blue-200/70 font-sarabun line-clamp-1">
                {partner.name}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// 12. Social Media Quick Buttons Bar (Reusable everywhere)
export function SocialMediaBar({
  className = '',
  size = 'md',
  showLabels = true,
}: {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
}) {
  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;

  const socialLinks = [
    {
      id: 'facebook',
      name: 'Facebook',
      handle: 'หน่วยกู้ภัยประจิม สมาคมประจิมสารคาม',
      url: 'https://www.facebook.com/search/top?q=หน่วยกู้ภัยประจิม+บรบือ',
      bgClass: 'bg-[#1877F2] hover:bg-[#166fe5]',
      Icon: FacebookIcon,
    },
    {
      id: 'line',
      name: 'LINE Official',
      handle: '@prachimrescue',
      url: 'https://line.me/R/ti/p/@prachimrescue',
      bgClass: 'bg-[#06C755] hover:bg-[#05b34c]',
      Icon: LineIcon,
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      handle: '@prachimrescue',
      url: 'https://www.tiktok.com/@prachimrescue',
      bgClass: 'bg-black hover:bg-slate-900 border border-slate-700',
      Icon: TikTokIcon,
    },
    {
      id: 'youtube',
      name: 'YouTube',
      handle: 'กู้ภัยประจิม Channel',
      url: 'https://www.youtube.com/results?search_query=หน่วยกู้ภัยประจิม+บรบือ',
      bgClass: 'bg-[#FF0000] hover:bg-[#e60000]',
      Icon: YouTubeIcon,
    },
  ];

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {socialLinks.map((item) => {
        const Icon = item.Icon;
        return (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`${item.name}: ${item.handle}`}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-white font-prompt transition-all shadow-sm hover:shadow-md hover:scale-105 select-none shrink-0 ${item.bgClass}`}
          >
            <Icon size={iconSize} className="shrink-0" />
            {showLabels && (
              <span className="text-xs font-semibold whitespace-nowrap">
                {item.name}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
}

// 13. NBTC Radio Frequency Seal (กสทช. 168.275 MHz)
export function NbtcRadioEmblem({ className = 'w-10 h-10', size }: { className?: string; size?: number }) {
  const style = size ? { width: `${size}px`, height: `${size}px` } : undefined;
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="กสทช. ช่องความถี่วิทยุกู้ภัย"
    >
      <defs>
        <linearGradient id="nbtcPurple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#581c87" />
          <stop offset="100%" stopColor="#3b0764" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#nbtcPurple)" stroke="#c084fc" strokeWidth="3" />
      <circle cx="50" cy="50" r="39" fill="#1e1b4b" stroke="#ffffff" strokeWidth="1" />
      {/* Radio Waves Tower */}
      <line x1="50" y1="26" x2="50" y2="72" stroke="#facc15" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="50" cy="24" r="5" fill="#facc15" />
      <path d="M 36,36 C 42,30 58,30 64,36" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 28,46 C 38,36 62,36 72,46" stroke="#e9d5ff" strokeWidth="2" strokeLinecap="round" fill="none" />
      <text x="50" y="86" fill="#facc15" fontSize="6.8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
        168.275 MHz
      </text>
    </svg>
  );
}

// 14. Department of Highways (กรมทางหลวง 1586)
export function DohHighwayEmblem({ className = 'w-10 h-10', size }: { className?: string; size?: number }) {
  const style = size ? { width: `${size}px`, height: `${size}px` } : undefined;
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="กรมทางหลวง 1586"
    >
      <defs>
        <linearGradient id="dohBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#172554" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#dohBlue)" stroke="#60a5fa" strokeWidth="3" />
      <circle cx="50" cy="50" r="39" fill="#0f172a" stroke="#ffffff" strokeWidth="1" />
      {/* Highway Road Perspective */}
      <polygon points="32,74 44,32 56,32 68,74" fill="#334155" stroke="#ffffff" strokeWidth="1" />
      {/* Center Dashed Lane */}
      <line x1="50" y1="36" x2="50" y2="44" stroke="#facc15" strokeWidth="2.5" />
      <line x1="50" y1="48" x2="50" y2="58" stroke="#facc15" strokeWidth="3" />
      <line x1="50" y1="62" x2="50" y2="74" stroke="#facc15" strokeWidth="3.5" />
      <text x="50" y="87" fill="#60a5fa" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
        ทางหลวง 1586
      </text>
    </svg>
  );
}

// 15. EMS Dispatch & Command Center (ศูนย์สั่งการ 1669)
export function EmsDispatchCenterEmblem({ className = 'w-10 h-10', size }: { className?: string; size?: number }) {
  const style = size ? { width: `${size}px`, height: `${size}px` } : undefined;
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ศูนย์รับแจ้งเหตุและสั่งการ 1669"
    >
      <defs>
        <linearGradient id="dispatchRed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#991b1b" />
          <stop offset="100%" stopColor="#450a0a" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#dispatchRed)" stroke="#f87171" strokeWidth="3" />
      <circle cx="50" cy="50" r="39" fill="#1e1b4b" stroke="#ffffff" strokeWidth="1" />
      {/* Headset & Dispatch Wave */}
      <path d="M 30,52 C 30,34 70,34 70,52" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <rect x="24" y="46" width="10" height="16" rx="4" fill="#facc15" />
      <rect x="66" y="46" width="10" height="16" rx="4" fill="#facc15" />
      <path d="M 68,58 C 68,68 56,70 48,70" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="46" cy="70" r="3" fill="#ef4444" />
      <text x="50" y="86" fill="#fca5a5" fontSize="6.8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
        ศูนย์สั่งการ 24H
      </text>
    </svg>
  );
}

// 16. Rescue Association Seal (สมาคมพุทธศาสตร์สงเคราะห์ / เครือข่ายสมาคมกู้ภัย)
export function RescueAssociationSeal({ className = 'w-10 h-10', size }: { className?: string; size?: number }) {
  const style = size ? { width: `${size}px`, height: `${size}px` } : undefined;
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์"
    >
      <defs>
        <linearGradient id="assocGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#assocGold)" stroke="#fbbf24" strokeWidth="3" />
      <circle cx="50" cy="50" r="39" fill="#082f49" stroke="#ffffff" strokeWidth="1" />
      {/* Dharma Wheel & Rescue Cross */}
      <circle cx="50" cy="46" r="18" fill="none" stroke="#fbbf24" strokeWidth="3" />
      <line x1="50" y1="28" x2="50" y2="64" stroke="#fbbf24" strokeWidth="2.5" />
      <line x1="32" y1="46" x2="68" y2="46" stroke="#fbbf24" strokeWidth="2.5" />
      <line x1="37" y1="33" x2="63" y2="59" stroke="#fbbf24" strokeWidth="2" />
      <line x1="37" y1="59" x2="63" y2="33" stroke="#fbbf24" strokeWidth="2" />
      <circle cx="50" cy="46" r="6" fill="#dc2626" stroke="#ffffff" strokeWidth="1.5" />
      <text x="50" y="87" fill="#fbbf24" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
        พุทธศาสตร์สงเคราะห์
      </text>
    </svg>
  );
}

