'use client';

import React from 'react';
import { OfficialLogo } from '@/components/shared/OfficialLogo';
import {
  ShieldAlert,
  Award,
  Users,
  Clock,
  Heart,
  CheckCircle,
  MapPin,
  Flame,
  Star,
} from 'lucide-react';

interface AboutSacredSectionProps {
  onOpenReportModal: () => void;
}

export function AboutSacredSection({ onOpenReportModal }: AboutSacredSectionProps) {
  const values = [
    {
      title: 'จิตอาสาเพื่อมนุษยธรรม',
      desc: 'ช่วยเหลือผู้ประสบภัยทุกเชื้อชาติ ศาสนา โดยไม่หวังผลประโยชน์ตอบแทน',
    },
    {
      title: 'มาตรฐานกู้ชีพ EMS สพฉ.',
      desc: 'บุคลากรผ่านการอบรมเวชกรฉุกเฉิน EMT และมีอุปกรณ์ช่วยชีวิตขั้นพื้นฐานและขั้นสูง',
    },
    {
      title: 'เคารพสิ่งศักดิ์สิทธิ์และชุมชน',
      desc: 'น้อมนำบารมี "พ่อปู่จูมคำ" สิ่งศักดิ์สิทธิ์คู่บ้านคู่เมืองบรบือเป็นขวัญกำลังใจ',
    },
    {
      title: 'เครือข่ายบูรณาการ 1669',
      desc: 'ประสานงานรวดเร็วร่วมกับศูนย์สั่งการจังหวัด รพ.บรบือ สภ.บรบือ และ สภ.กุดรัง',
    },
  ];

  const stats = [
    { number: '10+', label: 'ปีแห่งการก่อตั้งและรับใช้สังคม' },
    { number: '12,500+', label: 'เคสช่วยเหลือผู้ประสบภัยและเจ็บป่วย' },
    { number: '45+', label: 'เจ้าหน้าที่และอาสาสมัครพร้อมปฏิบัติการ' },
    { number: '24/7', label: 'ศูนย์สั่งการพร้อมออกเหตุตลอด 24 ชั่วโมง' },
  ];

  return (
    <section id="section-about" className="py-16 sm:py-24 bg-white border-b border-slate-200 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Organization Story & Mission */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-[#16377e] font-mono text-xs uppercase tracking-widest font-bold mb-2">
              <span className="w-6 h-[2px] bg-amber-500 inline-block"></span>
              <span className="text-amber-700">ABOUT PRACHIM RESCUE</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-prompt leading-snug mb-4">
              สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์
              <span className="block text-[#16377e] text-xl sm:text-2xl font-bold mt-1">
                (หน่วยกู้ภัยประจิม อำเภอบรบือ จังหวัดมหาสารคาม)
              </span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base font-sarabun leading-relaxed mb-6">
              สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์ ก่อตั้งขึ้นด้วยเจตนารมณ์อันบริสุทธิ์ของกลุ่มประชาชนและจิตอาสาในอำเภอบรบือ จังหวัดมหาสารคาม เพื่อเป็นกำลังสำคัญในการบรรเทาสาธารณภัย กู้ชีพ-กู้ภัย ช่วยเหลือผู้ป่วยฉุกเฉิน และผู้ประสบอุบัติเหตุบนท้องถนน โดยยึดมั่นในหลักมนุษยธรรมและคำสอนทางพระพุทธศาสนา
            </p>

            {/* Sacred Patron Box */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#0b1838] via-[#122759] to-[#0a1530] border-2 border-amber-400/60 mb-8 shadow-xl relative overflow-hidden text-white">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 relative z-10">
                <div className="shrink-0 group-hover:scale-105 transition-transform">
                  <OfficialLogo size={72} withGlow={true} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-400/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-amber-400/50 font-prompt whitespace-nowrap">
                      สิ่งศักดิ์สิทธิ์คู่บ้านคู่เมือง
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-amber-300 font-prompt mt-1 whitespace-nowrap truncate">
                    สิ่งศักดิ์สิทธิ์ประจำหน่วย: &ldquo;พ่อปู่จูมคำ&rdquo;
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 font-sarabun mt-1 leading-relaxed">
                    สิ่งศักดิ์สิทธิ์คู่บ้านคู่เมืองอำเภอบรบือ ที่คณะเจ้าหน้าที่และอาสาสมัครกู้ภัยประจิมเคารพบูชาและยึดเหนี่ยวจิตใจ สัญลักษณ์มงคลบนตราประจำหน่วยเป็นมงคลชัยคุ้มครองทุกภารกิจให้ปลอดภัย แคล้วคลาด และเปี่ยมด้วยเมตตาธรรม
                  </p>
                </div>
              </div>
            </div>

            {/* Core Values 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {values.map((v, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-900 font-prompt whitespace-nowrap truncate">{v.title}</h5>
                    <p className="text-[11px] sm:text-xs text-slate-600 font-sarabun mt-0.5 leading-normal">
                      {v.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Emergency Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="tel:0611193342"
                className="inline-flex items-center justify-center gap-2 bg-[#16377e] hover:bg-[#1f489e] text-white font-bold px-6 py-3 rounded-full shadow-md shadow-blue-950/20 text-xs sm:text-sm font-prompt transition-all border border-amber-400/50 whitespace-nowrap shrink-0 min-h-[44px]"
              >
                <span className="whitespace-nowrap">โทรติดต่อศูนย์กู้ภัย 061-119-3342</span>
              </a>
              <button
                onClick={onOpenReportModal}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-6 py-3 rounded-full border border-slate-300 text-xs sm:text-sm font-prompt transition-all cursor-pointer shadow-xs whitespace-nowrap shrink-0 min-h-[44px]"
              >
                <span className="whitespace-nowrap">แจ้งขอความช่วยเหลือ</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Showcase & Stats Banner */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Rescue Ambience Image Card */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-slate-900 group">
              <div
                className="h-64 sm:h-72 w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-white">
                <div className="flex items-center gap-2 text-red-400 text-xs font-semibold font-prompt mb-1 whitespace-nowrap">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="whitespace-nowrap">ที่ตั้งสำนักงานใหญ่</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 font-sarabun">
                  ถนนแจ้งสนิท ตำบลบรบือ อำเภอบรบือ จังหวัดมหาสารคาม 44130 (บริการตลอด 24 ชม.)
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col justify-center"
                >
                  <span className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#16377e] to-amber-600 font-prompt whitespace-nowrap tabular-nums">
                    {s.number}
                  </span>
                  <span className="text-xs text-slate-600 font-sarabun mt-1 leading-snug whitespace-nowrap truncate">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
