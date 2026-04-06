export const regions = [
  "Karnataka", "Andhra Pradesh", "Tamil Nadu", "Maharashtra",
  "Punjab", "Uttar Pradesh", "Madhya Pradesh", "Rajasthan",
];

export const crops = [
  "Rice", "Wheat", "Sugarcane", "Cotton", "Maize",
  "Soybean", "Groundnut", "Jowar", "Ragi", "Turmeric",
];

export const seasons = ["Kharif", "Rabi", "Zaid"];

export const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "te", label: "తెలుగు" },
];

export interface CropPrice {
  market: string;
  price: number;
  unit: string;
  high: number;
  low: number;
}

export interface Buyer {
  name: string;
  quantity: string;
  offeredPrice: number;
  unit: string;
  location: string;
}

export interface CropRecommendation {
  crop: string;
  reason: string;
  profitPotential: "High" | "Medium" | "Low";
}

export interface TrendPoint {
  month: string;
  price: number;
}

export function getMockPrices(crop: string): CropPrice[] {
  const base = crop === "Rice" ? 2200 : crop === "Wheat" ? 2400 : 3500;
  return [
    { market: "APMC Hubli", price: base, unit: "₹/quintal", high: base + 300, low: base - 200 },
    { market: "APMC Dharwad", price: base - 100, unit: "₹/quintal", high: base + 200, low: base - 300 },
    { market: "APMC Belgaum", price: base + 50, unit: "₹/quintal", high: base + 400, low: base - 150 },
  ];
}

export function getMockBuyers(crop: string): Buyer[] {
  const base = crop === "Rice" ? 2900000 : crop === "Wheat" ? 2700000 : 3200000;
  return [
    { name: "Alok Traders", quantity: "50 acres", offeredPrice: base, unit: "₹/acre", location: "Hubli" },
    { name: "Ravi Agri Corp", quantity: "30 acres", offeredPrice: base - 150000, unit: "₹/acre", location: "Dharwad" },
    { name: "Suresh Exports", quantity: "100 acres", offeredPrice: base - 300000, unit: "₹/acre", location: "Bangalore" },
    { name: "Priya Foods", quantity: "20 acres", offeredPrice: base - 500000, unit: "₹/acre", location: "Mysore" },
  ].sort((a, b) => b.offeredPrice - a.offeredPrice);
}

export function getMockRecommendations(season: string): CropRecommendation[] {
  if (season === "Kharif") {
    return [
      { crop: "Rice", reason: "High demand, suitable for monsoon season", profitPotential: "High" },
      { crop: "Maize", reason: "Low water requirement, good market price", profitPotential: "Medium" },
      { crop: "Cotton", reason: "Stable export demand", profitPotential: "High" },
    ];
  }
  if (season === "Rabi") {
    return [
      { crop: "Wheat", reason: "Government support price (MSP) available", profitPotential: "High" },
      { crop: "Groundnut", reason: "Oil demand increasing, good returns", profitPotential: "Medium" },
      { crop: "Jowar", reason: "Drought-resistant, low input cost", profitPotential: "Low" },
    ];
  }
  return [
    { crop: "Sugarcane", reason: "Year-round demand from sugar mills", profitPotential: "High" },
    { crop: "Turmeric", reason: "Export quality, premium pricing", profitPotential: "Medium" },
  ];
}

export function getMockTrend(): TrendPoint[] {
  return [
    { month: "Jan", price: 2100 },
    { month: "Feb", price: 2150 },
    { month: "Mar", price: 2200 },
    { month: "Apr", price: 2180 },
    { month: "May", price: 2300 },
    { month: "Jun", price: 2350 },
    { month: "Jul", price: 2400 },
    { month: "Aug", price: 2380 },
    { month: "Sep", price: 2450 },
    { month: "Oct", price: 2500 },
    { month: "Nov", price: 2480 },
    { month: "Dec", price: 2550 },
  ];
}

export function getSellDecision(trend: TrendPoint[]): { decision: "SELL NOW" | "WAIT"; reason: string } {
  const recent = trend.slice(-3);
  const isRising = recent[2].price > recent[0].price;
  if (isRising) {
    return { decision: "WAIT", reason: "Prices are rising. Hold your stock for better returns in the coming weeks." };
  }
  return { decision: "SELL NOW", reason: "Prices are stable or declining. Selling now will lock in current good rates." };
}
