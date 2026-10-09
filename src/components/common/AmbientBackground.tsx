import React from 'react';
import { motion } from 'motion/react';

export const AmbientBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* 1. Base Sterile Canvas Gradient: Calm Clinical Grey Depth (No Pitch Black) */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-800 dark:to-slate-700" />

      {/* 2. Soft Hospital Pharmacy Ambient Light Wash (Calm & Clean, No Heavy Blobs) */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-teal-500/[0.04] via-teal-600/[0.02] to-transparent dark:from-teal-500/[0.06] dark:via-teal-600/[0.03] dark:to-transparent" />

      {/* 3. Medical Diagnostic Millimeter Grid (Similar to Clinical Telemetry / ECG Graph Paper) */}
      <div
        className="absolute inset-0 opacity-[0.45] dark:opacity-[0.25]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(15, 118, 110, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15, 118, 110, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%, #000 50%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%, #000 50%, transparent 95%)',
        }}
      />

      {/* 4. Major Clinical Calibration Grid (Every 140px) */}
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.18]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(15, 118, 110, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15, 118, 110, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '140px 140px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%, #000 40%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%, #000 40%, transparent 90%)',
        }}
      />

      {/* 5. Subtle Biometric ECG / Sinus Rhythm Trace (Faint & Professional) */}
      <div className="absolute top-16 left-0 right-0 h-28 overflow-hidden opacity-30 dark:opacity-20">
        <svg
          className="w-full h-full text-teal-600/40 dark:text-teal-400/30"
          viewBox="0 0 1440 90"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,45 L180,45 L195,45 L205,35 L215,60 L225,15 L235,70 L245,45 L260,45 L380,45 L540,45 L555,45 L565,35 L575,60 L585,15 L595,70 L605,45 L620,45 L740,45 L900,45 L915,45 L925,35 L935,60 L945,15 L955,70 L965,45 L980,45 L1100,45 L1260,45 L1275,45 L1285,35 L1295,60 L1305,15 L1315,70 L1325,45 L1340,45 L1440,45"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Traveling subtle pulse along the heartbeat trace */}
        <motion.div
          animate={{
            x: ['-20%', '120%'],
          }}
          transition={{
            duration: 8.5,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-0 bottom-0 w-36 bg-gradient-to-r from-transparent via-teal-400/25 to-transparent blur-xs pointer-events-none"
        />
      </div>

      {/* 6. Medical Precision Calibrated Corner Reticles */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-slate-300 dark:border-slate-800 opacity-60" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-slate-300 dark:border-slate-800 opacity-60" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-slate-300 dark:border-slate-800 opacity-60" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-slate-300 dark:border-slate-800 opacity-60" />
    </div>
  );
};
