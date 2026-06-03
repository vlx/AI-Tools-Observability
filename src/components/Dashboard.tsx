import { useState } from 'react';
import { 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Database,
  ArrowUpRight,
  Calculator,
  ChevronRight,
  Info
} from 'lucide-react';
import {
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Cell, 
  Legend, 
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis
} from 'recharts';

// Mock Data
const costCenterData = [
  { name: 'Engineering', value: 28450, color: '#3b82f6' },
  { name: 'Product', value: 8200, color: '#10b981' },
  { name: 'Design', value: 5600, color: '#8b5cf6' },
  { name: 'Marketing', value: 2981, color: '#f59e0b' },
];

const toolSpendData = [
  { name: 'GitHub Copilot', seats: 8500, variable: 0 },
  { name: 'ChatGPT Ent.', seats: 6000, variable: 1200 },
  { name: 'Cursor IDE', seats: 3200, variable: 5400 },
  { name: 'Figma', seats: 2400, variable: 1800 },
  { name: 'Lovable.dev', seats: 0, variable: 4200 },
];

const trendData = [
  { month: 'Jan', Engineering: 18000, Product: 5000, Design: 3000 },
  { month: 'Feb', Engineering: 21000, Product: 5500, Design: 3200 },
  { month: 'Mar', Engineering: 23500, Product: 6200, Design: 3800 },
  { month: 'Apr', Engineering: 25000, Product: 7000, Design: 4500 },
  { month: 'May', Engineering: 28450, Product: 8200, Design: 5600 },
];

export default function Dashboard() {
  const [showAnomaly, setShowAnomaly] = useState(true);

  return (
    <div className="w-full flex flex-col gap-6 font-sans">
      
      {/* Real-Time Anomaly Banner */}
      {showAnomaly && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg p-4 flex items-start sm:items-center justify-between shadow-sm">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-full text-red-600 dark:text-red-400 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-red-900 dark:text-red-300">
                CRITICAL: Daily spend anomaly detected
              </h3>
              <p className="text-sm text-red-700 dark:text-red-400/80 mt-0.5">
                Consumption has increased by <span className="font-bold">8.4%</span> in the last 24 hours. Virtual Tag <code className="bg-red-100 dark:bg-red-950 px-1 py-0.5 rounded text-xs font-mono">cursor:max_mode</code> detected in high-volume clusters.
              </p>
            </div>
          </div>
          <button className="flex items-center gap-1.5 text-xs font-semibold bg-white dark:bg-zinc-900 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-3 py-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/40 transition-colors shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-red-500">
            Drill Down
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Hero Section & Top Metrics (Grid layout 12 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Total Spend Hero Card */}
        <div className="md:col-span-12 lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <Calculator className="w-32 h-32 text-blue-500" />
          </div>
          <div className="relative z-10">
            <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              Total Monthly AI Spend
              <Info className="w-4 h-4 text-zinc-400 cursor-help" />
            </h2>
            <div className="mt-4 flex items-end gap-4">
              <span className="text-5xl font-mono text-zinc-900 dark:text-white tracking-tight">$45,231</span>
              <div className="flex items-center gap-1 text-red-600 dark:text-red-400 text-sm font-medium mb-1.5 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-md">
                <TrendingUp className="w-4 h-4" />
                +14.2%
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 font-mono text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-950 py-2 px-3 rounded-lg overflow-x-auto">
              C_total = Σ (S_t * N_t + Σ (K_t,u * P_t) + O_t)
            </div>
          </div>
        </div>

        {/* Sub Metrics */}
        <div className="md:col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-500" />
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Base Subscriptions</h3>
            </div>
            <div className="text-2xl font-mono text-zinc-800 dark:text-zinc-100">$24,100</div>
            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1 font-mono">S_t * N_t</p>
          </div>
          
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Variable Consumption</h3>
            </div>
            <div className="text-2xl font-mono text-zinc-800 dark:text-zinc-100">$19,531</div>
            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1 font-mono">Σ (K_t,u * P_t)</p>
          </div>
          
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-4 h-4 text-emerald-500" />
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Cloud Overages</h3>
            </div>
            <div className="text-2xl font-mono text-zinc-800 dark:text-zinc-100">$1,600</div>
            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1 font-mono">O_t (Infra Minimums)</p>
          </div>
        </div>

      </div>

      {/* Main Charts Array */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-2">
        
        {/* Trend Analysis (Area Chart) */}
        <div className="xl:col-span-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-white">Departmental Spend Trend</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">6-month historical overview of AI expenditures</p>
            </div>
          </div>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEng" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" opacity={0.2} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ fontSize: '13px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', paddingTop: '20px' }} />
                <Area type="monotone" dataKey="Engineering" stackId="1" stroke="#3b82f6" fillOpacity={1} fill="url(#colorEng)" />
                <Area type="monotone" dataKey="Product" stackId="1" stroke="#10b981" fillOpacity={1} fill="url(#colorProd)" />
                <Area type="monotone" dataKey="Design" stackId="1" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorDes)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cost-Center Breakdown (Pie Chart) */}
        <div className="xl:col-span-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm p-6 flex flex-col">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-white">Cost-Center Breakdown</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Cross-departmental relative spend</p>
          </div>
          <div className="flex-1 min-h-[300px] flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={costCenterData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {costCenterData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ fontSize: '13px' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Monthly Spend']}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Total</span>
              <span className="font-mono text-zinc-900 dark:text-white text-lg">$45.2k</span>
            </div>
          </div>
          
          <div className="mt-2 grid grid-cols-2 gap-y-2 gap-x-4">
            {costCenterData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-zinc-600 dark:text-zinc-300">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-2">
        {/* Tool-Specific Spend (Grouped Bar Chart) */}
        <div className="xl:col-span-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-white">Tool-Specific Spend (Fixed vs Variable)</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Breakdown of base seats minus overage and tokens consumed</p>
            </div>
          </div>
          <div className="min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={toolSpendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" opacity={0.2} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ fontSize: '13px', fontFamily: 'monospace' }}
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }} />
                <Bar dataKey="seats" name="Seat Subscriptions" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} maxBarSize={60} />
                <Bar dataKey="variable" name="Variable Usage / Overages" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
}
