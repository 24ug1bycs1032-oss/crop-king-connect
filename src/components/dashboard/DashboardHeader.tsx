import { ArrowLeft, MapPin, Sprout, Cloud } from "lucide-react";

interface Props {
  region: string;
  crop: string;
  season: string;
  onBack: () => void;
}

const DashboardHeader = ({ region, crop, season, onBack }: Props) => (
  <div className="gradient-hero text-primary-foreground p-6 rounded-xl shadow-elevated mb-6">
    <button onClick={onBack} className="flex items-center gap-1 text-sm opacity-80 hover:opacity-100 mb-3 transition-opacity">
      <ArrowLeft className="w-4 h-4" /> Change Selection
    </button>
    <h1 className="text-2xl md:text-3xl font-bold font-display">KrishiMitra Dashboard</h1>
    <div className="flex flex-wrap gap-4 mt-3 text-sm">
      <span className="flex items-center gap-1 bg-primary-foreground/20 px-3 py-1 rounded-full">
        <MapPin className="w-3 h-3" /> {region}
      </span>
      <span className="flex items-center gap-1 bg-primary-foreground/20 px-3 py-1 rounded-full">
        <Sprout className="w-3 h-3" /> {crop}
      </span>
      <span className="flex items-center gap-1 bg-primary-foreground/20 px-3 py-1 rounded-full">
        <Cloud className="w-3 h-3" /> {season}
      </span>
    </div>
  </div>
);

export default DashboardHeader;
