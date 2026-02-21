import React from 'react';
import { motion } from 'framer-motion';
import type { RiskResult } from '../engine/risk';
import { Activity, AlertOctagon, TrendingUp, AlertTriangle } from 'lucide-react';

interface RiskCardProps {
  risk: RiskResult;
}

export const RiskCard: React.FC<RiskCardProps> = ({ risk }) => {
  const getRiskConfig = () => {
    switch(risk.category) {
      case "Healthy Growth":
        return { color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30", icon: TrendingUp };
      case "Slow Drift":
        return { color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", icon: Activity };
      case "Stagnation Risk":
        return { color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/30", icon: AlertTriangle };
      case "Poverty Creep":
        return { color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/30", icon: AlertOctagon };
    }
  };

  const config = getRiskConfig();
  const Icon = config.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`p-6 rounded-2xl backdrop-blur-md border ${config.border} bg-black/40 flex flex-col justify-between`}
    >
      <div>
        <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Stagnation Risk Score</h3>
        <div className="flex items-end gap-3 mb-2">
          <span className={`text-6xl font-black ${config.color}`}>{risk.score}</span>
          <span className="text-gray-500 font-medium mb-1">/ 100</span>
        </div>
      </div>
      
      <div className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg ${config.bg} ${config.color} w-max`}>
        <Icon size={18} />
        <span className="font-bold tracking-wide">{risk.category}</span>
      </div>
      
      <div className="mt-4 text-sm text-gray-400">
        {risk.score > 50 
          ? "Your purchasing power is shrinking faster than your nominal raises."
          : "Your income is keeping pace with inflation, but monitor it closely."}
      </div>
    </motion.div>
  );
};
