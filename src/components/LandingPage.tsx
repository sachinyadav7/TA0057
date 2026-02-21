import React from 'react';
import { motion } from 'framer-motion';
import { UserCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const LandingPage: React.FC = () => {
  const { loginGoogle, loginGuest } = useAuth();

  return (
    <motion.main 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
      transition={{ duration: 0.5 }}
      className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full h-full pt-12 lg:pt-24"
    >
        
        {/* Left Column */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-1/2 flex flex-col items-start text-left z-20"
        >
          <div className="inline-block px-5 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-bold tracking-wide mb-8">
            Real Wage Decline Alert System
          </div>
          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-none mb-8">
            Identify your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
              Reality Moment
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-lg leading-relaxed font-medium">
            Your nominal salary is growing, but your purchasing power might be shrinking. Find out exactly when your real wealth stopped growing.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 w-full max-w-lg">
            <button
              onClick={loginGoogle}
              className="flex-1 flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-black font-extrabold text-lg py-4 px-8 rounded-2xl transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:-translate-y-1"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                <path fill="none" d="M1 1h22v22H1z" />
              </svg>
              Start with Google
            </button>

            <button
              onClick={loginGuest}
              className="flex-1 flex items-center justify-center gap-3 bg-transparent hover:bg-white/5 text-white font-extrabold text-lg py-4 px-8 rounded-2xl border-2 border-indigo-500/30 transition-all duration-300 hover:border-indigo-400 hover:-translate-y-1"
            >
              <UserCircle2 className="w-6 h-6 text-indigo-400" />
              Try as Guest
            </button>
          </div>
          
          <div className="mt-10 flex items-center gap-8 text-sm text-gray-500 font-medium">
             <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Local-first logic</span>
             <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> 100% Privacy</span>
          </div>
        </motion.div>

        {/* Right Column - Decorative Blob/3D representation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="lg:w-1/2 mt-20 lg:mt-0 flex justify-center lg:justify-end relative z-10"
        >
          {/* Main Blob Background */}
          <div className="relative w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px]">
             
            {/* The animated liquid mask shape */}
            <motion.div 
              animate={{ 
                borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 50%"]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-br from-indigo-500/80 via-purple-500/80 to-cyan-400/80 shadow-[0_0_60px_rgba(99,102,241,0.3)] backdrop-blur-3xl overflow-hidden flex items-center justify-center p-2"
            >
              {/* Inner dark container to create the window effect */}
              <motion.div 
                 animate={{ 
                  borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 50%"]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full bg-[#0a0a0f] flex items-center justify-center relative overflow-hidden pointer-events-none"
              >
                  {/* Subtle inner grid/particles representation */}
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.3)_0,transparent_70%)]" />
                  
                  {/* The 3D Ring Illusion matching image 1 */}
                  <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full border-[24px] border-t-indigo-400 border-r-purple-400 border-b-cyan-400 border-l-indigo-600 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative flex items-center justify-center">
                     {/* Inner glowing core of the ring */}
                     <div className="absolute inset-0 rounded-full border-[3px] border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.2)]"></div>
                     {/* Inner circle pulse */}
                     <motion.div 
                        animate={{ scale: [0.8, 1, 0.8], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-32 h-32 rounded-full bg-gradient-to-tr from-indigo-500/20 to-cyan-400/20 blur-xl"
                     />
                  </div>
              </motion.div>
            </motion.div>

            {/* Floating accent dots */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[10%] right-[10%] w-5 h-5 bg-cyan-400 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.9)] z-20"
            />
            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[20%] left-[5%] w-8 h-8 bg-purple-500 rounded-full shadow-[0_0_25px_rgba(168,85,247,0.9)] z-20"
            />
            
          </div>
        </motion.div>

    </motion.main>
  );
};
