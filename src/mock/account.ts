import type { UserAccount } from "@/types/account";

const GEM = "/images/showcase/gemstone.png";

export const mockUserAccount: UserAccount = {
  profile: {
    name: "Aditya Mehta",
    email: "aditya.mehta@email.com",
    phone: "+91 98765 43210",
    memberSince: "2024-11-10T08:00:00Z",
  },
  addresses: [
    {
      id: "addr_001a",
      label: "Residence",
      line1: "42 Maharaja Heritage Lane",
      line2: "Penthouse Suite",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400001",
      country: "India",
      isDefault: true,
    },
    {
      id: "addr_001b",
      label: "Office",
      line1: "88 Bandra Kurla Complex",
      line2: "Tower C, Floor 12",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400051",
      country: "India",
      isDefault: false,
    },
  ],
  orders: [
    {
      id: "ord_hist_001",
      orderNumber: "RG-2026-10201",
      total: 520000,
      currency: "INR",
      status: "delivered",
      itemCount: 1,
      items: [
        {
          slug: "imperial-diamond-necklace",
          name: "Imperial Diamond Necklace",
          price: 425000,
          quantity: 1,
          image: GEM,
          currency: "INR",
        },
      ],
      paidAt: "2026-05-20T10:00:00Z",
      estimatedDelivery: "Friday, 27 May 2026",
      paymentMethod: "Credit Card",
      shippingSummary: "Mumbai, Maharashtra",
    },
    {
      id: "ord_hist_002",
      orderNumber: "RG-2026-09845",
      total: 125000,
      currency: "INR",
      status: "delivered",
      itemCount: 1,
      items: [
        {
          slug: "royal-emerald-ring",
          name: "Royal Emerald Ring",
          price: 125000,
          quantity: 1,
          image: GEM,
          currency: "INR",
        },
      ],
      paidAt: "2026-03-15T14:00:00Z",
      paymentMethod: "UPI",
      shippingSummary: "Mumbai, Maharashtra",
    },
  ],
  settings: {
    orderUpdates: true,
    marketingEmails: true,
    smsAlerts: false,
  },
};
