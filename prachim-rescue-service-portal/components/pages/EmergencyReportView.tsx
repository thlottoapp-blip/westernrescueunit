'use client';

import React, { useState } from 'react';
import {
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
  ArrowLeft,
  PhoneCall,
  Info,
  ShieldCheck,
  Radio,
  FileText,
  HeartPulse,
} from 'lucide-react';
import { IncidentType, UrgencyLevel, EmergencyIncident } from '@/types/database';
import { OfficialLogo } from '@/components/shared/OfficialLogo';

interface EmergencyReportViewProps {
  onBackToHome: () => void;
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

export function EmergencyReportView({
  onBackToHome,
  onSubmitIncident,
}: EmergencyReportViewProps) {
  const [callerName, setCallerName] = useState('');
  const [callerPhone, setCallerPhone] = useState('');
  const [incidentType, setIncidentType] = useState<IncidentType>('ems_traffic');
  const [urgencyLevel, setUrgencyLevel] = useState<UrgencyLevel>('urgent');
  const [locationName, setLocationName] = useState('');
  const [district, setDistrict] = useState('อำเภอบรบือ');
  const [victimCount, setVictimCount] = useState<number>(1);
  const [details, setDetails] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [latitude, setLatitude] = useState<number | undefined>(undefined);
  const [longitude, setLongitude] = useState<number | undefined>(undefined);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [gpsAutoCaptured, setGpsAutoCaptured] = useState(false);
  const [submittedIncident, setSubmittedIncident] = useState<EmergencyIncident | null>(null);

  // Automatic Background GPS Location Detection
  React.useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(pos.coords.latitude);
          setLongitude(pos.coords.longitude);
          setGpsAutoCaptured(true);
        },
        (err) => {
          console.log('Automatic GPS fallback:', err.message);
          setLatitude(16.0375);
          setLongitude(103.1186);
          setGpsAutoCaptured(true);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      setLatitude(16.0375);
      setLongitude(103.1186);
      setGpsAutoCaptured(true);
    }
  }, []);

  const incidentTypes = [
    {
      id: 'ems_traffic' as IncidentType,
      label: 'อุบัติเหตุจราจร / EMS',
      icon: Ambulance,
      desc: 'รถชน, ผู้บาดเจ็บทางถนน, ผู้ป่วยหมดสติ',
    },
    {
      id: 'snake_wildlife' as IncidentType,
      label: 'สัตว์มีพิษ / จับงู',
      icon: ShieldAlert,
      desc: 'งูเห่า, งูจงอาง, สัตว์เลื้อยคลานเข้าบ้าน',
    },
    {
      id: 'water_rescue' as IncidentType,
      label: 'กู้ภัยทางน้ำ / ค้นหาใต้น้ำ',
      icon: Waves,
      desc: 'จมน้ำ, ค้นหาผู้สูญหาย, ของตกน้ำ',
    },
    {
      id: 'fire_flood' as IncidentType,
      label: 'อุทกภัย / อัคคีภัย',
      icon: Flame,
      desc: 'น้ำท่วมบ้านเรือน, ไฟไหม้เบื้องต้น',
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
        setGpsAutoCaptured(true);
        setIsGettingLocation(false);
        if (!locationName) {
          setLocationName(
            `พิกัด GPS: ${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)} (อำเภอบรบือ)`
          );
        }
      },
      (err) => {
        setIsGettingLocation(false);
        console.warn('Geolocation error:', err.message);
        setLatitude(16.0375);
        setLongitude(103.1186);
        setGpsAutoCaptured(true);
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

    const finalLat = latitude || 16.0375;
    const finalLng = longitude || 103.1186;

    const created = onSubmitIncident({
      caller_name: callerName.trim(),
      caller_phone: callerPhone.trim(),
      incident_type: incidentType,
      urgency_level: urgencyLevel,
      location_name: locationName.trim(),
      district,
      latitude: finalLat,
      longitude: finalLng,
      victim_count: Number(victimCount) || 0,
      details: details.trim(),
      image_url: imageUrl,
    });

    setSubmittedIncident(created);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetForm = () => {
    setSubmittedIncident(null);
    setCallerName('');
    setCallerPhone('');
    setLocationName('');
    setDetails('');
    setImageUrl('');
    setLatitude(undefined);
    setLongitude(undefined);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-prompt pb-16">
      {/* Top Banner Navigation */}
      <div className="bg-[#0b1838] border-b border-amber-400/30 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer border border-white/20 shrink-0 min-h-[38px]"
          >
            <ArrowLeft className="w-4 h-4 text-amber-300 shrink-0" />
            <span>กลับสู่หน้าหลัก</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-sarabun text-blue-200">
            <span className="hidden sm:inline">ศูนย์สั่งการกู้ภัยประจิม 24 ชั่วโมง</span>
            <a
              href="tel:0611193342"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs font-prompt transition-colors shrink-0"
            >
              <PhoneCall className="w-3.5 h-3.5 shrink-0" />
              <span>061-119-3342</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-sarabun text-slate-500 mb-2 flex-wrap">
            <button
              onClick={onBackToHome}
              className="text-[#16377e] hover:underline cursor-pointer"
            >
              หน้าหลัก
            </button>
            <span>/</span>
            <span className="text-slate-700 font-medium">ระบบแจ้งเหตุฉุกเฉินออนไลน์</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                แจ้งเหตุฉุกเฉิน & ขอความช่วยเหลือ 24 ชั่วโมง
              </h1>
              <p className="text-slate-600 text-sm sm:text-base font-sarabun mt-1">
                สมาคมประจิมสารคาม พุทธศาสตร์สงเคราะห์ (หน่วยกู้ภัยประจิม) อำเภอบรบือ จังหวัดมหาสารคาม
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>ศูนย์วิทยุสื่อสารพร้อมสั่งการตลอดเวลา</span>
            </div>
          </div>
        </div>

        {/* SUBMITTED SUCCESS VIEW */}
        {submittedIncident ? (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 text-center max-w-2xl mx-auto my-8 space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 border-4 border-emerald-300 flex items-center justify-center mx-auto text-emerald-600 shadow-lg">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 inline-block">
                หมายเลขเคส: {submittedIncident.incident_number}
              </span>
              <h2 className="text-2xl font-bold text-slate-900 font-prompt">
                ส่งข้อมูลแจ้งเหตุเข้าสู่ศูนย์สั่งการเรียบร้อยแล้ว
              </h2>
              <p className="text-slate-600 text-sm font-sarabun max-w-md mx-auto leading-relaxed">
                เจ้าหน้าที่ศูนย์วิทยุกู้ภัยประจิมกำลังตรวจสอบพิกัดและประสานงานชุดปฏิบัติการเคลื่อนที่เร็วทันที
              </p>
            </div>

            {/* Summary Details */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs sm:text-sm font-sarabun space-y-2.5">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">ประเภทเหตุ:</span>
                <strong className="text-slate-900 font-prompt">
                  {submittedIncident.incident_type}
                </strong>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">ระดับความเร่งด่วน:</span>
                <strong className="text-red-700 font-prompt">
                  {submittedIncident.urgency_level}
                </strong>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">ผู้แจ้ง:</span>
                <span className="text-slate-900">
                  {submittedIncident.caller_name} ({submittedIncident.caller_phone})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">สถานที่:</span>
                <span className="text-slate-900 font-medium text-right max-w-[250px] break-words">
                  {submittedIncident.location_name}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:0611193342"
                className="inline-flex items-center justify-center gap-2 bg-[#16377e] hover:bg-[#0f2452] text-white font-bold px-6 py-3.5 rounded-full text-sm font-prompt transition-colors border border-amber-400/40 shadow-md min-h-[44px]"
              >
                <PhoneCall className="w-4 h-4 text-amber-300 shrink-0" />
                <span>โทรยืนยันกับศูนย์สั่งการ 061-119-3342</span>
              </a>

              <button
                onClick={handleResetForm}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold font-prompt transition-colors cursor-pointer min-h-[44px]"
              >
                แจ้งเหตุเพิ่มเติมอีกรายการ
              </button>

              <button
                onClick={onBackToHome}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 text-sm font-semibold font-prompt transition-colors cursor-pointer min-h-[44px]"
              >
                กลับหน้าหลัก
              </button>
            </div>
          </div>
        ) : (
          /* REPORT FORM & HELPFUL SIDEBAR */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Main Form */}
            <div className="lg:col-span-8">
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-7"
              >
                {/* 1. Incident Type Selector */}
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-3">
                    1. เลือกประเภทเหตุฉุกเฉิน / บริการที่ต้องการ <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {incidentTypes.map((t) => {
                      const Icon = t.icon;
                      const isSelected = incidentType === t.id;
                      return (
                        <div
                          key={t.id}
                          onClick={() => setIncidentType(t.id)}
                          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                            isSelected
                              ? 'border-[#16377e] bg-blue-50/70 shadow-sm'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 aspect-square ${
                              isSelected
                                ? 'bg-[#16377e] text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            <Icon className="w-5 h-5 shrink-0" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                              {t.label}
                            </h4>
                            <p className="text-[11px] text-slate-500 font-sarabun mt-0.5 leading-normal">
                              {t.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Urgency Level Selector */}
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-3">
                    2. ระดับความเร่งด่วน (Urgency Triage) <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setUrgencyLevel('critical')}
                      className={`p-3 sm:p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                        urgencyLevel === 'critical'
                          ? 'bg-red-600 border-red-600 text-white font-bold shadow-md shadow-red-600/20'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-red-50'
                      }`}
                    >
                      <AlertTriangle className="w-5 h-5 mb-1 shrink-0" />
                      <span className="text-xs sm:text-sm font-bold">วิกฤต / ฉุกเฉินมาก</span>
                      <span className="text-[10px] opacity-80 font-sarabun hidden sm:block">หมดสติ / บาดเจ็บหนัก</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setUrgencyLevel('urgent')}
                      className={`p-3 sm:p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                        urgencyLevel === 'urgent'
                          ? 'bg-amber-500 border-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-amber-50'
                      }`}
                    >
                      <Clock className="w-5 h-5 mb-1 shrink-0" />
                      <span className="text-xs sm:text-sm font-bold">เร่งด่วน</span>
                      <span className="text-[10px] opacity-80 font-sarabun hidden sm:block">บาดเจ็บ / สัตว์มีพิษ</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setUrgencyLevel('standard')}
                      className={`p-3 sm:p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                        urgencyLevel === 'standard'
                          ? 'bg-blue-600 border-blue-600 text-white font-bold shadow-md shadow-blue-600/20'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-blue-50'
                      }`}
                    >
                      <HelpCircle className="w-5 h-5 mb-1 shrink-0" />
                      <span className="text-xs sm:text-sm font-bold">ทั่วไป / นัดหมาย</span>
                      <span className="text-[10px] opacity-80 font-sarabun hidden sm:block">เคลื่อนย้ายผู้ป่วย</span>
                    </button>
                  </div>
                </div>

                {/* 3. Location */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-900">
                    3. สถานที่เกิดเหตุ / จุดสังเกต <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <MapPin className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5 shrink-0" />
                    <input
                      type="text"
                      required
                      value={locationName}
                      onChange={(e) => setLocationName(e.target.value)}
                      placeholder="ระบุสถานที่ เช่น สี่แยกไฟแดงบรบือ หน้า รร.บรบือวิทยาคาร กม.14..."
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#16377e] focus:bg-white font-sarabun transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1 font-sarabun">
                        อำเภอ
                      </label>
                      <input
                        type="text"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-sarabun focus:outline-none focus:border-[#16377e]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1 font-sarabun">
                        จำนวนผู้บาดเจ็บ / ผู้ประสบเหตุ (คน)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={victimCount}
                        onChange={(e) => setVictimCount(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-sarabun focus:outline-none focus:border-[#16377e]"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Caller Contact Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">
                      4. ชื่อผู้แจ้งเหตุ <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 shrink-0" />
                      <input
                        type="text"
                        required
                        value={callerName}
                        onChange={(e) => setCallerName(e.target.value)}
                        placeholder="ชื่อ-นามสกุล หรือชื่อเรียก"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#16377e] focus:bg-white font-sarabun"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">
                      เบอร์โทรศัพท์ที่ติดต่อได้ <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 shrink-0" />
                      <input
                        type="tel"
                        required
                        value={callerPhone}
                        onChange={(e) => setCallerPhone(e.target.value)}
                        placeholder="เช่น 081-234-5678"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#16377e] focus:bg-white font-sarabun"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Details / Notes */}
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">
                    5. รายละเอียดเพิ่มเติม (สภาพที่เกิดเหตุ, จุดสังเกต)
                  </label>
                  <textarea
                    rows={3}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="เช่น รถกระบะชนกับจักรยานยนต์ ผู้บาดเจ็บเป็นชาย 1 ราย มีแผลที่ศีรษะ รถติดภายใน..."
                    className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#16377e] focus:bg-white font-sarabun leading-relaxed"
                  />
                </div>

                {/* Submit Action Buttons */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={onBackToHome}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                  >
                    ยกเลิก / กลับหน้าหลัก
                  </button>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm font-prompt transition-all shadow-lg shadow-red-600/30 cursor-pointer border border-red-500 min-h-[46px]"
                  >
                    <Send className="w-4 h-4 shrink-0" />
                    <span>ส่งข้อมูลแจ้งเหตุด่วนทันที</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Right: Emergency Hotline & Guide Cards */}
            <div className="lg:col-span-4 space-y-6">
              {/* Emergency Hotline Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0b1838] via-[#122759] to-[#0a1530] text-white border-2 border-amber-400/50 shadow-xl space-y-5">
                <div className="flex items-center gap-3">
                  <OfficialLogo size={44} withGlow={true} />
                  <div>
                    <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest block font-bold">
                      HOTLINE DIRECT 24/7
                    </span>
                    <h3 className="text-base font-bold text-white font-prompt leading-tight">
                      สายด่วนกู้ภัยประจิม
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-200 font-sarabun leading-relaxed">
                  หากเป็นเหตุฉุกเฉินวิกฤต หรือต้องการความช่วยเหลือด่วนที่สุด กรุณากดโทรศัพท์ติดต่อเจ้าหน้าที่ศูนย์สั่งการโดยตรง
                </p>

                <div className="space-y-2.5">
                  <a
                    href="tel:0611193342"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm font-prompt transition-all shadow-md"
                  >
                    <PhoneCall className="w-4 h-4 text-slate-950 shrink-0" />
                    <span>โทร 061-119-3342 (กู้ภัยประจิม)</span>
                  </a>

                  <a
                    href="tel:1669"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-sm font-prompt transition-all shadow-md"
                  >
                    <Ambulance className="w-4 h-4 text-white shrink-0" />
                    <span>โทร 1669 (การแพทย์ฉุกเฉิน สพฉ.)</span>
                  </a>
                </div>
              </div>

              {/* Tips While Waiting */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 text-xs font-sarabun">
                <h4 className="text-sm font-bold text-slate-900 font-prompt flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#16377e] shrink-0" />
                  <span>คำแนะนำระหว่างรอเจ้าหน้าที่</span>
                </h4>

                <ul className="space-y-2.5 text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#16377e] font-bold shrink-0">•</span>
                    <span><strong>เปิดสายโทรศัพท์ไว้:</strong> เจ้าหน้าที่ชุดปฏิบัติการอาจโทรสอบถามเส้นทางหรืออาการเพิ่มเติม</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#16377e] font-bold shrink-0">•</span>
                    <span><strong>ความปลอดภัยเป็นหลัก:</strong> ห้ามเคลื่อนย้ายผู้บาดเจ็บกระดูกหักหรือหมดสติ เว้นแต่มีอันตรายซ้ำซ้อน เช่น ไฟไหม้</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#16377e] font-bold shrink-0">•</span>
                    <span><strong>ส่งสัญญาณ:</strong> เปิดไฟฉุกเฉิน หรือยืนโบกรถในจุดที่ปลอดภัยเพื่อเป็นจุดสังเกตแก่รถกู้ภัย</span>
                  </li>
                </ul>
              </div>

              {/* Service Assurance */}
              <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#16377e] shrink-0 mt-0.5" />
                <p className="text-xs text-slate-700 font-sarabun leading-relaxed">
                  บริการการแพทย์ฉุกเฉิน อุบัติเหตุ และช่วยเหลือสาธารณภัย ฟรี 100% ภายใต้การรับรองของสถาบันการแพทย์ฉุกเฉินแห่งชาติ (สพฉ.)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
