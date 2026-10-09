import React, { useState } from 'react';
import { Modal } from './Modal';
import { Badge } from './Badge';
import {
  Flame,
  AlertOctagon,
  FileCheck2,
  CheckCircle2,
  Printer,
  ShieldAlert,
  UserCheck
} from 'lucide-react';
import { InventoryAlert } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

interface QuarantineDisposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  alert: InventoryAlert | null;
}

export const QuarantineDisposalModal: React.FC<QuarantineDisposalModalProps> = ({
  isOpen,
  onClose,
  alert,
}) => {
  const { currentUser, addToast } = useApp();
  const [witnessName, setWitnessName] = useState('Sister Mary Anitha, RN');
  const [disposalMethod, setDisposalMethod] = useState('High-Temp Incineration (1100°C) - CPCB Approved Vendor');
  const [isCertified, setIsCertified] = useState(false);

  if (!alert) return null;

  const handleCertifyDisposal = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCertified(true);
    addToast(
      'Quarantine Disposal Certified',
      `Certificate generated for ${alert.medicineName} (Batch: ${alert.batchNumber})`,
      'success'
    );
  };

  const handlePrintCertificate = () => {
    addToast('Certificate Dispatched', 'Biomedical destruction dossier sent to clinical audit printer', 'info');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Biomedical Drug Destruction & Quarantine Protocol"
      subtitle="Formal hazardous pharmaceutical waste disposal according to hospital clinical safety rules"
      maxWidth="lg"
    >
      {!isCertified ? (
        <form onSubmit={handleCertifyDisposal} className="space-y-4">
          <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900 bg-rose-50/60 dark:bg-rose-950/20 space-y-2">
            <div className="flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-rose-600" />
              <h4 className="text-xs font-bold text-rose-900 dark:text-rose-200">
                Item Slated for Destruction: {alert.medicineName}
              </h4>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs text-rose-950/80 dark:text-rose-300">
              <div>
                <span className="text-[10px] text-slate-500 block">Lot Batch</span>
                <span className="font-mono font-bold">{alert.batchNumber}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Quarantined Stock</span>
                <span className="font-bold tabular-nums">{alert.currentStock} units</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Expiration Date</span>
                <span className="font-bold tabular-nums text-rose-600">{alert.expiryDate}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Authorized Pharmacist Signatory
            </label>
            <input
              type="text"
              readOnly
              value={`${currentUser.name} (${currentUser.role})`}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Clinical Quality Witness Staff *
            </label>
            <input
              type="text"
              required
              value={witnessName}
              onChange={(e) => setWitnessName(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Disposal / Neutralization Channel
            </label>
            <select
              value={disposalMethod}
              onChange={(e) => setDisposalMethod(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
            >
              <option value="High-Temp Incineration (1100°C) - CPCB Approved Vendor">
                High-Temp Incineration (1100°C) - CPCB Approved Vendor
              </option>
              <option value="Autoclave & Chemical Shredding Neutralization">
                Autoclave & Chemical Shredding Neutralization
              </option>
              <option value="Encapsulation & Secured Deep Sanitary Landfill">
                Encapsulation & Secured Deep Sanitary Landfill
              </option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-medium rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-xs"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Certify & Quarantine for Disposal</span>
            </button>
          </div>
        </form>
      ) : (
        /* Certificate View */
        <div className="space-y-4">
          <div className="p-4 rounded-xl border-2 border-dashed border-teal-500/40 bg-teal-50/50 dark:bg-teal-950/20 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center mx-auto shadow-md">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Certificate of Pharmaceutical Destruction
            </h4>
            <p className="text-[11px] font-mono text-teal-700 dark:text-teal-400">
              CERT-DISP-SAT-{Math.floor(10000 + Math.random() * 90000)}
            </p>
            <div className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed pt-2">
              Formally confirms that <strong>{alert.currentStock} units</strong> of <strong>{alert.medicineName}</strong> (Batch: {alert.batchNumber}) have been removed from pharmacy catalog and sealed for incineration.
            </div>
            <div className="pt-2 text-[10px] text-slate-400">
              Signatory: {currentUser.name} · Witness: {witnessName}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => {
                setIsCertified(false);
                onClose();
              }}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 rounded-lg"
            >
              Dismiss
            </button>
            <button
              type="button"
              onClick={handlePrintCertificate}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-teal-700 text-white hover:bg-teal-800 transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Official Certificate</span>
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};
