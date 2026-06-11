import { useState } from 'react';
import { 
  AlertTriangle, 
  ChevronRight,
  TrendingDown,
  TrendingUp,
  Info,
  Calculator,
  X
} from 'lucide-react';
import {
  Layer,
  ResponsiveContainer, 
  Sankey, 
  Tooltip
} from 'recharts';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

const MONTHLY_METRICS = [
  { base: 18000, variable: 5000, overages: 1000, prevTotal: 22000, shadowAI: 1200 },
  { base: 18000, variable: 8000, overages: 1500, prevTotal: 24000, shadowAI: 1400 },
  { base: 20000, variable: 9800, overages: 1200, prevTotal: 27500, shadowAI: 1800 },
  { base: 20000, variable: 12000, overages: 1000, prevTotal: 31000, shadowAI: 2100 },
  { base: 22000, variable: 22601, overages: 1600, prevTotal: 33000, shadowAI: 3500 },
  { base: 24100, variable: 19531, overages: 1600, prevTotal: 46201, shadowAI: 4100 },
];

const SANKEY_NODES = [
  { name: 'Total Spend', type: 'source', color: '#71717a' },
  { name: 'Cursor IDE', type: 'tool', color: '#3b82f6' },
  { name: 'GitHub Copilot', type: 'tool', color: '#8b5cf6' },
  { name: 'Figma', type: 'tool', color: '#ec4899' },
  { name: 'Lovable.dev', type: 'tool', color: '#f59e0b' },
  { name: 'ChatGPT Ent.', type: 'tool', color: '#10b981' },
  { name: 'Engineering', type: 'dept', color: '#71717a' },
  { name: 'Product', type: 'dept', color: '#71717a' },
  { name: 'Design', type: 'dept', color: '#71717a' },
  { name: 'Marketing', type: 'dept', color: '#71717a' },
];

const MONTHLY_LINKS = [
  // Jan
  [
    { source: 0, target: 1, value: 2000, color: '#3b82f6' },
    { source: 0, target: 2, value: 12000, color: '#8b5cf6' },
    { source: 0, target: 3, value: 5000, color: '#ec4899' },
    { source: 0, target: 5, value: 5000, color: '#10b981' },
    { source: 1, target: 6, value: 2000, color: '#3b82f6' },
    { source: 2, target: 6, value: 10500, color: '#8b5cf6' },
    { source: 2, target: 7, value: 1500, color: '#8b5cf6' },
    { source: 3, target: 7, value: 1000, color: '#ec4899' },
    { source: 3, target: 8, value: 4000, color: '#ec4899' },
    { source: 5, target: 7, value: 1000, color: '#10b981' },
    { source: 5, target: 8, value: 2000, color: '#10b981' },
    { source: 5, target: 9, value: 2000, color: '#10b981' },
  ],
  // Feb
  [
    { source: 0, target: 1, value: 5000, color: '#3b82f6' },
    { source: 0, target: 2, value: 12000, color: '#8b5cf6' },
    { source: 0, target: 3, value: 5000, color: '#ec4899' },
    { source: 0, target: 5, value: 5500, color: '#10b981' },
    { source: 1, target: 6, value: 5000, color: '#3b82f6' },
    { source: 2, target: 6, value: 10500, color: '#8b5cf6' },
    { source: 2, target: 7, value: 1500, color: '#8b5cf6' },
    { source: 3, target: 7, value: 1000, color: '#ec4899' },
    { source: 3, target: 8, value: 4000, color: '#ec4899' },
    { source: 5, target: 7, value: 1500, color: '#10b981' },
    { source: 5, target: 8, value: 2000, color: '#10b981' },
    { source: 5, target: 9, value: 2000, color: '#10b981' },
  ],
  // Mar
  [
    { source: 0, target: 1, value: 8000, color: '#3b82f6' },
    { source: 0, target: 2, value: 12000, color: '#8b5cf6' },
    { source: 0, target: 3, value: 5000, color: '#ec4899' },
    { source: 0, target: 5, value: 6000, color: '#10b981' },
    { source: 1, target: 6, value: 8000, color: '#3b82f6' },
    { source: 2, target: 6, value: 10500, color: '#8b5cf6' },
    { source: 2, target: 7, value: 1500, color: '#8b5cf6' },
    { source: 3, target: 7, value: 1000, color: '#ec4899' },
    { source: 3, target: 8, value: 4000, color: '#ec4899' },
    { source: 5, target: 7, value: 1000, color: '#10b981' },
    { source: 5, target: 8, value: 2500, color: '#10b981' },
    { source: 5, target: 9, value: 2500, color: '#10b981' },
  ],
  // Apr
  [
    { source: 0, target: 1, value: 10000, color: '#3b82f6' },
    { source: 0, target: 2, value: 11000, color: '#8b5cf6' },
    { source: 0, target: 3, value: 5000, color: '#ec4899' },
    { source: 0, target: 5, value: 7000, color: '#10b981' },
    { source: 1, target: 6, value: 10000, color: '#3b82f6' },
    { source: 2, target: 6, value: 9500, color: '#8b5cf6' },
    { source: 2, target: 7, value: 1500, color: '#8b5cf6' },
    { source: 3, target: 7, value: 1000, color: '#ec4899' },
    { source: 3, target: 8, value: 4000, color: '#ec4899' },
    { source: 5, target: 7, value: 2000, color: '#10b981' },
    { source: 5, target: 8, value: 2500, color: '#10b981' },
    { source: 5, target: 9, value: 2500, color: '#10b981' },
  ],
  // May
  [
    { source: 0, target: 1, value: 15000, color: '#3b82f6' },
    { source: 0, target: 2, value: 12000, color: '#8b5cf6' },
    { source: 0, target: 3, value: 6000, color: '#ec4899' },
    { source: 0, target: 4, value: 3000, color: '#f59e0b' },
    { source: 0, target: 5, value: 10201, color: '#10b981' },
    { source: 1, target: 6, value: 15000, color: '#3b82f6' },
    { source: 2, target: 6, value: 10000, color: '#8b5cf6' },
    { source: 2, target: 7, value: 2000, color: '#8b5cf6' },
    { source: 3, target: 7, value: 2000, color: '#ec4899' },
    { source: 3, target: 8, value: 4000, color: '#ec4899' },
    { source: 4, target: 6, value: 2000, color: '#f59e0b' },
    { source: 4, target: 7, value: 1000, color: '#f59e0b' },
    { source: 5, target: 7, value: 4201, color: '#10b981' },
    { source: 5, target: 8, value: 3000, color: '#10b981' },
    { source: 5, target: 9, value: 3000, color: '#10b981' },
  ],
  // Jun
  [
    { source: 0, target: 1, value: 14031, color: '#3b82f6' },
    { source: 0, target: 2, value: 12000, color: '#8b5cf6' },
    { source: 0, target: 3, value: 5600, color: '#ec4899' },
    { source: 0, target: 4, value: 5400, color: '#f59e0b' },
    { source: 0, target: 5, value: 8200, color: '#10b981' },
    { source: 1, target: 6, value: 14031, color: '#3b82f6' },
    { source: 2, target: 6, value: 10419, color: '#8b5cf6' },
    { source: 2, target: 7, value: 1581, color: '#8b5cf6' },
    { source: 3, target: 7, value: 1600, color: '#ec4899' },
    { source: 3, target: 8, value: 4000, color: '#ec4899' },
    { source: 4, target: 6, value: 4000, color: '#f59e0b' },
    { source: 4, target: 7, value: 1400, color: '#f59e0b' },
    { source: 5, target: 7, value: 3619, color: '#10b981' },
    { source: 5, target: 8, value: 1600, color: '#10b981' },
    { source: 5, target: 9, value: 2981, color: '#10b981' },
  ]
];

const CustomLink = (props: any) => {
  const { sourceX, targetX, sourceY, targetY, sourceControlX, targetControlX, linkWidth, payload } = props;
  
  return (
    <path
      d={`M${sourceX},${sourceY} C${sourceControlX},${sourceY} ${targetControlX},${targetY} ${targetX},${targetY}`}
      stroke={payload?.color || payload?.payload?.color || payload?.source?.payload?.color || '#a1a1aa'}
      strokeWidth={linkWidth > 0 ? linkWidth : 1}
      strokeOpacity={0.25}
      fill="none"
      style={{ transition: 'stroke-width 500ms cubic-bezier(0.4, 0, 0.2, 1), d 500ms cubic-bezier(0.4, 0, 0.2, 1)' }}
      className="hover:stroke-opacity-60"
    />
  );
};

const CustomTooltip = ({ active, payload, totalSpend }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    if (data.source && data.target) {
      const percentage = totalSpend > 0 ? ((data.value / totalSpend) * 100).toFixed(1) : 0;
      return (
        <div className="bg-zinc-900 dark:bg-zinc-800 border border-zinc-800 dark:border-zinc-700 rounded-lg p-3 shadow-xl font-sans text-left z-[100] relative">
          <p className="text-sm font-semibold text-white">{data.source.name} - {data.target.name}</p>
          <p className="text-xs text-zinc-300 font-mono mt-1">${data.value.toLocaleString()}</p>
          <p className="text-xs text-zinc-300 font-mono mt-1.5">{percentage}% of total spend</p>
        </div>
      );
    } else {
      const isSource = data.type === 'source' || data.name === 'Total Spend';
      const percentage = totalSpend > 0 ? ((data.value / totalSpend) * 100).toFixed(1) : 0;
      return (
        <div className="bg-zinc-900 dark:bg-zinc-800 border border-zinc-800 dark:border-zinc-700 rounded-lg p-3 shadow-xl font-sans text-left z-[100] relative">
          <p className="text-sm font-semibold text-white">{data.name}</p>
          <p className="text-xs text-zinc-300 font-mono mt-1">${data.value.toLocaleString()}</p>
          {!isSource && (
            <p className="text-xs text-zinc-300 font-mono mt-1.5">{percentage}% of total spend</p>
          )}
        </div>
      );
    }
  }
  return null;
};

const CustomNode = ({ x, y, width, height, index, payload, totalSpend }: any) => {
  // Determine if it's placed on the left side, middle, or right side for text alignment
  const isRight = x > 200; // Anything not on the far left
  const isFarRight = x > 500; // Adjust specifically for departments

  const textAnchor = isRight ? 'end' : 'start';
  const textX = isRight ? x - 12 : x + width + 12;

  // We are offsetting standard middle "Tool" nodes slightly
  const adjustTextX = (!isFarRight && isRight) ? x + width + 12 : textX;
  const adjustTextAnchor = (!isFarRight && isRight) ? 'start' : textAnchor;

  const isSource = payload.type === 'source' || payload.name === 'Total Spend';
  const percentage = totalSpend > 0 ? ((payload.value / totalSpend) * 100).toFixed(1) : 0;
  const formattedValue = isSource ? `$${payload.value.toLocaleString()}` : `$${payload.value.toLocaleString()} (${percentage}%)`;

  return (
    <Layer key={`CustomNode${index}`}>
      <rect 
        x={x} 
        y={y} 
        width={width} 
        height={height} 
        fill={payload.color || '#3b82f6'} 
        fillOpacity={0.9} 
        rx={2} 
      />
      <text
        x={adjustTextX}
        y={y + height / 2 - 2}
        textAnchor={adjustTextAnchor}
        className="fill-zinc-900 dark:fill-zinc-100 text-[13px] font-medium font-sans pointer-events-none"
      >
        {payload.name}
      </text>
      <text
        x={adjustTextX}
        y={y + height / 2 + 14}
        textAnchor={adjustTextAnchor}
        className="fill-zinc-500 dark:fill-zinc-400 text-[11px] font-mono pointer-events-none"
      >
        {formattedValue}
      </text>
    </Layer>
  );
};

export default function Dashboard() {
  const [showHelpPane, setShowHelpPane] = useState(false);
  const [selectedMonthIdx, setSelectedMonthIdx] = useState(5);

  const activeData = { nodes: SANKEY_NODES, links: MONTHLY_LINKS[selectedMonthIdx] };
  const currentMetrics = MONTHLY_METRICS[selectedMonthIdx];
  const totalSpend = currentMetrics.base + currentMetrics.variable + currentMetrics.overages;
  const diff = totalSpend - currentMetrics.prevTotal;
  const percChange = ((Math.abs(diff) / currentMetrics.prevTotal) * 100).toFixed(1);
  const isTrendingDown = diff <= 0;
  const TrendIcon = isTrendingDown ? TrendingDown : TrendingUp;

  return (
    <div className="w-full flex-1 flex flex-col relative font-sans">
      
      {/* Header and Metadata Context for Diagram */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 px-2 gap-8 z-20 relative">
        <div>
          <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-1.5 relative group cursor-help w-max">
            Consolidated Expenditure Flow
            <Info className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors" />
            <div className="absolute top-full left-0 mt-2 w-72 p-3 bg-zinc-900 dark:bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-[100] normal-case tracking-normal font-normal text-xs leading-relaxed">
              Real-time visualization mapping the flow of aggregate AI expenditures from initial platform allocations to final organizational cost centers.
            </div>
          </h2>
          <div className="text-5xl font-mono text-zinc-900 dark:text-white tracking-tight flex items-center gap-4">
            ${totalSpend.toLocaleString()} 
            <span className={`flex items-center gap-1 text-sm font-sans font-medium px-2 py-0.5 rounded-md tracking-normal border ${isTrendingDown ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/50' : 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-800/50'}`}>
              <TrendIcon className="w-4 h-4" />
              {isTrendingDown ? '-' : '+'}{percChange}% vs last month
            </span>
          </div>
        </div>
        
        {/* Timeline Slider */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-4 flex lg:justify-end">Historical Snapshot</div>
          <div className="relative flex items-start justify-between w-full h-12 pt-2">
            {/* Background Track */}
            <div className="absolute left-[2%] right-[2%] h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full top-[13.5px] z-0" />
            {/* Active Track */}
            <div 
              className="absolute left-[2%] h-1 bg-blue-500 rounded-full top-[13.5px] transition-all duration-300 z-0"
              style={{ width: `calc(${(selectedMonthIdx / 5) * 96}%)` }}
            />
            {MONTHS.map((month, idx) => (
              <button
                key={month}
                onClick={() => setSelectedMonthIdx(idx)}
                className="relative z-10 flex flex-col items-center outline-none shrink-0 group"
                style={{ width: '12%' }}
                aria-label={`Select ${month}`}
              >
                <div className={`w-3 h-3 rounded-full border-[2.5px] transition-all duration-300 ${
                  selectedMonthIdx >= idx 
                    ? 'bg-blue-500 border-blue-500' 
                    : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 group-hover:border-zinc-400'
                } ${selectedMonthIdx === idx ? 'scale-[1.4] shadow-[0_0_0_3px_rgba(59,130,246,0.15)] ring-2 ring-blue-500/20' : ''}`} />
                <span className={`mt-3 text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${
                  selectedMonthIdx === idx 
                    ? 'text-zinc-900 dark:text-zinc-100' 
                    : 'text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-500'
                }`}>
                  {month}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Full Bleed Sankey Diagram - No Borders, No Cards, Directly on Background */}
      <div className="flex-1 min-h-[500px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <Sankey
            data={activeData}
            node={(props) => <CustomNode {...props} totalSpend={totalSpend} />}
            nodePadding={50}
            nodeWidth={12}
            margin={{ top: 20, right: 10, bottom: 20, left: 10 }}
            link={<CustomLink />}
          >
            <Tooltip content={(props) => <CustomTooltip {...props} totalSpend={totalSpend} />} />
          </Sankey>
        </ResponsiveContainer>
      </div>

      {/* Footer Metrics Row */}
      <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-zinc-200 dark:border-zinc-800 rounded-xl pt-6 rounded-xl shadow-sm bg-white dark:bg-zinc-900 p-5">
        <div className="flex flex-wrap items-center gap-6 sm:gap-8">
          <div>
            <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5 relative group cursor-help w-max">
              Base Subs
              <Info className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors" />
              <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-zinc-900 dark:bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-[100] normal-case tracking-normal font-normal text-xs leading-relaxed">
                Fixed monthly license costs allocated for active user seats across all enterprise toolset integrations.
              </div>
            </div>
            <div className="text-lg font-mono text-zinc-900 dark:text-zinc-100">${currentMetrics.base.toLocaleString()}</div>
          </div>
          <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800 shrink-0"></div>
          <div>
            <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5 relative group cursor-help w-max">
              Variable
              <Info className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-zinc-900 dark:bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-[100] normal-case tracking-normal font-normal text-xs leading-relaxed">
                Dynamic consumption costs resulting from credit utilization, API token usage, or metered computational tasks.
              </div>
            </div>
            <div className="text-lg font-mono text-zinc-900 dark:text-zinc-100">${currentMetrics.variable.toLocaleString()}</div>
          </div>
          <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800 shrink-0"></div>
          <div>
            <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5 relative group cursor-help w-max">
              Overages
              <Info className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors" />
              <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-zinc-900 dark:bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-[100] normal-case tracking-normal font-normal text-xs leading-relaxed">
                Mandatory cloud infrastructure minimums or unexpected tier escalations tracked separately from direct licenses.
              </div>
            </div>
            <div className="text-lg font-mono text-zinc-900 dark:text-zinc-100">${currentMetrics.overages.toLocaleString()}</div>
          </div>
          <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800 shrink-0"></div>
          <div>
            <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5 relative group cursor-help w-max">
              Shadow AI (Est.)
              <Info className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors" />
              <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-zinc-900 dark:bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-[100] normal-case tracking-normal font-normal text-xs leading-relaxed">
                Estimated external spend based on network egress and unsanctioned AI access logs. Not included in total budget.
              </div>
            </div>
            <div className="text-lg font-mono text-zinc-900 dark:text-zinc-100">${currentMetrics.shadowAI.toLocaleString()}</div>
          </div>
        </div>

        <button 
          onClick={() => setShowHelpPane(true)}
          className="font-sans text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 bg-zinc-100 dark:bg-zinc-900/50 py-2.5 px-4 rounded-lg flex items-center gap-2.5 shadow-sm border border-zinc-200/50 dark:border-zinc-800/50 transition-colors w-full md:w-auto"
        >
          <Calculator className="w-4 h-4 shrink-0" />
          <span>View Cost Methodology</span>
        </button>
      </div>

      {/* Help / Documentation Pane (Sidebar) */}
      {showHelpPane && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 transition-opacity"
            onClick={() => setShowHelpPane(false)}
          />
          <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl z-50 p-6 overflow-y-auto font-sans flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-zinc-500" />
                Cost Methodology
              </h2>
              <button 
                onClick={() => setShowHelpPane(false)}
                className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 rounded-lg transition-colors"
                aria-label="Close panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">Mathematical Definition</h3>
                <div className="font-serif text-lg text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-900/50 py-4 px-5 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-x-auto flex flex-col items-center justify-center shadow-inner gap-2">
                  <span>
                    <i>C</i><sub>total</sub> = &sum; (<i>S</i><sub><i>t</i></sub> &middot; <i>N</i><sub><i>t</i></sub> + &sum; <i>K</i><sub><i>t,u</i></sub> &middot; <i>P</i><sub><i>t</i></sub> + <i>O</i><sub><i>t</i></sub>)
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4">Variable Declarations</h3>
                <ul className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400 list-none p-0">
                  <li className="flex flex-col gap-1.5">
                    <span className="font-serif text-[15px] leading-none text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 px-2.5 py-1.5 rounded-md w-max border border-zinc-200 dark:border-zinc-700 shadow-sm"><i>C</i><sub>total</sub></span>
                    <span>Total monthly organization-wide AI tooling cost.</span>
                  </li>
                  <li className="flex flex-col gap-1.5">
                    <span className="font-serif text-[15px] leading-none text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 px-2.5 py-1.5 rounded-md w-max border border-zinc-200 dark:border-zinc-700 shadow-sm"><i>S</i><sub><i>t</i></sub></span>
                    <span>Monthly seat base price for tool <i>t</i>.</span>
                  </li>
                  <li className="flex flex-col gap-1.5">
                    <span className="font-serif text-[15px] leading-none text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 px-2.5 py-1.5 rounded-md w-max border border-zinc-200 dark:border-zinc-700 shadow-sm"><i>N</i><sub><i>t</i></sub></span>
                    <span>Number of active provisioned seats for tool <i>t</i>.</span>
                  </li>
                  <li className="flex flex-col gap-1.5">
                    <span className="font-serif text-[15px] leading-none text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 px-2.5 py-1.5 rounded-md w-max border border-zinc-200 dark:border-zinc-700 shadow-sm"><i>K</i><sub><i>t,u</i></sub></span>
                    <span>Consumable compute tokens or actions requested by user <i>u</i> in tool <i>t</i>.</span>
                  </li>
                  <li className="flex flex-col gap-1.5">
                    <span className="font-serif text-[15px] leading-none text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 px-2.5 py-1.5 rounded-md w-max border border-zinc-200 dark:border-zinc-700 shadow-sm"><i>P</i><sub><i>t</i></sub></span>
                    <span>Price per unit/token in variable usage or overage tiers.</span>
                  </li>
                  <li className="flex flex-col gap-1.5">
                    <span className="font-serif text-[15px] leading-none text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 px-2.5 py-1.5 rounded-md w-max border border-zinc-200 dark:border-zinc-700 shadow-sm"><i>O</i><sub><i>t</i></sub></span>
                    <span>Fixed cloud infrastructure minimums, maintenance SLA costs, or unallocated overhead.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-4 border-t border-zinc-200 dark:border-zinc-800">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                  Financial calculations are refreshed every 24 hours based on identity provider SCIM logs and API gateway telemetry. All variable values are directly allocated to departmental cost centers.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
