import { motion } from "framer-motion";
import { ShieldCheck, Clock } from "lucide-react";

interface Props {
  decision: "SELL NOW" | "WAIT";
  reason: string;
}

const SellDecisionCard = ({ decision, reason }: Props) => {
  const isSell = decision === "SELL NOW";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`rounded-2xl shadow-elevated p-6 relative overflow-hidden ${isSell ? "gradient-harvest" : "gradient-primary"}`}
    >
      <div className="absolute top-3 right-3 text-5xl opacity-15">{isSell ? "📈" : "⏳"}</div>
      <div className="flex items-center gap-3 mb-3 relative z-10">
        {isSell ? (
          <ShieldCheck className="w-8 h-8 text-secondary-foreground" />
        ) : (
          <Clock className="w-8 h-8 text-primary-foreground" />
        )}
        <h2 className={`text-2xl font-bold font-display ${isSell ? "text-secondary-foreground" : "text-primary-foreground"}`}>
          {decision}
        </h2>
      </div>
      <p className={`text-base relative z-10 ${isSell ? "text-secondary-foreground/80" : "text-primary-foreground/80"}`}>
        {reason}
      </p>
    </motion.div>
  );
};

export default SellDecisionCard;
