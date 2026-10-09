# 🏥 Sathyabama Hospital Medicine System
### Sathyabama Institute of Science and Technology (Deemed to be University)
**Category - 1 University by UGC · NABH & CDSCO Standard Compliant**

---

![React 19](https://img.shields.io/badge/React-19.0.1-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-7.0.2-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.3.0-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.3-38B2AC?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-Proprietary-70092B)

A resilient, microservices-ready clinical platform for automated medicine inventory control, cold-chain IoT temperature tracking, barcode-assisted inpatient dispensing, and regulatory compliance at Sathyabama Hospital.

---

## 📋 Table of Contents
- [Overview](#-overview)
- [Key Features](#-key-features)
- [System Architecture & Roles](#-system-architecture--roles)
- [Module Breakdown](#-module-breakdown)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Security & Compliance](#-security--compliance)

---

## 🌟 Overview

The **Sathyabama Hospital Medicine System** is an enterprise-grade hospital pharmacy operations portal managing over 25,000+ monthly clinical prescriptions. It automates inventory threshold replenishment, cold-chain refrigeration safety monitoring for biologicals, emergency crash cart verification, and end-to-end dispensing audits across inpatient wards and the central dispensary.

---

## 🚀 Key Features

- **Multi-Role Access Control (RBAC)**: Support for 6 distinct hospital functional roles with role-tailored navigation, privilege isolation, and single-click persona switching.
- **Formulary & Batch Control**: Real-time batch-level inventory tracking with expiry heatmaps, minimum threshold auto-alerts, and automated quarantine disposal workflows.
- **Clinical Prescription Dispensing**: Digital fulfillment with patient verification, ward allocation, doctor authorization, and instant inventory deduction.
- **Cold-Chain IoT Telemetry**: Live temperature and humidity sensor tracking for vaccines and biologics with alert thresholds (+2°C to +8°C).
- **Supplier & PO Management**: Complete procurement lifecycle with Purchase Order (PO) creation, vendor rating, and shipment receipts.
- **Emergency Crash Cart Management**: Rapid bedside indenting and emergency medication kit checklist.
- **Barcode Scanning Engine**: Simulated optical barcode scanner for rapid batch lookup and dispense verification.
- **CDSCO & NABH Regulatory Auditing**: Immutable digital logs documenting every user action, dispense event, and stock modification.
- **Global Spotlight Search (`Ctrl/Cmd + K`)**: Instant access to medicines, suppliers, orders, and clinical wards from anywhere in the app.
- **Adaptive Clinical Themes**: Clean light mode and high-contrast dark clinical theme.

---

## 👥 System Architecture & Roles

The system enforces granular Role-Based Access Control (RBAC) across 6 specialized personas:

| Role | Title | Primary Responsibilities | Default Department |
| :--- | :--- | :--- | :--- |
| **Pharmacist** | Clinical Pharmacist | Central dispensary fulfillment, stock threshold adjustment, batch verification | Central Pharmacy Dispensary |
| **Doctor** | Physician / Consultant | Clinical prescription authorization, emergency drug requests, formulary lookup | Inpatient & Outpatient Wards |
| **Admin** | Hospital Administrator | Full root governance, user access controls, system configuration & audits | Hospital Administration & IT |
| **Procurement Manager**| Supply Chain Officer | Vendor purchase orders, stock re-orders, shipment inwarding & supplier ratings | Medical Supplies & Materials |
| **Audit Officer** | Compliance Officer | CDSCO & NABH audit inspection, variance investigation, electronic signature logs | Hospital Quality Assurance |
| **Ward Staff** | Ward Nurse / Inpatient Staff| Bedside indents, emergency crash cart verification, floor medicine requests | General Surgery & ICU Wards |

---

## 📦 Module Breakdown

### 1. Clinical Dashboard (`/`)
- Real-time KPI statistics: Total Stock, Low Stock Warnings, Expiring SKUs, and Daily Dispensed Value.
- Formulary distribution by therapeutic category (Antibiotics, Analgesics, Cardiovascular, etc.).
- 7-day stock turnover and ward consumption analytics using Recharts.
- Quick action drawer for Cold-Chain Telemetry, Barcode Scanner, and Emergency Crash Kits.

### 2. Inventory & Formulary (`/inventory`)
- Comprehensive medicine catalog with batch number, SKU status, storage requirements, and unit prices.
- Add medicine modal with real-time stock threshold validation.
- Restock and stock correction utilities.
- Quarantine & hazardous disposal protocol modal.

### 3. Prescription Dispensing (`/dispensing`)
- Live prescription fulfillment queue.
- Patient ID and ward correlation with doctor authorization checks.
- Step-by-step dispensing verification and historical dispense logs.

### 4. Assurance & Expiry Alerts (`/alerts`)
- Severity-graded alert system (Critical, High, Medium).
- Early warnings for expiring batches (< 30, < 60, < 90 days).
- Depleted stock alerts with supervisor acknowledgement workflows.

### 5. Suppliers & Procurement (`/suppliers`)
- Registered vendor registry with performance ratings and payment terms.
- Purchase Order (PO) generation and approval tracking (`Pending`, `Approved`, `Delivered`).

### 6. Regulatory Audit & Reports (`/reports`)
- CDSCO & NABH compliance trail inspection.
- Time-stamped electronic signature records documenting user identity, module, action, and outcome.
- Filterable audit logs with CSV/Report data export.

### 7. Users & Access Matrix (`/users`)
- Staff directory with active status toggling.
- Role reassignment and authorization matrix preview.

### 8. Authentication Portal (`/login`)
- High-contrast clinical sign-in interface.
- 1-Click instant test launch for all 6 personas.
- New staff self-registration portal with department assignment.

---

## 🛠 Technology Stack

- **Frontend Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts & Data Visualization**: [Recharts](https://recharts.org/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **State Management**: React Context (`AppContext`) with persistent `localStorage` synchronization

---

## 📁 Project Structure

```text
├── public/                     # Static assets and favicon
├── src/
│   ├── assets/                 # Branded images and pharmacy illustrations
│   ├── components/
│   │   ├── common/             # Reusable UI widgets (Badges, Modals, StatCards, Emblem)
│   │   │   ├── BarcodeScannerModal.tsx
│   │   │   ├── ColdChainModal.tsx
│   │   │   ├── EmergencyKitModal.tsx
│   │   │   ├── SathyabamaEmblem.tsx
│   │   │   ├── SpotlightSearchModal.tsx
│   │   │   └── ...
│   │   └── layout/             # Main layout, persistent Sidebar, and Navbar
│   │       ├── MainLayout.tsx
│   │       ├── Navbar.tsx
│   │       └── Sidebar.tsx
│   ├── context/
│   │   └── AppContext.tsx      # Global store for medicines, POs, alerts, and user context
│   ├── data/
│   │   └── mockData.ts         # Initial clinical dataset, medicines, suppliers, and users
│   ├── pages/                  # Top-level view routes
│   │   ├── Alerts.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Dispensing.tsx
│   │   ├── Inventory.tsx
│   │   ├── Login.tsx
│   │   ├── Reports.tsx
│   │   ├── Suppliers.tsx
│   │   └── Users.tsx
│   ├── App.tsx                 # Router configurations
│   ├── main.tsx                # React DOM entry point
│   └── index.css               # Global Tailwind CSS styles
├── metadata.json               # AI Studio applet specifications
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript compiler configuration
└── vite.config.ts              # Vite build configuration
```

---

## ⚡ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0 or higher recommended)
- `npm` or `bun`

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd sathyabama-hospital-medicine-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   *(or using Bun: `bun install`)*

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be live at `http://localhost:3000`.

---

## 📜 Available Scripts

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server on port `3000` |
| `npm run build` | Compiles and builds production-ready assets to `/dist` |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs the TypeScript compiler check (`tsc --noEmit`) |
| `npm run clean` | Removes built artifacts and temporary distribution files |

---

## 🔒 Security & Compliance

- **CDSCO & NABH Alignment**: Designed to comply with national hospital pharmacy management guidelines.
- **Zero API Key Leaks**: Client-side secrets are restricted; data persistence handled via secure browser contexts.
- **Traceability**: All inventory adjustments require logged reasons and associate with the currently active institutional user ID.

---

### 🏛️ Institution
**Sathyabama Institute of Science and Technology**  
*(Deemed to be University under Section 3 of UGC Act, 1956)*  
Jeppiaar Nagar, Rajiv Gandhi Salai, Chennai – 600 119, Tamil Nadu, India.
