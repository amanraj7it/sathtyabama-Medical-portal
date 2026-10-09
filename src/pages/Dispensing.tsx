import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Badge, BadgeVariant } from '../components/common/Badge';
import { BarcodeScannerModal } from '../components/common/BarcodeScannerModal';
import { EmergencyKitModal } from '../components/common/EmergencyKitModal';
import {
  Send,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Clock,
  User,
  Stethoscope,
  Building,
  FileCheck,
  Printer,
  FileText,
  ScanLine,
  Siren,
  ShieldAlert,
  AlertTriangle,
  Info
} from 'lucide-react';
import { motion } from 'motion/react';

interface PrescriptionLine {
  id: string;
  medicineId: string;
  quantity: number;
  dosage: string;
}

export const Dispensing: React.FC = () => {
  const {
    medicines,
    users,
    dispensingRecords,
    dispensePrescription,
    addToast
  } = useApp();

  // Doctors list
  const doctors = users.filter((u) => u.role === 'Doctor');

  // Modals state
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isEmergencyKitOpen, setIsEmergencyKitOpen] = useState(false);

  // Form State
  const [patientName, setPatientName] = useState('Govindaraj S.');
  const [patientId, setPatientId] = useState('PID-7891');
  const [doctorName, setDoctorName] = useState(
    doctors[0]?.name || 'Dr. K. Senthil Nathan, MD'
  );
  const [ward, setWard] = useState('ICU Ward 3B');
  const [notes, setNotes] = useState('Post-op clinical stabilization order');

  const [lines, setLines] = useState<PrescriptionLine[]>([
    {
      id: 'line-1',
      medicineId: medicines[0]?.id || 'MED-001',
      quantity: 2,
      dosage: '1 tablet BID after food'
    }
  ]);

  const [dispensedSummary, setDispensedSummary] = useState<{
    rxId: string;
    patient: string;
    items: Array<{ name: string; qty: number; unit: string; price: number }>;
    total: number;
  } | null>(null);

  // Wards list
  const hospitalWards = [
    'ICU Ward 3B',
    'Emergency & Trauma Care',
    'Cardiology Daycare',
    'Pediatrics Ward 2B',
    'General Medical Ward',
    'Orthopedics Post-Op',
    'Oncology Chemotherapy Unit',
    'Post-Op Surgery 5C'
  ];

  const handleAddLine = () => {
    const availableMed = medicines.find((m) => m.quantity > 0 && m.status !== 'Expired') || medicines[0];
    setLines([
      ...lines,
      {
        id: `line-${Date.now()}`,
        medicineId: availableMed.id,
        quantity: 1,
        dosage: '1 unit daily'
      }
    ]);
  };

  const handleAddMedicineFromScanner = (medId: string) => {
    setLines((prev) => [
      ...prev,
      {
        id: `line-${Date.now()}`,
        medicineId: medId,
        quantity: 1,
        dosage: '1 unit stat as scanned'
      }
    ]);
    addToast('Added via Optical Scan', 'Scanned medication appended to prescription lines', 'success');
  };

  const handleRemoveLine = (id: string) => {
    if (lines.length > 1) {
      setLines(lines.filter((l) => l.id !== id));
    }
  };

  const handleUpdateLine = (id: string, updates: Partial<PrescriptionLine>) => {
    setLines(lines.map((l) => (l.id === id ? { ...l, ...updates } : l)));
  };

  // Drug-Drug Interaction Clinical Checker
  const activeInteractions = useMemo(() => {
    const selectedMedIds = lines.map((l) => l.medicineId);
    const interactions: Array<{
      pair: [string, string];
      severity: 'high' | 'moderate' | 'info';
      title: string;
      desc: string;
    }> = [];

    const hasTramadol = selectedMedIds.includes('MED-007');
    const hasFentanyl = selectedMedIds.includes('MED-009');
    const hasPotassium = selectedMedIds.includes('MED-028');
    const hasFurosemide = selectedMedIds.includes('MED-021');
    const hasInsulin = selectedMedIds.includes('MED-024');
    const hasMetformin = selectedMedIds.includes('MED-025');

    if (hasTramadol && hasFentanyl) {
      interactions.push({
        pair: ['Tramadol HCl', 'Fentanyl Citrate'],
        severity: 'high',
        title: 'Severe Opioid Synergism Risk',
        desc: 'Concomitant administration elevates risk of profound CNS depression and respiratory compromise. Continuous pulse oximetry mandated.'
      });
    }

    if (hasPotassium && hasFurosemide) {
      interactions.push({
        pair: ['Potassium Chloride', 'Furosemide IV'],
        severity: 'moderate',
        title: 'Electrolyte Shift / Loop Diuretic Antagonism',
        desc: 'Loop diuretic will accelerate renal potassium clearance. Re-check serum K+ within 4 hours.'
      });
    }

    if (hasInsulin && hasMetformin) {
      interactions.push({
        pair: ['Insulin Glargine', 'Metformin ER'],
        severity: 'info',
        title: 'Additive Hypoglycemic Action',
        desc: 'Expected dual antidiabetic synergy. Verify bedside capillary blood glucose before mealtime.'
      });
    }

    return interactions;
  }, [lines]);

  // Validation checks for live display
  const lineValidations = lines.map((l) => {
    const med = medicines.find((m) => m.id === l.medicineId);
    if (!med) {
      return { isValid: false, message: 'Invalid medicine selected', isExpired: false };
    }
    if (med.status === 'Expired') {
      return { isValid: false, message: `EXPIRED on ${med.expiryDate}. Dispensing blocked!`, isExpired: true };
    }
    if (med.quantity < l.quantity) {
      return { isValid: false, message: `Only ${med.quantity} ${med.unit} in stock (requested ${l.quantity})`, isExpired: false };
    }
    return { isValid: true, message: `${med.quantity} available in stock (${med.storage})`, isExpired: false };
  });

  const hasAnyInvalid = lineValidations.some((v) => !v.isValid);

  const handleDispense = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasAnyInvalid) {
      addToast('Validation Blocked', 'Please fix expired or insufficient stock lines before dispensing', 'error');
      return;
    }

    const items = lines.map((l) => ({
      medicineId: l.medicineId,
      quantity: Number(l.quantity)
    }));

    const success = dispensePrescription(
      patientName,
      patientId,
      doctorName,
      ward,
      items,
      notes
    );

    if (success) {
      const summaryItems = lines.map((l) => {
        const med = medicines.find((m) => m.id === l.medicineId)!;
        return {
          name: med.name,
          qty: l.quantity,
          unit: med.unit,
          price: med.unitPrice * l.quantity
        };
      });
      const totalAmount = summaryItems.reduce((acc, curr) => acc + curr.price, 0);

      setDispensedSummary({
        rxId: `RX-SAT-${Math.floor(10000 + Math.random() * 90000)}`,
        patient: `${patientName} (${patientId})`,
        items: summaryItems,
        total: totalAmount
      });

      // Reset form
      setPatientName('Subramaniam V.');
      setPatientId(`PID-${Math.floor(1000 + Math.random() * 9000)}`);
      setLines([
        {
          id: `line-${Date.now()}`,
          medicineId: medicines[0]?.id || 'MED-001',
          quantity: 1,
          dosage: 'Standard clinical order'
        }
      ]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Page Header with Action Triggers */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Prescription Fulfillment & Dispensing
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time pharmacy dispensing with automated cold-chain check, drug interaction analysis, and stock deduction
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsScannerOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-slate-900 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800 hover:bg-teal-50 dark:hover:bg-teal-950/40 transition-colors shadow-2xs"
          >
            <ScanLine className="w-4 h-4 text-teal-600" />
            <span>Scan Barcode</span>
          </button>
          <button
            onClick={() => setIsEmergencyKitOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-rose-600 hover:bg-rose-700 text-white transition-colors shadow-xs"
          >
            <Siren className="w-4 h-4" />
            <span>STAT Emergency Box</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Dispensing Form */}
        <div className="lg:col-span-2 space-y-6">
          <form
            onSubmit={handleDispense}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs space-y-5"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  New Patient Prescription
                </h2>
                <p className="text-xs text-slate-500">
                  Enter electronic indent details and verify live inventory
                </p>
              </div>
              <Badge variant="primary" size="sm">
                Live Inventory Connected
              </Badge>
            </div>

            {/* Drug-Drug Interaction Warning Box if applicable */}
            {activeInteractions.length > 0 && (
              <div className="space-y-2">
                {activeInteractions.map((inter, i) => (
                  <div
                    key={i}
                    className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                      inter.severity === 'high'
                        ? 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200'
                        : 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200'
                    }`}
                  >
                    <AlertTriangle className={`w-4 h-4 shrink-0 mt-0.5 ${inter.severity === 'high' ? 'text-rose-600' : 'text-amber-600'}`} />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold">
                          {inter.title} ({inter.pair.join(' + ')})
                        </span>
                        <Badge variant={inter.severity === 'high' ? 'danger' : 'warning'} size="sm">
                          {inter.severity.toUpperCase()} ALERT
                        </Badge>
                      </div>
                      <p className="text-[11px] mt-1 opacity-90 leading-relaxed">
                        {inter.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Patient & Doctor Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Patient Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Patient Name"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Patient Hospital ID (PID) *
                </label>
                <input
                  type="text"
                  required
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  placeholder="e.g. PID-4819"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Prescribing Doctor
                </label>
                <div className="relative">
                  <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    {doctors.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name} ({d.department})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Inpatient Ward / Unit
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    {hospitalWards.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Medicine Lines List */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Prescribed Medicines ({lines.length})
                </span>
                <button
                  type="button"
                  onClick={handleAddLine}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 dark:text-teal-400 hover:text-teal-800"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Line Item</span>
                </button>
              </div>

              <div className="space-y-3">
                {lines.map((line, index) => {
                  const validation = lineValidations[index];
                  const selectedMed = medicines.find((m) => m.id === line.medicineId);

                  return (
                    <div
                      key={line.id}
                      className={`p-3.5 rounded-xl border transition-all ${
                        !validation.isValid
                          ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-900'
                          : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
                        {/* Medicine Selector */}
                        <div className="sm:col-span-6">
                          <label className="block text-[11px] font-medium text-slate-500 mb-1">
                            Medicine SKU
                          </label>
                          <select
                            value={line.medicineId}
                            onChange={(e) =>
                              handleUpdateLine(line.id, { medicineId: e.target.value })
                            }
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none"
                          >
                            {medicines.map((m) => (
                              <option key={m.id} value={m.id}>
                                {m.name} ({m.quantity} {m.unit} in stock - {m.status})
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Quantity */}
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-medium text-slate-500 mb-1">
                            Dispense Qty
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={line.quantity}
                            onChange={(e) =>
                              handleUpdateLine(line.id, {
                                quantity: Math.max(1, Number(e.target.value))
                              })
                            }
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-semibold focus:outline-none"
                          />
                        </div>

                        {/* Dosage Instructions */}
                        <div className="sm:col-span-3">
                          <label className="block text-[11px] font-medium text-slate-500 mb-1">
                            Dosage / Regimen
                          </label>
                          <input
                            type="text"
                            value={line.dosage}
                            onChange={(e) =>
                              handleUpdateLine(line.id, { dosage: e.target.value })
                            }
                            placeholder="e.g. 1 tab TID"
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none"
                          />
                        </div>

                        {/* Delete Line */}
                        <div className="sm:col-span-1 flex items-end justify-center pt-5">
                          <button
                            type="button"
                            onClick={() => handleRemoveLine(line.id)}
                            disabled={lines.length === 1}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Stock Check Indicator & Warnings */}
                      <div className="mt-2.5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          {validation.isValid ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <AlertCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                          )}
                          <span
                            className={
                              validation.isValid
                                ? 'text-slate-600 dark:text-slate-300'
                                : 'text-rose-600 dark:text-rose-400 font-semibold'
                            }
                          >
                            {validation.message}
                          </span>
                        </div>

                        {selectedMed && (
                          <span className="text-[11px] text-slate-400 font-mono">
                            Batch: {selectedMed.batchNumber} · ₹{selectedMed.unitPrice} / unit
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Clinical Dispensing Notes
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Specific instructions or patient allergy checks..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-500">
                Authorized by Central Hospital Pharmacist
              </span>

              <button
                type="submit"
                disabled={hasAnyInvalid}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-xs text-white bg-teal-700 hover:bg-teal-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all duration-150"
              >
                <Send className="w-4 h-4" />
                <span>Confirm & Dispense Prescription</span>
              </button>
            </div>
          </form>

          {/* Receipt / Dispense Confirmation Card if just dispensed */}
          {dispensedSummary && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-5 shadow-xs"
            >
              <div className="flex items-center justify-between mb-3 border-b border-emerald-200/60 dark:border-emerald-800/40 pb-3">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                  <div>
                    <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                      Fulfillment Receipt: {dispensedSummary.rxId}
                    </h3>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300">
                      Patient: {dispensedSummary.patient}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => addToast('Print Order Sent', 'Prescription receipt dispatched to pharmacy label printer', 'info')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-50 shadow-2xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </button>
              </div>

              <div className="space-y-1.5 text-xs">
                {dispensedSummary.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700 dark:text-slate-300">
                    <span>
                      {it.name} × {it.qty} {it.unit}
                    </span>
                    <span className="font-semibold tabular-nums">
                      ₹{it.price.toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-emerald-200/60 dark:border-emerald-800/40 pt-2 flex justify-between font-bold text-slate-900 dark:text-slate-100">
                  <span>Total Dispensed Value</span>
                  <span className="tabular-nums">₹{dispensedSummary.total.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Sidebar: Recent Prescriptions History */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                Recent Prescriptions
              </h2>
              <FileText className="w-4 h-4 text-teal-600" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Real-time audit log of inpatient indent fulfillment
            </p>

            <div className="space-y-3">
              {dispensingRecords.slice(0, 7).map((rec) => {
                let badgeVariant: BadgeVariant = 'success';
                if (rec.status === 'Pending') badgeVariant = 'warning';
                if (rec.status === 'Rejected') badgeVariant = 'danger';

                return (
                  <div
                    key={rec.id}
                    className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                          {rec.patientName}
                        </p>
                        <p className="text-[11px] text-slate-500 font-mono">
                          {rec.prescriptionId} · {rec.ward}
                        </p>
                      </div>
                      <Badge variant={badgeVariant} size="sm">
                        {rec.status}
                      </Badge>
                    </div>

                    <div className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                      <span className="font-medium text-teal-800 dark:text-teal-400">
                        {rec.medicineName}
                      </span>{' '}
                      <span className="tabular-nums font-semibold">
                        ({rec.quantity} units)
                      </span>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
                      <span>{rec.pharmacist.split(',')[0]}</span>
                      <span>{rec.timestamp}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center mt-4">
            <span className="text-[11px] text-slate-400">
              Total {dispensingRecords.length} prescriptions audited today
            </span>
          </div>
        </div>
      </div>

      {/* Barcode Scanner Modal */}
      <BarcodeScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onSelectMedicine={handleAddMedicineFromScanner}
      />

      {/* STAT Emergency Trauma Kit Modal */}
      <EmergencyKitModal
        isOpen={isEmergencyKitOpen}
        onClose={() => setIsEmergencyKitOpen(false)}
      />
    </motion.div>
  );
};

