import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, IndianRupee } from "lucide-react";
import type { CropPrice } from "@/data/mockData";

interface Props {
  prices: CropPrice[];
  crop: string;
}

const PriceCard = ({ prices, crop }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl shadow-card p-6"
    >
      <h2 className="text-xl font-bold font-display text-foreground flex items-center gap-2 mb-4">
        <IndianRupee className="w-5 h-5 text-primary" />
        {crop} Market Prices
      </h2>
      <div className="space-y-3">
        {prices.map((p, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted">
            <div>
              <p className="font-semibold text-foreground">{p.market}</p>
              <p className="text-sm text-muted-foreground">
                <TrendingUp className="w-3 h-3 inline text-primary" /> ₹{p.high} &nbsp;
                <TrendingDown className="w-3 h-3 inline text-destructive" /> ₹{p.low}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">₹{p.price}</p>
              <p className="text-xs text-muted-foreground">{p.unit}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default PriceCard;
