import { useState } from "react";
import { motion } from "framer-motion";
import { Sprout, MapPin, Cloud, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { regions, crops, seasons, languages } from "@/data/mockData";

interface Props {
  onSubmit: (data: { region: string; crop: string; season: string; language: string }) => void;
}

const SelectionScreen = ({ onSubmit }: Props) => {
  const [region, setRegion] = useState("");
  const [crop, setCrop] = useState("");
  const [season, setSeason] = useState("");
  const [language, setLanguage] = useState("en");

  const isValid = region && crop && season;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary mb-4">
            <Sprout className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold font-display text-foreground">
            KrishiMitra
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Your Smart Farming Companion
          </p>
        </div>

        <div className="bg-card rounded-xl shadow-card p-6 space-y-5">
          {/* Language */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
              <Globe className="w-4 h-4 text-primary" /> Language
            </label>
            <div className="grid grid-cols-4 gap-2">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`py-2 px-3 rounded-lg text-sm font-semibold border transition-all ${
                    language === l.code
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-foreground border-border hover:border-primary"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Region */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
              <MapPin className="w-4 h-4 text-primary" /> Region
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground text-base focus:ring-2 focus:ring-ring outline-none"
            >
              <option value="">Select your region</option>
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Crop */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
              <Sprout className="w-4 h-4 text-primary" /> Crop
            </label>
            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground text-base focus:ring-2 focus:ring-ring outline-none"
            >
              <option value="">Select your crop</option>
              {crops.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Season */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
              <Cloud className="w-4 h-4 text-primary" /> Season
            </label>
            <div className="grid grid-cols-3 gap-2">
              {seasons.map((s) => (
                <button
                  key={s}
                  onClick={() => setSeason(s)}
                  className={`py-3 px-4 rounded-lg text-base font-semibold border transition-all ${
                    season === s
                      ? "bg-secondary text-secondary-foreground border-secondary"
                      : "bg-muted text-foreground border-border hover:border-secondary"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={() => isValid && onSubmit({ region, crop, season, language })}
            disabled={!isValid}
            className="w-full py-6 text-lg font-bold gradient-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            🌾 View Dashboard
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default SelectionScreen;
