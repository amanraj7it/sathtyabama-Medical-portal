import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Medicine,
  Supplier,
  User,
  UserRole,
  DispensingRecord,
  InventoryAlert,
  PurchaseOrder,
  AuditLogItem,
  initialMedicines,
  initialSuppliers,
  initialUsers,
  initialDispensingRecords,
  initialAlerts,
  initialPurchaseOrders,
  initialAuditLogs
} from '../data/mockData';

export interface Toast {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface AppContextType {
  medicines: Medicine[];
  suppliers: Supplier[];
  users: User[];
  dispensingRecords: DispensingRecord[];
  alerts: InventoryAlert[];
  purchaseOrders: PurchaseOrder[];
  auditLogs: AuditLogItem[];
  currentUser: User;
  isDarkMode: boolean;
  toasts: Toast[];
  isSearchOpen: boolean;
  searchQuery: string;
  toggleDarkMode: () => void;
  addToast: (title: string, message?: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
  setIsSearchOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  addMedicine: (med: Omit<Medicine, 'id'>) => void;
  updateMedicine: (id: string, updates: Partial<Medicine>) => void;
  deleteMedicine: (id: string) => void;
  restockMedicine: (id: string, additionalQty: number, batchNumber?: string) => void;
  dispensePrescription: (
    patientName: string,
    patientId: string,
    doctorName: string,
    ward: string,
    items: Array<{ medicineId: string; quantity: number }>,
    notes?: string
  ) => boolean;
  createPurchaseOrder: (
    supplierId: string,
    supplierName: string,
    items: Array<{ medicineName: string; quantity: number; unitPrice: number }>,
    expectedDelivery: string
  ) => void;
  updatePurchaseOrderStatus: (id: string, status: 'Pending' | 'Approved' | 'Delivered') => void;
  reviewAlert: (id: string) => void;
  toggleUserStatus: (id: string) => void;
  updateUserRole: (id: string, newRole: UserRole) => void;
  switchUser: (user: User) => void;
  resetToMockData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_PREFIX = 'sathyabama_hms_';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}theme`);
    return saved ? saved === 'dark' : false;
  });

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Search Modal
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Core Data States
  const [medicines, setMedicines] = useState<Medicine[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}medicines`);
    return saved ? JSON.parse(saved) : initialMedicines;
  });

  const [suppliers, setSuppliers] = useState<Supplier[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}suppliers`);
    return saved ? JSON.parse(saved) : initialSuppliers;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}users`);
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [dispensingRecords, setDispensingRecords] = useState<DispensingRecord[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}dispensing`);
    return saved ? JSON.parse(saved) : initialDispensingRecords;
  });

  const [alerts, setAlerts] = useState<InventoryAlert[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}alerts`);
    return saved ? JSON.parse(saved) : initialAlerts;
  });

  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}orders`);
    return saved ? JSON.parse(saved) : initialPurchaseOrders;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}audits`);
    return saved ? JSON.parse(saved) : initialAuditLogs;
  });

  // Current Logged-in user
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}current_user`);
    if (saved) return JSON.parse(saved);
    return (
      initialUsers.find((u) => u.role === 'Pharmacist') || initialUsers[1]
    );
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}medicines`, JSON.stringify(medicines));
  }, [medicines]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}suppliers`, JSON.stringify(suppliers));
  }, [suppliers]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}users`, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}dispensing`, JSON.stringify(dispensingRecords));
  }, [dispensingRecords]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}alerts`, JSON.stringify(alerts));
  }, [alerts]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}orders`, JSON.stringify(purchaseOrders));
  }, [purchaseOrders]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}audits`, JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}current_user`, JSON.stringify(currentUser));
  }, [currentUser]);

  // Dark mode effect
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem(`${LOCAL_STORAGE_PREFIX}theme`, 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem(`${LOCAL_STORAGE_PREFIX}theme`, 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Toast handler
  const addToast = (title: string, message?: string, type: Toast['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newToast: Toast = { id, title, message, type, duration: 4000 };
    setToasts((prev) => [newToast, ...prev].slice(0, 5));

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Helpers
  const addAuditLog = (
    action: string,
    module: AuditLogItem['module'],
    details: string,
    status: AuditLogItem['status'] = 'info'
  ) => {
    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const newLog: AuditLogItem = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: dateStr,
      user: currentUser.name,
      role: currentUser.role,
      action,
      module,
      details,
      status
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Actions
  const addMedicine = (med: Omit<Medicine, 'id'>) => {
    const id = `MED-${String(medicines.length + 1).padStart(3, '0')}`;
    const newMed: Medicine = { ...med, id };
    setMedicines((prev) => [newMed, ...prev]);
    addToast('Medicine Added', `${med.name} registered to pharmacy inventory`, 'success');
    addAuditLog('New Medicine Registered', 'Inventory', `Added ${med.name} (${med.batchNumber}) with ${med.quantity} ${med.unit}`, 'success');

    // Auto-check if added with low stock or expired
    const expDate = new Date(med.expiryDate);
    const today = new Date();
    const diffDays = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 3600 * 24));

    if (diffDays <= 0 || med.quantity <= med.threshold) {
      const newAlert: InventoryAlert = {
        id: `ALT-${Date.now().toString().slice(-4)}`,
        type: diffDays <= 0 ? 'expiry' : 'low_stock',
        medicineId: id,
        medicineName: med.name,
        batchNumber: med.batchNumber,
        currentStock: med.quantity,
        threshold: med.threshold,
        expiryDate: med.expiryDate,
        daysRemaining: diffDays,
        severity: diffDays <= 0 || med.quantity === 0 ? 'critical' : 'high',
        timestamp: 'Just now',
        reviewed: false
      };
      setAlerts((prev) => [newAlert, ...prev]);
    }
  };

  const updateMedicine = (id: string, updates: Partial<Medicine>) => {
    setMedicines((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        const updated = { ...m, ...updates };

        // Recalculate status if quantity or expiry changed
        const expDate = new Date(updated.expiryDate);
        const today = new Date();
        const diffDays = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 3600 * 24));

        if (diffDays <= 0) {
          updated.status = 'Expired';
        } else if (updated.quantity === 0) {
          updated.status = 'Out of Stock';
        } else if (updated.quantity <= updated.threshold) {
          updated.status = 'Low Stock';
        } else {
          updated.status = 'In Stock';
        }
        return updated;
      })
    );
    addToast('Medicine Updated', `Record updated successfully`, 'info');
    addAuditLog('Medicine Updated', 'Inventory', `Modified parameters for ${id}`, 'info');
  };

  const deleteMedicine = (id: string) => {
    const med = medicines.find((m) => m.id === id);
    setMedicines((prev) => prev.filter((m) => m.id !== id));
    setAlerts((prev) => prev.filter((a) => a.medicineId !== id));
    addToast('Medicine Removed', `${med?.name || id} deleted from catalog`, 'warning');
    addAuditLog('Medicine Deleted', 'Inventory', `Removed ${med?.name || id} from database`, 'warning');
  };

  const restockMedicine = (id: string, additionalQty: number, batchNumber?: string) => {
    const med = medicines.find((m) => m.id === id);
    if (!med) return;

    const newQty = med.quantity + additionalQty;
    const newStatus: Medicine['status'] = newQty > med.threshold ? 'In Stock' : 'Low Stock';

    setMedicines((prev) =>
      prev.map((m) => (m.id === id ? { ...m, quantity: newQty, status: newStatus, ...(batchNumber ? { batchNumber } : {}) } : m))
    );

    // Clear low stock alert if above threshold
    if (newQty > med.threshold) {
      setAlerts((prev) => prev.filter((a) => !(a.medicineId === id && a.type === 'low_stock')));
    }

    addToast('Stock Replenished', `Added +${additionalQty} ${med.unit} to ${med.name}`, 'success');
    addAuditLog('Stock Inward Replenishment', 'Inventory', `Received ${additionalQty} units of ${med.name}. New total: ${newQty}`, 'success');
  };

  const dispensePrescription = (
    patientName: string,
    patientId: string,
    doctorName: string,
    ward: string,
    items: Array<{ medicineId: string; quantity: number }>,
    notes?: string
  ): boolean => {
    // Validate stock and expiry for all items
    for (const item of items) {
      const med = medicines.find((m) => m.id === item.medicineId);
      if (!med) {
        addToast('Dispense Failed', `Medicine ${item.medicineId} not found`, 'error');
        return false;
      }
      if (med.status === 'Expired') {
        addToast('Validation Blocked', `${med.name} is EXPIRED. Cannot dispense.`, 'error');
        return false;
      }
      if (med.quantity < item.quantity) {
        addToast('Insufficient Stock', `Only ${med.quantity} ${med.unit} available for ${med.name}`, 'error');
        return false;
      }
    }

    // Decrement stock and update status
    const rxId = `RX-${Math.floor(10000 + Math.random() * 90000)}`;
    const newRecords: DispensingRecord[] = [];

    setMedicines((prev) =>
      prev.map((m) => {
        const item = items.find((it) => it.medicineId === m.id);
        if (!item) return m;

        const updatedQty = m.quantity - item.quantity;
        let updatedStatus: Medicine['status'] = m.status;
        if (updatedQty === 0) updatedStatus = 'Out of Stock';
        else if (updatedQty <= m.threshold) updatedStatus = 'Low Stock';

        // Check if low stock alert should be triggered
        if (updatedQty <= m.threshold) {
          const expDate = new Date(m.expiryDate);
          const today = new Date();
          const diffDays = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 3600 * 24));

          const existingAlert = alerts.find((a) => a.medicineId === m.id && a.type === 'low_stock');
          if (!existingAlert) {
            setAlerts((prevAlerts) => [
              {
                id: `ALT-${Date.now().toString().slice(-4)}`,
                type: 'low_stock',
                medicineId: m.id,
                medicineName: m.name,
                batchNumber: m.batchNumber,
                currentStock: updatedQty,
                threshold: m.threshold,
                expiryDate: m.expiryDate,
                daysRemaining: diffDays,
                severity: updatedQty === 0 ? 'critical' : 'high',
                timestamp: 'Just now',
                reviewed: false
              },
              ...prevAlerts
            ]);
          }
        }

        newRecords.push({
          id: `DISP-${Math.floor(10000 + Math.random() * 90000)}`,
          prescriptionId: rxId,
          patientName,
          patientId,
          doctorName,
          medicineId: m.id,
          medicineName: m.name,
          quantity: item.quantity,
          pharmacist: currentUser.name,
          ward,
          timestamp: 'Just now',
          status: 'Dispensed',
          notes: notes || 'Direct clinical fulfillment'
        });

        return {
          ...m,
          quantity: updatedQty,
          status: updatedStatus
        };
      })
    );

    setDispensingRecords((prev) => [...newRecords, ...prev]);
    addToast('Prescription Dispensed', `Successfully fulfilled for ${patientName} (${items.length} items)`, 'success');
    addAuditLog('Prescription Dispensed', 'Dispensing', `Fulfilled ${rxId} for ${patientName} (${ward})`, 'success');
    return true;
  };

  const createPurchaseOrder = (
    supplierId: string,
    supplierName: string,
    items: Array<{ medicineName: string; quantity: number; unitPrice: number }>,
    expectedDelivery: string
  ) => {
    const poNum = `PO-SAT-26-${String(purchaseOrders.length + 904)}`;
    const totalQty = items.reduce((acc, it) => acc + it.quantity, 0);
    const totalVal = items.reduce((acc, it) => acc + it.quantity * it.unitPrice, 0);

    const newPO: PurchaseOrder = {
      id: `PO-${Date.now().toString().slice(-4)}`,
      poNumber: poNum,
      supplierId,
      supplierName,
      items,
      totalQuantity: totalQty,
      totalValue: totalVal,
      status: 'Pending',
      createdDate: new Date().toISOString().substring(0, 10),
      expectedDelivery
    };

    setPurchaseOrders((prev) => [newPO, ...prev]);
    addToast('Purchase Order Generated', `${poNum} sent to ${supplierName}`, 'success');
    addAuditLog('Purchase Order Issued', 'Procurement', `Generated PO ${poNum} value ₹${totalVal.toLocaleString()}`, 'info');
  };

  const updatePurchaseOrderStatus = (id: string, status: 'Pending' | 'Approved' | 'Delivered') => {
    setPurchaseOrders((prev) =>
      prev.map((po) => {
        if (po.id !== id) return po;
        return { ...po, status };
      })
    );
    addToast('Order Status Updated', `PO status changed to ${status}`, 'info');
    addAuditLog('PO Status Changed', 'Procurement', `PO ${id} status set to ${status}`, 'info');
  };

  const reviewAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, reviewed: true } : a))
    );
    addToast('Alert Acknowledged', 'Marked as reviewed by clinical supervisor', 'info');
  };

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u;
        const newStatus = u.status === 'Active' ? 'Inactive' : 'Active';
        return { ...u, status: newStatus };
      })
    );
    addToast('User Status Updated', 'Account access flag toggled', 'info');
  };

  const updateUserRole = (id: string, newRole: UserRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
    );
    if (currentUser.id === id) {
      setCurrentUser((prev) => ({ ...prev, role: newRole }));
    }
    addToast('Role Updated', `User permissions updated to ${newRole}`, 'success');
    addAuditLog('User Role Modified', 'Users', `Changed role for user ${id} to ${newRole}`, 'info');
  };

  const switchUser = (user: User) => {
    setUsers((prev) => {
      const existingIndex = prev.findIndex(
        (u) => u.id === user.id || u.email.toLowerCase() === user.email.toLowerCase()
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], ...user };
        return updated;
      }
      return [user, ...prev];
    });
    setCurrentUser(user);
    addToast('Authentication Verified', `Logged in as ${user.name} (${user.role})`, 'success');
  };

  const resetToMockData = () => {
    setMedicines(initialMedicines);
    setSuppliers(initialSuppliers);
    setUsers(initialUsers);
    setDispensingRecords(initialDispensingRecords);
    setAlerts(initialAlerts);
    setPurchaseOrders(initialPurchaseOrders);
    setAuditLogs(initialAuditLogs);
    addToast('System Reset', 'Restored pristine hospital sample dataset', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        medicines,
        suppliers,
        users,
        dispensingRecords,
        alerts,
        purchaseOrders,
        auditLogs,
        currentUser,
        isDarkMode,
        toasts,
        isSearchOpen,
        searchQuery,
        toggleDarkMode,
        addToast,
        removeToast,
        setIsSearchOpen,
        setSearchQuery,
        addMedicine,
        updateMedicine,
        deleteMedicine,
        restockMedicine,
        dispensePrescription,
        createPurchaseOrder,
        updatePurchaseOrderStatus,
        reviewAlert,
        toggleUserStatus,
        updateUserRole,
        switchUser,
        resetToMockData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
