'use client';

import React from 'react';
import {
  X,
  Calendar,
  MapPin,
  Users,
  Tag,
  ShieldCheck,
  Share2,
  PhoneCall,
  CheckCircle,
} from 'lucide-react';
import { MissionLog } from '@/types/database';

interface MissionDetailModalProps {
  mission: MissionLog | null;
  onClose: () => void;
}

export function MissionDetailModal({ mission, onClose }: MissionDetailModalProps) {
  if (!mission) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8 animate-fade-in">
        {/* Cover Image & Header */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${mission.cover_image_url})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-colors cursor-pointer shrink-0 aspect-square"
          >
            <X className="w-5 h-5 shrink-0" />
          </button>

          {/* Tag and Date */}
          <div className="absolute bottom-4 left-6 right-6 z-10">
            {mission.special_tag && (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#16377e]/95 text-amber-200 border border-amber-400/40 shadow-md font-prompt mb-2 whitespace-nowrap">
                <Tag className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span className="whitespace-nowrap">{mission.special_tag}</span>
              </span>
            )}
            <h2 className="text-xl sm:text-3xl font-extrabold text-white font-prompt leading-snug drop-shadow-md">
              {mission.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Key Facts Meta Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-sarabun">
            <div className="flex items-center gap-2 text-slate-700">
              <Calendar className="w-4 h-4 text-[#16377e] shrink-0" />
              <div>
                <span className="text-[11px] text-slate-500 block whitespace-nowrap">วันที่ปฏิบัติการ</span>
                <span className="font-semibold text-slate-900 whitespace-nowrap">{mission.incident_date}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-700">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-500 block whitespace-nowrap">สถานที่</span>
                <span className="font-semibold text-slate-900 truncate max-w-[150px] block whitespace-nowrap">
                  {mission.location}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-700 col-span-2 sm:col-span-1">
              <Users className="w-4 h-4 text-[#16377e] shrink-0" />
              <div>
                <span className="text-[11px] text-slate-500 block whitespace-nowrap">กำลังพล</span>
                <span className="font-semibold text-slate-900 whitespace-nowrap">{mission.officer_count} นาย ({mission.team_lead || 'ชุดปฏิบัติการ'})</span>
              </div>
            </div>
          </div>

          {/* Detailed Narrative */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-[#16377e] font-prompt uppercase tracking-wider mb-1 whitespace-nowrap">
                สรุปสาระสำคัญของภารกิจ
              </h4>
              <p className="text-slate-800 text-sm sm:text-base font-sarabun leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                {mission.summary}
              </p>
            </div>

            {mission.details && (
              <div>
                <h4 className="text-sm font-bold text-slate-900 font-prompt mb-2 whitespace-nowrap">
                  รายงานผลการปฏิบัติงานฉบับละเอียด
                </h4>
                <div className="text-slate-600 text-sm font-sarabun leading-relaxed space-y-3 whitespace-pre-line bg-white p-4 rounded-2xl border border-slate-100">
                  {mission.details}
                </div>
              </div>
            )}
          </div>

          {/* Action Callout */}
          <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#16377e] shrink-0" />
              <span className="text-xs sm:text-sm text-slate-700 font-sarabun font-medium whitespace-nowrap">
                ปฏิบัติการภายใต้ สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์ อ.บรบือ
              </span>
            </div>

            <a
              href="tel:0611193342"
              className="inline-flex items-center justify-center gap-2 bg-[#16377e] hover:bg-[#0f2452] text-white font-bold text-xs px-5 py-2.5 rounded-full font-prompt transition-all whitespace-nowrap shadow-xs border border-amber-400/40 shrink-0 min-h-[40px]"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="whitespace-nowrap">ติดต่อสอบถาม 061-119-3342</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center px-7 py-2.5 rounded-full bg-slate-800 hover:bg-slate-900 text-white text-sm font-prompt transition-colors cursor-pointer whitespace-nowrap min-h-[42px]"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
}
