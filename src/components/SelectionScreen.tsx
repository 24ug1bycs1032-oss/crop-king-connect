import { useState } from "react";
import { motion } from "framer-motion";
import { Sprout, MapPin, Cloud, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { regions, crops, seasons, languages } from "@/data/mockData";

interface Props {
  onSubmit: (data: { region: string; crop: string; season: string; language: string }) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", damping: 20, stiffness: 300 } },
};

const SelectionScreen = ({ onSubmit }: Props) => {
  const [region, setRegion] = useState("");
  const [crop, setCrop] = useState("");
  const [season, setSeason] = useState("");
  const [language, setLanguage] = useState("en");

  const isValid = region && crop && season;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.04, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-secondary"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", damping: 20 }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: "spring", damping: 15 }}
          className="text-center mb-8"
        >
          <motion.div
            whileHover={{ rotate: 12, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-primary mb-4 shadow-elevated"
          >
            <Sprout className="w-10 h-10 text-primary-foreground" />
          </motion.div>
          <h1 className="text-4xl font-bold font-display text-foreground tracking-tight">
            KrishiMitra
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Your Smart Farming Companion 🌾
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="bg-card rounded-2xl shadow-elevated p-6 space-y-5 border border-border"
        >
          {/* Language */}
          <motion.div variants={item}>
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
              <Globe className="w-4 h-4 text-primary" /> Language
            </label>
            <div className="grid grid-cols-4 gap-2">
              {languages.map((l) => (
                <motion.button
                  key={l.code}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setLanguage(l.code)}
                  className={`py-2 px-3 rounded-lg text-sm font-semibold border transition-all duration-200 ${
                    language === l.code
                      ? "bg-primary text-primary-foreground border-primary shadow-card"
                      : "bg-muted text-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {l.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Region */}
          <motion.div variants={item}>
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
              <MapPin className="w-4 h-4 text-primary" /> Region
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full p-3 rounded-xl border border-border bg-background text-foreground text-base focus:ring-2 focus:ring-ring outline-none transition-shadow"
            >
              <option value="">Select your region</option>
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </motion.div>

          {/* Crop */}
          <motion.div variants={item}>
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
              <Sprout className="w-4 h-4 text-primary" /> Crop
            </label>
            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full p-3 rounded-xl border border-border bg-background text-foreground text-base focus:ring-2 focus:ring-ring outline-none transition-shadow"
            >
              <option value="">Select your crop</option>
              {crops.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </motion.div>

          {/* Season */}
          <motion.div variants={item}>
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
              <Cloud className="w-4 h-4 text-primary" /> Season
            </label>
            <div className="grid grid-cols-3 gap-2">
              {seasons.map((s) => (
                <motion.button
                  key={s}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSeason(s)}
                  className={`py-3 px-4 rounded-xl text-base font-semibold border transition-all duration-200 ${
                    season === s
                      ? "bg-secondary text-secondary-foreground border-secondary shadow-card"
                      : "bg-muted text-foreground border-border hover:border-secondary/50"
                  }`}
                >
                  {s}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={item}>
            <Button
              onClick={() => isValid && onSubmit({ region, crop, season, language })}
              disabled={!isValid}
              className="w-full py-6 text-lg font-bold gradient-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all disabled:opacity-40"
            >
              🌾 View Dashboard
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SelectionScreen;
