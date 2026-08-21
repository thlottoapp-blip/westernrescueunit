'use client';

import React from 'react';
import {
  Calendar,
  MapPin,
  Users,
  Tag,
  ShieldCheck,
  PhoneCall,
  ArrowLeft,
  Share2,
  Ambulance,
  Waves,
  ArrowUpRight,
  Clock,
} from 'lucide-react';
import { MissionLog } from '@/types/database';
import { OfficialLogo } from '@/components/shared/OfficialLogo';

interface MissionDetailViewProps {
  mission: MissionLog;
  allMissions: MissionLog[];
  onBack: () => void;
  onSelectMission: (mission: MissionLog) => void;
  onOpenReportPage: () => void;
}

export function MissionDetailView({
  mission,
  allMissions,
  onBack,
  onSelectMission,
  onOpenReportPage,
}: MissionDetailViewProps) {
  const relatedMissions = allMissions
    .filter((m) => m.id !== mission.id)
    .slice(0, 3);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: mission.title,
          text: `${mission.title} - สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share canceled or error:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('คัดลอกลิงก์ภารกิจนี้เรียบร้อยแล้ว');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-prompt pb-20">
      {/* Top Banner Navigation */}
      <div className="bg-[#0b1838] border-b border-amber-400/30 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer border border-white/20 shrink-0 min-h-[38px]"
          >
            <ArrowLeft className="w-4 h-4 text-amber-300 shrink-0" />
            <span>กลับสู่หน้าหลัก / หน้ารวมภารกิจ</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-sarabun transition-colors cursor-pointer shrink-0"
              title="แชร์รายงานนี้"
            >
              <Share2 className="w-3.5 h-3.5 text-blue-200 shrink-0" />
              <span className="hidden sm:inline">แชร์</span>
            </button>

            <a
              href="tel:0929253839"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs font-prompt transition-colors shrink-0"
            >
              <PhoneCall className="w-3.5 h-3.5 shrink-0" />
              <span>092-925-3839</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-sarabun text-slate-500 mb-4 flex-wrap">
          <button onClick={onBack} className="text-[#16377e] hover:underline cursor-pointer">
            หน้าหลัก
          </button>
          <span>/</span>
          <button onClick={onBack} className="text-[#16377e] hover:underline cursor-pointer">
            ผลงานการปฏิบัติการ
          </button>
          <span>/</span>
          <span className="text-slate-700 font-medium truncate max-w-xs">{mission.title}</span>
        </div>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden mb-10">
          {/* Cover Image */}
          <div className="relative h-64 sm:h-96 w-full overflow-hidden bg-slate-900">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${mission.cover_image_url})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 z-10 space-y-2">
              {mission.special_tag && (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#16377e]/95 text-amber-200 border border-amber-400/50 shadow-md font-prompt">
                  <Tag className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>{mission.special_tag}</span>
                </span>
              )}
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white font-prompt leading-snug drop-shadow-md">
                {mission.title}
              </h1>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="p-6 sm:p-8 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100/80 text-[#16377e] flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-sarabun block">วันที่ปฏิบัติการ</span>
                  <strong className="text-sm font-bold text-slate-900">{mission.incident_date}</strong>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs text-slate-500 font-sarabun block">สถานที่เกิดเหตุ</span>
                  <strong className="text-sm font-bold text-slate-900 block truncate">{mission.location}</strong>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-[#16377e] flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-sarabun block">กำลังพล & หัวหน้าชุด</span>
                  <strong className="text-sm font-bold text-slate-900">
                    {mission.officer_count} นาย ({mission.team_lead || 'ชุดปฏิบัติการ'})
                  </strong>
                </div>
              </div>
            </div>

            {/* Narrative Summary */}
            <div className="space-y-4">
              <div className="border-l-4 border-[#16377e] pl-4">
                <h3 className="text-sm font-bold text-[#16377e] font-prompt uppercase tracking-wider">
                  สรุปสาระสำคัญของภารกิจ
                </h3>
              </div>
              <p className="text-slate-800 text-base sm:text-lg font-sarabun leading-relaxed bg-blue-50/40 p-6 rounded-2xl border border-blue-100">
                {mission.summary}
              </p>
            </div>

            {/* Full Report Details */}
            {mission.details && (
              <div className="space-y-4">
                <div className="border-l-4 border-amber-500 pl-4">
                  <h3 className="text-base font-bold text-slate-900 font-prompt">
                    รายงานผลการปฏิบัติงานฉบับละเอียด
                  </h3>
                </div>
                <div className="text-slate-700 text-sm sm:text-base font-sarabun leading-relaxed space-y-4 whitespace-pre-line bg-white p-6 rounded-2xl border border-slate-200">
                  {mission.details}
                </div>
              </div>
            )}

            {/* Organization Tag & Contact Hotline CTA */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0b1838] via-[#122759] to-[#0a1530] text-white border-2 border-amber-400/60 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <OfficialLogo size={56} withGlow={true} />
                <div>
                  <h4 className="text-base font-bold text-white font-prompt">
                    สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์
                  </h4>
                  <p className="text-xs text-blue-200 font-sarabun mt-0.5">
                    หน่วยกู้ภัยประจิม อำเภอบรบือ จังหวัดมหาสารคาม • บริการ 24 ชั่วโมง
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="tel:0929253839"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm font-prompt transition-colors shadow-md shrink-0"
                >
                  <PhoneCall className="w-4 h-4 text-slate-950 shrink-0" />
                  <span>โทร 092-925-3839</span>
                </a>

                <button
                  onClick={onOpenReportPage}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm font-prompt transition-colors border border-amber-400/40 shrink-0 cursor-pointer"
                >
                  <span>แจ้งเหตุออนไลน์</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED MISSIONS SECTION */}
        {relatedMissions.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900 font-prompt">
                ผลงานและภารกิจอื่นๆ ที่เกี่ยวข้อง
              </h3>
              <button
                onClick={onBack}
                className="text-xs sm:text-sm font-semibold text-[#16377e] hover:underline cursor-pointer"
              >
                ดูทั้งหมด →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedMissions.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    onSelectMission(rel);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group rounded-3xl bg-white border border-slate-200 hover:border-[#16377e] overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${rel.cover_image_url})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-2.5 right-3 text-[11px] text-white font-mono bg-black/60 px-2.5 py-0.5 rounded-full border border-white/20">
                      {rel.incident_date}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <div className="flex items-center gap-1 text-[11px] text-[#16377e] font-sarabun font-bold truncate">
                        <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
                        <span className="truncate">{rel.location}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 font-prompt group-hover:text-[#16377e] transition-colors line-clamp-2 mt-1">
                        {rel.title}
                      </h4>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-sarabun">
                      <span>{rel.officer_count} นาย</span>
                      <span className="text-[#16377e] font-bold font-prompt inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>อ่านต่อ</span>
                        <ArrowUpRight className="w-3 h-3 text-amber-600" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
