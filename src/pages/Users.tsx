import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge, BadgeVariant } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { DataTable, Column } from '../components/common/DataTable';
import { User, UserRole, permissionsMatrix } from '../data/mockData';
import {
  Users2,
  ShieldCheck,
  Check,
  X,
  Edit2,
  KeyRound,
  UserPlus,
  Lock,
  CheckCircle2,
  Search,
  UserCheck
} from 'lucide-react';
import { motion } from 'motion/react';

export const UsersPage: React.FC = () => {
  const {
    users,
    currentUser,
    toggleUserStatus,
    updateUserRole,
    switchUser,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'users' | 'matrix'>('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>('Pharmacist');

  const availableRoles: UserRole[] = [
    'Doctor',
    'Pharmacist',
    'Ward Staff',
    'Admin',
    'Procurement Manager',
    'Audit Officer'
  ];

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenEditRole = (user: User) => {
    setEditingUser(user);
    setSelectedRole(user.role);
  };

  const handleSaveRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      updateUserRole(editingUser.id, selectedRole);
      setEditingUser(null);
    }
  };

  const userColumns: Column<User>[] = [
    {
      key: 'name',
      header: 'Hospital Staff Member',
      render: (u) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 font-bold flex items-center justify-center text-xs shrink-0">
            {u.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
                {u.name}
              </span>
              {currentUser.id === u.id && (
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-teal-500 text-white">
                  YOU
                </span>
              )}
            </div>
            <span className="text-[11px] text-slate-400 font-mono">{u.email}</span>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      header: 'Assigned Role',
      render: (u) => {
        let variant: BadgeVariant = 'neutral';
        if (u.role === 'Admin') variant = 'danger';
        else if (u.role === 'Doctor') variant = 'primary';
        else if (u.role === 'Pharmacist') variant = 'success';
        else if (u.role === 'Procurement Manager') variant = 'warning';
        else if (u.role === 'Audit Officer') variant = 'info';

        return <Badge variant={variant}>{u.role}</Badge>;
      }
    },
    {
      key: 'department',
      header: 'Clinical Department',
      render: (u) => (
        <span className="text-xs text-slate-600 dark:text-slate-300">
          {u.department}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Account Status',
      render: (u) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleUserStatus(u.id)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              u.status === 'Active' ? 'bg-teal-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
            title={`Toggle status (Currently ${u.status})`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out ${
                u.status === 'Active' ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
          <span
            className={`text-xs font-medium ${
              u.status === 'Active' ? 'text-emerald-600' : 'text-slate-400'
            }`}
          >
            {u.status}
          </span>
        </div>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (u) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => switchUser(u)}
            className="px-2 py-1 text-[11px] font-semibold rounded-lg text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/60 border border-teal-200 dark:border-teal-800 transition-colors"
            title="Act as this user"
          >
            Switch User
          </button>
          <button
            onClick={() => handleOpenEditRole(u)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Edit Role"
          >
            <Edit2 className="w-4 h-4" />
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Staff Users & Access Control
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Role-based authorization governance, clinical prescribing rights, and audit isolation
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="primary">
            Active Context: {currentUser.name} ({currentUser.role})
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'users'
                ? 'bg-white dark:bg-slate-700 text-teal-800 dark:text-teal-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Hospital Staff Directory ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'matrix'
                ? 'bg-white dark:bg-slate-700 text-teal-800 dark:text-teal-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            RBAC Permission Matrix
          </button>
        </div>

        {activeTab === 'users' && (
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search staff, role, email..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
            />
          </div>
        )}
      </div>

      {activeTab === 'users' ? (
        <DataTable
          columns={userColumns}
          data={filteredUsers}
          keyExtractor={(item) => item.id}
          emptyMessage="No staff members match the query."
        />
      ) : (
        /* Permission Matrix Table */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Role-Based Access Control (RBAC) Governance Matrix
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Enforced across medication indents, prescription signing, inventory edits, and purchase approvals
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-3.5 px-4 font-bold">Functional Module & Scope</th>
                  <th className="py-3.5 px-3 font-semibold text-center">Doctor</th>
                  <th className="py-3.5 px-3 font-semibold text-center">Pharmacist</th>
                  <th className="py-3.5 px-3 font-semibold text-center">Ward Staff</th>
                  <th className="py-3.5 px-3 font-semibold text-center">Admin</th>
                  <th className="py-3.5 px-3 font-semibold text-center">Procurement</th>
                  <th className="py-3.5 px-3 font-semibold text-center">Audit Officer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {permissionsMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-slate-100">
                      {row.module}
                    </td>
                    {(['Doctor', 'Pharmacist', 'Ward Staff', 'Admin', 'Procurement Manager', 'Audit Officer'] as const).map(
                      (roleKey) => {
                        const hasAccess = (row as any)[roleKey];
                        return (
                          <td key={roleKey} className="py-3.5 px-3 text-center">
                            {hasAccess ? (
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </span>
                            ) : (
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
                                <X className="w-3.5 h-3.5 stroke-[2]" />
                              </span>
                            )}
                          </td>
                        );
                      }
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      <Modal
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        title="Modify Staff Authorization Role"
        subtitle={`Updating privileges for ${editingUser?.name}`}
        maxWidth="md"
      >
        <form onSubmit={handleSaveRole} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Select Designated Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
            >
              {availableRoles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
            Granting <strong>{selectedRole}</strong> status allows the user immediate authorization according to the Hospital Security Charter.
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setEditingUser(null)}
              className="px-4 py-2 text-xs font-medium rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-teal-700 hover:bg-teal-800 text-white shadow-xs"
            >
              Update Permissions
            </button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
};
