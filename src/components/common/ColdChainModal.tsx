import React, { useState } from 'react';
import { Modal } from './Modal';
import { Badge } from './Badge';
import {
  Thermometer,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Download,
  Wifi,
  DoorClosed,
  Zap,
  Clock
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { useApp } from '../../context/AppContext';

interface ColdChainModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ColdChainModal: React.FC<ColdChainModalProps> = ({ isOpen, onClose }) => {
  const { addToast } = useApp();
  const [selectedUnit, setSelectedUnit] = useState<string>('FRIDGE-A1');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const units = [
    {
      id: 'FRIDGE-A1',
      name: 'Central Vaccine & Biologics Chiller A1',
      currentTemp: 3.8,
      targetRange: '2.0°C - 8.0°C',
      status: 'Optimal',
      humidity: '42%',
      doorStatus: 'Closed',
      powerState: 'Grid Active (UPS 100%)',
      lastPing: '12 seconds ago',
    },
    {
      id: 'FRIDGE-B2',
      name: 'Insulin & Emergency Buffer Unit B2',
      currentTemp: 4.1,
      targetRange: '2.0°C - 8.0°C',
      status: 'Optimal',
      humidity: '44%',
      doorStatus: 'Closed',
      powerState: 'Grid Active (UPS 100%)',
      lastPing: '25 seconds ago',
    },
    {
      id: 'FREEZER-C3',
      name: 'Deep Freeze Cryo-Plasma Vault C3',
      currentTemp: -19.4,
      targetRange: '-25.0°C to -15.0°C',
      status: 'Optimal',
      humidity: '35%',
      doorStatus: 'Closed',
      powerState: 'Dual Redundant Inverter',
      lastPing: '10 seconds ago',
    },
    {
      id: 'SAFE-D4',
      name: 'Controlled Narcotic Safe (Room Temp)',
      currentTemp: 21.2,
      targetRange: '20.0°C - 25.0°C',
      status: 'Optimal',
      humidity: '48%',
      doorStatus: 'Secured & Locked',
      powerState: 'Normal',
      lastPing: '5 seconds ago',
    },
  ];

  // 24-hour mock temperature log
  const telemetryData = [
    { time: '00:00', temp: 3.6, min: 2.0, max: 8.0 },
    { time: '02:00', temp: 3.7, min: 2.0, max: 8.0 },
    { time: '04:00', temp: 3.5, min: 2.0, max: 8.0 },
    { time: '06:00', temp: 3.9, min: 2.0, max: 8.0 },
    { time: '08:00', temp: 4.4, min: 2.0, max: 8.0 }, // Morning shift stock opening
    { time: '10:00', temp: 4.6, min: 2.0, max: 8.0 },
    { time: '12:00', temp: 4.1, min: 2.0, max: 8.0 },
    { time: '14:00', temp: 4.3, min: 2.0, max: 8.0 },
    { time: '16:00', temp: 4.0, min: 2.0, max: 8.0 },
    { time: '18:00', temp: 3.9, min: 2.0, max: 8.0 },
    { time: '20:00', temp: 3.8, min: 2.0, max: 8.0 },
    { time: '22:00', temp: 3.8, min: 2.0, max: 8.0 },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      addToast('IoT Telemetry Synced', 'All 4 cold-chain wireless sensor nodes responding with 0 deviation', 'success');
    }, 600);
  };

  const handleExportAudit = () => {
    addToast('Audit Log Downloaded', 'Sathyabama Hospital 24h Cold-Chain Sensor Certificate generated', 'info');
  };

  const activeUnitData = units.find((u) => u.id === selectedUnit) || units[0];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="IoT Cold-Chain & Vault Temperature Hub"
      subtitle="Real-time biological cold-chain surveillance complying with WHO / CDSCO standards"
      maxWidth="2xl"
    >
      <div className="space-y-5">
        {/* Top Summary Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-700 text-white shadow-xs">
              <Thermometer className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-teal-950 dark:text-teal-100">
                  Formulary Cold-Chain: 100% Compliant
                </span>
                <Badge variant="success" size="sm">
                  Active Realtime
                </Badge>
              </div>
              <p className="text-xs text-teal-800/80 dark:text-teal-300/80 mt-0.5">
                4 connected BLE sensor loggers broadcasting on hospital IoT mesh
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-200 hover:bg-teal-50 transition-colors shadow-2xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Sync Sensors</span>
            </button>
            <button
              onClick={handleExportAudit}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-700 text-white hover:bg-teal-800 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Log</span>
            </button>
          </div>
        </div>

        {/* 4 Sensor Units Selector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {units.map((unit) => {
            const isSelected = selectedUnit === unit.id;
            return (
              <button
                key={unit.id}
                onClick={() => setSelectedUnit(unit.id)}
                className={`p-3 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? 'bg-white dark:bg-slate-800 border-teal-600 dark:border-teal-400 shadow-sm ring-1 ring-teal-500'
                    : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                  <span className="font-mono">{unit.id}</span>
                  <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online
                  </span>
                </div>

                <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                  {unit.name.split(' ')[0]} {unit.name.split(' ')[1]}
                </p>

                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-xl font-black tabular-nums text-teal-700 dark:text-teal-300">
                    {unit.currentTemp > 0 ? `+${unit.currentTemp}` : unit.currentTemp}°C
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Target: {unit.targetRange.split(' ')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Sensor Telemetry & Chart */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {activeUnitData.name} — 24-Hour Telemetry Log
              </h3>
              <p className="text-xs text-slate-500">
                Safe window: {activeUnitData.targetRange} · Last packet: {activeUnitData.lastPing}
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <DoorClosed className="w-3.5 h-3.5 text-slate-400" />
                {activeUnitData.doorStatus}
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-emerald-500" />
                {activeUnitData.powerState.split(' ')[0]}
              </span>
            </div>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={telemetryData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} opacity={0.5} />
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis
                  domain={[0, 10]}
                  tick={{ fontSize: 10, fill: '#94A3B8' }}
                  axisLine={false}
                  tickLine={false}
                  unit="°C"
                />
                <Tooltip
                  formatter={(val: any) => [`${val}°C`, 'Recorded Temperature']}
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#1E293B',
                    borderRadius: '10px',
                    color: '#F8FAFC',
                    fontSize: '11px',
                  }}
                />
                <ReferenceLine y={2.0} stroke="#EF4444" strokeDasharray="3 3" label={{ value: 'Min 2°C', fill: '#EF4444', fontSize: 10 }} />
                <ReferenceLine y={8.0} stroke="#EF4444" strokeDasharray="3 3" label={{ value: 'Max 8°C', fill: '#EF4444', fontSize: 10 }} />
                <Line
                  type="monotone"
                  dataKey="temp"
                  name="Temperature"
                  stroke="#0F766E"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#0F766E' }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Footer Note */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            Automated SMS alert dispatched to On-Duty Pharmacist if temp exceeds 7.8°C for &gt;5 mins
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </Modal>
  );
};
