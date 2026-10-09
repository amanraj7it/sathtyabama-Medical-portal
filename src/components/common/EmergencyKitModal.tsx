import React, { useState } from 'react';
import { Modal } from './Modal';
import { Badge } from './Badge';
import {
  Siren,
  HeartPulse,
  Flame,
  Zap,
  CheckCircle2,
  Clock,
  Send,
  ShieldAlert,
  Building
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface EmergencyKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyKitModal: React.FC<EmergencyKitModalProps> = ({ isOpen, onClose }) => {
  const { dispensePrescription, addToast } = useApp();

  const [selectedKitId, setSelectedKitId] = useState<'anaphylaxis' | 'cardiac' | 'trauma'>('cardiac');
  const [targetBay, setTargetBay] = useState('Emergency Trauma Bay 1');
  const [patientRef, setPatientRef] = useState('STAT-UNIDENTIFIED-01');

  const emergencyKits = [
    {
      id: 'cardiac' as const,
      name: 'Code Blue / Cardiac Resuscitation Kit',
      icon: HeartPulse,
      color: 'rose',
      description: 'First-line ACLS protocol box for ventricular fibrillation and asystole',
      items: [
        { medId: 'MED-026', name: 'Adrenaline 1:1000 1mg/ml', qty: 3, unit: 'ampoules' },
        { medId: 'MED-027', name: 'Atropine Sulfate 0.6mg/ml', qty: 3, unit: 'ampoules' },
        { medId: 'MED-028', name: 'Potassium Chloride 15% Conc', qty: 1, unit: 'ampoule' },
      ],
      turnaround: '< 90 seconds',
    },
    {
      id: 'anaphylaxis' as const,
      name: 'Anaphylaxis & Acute Hypersensitivity Pack',
      icon: Siren,
      color: 'amber',
      description: 'Stat intervention pack for severe drug reaction or respiratory collapse',
      items: [
        { medId: 'MED-026', name: 'Adrenaline 1:1000 1mg/ml', qty: 2, unit: 'ampoules' },
        { medId: 'MED-017', name: 'Hydrocortisone 100mg Vial', qty: 1, unit: 'vial' },
        { medId: 'MED-022', name: 'Salbutamol 5mg/ml Solution', qty: 2, unit: 'vials' },
      ],
      turnaround: '< 60 seconds',
    },
    {
      id: 'trauma' as const,
      name: 'Acute Trauma & Post-Reduction Analgesia Box',
      icon: Zap,
      color: 'teal',
      description: 'Controlled analgesia buffer for acute orthopedic fracture reductions',
      items: [
        { medId: 'MED-006', name: 'Paracetamol IV 10mg/ml 100ml', qty: 2, unit: 'bottles' },
        { medId: 'MED-007', name: 'Tramadol HCl 50mg/ml Ampoule', qty: 2, unit: 'ampoules' },
        { medId: 'MED-014', name: 'Ondansetron 4mg/2ml Injection', qty: 1, unit: 'ampoule' },
      ],
      turnaround: '< 2 minutes',
    },
  ];

  const activeKit = emergencyKits.find((k) => k.id === selectedKitId) || emergencyKits[0];

  const handleDispatch = () => {
    const dispenseItems = activeKit.items.map((it) => ({
      medicineId: it.medId,
      quantity: it.qty,
    }));

    const success = dispensePrescription(
      patientRef,
      `EMG-${Math.floor(1000 + Math.random() * 9000)}`,
      'Emergency Resident On-Duty',
      targetBay,
      dispenseItems,
      `STAT DISPATCH: ${activeKit.name}`
    );

    if (success) {
      addToast('STAT Emergency Box Dispatched', `${activeKit.name} dispatched to ${targetBay}`, 'error');
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="STAT Emergency Trauma & Code Blue Indent"
      subtitle="Rapid-response pre-configured critical formulary bundles for acute clinical stabilization"
      maxWidth="xl"
    >
      <div className="space-y-4">
        {/* Kit Selector Cards */}
        <div className="space-y-2.5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Select Standard Emergency Bundle:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {emergencyKits.map((kit) => {
              const isSelected = selectedKitId === kit.id;
              const Icon = kit.icon;

              return (
                <button
                  key={kit.id}
                  onClick={() => setSelectedKitId(kit.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/30 ring-1 ring-rose-400'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`p-1.5 rounded-lg ${
                        isSelected
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 font-mono">
                      {kit.turnaround}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">
                    {kit.name}
                  </h4>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Kit Preview & Inventory Items */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {activeKit.name}
                </h4>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{activeKit.description}</p>
            </div>
            <Badge variant="danger" size="sm">
              STAT Priority
            </Badge>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Bundle Components ({activeKit.items.length} SKUs):
            </span>
            {activeKit.items.map((it, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60"
              >
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {it.name}
                </span>
                <span className="font-bold text-rose-600 dark:text-rose-400 tabular-nums">
                  {it.qty} {it.unit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Patient & Bay Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Destination Bay / Resuscitation Room *
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <select
                value={targetBay}
                onChange={(e) => setTargetBay(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
              >
                <option value="Emergency Trauma Bay 1">Emergency Trauma Bay 1</option>
                <option value="Emergency Trauma Bay 2">Emergency Trauma Bay 2</option>
                <option value="ICU Bedside 3B">ICU Bedside 3B</option>
                <option value="Cath Lab Emergency">Cath Lab Emergency</option>
                <option value="Operation Theater 4">Operation Theater 4</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Patient Identifier / Trauma Tag
            </label>
            <input
              type="text"
              value={patientRef}
              onChange={(e) => setPatientRef(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono focus:outline-none"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
          <span className="text-[11px] text-slate-400">
            Automated stock deduction & rapid pharmacist runner dispatch
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-medium rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDispatch}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-md animate-pulse"
            >
              <Send className="w-3.5 h-3.5" />
              <span>DISPATCH STAT KIT NOW</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
