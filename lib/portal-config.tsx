// Shared configuration between Partner Dashboard and Investor Portal
// This simulates what would be stored in a database per-partner

// ============================================
// PARTNER DATA (Set by us after KYC verification)
// ============================================
export const partnerData = {
  id: "partner-apex-001",
  companyName: "Apex Wealth Advisors",
  legalName: "Apex Wealth Advisors Pvt. Ltd.",
  registrationNumber: "CIN U67190MH2019PTC123456",
  contactPerson: "Rajesh Sharma",
  email: "rajesh@apexwealth.in",
  phone: "+91 98765 43210",
  address: "501, Trade Tower, BKC, Mumbai, Maharashtra 400051",
  kycStatus: "verified" as const,
  kycVerifiedDate: "2024-08-15",
  agreementSignedDate: "2024-08-20",
  partnerSince: "2024-08-20",
  partnerTier: "Gold" as const, // Bronze, Silver, Gold, Platinum
  commissionRate: 0.75, // Base commission rate
};

// ============================================
// BRANDING (Configured by partner in dashboard)
// ============================================
export const partnerBranding = {
  displayName: "Apex Investments",
  tagline: "Smart Investing, Secure Future",
  welcomeMessage: "Welcome to Apex Investments! Start your journey towards financial freedom with our carefully curated bond portfolio.",
  logoUrl: "/partner-logo.svg", // Uploaded by partner
  logoInitial: "AI",
  colors: {
    primary: "#0d9488", // Teal
    primaryLight: "#14b8a6",
    primaryDark: "#0f766e",
    accent: "#f59e0b",
    background: "#f0fdfa",
  },
  customDomain: "invest.apexwealth.in",
  domainStatus: "active" as const, // pending, active, failed
  supportEmail: "support@apexwealth.in",
  supportPhone: "+91 98765 43210",
  socialLinks: {
    website: "https://apexwealth.in",
    linkedin: "https://linkedin.com/company/apexwealth",
    twitter: "https://twitter.com/apexwealth",
  },
};

// ============================================
// FEATURE TOGGLES (Configured by partner)
// ============================================
export const partnerFeatures = {
  autoReinvest: true,
  portfolioInsights: true,
  priceAlerts: true,
  taxReports: true,
  mobileApp: false,
  chatSupport: true,
  recurringInvestments: true,
  bondComparison: true,
  sipMode: true,
  goalBasedInvesting: false,
};

// ============================================
// COMMISSION SETTINGS
// ============================================
export const commissionSettings = {
  defaultRate: 0.75,
  bondSpecificRates: {
    "govt-bonds": 0.50,
    "corp-bonds": 0.85,
    "muni-bonds": 0.65,
    "green-bonds": 0.70,
    "psu-bonds": 0.55,
  } as Record<string, number>,
  tierBonuses: {
    Bronze: 0,
    Silver: 0.05,
    Gold: 0.10,
    Platinum: 0.15,
  },
};

// ============================================
// AVAILABLE BONDS (Our platform's catalog)
// ============================================
export const bondCatalog = [
  {
    id: "sbi-bond-2029",
    name: "SBI Bond 2029",
    issuer: "State Bank of India",
    type: "PSU",
    category: "psu-bonds",
    yield: 7.85,
    minInvestment: 10000,
    maturityDate: "2029-06-15",
    rating: "AAA",
    riskLevel: "Low" as const,
    description: "Senior unsecured bonds from India's largest public sector bank with government backing.",
    totalAvailable: 50000000,
    enabled: true, // Partner can toggle
    isTopPick: true,
  },
  {
    id: "hdfc-bond-2028",
    name: "HDFC Ltd Bond 2028",
    issuer: "HDFC Limited",
    type: "Corporate",
    category: "corp-bonds",
    yield: 8.25,
    minInvestment: 25000,
    maturityDate: "2028-03-20",
    rating: "AAA",
    riskLevel: "Low" as const,
    description: "Premium corporate bond from India's leading housing finance company.",
    totalAvailable: 30000000,
    enabled: true,
    isTopPick: true,
  },
  {
    id: "govt-gsec-2030",
    name: "Government G-Sec 2030",
    issuer: "Government of India",
    type: "Government",
    category: "govt-bonds",
    yield: 7.18,
    minInvestment: 10000,
    maturityDate: "2030-12-22",
    rating: "Sovereign",
    riskLevel: "Low" as const,
    description: "Government securities backed by the sovereign guarantee of India.",
    totalAvailable: 100000000,
    enabled: true,
    isTopPick: true,
  },
  {
    id: "tata-power-green-2031",
    name: "Tata Power Green Bond 2031",
    issuer: "Tata Power Company",
    type: "Green",
    category: "green-bonds",
    yield: 8.50,
    minInvestment: 50000,
    maturityDate: "2031-09-10",
    rating: "AA+",
    riskLevel: "Medium" as const,
    description: "Green bond funding renewable energy projects including solar and wind installations.",
    totalAvailable: 25000000,
    enabled: true,
    isTopPick: false,
  },
  {
    id: "reliance-bond-2027",
    name: "Reliance Industries Bond 2027",
    issuer: "Reliance Industries Ltd",
    type: "Corporate",
    category: "corp-bonds",
    yield: 8.10,
    minInvestment: 25000,
    maturityDate: "2027-07-30",
    rating: "AAA",
    riskLevel: "Low" as const,
    description: "Short-term corporate bond from India's largest private sector company.",
    totalAvailable: 40000000,
    enabled: true,
    isTopPick: false,
  },
  {
    id: "ntpc-bond-2029",
    name: "NTPC Bond 2029",
    issuer: "NTPC Limited",
    type: "PSU",
    category: "psu-bonds",
    yield: 7.65,
    minInvestment: 10000,
    maturityDate: "2029-11-15",
    rating: "AAA",
    riskLevel: "Low" as const,
    description: "Bonds from India's largest power generation company with government ownership.",
    totalAvailable: 35000000,
    enabled: true,
    isTopPick: false,
  },
  {
    id: "icici-bond-2028",
    name: "ICICI Bank Bond 2028",
    issuer: "ICICI Bank",
    type: "Corporate",
    category: "corp-bonds",
    yield: 8.00,
    minInvestment: 25000,
    maturityDate: "2028-04-25",
    rating: "AAA",
    riskLevel: "Low" as const,
    description: "Tier-2 capital bonds from one of India's largest private sector banks.",
    totalAvailable: 45000000,
    enabled: false, // Partner disabled this
    isTopPick: false,
  },
  {
    id: "rec-green-2032",
    name: "REC Green Bond 2032",
    issuer: "Rural Electrification Corp",
    type: "Green",
    category: "green-bonds",
    yield: 7.90,
    minInvestment: 25000,
    maturityDate: "2032-02-28",
    rating: "AAA",
    riskLevel: "Low" as const,
    description: "Green bond financing rural electrification and renewable energy projects.",
    totalAvailable: 20000000,
    enabled: true,
    isTopPick: false,
  },
];

// ============================================
// INVESTORS (Who invested through this partner)
// ============================================
export const partnerInvestors = [
  {
    id: "inv-001",
    name: "Priya Patel",
    email: "priya.patel@email.com",
    phone: "+91 98123 45678",
    pan: "ABCDE1234F",
    kycStatus: "verified" as const,
    joinDate: "2024-09-05",
    lastActivity: "2026-02-03",
    totalInvested: 750000,
    currentValue: 812500,
    activeHoldings: 4,
  },
  {
    id: "inv-002",
    name: "Amit Kumar",
    email: "amit.kumar@email.com",
    phone: "+91 99876 54321",
    pan: "FGHIJ5678K",
    kycStatus: "verified" as const,
    joinDate: "2024-09-12",
    lastActivity: "2026-02-01",
    totalInvested: 1250000,
    currentValue: 1387500,
    activeHoldings: 5,
  },
  {
    id: "inv-003",
    name: "Sneha Reddy",
    email: "sneha.r@email.com",
    phone: "+91 97654 32109",
    pan: "KLMNO9012P",
    kycStatus: "verified" as const,
    joinDate: "2024-10-01",
    lastActivity: "2026-01-28",
    totalInvested: 500000,
    currentValue: 537500,
    activeHoldings: 3,
  },
  {
    id: "inv-004",
    name: "Vikram Singh",
    email: "vikram.s@email.com",
    phone: "+91 96543 21098",
    pan: "PQRST3456U",
    kycStatus: "pending" as const,
    joinDate: "2026-01-15",
    lastActivity: "2026-01-20",
    totalInvested: 0,
    currentValue: 0,
    activeHoldings: 0,
  },
  {
    id: "inv-005",
    name: "Ananya Sharma",
    email: "ananya.sharma@email.com",
    phone: "+91 95432 10987",
    pan: "VWXYZ7890A",
    kycStatus: "verified" as const,
    joinDate: "2024-11-20",
    lastActivity: "2026-02-02",
    totalInvested: 2000000,
    currentValue: 2225000,
    activeHoldings: 6,
  },
  {
    id: "inv-006",
    name: "Ravi Menon",
    email: "ravi.menon@email.com",
    phone: "+91 94321 09876",
    pan: "BCDEF1234G",
    kycStatus: "verified" as const,
    joinDate: "2024-12-05",
    lastActivity: "2026-01-30",
    totalInvested: 350000,
    currentValue: 378000,
    activeHoldings: 2,
  },
  {
    id: "inv-007",
    name: "Meera Iyer",
    email: "meera.iyer@email.com",
    phone: "+91 93210 98765",
    pan: "GHIJK5678L",
    kycStatus: "rejected" as const,
    joinDate: "2026-01-25",
    lastActivity: "2026-01-25",
    totalInvested: 0,
    currentValue: 0,
    activeHoldings: 0,
  },
  {
    id: "inv-008",
    name: "Karthik Nair",
    email: "karthik.n@email.com",
    phone: "+91 92109 87654",
    pan: "LMNOP9012Q",
    kycStatus: "verified" as const,
    joinDate: "2025-01-10",
    lastActivity: "2026-02-03",
    totalInvested: 875000,
    currentValue: 943750,
    activeHoldings: 4,
  },
];

// ============================================
// PARTNER EARNINGS & PAYOUTS
// ============================================
export const partnerEarnings = {
  totalEarned: 425000,
  pendingPayout: 48750,
  lastPayoutDate: "2026-01-15",
  lastPayoutAmount: 52500,
  nextPayoutDate: "2026-02-15",
  nextPayoutEstimate: 48750,
  bankDetails: {
    accountName: "Apex Wealth Advisors Pvt Ltd",
    accountNumber: "XXXX XXXX 4523",
    ifscCode: "HDFC0001234",
    bankName: "HDFC Bank",
  },
  payoutHistory: [
    { id: "pay-001", date: "2026-01-15", amount: 52500, status: "completed" as const },
    { id: "pay-002", date: "2025-12-15", amount: 48250, status: "completed" as const },
    { id: "pay-003", date: "2025-11-15", amount: 45000, status: "completed" as const },
    { id: "pay-004", date: "2025-10-15", amount: 42500, status: "completed" as const },
    { id: "pay-005", date: "2025-09-15", amount: 38750, status: "completed" as const },
  ],
};

// ============================================
// PARTNER DASHBOARD STATS
// ============================================
export const partnerStats = {
  totalInvestmentByUsers: 5725000,
  totalCommissionEarned: 425000,
  activeInvestors: 6,
  totalInvestors: 8,
  pendingKyc: 1,
  monthlyEarnings: 48750,
  averageInvestmentSize: 715625,
  topBondByInvestment: "hdfc-bond-2028",
  growthRate: 18.5, // month over month %
};

// ============================================
// RECENT ACTIVITY (Partner dashboard feed)
// ============================================
export const recentActivity = [
  {
    id: "act-001",
    type: "investment" as const,
    investorName: "Priya Patel",
    bondName: "HDFC Ltd Bond 2028",
    amount: 100000,
    timestamp: "2026-02-03T10:30:00Z",
  },
  {
    id: "act-002",
    type: "kyc_verified" as const,
    investorName: "Karthik Nair",
    timestamp: "2026-02-03T09:15:00Z",
  },
  {
    id: "act-003",
    type: "investment" as const,
    investorName: "Amit Kumar",
    bondName: "SBI Bond 2029",
    amount: 250000,
    timestamp: "2026-02-02T16:45:00Z",
  },
  {
    id: "act-004",
    type: "withdrawal" as const,
    investorName: "Sneha Reddy",
    bondName: "Government G-Sec 2030",
    amount: 50000,
    timestamp: "2026-02-02T14:20:00Z",
  },
  {
    id: "act-005",
    type: "new_investor" as const,
    investorName: "Vikram Singh",
    timestamp: "2026-02-01T11:00:00Z",
  },
  {
    id: "act-006",
    type: "interest_payout" as const,
    investorName: "Ananya Sharma",
    bondName: "Tata Power Green Bond 2031",
    amount: 10625,
    timestamp: "2026-01-31T09:00:00Z",
  },
];

// ============================================
// SAMPLE INVESTOR DATA (for investor portal)
// ============================================
export const sampleInvestorProfile = {
  id: "inv-001",
  name: "Priya Patel",
  email: "priya.patel@email.com",
  phone: "+91 98123 45678",
  pan: "ABCDE1234F",
  address: "A-201, Sunrise Apartments, Andheri West, Mumbai 400053",
  kycStatus: "verified" as const,
  bankAccount: {
    accountName: "Priya Patel",
    accountNumber: "XXXX XXXX 7890",
    ifscCode: "HDFC0002345",
    bankName: "HDFC Bank",
  },
  nomineeDetails: {
    name: "Rahul Patel",
    relationship: "Spouse",
    phone: "+91 98765 12345",
  },
  portfolio: {
    totalValue: 812500,
    totalInvested: 750000,
    totalEarnings: 62500,
    unrealizedGains: 45000,
    pendingPayments: 15625,
  },
  holdings: [
    {
      bondId: "sbi-bond-2029",
      units: 15,
      investedAmount: 150000,
      currentValue: 165000,
      purchaseDate: "2024-09-10",
      interestEarned: 11775,
    },
    {
      bondId: "hdfc-bond-2028",
      units: 10,
      investedAmount: 250000,
      currentValue: 275000,
      purchaseDate: "2024-09-15",
      interestEarned: 20625,
    },
    {
      bondId: "govt-gsec-2030",
      units: 20,
      investedAmount: 200000,
      currentValue: 215000,
      purchaseDate: "2024-10-01",
      interestEarned: 14360,
    },
    {
      bondId: "tata-power-green-2031",
      units: 3,
      investedAmount: 150000,
      currentValue: 157500,
      purchaseDate: "2024-11-20",
      interestEarned: 10625,
    },
  ],
  transactions: [
    { id: "txn-001", type: "investment" as const, bondId: "sbi-bond-2029", amount: 150000, date: "2024-09-10", status: "completed" as const },
    { id: "txn-002", type: "investment" as const, bondId: "hdfc-bond-2028", amount: 250000, date: "2024-09-15", status: "completed" as const },
    { id: "txn-003", type: "investment" as const, bondId: "govt-gsec-2030", amount: 200000, date: "2024-10-01", status: "completed" as const },
    { id: "txn-004", type: "interest" as const, bondId: "sbi-bond-2029", amount: 5887, date: "2024-12-15", status: "completed" as const },
    { id: "txn-005", type: "interest" as const, bondId: "hdfc-bond-2028", amount: 10312, date: "2024-12-20", status: "completed" as const },
    { id: "txn-006", type: "investment" as const, bondId: "tata-power-green-2031", amount: 150000, date: "2024-11-20", status: "completed" as const },
    { id: "txn-007", type: "interest" as const, bondId: "govt-gsec-2030", amount: 7180, date: "2025-01-01", status: "completed" as const },
    { id: "txn-008", type: "interest" as const, bondId: "tata-power-green-2031", amount: 5312, date: "2025-02-10", status: "completed" as const },
    { id: "txn-009", type: "interest" as const, bondId: "sbi-bond-2029", amount: 5888, date: "2025-06-15", status: "completed" as const },
    { id: "txn-010", type: "interest" as const, bondId: "hdfc-bond-2028", amount: 10313, date: "2025-06-20", status: "completed" as const },
  ],
  upcomingPayments: [
    { bondId: "sbi-bond-2029", amount: 5888, date: "2026-06-15" },
    { bondId: "hdfc-bond-2028", amount: 10313, date: "2026-06-20" },
    { bondId: "govt-gsec-2030", amount: 7180, date: "2026-07-01" },
    { bondId: "tata-power-green-2031", amount: 6375, date: "2026-08-10" },
  ],
};

// ============================================
// BOND INVESTMENTS (Which investors invested in which bonds)
// ============================================
export const bondInvestments = [
  { bondId: "sbi-bond-2029", investorId: "inv-001", units: 15, amount: 150000, date: "2024-09-10" },
  { bondId: "sbi-bond-2029", investorId: "inv-002", units: 25, amount: 250000, date: "2024-09-20" },
  { bondId: "sbi-bond-2029", investorId: "inv-005", units: 30, amount: 300000, date: "2024-11-25" },
  { bondId: "sbi-bond-2029", investorId: "inv-008", units: 20, amount: 200000, date: "2025-01-15" },
  { bondId: "hdfc-bond-2028", investorId: "inv-001", units: 10, amount: 250000, date: "2024-09-15" },
  { bondId: "hdfc-bond-2028", investorId: "inv-002", units: 15, amount: 375000, date: "2024-10-01" },
  { bondId: "hdfc-bond-2028", investorId: "inv-005", units: 12, amount: 300000, date: "2024-12-10" },
  { bondId: "hdfc-bond-2028", investorId: "inv-006", units: 6, amount: 150000, date: "2024-12-15" },
  { bondId: "hdfc-bond-2028", investorId: "inv-008", units: 8, amount: 200000, date: "2025-01-20" },
  { bondId: "govt-gsec-2030", investorId: "inv-001", units: 20, amount: 200000, date: "2024-10-01" },
  { bondId: "govt-gsec-2030", investorId: "inv-002", units: 25, amount: 250000, date: "2024-10-15" },
  { bondId: "govt-gsec-2030", investorId: "inv-003", units: 15, amount: 150000, date: "2024-10-20" },
  { bondId: "govt-gsec-2030", investorId: "inv-005", units: 35, amount: 350000, date: "2024-11-30" },
  { bondId: "govt-gsec-2030", investorId: "inv-008", units: 10, amount: 100000, date: "2025-02-01" },
  { bondId: "tata-power-green-2031", investorId: "inv-001", units: 3, amount: 150000, date: "2024-11-20" },
  { bondId: "tata-power-green-2031", investorId: "inv-002", units: 4, amount: 200000, date: "2024-12-01" },
  { bondId: "tata-power-green-2031", investorId: "inv-005", units: 5, amount: 250000, date: "2025-01-05" },
  { bondId: "reliance-bond-2027", investorId: "inv-002", units: 7, amount: 175000, date: "2024-11-10" },
  { bondId: "reliance-bond-2027", investorId: "inv-003", units: 8, amount: 200000, date: "2024-11-15" },
  { bondId: "reliance-bond-2027", investorId: "inv-006", units: 8, amount: 200000, date: "2024-12-20" },
  { bondId: "reliance-bond-2027", investorId: "inv-008", units: 6, amount: 150000, date: "2025-01-25" },
  { bondId: "ntpc-bond-2029", investorId: "inv-003", units: 15, amount: 150000, date: "2024-10-25" },
  { bondId: "ntpc-bond-2029", investorId: "inv-005", units: 20, amount: 200000, date: "2024-12-05" },
  { bondId: "ntpc-bond-2029", investorId: "inv-008", units: 10, amount: 100000, date: "2025-01-28" },
  { bondId: "rec-green-2032", investorId: "inv-005", units: 16, amount: 400000, date: "2025-01-10" },
  { bondId: "rec-green-2032", investorId: "inv-008", units: 5, amount: 125000, date: "2025-02-02" },
];

// ============================================
// INTEGRATION SETTINGS
// ============================================
export const integrationSettings = {
  webviewUrl: `https://${partnerBranding.customDomain}`,
  embedCode: `<iframe src="https://${partnerBranding.customDomain}/embed" width="100%" height="600" frameborder="0"></iframe>`,
  apiKey: "ak_live_apex_Kj8mN2pQ4rS6tU8wX0yZ",
  apiSecret: "sk_live_apex_••••••••••••••••",
  webhookUrl: "https://api.apexwealth.in/webhooks/bondflow",
  webhookSecret: "whsec_apex_••••••••••••••••",
};

// ============================================
// HELPER FUNCTIONS
// ============================================
export function getEnabledBonds() {
  return bondCatalog.filter((bond) => bond.enabled);
}

export function getTopPicks() {
  return bondCatalog.filter((bond) => bond.enabled && bond.isTopPick);
}

export function getBondById(id: string) {
  return bondCatalog.find((bond) => bond.id === id);
}

export function getEffectiveYield(bondId: string) {
  const bond = getBondById(bondId);
  if (!bond) return 0;
  const categoryRate = commissionSettings.bondSpecificRates[bond.category] ?? commissionSettings.defaultRate;
  return bond.yield - categoryRate;
}

export function getHoldingByBondId(bondId: string) {
  return sampleInvestorProfile.holdings.find((h) => h.bondId === bondId);
}

export function getInvestorsByBondId(bondId: string) {
  const investments = bondInvestments.filter((inv) => inv.bondId === bondId);
  return investments.map((inv) => {
    const investor = partnerInvestors.find((i) => i.id === inv.investorId);
    return {
      ...inv,
      investor,
    };
  });
}

export function getBondStats(bondId: string) {
  const investments = bondInvestments.filter((inv) => inv.bondId === bondId);
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalUnits = investments.reduce((sum, inv) => sum + inv.units, 0);
  const investorCount = new Set(investments.map((inv) => inv.investorId)).size;
  return { totalInvested, totalUnits, investorCount };
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Types
export type Bond = (typeof bondCatalog)[number];
export type Investor = (typeof partnerInvestors)[number];
export type Holding = (typeof sampleInvestorProfile.holdings)[number];
export type Transaction = (typeof sampleInvestorProfile.transactions)[number];
export type Activity = (typeof recentActivity)[number];
