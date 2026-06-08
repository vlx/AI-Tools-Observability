import React, { useState } from 'react';
import { 
  Users, 
  TrendingDown, 
  CheckCircle2, 
  Info,
  ArrowRightLeft,
  Filter,
  ArrowDownToLine,
  MinusCircle
} from 'lucide-react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const KPI_DATA = {
  totalSeats: 245,
  activeUtilization: 82,
  potentialSavings: 1420
};

const BUBBLE_DATA = [
  { id: 1, tool: 'ChatGPT Ent.', daysInactive: 45, costPerSeat: 60, seats: 5, color: '#10b981' },
  { id: 2, tool: 'Figma', daysInactive: 20, costPerSeat: 45, seats: 12, color: '#ec4899' },
  { id: 3, tool: 'Cursor IDE', daysInactive: 60, costPerSeat: 20, seats: 8, color: '#3b82f6' },
  { id: 4, tool: 'Lovable.dev', daysInactive: 10, costPerSeat: 120, seats: 2, color: '#f59e0b' },
  { id: 5, tool: 'GitHub Copilot', daysInactive: 32, costPerSeat: 19, seats: 15, color: '#8b5cf6' },
  { id: 6, tool: 'Linear', daysInactive: 55, costPerSeat: 8, seats: 20, color: '#6366f1' },
];

const RECOMMENDATIONS = [
  {
    id: 1,
    tool: 'ChatGPT Enterprise',
    department: 'Marketing',
    inactiveSeats: 5,
    lastActive: '45 days ago',
    savings: 300,
    action: 'Downgrade to Plus',
    actionIcon: ArrowDownToLine,
    colorClass: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
  },
  {
    id: 2,
    tool: 'Cursor IDE',
    department: 'Engineering',
    inactiveSeats: 8,
    lastActive: '60 days ago',
    savings: 160,
    action: 'Reallocate to Product',
    actionIcon: ArrowRightLeft,
    colorClass: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800'
  },
  {
    id: 3,
    tool: 'GitHub Copilot',
    department: 'Design (Cross-functional)',
    inactiveSeats: 15,
    lastActive: '32 days ago',
    savings: 285,
    action: 'Revoke License',
    actionIcon: MinusCircle,
    colorClass: 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800'
  }
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-zinc-900 dark:bg-zinc-800 border border-zinc-700 rounded-lg p-3 shadow-xl font-sans text-left z-50">
        <p className="text-sm font-semibold text-white mb-1">{data.tool}</p>
        <div className="space-y-1">
          <p className="text-xs text-zinc-300">
            <span className="text-zinc-500">Inactive:</span> {data.daysInactive} days
          </p>
          <p className="text-xs text-zinc-300">
            <span className="text-zinc-500">Cost/Seat:</span> ${data.costPerSeat}
          </p>
          <p className="text-xs text-zinc-300">
            <span className="text-zinc-500">Affected Seats:</span> {data.seats}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function LicenseOptimization() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const toggleTooltip = (id: string) => {
    setActiveTooltip(activeTooltip === id ? null : id);
  };

  return (
    <div className="w-full flex-1 flex flex-col font-sans space-y-6">
      
      {/* Header slightly adjusted for standard layout */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between px-2 gap-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">License Optimization</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Identify inactive seats and view reallocation recommendations across your vendor toolset.</p>
        </div>
      </div>

      {/* Value Realization Hub (KPI Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Provisioned Seats */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-3 text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Provisioned Seats</span>
            </div>
          </div>
          <div className="text-3xl font-mono text-zinc-900 dark:text-zinc-100 flex items-baseline gap-2">
            {KPI_DATA.totalSeats}
            <span className="text-sm font-sans text-zinc-500 font-medium">seats</span>
          </div>
        </div>

        {/* Active Utilization Rate */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm flex flex-col relative">
          <div className="flex items-center justify-between mb-3 text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Active Utilization</span>
            </div>
            
            <button 
              className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-400 focus:outline-none"
              onClick={() => toggleTooltip('utilization')}
              onMouseEnter={() => setActiveTooltip('utilization')}
              onMouseLeave={() => setActiveTooltip(null)}
              aria-label="More info about Active Utilization"
            >
              <Info className="w-4 h-4" />
            </button>
            {activeTooltip === 'utilization' && (
              <div className="absolute right-4 top-12 w-64 bg-zinc-900 dark:bg-zinc-800 text-zinc-300 text-xs p-3 rounded-lg shadow-xl border border-zinc-700 z-50">
                Percentage of allocated seats that have recorded activity within the last 30 days. Allows identifying overarching toolset engagement.
              </div>
            )}
          </div>
          <div className="text-3xl font-mono text-emerald-600 dark:text-emerald-500 flex items-baseline gap-2">
            {KPI_DATA.activeUtilization}%
            <span className="text-sm font-sans text-emerald-600/70 dark:text-emerald-500/70 font-medium">active</span>
          </div>
        </div>

        {/* Potential Monthly Savings */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm flex flex-col relative">
          <div className="flex items-center justify-between mb-3 text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Potential Savings</span>
            </div>
            
            <button 
              className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-400 focus:outline-none"
              onClick={() => toggleTooltip('savings')}
              onMouseEnter={() => setActiveTooltip('savings')}
              onMouseLeave={() => setActiveTooltip(null)}
              aria-label="More info about Potential Savings"
            >
              <Info className="w-4 h-4" />
            </button>
            {activeTooltip === 'savings' && (
              <div className="absolute right-4 top-12 w-64 bg-zinc-900 dark:bg-zinc-800 text-zinc-300 text-xs p-3 rounded-lg shadow-xl border border-zinc-700 z-50">
                Estimated monthly cost reduction achievable by executing all recommended seat revocations and tier downgrades.
              </div>
            )}
          </div>
          <div className="text-3xl font-mono text-zinc-900 dark:text-zinc-100 flex items-baseline gap-2">
            ${KPI_DATA.potentialSavings.toLocaleString()}
            <span className="text-sm font-sans text-zinc-500 font-medium">/ mo</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        
        {/* Optimization Visualization (Bubble Chart) */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm flex flex-col overflow-hidden">
          <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Inactive Seat Clusters</h3>
            <button className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors">
              <Filter className="w-3.5 h-3.5" />
              Filter
            </button>
          </div>
          <div className="p-5 flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.2} />
                <XAxis 
                  type="number" 
                  dataKey="daysInactive" 
                  name="Days Inactive" 
                  tick={{ fontSize: 11, fill: '#71717a' }}
                  tickLine={false}
                  axisLine={{ stroke: '#e4e4e7', strokeOpacity: 0.5 }}
                  label={{ value: 'Days Inactive', position: 'insideBottom', offset: -10, fontSize: 11, fill: '#71717a' }}
                  domain={[0, 'dataMax + 10']}
                />
                <YAxis 
                  type="number" 
                  dataKey="costPerSeat" 
                  name="Cost per Seat" 
                  tickFormatter={(val) => `$${val}`}
                  tick={{ fontSize: 11, fill: '#71717a' }}
                  tickLine={false}
                  axisLine={false}
                  label={{ value: 'Monthly Cost / Seat', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#71717a' }}
                />
                <ZAxis type="number" dataKey="seats" range={[100, 1000]} name="Affected Seats" />
                <Tooltip cursor={{ strokeDasharray: '3 3', stroke: '#a1a1aa' }} content={<CustomTooltip />} />
                <Scatter name="Tools" data={BUBBLE_DATA}>
                  {BUBBLE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.7} className="stroke-2 stroke-white dark:stroke-zinc-900 hover:fill-opacity-100 transition-opacity duration-300 cursor-pointer" />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Actionable Recommendations List */}
        <div className="lg:col-span-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm flex flex-col overflow-hidden max-h-[420px]">
          <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800/50">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Top Optimization Actions</h3>
          </div>
          <div className="overflow-y-auto flex-1 p-2">
            <div className="space-y-2">
              {RECOMMENDATIONS.map((rec) => {
                const ActionIcon = rec.actionIcon;
                return (
                  <div key={rec.id} className="p-4 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors border border-transparent hover:border-zinc-100 dark:hover:border-zinc-800 group">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">{rec.tool}</h4>
                        <p className="text-xs text-zinc-500 mt-0.5">{rec.department}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-mono font-medium text-emerald-600 dark:text-emerald-400">+${rec.savings}</span>
                        <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-0.5">/ mo</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 my-3 px-3 py-2 bg-zinc-50 dark:bg-zinc-900/50 rounded-md border border-zinc-100 dark:border-zinc-800">
                      <div>
                        <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider mb-0.5">Inactive</p>
                        <p className="text-xs font-mono text-zinc-700 dark:text-zinc-300">{rec.inactiveSeats} seats</p>
                      </div>
                      <div className="w-px bg-zinc-200 dark:bg-zinc-700"></div>
                      <div>
                        <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider mb-0.5">Last Active</p>
                        <p className="text-xs font-mono text-zinc-700 dark:text-zinc-300">{rec.lastActive}</p>
                      </div>
                    </div>

                    <button className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-semibold border transition-all ${rec.colorClass} shadow-sm opacity-90 group-hover:opacity-100`}>
                      <ActionIcon className="w-3.5 h-3.5" />
                      {rec.action}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
