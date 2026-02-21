import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { EscapePath } from '../engine/escape';
import { Rocket, MapPin, Briefcase, Zap, CheckCircle2, Info } from 'lucide-react';

interface EscapePlanProps {
  routes: EscapePath[];
}

const Tooltip = ({ children, text }: { children: React.ReactNode, text: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center" ref={tooltipRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {children}
      </div>
      {isOpen && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 border border-gray-700 text-xs text-gray-300 rounded-lg shadow-xl z-20 text-center">
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-gray-700"></div>
        </div>
      )}
    </div>
  );
};

export const EscapePlan: React.FC<EscapePlanProps> = ({ routes }) => {
  const getIcon = (type: string) => {
    switch (type) {
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
              <div className="bg-gray-800/80 px-3 py-1 text-xs font-medium text-gray-300 rounded-lg flex items-center gap-1.5">
                ROI: {route.roiScore}x
                <Tooltip text="Expected return on investment based on salary delta, cost, and success probability">
                  <Info size={12} className="text-gray-500 hover:text-gray-300 cursor-help" />
                </Tooltip>
              </div>
            </div>

            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{route.type}</h3>
            <p className="text-sm text-gray-400 mb-6">{route.title}</p>

            <div className="space-y-4">
              <div className="flex flex-col gap-2 border-b border-gray-800 pb-3">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    Expected Delta
                    <Tooltip text="Expected increase in annual compensation after a successful pivot">
                      <Info size={14} className="text-gray-600 hover:text-gray-400 cursor-help" />
                    </Tooltip>
                  </div>
                  <span className="text-xl font-bold text-green-400">+₹{route.salaryDelta.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    Transaction Cost
                    <Tooltip text="Estimated financial cost (e.g., courses, relocation, lost wages) required for the pivot">
                      <Info size={14} className="text-gray-600 hover:text-gray-400 cursor-help" />
                    </Tooltip>
                  </div>
                  <span className="text-lg font-bold text-red-400">-₹{route.investmentCost.toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs text-gray-500 mb-1">Time to Pivot</span>
                  <span className="text-sm font-medium text-gray-200">{route.timeToTransitionMonths} months</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="block text-xs text-gray-500">Difficulty</span>
                    <Tooltip text="Combination of time, cost, and historical success rates, reflecting how hard this pivot is">
                      <Info size={12} className="text-gray-600 hover:text-gray-400 cursor-help" />
                    </Tooltip>
                  </div>
                  <span className={`text-sm font-medium ${route.riskRating === 'Low' ? 'text-green-400' :
                      route.riskRating === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                    {route.riskRating}
                  </span>
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
