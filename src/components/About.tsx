import React from 'react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
      animate={{ opacity: 1, rotateY: 0, scale: 1 }}
      exit={{ opacity: 0, rotateY: -90, scale: 0.8 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center"
    >
      <div className="bg-gray-900/40 backdrop-blur-2xl border border-indigo-500/20 rounded-3xl p-12 max-w-2xl shadow-[0_0_50px_rgba(99,102,241,0.1)] relative overflow-hidden">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0,transparent_50%)] pointer-events-none" />
        <h2 className="text-4xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 relative z-10">
          About StagnationScanner
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed relative z-10">
          StagnationScanner was built on the premise that nominal salary growth is an illusion masking the real evaporation of purchasing power. We use local-first data processing to ensure your financial reality check remains entirely private.
        </p>
      </div>
    </motion.div>
  );
};
