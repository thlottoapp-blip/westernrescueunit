'use client';

import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  timestamp?: number;
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-3 sm:px-0">
      {toasts.map((toast) => {
        let bgStyle = 'bg-slate-900 border-slate-700 text-white';
        let Icon = Info;
        let iconColor = 'text-blue-400';

        if (toast.type === 'success') {
          bgStyle = 'bg-emerald-950/95 border-emerald-500/50 text-emerald-100 shadow-emerald-950/40';
          Icon = CheckCircle2;
          iconColor = 'text-emerald-400';
        } else if (toast.type === 'warning') {
          bgStyle = 'bg-amber-950/95 border-amber-500/50 text-amber-100 shadow-amber-950/40';
          Icon = AlertTriangle;
          iconColor = 'text-amber-400';
        } else if (toast.type === 'error') {
          bgStyle = 'bg-red-950/95 border-red-500/50 text-red-100 shadow-red-950/40';
          Icon = AlertCircle;
          iconColor = 'text-red-400';
        } else {
          bgStyle = 'bg-[#0f2452]/95 border-blue-400/50 text-blue-100 shadow-blue-950/40';
          Icon = Info;
          iconColor = 'text-cyan-300';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl border shadow-xl backdrop-blur-md transform transition-all duration-300 animate-in fade-in slide-in-from-top-4 ${bgStyle}`}
          >
            <div className="shrink-0 mt-0.5">
              <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>

            <div className="flex-1 min-w-0">
              {toast.title && (
                <h4 className="text-xs font-bold font-prompt leading-tight text-white mb-0.5">
                  {toast.title}
                </h4>
              )}
              <p className="text-xs font-sarabun leading-relaxed opacity-95">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="shrink-0 p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="ปิดการแจ้งเตือน"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
