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
  <div className="bg-card rounded-2xl shadow-card p-6 border border-border hover:shadow-elevated transition-shadow duration-300">
    <h2 className="text-xl font-bold font-display text-foreground flex items-center gap-2 mb-4">
      <Leaf className="w-5 h-5 text-growth" />
      Recommended for {season}
    </h2>
    <div className="space-y-3">
      {recommendations.map((r, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 }}
          className="p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
        >
          <div className="flex items-center justify-between mb-1">
            <p className="font-bold text-lg text-foreground">🌱 {r.crop}</p>
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${profitColors[r.profitPotential]}`}>
              {r.profitPotential} Profit
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{r.reason}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default RecommendationCard;
