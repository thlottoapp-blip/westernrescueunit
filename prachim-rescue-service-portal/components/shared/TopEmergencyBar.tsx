'use client';

import React from 'react';
import { PhoneCall, MapPin, Clock, AlertTriangle } from 'lucide-react';

interface TopEmergencyBarProps {
  onOpenReportModal?: () => void;
  onOpenAdminModal?: () => void;
}

export function TopEmergencyBar({
  onOpenReportModal,
  onOpenAdminModal,
}: TopEmergencyBarProps) {
  return (
    <div className="bg-gradient-to-r from-[#0f2452] via-[#16377e] to-[#0f2452] text-white text-xs sm:text-sm font-medium border-b border-amber-500/40 shadow-md select-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row items-center justify-between gap-2.5">
        {/* Left: Emergency Status & 24/7 Notice */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-nowrap overflow-x-auto w-full md:w-auto justify-center md:justify-start scrollbar-none">
          <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-full border border-amber-400/50 shrink-0 whitespace-nowrap">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
            </span>
            <span className="font-bold tracking-wider text-amber-300 font-prompt text-[11px] sm:text-xs uppercase">
              EMERGENCY 24/7
            </span>
            <span className="text-blue-300/60 font-light">|</span>
            <span className="text-blue-100 font-sarabun text-xs whitespace-nowrap">
              ศูนย์กู้ชีพกู้ภัย 24 ชม. อ.บรบือ
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-blue-100 font-sarabun text-xs whitespace-nowrap shrink-0">
            <Clock className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>ศูนย์สั่งการ อ.บรบือ จ.มหาสารคาม</span>
          </div>
        </div>

        {/* Right: Phone Hotlines & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 flex-nowrap shrink-0 justify-center">
          <div className="hidden sm:flex items-center gap-1.5 text-blue-100 font-sarabun text-xs whitespace-nowrap shrink-0">
            <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>ต.บรบือ อ.บรบือ จ.มหาสารคาม</span>
          </div>

          {/* Hotline Button */}
          <a
            id="emergency-top-hotline"
            href="tel:0611193342"
            className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold px-3 py-1.5 rounded-full shadow-sm hover:shadow-md hover:brightness-105 transition-all font-prompt text-xs sm:text-sm border border-amber-300 whitespace-nowrap shrink-0 min-h-[32px]"
          >
            <div className="w-4 h-4 rounded-full bg-slate-950/15 flex items-center justify-center shrink-0">
              <PhoneCall className="w-2.5 h-2.5 text-slate-950 animate-pulse" />
            </div>
            <span className="tabular-nums font-bold tracking-tight">061-119-3342</span>
          </a>

          {/* Online Report Button */}
          {onOpenReportModal && (
            <button
              id="emergency-top-report-btn"
              onClick={onOpenReportModal}
              className="inline-flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-semibold px-3 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer font-prompt text-xs border border-red-400 whitespace-nowrap shrink-0 min-h-[32px]"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-white shrink-0 animate-pulse" />
              <span className="whitespace-nowrap">แจ้งเหตุด่วน</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
