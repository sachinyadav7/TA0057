import { useState, useEffect } from 'react';
import { Environment3D } from './components/Environment3D';
import { IntakeForm } from './components/IntakeForm';
import { StagnationGraph } from './components/StagnationGraph';
import { RiskCard } from './components/RiskCard';
import { EscapePlan } from './components/EscapePlan';
import type { SalaryPoint, TrajectoryPoint } from './engine/trajectory';
import { computeWageTrajectory } from './engine/trajectory';
import type { RiskResult } from './engine/risk';
import { calculateRiskScore } from './engine/risk';
import type { EscapePath } from './engine/escape';
import { generateEscapeRoutes } from './engine/escape';
import { ArrowLeft, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LandingPage } from './components/LandingPage';
import { NavBar } from './components/NavBar';
import type { TabKeys } from './components/NavBar';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { FAQ } from './components/FAQ';

const AppContent = () => {
  const { role, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabKeys>('home');
  
  // Dashboard/Services states
  const [step, setStep] = useState<"intake" | "dashboard">("intake");
  const [trajectory, setTrajectory] = useState<TrajectoryPoint[]>([]);
  const [declineOnsetYear, setDeclineOnsetYear] = useState<number | null>(null);
  const [risk, setRisk] = useState<RiskResult | null>(null);
  const [escapeRoutes, setEscapeRoutes] = useState<EscapePath[]>([]);

  // Only redirect via AuthContext manual hooks, not automatic observer
  // Removed automatic tab flipping when returning to Home page.

  // Protect the services tab
  useEffect(() => {
    if (!role && activeTab === 'services') {
       setActiveTab('home');
       alert('Please log in using Google or Guest first to access your diagnostic Dashboard.');
    }
  }, [activeTab, role]);

  const handleAnalyze = (salaries: SalaryPoint[], sector: string, monthlyExpense: number, monthlyEmi: number) => {
    // 1. Calculate Trajectory
    const { trajectory: traj, realCagr, declineOnsetYear: declineYear } = computeWageTrajectory(salaries);
    
    setTrajectory(traj);
    setDeclineOnsetYear(declineYear);

    // 2. Risk Scoring calculations
    const lastNominal = traj[traj.length - 1]?.nominal || 0;
    const expenseGrowthRatio = (monthlyExpense * 12) / lastNominal;
    const debtRatio = (monthlyEmi * 12) / lastNominal;
    
    const riskResult = calculateRiskScore({
      realCagr,
      expenseGrowthRatio,
      debtRatio,
      sectorVulnerability: sector === "Technology" ? 0.3 : 0.6
    });
    setRisk(riskResult);

    // 3. Escape Routes
    const currentRealSalary = traj[traj.length - 1]?.real || lastNominal;
    const routes = generateEscapeRoutes({
      currentRealSalary,
      sector,
      currentRole: "Professional"
    });
    setEscapeRoutes(routes);

    setStep("dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden font-sans selection:bg-indigo-500/30">
      
      {/* Universal Background Blobs for consistency - fade out slightly when in 3D services mode */}
      <div 
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-indigo-600/20 to-purple-600/20 blur-[120px] pointer-events-none transition-opacity duration-1000 z-0" 
        style={{ opacity: activeTab === 'services' ? 0.2 : 1 }} 
      />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tl from-cyan-500/10 to-blue-600/10 blur-[100px] pointer-events-none transition-opacity duration-1000 z-0" 
        style={{ opacity: activeTab === 'services' ? 0.2 : 1 }} 
      />

      {/* Show 3D Particle Grid ONLY when on services tab */}
      {activeTab === 'services' && <Environment3D />}

      {/* Top Navigation */}
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area containing 3D Transitions */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-16 min-h-[calc(100vh-100px)]">
        
        {/* Dashboard Header Actions (Only show in services > dashboard) */}
        {activeTab === 'services' && step === "dashboard" && role && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="flex justify-end gap-4 mb-8 pt-4"
          >
            <button 
              onClick={() => setStep("intake")}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:border-gray-500 flex items-center gap-2 transition-all cursor-pointer shadow-lg"
            >
              <ArrowLeft size={16} /> Edit Data
            </button>
            <button 
              onClick={() => { logout(); setActiveTab('home'); setStep("intake"); }}
              className="px-4 py-2 bg-red-900/40 border border-red-500/30 rounded-xl text-sm font-medium text-red-300 hover:text-white hover:bg-red-600 flex items-center gap-2 transition-all cursor-pointer shadow-lg"
            >
              <LogOut size={16} /> Logout
            </button>
          </motion.div>
        )}

        {/* 3D View Router Router via AnimatePresence */}
        <AnimatePresence mode="wait">
          
          {/* Landing Page Route */}
          {activeTab === 'home' && (
             <LandingPage key="home" />
          )}

          {/* About Route */}
          {activeTab === 'about' && (
             <About key="about" />
          )}

          {/* Contact Route */}
          {activeTab === 'contact' && (
             <Contact key="contact" />
          )}

          {/* FAQ Route */}
          {activeTab === 'faq' && (
             <FAQ key="faq" />
          )}

          {/* Services (Intake & Dashboard) Route */}
          {activeTab === 'services' && role && (
            <motion.div
              key="services"
              initial={{ opacity: 0, rotateX: 90, scale: 0.9 }}
              animate={{ opacity: 1, rotateX: 0, scale: 1 }}
              exit={{ opacity: 0, rotateX: -90, scale: 0.9 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {step === "intake" && (
                  <motion.div 
                    key="intake"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                    transition={{ duration: 0.3 }}
                    className="pt-10"
                  >
                    <IntakeForm onAnalyze={handleAnalyze} />
                  </motion.div>
                )}

                {step === "dashboard" && risk && (
                  <motion.div 
                    key="dashboard"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, staggerChildren: 0.1 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                      <div className="lg:col-span-3">
                        <StagnationGraph data={trajectory} declineOnsetYear={declineOnsetYear} />
                      </div>
                      <div className="lg:col-span-1">
                        <RiskCard risk={risk} />
                      </div>
                    </div>

                    {declineOnsetYear && (
                      <div className="p-6 border border-red-500/20 bg-red-900/10 rounded-2xl flex flex-col md:flex-row items-center gap-6 shadow-[0_0_30px_rgba(220,38,38,0.05)]">
                        <div className="p-4 bg-red-500/10 rounded-full text-red-500 shrink-0">
                          <span className="text-3xl font-black">{declineOnsetYear}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-red-400 mb-1">Reality Moment</h3>
                          <p className="text-gray-300">
                            Even with nominal salary bumps, your actual lifestyle purchasing power peaked right before 
                            <span className="text-white font-bold ml-1">{declineOnsetYear}</span>. Every year since has been a hidden decline.
                          </p>
                        </div>
                      </div>
                    )}

                    <EscapePlan routes={escapeRoutes} />

                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
