export interface Medicine {
  id: string;
  name: string;
  brandName: string;
  category: 'Antibiotics' | 'Analgesics' | 'Vitamins' | 'Injections' | 'Cardiovascular' | 'Respiratory' | 'Antidiabetic' | 'Emergency';
  batchNumber: string;
  supplier: string;
  supplierId: string;
  quantity: number;
  threshold: number;
  unitPrice: number;
  unit: string;
  expiryDate: string;
  storage: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Expired';
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  location: string;
  totalOrders: number;
  activeOrders: number;
  rating: number;
  paymentTerms: string;
  categories: string[];
}

export type UserRole = 'Doctor' | 'Pharmacist' | 'Ward Staff' | 'Admin' | 'Procurement Manager' | 'Audit Officer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  status: 'Active' | 'Inactive';
  phone: string;
  joinedDate: string;
  avatar?: string;
}

export interface DispensingRecord {
  id: string;
  prescriptionId: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  medicineId: string;
  medicineName: string;
  quantity: number;
  pharmacist: string;
  ward: string;
  timestamp: string;
  status: 'Dispensed' | 'Pending' | 'Rejected';
  notes?: string;
}

export interface InventoryAlert {
  id: string;
  type: 'low_stock' | 'expiry';
  medicineId: string;
  medicineName: string;
  batchNumber: string;
  currentStock: number;
  threshold: number;
  expiryDate: string;
  daysRemaining: number;
  severity: 'critical' | 'high' | 'medium';
  timestamp: string;
  reviewed: boolean;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  supplierName: string;
  items: Array<{
    medicineName: string;
    quantity: number;
    unitPrice: number;
  }>;
  totalQuantity: number;
  totalValue: number;
  status: 'Pending' | 'Approved' | 'Delivered';
  createdDate: string;
  expectedDelivery: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  module: 'Inventory' | 'Dispensing' | 'Procurement' | 'Users' | 'Security';
  details: string;
  status: 'success' | 'warning' | 'info';
}

export const initialMedicines: Medicine[] = [
  {
    id: "MED-001",
    name: "Amoxicillin + Clavulanic Acid 625mg",
    brandName: "Augmentin Duo",
    category: "Antibiotics",
    batchNumber: "BAT-2026-AUG12",
    supplier: "Sun Pharma Clinical Ltd",
    supplierId: "SUP-001",
    quantity: 1450,
    threshold: 300,
    unitPrice: 18.5,
    unit: "tablets",
    expiryDate: "2027-08-15",
    storage: "Room Temp (20-25°C)",
    status: "In Stock"
  },
  {
    id: "MED-002",
    name: "Ceftriaxone Sodium 1g Vial",
    brandName: "Monocef 1000",
    category: "Antibiotics",
    batchNumber: "BAT-2026-CEF08",
    supplier: "Cipla Healthcare Labs",
    supplierId: "SUP-002",
    quantity: 42,
    threshold: 120,
    unitPrice: 62.0,
    unit: "vials",
    expiryDate: "2026-10-18",
    storage: "Room Temp (20-25°C)",
    status: "Low Stock"
  },
  {
    id: "MED-003",
    name: "Meropenem Trihydrate 1g Injection",
    brandName: "Meronem IV",
    category: "Antibiotics",
    batchNumber: "BAT-2026-MER99",
    supplier: "Cipla Healthcare Labs",
    supplierId: "SUP-002",
    quantity: 18,
    threshold: 50,
    unitPrice: 480.0,
    unit: "vials",
    expiryDate: "2026-10-09",
    storage: "Cool & Dry (<25°C)",
    status: "Low Stock"
  },
  {
    id: "MED-004",
    name: "Azithromycin 500mg Film-Coated",
    brandName: "Azee 500",
    category: "Antibiotics",
    batchNumber: "BAT-2025-AZI04",
    supplier: "Dr. Reddy's Hospital Supply",
    supplierId: "SUP-003",
    quantity: 0,
    threshold: 100,
    unitPrice: 24.0,
    unit: "tablets",
    expiryDate: "2026-09-12",
    storage: "Room Temp (20-25°C)",
    status: "Out of Stock"
  },
  {
    id: "MED-005",
    name: "Piperacillin + Tazobactam 4.5g Vial",
    brandName: "Tazomac IV",
    category: "Antibiotics",
    batchNumber: "BAT-2026-PIPTAZ",
    supplier: "Sun Pharma Clinical Ltd",
    supplierId: "SUP-001",
    quantity: 260,
    threshold: 80,
    unitPrice: 380.0,
    unit: "vials",
    expiryDate: "2027-04-30",
    storage: "Room Temp (20-25°C)",
    status: "In Stock"
  },
  {
    id: "MED-006",
    name: "Paracetamol IV Infusion 10mg/ml 100ml",
    brandName: "Perfalgan IV",
    category: "Analgesics",
    batchNumber: "BAT-2026-PCM03",
    supplier: "Apollo MedTech Distributors",
    supplierId: "SUP-004",
    quantity: 920,
    threshold: 250,
    unitPrice: 55.0,
    unit: "bottles",
    expiryDate: "2027-11-20",
    storage: "Room Temp (20-25°C)",
    status: "In Stock"
  },
  {
    id: "MED-007",
    name: "Tramadol HCl 50mg/ml Ampoule",
    brandName: "Tramazac Inj",
    category: "Analgesics",
    batchNumber: "BAT-2026-TRM44",
    supplier: "Zydus Lifesciences Institutional",
    supplierId: "SUP-005",
    quantity: 35,
    threshold: 80,
    unitPrice: 32.5,
    unit: "ampoules",
    expiryDate: "2026-10-15",
    storage: "Controlled Substance Safe",
    status: "Low Stock"
  },
  {
    id: "MED-008",
    name: "Diclofenac Sodium 75mg/3ml Ampoule",
    brandName: "Voveran Aqua",
    category: "Analgesics",
    batchNumber: "BAT-2025-DIC88",
    supplier: "Zydus Lifesciences Institutional",
    supplierId: "SUP-005",
    quantity: 110,
    threshold: 150,
    unitPrice: 16.0,
    unit: "ampoules",
    expiryDate: "2026-10-06",
    storage: "Room Temp (20-25°C)",
    status: "Low Stock"
  },
  {
    id: "MED-009",
    name: "Fentanyl Citrate 50mcg/ml 2ml",
    brandName: "Sublimaze Clinical",
    category: "Analgesics",
    batchNumber: "BAT-2026-FEN01",
    supplier: "Dr. Reddy's Hospital Supply",
    supplierId: "SUP-003",
    quantity: 120,
    threshold: 40,
    unitPrice: 145.0,
    unit: "ampoules",
    expiryDate: "2027-02-14",
    storage: "Controlled Substance Safe",
    status: "In Stock"
  },
  {
    id: "MED-010",
    name: "Vitamin C + Zinc 500mg Chewable",
    brandName: "Celin-Z",
    category: "Vitamins",
    batchNumber: "BAT-2026-VITC2",
    supplier: "Abbott Point-of-Care Solutions",
    supplierId: "SUP-006",
    quantity: 2100,
    threshold: 400,
    unitPrice: 4.2,
    unit: "tablets",
    expiryDate: "2027-09-01",
    storage: "Room Temp (20-25°C)",
    status: "In Stock"
  },
  {
    id: "MED-011",
    name: "Cyanocobalamin (Vit B12) 1000mcg/ml",
    brandName: "Neurobion Forte Inj",
    category: "Vitamins",
    batchNumber: "BAT-2026-B1291",
    supplier: "Abbott Point-of-Care Solutions",
    supplierId: "SUP-006",
    quantity: 450,
    threshold: 150,
    unitPrice: 22.0,
    unit: "ampoules",
    expiryDate: "2026-10-24",
    storage: "Cool & Dry (<25°C)",
    status: "In Stock"
  },
  {
    id: "MED-012",
    name: "Multivitamin Infusion (MVI Adult)",
    brandName: "Cernevit IV",
    category: "Vitamins",
    batchNumber: "BAT-2025-MVI19",
    supplier: "Lupin Bulk Distribution",
    supplierId: "SUP-007",
    quantity: 65,
    threshold: 60,
    unitPrice: 210.0,
    unit: "vials",
    expiryDate: "2026-09-25",
    storage: "Refrigerated (2-8°C)",
    status: "Expired"
  },
  {
    id: "MED-013",
    name: "Cholecalciferol (Vit D3) 60,000 IU",
    brandName: "Calcirol Sachet",
    category: "Vitamins",
    batchNumber: "BAT-2026-D344",
    supplier: "Lupin Bulk Distribution",
    supplierId: "SUP-007",
    quantity: 1800,
    threshold: 300,
    unitPrice: 28.0,
    unit: "sachets",
    expiryDate: "2027-12-10",
    storage: "Room Temp (20-25°C)",
    status: "In Stock"
  },
  {
    id: "MED-014",
    name: "Ondansetron HCl 4mg/2ml Injection",
    brandName: "Emeset Inj",
    category: "Injections",
    batchNumber: "BAT-2026-OND11",
    supplier: "Cipla Healthcare Labs",
    supplierId: "SUP-002",
    quantity: 680,
    threshold: 150,
    unitPrice: 14.5,
    unit: "ampoules",
    expiryDate: "2027-06-30",
    storage: "Room Temp (20-25°C)",
    status: "In Stock"
  },
  {
    id: "MED-015",
    name: "Pantoprazole Sodium 40mg IV Vial",
    brandName: "Pantocid IV",
    category: "Injections",
    batchNumber: "BAT-2026-PAN55",
    supplier: "Sun Pharma Clinical Ltd",
    supplierId: "SUP-001",
    quantity: 820,
    threshold: 200,
    unitPrice: 48.0,
    unit: "vials",
    expiryDate: "2027-05-18",
    storage: "Cool & Dry (<25°C)",
    status: "In Stock"
  },
  {
    id: "MED-016",
    name: "Enoxaparin Sodium 40mg/0.4ml Prefilled",
    brandName: "Clexane Syringe",
    category: "Injections",
    batchNumber: "BAT-2026-ENX33",
    supplier: "Dr. Reddy's Hospital Supply",
    supplierId: "SUP-003",
    quantity: 48,
    threshold: 100,
    unitPrice: 340.0,
    unit: "prefilled syringes",
    expiryDate: "2026-10-12",
    storage: "Refrigerated (2-8°C)",
    status: "Low Stock"
  },
  {
    id: "MED-017",
    name: "Hydrocortisone Sodium Succinate 100mg",
    brandName: "Primacort 100",
    category: "Injections",
    batchNumber: "BAT-2026-HYD22",
    supplier: "Glenmark Specialized Therapeutics",
    supplierId: "SUP-008",
    quantity: 340,
    threshold: 90,
    unitPrice: 42.0,
    unit: "vials",
    expiryDate: "2027-01-25",
    storage: "Room Temp (20-25°C)",
    status: "In Stock"
  },
  {
    id: "MED-018",
    name: "Dexamethasone Sodium Phosphate 4mg/ml",
    brandName: "Dexona Inj",
    category: "Injections",
    batchNumber: "BAT-2026-DEX77",
    supplier: "Glenmark Specialized Therapeutics",
    supplierId: "SUP-008",
    quantity: 590,
    threshold: 120,
    unitPrice: 11.5,
    unit: "vials",
    expiryDate: "2027-07-14",
    storage: "Room Temp (20-25°C)",
    status: "In Stock"
  },
  {
    id: "MED-019",
    name: "Atorvastatin Calcium 20mg Film-Coated",
    brandName: "Atorva 20",
    category: "Cardiovascular",
    batchNumber: "BAT-2026-ATV09",
    supplier: "Zydus Lifesciences Institutional",
    supplierId: "SUP-005",
    quantity: 1950,
    threshold: 300,
    unitPrice: 12.8,
    unit: "tablets",
    expiryDate: "2027-10-31",
    storage: "Room Temp (20-25°C)",
    status: "In Stock"
  },
  {
    id: "MED-020",
    name: "Amlodipine Besylate 5mg",
    brandName: "Norvasc 5mg",
    category: "Cardiovascular",
    batchNumber: "BAT-2026-AML14",
    supplier: "Sun Pharma Clinical Ltd",
    supplierId: "SUP-001",
    quantity: 1600,
    threshold: 250,
    unitPrice: 5.5,
    unit: "tablets",
    expiryDate: "2027-08-20",
    storage: "Room Temp (20-25°C)",
    status: "In Stock"
  },
  {
    id: "MED-021",
    name: "Furosemide 20mg/2ml Injection",
    brandName: "Lasix IV",
    category: "Cardiovascular",
    batchNumber: "BAT-2026-FUR28",
    supplier: "Apollo MedTech Distributors",
    supplierId: "SUP-004",
    quantity: 510,
    threshold: 120,
    unitPrice: 10.2,
    unit: "ampoules",
    expiryDate: "2027-03-15",
    storage: "Cool & Dry (<25°C)",
    status: "In Stock"
  },
  {
    id: "MED-022",
    name: "Salbutamol 5mg/ml Respirator Solution",
    brandName: "Ventolin Nebules",
    category: "Respiratory",
    batchNumber: "BAT-2026-SAL03",
    supplier: "Cipla Healthcare Labs",
    supplierId: "SUP-002",
    quantity: 410,
    threshold: 100,
    unitPrice: 28.0,
    unit: "vials",
    expiryDate: "2026-12-05",
    storage: "Room Temp (20-25°C)",
    status: "In Stock"
  },
  {
    id: "MED-023",
    name: "Budesonide 0.5mg/2ml Respules",
    brandName: "Budecort 0.5",
    category: "Respiratory",
    batchNumber: "BAT-2026-BUD92",
    supplier: "Cipla Healthcare Labs",
    supplierId: "SUP-002",
    quantity: 380,
    threshold: 80,
    unitPrice: 36.0,
    unit: "respules",
    expiryDate: "2027-02-28",
    storage: "Room Temp (20-25°C)",
    status: "In Stock"
  },
  {
    id: "MED-024",
    name: "Insulin Glargine 100 IU/ml 3ml Cartridge",
    brandName: "Lantus Solostar",
    category: "Antidiabetic",
    batchNumber: "BAT-2026-INS19",
    supplier: "Abbott Point-of-Care Solutions",
    supplierId: "SUP-006",
    quantity: 28,
    threshold: 60,
    unitPrice: 620.0,
    unit: "cartridges",
    expiryDate: "2026-10-11",
    storage: "Refrigerated (2-8°C)",
    status: "Low Stock"
  },
  {
    id: "MED-025",
    name: "Metformin Hydrochloride 500mg ER",
    brandName: "Glycomet-SR 500",
    category: "Antidiabetic",
    batchNumber: "BAT-2026-MET41",
    supplier: "Dr. Reddy's Hospital Supply",
    supplierId: "SUP-003",
    quantity: 2800,
    threshold: 400,
    unitPrice: 3.5,
    unit: "tablets",
    expiryDate: "2027-11-15",
    storage: "Room Temp (20-25°C)",
    status: "In Stock"
  },
  {
    id: "MED-026",
    name: "Adrenaline (Epinephrine) 1:1000 1mg/ml",
    brandName: "Vasocon Emergency Inj",
    category: "Emergency",
    batchNumber: "BAT-2026-ADR01",
    supplier: "Apollo MedTech Distributors",
    supplierId: "SUP-004",
    quantity: 240,
    threshold: 50,
    unitPrice: 19.0,
    unit: "ampoules",
    expiryDate: "2027-05-10",
    storage: "Refrigerated (2-8°C)",
    status: "In Stock"
  },
  {
    id: "MED-027",
    name: "Atropine Sulfate 0.6mg/ml Ampoule",
    brandName: "Atro-Stat ICU",
    category: "Emergency",
    batchNumber: "BAT-2025-ATR62",
    supplier: "Apollo MedTech Distributors",
    supplierId: "SUP-004",
    quantity: 75,
    threshold: 80,
    unitPrice: 15.0,
    unit: "ampoules",
    expiryDate: "2026-10-04",
    storage: "Room Temp (20-25°C)",
    status: "Low Stock"
  },
  {
    id: "MED-028",
    name: "Potassium Chloride 15% Conc Infusion",
    brandName: "Potkcl Concentrated",
    category: "Emergency",
    batchNumber: "BAT-2026-KCL99",
    supplier: "Lupin Bulk Distribution",
    supplierId: "SUP-007",
    quantity: 320,
    threshold: 70,
    unitPrice: 34.0,
    unit: "ampoules",
    expiryDate: "2027-04-12",
    storage: "Controlled Substance Safe",
    status: "In Stock"
  }
];

export const initialSuppliers: Supplier[] = [
  {
    id: "SUP-001",
    name: "Sun Pharma Clinical Ltd",
    contactPerson: "Dr. Arvind Raghavan",
    email: "arvind.r@sunpharma-clinical.com",
    phone: "+91 98402 11928",
    location: "Chennai Tech Park, Guindy, TN",
    totalOrders: 142,
    activeOrders: 3,
    rating: 4.9,
    paymentTerms: "Net 30 Days",
    categories: ["Antibiotics", "Injections", "Cardiovascular"]
  },
  {
    id: "SUP-002",
    name: "Cipla Healthcare Labs",
    contactPerson: "Meera Sundaram",
    email: "meera.s@cipla-institutional.org",
    phone: "+91 94440 88219",
    location: "Ambattur Industrial Estate, Chennai",
    totalOrders: 198,
    activeOrders: 4,
    rating: 4.8,
    paymentTerms: "Net 45 Days",
    categories: ["Antibiotics", "Respiratory", "Injections"]
  },
  {
    id: "SUP-003",
    name: "Dr. Reddy's Hospital Supply",
    contactPerson: "Kavitha Natarajan",
    email: "orders@drreddys-med.in",
    phone: "+91 97909 33201",
    location: "OMR IT Corridor, Sholinganallur, TN",
    totalOrders: 112,
    activeOrders: 2,
    rating: 4.7,
    paymentTerms: "Net 30 Days",
    categories: ["Antibiotics", "Analgesics", "Antidiabetic"]
  },
  {
    id: "SUP-004",
    name: "Apollo MedTech Distributors",
    contactPerson: "Rajesh Kannan",
    email: "supply@apollomedtech.co.in",
    phone: "+91 98840 55102",
    location: "Greams Road Commercial Hub, Chennai",
    totalOrders: 260,
    activeOrders: 5,
    rating: 4.9,
    paymentTerms: "Net 15 Days",
    categories: ["Emergency", "Analgesics", "Cardiovascular"]
  },
  {
    id: "SUP-005",
    name: "Zydus Lifesciences Institutional",
    contactPerson: "Pooja Varma",
    email: "pooja.v@zyduslife-care.com",
    phone: "+91 91760 99403",
    location: "Saidapet Central, Chennai",
    totalOrders: 89,
    activeOrders: 2,
    rating: 4.6,
    paymentTerms: "Net 30 Days",
    categories: ["Analgesics", "Cardiovascular"]
  },
  {
    id: "SUP-006",
    name: "Abbott Point-of-Care Solutions",
    contactPerson: "Venkatesh Iyer",
    email: "venkatesh.i@abbott-poc.com",
    phone: "+91 99620 44109",
    location: "T. Nagar Business District, Chennai",
    totalOrders: 165,
    activeOrders: 3,
    rating: 4.9,
    paymentTerms: "Net 30 Days",
    categories: ["Vitamins", "Antidiabetic"]
  },
  {
    id: "SUP-007",
    name: "Lupin Bulk Distribution",
    contactPerson: "Sneha Swaminathan",
    email: "institutional@lupinpharma.in",
    phone: "+91 90030 77124",
    location: "Porur Logistics Hub, Chennai",
    totalOrders: 74,
    activeOrders: 1,
    rating: 4.5,
    paymentTerms: "Net 60 Days",
    categories: ["Vitamins", "Emergency"]
  },
  {
    id: "SUP-008",
    name: "Glenmark Specialized Therapeutics",
    contactPerson: "Girish Chandran",
    email: "hospital.orders@glenmark-care.com",
    phone: "+91 98410 66318",
    location: "Alandur Biotech Avenue, Chennai",
    totalOrders: 95,
    activeOrders: 2,
    rating: 4.7,
    paymentTerms: "Net 45 Days",
    categories: ["Injections", "Emergency"]
  }
];

export const initialUsers: User[] = [
  {
    id: "USR-001",
    name: "Dr. K. Senthil Nathan, MD",
    email: "senthil.nathan@sathyabama.ac.in",
    role: "Doctor",
    department: "Cardiology & Intensive Care",
    status: "Active",
    phone: "+91 98401 23456",
    joinedDate: "2021-04-10"
  },
  {
    id: "USR-002",
    name: "Lakshmi Priya, M.Pharm",
    email: "lakshmi.priya@sathyabama.ac.in",
    role: "Pharmacist",
    department: "Central Inpatient Pharmacy",
    status: "Active",
    phone: "+91 94441 56789",
    joinedDate: "2022-01-15",
    avatar: "/src/assets/images/doctor_avatar_lead_1790660187855.jpg"
  },
  {
    id: "USR-003",
    name: "Sister Mary Anitha, RN",
    email: "mary.anitha@sathyabama.ac.in",
    role: "Ward Staff",
    department: "Emergency & Trauma Ward 4A",
    status: "Active",
    phone: "+91 97901 99887",
    joinedDate: "2022-06-20"
  },
  {
    id: "USR-004",
    name: "Prof. R. Balaji, MBA",
    email: "admin.balaji@sathyabama.ac.in",
    role: "Admin",
    department: "Hospital Administration",
    status: "Active",
    phone: "+91 98841 11223",
    joinedDate: "2020-03-01"
  },
  {
    id: "USR-005",
    name: "N. Vigneshwaran, SCM",
    email: "vignesh.procure@sathyabama.ac.in",
    role: "Procurement Manager",
    department: "Pharmacy Supply Chain",
    status: "Active",
    phone: "+91 91761 44556",
    joinedDate: "2021-09-12"
  },
  {
    id: "USR-006",
    name: "CA Deepa Ramakrishnan",
    email: "deepa.audit@sathyabama.ac.in",
    role: "Audit Officer",
    department: "Clinical Quality & Compliance",
    status: "Active",
    phone: "+91 99621 77889",
    joinedDate: "2022-11-05"
  },
  {
    id: "USR-007",
    name: "Dr. A. Preetha, MS (Ortho)",
    email: "preetha.ortho@sathyabama.ac.in",
    role: "Doctor",
    department: "Orthopedic Surgery",
    status: "Active",
    phone: "+91 90031 33445",
    joinedDate: "2023-02-18"
  },
  {
    id: "USR-008",
    name: "G. Karthikeyan, B.Pharm",
    email: "karthi.dispense@sathyabama.ac.in",
    role: "Pharmacist",
    department: "Night Shift Emergency Pharmacy",
    status: "Active",
    phone: "+91 98411 66778",
    joinedDate: "2023-05-30"
  },
  {
    id: "USR-009",
    name: "Staff Nurse T. Kalpana",
    email: "kalpana.ward@sathyabama.ac.in",
    role: "Ward Staff",
    department: "Pediatric Ward 2B",
    status: "Active",
    phone: "+91 97101 22334",
    joinedDate: "2023-08-14"
  },
  {
    id: "USR-010",
    name: "Dr. V. Rajesh, MD (Peds)",
    email: "rajesh.peds@sathyabama.ac.in",
    role: "Doctor",
    department: "Pediatrics & Neonatology",
    status: "Inactive",
    phone: "+91 96001 88990",
    joinedDate: "2021-12-01"
  }
];

export const initialDispensingRecords: DispensingRecord[] = [
  {
    id: "DISP-10492",
    prescriptionId: "RX-88410",
    patientName: "A. Ramanathan",
    patientId: "PID-4819",
    doctorName: "Dr. K. Senthil Nathan, MD",
    medicineId: "MED-001",
    medicineName: "Amoxicillin + Clavulanic Acid 625mg",
    quantity: 14,
    pharmacist: "Lakshmi Priya, M.Pharm",
    ward: "ICU Ward 3B",
    timestamp: "10 mins ago",
    status: "Dispensed",
    notes: "Post-op prophylaxis BID x 7 days"
  },
  {
    id: "DISP-10491",
    prescriptionId: "RX-88409",
    patientName: "Meenakshi Sundaram",
    patientId: "PID-5022",
    doctorName: "Dr. A. Preetha, MS (Ortho)",
    medicineId: "MED-006",
    medicineName: "Paracetamol IV Infusion 10mg/ml 100ml",
    quantity: 2,
    pharmacist: "Lakshmi Priya, M.Pharm",
    ward: "Orthopedics Post-Op",
    timestamp: "35 mins ago",
    status: "Dispensed",
    notes: "Infuse over 20 mins for acute post-reduction fever"
  },
  {
    id: "DISP-10490",
    prescriptionId: "RX-88408",
    patientName: "Vijay Anand K.",
    patientId: "PID-3912",
    doctorName: "Dr. K. Senthil Nathan, MD",
    medicineId: "MED-015",
    medicineName: "Pantoprazole Sodium 40mg IV Vial",
    quantity: 1,
    pharmacist: "G. Karthikeyan, B.Pharm",
    ward: "Emergency Trauma Care",
    timestamp: "1 hour ago",
    status: "Dispensed",
    notes: "Slow IV push stat"
  },
  {
    id: "DISP-10489",
    prescriptionId: "RX-88407",
    patientName: "K. Revathi Devi",
    patientId: "PID-6291",
    doctorName: "Dr. V. Rajesh, MD (Peds)",
    medicineId: "MED-022",
    medicineName: "Salbutamol 5mg/ml Respirator Solution",
    quantity: 2,
    pharmacist: "Lakshmi Priya, M.Pharm",
    ward: "Pediatrics Ward 2B",
    timestamp: "2 hours ago",
    status: "Dispensed",
    notes: "Nebulize with 3ml Normal Saline stat"
  },
  {
    id: "DISP-10488",
    prescriptionId: "RX-88406",
    patientName: "S. Balasubramanian",
    patientId: "PID-4105",
    doctorName: "Dr. K. Senthil Nathan, MD",
    medicineId: "MED-020",
    medicineName: "Amlodipine Besylate 5mg",
    quantity: 30,
    pharmacist: "G. Karthikeyan, B.Pharm",
    ward: "Cardiology Daycare",
    timestamp: "3 hours ago",
    status: "Dispensed",
    notes: "Monthly refill for hypertension"
  },
  {
    id: "DISP-10487",
    prescriptionId: "RX-88405",
    patientName: "Deepak Chandran",
    patientId: "PID-5580",
    doctorName: "Dr. A. Preetha, MS (Ortho)",
    medicineId: "MED-007",
    medicineName: "Tramadol HCl 50mg/ml Ampoule",
    quantity: 2,
    pharmacist: "Lakshmi Priya, M.Pharm",
    ward: "ICU Ward 3B",
    timestamp: "4 hours ago",
    status: "Dispensed",
    notes: "High-alert analgesic; double checked ID"
  },
  {
    id: "DISP-10486",
    prescriptionId: "RX-88404",
    patientName: "Ananya Swaminathan",
    patientId: "PID-7120",
    doctorName: "Dr. K. Senthil Nathan, MD",
    medicineId: "MED-004",
    medicineName: "Azithromycin 500mg Film-Coated",
    quantity: 6,
    pharmacist: "G. Karthikeyan, B.Pharm",
    ward: "General Medical Ward",
    timestamp: "5 hours ago",
    status: "Rejected",
    notes: "Stock zero; substituted by clinician order"
  },
  {
    id: "DISP-10485",
    prescriptionId: "RX-88403",
    patientName: "G. Mohammed Tariq",
    patientId: "PID-6632",
    doctorName: "Dr. K. Senthil Nathan, MD",
    medicineId: "MED-024",
    medicineName: "Insulin Glargine 100 IU/ml 3ml Cartridge",
    quantity: 1,
    pharmacist: "Lakshmi Priya, M.Pharm",
    ward: "Endocrinology Inpatient",
    timestamp: "6 hours ago",
    status: "Dispensed",
    notes: "Dispensed in cold pouch for bedside storage"
  }
];

export const initialAlerts: InventoryAlert[] = [
  {
    id: "ALT-001",
    type: "low_stock",
    medicineId: "MED-003",
    medicineName: "Meropenem Trihydrate 1g Injection",
    batchNumber: "BAT-2026-MER99",
    currentStock: 18,
    threshold: 50,
    expiryDate: "2026-10-09",
    daysRemaining: 11,
    severity: "critical",
    timestamp: "Today, 08:30 AM",
    reviewed: false
  },
  {
    id: "ALT-002",
    type: "expiry",
    medicineId: "MED-012",
    medicineName: "Multivitamin Infusion (MVI Adult)",
    batchNumber: "BAT-2025-MVI19",
    currentStock: 65,
    threshold: 60,
    expiryDate: "2026-09-25",
    daysRemaining: -3,
    severity: "critical",
    timestamp: "Today, 07:15 AM",
    reviewed: false
  },
  {
    id: "ALT-003",
    type: "low_stock",
    medicineId: "MED-004",
    medicineName: "Azithromycin 500mg Film-Coated",
    batchNumber: "BAT-2025-AZI04",
    currentStock: 0,
    threshold: 100,
    expiryDate: "2026-09-12",
    daysRemaining: -16,
    severity: "critical",
    timestamp: "Yesterday, 04:00 PM",
    reviewed: false
  },
  {
    id: "ALT-004",
    type: "expiry",
    medicineId: "MED-027",
    medicineName: "Atropine Sulfate 0.6mg/ml Ampoule",
    batchNumber: "BAT-2025-ATR62",
    currentStock: 75,
    threshold: 80,
    expiryDate: "2026-10-04",
    daysRemaining: 6,
    severity: "high",
    timestamp: "Yesterday, 11:20 AM",
    reviewed: false
  },
  {
    id: "ALT-005",
    type: "low_stock",
    medicineId: "MED-002",
    medicineName: "Ceftriaxone Sodium 1g Vial",
    batchNumber: "BAT-2026-CEF08",
    currentStock: 42,
    threshold: 120,
    expiryDate: "2026-10-18",
    daysRemaining: 20,
    severity: "high",
    timestamp: "Sep 26, 2026",
    reviewed: false
  },
  {
    id: "ALT-006",
    type: "low_stock",
    medicineId: "MED-024",
    medicineName: "Insulin Glargine 100 IU/ml 3ml Cartridge",
    batchNumber: "BAT-2026-INS19",
    currentStock: 28,
    threshold: 60,
    expiryDate: "2026-10-11",
    daysRemaining: 13,
    severity: "high",
    timestamp: "Sep 25, 2026",
    reviewed: true
  },
  {
    id: "ALT-007",
    type: "expiry",
    medicineId: "MED-008",
    medicineName: "Diclofenac Sodium 75mg/3ml Ampoule",
    batchNumber: "BAT-2025-DIC88",
    currentStock: 110,
    threshold: 150,
    expiryDate: "2026-10-06",
    daysRemaining: 8,
    severity: "medium",
    timestamp: "Sep 24, 2026",
    reviewed: true
  }
];

export const initialPurchaseOrders: PurchaseOrder[] = [
  {
    id: "PO-2026-901",
    poNumber: "PO-SAT-26-0901",
    supplierId: "SUP-002",
    supplierName: "Cipla Healthcare Labs",
    items: [
      { medicineName: "Meropenem Trihydrate 1g Injection", quantity: 200, unitPrice: 480.0 },
      { medicineName: "Ceftriaxone Sodium 1g Vial", quantity: 500, unitPrice: 62.0 }
    ],
    totalQuantity: 700,
    totalValue: 127000,
    status: "Approved",
    createdDate: "2026-09-27",
    expectedDelivery: "2026-10-02"
  },
  {
    id: "PO-2026-902",
    poNumber: "PO-SAT-26-0902",
    supplierId: "SUP-003",
    supplierName: "Dr. Reddy's Hospital Supply",
    items: [
      { medicineName: "Azithromycin 500mg Film-Coated", quantity: 1000, unitPrice: 24.0 },
      { medicineName: "Enoxaparin Sodium 40mg/0.4ml Prefilled", quantity: 300, unitPrice: 340.0 }
    ],
    totalQuantity: 1300,
    totalValue: 126000,
    status: "Pending",
    createdDate: "2026-09-28",
    expectedDelivery: "2026-10-05"
  },
  {
    id: "PO-2026-903",
    poNumber: "PO-SAT-26-0903",
    supplierId: "SUP-006",
    supplierName: "Abbott Point-of-Care Solutions",
    items: [
      { medicineName: "Insulin Glargine 100 IU/ml 3ml Cartridge", quantity: 250, unitPrice: 620.0 }
    ],
    totalQuantity: 250,
    totalValue: 155000,
    status: "Approved",
    createdDate: "2026-09-26",
    expectedDelivery: "2026-10-01"
  },
  {
    id: "PO-2026-898",
    poNumber: "PO-SAT-26-0898",
    supplierId: "SUP-001",
    supplierName: "Sun Pharma Clinical Ltd",
    items: [
      { medicineName: "Amoxicillin + Clavulanic Acid 625mg", quantity: 2000, unitPrice: 18.5 },
      { medicineName: "Pantoprazole Sodium 40mg IV Vial", quantity: 1000, unitPrice: 48.0 }
    ],
    totalQuantity: 3000,
    totalValue: 85000,
    status: "Delivered",
    createdDate: "2026-09-18",
    expectedDelivery: "2026-09-23"
  },
  {
    id: "PO-2026-897",
    poNumber: "PO-SAT-26-0897",
    supplierId: "SUP-004",
    supplierName: "Apollo MedTech Distributors",
    items: [
      { medicineName: "Paracetamol IV Infusion 10mg/ml 100ml", quantity: 1500, unitPrice: 55.0 },
      { medicineName: "Adrenaline 1:1000 1mg/ml", quantity: 300, unitPrice: 19.0 }
    ],
    totalQuantity: 1800,
    totalValue: 88200,
    status: "Delivered",
    createdDate: "2026-09-15",
    expectedDelivery: "2026-09-20"
  },
  {
    id: "PO-2026-895",
    poNumber: "PO-SAT-26-0895",
    supplierId: "SUP-007",
    supplierName: "Lupin Bulk Distribution",
    items: [
      { medicineName: "Multivitamin Infusion (MVI Adult)", quantity: 200, unitPrice: 210.0 }
    ],
    totalQuantity: 200,
    totalValue: 42000,
    status: "Pending",
    createdDate: "2026-09-27",
    expectedDelivery: "2026-10-04"
  }
];

export const initialAuditLogs: AuditLogItem[] = [
  {
    id: "AUD-991",
    timestamp: "2026-09-28 21:45:10",
    user: "Lakshmi Priya, M.Pharm",
    role: "Pharmacist",
    action: "Prescription Dispensed",
    module: "Dispensing",
    details: "Fulfilled RX-88410: Amoxicillin 625mg x14 units to patient PID-4819",
    status: "success"
  },
  {
    id: "AUD-990",
    timestamp: "2026-09-28 20:30:22",
    user: "N. Vigneshwaran, SCM",
    role: "Procurement Manager",
    action: "Purchase Order Created",
    module: "Procurement",
    details: "Generated PO-SAT-26-0902 for Dr. Reddy's Hospital Supply (₹1,26,000)",
    status: "info"
  },
  {
    id: "AUD-989",
    timestamp: "2026-09-28 19:12:44",
    user: "System Clinical Engine",
    role: "Admin",
    action: "Critical Expiry Alert",
    module: "Inventory",
    details: "Triggered alert for MVI Adult (Batch BAT-2025-MVI19 expired 3 days ago)",
    status: "warning"
  },
  {
    id: "AUD-988",
    timestamp: "2026-09-28 17:55:00",
    user: "Prof. R. Balaji, MBA",
    role: "Admin",
    action: "User Role Modified",
    module: "Users",
    details: "Granted Audit Officer privileges to CA Deepa Ramakrishnan",
    status: "info"
  },
  {
    id: "AUD-987",
    timestamp: "2026-09-28 16:40:18",
    user: "G. Karthikeyan, B.Pharm",
    role: "Pharmacist",
    action: "Stock Adjusted",
    module: "Inventory",
    details: "Reconciled Paracetamol IV count (+50 bottles found in emergency buffer)",
    status: "success"
  },
  {
    id: "AUD-986",
    timestamp: "2026-09-28 14:15:30",
    user: "Dr. K. Senthil Nathan, MD",
    role: "Doctor",
    action: "Electronic Prescription Signed",
    module: "Dispensing",
    details: "Issued RX-88405: Tramadol Inj x2 for post-cardiac catheterization",
    status: "info"
  },
  {
    id: "AUD-985",
    timestamp: "2026-09-28 11:20:05",
    user: "Sister Mary Anitha, RN",
    role: "Ward Staff",
    action: "Ward Indent Received",
    module: "Dispensing",
    details: "Confirmed handover of 15 emergency ampoules to Trauma Ward 4A",
    status: "success"
  }
];

// 30 Days of Consumption Trend Mock Data
export const consumptionTrend30Days = [
  { date: "Sep 01", count: 320, emergency: 45, routine: 275, value: 58400 },
  { date: "Sep 02", count: 345, emergency: 52, routine: 293, value: 61200 },
  { date: "Sep 03", count: 310, emergency: 40, routine: 270, value: 54900 },
  { date: "Sep 04", count: 380, emergency: 68, routine: 312, value: 69800 },
  { date: "Sep 05", count: 410, emergency: 74, routine: 336, value: 76400 },
  { date: "Sep 06", count: 390, emergency: 60, routine: 330, value: 71200 },
  { date: "Sep 07", count: 360, emergency: 48, routine: 312, value: 64500 },
  { date: "Sep 08", count: 425, emergency: 80, routine: 345, value: 79200 },
  { date: "Sep 09", count: 440, emergency: 85, routine: 355, value: 83100 },
  { date: "Sep 10", count: 405, emergency: 70, routine: 335, value: 74600 },
  { date: "Sep 11", count: 375, emergency: 55, routine: 320, value: 68300 },
  { date: "Sep 12", count: 460, emergency: 92, routine: 368, value: 87500 },
  { date: "Sep 13", count: 480, emergency: 98, routine: 382, value: 91400 },
  { date: "Sep 14", count: 430, emergency: 76, routine: 354, value: 81000 },
  { date: "Sep 15", count: 395, emergency: 62, routine: 333, value: 73800 },
  { date: "Sep 16", count: 415, emergency: 69, routine: 346, value: 78200 },
  { date: "Sep 17", count: 450, emergency: 84, routine: 366, value: 85900 },
  { date: "Sep 18", count: 470, emergency: 88, routine: 382, value: 89300 },
  { date: "Sep 19", count: 495, emergency: 95, routine: 400, value: 94800 },
  { date: "Sep 20", count: 520, emergency: 104, routine: 416, value: 99400 },
  { date: "Sep 21", count: 485, emergency: 90, routine: 395, value: 92300 },
  { date: "Sep 22", count: 440, emergency: 78, routine: 362, value: 83500 },
  { date: "Sep 23", count: 465, emergency: 86, routine: 379, value: 88100 },
  { date: "Sep 24", count: 510, emergency: 99, routine: 411, value: 97600 },
  { date: "Sep 25", count: 535, emergency: 108, routine: 427, value: 103200 },
  { date: "Sep 26", count: 490, emergency: 92, routine: 398, value: 94100 },
  { date: "Sep 27", count: 540, emergency: 112, routine: 428, value: 105400 },
  { date: "Sep 28", count: 565, emergency: 118, routine: 447, value: 112800 }
];

// Department / Ward Dispensing Distribution
export const departmentDispensingData = [
  { name: "ICU & CCU", count: 480, fill: "#0F766E" },
  { name: "Emergency", count: 540, fill: "#14B8A6" },
  { name: "General Wards", count: 620, fill: "#0D9488" },
  { name: "Cardiology", count: 390, fill: "#2DD4BF" },
  { name: "Pediatrics", count: 280, fill: "#10B981" },
  { name: "Oncology", count: 210, fill: "#059669" },
  { name: "Orthopedics", count: 310, fill: "#34D399" },
  { name: "Post-Op Surgery", count: 350, fill: "#047857" }
];

// Category Distribution for Donut Chart
export const categoryDistributionData = [
  { name: "Antibiotics", count: 5, units: 1770, fill: "#0F766E" },
  { name: "Analgesics", count: 4, units: 1185, fill: "#14B8A6" },
  { name: "Injections", count: 5, units: 2478, fill: "#10B981" },
  { name: "Vitamins", count: 4, units: 4415, fill: "#059669" },
  { name: "Cardiovascular", count: 3, units: 4060, fill: "#047857" },
  { name: "Respiratory", count: 2, units: 790, fill: "#6EE7B7" },
  { name: "Antidiabetic", count: 2, units: 2828, fill: "#34D399" },
  { name: "Emergency", count: 3, units: 635, fill: "#F59E0B" }
];

// 6 Months Consumption Trend for Reports
export const sixMonthsTrend = [
  { month: "Apr 2026", totalDispensed: 11200, revenue: 2180000, expiredDisposed: 42 },
  { month: "May 2026", totalDispensed: 12450, revenue: 2450000, expiredDisposed: 38 },
  { month: "Jun 2026", totalDispensed: 13100, revenue: 2610000, expiredDisposed: 29 },
  { month: "Jul 2026", totalDispensed: 14200, revenue: 2890000, expiredDisposed: 24 },
  { month: "Aug 2026", totalDispensed: 15350, revenue: 3120000, expiredDisposed: 18 },
  { month: "Sep 2026", totalDispensed: 16820, revenue: 3410000, expiredDisposed: 15 }
];

// Permission Matrix Data
export const permissionsMatrix = [
  { module: "Prescribe Medicines", Doctor: true, Pharmacist: false, "Ward Staff": false, Admin: true, "Procurement Manager": false, "Audit Officer": false },
  { module: "Dispense Prescriptions", Doctor: false, Pharmacist: true, "Ward Staff": false, Admin: true, "Procurement Manager": false, "Audit Officer": false },
  { module: "Manage Inventory & Stock", Doctor: false, Pharmacist: true, "Ward Staff": false, Admin: true, "Procurement Manager": true, "Audit Officer": false },
  { module: "Create & Approve POs", Doctor: false, Pharmacist: false, "Ward Staff": false, Admin: true, "Procurement Manager": true, "Audit Officer": false },
  { module: "View Audit & Compliance Reports", Doctor: true, Pharmacist: true, "Ward Staff": false, Admin: true, "Procurement Manager": true, "Audit Officer": true },
  { module: "User & Role Management", Doctor: false, Pharmacist: false, "Ward Staff": false, Admin: true, "Procurement Manager": false, "Audit Officer": false },
  { module: "Disposal & Quarantine Approval", Doctor: true, Pharmacist: true, "Ward Staff": false, Admin: true, "Procurement Manager": false, "Audit Officer": true }
];
