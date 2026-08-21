'use client';

import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, Trash2, CheckCircle2, AlertCircle, FileImage } from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  value?: string;
  onChange: (base64OrUrl: string) => void;
  required?: boolean;
  helpText?: string;
}

export function ImageUploadField({
  label,
  value,
  onChange,
  required = false,
  helpText = 'รองรับไฟล์รูปภาพ PNG, JPG, WEBP ขนาดไม่เกิน 10MB',
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = (file: File) => {
    setError(null);
    if (!file.type.startsWith('image/')) {
      setError('กรุณาเลือกไฟล์ที่เป็นรูปภาพเท่านั้น');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('ขนาดไฟล์รูปภาพเกิน 10MB กรุณาเลือกรูปภาพที่มีขนาดเล็กลง');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        onChange(result);
      }
    };
    reader.onerror = () => {
      setError('เกิดข้อผิดพลาดในการอ่านไฟล์รูปภาพ');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-1.5 font-prompt">
      <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Hidden Native File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Dropzone or Preview */}
      {value ? (
        <div className="relative rounded-2xl overflow-hidden border border-slate-300 dark:border-blue-900 bg-slate-100 dark:bg-slate-900 group">
          <div
            className="h-44 sm:h-52 w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${value})` }}
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-md hover:bg-slate-100 transition-all flex items-center gap-1.5 cursor-pointer min-h-[38px]"
            >
              <UploadCloud className="w-4 h-4 text-blue-700" />
              <span>เปลี่ยนรูปภาพ</span>
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="px-3.5 py-2 rounded-xl bg-red-600 text-white font-bold text-xs shadow-md hover:bg-red-700 transition-all flex items-center gap-1.5 cursor-pointer min-h-[38px]"
            >
              <Trash2 className="w-4 h-4" />
              <span>ลบรูป</span>
            </button>
          </div>
          <div className="p-2.5 bg-slate-900/80 text-white text-[11px] font-mono flex items-center justify-between">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>อัปโหลดรูปภาพสำเร็จแล้ว</span>
            </span>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-blue-300 hover:text-white underline text-[11px]"
            >
              เลือกรูปอื่น
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2.5
            ${
              dragActive
                ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40'
                : 'border-slate-300 dark:border-blue-900/60 bg-slate-50/50 dark:bg-slate-900/50 hover:border-blue-500 hover:bg-slate-100/60 dark:hover:bg-blue-950/20'
            }
          `}
        >
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white block font-prompt">
              คลิกเพื่อเลือกไฟล์รูปภาพจากอุปกรณ์ หรือลากไฟล์มาวางที่นี่
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-sarabun mt-0.5 block">
              {helpText}
            </span>
          </div>
          <button
            type="button"
            className="mt-1 px-4 py-2 rounded-xl bg-[#16377e] hover:bg-[#0f2452] text-white text-xs font-bold font-prompt shadow-xs pointer-events-none min-h-[36px]"
          >
            เลือกไฟล์จากเครื่อง
          </button>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-600 font-sarabun bg-red-50 p-2 rounded-xl border border-red-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
