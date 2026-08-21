'use client';

import React from 'react';
import {
  Ambulance,
  Clock,
  HeartPulse,
  Waves,
  ShieldAlert,
  Truck,
  Flame,
} from 'lucide-react';

interface QuickServicesStripProps {
  onSelectService?: (serviceName: string) => void;
}

export function QuickServicesStrip({ onSelectService }: QuickServicesStripProps) {
  const quickItems = [
    {
      id: 'ems',
      icon: Ambulance,
      title: 'บริการการแพทย์ฉุกเฉิน',
      subtitle: 'EMS SERVICES (FREE)',
      isHighlight: true,
    },
    {
      id: '247',
      icon: Clock,
      title: 'ปฏิบัติการกู้ชีพ 24 ชม.',
      subtitle: '24/7 EMERGENCY CARE',
    },
    {
      id: 'trauma',
      icon: HeartPulse,
      title: 'ตัด-ถ่าง & อุบัติเหตุวิกฤต',
      subtitle: 'TRAUMA & RESCUE',
    },
    {
      id: 'water',
      icon: Waves,
      title: 'ชุดประดาน้ำค้นหาใต้น้ำ',
      subtitle: 'WATER & SCUBA TEAM',
    },
    {
      id: 'wildlife',
      icon: ShieldAlert,
      title: 'จับสัตว์มีพิษ & ช่วยชุมชน',
      subtitle: 'DISASTER & WILDLIFE',
    },
    {
      id: 'fleet',
      icon: Truck,
      title: 'รถพยาบาล & ส่งต่อ รพ.',
      subtitle: 'AMBULANCE FLEET',
    },
  ];

  return (
    <div className="w-full bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
          {quickItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onSelectService && onSelectService(item.title)}
                className={`flex items-center gap-3 p-3 rounded-2xl border transition-all cursor-pointer select-none ${
                  item.isHighlight
                    ? 'bg-gradient-to-r from-[#16377e] to-[#0f2452] border-amber-400 text-white shadow-md shadow-blue-950/20 hover:brightness-105'
                    : 'bg-white hover:bg-blue-50/50 border-slate-200 hover:border-blue-300 text-slate-800 hover:text-[#16377e] shadow-xs'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 aspect-square ${
                    item.isHighlight
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/60'
                      : 'bg-blue-50 text-[#16377e] border border-blue-200'
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs sm:text-sm font-bold truncate font-prompt leading-tight whitespace-nowrap">
                    {item.title}
                  </span>
                  <span
                    className={`text-[10px] tracking-wider font-mono uppercase truncate whitespace-nowrap mt-0.5 ${
                      item.isHighlight ? 'text-amber-200' : 'text-slate-500'
                    }`}
                  >
                    {item.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
