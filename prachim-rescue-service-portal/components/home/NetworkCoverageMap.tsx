'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Clock,
  Radio,
  PhoneCall,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { SiteConfig } from '@/types/database';

interface NetworkCoverageMapProps {
  siteConfig: SiteConfig;
  onOpenReportModal: () => void;
}

export function NetworkCoverageMap({ siteConfig, onOpenReportModal }: NetworkCoverageMapProps) {
  const [selectedStation, setSelectedStation] = useState<string>('borabue_main');

  const stations = [
    {
      id: 'borabue_main',
      name: 'ศูนย์ปฏิบัติการใหญ่ อ.บรบือ (HQ)',
      address: 'ถนนแจ้งสนิท ต.บรบือ อ.บรบือ จ.มหาสารคาม 44130',
      type: 'ศูนย์สั่งการหลัก 24 ชม.',
      responseRadius: '0 - 5 นาที',
      coverage: 'ครอบคลุมเขตเทศบาลบรบือ, ถนนแจ้งสนิท, ต.บรบือ, ต.หนองสิม, ต.ยาง, ต.บัวมาศ',
      capabilities: ['รถพยาบาล EMS ขั้นสูง (ALS)', 'ชุดตัด-ถ่างไฮดรอลิก', 'ชุดประดาน้ำค้นหาทางน้ำ', 'ศูนย์วิทยุแม่ข่าย 168.275 MHz'],
      isHQ: true,
      phone: siteConfig.hotline_primary || '061-119-3342',
    },
    {
      id: 'wapi_sub',
      name: 'จุดบริการเครือข่าย วาปีปทุม',
      address: 'ถนนสายบรบือ-วาปีปทุม อ.วาปีปทุม จ.มหาสารคาม',
      type: 'จุดบริการตอบโต้ฉุกเฉิน',
      responseRadius: '5 - 10 นาที',
      coverage: 'ครอบคลุมพื้นที่เชื่อมต่อ อ.วาปีปทุม และเส้นทางหลวงชนบท',
      capabilities: ['รถพยาบาลปฐมพยาบาลเบื้องต้น (BLS)', 'ชุดจับสัตว์เลื้อยคลานและอสรพิษ', 'ไฟส่องสว่างฉุกเฉิน'],
      isHQ: false,
      phone: siteConfig.hotline_primary || '061-119-3342',
    },
    {
      id: 'nadun_sub',
      name: 'จุดบริการเครือข่าย นาดูน - พระธาตุนาดูน',
      address: 'เส้นทางสู่อำเภอนาดูน จ.มหาสารคาม',
      type: 'จุดบริการระวังภัยเทศกาล & ฉุกเฉิน',
      responseRadius: '10 - 15 นาที',
      coverage: 'ครอบคลุมเขตรอยต่อ อ.นาดูน และจุดท่องเที่ยวเชิงวัฒนธรรม',
      capabilities: ['หน่วยกู้ภัยเคลื่อนที่เร็ว', 'อุปกรณ์ปฐมพยาบาลสนาม', 'ชุดกู้ภัยทางน้ำหนองบัว'],
      isHQ: false,
      phone: siteConfig.hotline_primary || '061-119-3342',
    },
  ];

  const currentStation = stations.find((s) => s.id === selectedStation) || stations[0];

  return (
    <section className="py-12 sm:py-16 bg-[#08122c] border-b border-blue-950 text-white relative overflow-hidden font-prompt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-900/60 border border-blue-700/60 text-blue-300 text-xs font-bold mb-2">
            <Navigation className="w-3.5 h-3.5 text-amber-400" />
            <span>GEO-LOCATION & RESPONSE NETWORK</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            เครือข่ายจุดบริการและรัศมีการเข้าถึงที่เกิดเหตุ
          </h2>
          <p className="text-blue-200/80 text-xs sm:text-sm font-sarabun mt-1.5">
            ศูนย์กลางสั่งการตั้งอยู่ ณ ถนนแจ้งสนิท อำเภอบรบือ พร้อมจุดบริการเครือข่ายครอบคลุมพื้นที่ใกล้เคียงในจังหวัดมหาสารคาม
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Station Selector & Radius Details (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider font-mono mb-2">
              เลือกจุดประจำการ / จุดบริการเครือข่าย
            </h3>
            {stations.map((st) => {
              const isSelected = selectedStation === st.id;
              return (
                <div
                  key={st.id}
                  onClick={() => setSelectedStation(st.id)}
                  className={`
                    p-4 rounded-2xl border transition-all cursor-pointer relative
                    ${
                      isSelected
                        ? 'bg-gradient-to-r from-blue-900/90 to-[#16377e] border-amber-400 shadow-xl shadow-amber-500/10'
                        : 'bg-[#060e22]/80 hover:bg-blue-950/60 border-blue-900/40 text-blue-100'
                    }
                  `}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                          st.isHQ ? 'bg-amber-400 text-slate-950' : 'bg-blue-800 text-white'
                        }`}
                      >
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white font-prompt">{st.name}</h4>
                        <span className="text-[10px] text-blue-300 font-sarabun">{st.type}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                      {st.responseRadius}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Quick Action Box */}
            <div className="p-4 rounded-2xl bg-[#060e22] border border-blue-900/60 flex items-center justify-between gap-3 mt-4">
              <div className="text-xs text-slate-300 font-sarabun">
                <span className="font-bold text-white block font-prompt">ต้องการความช่วยเหลือด่วนในพื้นที่?</span>
                โทรสายตรงหรือส่งพิกัด GPS ทันที
              </div>
              <a
                href={`tel:${siteConfig.hotline_primary || '0611193342'}`}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 text-xs font-bold font-prompt shadow-md whitespace-nowrap flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>โทร 061-119-3342</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Details Panel & Coverage Radii (7 Cols) */}
          <div className="lg:col-span-7 bg-[#060e22] border border-blue-900/60 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-blue-900/60">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-amber-300">STATION DETAILS</span>
                  {currentStation.isHQ && (
                    <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full font-bold">
                      HEADQUARTERS
                    </span>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white font-prompt mt-1">
                  {currentStation.name}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono text-emerald-300 font-bold">
                  เวลาตอบสนอง: {currentStation.responseRadius}
                </span>
              </div>
            </div>

            {/* Address */}
            <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-900/40 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-slate-200 font-sarabun">
                <span className="font-bold text-white font-prompt block">ที่อยู่และที่ตั้ง:</span>
                {currentStation.address}
              </div>
            </div>

            {/* Coverage Area */}
            <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-900/40">
              <span className="text-xs font-bold text-amber-300 font-prompt block mb-1">
                พื้นที่รับผิดชอบหลัก (Primary Service Area):
              </span>
              <p className="text-xs sm:text-sm text-slate-200 font-sarabun leading-relaxed">
                {currentStation.coverage}
              </p>
            </div>

            {/* Capabilities */}
            <div>
              <span className="text-xs font-bold text-blue-200 font-prompt block mb-2">
                ศักยภาพและอุปกรณ์ประจำจุดบริการ:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentStation.capabilities.map((cap, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-blue-950/60 border border-blue-900/50 flex items-center gap-2 text-xs text-slate-200 font-sarabun"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Time Indicator Grid */}
            <div className="pt-3 border-t border-blue-900/60">
              <span className="text-xs font-bold text-slate-300 font-prompt block mb-2">
                เกณฑ์มาตรฐานเวลาเดินทางฉุกเฉิน (Emergency Response Isochrones):
              </span>
              <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-prompt">
                <div className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300">
                  <span className="font-bold block">0 - 5 นาที</span>
                  <span className="text-[10px] text-slate-400 font-sarabun">เขตเทศบาล/ใจกลางเมือง</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-950/50 border border-amber-500/40 text-amber-300">
                  <span className="font-bold block">5 - 10 นาที</span>
                  <span className="text-[10px] text-slate-400 font-sarabun">ตำบลรอบนอก อ.บรบือ</span>
                </div>
                <div className="p-2.5 rounded-xl bg-blue-950/50 border border-blue-500/40 text-blue-300">
                  <span className="font-bold block">10 - 15 นาที</span>
                  <span className="text-[10px] text-slate-400 font-sarabun">เขตรอยต่ออำเภอใกล้เคียง</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
