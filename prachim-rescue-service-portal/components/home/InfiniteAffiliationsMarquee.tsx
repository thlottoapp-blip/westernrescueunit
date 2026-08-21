'use client';

import React from 'react';
import {
  NiemsEmblem,
  DdpmEmblem,
  MophEmblem,
  PoliceEmblem,
  ScubaRescueSeal,
  HydraulicRescueSeal,
  NbtcRadioEmblem,
  DohHighwayEmblem,
  EmsDispatchCenterEmblem,
  RescueAssociationSeal,
} from '@/components/shared/OfficialIcons';
import { ShieldCheck, PhoneCall, Radio, Sparkles } from 'lucide-react';

interface AffiliationItem {
  id: string;
  name: string;
  shortName: string;
  role: string;
  hotline: string;
  badge: string;
  badgeColor: string;
  iconBg: string;
  Component: React.ComponentType<{ className?: string; size?: number }>;
}

const AFFILIATIONS_DATA: AffiliationItem[] = [
  {
    id: 'niems-1669',
    name: 'สถาบันการแพทย์ฉุกเฉินแห่งชาติ (สพฉ.)',
    shortName: 'สพฉ. 1669',
    role: 'มาตรฐานบริการการแพทย์ฉุกเฉิน & เวชกรฉุกเฉิน สพฉ.',
    hotline: 'โทร 1669',
    badge: 'การแพทย์ฉุกเฉิน',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-400/40',
    iconBg: 'from-blue-900/60 to-blue-950/80',
    Component: NiemsEmblem,
  },
  {
    id: 'ddpm-1784',
    name: 'กรมป้องกันและบรรเทาสาธารณภัย',
    shortName: 'ปภ. DDPM',
    role: 'แผนเผชิญเหตุสาธารณภัย อุทกภัย วาตภัย และอัคคีภัย',
    hotline: 'โทร 1784',
    badge: 'บรรเทาสาธารณภัย',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-400/40',
    iconBg: 'from-orange-950/60 to-slate-950/80',
    Component: DdpmEmblem,
  },
  {
    id: 'moph-borabue',
    name: 'กระทรวงสาธารณสุข / รพ.บรบือ',
    shortName: 'สธ. MOPH',
    role: 'ศูนย์รับ-ส่งต่อผู้ป่วยฉุกเฉิน รพ.บรบือ & สสจ.สารคาม',
    hotline: 'รพ.บรบือ 043-771-042',
    badge: 'ระบบสาธารณสุข',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    iconBg: 'from-emerald-950/60 to-slate-950/80',
    Component: MophEmblem,
  },
  {
    id: 'police-191',
    name: 'สำนักงานตำรวจแห่งชาติ / สภ.บรบือ',
    shortName: 'สภ.บรบือ 191',
    role: 'ตรวจสถานที่เกิดเหตุ สนับสนุนชันสูตร & อำนวยการจราจร',
    hotline: 'โทร 191 / 043-771-081',
    badge: 'สนับสนุนตำรวจ',
    badgeColor: 'bg-red-500/20 text-red-300 border-red-400/40',
    iconBg: 'from-red-950/60 to-slate-950/80',
    Component: PoliceEmblem,
  },
  {
    id: 'scuba-diving',
    name: 'ชุดประดาน้ำกู้ภัยทางน้ำภาคอีสาน',
    shortName: 'SCUBA RESCUE',
    role: 'ค้นหาผู้สูญหายใต้น้ำแม่น้ำชี อ่างเก็บน้ำบรบือ & กู้ภัยทางน้ำ',
    hotline: 'ประจิม 061-119-3342',
    badge: 'กู้ภัยทางน้ำ',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
    iconBg: 'from-cyan-950/60 to-slate-950/80',
    Component: ScubaRescueSeal,
  },
  {
    id: 'hydraulic-cutter',
    name: 'ชุดเครื่องมือตัด-ถ่างไฮดรอลิกช่วยชีวิต',
    shortName: 'HYDRAULIC CUTTER',
    role: 'กู้ภัยวิกฤตอุบัติเหตุทางถนน ยานพาหนะติดภายใน 24 ชม.',
    hotline: 'เผชิญเหตุด่วน 24 ชม.',
    badge: 'ตัด-ถ่างกู้ชีพ',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    iconBg: 'from-amber-950/60 to-slate-950/80',
    Component: HydraulicRescueSeal,
  },
  {
    id: 'nbtc-168275',
    name: 'สำนักงาน กสทช. (วิทยุสื่อสารกู้ภัย)',
    shortName: '168.275 MHz',
    role: 'ช่องความถี่วิทยุสื่อสารหลัก ศูนย์กู้ภัยประจิมสารคาม',
    hotline: 'วิทยุ 168.275 MHz',
    badge: 'วิทยุสื่อสาร',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-400/40',
    iconBg: 'from-purple-950/60 to-slate-950/80',
    Component: NbtcRadioEmblem,
  },
  {
    id: 'doh-1586',
    name: 'กรมทางหลวง (แขวงทางหลวงมหาสารคาม)',
    shortName: 'ทางหลวง 1586',
    role: 'ดูแลจุดเสี่ยงอุบัติเหตุ ถนนแจ้งสนิท (ทล.23) สายหลักอีสาน',
    hotline: 'สายด่วน 1586',
    badge: 'ความปลอดภัยถนน',
    badgeColor: 'bg-blue-600/20 text-blue-300 border-blue-400/40',
    iconBg: 'from-blue-950/60 to-slate-950/80',
    Component: DohHighwayEmblem,
  },
  {
    id: 'ems-dispatch-saraham',
    name: 'ศูนย์สั่งการการแพทย์ฉุกเฉิน จ.มหาสารคาม',
    shortName: 'ศูนย์สั่งการ 1669',
    role: 'รับแจ้งเหตุ ประสานงาน และสั่งการเครือข่ายกู้ชีพตลอด 24 ชม.',
    hotline: 'สั่งการ 1669',
    badge: 'ศูนย์สั่งการ 24H',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-400/40',
    iconBg: 'from-rose-950/60 to-slate-950/80',
    Component: EmsDispatchCenterEmblem,
  },
  {
    id: 'rescue-association-network',
    name: 'สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์',
    shortName: 'พุทธศาสตร์สงเคราะห์',
    role: 'ภาคีเครือข่ายกู้ภัยมูลนิธิ-สมาคมเพื่อมนุษยธรรมทั่วประเทศ',
    hotline: 'ทะเบียน มค. 4/2558',
    badge: 'องค์กรเพื่อมนุษยธรรม',
    badgeColor: 'bg-amber-400/20 text-amber-200 border-amber-300/40',
    iconBg: 'from-amber-950/60 to-slate-950/80',
    Component: RescueAssociationSeal,
  },
];

export function InfiniteAffiliationsMarquee() {
  // Duplicate array 2 times for continuous seamless loop
  const marqueeItems = [...AFFILIATIONS_DATA, ...AFFILIATIONS_DATA];

  return (
    <section className="w-full bg-gradient-to-b from-slate-950 via-[#07122a] to-slate-950 border-y border-blue-900/40 py-10 overflow-hidden relative font-prompt">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-32 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-7 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/80 border border-amber-400/40 text-amber-300 text-[11px] font-bold uppercase tracking-widest font-mono shadow-sm mb-2.5">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>OFFICIAL INTEGRATIONS & NETWORK AFFILIATIONS</span>
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug">
          เครือข่ายความร่วมมือและมาตรฐานการปฏิบัติการฉุกเฉิน
        </h3>
        <p className="text-slate-300 text-xs sm:text-sm font-sarabun mt-1.5 max-w-2xl mx-auto">
          ปฏิบัติงานบูรณาการร่วมกับหน่วยงานภาครัฐ สถาบันการแพทย์ฉุกเฉินแห่งชาติ (สพฉ.) ปภ. ตำรวจภูธร และสมาคมกู้ภัยเพื่อมนุษยธรรม
        </p>
      </div>

      {/* Left and Right Smooth Gradient Masks */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent z-20 pointer-events-none" />

        {/* The Marquee Track */}
        <div className="animate-marquee-infinite flex gap-4 py-2">
          {marqueeItems.map((item, idx) => {
            const EmblemComponent = item.Component;
            return (
              <div
                key={`${item.id}-${idx}`}
                className="w-72 sm:w-80 shrink-0 p-4 rounded-2xl bg-gradient-to-br from-[#0c1c44] to-[#071128] border border-blue-800/60 hover:border-amber-400/80 shadow-lg hover:shadow-2xl hover:shadow-blue-900/40 transition-all duration-300 group flex flex-col justify-between select-none cursor-pointer"
              >
                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-11 h-11 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform aspect-square">
                        <EmblemComponent className="w-10 h-10 shrink-0" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white font-prompt block group-hover:text-amber-300 transition-colors whitespace-nowrap">
                          {item.shortName}
                        </span>
                        <span className="text-[10px] font-sarabun text-slate-400 line-clamp-1">
                          {item.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Role / Description */}
                  <p className="text-[11px] text-slate-300 font-sarabun leading-relaxed line-clamp-2 mb-3">
                    {item.role}
                  </p>
                </div>

                {/* Footer Bar: Badge + Hotline */}
                <div className="pt-2.5 border-t border-blue-900/50 flex items-center justify-between gap-2 text-[10px]">
                  <span className={`px-2 py-0.5 rounded-full border font-mono font-medium whitespace-nowrap ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                  <span className="font-mono text-amber-300 font-bold flex items-center gap-1 whitespace-nowrap">
                    <PhoneCall className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>{item.hotline}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
