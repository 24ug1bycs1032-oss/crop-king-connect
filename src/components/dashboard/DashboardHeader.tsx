import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Sprout, Cloud } from "lucide-react";

interface Props {
  region: string;
  crop: string;
  season: string;
  onBack: () => void;
}

const DashboardHeader = ({ region, crop, season, onBack }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", damping: 20 }}
    className="gradient-hero text-primary-foreground p-6 rounded-2xl shadow-elevated mb-6 relative overflow-hidden"
  >
    {/* Subtle pattern overlay */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-2 right-8 text-6xl">🌾</div>
      <div className="absolute bottom-2 right-32 text-4xl">🌱</div>
    </div>

    <div className="relative z-10">
      <motion.button
        whileHover={{ x: -3 }}
        onClick={onBack}
        className="flex items-center gap-1 text-sm opacity-80 hover:opacity-100 mb-3 transition-opacity"
      >
        <ArrowLeft className="w-4 h-4" /> Change Selection
      </motion.button>
      <h1 className="text-2xl md:text-3xl font-bold font-display">KrishiMitra Dashboard</h1>
      <div className="flex flex-wrap gap-3 mt-3">
        {[
          { icon: MapPin, label: region },
          { icon: Sprout, label: crop },
          { icon: Cloud, label: season },
        ].map((tag, i) => (
          <motion.span
            key={tag.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.1, type: "spring", damping: 15 }}
            className="flex items-center gap-1.5 bg-primary-foreground/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium"
          >
            <tag.icon className="w-3.5 h-3.5" /> {tag.label}
          </motion.span>
        ))}
      </div>
    </div>
  </motion.div>
);

export default DashboardHeader;
