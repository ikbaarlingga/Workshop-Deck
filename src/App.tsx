/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Car, 
  Wrench, 
  TrendingUp, 
  Users, 
  MapPin, 
  ShieldCheck, 
  Package, 
  BarChart3, 
  ChevronRight,
  Target,
  Globe,
  Settings,
  DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Constants & Data ---

const BUDGET_DATA = [
  { name: 'Fit-out & Space (Rent/Build)', value: 1500000000, color: '#f59e0b' },
  { name: 'Dyno & Performance Eq', value: 850000000, color: '#3b82f6' },
  { name: 'Mechanical & Paint Eq', value: 600000000, color: '#10b981' },
  { name: 'Initial Stock (Velg/Ban)', value: 500000000, color: '#ef4444' },
  { name: 'Lounge & ATPM Interior', value: 400000000, color: '#8b5cf6' },
  { name: 'Marketing & Licenses', value: 200000000, color: '#ec4899' },
];

const FIVE_YEAR_ROADMAP = [
  {
    year: 'Year 1',
    title: 'Operational Excellence',
    tasks: ['Finalize sourcing channels', 'Setup specialized bays (JDM/Euro)', 'Implement Workshop Management System', 'Brand positioning of premium service']
  },
  {
    year: 'Year 2',
    title: 'Community & Performance',
    tasks: ['Dyno tuning services launch', 'Organize track day events', 'Partnership with car communities', 'Expansion of performance upgrade catalog']
  },
  {
    year: 'Year 3',
    title: 'Vertical Integration',
    tasks: ['Launch in-house PPF/Coating division', 'Exclusive distributorship for rare parts', 'Advanced diagnostic training for staff']
  },
  {
    year: 'Year 4',
    title: 'Digital & Scale',
    tasks: ['E-commerce for high-end parts', 'App-based service tracking', 'Satellite detailing centers']
  },
  {
    year: 'Year 5',
    title: 'Market Leadership',
    tasks: ['Regional expansion (Branch 2)', 'Restoration specialist certification', 'Official tuner status for specific brands']
  }
];

const MARKET_RESOURCES = [
  {
    category: 'Market Trends',
    items: [
      { name: 'Speedhunters', desc: 'Global automotive culture & JDM trends', link: '#' },
      { name: 'PistonHeads', desc: 'European market analysis & performance news', link: '#' },
      { name: 'GTBoard', desc: 'Premium & Hypercar market tracking', link: '#' }
    ]
  },
  {
    category: 'Expert Learning',
    items: [
      { name: 'High Performance Academy (HPA)', desc: 'Engine building & ECU tuning certification', link: '#' },
      { name: 'SATA/3M Training', desc: 'Bodywork and PPF application mastery', link: '#' },
      { name: 'ASE Certification', desc: 'Standard for professional technicians', link: '#' }
    ]
  }
];

const SOURCING_CHANNELS = [
  { region: 'JDM', channels: ['RHDJapan (Direct)', 'Nengun Performance', 'Upgarage (Used/Rare)', 'Local Importers (Specialty)'] },
  { region: 'Europe', channels: ['FCP Euro', 'Pelican Parts', 'Autodoc (OEM)', 'Direct from Germany/UK'] },
  { region: 'Equipments', channels: ['Mainline/Dynojet', 'Autel Diagnostic', 'Hunter Engineering (Alignment)'] }
];

// --- Components ---

const StatCard = ({ icon: Icon, title, value, subtext }: { icon: any, title: string, value: string, subtextText?: string, subtext: string }) => (
  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
    <div className="flex items-start justify-between mb-4">
      <div className="p-3 bg-amber-500/10 rounded-xl">
        <Icon className="w-6 h-6 text-amber-500" />
      </div>
    </div>
    <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
    <div className="text-2xl font-bold text-white mb-2">{value}</div>
    <p className="text-slate-500 text-xs italic">{subtext}</p>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('summary');

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  });

  const totalBudget = BUDGET_DATA.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-amber-500/30">
      {/* Sidebar / Navigation */}
      <nav className="fixed top-0 left-0 h-full w-20 md:w-64 bg-slate-900 border-r border-slate-800 z-50 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="p-2 bg-amber-500 rounded-lg">
            <Car className="w-6 h-6 text-slate-950" />
          </div>
          <span className="hidden md:block font-bold text-xl tracking-tight text-white uppercase italic">OtoMaster</span>
        </div>

        <div className="flex-1 px-4 py-8 space-y-2">
          {[
            { id: 'summary', icon: BarChart3, label: 'Dashboard' },
            { id: 'budget', icon: DollarSign, label: 'Budget Planner' },
            { id: 'roadmap', icon: TrendingUp, label: '5-Year Strategy' },
            { id: 'market', icon: Globe, label: 'Market & Resources' },
            { id: 'sourcing', icon: Package, label: 'Sourcing Channels' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center justify-center md:justify-start gap-4 px-4 py-3 rounded-xl transition-all duration-200",
                activeTab === tab.id 
                  ? "bg-amber-500 text-slate-950 font-semibold shadow-lg shadow-amber-500/20" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <tab.icon className="w-5 h-5 flex-shrink-0" />
              <span className="hidden md:block text-sm">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-4 mt-auto">
          <div className="md:flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 hidden">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">Premium Vision</p>
              <p className="text-[10px] text-slate-400">JDM & European HQ</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pl-20 md:pl-64 min-h-screen">
        <header className="sticky top-0 h-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md z-40 px-8 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white tracking-wide uppercase">
              {activeTab === 'summary' && 'Executive Insight'}
              {activeTab === 'budget' && 'Capital Expenditure Estimator'}
              {activeTab === 'roadmap' && 'Strategic Growth Plan'}
              {activeTab === 'market' && 'Automotive Resource Hub'}
              {activeTab === 'sourcing' && 'Supply Chain Navigator'}
            </h1>
            <p className="text-xs text-slate-500">Premium Automotive Workshop Planning v1.0</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="h-8 w-[1px] bg-slate-800" />
            <div className="text-right hidden sm:block">
              <p className="text-xs text-slate-500">Target Segment</p>
              <p className="text-xs font-bold text-amber-500">High-Net-Worth / Enthusiast</p>
            </div>
          </div>
        </header>

        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* --- Dashboard Summary --- */}
              {activeTab === 'summary' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard 
                      icon={Car} 
                      title="Workshop Capacity" 
                      value="20 Cars" 
                      subtext="Requires 800-1,000m² Minimum" 
                    />
                    <StatCard 
                      icon={Users} 
                      title="Total Hiring Needs" 
                      value="22 Personnel" 
                      subtext="Incl. Specialists & Admin" 
                    />
                    <StatCard 
                      icon={ShieldCheck} 
                      title="Market Segment" 
                      value="Premium/ATPM+" 
                      subtext="Focus on JDM, Euro, Exotics" 
                    />
                    <StatCard 
                      icon={Target} 
                      title="Timeline" 
                      value="5 Years" 
                      subtext="From Launch to Market Leader" 
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-3xl p-8">
                      <h2 className="text-xl font-bold text-white mb-6">Capital Allocation Estimate</h2>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={BUDGET_DATA} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                            <XAxis type="number" hide />
                            <YAxis 
                              dataKey="name" 
                              type="category" 
                              stroke="#64748b" 
                              fontSize={12} 
                              width={150}
                            />
                            <Tooltip 
                              cursor={{ fill: '#1e293b' }}
                              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }}
                            />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                              {BUDGET_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
                      <div className="p-4 bg-amber-500/20 rounded-full mb-6">
                        <TrendingUp className="w-12 h-12 text-amber-500" />
                      </div>
                      <h3 className="text-slate-400 font-medium mb-2 uppercase tracking-widest text-xs">Estimated Capex</h3>
                      <p className="text-4xl font-extrabold text-white mb-4 tracking-tight">
                        {formatter.format(totalBudget)}
                      </p>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        Total estimated budget for a world-class 20-car facility with high-end machinery.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* --- Budget Planner Section --- */}
              {activeTab === 'budget' && (
                <div className="max-w-4xl mx-auto space-y-8">
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                    <table className="w-full text-left">
                      <thead className="bg-slate-800/50">
                        <tr>
                          <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Category</th>
                          <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Estimate (IDR)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {BUDGET_DATA.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-slate-200 font-medium">{item.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right font-mono text-slate-300">
                              {formatter.format(item.value)}
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-slate-800/20">
                          <td className="px-6 py-6 font-bold text-white text-lg italic uppercase tracking-tighter">Grand Total Investment</td>
                          <td className="px-6 py-6 text-right font-bold text-amber-500 text-2xl tracking-tighter">
                            {formatter.format(totalBudget)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="p-8 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                    <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2 italic underline underline-offset-4 decoration-blue-500">
                      <ShieldCheck className="w-5 h-5" />
                      Advisor's Note on Budgeting
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-300">
                      <li className="flex items-start gap-2 italic">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                        Untuk segmentasi JDM/Premium, biaya renovasi interior sangat krusial (minimal standar showroom ATPM).
                      </li>
                      <li className="flex items-start gap-2 italic">
                        <ChevronRight className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                        Alat Dyno 4WD merupakan investasi besar namun kunci penunjang untuk upgrade performance.
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* --- Roadmap Section --- */}
              {activeTab === 'roadmap' && (
                <div className="relative pl-8 space-y-12 before:absolute before:left-3 before:top-0 before:h-full before:w-[2px] before:bg-slate-800">
                  {FIVE_YEAR_ROADMAP.map((year, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ x: 10 }}
                      className="relative bg-slate-900/50 border border-slate-800 p-8 rounded-3xl"
                    >
                      <div className="absolute -left-11 top-8 w-6 h-6 rounded-full bg-slate-950 border-4 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div className="inline-block px-3 py-1 bg-amber-500 text-slate-950 text-xs font-black uppercase rounded mb-2 md:mb-0">
                          {year.year}
                        </div>
                        <h2 className="text-2xl font-bold text-white tracking-tight uppercase italic">{year.title}</h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {year.tasks.map((task, tidx) => (
                          <div key={tidx} className="flex items-center gap-3 text-slate-400 text-sm italic group">
                            <div className="w-5 h-5 rounded-md border border-slate-700 flex items-center justify-center shrink-0 group-hover:border-amber-500 transition-colors">
                              <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-amber-500" />
                            </div>
                            {task}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* --- Market Insight Section --- */}
              {activeTab === 'market' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {MARKET_RESOURCES.map((res, idx) => (
                      <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 pb-4">
                        <h3 className="text-amber-500 font-bold mb-6 flex items-center gap-2 tracking-widest uppercase text-xs">
                          <TrendingUp className="w-4 h-4" />
                          {res.category}
                        </h3>
                        <div className="space-y-6">
                          {res.items.map((item, i) => (
                            <div key={i} className="group cursor-pointer">
                              <h4 className="text-white font-bold group-hover:text-amber-500 transition-colors">{item.name}</h4>
                              <p className="text-slate-500 text-sm">{item.desc}</p>
                              <div className="h-[1px] w-full bg-slate-800 mt-4 group-hover:bg-amber-500/30 transition-colors" />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-amber-500/10 border border-amber-500/20 p-8 rounded-3xl">
                    <h3 className="text-amber-400 font-bold mb-6 uppercase text-sm tracking-widest">Technician Hiring & Expertise (Required for 20-Car Bay)</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                        <p className="text-white font-bold text-lg">1 Chief Tuner</p>
                        <p className="text-slate-500 text-xs">Master of Engine Mgmt & ECU</p>
                      </div>
                      <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                        <p className="text-white font-bold text-lg">6 Senior Techs</p>
                        <p className="text-slate-500 text-xs">2 JDM, 2 Euro, 2 General Performance</p>
                      </div>
                      <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                        <p className="text-white font-bold text-lg">10 Junior/Helpers</p>
                        <p className="text-slate-500 text-xs">General service, alignment & tyre</p>
                      </div>
                      <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                        <p className="text-white font-bold text-lg">3 Detailing Pros</p>
                        <p className="text-slate-500 text-xs">Exclusive for PPF/Coating works</p>
                      </div>
                      <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                        <p className="text-white font-bold text-lg">2 Service Advisors</p>
                        <p className="text-slate-500 text-xs">Customer facing with high car-knowledge</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- Sourcing Section --- */}
              {activeTab === 'sourcing' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {SOURCING_CHANNELS.map((item, idx) => (
                    <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col h-full hover:border-amber-500/50 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-slate-800 rounded-lg">
                          {item.region === 'JDM' && <Globe className="w-5 h-5 text-red-500" />}
                          {item.region === 'Europe' && <Globe className="w-5 h-5 text-blue-500" />}
                          {item.region === 'Equipments' && <Settings className="w-5 h-5 text-amber-500" />}
                        </div>
                        <h3 className="text-white font-bold text-xl uppercase italic pb-1 border-b-2 border-amber-500/20">{item.region} Focus</h3>
                      </div>
                      <ul className="space-y-4 flex-1">
                        {item.channels.map((ch, cidx) => (
                          <li key={cidx} className="flex items-center gap-3 text-slate-300 text-sm bg-slate-800/30 p-3 rounded-xl border border-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer group">
                            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full group-hover:scale-125 transition-transform" />
                            {ch}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-8">
                        <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                          Request Full Directory
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
