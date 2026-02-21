import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center"
    >
      <div className="bg-gray-900/40 backdrop-blur-2xl border border-indigo-500/20 rounded-3xl p-12 max-w-3xl shadow-[0_0_50px_rgba(99,102,241,0.1)] text-left">
        <div className="flex items-center justify-center mb-8 gap-3">
           <HelpCircle className="text-cyan-400" size={40} />
           <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
             Frequently Asked Questions
           </h2>
        </div>
        
        <div className="space-y-6">
          <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
            <h3 className="text-lg font-bold text-gray-200 mb-2">1. Is my financial data saved?</h3>
            <p className="text-gray-400">No. All calculations are performed entirely in your browser memory ("local-first"). When you close the tab, the data is gone forever.</p>
          </div>
          <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
            <h3 className="text-lg font-bold text-gray-200 mb-2">2. What is the "Reality Moment"?</h3>
            <p className="text-gray-400">The specific year when your nominal salary increases were completely overtaken by inflation (CPI), meaning your true purchasing power began to fall.</p>
          </div>
          <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
            <h3 className="text-lg font-bold text-gray-200 mb-2">3. Why do I need to log in?</h3>
            <p className="text-gray-400">Login is strictly a security gateway to access the dashboard. You can always use the "Guest" login option to immediately begin without linking an account.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
