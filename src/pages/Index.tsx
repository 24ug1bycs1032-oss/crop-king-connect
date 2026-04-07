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
import { motion } from "framer-motion";
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

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const card = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 20, stiffness: 260 } },
};

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

  const chatContext = `Region: ${region}, Crop: ${crop}, Season: ${season}. 
Market prices: ${prices.map(p => `${p.market}: ₹${p.price}/${p.unit}`).join(", ")}. 
Top buyer offers: ${buyers.slice(0, 2).map(b => `${b.name} offers ₹${b.offeredPrice.toLocaleString("en-IN")} per acre`).join(", ")}.
Sell recommendation: ${sellDecision.decision} - ${sellDecision.reason}`;

  return (
    <div className="min-h-screen p-4 md:p-6 max-w-6xl mx-auto">
      <DashboardHeader
        region={region}
        crop={crop}
        season={season}
        onBack={() => setSelection(null)}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <motion.div variants={card}><PriceCard prices={prices} crop={crop} /></motion.div>
        <motion.div variants={card}><RecommendationCard recommendations={recommendations} season={season} /></motion.div>
        <motion.div variants={card}><TrendChart data={trend} crop={crop} /></motion.div>
        <motion.div variants={card}><SellDecisionCard decision={sellDecision.decision} reason={sellDecision.reason} /></motion.div>
        <motion.div variants={card}><BuyerMarketplace buyers={buyers} crop={crop} /></motion.div>
        <motion.div variants={card}><StockCalculator prices={prices} buyers={buyers} /></motion.div>
      </motion.div>

      <ChatBot context={chatContext} language={selection.language} crop={crop} />
    </div>
  );
};

export default Index;
