import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { MainLayout } from './components/layout/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { Inventory } from './pages/Inventory';
import { Dispensing } from './pages/Dispensing';
import { Alerts } from './pages/Alerts';
import { Suppliers } from './pages/Suppliers';
import { Reports } from './pages/Reports';
import { UsersPage } from './pages/Users';
import { Login } from './pages/Login';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Standalone Route for Split-screen Login */}
          <Route path="/login" element={<Login />} />

          {/* Authenticated Dashboard App Layout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="dispensing" element={<Dispensing />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="reports" element={<Reports />} />
            <Route path="users" element={<UsersPage />} />
          </Route>

          {/* Catch-all redirect to Dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
