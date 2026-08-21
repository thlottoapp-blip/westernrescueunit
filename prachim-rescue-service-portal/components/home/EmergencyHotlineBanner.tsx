'use client';

import React from 'react';
import { PhoneCall, MapPin, Navigation, Radio, Clock, ShieldAlert } from 'lucide-react';

interface EmergencyHotlineBannerProps {
  onOpenReportModal: () => void;
}

export function EmergencyHotlineBanner({ onOpenReportModal }: EmergencyHotlineBannerProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#08132b] via-[#16377e] to-[#08132b] text-white py-12 sm:py-16 shadow-2xl border-y-2 border-amber-400/50">
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-400/10 via-transparent to-black/40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          {/* Left: Bold Statement */}
          <div className="flex items-center gap-5 flex-col sm:flex-row">
            <div className="w-16 h-16 rounded-full bg-amber-400/20 border border-amber-400/50 backdrop-blur-md flex items-center justify-center shrink-0 shadow-xl aspect-square">
              <PhoneCall className="w-8 h-8 text-amber-300 animate-pulse shrink-0" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold mb-1 whitespace-nowrap">
                EMERGENCIES DON&apos;T WAIT • 24/7 DISPATCH
              </div>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-prompt leading-tight text-white">
                อุบัติเหตุและเหตุฉุกเฉิน ไม่เคยรอเวลา
              </h2>
              <p className="text-blue-100 text-sm sm:text-base font-sarabun mt-1">
                หน่วยกู้ภัยประจิม พร้อมออกปฏิบัติการช่วยชีวิตตลอด 24 ชั่วโมง
              </p>
            </div>
          </div>

          {/* Right: Phone Numbers & Directions Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full lg:w-auto justify-center">
            {/* Direct Dial Callout */}
            <a
              id="banner-hotline-dial-btn"
              href="tel:0929253839"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 px-7 py-3.5 rounded-full shadow-xl shadow-blue-950/50 transition-all transform hover:scale-105 group w-full sm:w-auto min-h-[52px] shrink-0 whitespace-nowrap"
            >
              <div className="w-10 h-10 rounded-full bg-slate-950/10 flex items-center justify-center text-slate-950 group-hover:scale-110 transition-transform shrink-0 aspect-square">
                <PhoneCall className="w-5 h-5 shrink-0" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider font-mono whitespace-nowrap">
                  สายด่วนฉุกเฉิน 24 ชม.
                </span>
                <span className="text-xl sm:text-2xl font-black font-prompt text-slate-950 whitespace-nowrap tabular-nums">
                  092-925-3839
                </span>
              </div>
            </a>

            {/* Directions to Station */}
            <a
              id="banner-directions-btn"
              href="https://maps.google.com/?q=บรบือ+มหาสารคาม+ถนนแจ้งสนิท"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#0a193b]/80 hover:bg-[#16377e] text-white px-6 py-3.5 rounded-full border border-amber-400/50 shadow-lg text-xs sm:text-sm font-bold font-prompt transition-all w-full sm:w-auto min-h-[52px] shrink-0 whitespace-nowrap"
            >
              <Navigation className="w-4 h-4 text-amber-300 shrink-0" />
              <span className="whitespace-nowrap">พิกัดสำนักงาน (บรบือ)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
