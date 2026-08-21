'use client';

import React from 'react';
import { OfficialLogo } from '@/components/shared/OfficialLogo';
import { GoogleMapsFooter } from '@/components/shared/GoogleMapsSection';
import {
  FacebookIcon,
  LineIcon,
  TikTokIcon,
  YouTubeIcon,
  NiemsEmblem,
  DdpmEmblem,
  MophEmblem,
  PoliceEmblem,
  ScubaRescueSeal,
  HydraulicRescueSeal,
} from '@/components/shared/OfficialIcons';
import {
  ShieldAlert,
  PhoneCall,
  MapPin,
  Clock,
  Radio,
  Ambulance,
  Waves,
  Heart,
  Lock,
  ExternalLink,
  Navigation,
  CheckCircle2,
} from 'lucide-react';

interface FooterProps {
  onOpenReportModal: () => void;
  onOpenAdminModal: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export function Footer({ onOpenReportModal, onOpenAdminModal, onNavigateSection }: FooterProps) {
  return (
    <footer className="bg-[#09142e] text-blue-200/80 border-t border-blue-900/80 text-sm font-sarabun">
      {/* 1. Interactive Google Maps & Operations Center Section */}
      <GoogleMapsFooter onOpenReportModal={onOpenReportModal} />

      {/* 2. Official Network Emblems Bar */}
      <div className="bg-[#060d21] border-b border-blue-950/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300 font-bold">
              OFFICIAL INTEGRATIONS & NETWORK AFFILIATIONS
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white font-prompt mt-0.5">
              เครือข่ายความร่วมมือและมาตรฐานการปฏิบัติการฉุกเฉิน
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {/* NIEMS */}
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-[#09142e]/90 border border-blue-800/60 shadow-xs hover:border-amber-400/50 transition-colors">
              <NiemsEmblem className="w-10 h-10 mb-2 drop-shadow-md" />
              <span className="text-xs font-bold text-white font-prompt leading-tight">สพฉ. 1669</span>
              <span className="text-[10px] text-blue-300/70 font-mono mt-0.5">สถาบันการแพทย์ฉุกเฉิน</span>
            </div>

            {/* DDPM */}
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-[#09142e]/90 border border-blue-800/60 shadow-xs hover:border-amber-400/50 transition-colors">
              <DdpmEmblem className="w-10 h-10 mb-2 drop-shadow-md" />
              <span className="text-xs font-bold text-white font-prompt leading-tight">ปภ. DDPM</span>
              <span className="text-[10px] text-blue-300/70 font-mono mt-0.5">ป้องกันและบรรเทาสาธารณภัย</span>
            </div>

            {/* MOPH */}
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-[#09142e]/90 border border-blue-800/60 shadow-xs hover:border-amber-400/50 transition-colors">
              <MophEmblem className="w-10 h-10 mb-2 drop-shadow-md" />
              <span className="text-xs font-bold text-white font-prompt leading-tight">กระทรวงสาธารณสุข</span>
              <span className="text-[10px] text-blue-300/70 font-mono mt-0.5">รพ.บรบือ / สสจ.สารคาม</span>
            </div>

            {/* Police */}
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-[#09142e]/90 border border-blue-800/60 shadow-xs hover:border-amber-400/50 transition-colors">
              <PoliceEmblem className="w-10 h-10 mb-2 drop-shadow-md" />
              <span className="text-xs font-bold text-white font-prompt leading-tight">สภ.บรบือ 191</span>
              <span className="text-[10px] text-blue-300/70 font-mono mt-0.5">สำนักงานตำรวจแห่งชาติ</span>
            </div>

            {/* Scuba Rescue */}
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-[#09142e]/90 border border-blue-800/60 shadow-xs hover:border-amber-400/50 transition-colors">
              <ScubaRescueSeal className="w-10 h-10 mb-2 drop-shadow-md" />
              <span className="text-xs font-bold text-white font-prompt leading-tight">ชุดประดาน้ำ Scuba</span>
              <span className="text-[10px] text-blue-300/70 font-mono mt-0.5">ค้นหาใต้น้ำสารคาม</span>
            </div>

            {/* Hydraulic */}
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-[#09142e]/90 border border-blue-800/60 shadow-xs hover:border-amber-400/50 transition-colors">
              <HydraulicRescueSeal className="w-10 h-10 mb-2 drop-shadow-md" />
              <span className="text-xs font-bold text-white font-prompt leading-tight">ตัด-ถ่างไฮดรอลิก</span>
              <span className="text-[10px] text-blue-300/70 font-mono mt-0.5">กู้ภัยวิกฤตจราจร</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Footer Directory Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <OfficialLogo size={48} withGlow={true} />
              <div>
                <span className="text-lg font-bold text-white font-prompt block leading-tight">
                  หน่วยกู้ภัยประจิม
                </span>
                <span className="text-xs text-amber-300 font-prompt font-semibold">
                  สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์
                </span>
              </div>
            </div>

            <p className="text-blue-200/75 text-xs sm:text-sm leading-relaxed max-w-md">
              ศูนย์ปฏิบัติการการแพทย์ฉุกเฉิน กู้ภัยทางน้ำ ดำน้ำค้นหา และบรรเทาสาธารณภัย อำเภอบรบือ จังหวัดมหาสารคาม พร้อมเครือข่ายจุดบริการวาปีปทุมและนาดูน มุ่งมั่นช่วยเหลือประชาชนตลอด 24 ชั่วโมง ภายใต้ร่มบารมีสิ่งศักดิ์สิทธิ์คู่เมือง &ldquo;พ่อปู่จูมคำ&rdquo;
            </p>

            {/* Social Media Links */}
            <div className="pt-2">
              <span className="text-xs font-mono uppercase font-bold text-amber-300 block mb-2">
                CONNECT VIA OFFICIAL SOCIAL MEDIA
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://www.facebook.com/search/top?q=หน่วยกู้ภัยประจิม+บรบือ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-semibold font-prompt shadow-sm transition-transform hover:scale-105"
                >
                  <FacebookIcon size={16} />
                  <span>Facebook</span>
                </a>
                <a
                  href="https://line.me/R/ti/p/@prachimrescue"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white text-xs font-semibold font-prompt shadow-sm transition-transform hover:scale-105"
                >
                  <LineIcon size={16} />
                  <span>LINE Official</span>
                </a>
                <a
                  href="https://www.tiktok.com/@prachimrescue"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black hover:bg-slate-900 border border-slate-700 text-white text-xs font-semibold font-prompt shadow-sm transition-transform hover:scale-105"
                >
                  <TikTokIcon size={16} />
                  <span>TikTok</span>
                </a>
                <a
                  href="https://www.youtube.com/results?search_query=หน่วยกู้ภัยประจิม+บรบือ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF0000] hover:bg-[#e60000] text-white text-xs font-semibold font-prompt shadow-sm transition-transform hover:scale-105"
                >
                  <YouTubeIcon size={16} />
                  <span>YouTube</span>
                </a>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs bg-[#16377e]/70 px-3.5 py-1 rounded-full border border-amber-400/40 text-amber-200 shadow-xs font-medium whitespace-nowrap">
                บริการฉุกเฉิน EMS ฟรี (สพฉ.)
              </span>
              <span className="text-xs bg-[#16377e]/70 px-3.5 py-1 rounded-full border border-blue-500/40 text-blue-200 shadow-xs font-medium whitespace-nowrap">
                ระบบเครือข่าย 1669
              </span>
              <span className="text-xs bg-[#0a193b] px-3.5 py-1 rounded-full border border-emerald-400/30 text-emerald-300 shadow-xs font-medium inline-flex items-center gap-1 whitespace-nowrap">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>จุดสแตนด์บายบรบือ 24 ชม.</span>
              </span>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-white font-bold font-prompt text-sm uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2.5 whitespace-nowrap">
              เมนูหลัก
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigateSection('home')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left whitespace-nowrap"
                >
                  หน้าแรก (Home)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('departments')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left whitespace-nowrap"
                >
                  แผนกและภารกิจกู้ชีพ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('missions')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left whitespace-nowrap"
                >
                  ผลงานการปฏิบัติการ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('pricing')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left whitespace-nowrap"
                >
                  เกณฑ์ค่าบริการ & ความโปร่งใส
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('about')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left whitespace-nowrap"
                >
                  เกี่ยวกับสมาคม & พ่อปู่จูมคำ
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('section-contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-amber-300 hover:text-amber-200 font-semibold transition-colors cursor-pointer text-left inline-flex items-center gap-1 whitespace-nowrap"
                >
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="whitespace-nowrap">พิกัดสำนักงาน & แผนที่</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Network & Service Nodes */}
          <div>
            <h4 className="text-white font-bold font-prompt text-sm uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2.5 whitespace-nowrap">
              จุดบริการเครือข่าย
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="text-white font-semibold flex items-center gap-1.5 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                <span>ศูนย์ใหญ่: อ.บรบือ (ถ.แจ้งสนิท)</span>
              </li>
              <li className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></span>
                <span>จุดบริการ: อำเภอวาปีปทุม</span>
              </li>
              <li className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></span>
                <span>จุดบริการ: อำเภอนาดูน</span>
              </li>
              <li className="pt-2 text-blue-300/70 text-xs leading-relaxed">
                หน่วยงานร่วมบูรณาการ: รพ.บรบือ, สภ.บรบือ, สภ.กุดรัง, ศูนย์สั่งการ 1669 จ.มหาสารคาม
              </li>
            </ul>
          </div>

          {/* Col 5: Emergency Hotlines & Location */}
          <div>
            <h4 className="text-white font-bold font-prompt text-sm uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2.5 whitespace-nowrap">
              ติดต่อฉุกเฉิน 24 ชม.
            </h4>
            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex items-start gap-2">
                <PhoneCall className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-blue-300/70 text-xs whitespace-nowrap">สายตรงกู้ภัยประจิม (บรบือ):</span>
                  <a href="tel:0929253839" className="text-amber-300 font-bold font-prompt text-base hover:text-amber-200 whitespace-nowrap tabular-nums">
                    092-925-3839
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Radio className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-blue-300/70 text-xs whitespace-nowrap">สายด่วนการแพทย์ฉุกเฉิน:</span>
                  <a href="tel:1669" className="text-white font-bold font-prompt text-base hover:text-amber-300 whitespace-nowrap tabular-nums">
                    1669 (ฟรีทุกเครือข่าย)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-blue-100 text-xs font-semibold block whitespace-nowrap">
                    ถนนแจ้งสนิท ตำบลบรบือ อำเภอบรบือ
                  </span>
                  <span className="text-blue-300/70 text-[11px] whitespace-nowrap">
                    จังหวัดมหาสารคาม 44130
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Admin Login Link */}
        <div className="mt-12 pt-6 border-t border-blue-900/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-blue-300/70 text-center md:text-left">
          <div className="leading-relaxed">
            © {new Date().getFullYear()} สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์ (หน่วยกู้ภัยประจิม). สงวนลิขสิทธิ์.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="https://maps.google.com/?q=16.0375,103.1186+(หน่วยกู้ภัยประจิม+สมาคมประจิมสารคาม+บรบือ)"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300/80 hover:text-amber-300 inline-flex items-center gap-1.5 transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Google Maps HQ</span>
            </a>

            <span className="text-blue-800 hidden sm:inline">|</span>

            <button
              onClick={onOpenAdminModal}
              className="text-blue-300/80 hover:text-amber-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
              <span>เข้าสู่ระบบศูนย์สั่งการ (Admin CMS)</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

