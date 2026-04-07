import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, IndianRupee } from "lucide-react";
import type { CropPrice } from "@/data/mockData";

interface Props {
  prices: CropPrice[];
  crop: string;
}

const PriceCard = ({ prices, crop }: Props) => {
  return (
    <div className="bg-card rounded-2xl shadow-card p-6 border border-border hover:shadow-elevated transition-shadow duration-300">
      <h2 className="text-xl font-bold font-display text-foreground flex items-center gap-2 mb-4">
        <IndianRupee className="w-5 h-5 text-primary" />
        {crop} Market Prices
      </h2>
      <div className="space-y-3">
        {prices.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center justify-between p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
          >
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
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PriceCard;
