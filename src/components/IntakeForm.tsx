import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { SalaryPoint } from '../engine/trajectory';
import { Calculator, TrendingDown, ArrowRight, Wallet } from 'lucide-react';

interface IntakeFormProps {
  onAnalyze: (salaries: SalaryPoint[], sector: string, monthlyExpense: number, monthlyEmi: number) => void;
}

export const IntakeForm: React.FC<IntakeFormProps> = ({ onAnalyze }) => {
  const [sector, setSector] = useState("Technology");
  const [salaries, setSalaries] = useState<SalaryPoint[]>([
    { year: 2014, nominal: 600000 },
    { year: 2017, nominal: 800000 },
    { year: 2020, nominal: 1000000 },
    { year: 2024, nominal: 1400000 }
  ]);
  const [expense, setExpense] = useState(60000);
  const [emi, setEmi] = useState(20000);

  const handleSalaryChange = (index: number, val: number) => {
    const updated = [...salaries];
    updated[index].nominal = val;
    setSalaries(updated);
  };

  const handleYearChange = (index: number, val: number) => {
    const updated = [...salaries];
    updated[index].year = val;
    setSalaries(updated);
  };

  const addRow = () => setSalaries([...salaries, { year: 2024, nominal: 0 }]);

  const removeRow = (index: number) => {
    if (salaries.length > 2) {
      setSalaries(salaries.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(salaries, sector, expense, emi);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-8 rounded-2xl bg-black/60 backdrop-blur-xl border border-indigo-500/30 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-indigo-500 to-teal-400" />

      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">Stagnation<span className="text-indigo-400">Scanner</span></h1>
        <p className="text-gray-400 font-medium tracking-wide">Your Salary Is Growing. Your Life Might Not Be.</p>
        <p className="text-xs text-gray-500 mt-2 flex items-center justify-center gap-1">
          <Wallet size={12} /> Local-first processing. No data stored.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
            <TrendingDown className="text-red-400" size={20} /> Salary History
          </h3>
          <div className="space-y-3">
            {salaries.map((pt, i) => (
              <div key={i} className="flex items-center gap-3">
                <input
                  type="number"
                  value={pt.year}
                  onChange={(e) => handleYearChange(i, parseInt(e.target.value))}
                  className="w-24 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  min={2010}
                />
                <div className="relative flex-1">
                  <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                  <input
                    type="number"
                    value={pt.nominal}
                    onChange={(e) => handleSalaryChange(i, parseInt(e.target.value))}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-8 pr-3 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                {salaries.length > 2 && (
                  <button type="button" onClick={() => removeRow(i)} className="text-gray-500 hover:text-red-400 p-2 transition-colors">✕</button>
                )}
              </div>
            ))}
          </div>
          <button type="button" onClick={addRow} className="mt-3 text-sm text-indigo-400 hover:text-indigo-300 font-medium">+ Add Year</button>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-800">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Sector</label>
            <select
              value={sector} onChange={(e) => setSector(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500"
            >
              <option>Technology</option>
              <option>Finance</option>
              <option>Healthcare</option>
              <option>Retail/FMCG</option>
              <option>Manufacturing</option>
              <option>Other</option>
            </select>
          </div>
          <div></div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Monthly Expenses (₹)</label>
            <input
              type="number" value={expense} onChange={(e) => setExpense(parseInt(e.target.value))}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Monthly EMI / Debt (₹)</label>
            <input
              type="number" value={emi} onChange={(e) => setEmi(parseInt(e.target.value))}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full group mt-6 relative inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-lg transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(79,70,229,0.4)]"
        >
          <Calculator size={20} />
          Scan Financial Trajectory
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </motion.div>
  );
};
