'use client';

import React from 'react';
import {
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  Fuel,
  Truck,
  Heart,
  FileText,
  PhoneCall,
} from 'lucide-react';

export function FeePolicyCard() {
  const policies = [
    {
      id: 'ems',
      title: 'เจ็บป่วยฉุกเฉินและอุบัติเหตุ (EMS)',
      status: 'ฟรี ไม่มีค่าใช้จ่าย 100%',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: ShieldCheck,
      details:
        'การปฐมพยาบาล รับ-ส่งผู้บาดเจ็บ หรือผู้ป่วยฉุกเฉินวิกฤตไป รพ.บรบือ และโรงพยาบาลใกล้เคียง เป็นบริการฟรีตลอด 24 ชั่วโมง โดยหน่วยกู้ภัยได้รับเงินอุดหนุนรายเคสจากสถาบันการแพทย์ฉุกเฉินแห่งชาติ (สพฉ.)',
      badge: 'สพฉ. 1669 รองรับ',
    },
    {
      id: 'disaster',
      title: 'ช่วยเหลือสาธารณภัยและชุมชน',
      status: 'ฟรี ไม่มีค่าใช้จ่าย 100%',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: Heart,
      details:
        'การจับงู อสรพิษ กำจัดสัตว์มีพิษเข้าบ้าน ช่วยเหลือรถเสีย แบตเตอรี่หมด กีดขวางทางจราจร และช่วยเหลือน้ำท่วม เป็นการทำงานด้วยจิตอาสา ไม่มีการเรียกเก็บเงินใดๆ ทั้งสิ้น (สินน้ำใจหรือค่าน้ำมันมอบได้ตามความสมัครใจ)',
      badge: 'จิตอาสาเพื่อสังคม',
    },
    {
      id: 'transport',
      title: 'เคลื่อนย้ายผู้ป่วยติดเตียง / ส่งร่างกลับภูมิลำเนาข้ามจังหวัด',
      status: 'ช่วยเหลือค่าน้ำมันตามจริง (เคสยากไร้ฟรี)',
      statusColor: 'bg-amber-50 text-amber-800 border-amber-200',
      icon: Fuel,
      details:
        'หากไม่ใช่เหตุฉุกเฉิน และเป็นการร้องขอให้ส่งข้ามจังหวัดระยะทางไกล ขอความอนุเคราะห์ช่วยเฉพาะ "ค่าน้ำมันเชื้อเพลิง" ตามระยะทางจริง (สำหรับครอบครัวยากไร้ไร้ทุนทรัพย์ ทางสมาคมมีกองทุนสงเคราะห์ช่วยเหลือฟรี)',
      badge: 'คิดตามระยะทางจริง',
    },
    {
      id: 'towing',
      title: 'บริการรถยก / รถลากจูง (เมื่อเกิดอุบัติเหตุ)',
      status: 'มีค่าใช้จ่ายตามจริงของเอกชน',
      statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: Truck,
      details:
        'เมื่อเกิดอุบัติเหตุและจำเป็นต้องใช้รถยกหรือรถสไลด์เพื่อย้ายซากยานพาหนะ กู้ภัยประจิมจะทำหน้าที่เป็นผู้ประสานงานเรียกเครือข่ายรถยกเอกชนให้ โดยเจ้าของรถเป็นผู้ชำระค่าบริการกับบริษัทรถยกตามราคามาตรฐาน',
      badge: 'ประสานงานเครือข่าย',
    },
  ];

  return (
    <section id="section-pricing" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-[#16377e] font-mono text-xs uppercase tracking-widest font-bold mb-2">
            <span className="w-6 h-[2px] bg-amber-500 inline-block"></span>
            <span className="text-amber-700">TRANSPARENCY & SERVICE FEES</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-prompt">
            เกณฑ์ค่าบริการและการช่วยเหลือประชาชน
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-sarabun mt-2">
            สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์ ยึดมั่นความโปร่งใส ชี้แจงเกณฑ์ค่าบริการชัดเจน เพื่อให้ประชาชนอุ่นใจเมื่อติดต่อขอความช่วยเหลือ
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {policies.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                className="rounded-3xl bg-slate-50/80 border border-slate-200 p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-[#16377e]/50 hover:shadow-md transition-all"
              >
                <div>
                  {/* Top Status & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold font-prompt border shadow-xs whitespace-nowrap ${p.statusColor}`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span className="whitespace-nowrap">{p.status}</span>
                    </span>
                    <span className="text-[11px] font-mono text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-xs whitespace-nowrap">
                      {p.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-11 h-11 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#16377e] shrink-0 mt-0.5 shadow-xs aspect-square">
                      <Icon className="w-5 h-5 shrink-0" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-prompt leading-snug">
                      {p.title}
                    </h3>
                  </div>

                  {/* Details */}
                  <p className="text-slate-600 text-xs sm:text-sm font-sarabun leading-relaxed">
                    {p.details}
                  </p>
                </div>

                {/* Footer Assurance */}
                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 font-sarabun">
                  <span className="whitespace-nowrap">หน่วยกู้ภัยประจิม อ.บรบือ จ.มหาสารคาม</span>
                  <a href="tel:0611193342" className="text-[#16377e] hover:text-blue-900 font-bold font-prompt inline-flex items-center gap-1.5 px-3 py-1 rounded-full hover:bg-blue-50 transition-colors whitespace-nowrap">
                    <PhoneCall className="w-3 h-3 text-amber-600 shrink-0" />
                    <span className="whitespace-nowrap tabular-nums">สอบถาม 061-119-3342</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Notification Box */}
        <div className="mt-8 p-5 rounded-3xl bg-blue-50/70 border border-blue-200 flex items-center gap-4 text-slate-800 shadow-xs">
          <div className="w-10 h-10 rounded-full bg-[#16377e] text-amber-300 border border-amber-400/50 flex items-center justify-center shrink-0 shadow-sm aspect-square">
            <AlertCircle className="w-5 h-5 shrink-0" />
          </div>
          <div className="text-xs sm:text-sm font-sarabun text-slate-700 leading-relaxed">
            <strong className="text-slate-900 font-prompt">ข้อแนะนำกรณีเกิดเหตุฉุกเฉิน:</strong> หากท่านหรือบุคคลใกล้ชิดประสบอุบัติเหตุหรือเจ็บป่วยวิกฤต สามารถโทรแจ้ง <strong className="text-[#16377e] font-bold whitespace-nowrap">1669</strong> หรือสายตรงกู้ภัยประจิม <strong className="text-amber-700 font-bold whitespace-nowrap">061-119-3342</strong> ได้ทันที โดยไม่ต้องกังวลเรื่องค่าใช้จ่าย
          </div>
        </div>
      </div>
    </section>
  );
}
