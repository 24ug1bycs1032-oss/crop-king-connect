import { useState } from "react";
import SelectionScreen from "@/components/SelectionScreen";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PriceCard from "@/components/dashboard/PriceCard";
import RecommendationCard from "@/components/dashboard/RecommendationCard";
import TrendChart from "@/components/dashboard/TrendChart";
import SellDecisionCard from "@/components/dashboard/SellDecisionCard";
import BuyerMarketplace from "@/components/dashboard/BuyerMarketplace";
import StockCalculator from "@/components/dashboard/StockCalculator";
import ChatBot from "@/components/ChatBot";
import {
  getMockPrices,
  getMockBuyers,
  getMockRecommendations,
  getMockTrend,
  getSellDecision,
} from "@/data/mockData";

interface Selection {
  region: string;
  crop: string;
  season: string;
  language: string;
}

const Index = () => {
  const [selection, setSelection] = useState<Selection | null>(null);

  if (!selection) {
    return <SelectionScreen onSubmit={setSelection} />;
  }

  const { region, crop, season } = selection;
  const prices = getMockPrices(crop);
  const buyers = getMockBuyers(crop);
  const recommendations = getMockRecommendations(season);
  const trend = getMockTrend();
  const sellDecision = getSellDecision(trend);

  return (
    <div className="min-h-screen p-4 md:p-6 max-w-6xl mx-auto">
      <DashboardHeader
        region={region}
        crop={crop}
        season={season}
        onBack={() => setSelection(null)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PriceCard prices={prices} crop={crop} />
        <RecommendationCard recommendations={recommendations} season={season} />
        <TrendChart data={trend} crop={crop} />
        <SellDecisionCard decision={sellDecision.decision} reason={sellDecision.reason} />
        <BuyerMarketplace buyers={buyers} crop={crop} />
        <StockCalculator prices={prices} buyers={buyers} />
      </div>
    </div>
  );
};

export default Index;
