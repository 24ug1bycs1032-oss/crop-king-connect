import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { TrendPoint } from "@/data/mockData";

interface Props {
  data: TrendPoint[];
  crop: string;
}

const TrendChart = ({ data, crop }: Props) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
    className="bg-card rounded-xl shadow-card p-6">
    <h2 className="text-xl font-bold font-display text-foreground flex items-center gap-2 mb-4">
      <BarChart3 className="w-5 h-5 text-sky" />
      {crop} Price Trend (12 Months)
    </h2>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(40 20% 88%)" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(150 10% 45%)" />
          <YAxis tick={{ fontSize: 12 }} stroke="hsl(150 10% 45%)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(40 30% 99%)",
              border: "1px solid hsl(40 20% 88%)",
              borderRadius: "8px",
              fontFamily: "Nunito",
            }}
            formatter={(value: number) => [`₹${value}`, "Price"]}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="hsl(142 50% 32%)"
            strokeWidth={3}
            dot={{ fill: "hsl(38 80% 55%)", r: 4, strokeWidth: 2, stroke: "hsl(142 50% 32%)" }}
            activeDot={{ r: 6, fill: "hsl(38 80% 55%)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <p className="text-sm text-muted-foreground mt-2">
      📈 Prices have been <span className="font-bold text-primary">gradually increasing</span> over the past year due to rising demand.
    </p>
  </motion.div>
);

export default TrendChart;
