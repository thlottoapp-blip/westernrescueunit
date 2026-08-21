'use client';

import React from 'react';
import { PhoneCall, Activity, HeartPulse, Hospital, ArrowRight, Ambulance } from 'lucide-react';

interface RescueProcessFlowProps {
  onOpenReportModal: () => void;
}

export function RescueProcessFlow({ onOpenReportModal }: RescueProcessFlowProps) {
  const steps = [
    {
      stepNumber: '01',
      titleTh: 'โทรแจ้งเหตุหรือแจ้งออนไลน์',
      titleEn: 'CALL OR ARRIVE',
      desc: 'ติดต่อศูนย์สั่งการกู้ภัยประจิม โทร 061-119-3342 หรือ 1669 ตลอด 24 ชั่วโมง หรือส่งพิกัดผ่านระบบแจ้งเหตุ',
      icon: PhoneCall,
    },
    {
      stepNumber: '02',
      titleTh: 'ประเมินและสั่งการด่วน',
      titleEn: 'RAPID ASSESSMENT',
      desc: 'ศูนย์สั่งการประเมินระดับความรุนแรง (Triage) และสั่งการรถพยาบาล/ชุดตัด-ถ่าง/ชุดประดาน้ำออกปฏิบัติการทันที',
      icon: Activity,
    },
    {
      stepNumber: '03',
      titleTh: 'ปฐมพยาบาล & ตัด-ถ่างช่วยชีวิต',
      titleEn: 'STABILIZE & TREAT',
      desc: 'เจ้าหน้าที่ EMT เข้าถึงที่เกิดเหตุ ให้การปฐมพยาบาลขั้นสูง ตัด-ถ่างนำผู้บาดเจ็บออกจากซากรถอย่างปลอดภัย',
      icon: HeartPulse,
    },
    {
      stepNumber: '04',
      titleTh: 'นำส่งโรงพยาบาลบรบือ',
      titleEn: 'CONTINUE CARE',
      desc: 'เคลื่อนย้ายและนำส่งห้องฉุกเฉิน รพ.บรบือ หรือโรงพยาบาลแม่ข่าย พร้อมรายงานสัญญาณชีพให้แพทย์เวรรับช่วงต่อ',
      icon: Hospital,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-amber-700 font-mono text-xs uppercase tracking-widest font-bold mb-2">
            <span>FAST. PRECISE. LIFE-SAVING.</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-prompt">
            ขั้นตอนการปฏิบัติการฉุกเฉิน (Response Process)
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-sarabun mt-2">
            มาตรฐานการทำงานกู้ชีพ-กู้ภัยที่มีความแม่นยำ รวดเร็ว และเน้นความปลอดภัยของผู้ประสบภัยเป็นอันดับแรก
          </p>
        </div>

        {/* 4 Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.stepNumber}
                className="relative rounded-3xl bg-white border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:border-[#16377e] hover:shadow-xl transition-all group"
              >
                {/* Step Number Top Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#16377e] to-[#0f2452] border border-amber-400/60 flex items-center justify-center text-amber-300 shadow-md group-hover:scale-105 transition-transform shrink-0 aspect-square">
                    <Icon className="w-6 h-6 shrink-0" />
                  </div>
                  <span className="text-3xl font-black text-slate-200 group-hover:text-amber-500/60 font-mono transition-colors">
                    {step.stepNumber}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <div className="text-[10px] font-mono text-amber-700 uppercase tracking-widest font-bold mb-1 whitespace-nowrap">
                    {step.titleEn}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-prompt mb-2 group-hover:text-[#16377e] transition-colors whitespace-nowrap truncate">
                    {step.titleTh}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-sarabun leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Bottom line accent */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="whitespace-nowrap">ขั้นตอนที่ {idx + 1} / 4</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#16377e] group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Emergency Ambulance Callout Bar */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0b1838] via-[#122759] to-[#0a1530] text-white border-2 border-amber-400/60 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-4 text-center md:text-left relative z-10">
            <div className="w-14 h-14 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center shrink-0 shadow-lg aspect-square">
              <Ambulance className="w-7 h-7 shrink-0" />
            </div>
            <div>
              <h4 className="text-base sm:text-xl font-bold text-white font-prompt whitespace-nowrap truncate">
                ต้องการเรียกรถพยาบาลกู้ชีพฉุกเฉิน หรือแจ้งเหตุด่วน?
              </h4>
              <p className="text-xs sm:text-sm text-blue-200 font-sarabun mt-0.5">
                ทีมกู้ภัยประจิมพร้อมออกเหตุทันที 24 ชม. ทั่วพื้นที่อำเภอบรบือและพื้นที่เชื่อมต่อ
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
            <a
              href="tel:0611193342"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold px-6 py-3 rounded-full shadow-lg text-xs sm:text-sm font-prompt transition-all whitespace-nowrap shrink-0 min-h-[44px]"
            >
              <PhoneCall className="w-4 h-4 text-slate-950 shrink-0" />
              <span className="whitespace-nowrap tabular-nums">061-119-3342</span>
            </a>
            <button
              onClick={onOpenReportModal}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-full border border-amber-400/40 text-xs sm:text-sm font-prompt transition-all cursor-pointer whitespace-nowrap shrink-0 min-h-[44px]"
            >
              <span className="whitespace-nowrap">ส่งพิกัดแจ้งเหตุ</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
