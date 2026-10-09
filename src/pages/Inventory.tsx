import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Medicine } from '../data/mockData';
import { DataTable, Column } from '../components/common/DataTable';
import { Badge, BadgeVariant } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { BarcodeScannerModal } from '../components/common/BarcodeScannerModal';
import {
  Search,
  Plus,
  Filter,
  Download,
  Edit2,
  Trash2,
  PlusCircle,
  AlertTriangle,
  Calendar,
  Layers,
  CheckCircle2,
  FileSpreadsheet,
  ScanLine
} from 'lucide-react';
import { motion } from 'motion/react';
import { useSearchParams } from 'react-router-dom';

export const Inventory: React.FC = () => {
  const {
    medicines,
    suppliers,
    addMedicine,
    updateMedicine,
    deleteMedicine,
    restockMedicine,
    addToast
  } = useApp();

  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  // Filter States
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modals state
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
  const [deletingMedicine, setDeletingMedicine] = useState<Medicine | null>(null);
  const [restockingMedicine, setRestockingMedicine] = useState<Medicine | null>(null);
  const [restockQty, setRestockQty] = useState<number>(100);

  // Form State for Add/Edit
  const [formData, setFormData] = useState({
    name: '',
    brandName: '',
    category: 'Antibiotics' as Medicine['category'],
    batchNumber: '',
    supplier: suppliers[0]?.name || 'Sun Pharma Clinical Ltd',
    supplierId: suppliers[0]?.id || 'SUP-001',
    quantity: 100,
    threshold: 50,
    unitPrice: 25.0,
    unit: 'tablets',
    expiryDate: '2027-06-30',
    storage: 'Room Temp (20-25°C)'
  });

  const categories = [
    'All',
    'Antibiotics',
    'Analgesics',
    'Injections',
    'Vitamins',
    'Cardiovascular',
    'Respiratory',
    'Antidiabetic',
    'Emergency'
  ];

  const statuses = ['All', 'In Stock', 'Low Stock', 'Out of Stock', 'Expired'];

  // Filtered dataset
  const filteredMedicines = useMemo(() => {
    return medicines.filter((med) => {
      const matchesSearch =
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.supplier.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === 'All' || med.category === categoryFilter;

      const matchesStatus =
        statusFilter === 'All' || med.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [medicines, searchTerm, categoryFilter, statusFilter]);

  // Paginated dataset
  const paginatedMedicines = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredMedicines.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredMedicines, currentPage]);

  const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);

  // Calculations for Expiry countdown
  const getExpiryCountdown = (expiryDateStr: string) => {
    const exp = new Date(expiryDateStr);
    const today = new Date();
    const diffTime = exp.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      return {
        label: `Expired ${Math.abs(diffDays)}d ago`,
        isExpired: true,
        isWarning: false
      };
    }
    if (diffDays <= 30) {
      return {
        label: `Expires in ${diffDays}d`,
        isExpired: false,
        isWarning: true
      };
    }
    return {
      label: `${Math.floor(diffDays / 30)} mos left`,
      isExpired: false,
      isWarning: false
    };
  };

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      brandName: '',
      category: 'Antibiotics',
      batchNumber: `BAT-2026-${Math.floor(100 + Math.random() * 900)}`,
      supplier: suppliers[0]?.name || '',
      supplierId: suppliers[0]?.id || '',
      quantity: 150,
      threshold: 50,
      unitPrice: 35.0,
      unit: 'tablets',
      expiryDate: '2027-10-15',
      storage: 'Room Temp (20-25°C)'
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (med: Medicine) => {
    setEditingMedicine(med);
    setFormData({
      name: med.name,
      brandName: med.brandName,
      category: med.category,
      batchNumber: med.batchNumber,
      supplier: med.supplier,
      supplierId: med.supplierId,
      quantity: med.quantity,
      threshold: med.threshold,
      unitPrice: med.unitPrice,
      unit: med.unit,
      expiryDate: med.expiryDate,
      storage: med.storage
    });
  };

  const handleSubmitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.batchNumber) {
      addToast('Validation Error', 'Please enter medicine name and batch number', 'warning');
      return;
    }
    const sup = suppliers.find((s) => s.name === formData.supplier);
    addMedicine({
      name: formData.name,
      brandName: formData.brandName || formData.name,
      category: formData.category,
      batchNumber: formData.batchNumber,
      supplier: formData.supplier,
      supplierId: sup?.id || 'SUP-001',
      quantity: Number(formData.quantity),
      threshold: Number(formData.threshold),
      unitPrice: Number(formData.unitPrice),
      unit: formData.unit,
      expiryDate: formData.expiryDate,
      storage: formData.storage,
      status: Number(formData.quantity) <= Number(formData.threshold) ? 'Low Stock' : 'In Stock'
    });
    setIsAddModalOpen(false);
  };

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMedicine) return;
    updateMedicine(editingMedicine.id, {
      name: formData.name,
      brandName: formData.brandName,
      category: formData.category,
      batchNumber: formData.batchNumber,
      supplier: formData.supplier,
      quantity: Number(formData.quantity),
      threshold: Number(formData.threshold),
      unitPrice: Number(formData.unitPrice),
      unit: formData.unit,
      expiryDate: formData.expiryDate,
      storage: formData.storage
    });
    setEditingMedicine(null);
  };

  const handleConfirmDelete = () => {
    if (deletingMedicine) {
      deleteMedicine(deletingMedicine.id);
      setDeletingMedicine(null);
    }
  };

  const handleConfirmRestock = () => {
    if (restockingMedicine && restockQty > 0) {
      restockMedicine(restockingMedicine.id, restockQty);
      setRestockingMedicine(null);
      setRestockQty(100);
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID,Name,Brand,Category,Batch,Supplier,Stock,Threshold,Unit Price,Expiry,Status'];
    const rows = filteredMedicines.map((m) =>
      `"${m.id}","${m.name}","${m.brandName}","${m.category}","${m.batchNumber}","${m.supplier}",${m.quantity},${m.threshold},${m.unitPrice},"${m.expiryDate}","${m.status}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Sathyabama_Inventory_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('CSV Exported', `Generated report with ${filteredMedicines.length} medicine records`, 'success');
  };

  // Table Columns Definition
  const columns: Column<Medicine>[] = [
    {
      key: 'name',
      header: 'Medicine & Brand',
      render: (med) => (
        <div>
          <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
            {med.name}
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            <span className="font-medium text-teal-700 dark:text-teal-400">
              {med.brandName}
            </span>
            <span aria-hidden="true">·</span>
            <span>{med.category}</span>
          </div>
        </div>
      )
    },
    {
      key: 'batchNumber',
      header: 'Batch / Lot',
      render: (med) => (
        <div>
          <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
            {med.batchNumber}
          </span>
          <p className="text-[11px] text-slate-400 truncate max-w-[130px]">
            {med.supplier}
          </p>
        </div>
      )
    },
    {
      key: 'stockLevel',
      header: 'Stock & Threshold',
      render: (med) => {
        const percent = Math.min(Math.round((med.quantity / (med.threshold * 2.5)) * 100), 100);
        const isBelowThreshold = med.quantity <= med.threshold;

        return (
          <div className="min-w-[120px]">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-slate-800 dark:text-slate-100 tabular-nums">
                {med.quantity} {med.unit}
              </span>
              <span className="text-[10px] text-slate-400 tabular-nums">
                min {med.threshold}
              </span>
            </div>
            {/* Progress bar showing stock level vs threshold */}
            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  med.quantity === 0
                    ? 'bg-rose-500'
                    : isBelowThreshold
                    ? 'bg-amber-500'
                    : 'bg-teal-600'
                }`}
                style={{ width: `${Math.max(percent, 4)}%` }}
              />
            </div>
          </div>
        );
      }
    },
    {
      key: 'unitPrice',
      header: 'Unit Price',
      align: 'right',
      render: (med) => (
        <div className="text-right">
          <span className="font-bold text-slate-800 dark:text-slate-100 tabular-nums text-xs">
            ₹{med.unitPrice.toFixed(2)}
          </span>
          <p className="text-[10px] text-slate-400">per {med.unit.replace(/s$/, '')}</p>
        </div>
      )
    },
    {
      key: 'expiryDate',
      header: 'Expiry Date',
      render: (med) => {
        const { label, isExpired, isWarning } = getExpiryCountdown(med.expiryDate);
        return (
          <div>
            <span className="font-medium text-slate-700 dark:text-slate-300 text-xs tabular-nums block">
              {med.expiryDate}
            </span>
            <span
              className={`text-[11px] font-medium tabular-nums ${
                isExpired
                  ? 'text-rose-600 dark:text-rose-400 font-semibold'
                  : isWarning
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-slate-400'
              }`}
            >
              {label}
            </span>
          </div>
        );
      }
    },
    {
      key: 'status',
      header: 'Status',
      render: (med) => {
        let variant: BadgeVariant = 'neutral';
        if (med.status === 'In Stock') variant = 'success';
        else if (med.status === 'Low Stock') variant = 'warning';
        else if (med.status === 'Out of Stock') variant = 'danger';
        else if (med.status === 'Expired') variant = 'danger';

        return <Badge variant={variant}>{med.status}</Badge>;
      }
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (med) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => setRestockingMedicine(med)}
            className="p-1.5 rounded-lg text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/50 transition-colors"
            title="Inward Restock"
          >
            <PlusCircle className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleOpenEdit(med)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Edit Medicine"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeletingMedicine(med)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
            title="Delete Medicine"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Medicine Inventory
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Central repository of pharmaceutical stocks, lot traceability, and expiry thresholds
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
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-2xs"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-teal-700 hover:bg-teal-800 text-white transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Medicine</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by name, brand, batch lot, or supplier..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        {/* Category Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 hidden sm:inline">
            Category:
          </span>
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 hidden sm:inline">
            Status:
          </span>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Inventory Table */}
      <DataTable
        columns={columns}
        data={paginatedMedicines}
        keyExtractor={(item) => item.id}
        emptyMessage="No medicines match your search filters."
        pagination={{
          currentPage,
          totalPages,
          totalItems: filteredMedicines.length,
          itemsPerPage,
          onPageChange: setCurrentPage
        }}
      />

      {/* Add Medicine Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Medicine SKU"
        subtitle="Register new batch into hospital central pharmacy inventory"
        maxWidth="xl"
      >
        <form onSubmit={handleSubmitAdd} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Generic Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Cefixime 200mg Tab"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Brand / Trade Name
              </label>
              <input
                type="text"
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                placeholder="e.g. Zifi 200"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as Medicine['category'] })
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                {categories.filter((c) => c !== 'All').map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Batch / Lot Number *
              </label>
              <input
                type="text"
                required
                value={formData.batchNumber}
                onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Supplier
              </label>
              <select
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                {suppliers.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Initial Stock
              </label>
              <input
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Threshold Min
              </label>
              <input
                type="number"
                min="1"
                value={formData.threshold}
                onChange={(e) => setFormData({ ...formData, threshold: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Unit Price (₹)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.unitPrice}
                onChange={(e) => setFormData({ ...formData, unitPrice: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Unit Type
              </label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                <option value="tablets">tablets</option>
                <option value="vials">vials</option>
                <option value="ampoules">ampoules</option>
                <option value="bottles">bottles</option>
                <option value="prefilled syringes">prefilled syringes</option>
                <option value="sachets">sachets</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Expiry Date *
              </label>
              <input
                type="date"
                required
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Storage Requirement
              </label>
              <select
                value={formData.storage}
                onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                <option value="Room Temp (20-25°C)">Room Temp (20-25°C)</option>
                <option value="Refrigerated (2-8°C)">Refrigerated (2-8°C)</option>
                <option value="Cool & Dry (<25°C)">Cool & Dry (&lt;25°C)</option>
                <option value="Controlled Substance Safe">Controlled Substance Safe</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs font-medium rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-teal-700 hover:bg-teal-800 text-white transition-colors shadow-xs"
            >
              Register Medicine
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Medicine Modal */}
      <Modal
        isOpen={!!editingMedicine}
        onClose={() => setEditingMedicine(null)}
        title="Edit Medicine Parameters"
        subtitle={`Updating SKU ${editingMedicine?.id}`}
        maxWidth="lg"
      >
        <form onSubmit={handleSubmitEdit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Medicine Generic Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Current Stock ({formData.unit})
              </label>
              <input
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Threshold Alert Limit
              </label>
              <input
                type="number"
                min="1"
                value={formData.threshold}
                onChange={(e) => setFormData({ ...formData, threshold: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Unit Price (₹)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.unitPrice}
                onChange={(e) => setFormData({ ...formData, unitPrice: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Expiry Date
              </label>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setEditingMedicine(null)}
              className="px-4 py-2 text-xs font-medium rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-teal-700 hover:bg-teal-800 text-white shadow-xs"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* Restock Modal */}
      <Modal
        isOpen={!!restockingMedicine}
        onClose={() => setRestockingMedicine(null)}
        title="Inward Stock Replenishment"
        subtitle={`Adding inbound units to ${restockingMedicine?.name}`}
        maxWidth="md"
      >
        <div className="space-y-4">
          <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900 text-xs text-teal-800 dark:text-teal-300">
            Current Stock: <strong>{restockingMedicine?.quantity} {restockingMedicine?.unit}</strong> (Min Threshold: {restockingMedicine?.threshold})
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Additional Units to Add ({restockingMedicine?.unit})
            </label>
            <input
              type="number"
              min="1"
              value={restockQty}
              onChange={(e) => setRestockQty(Math.max(1, Number(e.target.value)))}
              className="w-full px-3 py-2 text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setRestockingMedicine(null)}
              className="px-4 py-2 text-xs font-medium rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmRestock}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-teal-700 hover:bg-teal-800 text-white shadow-xs"
            >
              Confirm Inward Receipt
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deletingMedicine}
        onClose={() => setDeletingMedicine(null)}
        title="Delete Medicine SKU"
        subtitle="Permanent removal from pharmacy catalog"
        maxWidth="sm"
      >
        <div className="space-y-3">
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Are you sure you want to remove <strong>{deletingMedicine?.name}</strong> (Batch: {deletingMedicine?.batchNumber})? This will archive all linked dispensing associations.
          </p>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setDeletingMedicine(null)}
              className="px-3.5 py-1.5 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmDelete}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-xs"
            >
              Confirm Deletion
            </button>
          </div>
        </div>
      </Modal>
      {/* Barcode Scanner Modal */}
      <BarcodeScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onSelectMedicine={(medId) => {
          const med = medicines.find((m) => m.id === medId);
          if (med) {
            setSearchTerm(med.batchNumber);
          }
        }}
      />
    </motion.div>
  );
};
