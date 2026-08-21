'use client';

import React from 'react';
import {
  Activity,
  Ambulance,
  AlertTriangle,
  UserCheck,
  Clock,
  Radio,
  MapPin,
  CheckCircle2,
  PhoneCall,
  ChevronRight,
  TrendingUp,
  Waves,
  Flame,
  Shield,
} from 'lucide-react';
import { EmergencyIncident, EquipmentFleet, MissionLog, OfficerRoster } from '@/types/database';

interface LiveOperationsDashboardProps {
  incidents: EmergencyIncident[];
  fleet: EquipmentFleet[];
  officers: OfficerRoster[];
  missions: MissionLog[];
  onOpenReportModal: () => void;
  onSelectMission?: (mission: MissionLog) => void;
}

export function LiveOperationsDashboard({
  incidents,
  fleet,
  officers,
  missions,
  onOpenReportModal,
  onSelectMission,
}: LiveOperationsDashboardProps) {
  // Compute Real-time Metrics
  const availableFleetCount = fleet.filter((f) => f.status === 'available').length;
  const onDutyOfficersCount = officers.filter((o) => o.is_on_duty).length;
  const pendingIncidentsCount = incidents.filter((i) => i.status === 'pending').length;
  const activeIncidents = incidents.filter((i) => i.status !== 'resolved');
  const recentMissions = missions.slice(0, 3);

  return (
    <section className="py-12 sm:py-16 bg-[#060e22] border-b border-blue-950 text-white relative overflow-hidden font-prompt">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Live Dispatch Pulse */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-900/60 border border-amber-400/50 text-amber-300 text-xs font-bold font-mono tracking-wider mb-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE OPERATIONS DASHBOARD • REAL-TIME DISPATCH</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              ศูนย์สั่งการและความพร้อมปฏิบัติการ 24 ชั่วโมง
            </h2>
            <p className="text-blue-200/80 text-xs sm:text-sm font-sarabun mt-1">
              สถิติภาพรวมความพร้อมของยานพาหนะ กำลังพล และสถานะรับแจ้งเหตุสด อำเภอบรบือ จ.มหาสารคาม
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="tel:0611193342"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-bold shadow-md transition-all whitespace-nowrap min-h-[40px]"
            >
              <PhoneCall className="w-3.5 h-3.5 text-slate-950" />
              <span className="tabular-nums">โทรด่วน 061-119-3342</span>
            </a>
            <button
              onClick={onOpenReportModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#16377e] hover:bg-[#1f489e] text-white text-xs font-bold border border-blue-600/50 transition-all cursor-pointer whitespace-nowrap min-h-[40px]"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
              <span>แจ้งเหตุออนไลน์</span>
            </button>
          </div>
        </div>

        {/* 4 Main KPI Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 mb-8">
          {/* KPI 1: Average Response Time */}
          <div className="p-4 sm:p-5 rounded-3xl bg-[#09183d]/90 border border-blue-900/60 shadow-lg relative overflow-hidden group hover:border-amber-400/60 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                STANDARD
              </span>
            </div>
            <span className="text-2xl sm:text-3xl font-black text-white font-prompt tabular-nums">
              &lt; 8 นาที
            </span>
            <h4 className="text-xs font-bold text-amber-300 font-prompt mt-1">เวลาตอบสนองเฉลี่ย</h4>
            <p className="text-[11px] text-blue-200/70 font-sarabun mt-0.5">
              เข้าถึงที่เกิดเหตุในเขตอำเภอบรบือ
            </p>
          </div>

          {/* KPI 2: Fleet Readiness */}
          <div className="p-4 sm:p-5 rounded-3xl bg-[#09183d]/90 border border-blue-900/60 shadow-lg relative overflow-hidden group hover:border-amber-400/60 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/15 border border-blue-400/30 flex items-center justify-center text-blue-300">
                <Ambulance className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                {fleet.length} คันในระบบ
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-prompt tabular-nums">
                {availableFleetCount}
              </span>
              <span className="text-xs text-slate-400 font-sarabun">/ {fleet.length} คัน</span>
            </div>
            <h4 className="text-xs font-bold text-amber-300 font-prompt mt-1">ยานพาหนะพร้อมออกเหตุ</h4>
            <p className="text-[11px] text-blue-200/70 font-sarabun mt-0.5">
              รถพยาบาล EMS, เรือกู้ภัย, ชุดตัด-ถ่าง
            </p>
          </div>

          {/* KPI 3: On-Duty Personnel */}
          <div className="p-4 sm:p-5 rounded-3xl bg-[#09183d]/90 border border-blue-900/60 shadow-lg relative overflow-hidden group hover:border-amber-400/60 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                <UserCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                ON DUTY 24H
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-white font-prompt tabular-nums">
                {onDutyOfficersCount}
              </span>
              <span className="text-xs text-slate-400 font-sarabun">นาย</span>
            </div>
            <h4 className="text-xs font-bold text-amber-300 font-prompt mt-1">เจ้าหน้าที่ประจำเวร</h4>
            <p className="text-[11px] text-blue-200/70 font-sarabun mt-0.5">
              ชุดกู้ชีพ EMT และชุดค้นหาใต้น้ำ
            </p>
          </div>

          {/* KPI 4: 24h Incident Volume */}
          <div className="p-4 sm:p-5 rounded-3xl bg-[#09183d]/90 border border-blue-900/60 shadow-lg relative overflow-hidden group hover:border-amber-400/60 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-red-500/15 border border-red-400/30 flex items-center justify-center text-red-400">
                <Activity className="w-5 h-5 animate-pulse" />
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${pendingIncidentsCount > 0 ? 'bg-red-500 text-white animate-pulse' : 'bg-emerald-500/20 text-emerald-300'}`}>
                {pendingIncidentsCount > 0 ? `รอสั่งการ ${pendingIncidentsCount}` : 'ปกติ'}
              </span>
            </div>
            <span className="text-2xl sm:text-3xl font-black text-white font-prompt tabular-nums">
              {incidents.length}
            </span>
            <h4 className="text-xs font-bold text-amber-300 font-prompt mt-1">เคสรับแจ้งสะสม</h4>
            <p className="text-[11px] text-blue-200/70 font-sarabun mt-0.5">
              บันทึกเหตุฉุกเฉินในฐานข้อมูล
            </p>
          </div>
        </div>

        {/* 2-Column Split: Active Incident Stream & Recent Mission Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Column A: Live Incident Feed */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#081538] border border-blue-900/60 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-blue-900/50">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
                <h3 className="text-sm font-bold text-white font-prompt">
                  ฟีดรับแจ้งเหตุฉุกเฉินสด (Live Incidents Stream)
                </h3>
              </div>
              <span className="text-[10px] text-blue-300 font-mono">
                {activeIncidents.length} เคสกำลังดำเนินการ
              </span>
            </div>

            <div className="space-y-3">
              {incidents.slice(0, 3).map((inc) => (
                <div
                  key={inc.id}
                  className="p-3.5 rounded-2xl bg-blue-950/50 border border-blue-900/40 hover:border-amber-400/40 transition-all flex items-start justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-amber-300">
                        {inc.incident_number}
                      </span>
                      <span className="text-[10px] text-blue-300 font-mono">
                        • {new Date(inc.reported_at).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-white font-prompt truncate">
                      {inc.caller_name} • {inc.location_name}
                    </h4>
                    <p className="text-[11px] text-blue-200/70 font-sarabun line-clamp-1">
                      {inc.details || 'รับแจ้งเหตุฉุกเฉินและกำลังส่งหน่วยปฏิบัติการ'}
                    </p>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 font-prompt ${
                      inc.status === 'pending'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse'
                        : inc.status === 'resolved'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {inc.status === 'pending'
                      ? 'รอดำเนินการ'
                      : inc.status === 'resolved'
                      ? 'เสร็จสิ้น'
                      : 'กำลังปฏิบัติการ'}
                  </span>
                </div>
              ))}

              {incidents.length === 0 && (
                <div className="p-6 text-center text-xs text-blue-300 font-sarabun">
                  ไม่มีเหตุฉุกเฉินค้างดำเนินการในขณะนี้
                </div>
              )}
            </div>
          </div>

          {/* Column B: Recent Operations & Missions */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#081538] border border-blue-900/60 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-blue-900/50">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white font-prompt">
                  บันทึกภารกิจช่วยเหลือล่าสุด (Recent Dispatches)
                </h3>
              </div>
              <span className="text-[10px] text-blue-300 font-mono">
                {missions.length} ภารกิจทั้งหมด
              </span>
            </div>

            <div className="space-y-3">
              {recentMissions.map((m) => (
                <div
                  key={m.id}
                  onClick={() => onSelectMission && onSelectMission(m)}
                  className="p-3 rounded-2xl bg-blue-950/50 border border-blue-900/40 hover:border-amber-400/40 hover:bg-blue-900/40 transition-all flex items-center gap-3 cursor-pointer group"
                >
                  <div
                    className="w-12 h-12 rounded-xl bg-cover bg-center shrink-0 border border-blue-800"
                    style={{ backgroundImage: `url(${m.cover_image_url})` }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-amber-300 font-mono">{m.incident_date}</span>
                      <span className="text-[10px] text-blue-300 font-sarabun truncate">• {m.location}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white font-prompt truncate group-hover:text-amber-300 transition-colors">
                      {m.title}
                    </h4>
                    <p className="text-[11px] text-blue-200/70 font-sarabun truncate">{m.summary}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-blue-400 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
