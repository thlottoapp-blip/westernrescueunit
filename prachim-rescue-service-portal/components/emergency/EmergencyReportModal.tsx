'use client';

import React, { useState } from 'react';
import {
  X,
  AlertTriangle,
  MapPin,
  Phone,
  User,
  Users,
  Locate,
  CheckCircle2,
  Ambulance,
  Waves,
  ShieldAlert,
  Flame,
  HelpCircle,
  Clock,
  Send,
} from 'lucide-react';
import { IncidentType, UrgencyLevel, EmergencyIncident } from '@/types/database';

interface EmergencyReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitIncident: (data: {
    caller_name: string;
    caller_phone: string;
    incident_type: IncidentType;
    urgency_level: UrgencyLevel;
    location_name: string;
    district?: string;
    province?: string;
    latitude?: number;
    longitude?: number;
    victim_count?: number;
    details?: string;
    image_url?: string;
  }) => EmergencyIncident;
}

export function EmergencyReportModal({
  isOpen,
  onClose,
  onSubmitIncident,
}: EmergencyReportModalProps) {
  const [callerName, setCallerName] = useState('');
  const [callerPhone, setCallerPhone] = useState('');
  const [incidentType, setIncidentType] = useState<IncidentType>('ems_traffic');
  const [urgencyLevel, setUrgencyLevel] = useState<UrgencyLevel>('urgent');
  const [locationName, setLocationName] = useState('');
  const [district, setDistrict] = useState('อำเภอบรบือ');
  const [victimCount, setVictimCount] = useState<number>(1);
  const [details, setDetails] = useState('');
  const [latitude, setLatitude] = useState<number | undefined>(undefined);
  const [longitude, setLongitude] = useState<number | undefined>(undefined);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [submittedIncident, setSubmittedIncident] = useState<EmergencyIncident | null>(null);

  if (!isOpen) return null;

  const incidentTypes = [
    {
      id: 'ems_traffic' as IncidentType,
      label: 'อุบัติเหตุจราจร / EMS',
      icon: Ambulance,
      desc: 'รถชน, ผู้บาดเจ็บทางถนน, หมดสติ',
    },
    {
      id: 'snake_wildlife' as IncidentType,
      label: 'สัตว์มีพิษ / จับงู',
      icon: ShieldAlert,
      desc: 'งูเห่า, จงอาง, สัตว์เลื้อยคลานเข้าบ้าน',
    },
    {
      id: 'water_rescue' as IncidentType,
      label: 'กู้ภัยทางน้ำ / ค้นหาใต้น้ำ',
      icon: Waves,
      desc: 'จมน้ำ, ค้นหาผู้สูญหาย, ทรัพย์สินตกน้ำ',
    },
    {
      id: 'fire_flood' as IncidentType,
      label: 'อุทกภัย / อัคคีภัย',
      icon: Flame,
      desc: 'น้ำท่วมบ้าน, ไฟไหม้เบื้องต้น',
    },
    {
      id: 'patient_transfer' as IncidentType,
      label: 'เคลื่อนย้ายผู้ป่วยติดเตียง',
      icon: HelpCircle,
      desc: 'ส่งต่อโรงพยาบาล, ส่งกลับภูมิลำเนา',
    },
  ];

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('อุปกรณ์ของคุณไม่รองรับการระบุพิกัด GPS');
      return;
    }
    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
        setIsGettingLocation(false);
        if (!locationName) {
          setLocationName(
            `พิกัด GPS: ${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)} (บรบือ)`
          );
        }
      },
      (err) => {
        setIsGettingLocation(false);
        console.warn('Geolocation error:', err.message);
        // Provide mock fallback coordinate in Borabue
        setLatitude(16.0382);
        setLongitude(103.1284);
        if (!locationName) {
          setLocationName('บริเวณใจกลางอำเภอบรบือ ถนนแจ้งสนิท (ระบุอัตโนมัติ)');
        }
      },
      { timeout: 8000 }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callerName.trim() || !callerPhone.trim() || !locationName.trim()) {
      alert('กรุณากรอกชื่อผู้แจ้ง, เบอร์โทรศัพท์ และสถานที่เกิดเหตุให้ครบถ้วน');
      return;
    }

    const created = onSubmitIncident({
      caller_name: callerName.trim(),
      caller_phone: callerPhone.trim(),
      incident_type: incidentType,
      urgency_level: urgencyLevel,
      location_name: locationName.trim(),
      district,
      latitude,
      longitude,
      victim_count: Number(victimCount) || 0,
      details: details.trim(),
    });

    setSubmittedIncident(created);
  };

  const handleResetAndClose = () => {
    setSubmittedIncident(null);
    setCallerName('');
    setCallerPhone('');
    setLocationName('');
    setDetails('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8 animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#08132b] via-[#16377e] to-[#08132b] p-5 sm:p-6 text-white flex items-center justify-between border-b border-amber-400/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-300 shrink-0 aspect-square">
              <AlertTriangle className="w-5 h-5 animate-pulse shrink-0" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-prompt text-white whitespace-nowrap">
                แจ้งเหตุด่วนฉุกเฉิน 24 ชั่วโมง
              </h3>
              <p className="text-xs text-blue-100 font-sarabun whitespace-nowrap">
                หน่วยกู้ภัยประจิม สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์ อ.บรบือ
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-colors cursor-pointer border border-white/10 shrink-0 aspect-square"
          >
            <X className="w-5 h-5 shrink-0" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {submittedIncident ? (
            /* Success View */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-600 aspect-square">
                <CheckCircle2 className="w-9 h-9 shrink-0" />
              </div>

              <div>
                <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-wider block mb-1 whitespace-nowrap">
                  DISPATCH SIGNAL RECEIVED
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-slate-900 font-prompt">
                  ส่งสัญญาณแจ้งเหตุถึงศูนย์สั่งการเรียบร้อยแล้ว
                </h4>
                <p className="text-sm text-slate-600 font-sarabun mt-2 max-w-md mx-auto">
                  เจ้าหน้าที่ศูนย์กู้ภัยประจิมได้รับข้อมูลแล้ว และกำลังติดต่อกลับทางเบอร์โทร{' '}
                  <strong className="text-emerald-700 font-bold whitespace-nowrap tabular-nums">{submittedIncident.caller_phone}</strong>{' '}
                  พร้อมจัดชุดปฏิบัติการออกเดินทางทันที
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left max-w-md mx-auto space-y-2 text-xs sm:text-sm font-sarabun">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 whitespace-nowrap">รหัสอ้างอิงเหตุ:</span>
                  <span className="text-[#16377e] font-mono font-bold whitespace-nowrap">
                    {submittedIncident.incident_number}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 whitespace-nowrap">สถานที่:</span>
                  <span className="text-slate-900 font-medium truncate max-w-[220px] whitespace-nowrap">
                    {submittedIncident.location_name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 whitespace-nowrap">สถานะ:</span>
                  <span className="text-amber-700 font-semibold whitespace-nowrap">รอการสั่งการรถกู้ชีพ</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="tel:0611193342"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#16377e] hover:bg-[#0f2452] text-white font-bold px-6 py-3 rounded-full font-prompt text-sm shadow-md border border-amber-400/40 whitespace-nowrap shrink-0 min-h-[44px]"
                >
                  <Phone className="w-4 h-4 text-amber-300 shrink-0" />
                  <span className="whitespace-nowrap">โทรยืนยันสายตรง 061-119-3342</span>
                </a>
                <button
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-prompt cursor-pointer border border-slate-200 whitespace-nowrap shrink-0 min-h-[44px]"
                >
                  ปิดหน้านี้
                </button>
              </div>
            </div>
          ) : (
            /* Submission Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 1. Incident Type Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-prompt mb-2 whitespace-nowrap">
                  1. เลือกประเภทเหตุฉุกเฉิน *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {incidentTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = incidentType === type.id;
                    return (
                      <button
                        type="button"
                        key={type.id}
                        onClick={() => setIncidentType(type.id)}
                        className={`flex items-start gap-3 p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50/80 border-[#16377e] text-slate-900 shadow-xs ring-1 ring-blue-500/30'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 aspect-square ${
                            isSelected
                              ? 'bg-[#16377e] text-amber-300'
                              : 'bg-slate-100 text-[#16377e]'
                          }`}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs sm:text-sm font-bold font-prompt block text-slate-900 whitespace-nowrap">
                            {type.label}
                          </span>
                          <span className="text-[11px] text-slate-500 font-sarabun block truncate">
                            {type.desc}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Urgency Level */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-prompt mb-2 whitespace-nowrap">
                  2. ระดับความเร่งด่วน
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'critical' as UrgencyLevel, label: 'วิกฤตเร่งด่วน', sub: 'หมดสติ/ชีพจรอ่อน' },
                    { id: 'urgent' as UrgencyLevel, label: 'เร่งด่วน', sub: 'มีแผล/เลือดออก/งู' },
                    { id: 'standard' as UrgencyLevel, label: 'ช่วยเหลือทั่วไป', sub: 'รถเสีย/เคลื่อนย้าย' },
                  ].map((lvl) => (
                    <button
                      type="button"
                      key={lvl.id}
                      onClick={() => setUrgencyLevel(lvl.id)}
                      className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                        urgencyLevel === lvl.id
                          ? lvl.id === 'critical'
                            ? 'bg-[#16377e] border-[#16377e] text-amber-300 font-bold shadow-xs'
                            : 'bg-amber-500 border-amber-500 text-slate-950 font-bold shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-xs font-prompt block whitespace-nowrap">{lvl.label}</span>
                      <span className="text-[10px] font-sarabun opacity-90 block whitespace-nowrap">{lvl.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Caller Details (2 Columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5 whitespace-nowrap">
                    ชื่อผู้แจ้งเหตุ *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="ระบุชื่อ-นามสกุลผู้แจ้ง"
                      value={callerName}
                      onChange={(e) => setCallerName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-full text-sm text-slate-900 focus:outline-none focus:border-[#16377e] focus:ring-1 focus:ring-blue-400 font-sarabun"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5 whitespace-nowrap">
                    เบอร์โทรศัพท์ติดต่อกลับ *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="08X-XXX-XXXX"
                      value={callerPhone}
                      onChange={(e) => setCallerPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-full text-sm text-slate-900 focus:outline-none focus:border-[#16377e] focus:ring-1 focus:ring-blue-400 font-sarabun"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Incident Location & GPS Button */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 font-prompt whitespace-nowrap">
                    สถานที่เกิดเหตุ / จุดสังเกต *
                  </label>
                  <button
                    type="button"
                    onClick={handleGetCurrentLocation}
                    disabled={isGettingLocation}
                    className="inline-flex items-center gap-1.5 text-xs text-[#16377e] hover:text-blue-900 font-bold font-prompt cursor-pointer whitespace-nowrap"
                  >
                    <Locate className={`w-3.5 h-3.5 text-amber-600 shrink-0 ${isGettingLocation ? 'animate-spin' : ''}`} />
                    <span className="whitespace-nowrap">{isGettingLocation ? 'กำลังดึงพิกัด...' : 'ดึงพิกัด GPS อัตโนมัติ'}</span>
                  </button>
                </div>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <textarea
                    required
                    rows={2}
                    placeholder="เช่น หน้า รร.บรบือวิทยาคาร ถนนแจ้งสนิท หรือ บ้านเลขที่..."
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-2xl text-sm text-slate-900 focus:outline-none focus:border-[#16377e] focus:ring-1 focus:ring-blue-400 font-sarabun resize-none"
                  />
                </div>
                {latitude && longitude && (
                  <p className="text-[11px] text-emerald-600 font-mono mt-1 font-semibold whitespace-nowrap tabular-nums">
                    ✓ บันทึกพิกัด: {latitude.toFixed(6)}, {longitude.toFixed(6)}
                  </p>
                )}
              </div>

              {/* 5. Additional Details & Victims */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5 whitespace-nowrap">
                    จำนวนผู้บาดเจ็บ (ราย)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={victimCount}
                    onChange={(e) => setVictimCount(parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-full text-sm text-slate-900 focus:outline-none focus:border-[#16377e] font-sarabun"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5 whitespace-nowrap">
                    อำเภอในพื้นที่
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-full text-sm text-slate-900 focus:outline-none focus:border-[#16377e] font-sarabun"
                  >
                    <option value="อำเภอบรบือ">อำเภอบรบือ (พื้นที่หลัก)</option>
                    <option value="อำเภอวาปีปทุม">อำเภอวาปีปทุม (จุดบริการเครือข่าย)</option>
                    <option value="อำเภอนาดูน">อำเภอนาดูน (จุดบริการเครือข่าย)</option>
                    <option value="อำเภอกุดรัง">อำเภอกุดรัง</option>
                    <option value="อำเภอเมืองมหาสารคาม">อำเภอเมืองมหาสารคาม</option>
                    <option value="อำเภออื่นๆ ในมหาสารคาม">อำเภออื่นๆ ในมหาสารคาม</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 font-prompt mb-1.5 whitespace-nowrap">
                  รายละเอียดเพิ่มเติม / สภาพผู้บาดเจ็บ
                </label>
                <textarea
                  rows={2}
                  placeholder="เช่น มีผู้ติดภายในซากรถ, งูมีพิษขนาดใหญ่, ชนิดของรถที่ชน..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-2xl text-sm text-slate-900 focus:outline-none focus:border-[#16377e] font-sarabun resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full text-slate-500 hover:text-slate-800 text-sm font-prompt transition-colors cursor-pointer whitespace-nowrap min-h-[44px]"
                >
                  ยกเลิก
                </button>

                <button
                  type="submit"
                  id="submit-emergency-incident-btn"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#16377e] to-[#0a193b] hover:from-[#1b4396] hover:to-[#0f2452] text-white font-bold px-8 py-3 rounded-full border border-amber-400/50 shadow-lg shadow-blue-950/20 text-sm font-prompt transition-all cursor-pointer whitespace-nowrap min-h-[44px]"
                >
                  <Send className="w-4 h-4 text-amber-300 shrink-0" />
                  <span className="whitespace-nowrap">ส่งสัญญาณแจ้งเหตุด่วนทันที</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
