import React, { useState } from 'react';
import { Modal } from './Modal';
import { Badge } from './Badge';
import { motion } from 'motion/react';
import {
  ScanLine,
  CheckCircle2,
  Package,
  Layers,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

interface BarcodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMedicine?: (medicineId: string) => void;
}

export const BarcodeScannerModal: React.FC<BarcodeScannerModalProps> = ({
  isOpen,
  onClose,
  onSelectMedicine,
}) => {
  const { medicines, addToast } = useApp();
  const navigate = useNavigate();

  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const sampleBarcodes = [
    { code: 'GS1-8901234567890', medId: 'MED-001', name: 'Amoxicillin + Clav 625mg' },
    { code: 'GS1-8901234567891', medId: 'MED-002', name: 'Ceftriaxone Sodium 1g' },
    { code: 'GS1-8901234567893', medId: 'MED-024', name: 'Insulin Glargine 100 IU' },
    { code: 'GS1-8901234567895', medId: 'MED-006', name: 'Paracetamol IV 10mg/ml' },
    { code: 'GS1-8901234567897', medId: 'MED-026', name: 'Adrenaline 1:1000 Inj' },
  ];

  const handleTriggerScan = (code: string, medId: string) => {
    setIsScanning(true);
    setScannedResult(null);

    setTimeout(() => {
      setIsScanning(false);
      setScannedResult(medId);
      if (soundEnabled) {
        try {
          // Subtle audio beep using Web Audio API
          const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(1400, audioCtx.currentTime);
          gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.12);
        } catch (e) {
          // Audio context might be restricted
        }
      }
      addToast('Barcode Identified', `Verified GS1 DataMatrix: ${code}`, 'success');
    }, 450);
  };

  const matchedMedicine = medicines.find((m) => m.id === scannedResult);

  const handleActionView = () => {
    if (matchedMedicine) {
      onClose();
      navigate(`/inventory?search=${encodeURIComponent(matchedMedicine.batchNumber)}`);
    }
  };

  const handleActionDispense = () => {
    if (matchedMedicine) {
      if (onSelectMedicine) {
        onSelectMedicine(matchedMedicine.id);
      }
      onClose();
      navigate('/dispensing');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Hospital Barcode & DataMatrix Scanner"
      subtitle="High-speed optical verification for GTIN, batch numbers, and serial validation"
      maxWidth="lg"
    >
      <div className="space-y-4">
        {/* Animated Viewfinder */}
        <div className="relative w-full h-56 rounded-2xl bg-slate-950 flex flex-col items-center justify-center overflow-hidden border border-slate-800 shadow-inner">
          {/* Subtle grid in viewfinder */}
          <div className="absolute inset-0 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:20px_20px] opacity-25" />

          {/* Viewfinder Target Reticle */}
          <div className="relative w-64 h-36 border-2 border-teal-500/60 rounded-xl flex items-center justify-center">
            {/* Corner guides */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-teal-400" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-teal-400" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-teal-400" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-teal-400" />

            {/* Sweeping Laser Animation */}
            <motion.div
              animate={{
                top: ['10%', '90%', '10%'],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent shadow-[0_0_8px_#2dd4bf]"
            />

            <div className="text-center z-10">
              <ScanLine className="w-8 h-8 text-teal-400/80 mx-auto mb-1 animate-pulse" />
              <p className="text-[11px] text-teal-200/80 font-mono tracking-wider">
                {isScanning ? 'DECODING OPTICAL MATRIX...' : 'ALIGN BARCODE IN FRAME'}
              </p>
            </div>
          </div>

          {/* Top Bar Controls */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-teal-300 text-xs transition-colors"
              title="Toggle audio beep"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Quick Simulator Barcode Selector */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Simulate Optical Scan of Sample Hospital Medications:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {sampleBarcodes.map((item) => (
              <button
                key={item.code}
                onClick={() => handleTriggerScan(item.code, item.medId)}
                className="p-2 rounded-xl text-left border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:border-teal-500 hover:bg-teal-50/50 dark:hover:bg-teal-950/30 transition-all text-xs"
              >
                <p className="font-semibold text-slate-800 dark:text-slate-100 truncate">
                  {item.name}
                </p>
                <span className="font-mono text-[10px] text-teal-700 dark:text-teal-400 block truncate">
                  {item.code}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Scanned Result Card */}
        {matchedMedicine && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-xl border border-teal-200 dark:border-teal-800 bg-teal-50/70 dark:bg-teal-950/40 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {matchedMedicine.name}
                  </h4>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Brand: <strong className="text-teal-700 dark:text-teal-300">{matchedMedicine.brandName}</strong> · Category: {matchedMedicine.category}
                </p>
              </div>

              <Badge
                variant={matchedMedicine.status === 'In Stock' ? 'success' : 'warning'}
                size="sm"
              >
                {matchedMedicine.status}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs pt-2 border-t border-teal-200/60 dark:border-teal-800/60">
              <div>
                <span className="text-slate-400 block text-[10px]">Batch Number</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                  {matchedMedicine.batchNumber}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Stock Available</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                  {matchedMedicine.quantity} {matchedMedicine.unit}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Expiry</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                  {matchedMedicine.expiryDate}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={handleActionView}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors"
              >
                View in Inventory
              </button>
              <button
                onClick={handleActionDispense}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-700 text-white hover:bg-teal-800 transition-colors shadow-xs"
              >
                <span>Fulfill in Dispensing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </Modal>
  );
};
