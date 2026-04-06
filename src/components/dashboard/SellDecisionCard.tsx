import { motion } from "framer-motion";
import { ShieldCheck, Clock } from "lucide-react";

interface Props {
  decision: "SELL NOW" | "WAIT";
  reason: string;
}

const SellDecisionCard = ({ decision, reason }: Props) => {
  const isSell = decision === "SELL NOW";

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
      className={`rounded-xl shadow-card p-6 ${isSell ? "gradient-harvest" : "gradient-primary"}`}>
      <div className="flex items-center gap-3 mb-3">
        {isSell ? (
          <ShieldCheck className="w-8 h-8 text-secondary-foreground" />
        ) : (
          <Clock className="w-8 h-8 text-primary-foreground" />
        )}
        <h2 className={`text-2xl font-bold font-display ${isSell ? "text-secondary-foreground" : "text-primary-foreground"}`}>
          {decision}
        </h2>
      </div>
      <p className={`text-base ${isSell ? "text-secondary-foreground/80" : "text-primary-foreground/80"}`}>
        {reason}
      </p>
    </motion.div>
  );
};

export default SellDecisionCard;
