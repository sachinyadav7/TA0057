import React from 'react';
import { motion } from 'framer-motion';
import type { EscapePath } from '../engine/escape';
import { Rocket, MapPin, Briefcase, Zap, CheckCircle2 } from 'lucide-react';

interface EscapePlanProps {
  routes: EscapePath[];
}

export const EscapePlan: React.FC<EscapePlanProps> = ({ routes }) => {
  const getIcon = (type: string) => {
    switch(type) {
      case "Skill Upgrade": return <Zap className="text-blue-400" />;
      case "City Relocation": return <MapPin className="text-purple-400" />;
      case "Role Switch": return <Briefcase className="text-teal-400" />;
      default: return <Rocket className="text-indigo-400" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-8 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Escape Routes</h2>
          <p className="text-gray-400 mt-1">Data-driven pivot recommendations to outpace inflation.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {routes.map((route, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className={`relative bg-gray-900/60 backdrop-blur-xl border border-gray-800 p-6 rounded-2xl hover:border-indigo-500/50 transition-colors group ${i === 0 ? 'ring-2 ring-indigo-500/50' : ''}`}
          >
            {i === 0 && (
              <div className="absolute -top-3 left-6 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-[0_0_10px_rgba(99,102,241,0.5)]">
                <CheckCircle2 size={12} /> Highest ROI
              </div>
            )}
            
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-gray-800 rounded-xl group-hover:scale-110 transition-transform">
                {getIcon(route.type)}
              </div>
              <div className="bg-gray-800/80 px-3 py-1 text-xs font-medium text-gray-300 rounded-lg">
                ROI: {route.roiScore}x
              </div>
            </div>

            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{route.type}</h3>
            <p className="text-sm text-gray-400 mb-6">{route.title}</p>

            <div className="space-y-4">
              <div className="flex justify-between items-end border-b border-gray-800 pb-3">
                <span className="text-sm text-gray-500">Expected Delta</span>
                <span className="text-xl font-bold text-green-400">+₹{route.salaryDelta.toLocaleString()}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs text-gray-500 mb-1">Time to Pivot</span>
                  <span className="text-sm font-medium text-gray-200">{route.timeToTransitionMonths} months</span>
                </div>
                <div>
                  <span className="block text-xs text-gray-500 mb-1">Win Probability</span>
                  <span className="text-sm font-medium text-gray-200">{route.successProbability * 100}%</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="block text-xs text-gray-500 mb-2">Required Core Skills</span>
                <div className="flex flex-wrap gap-2">
                  {route.requiredSkills.slice(0, 2).map(skill => (
                    <span key={skill} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button className="w-full mt-6 py-2 rounded-lg bg-gray-800 text-white font-medium hover:bg-indigo-600 transition-colors">
              Explore Path
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
