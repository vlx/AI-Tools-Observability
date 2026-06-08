import React from 'react';
import { 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  GraduationCap, 
  Layers, 
  Zap, 
  ChevronRight,
  UserCheck,
  Search,
  Filter,
  Lightbulb,
  Info
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const METRICS_DATA = [
  { name: 'Jan', wau: 40, mau: 55 },
  { name: 'Feb', wau: 45, mau: 60 },
  { name: 'Mar', wau: 55, mau: 75 },
  { name: 'Apr', wau: 65, mau: 80 },
  { name: 'May', wau: 70, mau: 85 },
  { name: 'Jun', wau: 85, mau: 95 },
];

const DEPARTMENT_DATA = [
  { name: 'Engineering', seats: 142, wauMau: '88%', avgPrompts: 45, featureDepth: 'High', featureFocus: 'Code Gen & Agents', trainingStatus: 'On Track' },
  { name: 'Product Management', seats: 48, wauMau: '92%', avgPrompts: 32, featureDepth: 'Medium', featureFocus: 'Contextual Chat', trainingStatus: 'Optional' },
  { name: 'Marketing', seats: 65, wauMau: '64%', avgPrompts: 14, featureDepth: 'Low', featureFocus: 'Basic Text Gen', trainingStatus: 'Advanced Workflows' },
  { name: 'Legal & Procurement', seats: 18, wauMau: '22%', avgPrompts: 4, featureDepth: 'Low', featureFocus: 'Document Summary', trainingStatus: 'High Priority' },
  { name: 'Customer Success', seats: 85, wauMau: '45%', avgPrompts: 12, featureDepth: 'Low', featureFocus: 'Basic Chat', trainingStatus: 'Prompt Engineering' },
  { name: 'Executive Team', seats: 4, isMasked: true }, // k-anonymity example
  { name: 'Finance', seats: 3, isMasked: true }, // k-anonymity example
];

const MATRIX_CELLS = [
  { category: 'Text Generation', complexity: 'Basic (Zero-Shot)', usage: 'Very High', color: 'bg-indigo-500/80', users: 380 },
  { category: 'Text Generation', complexity: 'Advanced (RAG)', usage: 'High', color: 'bg-indigo-500/60', users: 215 },
  { category: 'Text Generation', complexity: 'Autonomous', usage: 'Low', color: 'bg-indigo-500/20', users: 45 },
  
  { category: 'Code Assistants', complexity: 'Basic (Zero-Shot)', usage: 'Medium', color: 'bg-indigo-500/40', users: 120 },
  { category: 'Code Assistants', complexity: 'Advanced (RAG)', usage: 'Very High', color: 'bg-indigo-500/80', users: 350 },
  { category: 'Code Assistants', complexity: 'Autonomous', usage: 'Low', color: 'bg-indigo-500/20', users: 30 },
  
  { category: 'Agentic Workflows', complexity: 'Basic (Zero-Shot)', usage: 'Low', color: 'bg-indigo-500/20', users: 15 },
  { category: 'Agentic Workflows', complexity: 'Advanced (RAG)', usage: 'Medium', color: 'bg-indigo-500/40', users: 85 },
  { category: 'Agentic Workflows', complexity: 'Autonomous', usage: 'Very Low', color: 'bg-indigo-500/10', users: 8 },
];

export default function AdoptionEnablement() {
  return (
    <div className="w-full flex-1 flex flex-col font-sans space-y-6">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between px-2 gap-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">Adoption & Enablement</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Track tool utilization, user adoption velocity, and identify targeted training opportunities.</p>
        </div>
        <div className="flex items-center gap-2">
           <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-md text-xs font-medium text-indigo-700 dark:text-indigo-400">
             <ShieldCheck className="w-4 h-4" />
             k-Anonymity Guardrail Active
           </div>
           
           <button 
             className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-400 focus:outline-none relative group cursor-help w-max"
             aria-label="More info about k-Anonymity Guardrail"
           >
             <Info className="w-4 h-4" />
             {/* Details Tooltip */}
             <div className="absolute right-0 top-full mt-2 w-64 bg-zinc-900 dark:bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-lg p-3 shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-[100] normal-case tracking-normal font-normal text-left text-xs leading-relaxed">
               <div className="flex items-center gap-2 mb-1.5">
                 <UserCheck className="w-4 h-4 text-indigo-400" />
                 <h4 className="text-sm font-semibold text-white">Privacy Engine</h4>
               </div>
               <p className="text-xs text-zinc-400 leading-relaxed">
                 Automatically masking metrics for <strong className="text-zinc-200">2 target groups</strong> (under 5 users) to prevent employee de-anonymization.
               </p>
             </div>
           </button>
        </div>
      </div>

      {/* TOP ROW: KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* KPI 1: WAU/MAU Ratio */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm flex flex-col relative">
          <div className="flex items-center justify-between mb-3 text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-1.5 relative group cursor-help w-max">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-semibold uppercase tracking-wider">WAU / MAU Ratio</span>
              <Info className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors ml-0.5" />
              <div className="absolute top-full left-0 mt-2 w-64 bg-zinc-900 dark:bg-zinc-800 text-zinc-100 text-xs p-3 rounded-lg shadow-xl border border-zinc-700 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-[100] normal-case tracking-normal font-normal leading-relaxed">
                Weekly Active Users divided by Monthly Active Users. A ratio above 60% indicates strong, habitual usage of the available tools.
              </div>
            </div>
          </div>
          <div className="text-3xl font-mono text-emerald-600 dark:text-emerald-500 flex items-baseline gap-2">
            78.4%
            <span className="text-sm font-sans text-emerald-600/70 dark:text-emerald-500/70 font-medium">active</span>
          </div>
          <div className="h-10 mt-2 mb-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={METRICS_DATA}>
                <Area type="monotone" dataKey="wau" stroke="#10b981" fill="#10b981" fillOpacity={0.15} strokeWidth={2} isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800/50">
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">+12% from last quarter</p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Tracking consistent tool usage depth over time. A ratio above <strong className="font-semibold text-zinc-700 dark:text-zinc-300">60%</strong> highlights that users are returning weekly rather than sporadically.
            </p>
          </div>
        </div>

        {/* KPI 2: Avg Daily Prompts */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-3 text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-semibold uppercase tracking-wider">Avg Daily Prompts</span>
            </div>
          </div>
          <div className="text-3xl font-mono text-zinc-900 dark:text-zinc-100 flex items-baseline gap-2">
            24.5
            <span className="text-sm font-sans text-zinc-500 font-medium">prompts</span>
          </div>
          <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Users are moving from sporadic experimentation to integrated daily workflows.
            </p>
          </div>
        </div>

        {/* KPI 3: Active Departments */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-3 text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-500" />
              <span className="text-xs font-semibold uppercase tracking-wider">Active Departments</span>
            </div>
          </div>
          <div className="text-3xl font-mono text-zinc-900 dark:text-zinc-100 flex items-baseline gap-2">
            8 <span className="text-xl font-mono text-zinc-400">/ 12</span>
            <span className="text-sm font-sans text-zinc-500 font-medium">departments</span>
          </div>
          <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Engineering and PM lead adoption. Legal & Finance still lagging below 30%.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        
        {/* LEFT COLUMN: Feature Utilization Matrix */}
        <div className="lg:col-span-1 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl shadow-sm flex flex-col">
          <div className="p-5 border-b border-zinc-100 dark:border-zinc-800/50">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Feature Utilization Matrix</h3>
            <p className="text-xs text-zinc-500 mt-1">Agentic tool usage vs capability depth</p>
          </div>
          <div className="p-5 flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
            
            {/* Custom Grid Matrix */}
            <div className="grid grid-cols-4 gap-1 w-full h-64">
              
              {/* Y Axis Labels */}
              <div className="col-span-1 flex flex-col justify-between text-[10px] uppercase font-semibold text-zinc-400 pr-2 pb-6 text-right">
                <div className="flex-1 flex items-center justify-end">Text Gen</div>
                <div className="flex-1 flex items-center justify-end">Code Assist</div>
                <div className="flex-1 flex items-center justify-end">Agentic Work.</div>
              </div>
              
              {/* Grid Area */}
              <div className="col-span-3 grid grid-rows-3 grid-cols-3 gap-2 pb-6 relative">
                 {MATRIX_CELLS.map((cell, idx) => (
                   <div 
                     key={idx} 
                     className={`${cell.color} rounded-md relative group cursor-pointer transition-transform hover:scale-105 border border-black/5 dark:border-white/5`}
                   >
                     {/* Tooltip on hover */}
                     <div className="absolute inset-x-0 bottom-full mb-2 bg-zinc-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 w-max max-w-[120px] left-1/2 -translate-x-1/2 text-center shadow-lg">
                       <p className="font-semibold">{cell.users} Users</p>
                       <p className="text-[10px] text-zinc-400 truncate">{cell.category}</p>
                       <p className="text-[10px] text-zinc-400 truncate">{cell.complexity}</p>
                     </div>
                   </div>
                 ))}
                 
                 {/* X Axis Labels */}
                 <div className="absolute top-full left-0 right-0 flex justify-between text-[10px] uppercase font-semibold text-zinc-400 mt-2">
                   <div className="w-1/3 text-center -ml-2">Zero-Shot</div>
                   <div className="w-1/3 text-center">RAG Mode</div>
                   <div className="w-1/3 text-center pr-2">Autonomous</div>
                 </div>
              </div>
            </div>

            <div className="mt-8 bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-lg flex items-start gap-3">
              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Users are heavily entrenched in code generation and basic text chatting. <strong className="text-zinc-900 dark:text-zinc-200">Agentic workflow adoption is very low</strong>, presenting the primary training opportunity for advanced productivity gains.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Training & Department Table */}
        <div className="lg:col-span-2 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl shadow-sm flex flex-col">
          <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-indigo-500" />
                Training Opportunity Heatmap
              </h3>
              <p className="text-xs text-zinc-500 mt-1">Cross-referencing seat counts with feature utilization</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input 
                  type="text" 
                  placeholder="Find department..." 
                  className="pl-8 pr-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 w-48 text-zinc-900 dark:text-zinc-100 transition-shadow"
                />
              </div>
              <button className="p-1.5 text-zinc-500 border border-zinc-200 dark:border-zinc-800 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                <Filter className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-zinc-50 dark:bg-zinc-950/50 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3 border-b border-zinc-200 dark:border-zinc-800">Department / Group</th>
                  <th className="px-5 py-3 border-b border-zinc-200 dark:border-zinc-800">Seats</th>
                  <th className="px-5 py-3 border-b border-zinc-200 dark:border-zinc-800">WAU / MAU</th>
                  <th className="px-5 py-3 border-b border-zinc-200 dark:border-zinc-800 text-center">Depth</th>
                  <th className="px-5 py-3 border-b border-zinc-200 dark:border-zinc-800">Training Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
                {DEPARTMENT_DATA.map((dept, i) => (
                  <tr key={i} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="px-5 py-3 font-medium text-zinc-900 dark:text-zinc-100 bg-transparent flex items-center gap-2">
                       {dept.name}
                       {dept.isMasked && <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />}
                    </td>
                    
                    {dept.isMasked ? (
                      <td colSpan={4} className="px-5 py-3">
                         <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-medium py-1 px-3 bg-indigo-50 dark:bg-indigo-500/10 rounded border border-indigo-100 dark:border-indigo-500/20 w-fit">
                           <ShieldCheck className="w-3.5 h-3.5" />
                           Metrics hidden by k-Anonymity guardrail (Seats &lt; 5)
                         </div>
                      </td>
                    ) : (
                      <>
                        <td className="px-5 py-3 text-zinc-600 dark:text-zinc-400 font-mono text-xs">{dept.seats}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-zinc-700 dark:text-zinc-300">{dept.wauMau}</span>
                            <div className="w-16 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  parseInt(dept.wauMau) > 75 ? 'bg-emerald-500' : 
                                  parseInt(dept.wauMau) > 40 ? 'bg-amber-500' : 'bg-red-500'
                                }`} 
                                style={{ width: dept.wauMau }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-center">
                          <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            dept.featureDepth === 'High' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' :
                            dept.featureDepth === 'Medium' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' :
                            'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                          }`}>
                            {dept.featureDepth}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center justify-between group cursor-pointer">
                            <span className={`text-xs font-semibold ${
                              dept.trainingStatus === 'High Priority' ? 'text-red-600 dark:text-red-400' :
                              dept.trainingStatus === 'On Track' ? 'text-emerald-600 dark:text-emerald-400' :
                              'text-zinc-700 dark:text-zinc-300'
                            }`}>
                              {dept.trainingStatus}
                            </span>
                            <ChevronRight className="w-4 h-4 text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-500 dark:group-hover:text-zinc-300 transition-colors" />
                          </div>
                          <div className="text-[10px] text-zinc-500 mt-0.5 max-w-[180px] truncate">
                            Focus: {dept.featureFocus}
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
