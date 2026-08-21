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
import { ShieldCheck, PhoneCall } from 'lucide-react';

interface AffiliationItem {
  id: string;
  name: string;
  shortName: string;
  role: string;
  hotline: string;
  badge: string;
  badgeColor: string;
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
    badgeColor: 'bg-blue-50 text-blue-900 border-blue-200',
    Component: NiemsEmblem,
  },
  {
    id: 'ddpm-1784',
    name: 'กรมป้องกันและบรรเทาสาธารณภัย',
    shortName: 'ปภ. DDPM',
    role: 'แผนเผชิญเหตุสาธารณภัย อุทกภัย วาตภัย และอัคคีภัย',
    hotline: 'โทร 1784',
    badge: 'บรรเทาสาธารณภัย',
    badgeColor: 'bg-orange-50 text-orange-900 border-orange-200',
    Component: DdpmEmblem,
  },
  {
    id: 'moph-borabue',
    name: 'กระทรวงสาธารณสุข / รพ.บรบือ',
    shortName: 'สธ. MOPH',
    role: 'ศูนย์รับ-ส่งต่อผู้ป่วยฉุกเฉิน รพ.บรบือ & สสจ.สารคาม',
    hotline: 'รพ.บรบือ 043-771-042',
    badge: 'ระบบสาธารณสุข',
    badgeColor: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    Component: MophEmblem,
  },
  {
    id: 'police-191',
    name: 'สำนักงานตำรวจแห่งชาติ / สภ.บรบือ',
    shortName: 'สภ.บรบือ 191',
    role: 'ตรวจสถานที่เกิดเหตุ สนับสนุนชันสูตร & อำนวยการจราจร',
    hotline: 'โทร 191 / 043-771-081',
    badge: 'สนับสนุนตำรวจ',
    badgeColor: 'bg-red-50 text-red-900 border-red-200',
    Component: PoliceEmblem,
  },
  {
    id: 'scuba-diving',
    name: 'ชุดประดาน้ำกู้ภัยทางน้ำภาคอีสาน',
    shortName: 'SCUBA RESCUE',
    role: 'ค้นหาผู้สูญหายใต้น้ำแม่น้ำชี อ่างเก็บน้ำบรบือ & กู้ภัยทางน้ำ',
    hotline: 'ประจิม 061-119-3342',
    badge: 'กู้ภัยทางน้ำ',
    badgeColor: 'bg-cyan-50 text-cyan-900 border-cyan-200',
    Component: ScubaRescueSeal,
  },
  {
    id: 'hydraulic-cutter',
    name: 'ชุดเครื่องมือตัด-ถ่างไฮดรอลิกช่วยชีวิต',
    shortName: 'HYDRAULIC CUTTER',
    role: 'กู้ภัยวิกฤตอุบัติเหตุทางถนน ยานพาหนะติดภายใน 24 ชม.',
    hotline: 'เผชิญเหตุด่วน 24 ชม.',
    badge: 'ตัด-ถ่างกู้ชีพ',
    badgeColor: 'bg-amber-50 text-amber-900 border-amber-300',
    Component: HydraulicRescueSeal,
  },
  {
    id: 'nbtc-168275',
    name: 'สำนักงาน กสทช. (วิทยุสื่อสารกู้ภัย)',
    shortName: '168.275 MHz',
    role: 'ช่องความถี่วิทยุสื่อสารหลัก ศูนย์กู้ภัยประจิมสารคาม',
    hotline: 'วิทยุ 168.275 MHz',
    badge: 'วิทยุสื่อสาร',
    badgeColor: 'bg-purple-50 text-purple-900 border-purple-200',
    Component: NbtcRadioEmblem,
  },
  {
    id: 'doh-1586',
    name: 'กรมทางหลวง (แขวงทางหลวงมหาสารคาม)',
    shortName: 'ทางหลวง 1586',
    role: 'ดูแลจุดเสี่ยงอุบัติเหตุ ถนนแจ้งสนิท (ทล.23) สายหลักอีสาน',
    hotline: 'สายด่วน 1586',
    badge: 'ความปลอดภัยถนน',
    badgeColor: 'bg-blue-50 text-blue-900 border-blue-200',
    Component: DohHighwayEmblem,
  },
  {
    id: 'ems-dispatch-saraham',
    name: 'ศูนย์สั่งการการแพทย์ฉุกเฉิน จ.มหาสารคาม',
    shortName: 'ศูนย์สั่งการ 1669',
    role: 'รับแจ้งเหตุ ประสานงาน และสั่งการเครือข่ายกู้ชีพตลอด 24 ชม.',
    hotline: 'สั่งการ 1669',
    badge: 'ศูนย์สั่งการ 24H',
    badgeColor: 'bg-rose-50 text-rose-900 border-rose-200',
    Component: EmsDispatchCenterEmblem,
  },
  {
    id: 'rescue-association-network',
    name: 'สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์',
    shortName: 'พุทธศาสตร์สงเคราะห์',
    role: 'ภาคีเครือข่ายกู้ภัยมูลนิธิ-สมาคมเพื่อมนุษยธรรมทั่วประเทศ',
    hotline: 'ทะเบียน มค. 4/2558',
    badge: 'องค์กรเพื่อมนุษยธรรม',
    badgeColor: 'bg-amber-100 text-amber-950 border-amber-300',
    Component: RescueAssociationSeal,
  },
];

export function InfiniteAffiliationsMarquee() {
  // Duplicate array 2 times for continuous seamless infinite loop
  const marqueeItems = [...AFFILIATIONS_DATA, ...AFFILIATIONS_DATA];

  return (
    <section className="w-full bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 border-y-2 border-amber-500 py-12 overflow-hidden relative font-prompt shadow-inner">
      {/* Background ambient texture & rescue cross accents */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#16377e_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950 text-amber-300 text-xs font-bold uppercase tracking-widest font-mono shadow-md mb-3 border border-slate-800">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
          <span>OFFICIAL INTEGRATIONS & NETWORK AFFILIATIONS</span>
        </div>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
          เครือข่ายความร่วมมือและมาตรฐานการปฏิบัติการฉุกเฉิน
        </h3>
        <p className="text-slate-900 font-sarabun text-sm sm:text-base mt-2 max-w-3xl mx-auto font-medium">
          ปฏิบัติงานบูรณาการร่วมกับหน่วยงานภาครัฐ สถาบันการแพทย์ฉุกเฉินแห่งชาติ (สพฉ.) กรมป้องกันและบรรเทาสาธารณภัย (ปภ.) สำนักงานตำรวจแห่งชาติ และภาคีเครือข่ายกู้ภัย 24 ชั่วโมง
        </p>
      </div>

      {/* Left and Right Smooth Gradient Masks */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-amber-400 via-amber-400/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-amber-500 via-amber-500/80 to-transparent z-20 pointer-events-none" />

        {/* The Marquee Track */}
        <div className="animate-marquee-infinite flex gap-4 py-2">
          {marqueeItems.map((item, idx) => {
            const EmblemComponent = item.Component;
            return (
              <div
                key={`${item.id}-${idx}`}
                className="w-72 sm:w-80 shrink-0 p-4.5 rounded-2xl bg-white border-2 border-amber-300/80 hover:border-[#16377e] shadow-md hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between select-none cursor-pointer transform hover:-translate-y-1"
              >
                <div>
                  {/* Top Bar: Official Emblem + Short & Full Name */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-slate-950 border-2 border-amber-400 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform aspect-square">
                      <EmblemComponent className="w-10 h-10 shrink-0" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-sm font-bold text-slate-950 font-prompt block group-hover:text-blue-900 transition-colors whitespace-nowrap truncate">
                        {item.shortName}
                      </span>
                      <span className="text-[11px] font-sarabun text-slate-500 line-clamp-1">
                        {item.name}
                      </span>
                    </div>
                  </div>

                  {/* Role / Description */}
                  <p className="text-xs text-slate-700 font-sarabun leading-relaxed line-clamp-2 mb-3">
                    {item.role}
                  </p>
                </div>

                {/* Footer Bar: Badge + Hotline */}
                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                  <span className={`px-2.5 py-0.5 rounded-full border font-mono font-bold whitespace-nowrap text-[11px] ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                  <span className="font-mono text-slate-900 font-bold flex items-center gap-1 whitespace-nowrap text-xs">
                    <PhoneCall className="w-3.5 h-3.5 text-red-600 shrink-0" />
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
