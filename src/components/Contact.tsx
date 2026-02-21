import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Twitter } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotateX: -30 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, y: -100, rotateX: 30 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center"
    >
      <div className="bg-gray-900/40 backdrop-blur-2xl border border-indigo-500/20 rounded-3xl p-12 max-w-2xl shadow-[0_0_50px_rgba(99,102,241,0.1)]">
        <h2 className="text-4xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
          Get in Touch
        </h2>
        <div className="flex justify-center gap-8 text-gray-400">
          <a href="#" className="flex flex-col items-center gap-3 hover:text-indigo-400 hover:scale-110 transition-all">
            <Mail size={32} />
            <span>Email</span>
          </a>
          <a href="#" className="flex flex-col items-center gap-3 hover:text-indigo-400 hover:scale-110 transition-all">
            <Github size={32} />
            <span>GitHub</span>
          </a>
          <a href="#" className="flex flex-col items-center gap-3 hover:text-indigo-400 hover:scale-110 transition-all">
            <Twitter size={32} />
            <span>Twitter</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};
