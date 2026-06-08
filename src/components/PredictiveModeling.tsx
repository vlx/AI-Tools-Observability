import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ComposedChart
} from 'recharts';
import { 
  TrendingUp, 
  SlidersHorizontal, 
  Users, 
  Briefcase, 
  Activity, 
  AlertCircle,
  Info,
  Calendar,
  Zap
} from 'lucide-react';

const BASE_PROJECTION = [
  { month: 'Jul', expected: 12500, range: [11500, 13500] },
  { month: 'Aug', expected: 13100, range: [11800, 14500] },
  { month: 'Sep', expected: 13800, range: [12200, 15600] },
  { month: 'Oct', expected: 14600, range: [12600, 16800] },
  { month: 'Nov', expected: 15500, range: [13100, 18300] },
  { month: 'Dec', expected: 16800, range: [13800, 20500] },
];

const AGGRESSIVE_PROJECTION = [
  { month: 'Jul', expected: 13500, range: [12000, 15000] },
  { month: 'Aug', expected: 14800, range: [12800, 16800] },
  { month: 'Sep', expected: 16500, range: [13500, 19500] },
  { month: 'Oct', expected: 18600, range: [14200, 23000] },
  { month: 'Nov', expected: 21500, range: [16000, 27000] },
  { month: 'Dec', expected: 25800, range: [18000, 33500] },
];

const CONSERVATIVE_PROJECTION = [
  { month: 'Jul', expected: 12000, range: [11200, 12800] },
  { month: 'Aug', expected: 12200, range: [11300, 13200] },
  { month: 'Sep', expected: 12500, range: [11400, 13700] },
  { month: 'Oct', expected: 12800, range: [11500, 14200] },
  { month: 'Nov', expected: 13200, range: [11800, 14800] },
  { month: 'Dec', expected: 13500, range: [12000, 15500] },
];

type Scenario = 'base' | 'aggressive' | 'conservative';

export default function PredictiveModeling() {
  const [mode, setMode] = useState<'macro' | 'micro'>('macro');
  const [scenario, setScenario] = useState<Scenario>('base');
  const [hiringRate, setHiringRate] = useState(5);
  const [attritionRate, setAttritionRate] = useState(2);
  const [seasonality, setSeasonality] = useState(true);

  const getProjectionData = () => {
    if (mode === 'macro') {
      switch (scenario) {
        case 'aggressive': return AGGRESSIVE_PROJECTION;
        case 'conservative': return CONSERVATIVE_PROJECTION;
        default: return BASE_PROJECTION;
      }
    } else {
      const netGrowth = (hiringRate - attritionRate) / 100;
      return BASE_PROJECTION.map((point, index) => {
        const growthFactor = 1 + (netGrowth * (index / 5));
        const seasonMult = seasonality && (point.month === 'Nov' || point.month === 'Dec') ? 1.05 : 1;
        const expected = Math.round(point.expected * growthFactor * seasonMult);
        const varianceSize = (point.range[1] - point.range[0]) * growthFactor * (seasonMult > 1 ? 1.2 : 1);
        return {
          ...point,
          expected: expected,
          range: [Math.round(expected - varianceSize * 0.4), Math.round(expected + varianceSize * 0.6)]
        };
      });
    }
  };

  const currentData = getProjectionData();
  const projectedEOY = currentData[currentData.length - 1].expected;
  const rangeVariance = currentData[currentData.length - 1].range[1] - currentData[currentData.length - 1].range[0];

  return (
    <div className="w-full flex-1 flex flex-col font-sans space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between px-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">Predictive Modeling</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Forecast future AI consumption, costs, and license needs based on organizational growth.</p>
        </div>
        {/* Mode Toggle */}
        <div className="bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-lg flex items-center shrink-0 w-full lg:w-auto">
          <button 
            onClick={() => setMode('macro')}
            className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
              mode === 'macro' 
                ? 'bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-zinc-100' 
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            <Zap className="w-4 h-4" /> What-If Scenarios
          </button>
          <button 
            onClick={() => setMode('micro')}
            className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
              mode === 'micro' 
                ? 'bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-zinc-100' 
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" /> Custom Forecasting
          </button>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 items-start">
        {/* LEFT/TOP: Controls & Scenarios (Sidebar) */}
        <div className="w-full xl:w-80 shrink-0 space-y-6">
          {mode === 'macro' ? (
            /* Preset Scenarios */
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-zinc-900 dark:text-zinc-100 font-semibold">
                <Zap className="w-4 h-4 text-amber-500" />
                What-If Scenarios
              </div>
              <div className="space-y-2">
                <button 
                  onClick={() => setScenario('base')}
                  className={`w-full text-left px-3 py-2.5 rounded-lg border text-sm transition-all focus:outline-none ${
                    scenario === 'base' 
                      ? 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-300 dark:border-zinc-600 font-medium text-zinc-900 dark:text-zinc-100' 
                      : 'bg-transparent border-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800/30 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  Base Maintenance Plan
                </button>
                <button 
                  onClick={() => setScenario('aggressive')}
                  className={`w-full text-left px-3 py-2.5 rounded-lg border text-sm transition-all focus:outline-none ${
                    scenario === 'aggressive' 
                      ? 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30 font-medium text-indigo-900 dark:text-indigo-300' 
                      : 'bg-transparent border-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800/30 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  Expansive Growth <span className="text-xs text-indigo-500/70 block">(Copilot for All)</span>
                </button>
                <button 
                  onClick={() => setScenario('conservative')}
                  className={`w-full text-left px-3 py-2.5 rounded-lg border text-sm transition-all focus:outline-none ${
                    scenario === 'conservative' 
                      ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 font-medium text-emerald-900 dark:text-emerald-300' 
                      : 'bg-transparent border-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800/30 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  Conservative Restructuring
                </button>
              </div>
            </div>
          ) : (
            /* Forecasting Input */
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-5 text-zinc-900 dark:text-zinc-100 font-semibold">
                <SlidersHorizontal className="w-4 h-4 text-indigo-500" />
                Custom Forecasting
              </div>
              
              <div className="space-y-6">
                {/* Hiring Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <label className="text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" /> Projected Hiring
                    </label>
                    <span className="font-mono font-medium text-zinc-900 dark:text-zinc-100">+{hiringRate}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" max="25" 
                    value={hiringRate} 
                    onChange={(e) => setHiringRate(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                {/* Attrition Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <label className="text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5" /> Expected Attrition
                    </label>
                    <span className="font-mono font-medium text-zinc-900 dark:text-zinc-100">-{attritionRate}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" max="15" 
                    value={attritionRate} 
                    onChange={(e) => setAttritionRate(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                {/* Seasonality Toggle */}
                <div className="pt-2">
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
                      <Calendar className="w-3.5 h-3.5" /> Q4 Seasonality Shifts
                    </div>
                    <div className={`relative w-9 h-5 rounded-full transition-colors ${seasonality ? 'bg-indigo-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}>
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        checked={seasonality} 
                        onChange={(e) => setSeasonality(e.target.checked)}
                      />
                      <div className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${seasonality ? 'translate-x-4' : 'translate-x-0'}`}></div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT/MAIN: Visualization & KPIs */}
        <div className="flex-1 min-w-0 w-full space-y-6">
          
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-1.5 mb-2 relative group cursor-help w-max">
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Est. EOY License Shortfall</span>
                <Info className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors" />
                <div className="absolute top-full left-0 mt-2 w-64 bg-zinc-900 dark:bg-zinc-800 text-zinc-100 text-xs p-3 rounded-lg shadow-xl border border-zinc-700 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-[100] normal-case tracking-normal font-normal leading-relaxed">
                  The projected gap between current organizational seat commitments and modeled active usage by December.
                </div>
              </div>
              <div className="text-2xl font-mono text-zinc-900 dark:text-zinc-100 font-bold mb-1">
                {mode === 'macro' && scenario === 'aggressive' ? '145' : mode === 'macro' && scenario === 'base' ? '24' : mode === 'micro' && (hiringRate - attritionRate) > 5 ? '86' : '0'} 
                <span className="text-sm font-sans font-medium text-zinc-500 ml-2">seats needed</span>
              </div>
            </div>

             <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-1.5 mb-2 relative group cursor-help w-max">
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Projected EOY Spend</span>
                <Info className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors" />
                <div className="absolute top-full left-0 mt-2 w-64 bg-zinc-900 dark:bg-zinc-800 text-zinc-100 text-xs p-3 rounded-lg shadow-xl border border-zinc-700 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-[100] normal-case tracking-normal font-normal leading-relaxed">
                  Composite cost calculated from seat licensing and token/cloud consumption run-rates.
                </div>
              </div>
              <div className="text-2xl font-mono text-zinc-900 dark:text-zinc-100 font-bold mb-1 flex items-center gap-3">
                ${(projectedEOY).toLocaleString()}
                {((mode === 'macro' && scenario === 'aggressive') || (mode === 'micro' && (hiringRate - attritionRate) > 8)) && <span className="flex items-center gap-1 text-xs font-sans text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded font-semibold border border-amber-200 dark:border-amber-500/20"><AlertCircle className="w-3.5 h-3.5"/> Limit Risk</span>}
              </div>
            </div>
          </div>

          {/* Main Chart Canvas */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm flex flex-col p-5">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                 <Activity className="w-4 h-4 text-indigo-500" />
                 6-Month Probabilistic Consumption Map
               </h3>
               <div className="flex items-center gap-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div> Expected Spend
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-indigo-500/10 border border-indigo-500/30"></div> 95% Confidence Interval (Variance)
                  </div>
               </div>
            </div>

            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={currentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#52525b" strokeOpacity={0.15} />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#71717a', fontSize: 12, fontWeight: 500 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#71717a', fontSize: 12 }} 
                    tickFormatter={(val) => `$${val/1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', borderRadius: '8px', color: '#f4f4f5', fontSize: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                    itemStyle={{ color: '#e4e4e7' }}
                    labelStyle={{ color: '#a1a1aa', marginBottom: '4px', fontWeight: 600 }}
                    formatter={(value: any, name: string) => {
                      if (name === 'Expected') return [`$${value.toLocaleString()}`, 'Expected'];
                      if (name === 'Variance Range') return [`$${value[0].toLocaleString()} - $${value[1].toLocaleString()}`, 'Confidence Interval'];
                      return [value, name];
                    }}
                  />
                  
                  {/* The Confidence Interval Area */}
                  <Area 
                    type="monotone" 
                    dataKey="range" 
                    fill="#6366f1" 
                    stroke="none"
                    fillOpacity={0.15} 
                    name="Variance Range"
                    isAnimationActive={true}
                  />
                  
                  {/* The Expected Line */}
                  <Line 
                    type="monotone" 
                    dataKey="expected" 
                    stroke="#6366f1" 
                    strokeWidth={3} 
                    dot={{ fill: '#18181b', stroke: '#6366f1', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#6366f1', stroke: '#fff', strokeWidth: 2 }}
                    name="Expected"
                    isAnimationActive={true}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-start gap-3 bg-zinc-50 dark:bg-zinc-800/30 p-4 rounded-lg">
               <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
               <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                 The shaded region represents the <strong className="text-zinc-800 dark:text-zinc-200">95% confidence interval</strong> for expenditure variance. 
                 Current modeling shows a potential maximum variance spread of <strong className="font-mono text-zinc-800 dark:text-zinc-200">${rangeVariance.toLocaleString()}</strong> by end of year, driven primarily by unpredictable bulk token processing spikes.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
