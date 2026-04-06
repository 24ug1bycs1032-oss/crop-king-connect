import { motion } from "framer-motion";
import { ShoppingCart, Phone, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Buyer } from "@/data/mockData";

interface Props {
  buyers: Buyer[];
  crop: string;
}

const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const BuyerMarketplace = ({ buyers, crop }: Props) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
    className="bg-card rounded-xl shadow-card p-6">
    <h2 className="text-xl font-bold font-display text-foreground flex items-center gap-2 mb-4">
      <ShoppingCart className="w-5 h-5 text-secondary" />
      Buyers for {crop}
    </h2>
    <div className="space-y-3">
      {buyers.map((b, i) => (
        <div key={i} className={`p-4 rounded-lg border ${i === 0 ? "border-secondary bg-secondary/10" : "border-border bg-muted"}`}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="font-bold text-foreground text-lg">{b.name}</p>
              <p className="text-sm text-muted-foreground">{b.location} · {b.quantity}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-primary">{formatPrice(b.offeredPrice)}</p>
              <p className="text-xs text-muted-foreground">{b.unit}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <Button size="sm" variant="outline" className="flex-1 gap-1 text-sm">
              <Phone className="w-3 h-3" /> Contact
            </Button>
            <Button size="sm" className="flex-1 gap-1 text-sm gradient-primary text-primary-foreground">
              <Check className="w-3 h-3" /> Accept Offer
            </Button>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

export default BuyerMarketplace;
