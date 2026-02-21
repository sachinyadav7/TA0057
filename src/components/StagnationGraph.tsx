import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { TrajectoryPoint } from '../engine/trajectory';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface StagnationGraphProps {
  data: TrajectoryPoint[];
  declineOnsetYear: number | null;
}

export const StagnationGraph: React.FC<StagnationGraphProps> = ({ data, declineOnsetYear }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-2xl p-6 shadow-xl"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Real vs Nominal Trajectory
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            The gap represents your invisible purchasing power erosion.
          </p>
        </div>
        {declineOnsetYear && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium">
            <AlertTriangle size={16} />
            Real Decline Started: {declineOnsetYear}
          </div>
        )}
      </div>

      <div className="h-[300px] w-full mt-4 relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorNominal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorReal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fb7185" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#fb7185" stopOpacity={0}/>
              </linearGradient>
              <pattern id="diagonalHatch" width="4" height="4" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="4" stroke="#fb7185" strokeWidth="1" strokeOpacity="0.3" />
              </pattern>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis dataKey="year" stroke="#888" tick={{ fill: '#888' }} />
            <YAxis 
              stroke="#888" 
              tick={{ fill: '#888' }} 
              tickFormatter={(val) => `₹${(val/100000).toFixed(1)}L`} 
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
              formatter={(val: number | string | undefined) => `₹${Number(val).toLocaleString()}`}
            />
            {/* Divergence area fill representation */}
            <Area 
              type="monotone" 
              dataKey="nominal" 
              stroke="#818cf8" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorNominal)" 
              name="Nominal Salary"
            />
            <Area 
              type="monotone" 
              dataKey="real" 
              stroke="#fb7185" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorReal)" 
              name="Real Salary"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
