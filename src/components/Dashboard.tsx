import { useState } from 'react';
import { 
  AlertTriangle, 
  ChevronRight,
  TrendingDown,
  Info,
  Calculator
} from 'lucide-react';
import {
  Layer,
  ResponsiveContainer, 
  Sankey, 
  Tooltip
} from 'recharts';

const sankeyData = {
  nodes: [
    { name: 'Total Spend', type: 'source' },
    { name: 'Cursor IDE', type: 'tool' },
    { name: 'GitHub Copilot', type: 'tool' },
    { name: 'Figma', type: 'tool' },
    { name: 'Lovable.dev', type: 'tool' },
    { name: 'ChatGPT Ent.', type: 'tool' },
    { name: 'Engineering', type: 'dept' },
    { name: 'Product', type: 'dept' },
    { name: 'Design', type: 'dept' },
    { name: 'Marketing', type: 'dept' },
  ],
  links: [
    { source: 0, target: 1, value: 14031 },
    { source: 0, target: 2, value: 12000 },
    { source: 0, target: 3, value: 5600 },
    { source: 0, target: 4, value: 5400 },
    { source: 0, target: 5, value: 8200 },
    { source: 1, target: 6, value: 14031 },
    { source: 2, target: 6, value: 10419 },
    { source: 2, target: 7, value: 1581 },
    { source: 3, target: 7, value: 1600 },
    { source: 3, target: 8, value: 4000 },
    { source: 4, target: 6, value: 4000 },
    { source: 4, target: 7, value: 1400 },
    { source: 5, target: 7, value: 3619 },
    { source: 5, target: 8, value: 1600 },
    { source: 5, target: 9, value: 2981 },
  ]
};

const NODE_COLORS: Record<string, string> = {
  source: '#3b82f6', // blue
  tool: '#8b5cf6',   // purple
  dept: '#10b981'    // emerald
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    if (data.source && data.target) {
      return (
        <div className="bg-zinc-900 dark:bg-zinc-800 border border-zinc-800 dark:border-zinc-700 rounded-lg p-3 shadow-xl font-sans text-left z-[100] relative">
          <p className="text-sm font-semibold text-white">{data.source.name} → {data.target.name}</p>
          <p className="text-xs text-zinc-400 font-mono mt-1">${data.value.toLocaleString()}</p>
        </div>
      );
    } else {
      return (
        <div className="bg-zinc-900 dark:bg-zinc-800 border border-zinc-800 dark:border-zinc-700 rounded-lg p-3 shadow-xl font-sans text-left z-[100] relative">
          <p className="text-sm font-semibold text-white">{data.name}</p>
          <p className="text-xs text-zinc-400 font-mono mt-1">${data.value.toLocaleString()}</p>
        </div>
      );
    }
  }
  return null;
};

const CustomNode = ({ x, y, width, height, index, payload }: any) => {
  // Determine if it's placed on the left side, middle, or right side for text alignment
  const isRight = x > 200; // Anything not on the far left
  const isFarRight = x > 500; // Adjust specifically for departments

  const textAnchor = isRight ? 'end' : 'start';
  const textX = isRight ? x - 12 : x + width + 12;

  // We are offsetting standard middle "Tool" nodes slightly
  const adjustTextX = (!isFarRight && isRight) ? x + width + 12 : textX;
  const adjustTextAnchor = (!isFarRight && isRight) ? 'start' : textAnchor;

  return (
    <Layer key={`CustomNode${index}`}>
      <rect 
        x={x} 
        y={y} 
        width={width} 
        height={height} 
        fill={NODE_COLORS[payload.type] || '#3b82f6'} 
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
        ${payload.value.toLocaleString()}
      </text>
    </Layer>
  );
};

export default function Dashboard() {
  const [showAnomaly, setShowAnomaly] = useState(true);

  return (
    <div className="w-full flex-1 flex flex-col relative font-sans">
      
      {/* Real-Time Anomaly Banner - Kept as requested context */}
      {showAnomaly && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg p-4 flex items-start sm:items-center justify-between shadow-sm z-10 mx-1 mb-8">
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

      {/* Header and Metdata Context for Diagram */}
      <div className="flex items-end justify-between mb-8 px-2">
        <div>
          <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
            Consolidated Revenue Flow
            <Info className="w-4 h-4 text-zinc-400 cursor-help" />
          </h2>
          <div className="text-5xl font-mono text-zinc-900 dark:text-white tracking-tight flex items-center gap-4">
            $45,231 
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-sm font-sans font-medium px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-900/20 tracking-normal border border-emerald-100 dark:border-emerald-800/50">
              <TrendingDown className="w-4 h-4" />
              -2.1% v.ly
            </span>
          </div>
        </div>
        
        {/* Stage Labels */}
        <div className="hidden lg:flex w-full max-w-[65%] justify-between text-xs font-semibold text-zinc-400 uppercase tracking-widest pl-12">
          <span>Source</span>
          <span>Providers</span>
          <span>Cost Centers</span>
        </div>
      </div>

      {/* Full Bleed Sankey Diagram - No Borders, No Cards, Directly on Background */}
      <div className="flex-1 min-h-[500px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <Sankey
            data={sankeyData}
            node={<CustomNode />}
            nodePadding={50}
            nodeWidth={12}
            margin={{ top: 20, right: 10, bottom: 20, left: 10 }}
            link={{ 
              stroke: '#a1a1aa', // tailwind zinc-400
              strokeOpacity: 0.3, 
              fill: 'none', 
            }}
          >
            <Tooltip content={<CustomTooltip />} />
          </Sankey>
        </ResponsiveContainer>
      </div>

      {/* Footer Metrics Row */}
      <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-zinc-200 dark:border-zinc-800 pt-6">
        <div className="flex flex-wrap items-center gap-6 sm:gap-8">
          <div>
            <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-1.5 flex items-center gap-1">Base Subs</div>
            <div className="text-lg font-mono text-zinc-900 dark:text-zinc-100">$24,100</div>
          </div>
          <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800 shrink-0"></div>
          <div>
            <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-1.5">Variable</div>
            <div className="text-lg font-mono text-zinc-900 dark:text-zinc-100">$19,531</div>
          </div>
          <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800 shrink-0"></div>
          <div>
            <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-1.5">Overages</div>
            <div className="text-lg font-mono text-zinc-900 dark:text-zinc-100">$1,600</div>
          </div>
        </div>

        <div className="font-mono text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/50 py-2.5 px-4 rounded-lg flex items-center gap-2.5 shadow-sm border border-zinc-200/50 dark:border-zinc-800/50 whitespace-nowrap overflow-x-auto w-full md:w-auto">
          <Calculator className="w-4 h-4 text-zinc-400 shrink-0" />
          <span>C_total = Σ (S_t * N_t + Σ (K_t,u * P_t) + O_t)</span>
        </div>
      </div>

    </div>
  );
}
