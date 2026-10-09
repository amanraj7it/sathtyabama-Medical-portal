import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge, BadgeVariant } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { DataTable, Column } from '../components/common/DataTable';
import { PurchaseOrder, Supplier } from '../data/mockData';
import {
  Truck,
  Plus,
  Star,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  FileText,
  Search,
  Check,
  PackageCheck
} from 'lucide-react';
import { motion } from 'motion/react';

export const Suppliers: React.FC = () => {
  const {
    suppliers,
    purchaseOrders,
    medicines,
    createPurchaseOrder,
    updatePurchaseOrderStatus,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'directory'>('orders');
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewPOModalOpen, setIsNewPOModalOpen] = useState(false);

  // New PO form state
  const [selectedSupplierId, setSelectedSupplierId] = useState(suppliers[0]?.id || 'SUP-001');
  const [poItems, setPoItems] = useState([
    { medicineName: medicines[0]?.name || 'Amoxicillin 625mg', quantity: 500, unitPrice: 18.5 }
  ]);
  const [expectedDate, setExpectedDate] = useState('2026-10-10');

  const filteredSuppliers = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOrders = purchaseOrders.filter(
    (po) =>
      po.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddItemToPO = () => {
    setPoItems([
      ...poItems,
      { medicineName: medicines[1]?.name || 'Ceftriaxone 1g', quantity: 200, unitPrice: 62.0 }
    ]);
  };

  const handleRemovePOItem = (index: number) => {
    if (poItems.length > 1) {
      setPoItems(poItems.filter((_, i) => i !== index));
    }
  };

  const handlePOItemChange = (index: number, field: string, val: any) => {
    setPoItems(
      poItems.map((item, i) => {
        if (i !== index) return item;
        return { ...item, [field]: val };
      })
    );
  };

  const handleCreatePOSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sup = suppliers.find((s) => s.id === selectedSupplierId);
    if (!sup) return;

    createPurchaseOrder(
      sup.id,
      sup.name,
      poItems.map((it) => ({
        medicineName: it.medicineName,
        quantity: Number(it.quantity),
        unitPrice: Number(it.unitPrice)
      })),
      expectedDate
    );
    setIsNewPOModalOpen(false);
  };

  // PO Table Columns
  const poColumns: Column<PurchaseOrder>[] = [
    {
      key: 'poNumber',
      header: 'PO Reference',
      render: (po) => (
        <div>
          <span className="font-mono text-xs font-bold text-slate-900 dark:text-slate-100">
            {po.poNumber}
          </span>
          <p className="text-[11px] text-slate-500">Issued: {po.createdDate}</p>
        </div>
      )
    },
    {
      key: 'supplierName',
      header: 'Supplier & Contact',
      render: (po) => (
        <div>
          <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs">
            {po.supplierName}
          </span>
          <p className="text-[11px] text-slate-400">Exp. Delivery: {po.expectedDelivery}</p>
        </div>
      )
    },
    {
      key: 'items',
      header: 'Medicines Ordered',
      render: (po) => (
        <div className="max-w-[240px]">
          <span className="text-xs font-medium text-slate-700 dark:text-slate-300 block truncate">
            {po.items.map((i) => `${i.medicineName} (${i.quantity})`).join(', ')}
          </span>
          <span className="text-[11px] text-slate-400">
            {po.items.length} line item(s) · {po.totalQuantity} total units
          </span>
        </div>
      )
    },
    {
      key: 'totalValue',
      header: 'PO Value',
      align: 'right',
      render: (po) => (
        <div className="text-right">
          <span className="font-bold text-slate-900 dark:text-slate-100 text-xs tabular-nums">
            ₹{po.totalValue.toLocaleString()}
          </span>
          <p className="text-[10px] text-slate-400">Institutional Net</p>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (po) => {
        let variant: BadgeVariant = 'neutral';
        if (po.status === 'Delivered') variant = 'success';
        if (po.status === 'Approved') variant = 'primary';
        if (po.status === 'Pending') variant = 'warning';

        return <Badge variant={variant}>{po.status}</Badge>;
      }
    },
    {
      key: 'actions',
      header: 'Workflow Action',
      align: 'right',
      render: (po) => (
        <div className="flex items-center justify-end gap-1.5">
          {po.status === 'Pending' && (
            <button
              onClick={() => updatePurchaseOrderStatus(po.id, 'Approved')}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800 hover:bg-teal-100"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Approve PO</span>
            </button>
          )}

          {po.status === 'Approved' && (
            <button
              onClick={() => updatePurchaseOrderStatus(po.id, 'Delivered')}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100"
            >
              <PackageCheck className="w-3.5 h-3.5" />
              <span>Mark Delivered</span>
            </button>
          )}

          {po.status === 'Delivered' && (
            <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Received
            </span>
          )}
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Suppliers & Purchase Orders
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Institutional pharmaceutical vendor directory and automated replenishment contracts
          </p>
        </div>

        <button
          onClick={() => setIsNewPOModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-teal-700 hover:bg-teal-800 text-white shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>New Purchase Order</span>
        </button>
      </div>

      {/* Tabs and Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'orders'
                ? 'bg-white dark:bg-slate-700 text-teal-800 dark:text-teal-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Purchase Orders ({purchaseOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('directory')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'directory'
                ? 'bg-white dark:bg-slate-700 text-teal-800 dark:text-teal-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Suppliers Directory ({suppliers.length})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              activeTab === 'orders'
                ? 'Search PO # or supplier...'
                : 'Search supplier name, city...'
            }
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Content depending on Tab */}
      {activeTab === 'orders' ? (
        <DataTable
          columns={poColumns}
          data={filteredOrders}
          keyExtractor={(item) => item.id}
          emptyMessage="No matching purchase orders found."
        />
      ) : (
        /* Suppliers Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSuppliers.map((sup) => (
            <div
              key={sup.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {sup.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Contact: {sup.contactPerson}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 px-2 py-0.5 rounded-lg text-amber-800 dark:text-amber-300 text-xs font-bold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{sup.rating}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{sup.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{sup.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{sup.location}</span>
                  </div>
                </div>

                {/* Categories supplied */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {sup.categories.map((c) => (
                    <span
                      key={c}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  {sup.totalOrders} total orders ({sup.activeOrders} active)
                </span>
                <span className="font-semibold text-teal-700 dark:text-teal-400">
                  {sup.paymentTerms}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Purchase Order Modal */}
      <Modal
        isOpen={isNewPOModalOpen}
        onClose={() => setIsNewPOModalOpen(false)}
        title="Issue New Purchase Order"
        subtitle="Initiate institutional replenishment with registered supplier"
        maxWidth="xl"
      >
        <form onSubmit={handleCreatePOSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Select Supplier *
              </label>
              <select
                value={selectedSupplierId}
                onChange={(e) => setSelectedSupplierId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
              >
                {suppliers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.location})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Expected Delivery Date *
              </label>
              <input
                type="date"
                required
                value={expectedDate}
                onChange={(e) => setExpectedDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                PO Line Items
              </span>
              <button
                type="button"
                onClick={handleAddItemToPO}
                className="text-xs text-teal-700 dark:text-teal-400 font-semibold hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Medicine
              </button>
            </div>

            <div className="space-y-2">
              {poItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/40 text-xs"
                >
                  <select
                    value={item.medicineName}
                    onChange={(e) => {
                      const med = medicines.find((m) => m.name === e.target.value);
                      handlePOItemChange(idx, 'medicineName', e.target.value);
                      if (med) handlePOItemChange(idx, 'unitPrice', med.unitPrice);
                    }}
                    className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                  >
                    {medicines.map((m) => (
                      <option key={m.id} value={m.name}>
                        {m.name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handlePOItemChange(idx, 'quantity', Number(e.target.value))
                    }
                    placeholder="Qty"
                    className="w-24 px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-center font-semibold"
                  />

                  <div className="w-28 text-right font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                    ₹{(item.quantity * item.unitPrice).toLocaleString()}
                  </div>

                  {poItems.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePOItem(idx)}
                      className="p-1 text-slate-400 hover:text-rose-600"
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900 flex justify-between text-xs">
            <span className="font-semibold text-teal-900 dark:text-teal-200">
              Estimated Total Order Value:
            </span>
            <span className="font-bold text-teal-900 dark:text-teal-200 tabular-nums">
              ₹
              {poItems
                .reduce((acc, it) => acc + it.quantity * it.unitPrice, 0)
                .toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsNewPOModalOpen(false)}
              className="px-4 py-2 text-xs font-medium rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-teal-700 hover:bg-teal-800 text-white shadow-xs"
            >
              Transmit Purchase Order
            </button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
};
