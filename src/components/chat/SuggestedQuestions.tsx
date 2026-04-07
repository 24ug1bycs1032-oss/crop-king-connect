import { motion } from "framer-motion";
import { Sprout, TrendingUp, Bug, ShoppingCart } from "lucide-react";

interface Props {
  onSelect: (q: string) => void;
  crop: string;
}

const SuggestedQuestions = ({ onSelect, crop }: Props) => {
  const questions = [
    { icon: TrendingUp, text: `Should I sell my ${crop} now or wait?`, color: "text-primary" },
    { icon: Sprout, text: `Best fertilizer for ${crop} this season?`, color: "text-growth" },
    { icon: Bug, text: `My ${crop} leaves are turning yellow. What should I do?`, color: "text-harvest" },
    { icon: ShoppingCart, text: `How to find the best buyer for ${crop}?`, color: "text-sky" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {questions.map((q, i) => (
        <motion.button
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          onClick={() => onSelect(q.text)}
          className="group flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-card transition-all text-left"
        >
          <q.icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${q.color}`} />
          <span className="text-sm text-foreground group-hover:text-primary transition-colors leading-snug">
            {q.text}
          </span>
        </motion.button>
      ))}
    </div>
  );
};

export default SuggestedQuestions;
