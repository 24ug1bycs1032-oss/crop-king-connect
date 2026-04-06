import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import type { CropRecommendation } from "@/data/mockData";

interface Props {
  recommendations: CropRecommendation[];
  season: string;
}

const profitColors = {
  High: "bg-primary text-primary-foreground",
  Medium: "bg-secondary text-secondary-foreground",
  Low: "bg-muted text-muted-foreground",
};

const RecommendationCard = ({ recommendations, season }: Props) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
    className="bg-card rounded-xl shadow-card p-6">
    <h2 className="text-xl font-bold font-display text-foreground flex items-center gap-2 mb-4">
      <Leaf className="w-5 h-5 text-growth" />
      Recommended for {season}
    </h2>
    <div className="space-y-3">
      {recommendations.map((r, i) => (
        <div key={i} className="p-3 rounded-lg bg-muted">
          <div className="flex items-center justify-between mb-1">
            <p className="font-bold text-lg text-foreground">🌱 {r.crop}</p>
            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${profitColors[r.profitPotential]}`}>
              {r.profitPotential} Profit
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{r.reason}</p>
        </div>
      ))}
    </div>
  </motion.div>
);

export default RecommendationCard;
