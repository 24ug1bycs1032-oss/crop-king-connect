import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp } from "lucide-react";
import type { CropPrice, Buyer } from "@/data/mockData";

interface Props {
  prices: CropPrice[];
  buyers: Buyer[];
}

const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const StockCalculator = ({ prices, buyers }: Props) => {
  const [stock, setStock] = useState("");
  const qty = parseFloat(stock) || 0;
  const avgPrice = prices.reduce((s, p) => s + p.price, 0) / prices.length;
  const marketValue = qty * avgPrice;
  const bestBuyer = buyers[0];
  const buyerValue = qty > 0 ? bestBuyer.offeredPrice * (qty / 100) : 0;

  return (
    <div className="bg-card rounded-2xl shadow-card p-6 border border-border hover:shadow-elevated transition-shadow duration-300">
      <h2 className="text-xl font-bold font-display text-foreground flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-earth" />
        Stock Calculator
      </h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-foreground mb-1 block">Your Stock (in quintals)</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter quantity"
            className="w-full p-3 rounded-xl border border-border bg-background text-foreground text-base focus:ring-2 focus:ring-ring outline-none transition-shadow"
          />
        </div>

        {qty > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ type: "spring", damping: 20 }}
            className="space-y-3"
          >
            <div className="p-4 rounded-xl bg-muted">
              <p className="text-sm text-muted-foreground">Market Sale Value</p>
              <p className="text-2xl font-bold text-primary flex items-center gap-1">
                <TrendingUp className="w-5 h-5" /> {formatPrice(marketValue)}
              </p>
              <p className="text-xs text-muted-foreground">Based on avg ₹{avgPrice.toFixed(0)}/quintal</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/10 border border-secondary">
              <p className="text-sm text-muted-foreground">Best Buyer Offer ({bestBuyer.name})</p>
              <p className="text-2xl font-bold text-secondary">{formatPrice(buyerValue)}</p>
              <p className="text-xs text-muted-foreground">Based on {formatPrice(bestBuyer.offeredPrice)}/acre</p>
            </div>
            <div className="p-3 rounded-xl bg-primary/10 text-sm text-foreground font-semibold">
              💡 {buyerValue > marketValue
                ? "The buyer offer is better! Consider accepting it."
                : "Market sale gives better returns currently."}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StockCalculator;
