'use client';

import React from 'react';
import {
  Ambulance,
  Waves,
  HeartPulse,
  ShieldAlert,
  FileCheck2,
  HeartHandshake,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { usePrachimStore } from '@/lib/store';

interface DepartmentsGridProps {
  onSelectDepartment: (deptSlug: string) => void;
}

function getCategoryIcon(slug: string, iconName?: string) {
  if (slug === 'water-rescue' || iconName === 'Waves') return Waves;
  if (slug === 'disaster-community' || iconName === 'ShieldAlert') return ShieldAlert;
  if (slug === 'crime-forensics' || iconName === 'FileCheck2') return FileCheck2;
  if (slug === 'indigent-transport' || iconName === 'HeartHandshake') return HeartHandshake;
  return Ambulance;
}

function getCategoryCover(slug: string) {
  switch (slug) {
    case 'water-rescue':
      return 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80';
    case 'disaster-community':
      return 'https://images.unsplash.com/photo-1531386151447-fd76ad50012f?auto=format&fit=crop&w=600&q=80';
    case 'crime-forensics':
      return 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80';
    case 'indigent-transport':
      return 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80';
    default:
      return 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=600&q=80';
  }
}

export function DepartmentsGrid({ onSelectDepartment }: DepartmentsGridProps) {
  const { categories } = usePrachimStore();

  const fallbackDepartments = [
    {
      id: 'dept-1',
      slug: 'ems-accident',
      name_th: 'การแพทย์ฉุกเฉิน (EMS)',
      name_en: 'EMERGENCY MEDICINE',
      description: 'ออกปฏิบัติการช่วยเหลือ ปฐมพยาบาล และนำส่งผู้ป่วยฉุกเฉิน/ผู้บาดเจ็บสู่ รพ.บรบือ และโรงพยาบาลใกล้เคียงตลอด 24 ชั่วโมง ฟรี 100%',
      icon_name: 'Ambulance',
    },
    {
      id: 'dept-2',
      slug: 'water-rescue',
      name_th: 'ชุดประดาน้ำและกู้ภัยทางน้ำ',
      name_en: 'WATER & SCUBA RESCUE',
      description: 'ชุดดำน้ำ Scuba ค้นหาผู้สูญหายใต้น้ำในแม่น้ำชี อ่างเก็บน้ำบรบือ และภารกิจงมค้นหาทรัพย์สิน/แหวนเพชรของมีค่าคืนเจ้าทุกข์',
      icon_name: 'Waves',
    },
    {
      id: 'dept-3',
      slug: 'disaster-community',
      name_th: 'บรรเทาสาธารณภัย & จับงู',
      name_en: 'DISASTER & WILDLIFE',
      description: 'ช่วยเหลือประชาชนกรณีสัตว์มีพิษ งูเห่า งูจงอาง เข้าบ้านเรือน ระงับอัคคีภัยเบื้องต้น ช่วยเหลือรถเสีย แบตเตอรี่หมด และอพยพน้ำท่วม',
      icon_name: 'ShieldAlert',
    },
    {
      id: 'dept-4',
      slug: 'crime-forensics',
      name_th: 'ชันสูตร & สนับสนุน ตร.',
      name_en: 'FORENSIC & POLICE SUPPORT',
      description: 'ร่วมปฏิบัติการกับ สภ.บรบือ, สภ.กุดรัง และแพทย์เวร รพ.บรบือ ในการตรวจสอบที่เกิดเหตุ พิมพ์ลายนิ้วมือ และเคลื่อนย้ายร่างผู้เสียชีวิต',
      icon_name: 'FileCheck2',
    },
    {
      id: 'dept-5',
      slug: 'indigent-transport',
      name_th: 'สงเคราะห์ผู้ยากไร้ & ผู้ป่วย',
      name_en: 'INDIGENT & TRANSIT CARE',
      description: 'โครงการส่งร่างผู้วายชนม์และเคลื่อนย้ายผู้ป่วยติดเตียงยากไร้กลับสู่ภูมิลำเนาเพื่อประกอบพิธีกรรมทางศาสนาโดยไม่คิดค่าใช้จ่ายในเคสสงเคราะห์',
      icon_name: 'HeartHandshake',
    },
  ];

  const itemsToRender = (categories && categories.length > 0)
    ? categories.filter((c) => c.is_active).sort((a, b) => a.sort_order - b.sort_order)
    : fallbackDepartments;

  return (
    <section id="section-departments" className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#16377e] font-mono text-xs uppercase tracking-widest font-bold mb-2">
              <span className="w-6 h-[2px] bg-amber-500 inline-block"></span>
              <span className="text-amber-700 whitespace-nowrap">OUR SPECIALIZED DIVISIONS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-prompt">
              แผนกปฏิบัติการและภารกิจกู้ชีพ
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-sarabun mt-1 max-w-xl">
              ภารกิจหลักครอบคลุมการแพทย์ฉุกเฉิน งานตัด-ถ่าง กู้ภัยทางน้ำ และบรรเทาสาธารณภัย อำเภอบรบือ จังหวัดมหาสารคาม
            </p>
          </div>

          <button
            onClick={() => onSelectDepartment('all')}
            className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-[#16377e] hover:text-blue-900 font-prompt transition-colors group cursor-pointer px-4 py-2 rounded-full hover:bg-blue-50 border border-blue-200 shadow-xs whitespace-nowrap shrink-0 min-h-[38px]"
          >
            <span className="whitespace-nowrap">ดูผลงานการปฏิบัติการทั้งหมด</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-600 shrink-0" />
          </button>
        </div>

        {/* Categories Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {itemsToRender.map((cat) => {
            const Icon = getCategoryIcon(cat.slug, cat.icon_name);
            const coverImg = getCategoryCover(cat.slug);
            return (
              <div
                key={cat.id}
                onClick={() => onSelectDepartment(cat.slug)}
                className="group relative rounded-3xl bg-white border border-slate-200 hover:border-[#16377e] overflow-hidden shadow-xs hover:shadow-xl hover:shadow-blue-950/10 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
              >
                {/* Image Header with Badge */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${coverImg})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a193b]/90 via-[#0a193b]/30 to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#16377e]/95 text-white border border-amber-400/40 shadow-md backdrop-blur-sm font-prompt whitespace-nowrap">
                      {cat.slug === 'ems-accident' ? 'บริการฟรี (สพฉ.)' : 'หน่วยกู้ภัยประจิม'}
                    </span>
                  </div>

                  {/* Icon Emblem */}
                  <div className="absolute bottom-3 left-4 z-10 w-11 h-11 rounded-full bg-gradient-to-br from-[#16377e] to-[#0f2452] border-2 border-amber-400/60 flex items-center justify-center shadow-lg text-amber-300 group-hover:scale-105 transition-transform aspect-square shrink-0">
                    <Icon className="w-5 h-5 shrink-0" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-mono text-amber-700 font-bold uppercase tracking-wider mb-1 whitespace-nowrap truncate">
                      {cat.name_en || cat.slug}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 font-prompt group-hover:text-[#16377e] transition-colors mb-2 whitespace-nowrap truncate">
                      {cat.name_th}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm font-sarabun leading-relaxed line-clamp-3">
                      {cat.description}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-sarabun whitespace-nowrap">พร้อมปฏิบัติการ 24 ชม.</span>
                    <span className="text-[#16377e] font-bold font-prompt flex items-center gap-1 group-hover:translate-x-1 transition-transform whitespace-nowrap">
                      <span>รายละเอียดภารกิจ</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
