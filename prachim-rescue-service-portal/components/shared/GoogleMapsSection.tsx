'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  PhoneCall,
  Radio,
  Clock,
  ShieldCheck,
  ExternalLink,
  Copy,
  Check,
  Building2,
  Compass,
} from 'lucide-react';

interface GoogleMapsFooterProps {
  onOpenReportModal?: () => void;
}

// Keyless Google Maps embed (Google Maps Embed API — free, no API key required)
export function GoogleMapsFooter({ onOpenReportModal }: GoogleMapsFooterProps) {
  const [copied, setCopied] = useState(false);

  const officeLocation = {
    name: 'ศูนย์ปฏิบัติการหน่วยกู้ภัยประจิม (สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์)',
    shortName: 'หน่วยกู้ภัยประจิม อ.บรบือ',
    address: 'ถนนแจ้งสนิท ตำบลบรบือ อำเภอบรบือ จังหวัดมหาสารคาม 44130',
    landmarks: 'ติดทางหลวงแผ่นดินหมายเลข 23 (ถนนแจ้งสนิท) หน้าโรงเรียน/ย่านการค้าบรบือ',
    lat: 16.0375,
    lng: 103.1186,
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=16.0375,103.1186+(หน่วยกู้ภัยประจิม+สมาคมประจิมสารคาม+พุทธศาสตร์สงเคราะห์+ถนนแจ้งสนิท+บรบือ)',
    googleMapsEmbedUrl:
      'https://maps.google.com/maps?q=16.0375,103.1186+(%E0%B8%AB%E0%B8%99%E0%B9%88%E0%B8%A7%E0%B8%A2%E0%B8%81%E0%B8%B9%E0%B9%89%E0%B8%A0%E0%B8%B1%E0%B8%A2%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%88%E0%B8%B4%E0%B8%A1+%E0%B8%96%E0%B8%99%E0%B8%99%E0%B9%81%E0%B8%88%E0%B9%89%E0%B8%87%E0%B8%AA%E0%B8%99%E0%B8%B4%E0%B8%97+%E0%B8%9A%E0%B8%A3%E0%B8%9A%E0%B8%B7%E0%B8%AD)&t=&z=16&ie=UTF8&iwloc=&output=embed',
  };

  const handleCopyAddress = () => {
    const fullText = `${officeLocation.name} ${officeLocation.address} พิกัด GPS: ${officeLocation.lat}, ${officeLocation.lng}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full bg-[#060e22] text-white border-b border-blue-900/60 font-sarabun" id="section-contact">
      {/* Top Banner: HQ Identity */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-blue-900/50">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#16377e]/80 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider mb-3 shadow-xs whitespace-nowrap">
              <Compass className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="whitespace-nowrap">RESCUE HQ LOCATION • 24/7</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-prompt tracking-tight flex items-center gap-3">
              <Building2 className="w-7 h-7 text-amber-400 shrink-0" />
              <span className="whitespace-nowrap">ศูนย์บัญชาการและพิกัดสำนักงานใหญ่</span>
            </h3>
            <p className="text-blue-200/80 text-sm sm:text-base mt-1.5 max-w-2xl">
              ศูนย์ปฏิบัติการรับแจ้งเหตุฉุกเฉิน 24 ชั่วโมง และจุดจอดรถพยาบาล-รถกู้ชีพสแตนด์บาย ถนนแจ้งสนิท ตำบลบรบือ อำเภอบรบือ จังหวัดมหาสารคาม
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopyAddress}
              className="inline-flex items-center justify-center gap-2 bg-[#0f2452] hover:bg-[#16377e] text-blue-100 px-5 py-2.5 rounded-full border border-blue-700/60 text-xs font-prompt font-semibold transition-all cursor-pointer shadow-xs whitespace-nowrap shrink-0 min-h-[42px]"
              title="คัดลอกที่อยู่และพิกัด GPS"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-emerald-300 whitespace-nowrap">คัดลอกที่อยู่แล้ว</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-amber-300 shrink-0" />
                  <span className="whitespace-nowrap">คัดลอกที่อยู่และพิกัด GPS</span>
                </>
              )}
            </button>

            <a
              href={officeLocation.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 px-6 py-2.5 rounded-full font-prompt font-bold text-xs sm:text-sm transition-all shadow-md hover:scale-105 whitespace-nowrap shrink-0 min-h-[42px]"
            >
              <Navigation className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">เปิดนำทางใน Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-75 shrink-0" />
            </a>
          </div>
        </div>

        {/* 2-Column Grid: Left Map, Right Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* Left Column: Free Google Maps Embed (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full h-[380px] sm:h-[440px] rounded-3xl overflow-hidden border-2 border-blue-800/80 shadow-2xl bg-[#08132b] group">
              <iframe
                title="Google Maps Location - หน่วยกู้ภัยประจิม ถนนแจ้งสนิท ตำบลบรบือ"
                src={officeLocation.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[20%] contrast-[110%] group-hover:grayscale-0 transition-all duration-500"
              />

              {/* Map Floating Badge */}
              <div className="absolute top-3 left-3 z-10 bg-[#08132b]/95 backdrop-blur-md px-4 py-2 rounded-full border border-amber-400/50 shadow-xl flex items-center gap-2.5 whitespace-nowrap pointer-events-none">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0 aspect-square" />
                <div>
                  <span className="text-[10px] font-mono font-bold text-amber-300 uppercase block leading-tight whitespace-nowrap">
                    HQ GPS COORDINATES
                  </span>
                  <span className="text-xs font-mono font-bold text-white whitespace-nowrap tabular-nums">
                    16.0375° N, 103.1186° E
                  </span>
                </div>
              </div>

              {/* Map Floating Actions Overlay at Bottom */}
              <div className="absolute bottom-3 inset-x-3 z-10 flex flex-wrap items-center justify-between gap-2 bg-[#08132b]/95 backdrop-blur-md px-4 py-2.5 rounded-full border border-blue-700/60 shadow-lg">
                <div className="flex items-center gap-2 text-xs text-blue-200">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate max-w-[200px] sm:max-w-xs font-medium whitespace-nowrap">
                    ถนนแจ้งสนิท ต.บรบือ อ.บรบือ มหาสารคาม
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {onOpenReportModal && (
                    <button
                      onClick={onOpenReportModal}
                      className="inline-flex items-center justify-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold font-prompt px-3.5 py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <PhoneCall className="w-3 h-3 shrink-0" />
                      <span className="whitespace-nowrap">แจ้งเหตุในพื้นที่</span>
                    </button>
                  )}

                  <a
                    href={officeLocation.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 bg-[#16377e] hover:bg-blue-700 text-amber-300 text-xs font-prompt font-semibold px-3.5 py-1.5 rounded-full border border-amber-400/40 transition-colors whitespace-nowrap"
                  >
                    <span className="whitespace-nowrap">ดูแผนที่</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>
              </div>
            </div>

            {/* Mandatory Attribution and Landmark Notice */}
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-blue-300/70 px-1 font-sarabun">
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="whitespace-nowrap">ทำเลใจกลางคมนาคมหลัก ออกปฏิบัติการได้รวดเร็วทุกทิศทางใน อ.บรบือ</span>
              </span>
              <span className="font-mono text-[11px] text-amber-300/90 font-medium whitespace-nowrap">
                Google Maps
              </span>
            </div>
          </div>

          {/* Right Column: Detailed Contact & Operational Directory (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {/* Box 1: Address Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#0c1c42] to-[#08132b] border border-blue-800/80 shadow-md">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-full bg-amber-400/15 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0 mt-0.5 aspect-square">
                  <MapPin className="w-5 h-5 shrink-0" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white font-prompt leading-tight whitespace-nowrap">
                    ที่ตั้งสำนักงานใหญ่ศูนย์สั่งการ
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-100 mt-1 leading-relaxed">
                    <strong className="whitespace-nowrap">สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์</strong>
                    <br />
                    ถนนแจ้งสนิท ตำบลบรบือ อำเภอบรบือ จังหวัดมหาสารคาม 44130
                  </p>
                  <p className="text-xs text-amber-300/90 mt-2 flex items-center gap-1.5 font-medium whitespace-nowrap">
                    <span>📌 จุดสังเกต:</span>
                    <span className="whitespace-nowrap">ติดทางหลวงหมายเลข 23 (ถนนแจ้งสนิท)</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Box 2: 24/7 Hotlines & Channels */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#0c1c42] to-[#08132b] border border-blue-800/80 shadow-md space-y-3.5">
              <div className="flex items-center justify-between border-b border-blue-900/60 pb-2.5">
                <span className="text-xs font-mono uppercase font-bold text-amber-400 whitespace-nowrap">
                  DIRECT CONTACT CHANNELS
                </span>
                <span className="text-[11px] bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 px-3 py-0.5 rounded-full font-mono flex items-center gap-1 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0 aspect-square" />
                  <span className="whitespace-nowrap">ACTIVE 24/7</span>
                </span>
              </div>

              {/* Hotline 1 */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#08132b]/80 border border-blue-900/50 hover:border-amber-400/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 aspect-square">
                    <PhoneCall className="w-4 h-4 shrink-0" />
                  </div>
                  <div>
                    <span className="text-[11px] text-blue-300/80 block font-prompt whitespace-nowrap">
                      สายตรงกู้ภัยประจิม (บรบือ 24 ชม.)
                    </span>
                    <a
                      href="tel:0929253839"
                      className="text-base font-black font-prompt text-amber-300 hover:text-amber-200 whitespace-nowrap tabular-nums"
                    >
                      092-925-3839
                    </a>
                  </div>
                </div>
                <a
                  href="tel:0929253839"
                  className="px-4 py-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold font-prompt transition-colors whitespace-nowrap shrink-0"
                >
                  โทรด่วน
                </a>
              </div>

              {/* Hotline 2 */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#08132b]/80 border border-blue-900/50 hover:border-blue-600 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0 aspect-square">
                    <Radio className="w-4 h-4 shrink-0" />
                  </div>
                  <div>
                    <span className="text-[11px] text-blue-300/80 block font-prompt whitespace-nowrap">
                      สายด่วนการแพทย์ฉุกเฉิน (สพฉ.)
                    </span>
                    <a
                      href="tel:1669"
                      className="text-base font-black font-prompt text-white hover:text-amber-300 whitespace-nowrap tabular-nums"
                    >
                      1669 (โทรฟรี)
                    </a>
                  </div>
                </div>
                <a
                  href="tel:1669"
                  className="px-4 py-1.5 rounded-full bg-[#16377e] hover:bg-blue-700 text-white text-xs font-bold font-prompt transition-colors whitespace-nowrap shrink-0"
                >
                  โทร 1669
                </a>
              </div>
            </div>

            {/* Box 3: Radio Dispatch & Operational Radius */}
            <div className="p-5 rounded-3xl bg-[#08132b]/90 border border-blue-900/70 text-xs text-blue-200/90 font-sarabun space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-bold font-prompt whitespace-nowrap">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="whitespace-nowrap">เวลาทำการ: เปิดตลอด 24 ชั่วโมง ทุกวัน</span>
              </div>
              <p className="text-blue-300/75 leading-relaxed text-[12px]">
                <strong>พื้นที่รับผิดชอบ:</strong> อำเภอบรบือ, จุดบริการเครือข่าย อ.วาปีปทุม, อ.นาดูน และพร้อมสนับสนุนชุดประดาน้ำ-ค้นหาใต้น้ำทั่วทั้ง 13 อำเภอในจังหวัดมหาสารคามและจังหวัดใกล้เคียง
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
