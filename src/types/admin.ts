export type AdminOverviewStat = {
  label: string;
  value: string;
  changePercent: number;
  changeLabel: string;
  trend: "up" | "down" | "neutral";
};

export type AdminTopGemstone = {
  id: string;
  name: string;
  gemstoneType: string;
  sales: number;
  revenue: number;
  image: string;
};

export type AdminRecentOrder = {
  id: string;
  orderNumber: string;
  customerName: string;
  amount: number;
  currency: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "paid" | "pending" | "refunded";
  date: string;
};

export type AdminNotification = {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success";
  time: string;
  read: boolean;
};

export type AdminQuickAction = {
  id: string;
  label: string;
  description: string;
  href: string;
};

export type AdminDashboardData = {
  overview: {
    revenue: AdminOverviewStat;
    orders: AdminOverviewStat;
    customers: AdminOverviewStat;
    products: AdminOverviewStat;
  };
  topGemstones: AdminTopGemstone[];
  recentOrders: AdminRecentOrder[];
  notifications: AdminNotification[];
  quickActions: AdminQuickAction[];
};
