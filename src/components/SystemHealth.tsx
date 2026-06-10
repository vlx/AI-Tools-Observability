import React, { useState } from 'react';
import { 
  Activity, 
  CheckCircle2, 
  AlertCircle,
  WifiOff, 
  ArrowRightLeft,
  Server,
  ShieldAlert,
  Clock,
  ToggleRight,
  ToggleLeft,
  Search,
  Filter,
  CalendarDays
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

// --- MOCK DATA ---

const SPARKLINE_OPTIONS = {
  openai: [{v: 120}, {v: 130}, {v: 125}, {v: 140}, {v: 135}, {v: 150}, {v: 145}, {v: 160}, {v: 155}, {v: 130}, {v: 125}, {v: 120}],
  anthropic: [{v: 400}, {v: 350}, {v: 450}, {v: 600}, {v: 800}, {v: 1200}, {v: 900}, {v: 850}, {v: 700}, {v: 750}, {v: 800}, {v: 650}],
  gemini: [{v: 90}, {v: 95}, {v: 85}, {v: 92}, {v: 88}, {v: 85}, {v: 90}, {v: 89}, {v: 93}, {v: 85}, {v: 88}, {v: 90}],
  copilot: [{v: 80}, {v: 85}, {v: 82}, {v: 88}, {v: 85}, {v: 90}, {v: 87}, {v: 85}, {v: 83}, {v: 80}, {v: 82}, {v: 85}],
  cursor: [{v: 140}, {v: 135}, {v: 145}, {v: 150}, {v: 160}, {v: 155}, {v: 140}, {v: 145}, {v: 130}, {v: 135}, {v: 140}, {v: 145}],
};

const PROVIDERS = [
  { id: 'openai', name: 'OpenAI API', status: 'Operational', sla: '99.98%', latency: '120ms', errorRate: '0.01%', color: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10', icon: CheckCircle2, chartData: SPARKLINE_OPTIONS.openai, chartColor: '#10b981' },
  { id: 'anthropic', name: 'Anthropic API', status: 'Degraded', sla: '98.45%', latency: '650ms', errorRate: '2.40%', color: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10', icon: AlertCircle, chartData: SPARKLINE_OPTIONS.anthropic, chartColor: '#f59e0b' },
  { id: 'gemini', name: 'Google Gemini', status: 'Operational', sla: '100.00%', latency: '90ms', errorRate: '0.00%', color: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10', icon: CheckCircle2, chartData: SPARKLINE_OPTIONS.gemini, chartColor: '#10b981' },
  { id: 'copilot', name: 'GitHub Copilot', status: 'Operational', sla: '99.95%', latency: '85ms', errorRate: '0.02%', color: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10', icon: CheckCircle2, chartData: SPARKLINE_OPTIONS.copilot, chartColor: '#10b981' },
  { id: 'cursor', name: 'Cursor IDE', status: 'Operational', sla: '99.90%', latency: '140ms', errorRate: '0.05%', color: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10', icon: CheckCircle2, chartData: SPARKLINE_OPTIONS.cursor, chartColor: '#10b981' },
];

const HEATMAP_DATA = {
  '24h': Array.from({ length: 24 }, (_, i) => {
    if (i === 18 || i === 19) return { status: 'amber', time: `${24-i} hrs ago`, message: 'Anthropic API latency degraded (p95 > 800ms) for 45 minutes.' };
    if (i === 4) return { status: 'red', time: `${24-i} hrs ago`, message: 'OpenAI 503 errors detected in US-East region. Automated fallback engaged to Anthropic.' };
    return { status: 'emerald', time: `${24-i} hrs ago`, message: 'All systems operational.' };
  }),
  '7d': Array.from({ length: 7 }, (_, i) => {
    if (i === 2) return { status: 'amber', time: `${7-i} days ago`, message: 'Cursor IDE connection timeouts observed during peak EU business hours.' };
    return { status: 'emerald', time: `${7-i} days ago`, message: 'All systems operational.' };
  }),
  '30d': Array.from({ length: 30 }, (_, i) => {
    if (i === 12 || i === 13) return { status: 'amber', time: `${30-i} days ago`, message: 'Minor degradation across multiple text completion endpoints. Cross-provider fallback active.' };
    if (i === 25) return { status: 'red', time: `${30-i} days ago`, message: 'Global Cloudflare outage affected API routing. Resolution took 1h 15m.' };
    return { status: 'emerald', time: `${30-i} days ago`, message: 'All systems operational.' };
  })
};

const PROBE_LOGS = [
  { id: 'req_1', timestamp: '14:21:05.122', endpoint: 'POST /v1/messages', provider: 'Anthropic', status: 429, latency: '1250ms', type: 'error' },
  { id: 'req_2', timestamp: '14:21:04.853', endpoint: 'POST /v1/chat/completions', provider: 'OpenAI', status: 200, latency: '142ms', type: 'success' },
  { id: 'req_3', timestamp: '14:21:03.401', endpoint: 'POST /v1/models/gemini-pro:generateContent', provider: 'Gemini', status: 200, latency: '89ms', type: 'success' },
  { id: 'req_4', timestamp: '14:21:02.112', endpoint: 'POST /v1/messages', provider: 'Anthropic', status: 503, latency: '3405ms', type: 'error' },
  { id: 'req_5', timestamp: '14:21:01.005', endpoint: 'GET /v1/models', provider: 'OpenAI', status: 200, latency: '45ms', type: 'success' },
  { id: 'req_6', timestamp: '14:20:58.847', endpoint: 'POST /v1/chat/completions', provider: 'OpenAI', status: 200, latency: '135ms', type: 'success' },
];

export default function SystemHealth({ hideHeader = false }: { hideHeader?: boolean }) {
  const [autoFallback, setAutoFallback] = useState(false);
  const [heatmapRange, setHeatmapRange] = useState<'24h' | '7d' | '30d'>('24h');
  const [hoveredBlock, setHoveredBlock] = useState<{status: string, time: string, message: string} | null>(null);

  const currentHeatmapData = HEATMAP_DATA[heatmapRange];

  return (
    <div className="w-full flex-1 flex flex-col font-sans space-y-6">
      
      {/* Header */}
      {!hideHeader && (
        <div className="flex flex-col lg:flex-row lg:items-end justify-between px-2 gap-4">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">System Health & Reliability</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Real-time macro observability, provider SLAs, and automated fallback logic.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <Clock className="w-4 h-4" />
            <span>Last updated: just now</span>
          </div>
        </div>
      )}

      {/* TOP SECTION: Global Reliability Heatmap */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm flex flex-col overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-500" />
            Global Reliability Heatmap
          </h3>
          <div className="flex bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-lg">
            {(['24h', '7d', '30d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setHeatmapRange(range)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  heatmapRange === range 
                    ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm' 
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {range === '24h' ? '24 Hours' : range === '7d' ? '7 Days' : '30 Days'}
              </button>
            ))}
          </div>
        </div>
        <div className="p-5 flex flex-col justify-center">
          <div className="flex items-center gap-1 w-full justify-between h-14">
            {currentHeatmapData.map((data, i) => (
              <div 
                key={i} 
                onMouseEnter={() => setHoveredBlock(data)}
                onMouseLeave={() => setHoveredBlock(null)}
                className={`h-full flex-1 rounded-sm transition-all duration-300 cursor-crosshair hover:opacity-80
                  ${data.status === 'emerald' ? 'bg-emerald-500/20 hover:bg-emerald-500/40 dark:bg-emerald-500/30' : ''}
                  ${data.status === 'amber' ? 'bg-amber-500/40 hover:bg-amber-500/60 dark:bg-amber-500/50' : ''}
                  ${data.status === 'red' ? 'bg-red-500/50 hover:bg-red-500/70 dark:bg-red-500/60' : ''}
                `}
              />
            ))}
          </div>
          
          {/* Legend and Axis */}
          <div className="flex justify-between items-center mt-3 text-xs font-medium text-zinc-500 px-1">
            <span>{heatmapRange === '24h' ? '24 hours ago' : heatmapRange === '7d' ? '7 days ago' : '30 days ago'}</span>
            <div className="hidden sm:flex items-center gap-6">
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-emerald-500/30"></div> Operational</div>
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-amber-500/50"></div> Degraded</div>
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-red-500/60"></div> Outage</div>
            </div>
            <span>Now</span>
          </div>

          {/* Dynamic Hover Details Box */}
          <div className="mt-4 h-10 border rounded-lg bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 flex items-center px-4 transition-colors">
            {hoveredBlock ? (
              <div className="flex items-center gap-2 text-sm">
                <span className={`font-semibold ${
                  hoveredBlock.status === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' :
                  hoveredBlock.status === 'amber' ? 'text-amber-600 dark:text-amber-400' :
                  'text-red-600 dark:text-red-400'
                }`}>
                  {hoveredBlock.time}:
                </span>
                <span className="text-zinc-700 dark:text-zinc-300">
                  {hoveredBlock.message}
                </span>
              </div>
            ) : (
              <span className="text-sm text-zinc-400 italic">Hover over a time block to view historical incidents and status details.</span>
            )}
          </div>
        </div>
      </div>

      {/* MIDDLE SECTION: Provider Health Matrix */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Server className="w-4 h-4 text-zinc-400" />
            Provider Health Matrix
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-400">
            <thead className="bg-zinc-50 dark:bg-zinc-950/50 text-xs uppercase tracking-wider font-semibold text-zinc-500">
              <tr>
                <th className="px-5 py-3 border-b border-zinc-200 dark:border-zinc-800">AI Provider</th>
                <th className="px-5 py-3 border-b border-zinc-200 dark:border-zinc-800">Status</th>
                <th className="px-5 py-3 border-b border-zinc-200 dark:border-zinc-800">30d SLA</th>
                <th className="px-5 py-3 border-b border-zinc-200 dark:border-zinc-800">p95 Latency</th>
                <th className="px-5 py-3 border-b border-zinc-200 dark:border-zinc-800">Error Rate (1h)</th>
                <th className="px-5 py-3 border-b border-zinc-200 dark:border-zinc-800 w-32">Latency Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {PROVIDERS.map((provider) => {
                const StatusIcon = provider.icon;
                return (
                  <tr key={provider.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="px-5 py-3 font-medium text-zinc-900 dark:text-zinc-100">
                      {provider.name}
                    </td>
                    <td className="px-5 py-3">
                      <div className={`inline-flex items-center gap-1.5 ${provider.color}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        <span className="font-medium text-xs">{provider.status}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 font-mono">{provider.sla}</td>
                    <td className="px-5 py-3 font-mono">{provider.latency}</td>
                    <td className="px-5 py-3 font-mono">
                      <span className={parseFloat(provider.errorRate) > 1 ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''}>
                        {provider.errorRate}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="h-8 w-24">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={provider.chartData}>
                            <Area type="monotone" dataKey="v" stroke={provider.chartColor} fill={provider.chartColor} fillOpacity={0.15} strokeWidth={1.5} isAnimationActive={false} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* BOTTOM SECTION: Logs and SRE Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        
        {/* Logs Column */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm flex flex-col flex-1 overflow-hidden min-h-[300px]">
            <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Search className="w-4 h-4 text-zinc-400" />
                Live Synthetic Probes
              </h3>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  STREAMING
                </span>
                <button className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-md">
                  <Filter className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="overflow-auto bg-[#0a0a0a] border-t border-zinc-900 text-zinc-300 font-mono text-xs leading-relaxed flex-1 p-4 shadow-inner selection:bg-blue-500/30">
              <div className="flex flex-col space-y-1.5 min-w-[600px]">
                {PROBE_LOGS.map((log) => {
                  const isError = log.type === 'error';
                  const statusLabel = log.status === 200 ? 'INFO' : log.status === 429 ? 'WARN' : 'ERR ';
                  const statusColor = log.status === 200 ? 'text-blue-500' : log.status === 429 ? 'text-amber-500' : 'text-red-500';
                  
                  return (
                    <div key={log.id} className="flex gap-3 whitespace-nowrap opacity-90 hover:opacity-100 transition-opacity">
                      <span className="text-zinc-600 shrink-0">[{log.timestamp}]</span>
                      <span className={`${statusColor} shrink-0 w-10 font-bold`}>{statusLabel}</span>
                      <span className={`shrink-0 w-24 ${isError ? 'text-red-400' : 'text-zinc-500'}`}>[{log.provider}]</span>
                      <span className={isError ? 'text-red-400' : 'text-zinc-300'}>
                        {log.endpoint}
                      </span>
                      <span className={`ml-auto shrink-0 ${isError ? 'text-red-500/90' : 'text-emerald-500/70'}`}>
                        status={log.status} latency={log.latency}
                      </span>
                    </div>
                  );
                })}
                <div className="flex gap-2 items-center mt-1 text-zinc-500">
                  <span className="text-emerald-500/60 font-bold">❯</span>
                  <span className="animate-pulse w-1.5 h-3.5 bg-zinc-400 inline-block"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SRE Action Column */}
        <div className="lg:col-span-1 flex flex-col">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden border-t-4 border-t-blue-500 dark:border-t-blue-600 h-full flex flex-col">
            <div className="p-5 flex-1">
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center mb-4">
                <ArrowRightLeft className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Automated Traffic Redirection</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                When enabled, programmatic fallback logic will automatically reroute API requests to secondary providers (e.g., from Anthropic to OpenAI) if latency exceeds 1500ms or 5xx errors breach the 5% threshold.
              </p>
              
              <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">Safety Interlock</h4>
                    <p className="text-xs text-zinc-500 mt-1">Override manual commits globally</p>
                  </div>
                  <button 
                    onClick={() => setAutoFallback(!autoFallback)}
                    className="focus:outline-none transition-transform active:scale-95"
                    aria-label="Toggle Fallback"
                  >
                    {autoFallback ? (
                      <ToggleRight className="w-10 h-10 text-emerald-500" />
                    ) : (
                      <ToggleLeft className="w-10 h-10 text-zinc-400 dark:text-zinc-600" />
                    )}
                  </button>
                </div>
              </div>

              {autoFallback ? (
                <div className="flex items-start gap-2.5 p-3 rounded-md bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  <p className="font-medium leading-relaxed">Fallback logic is active. Traffic will automatically reroute according to the predefined failover matrix.</p>
                </div>
              ) : (
                <div className="flex items-start gap-2.5 p-3 rounded-md bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs">
                  <WifiOff className="w-4 h-4 shrink-0 mt-0.5" />
                  <p className="font-medium leading-relaxed">Failover requires manual intervention. High latency will NOT trigger automatic rerouting.</p>
                </div>
              )}
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/50 px-5 py-3 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center mt-auto">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">Active Matrix Version</span>
              <span className="text-xs font-mono text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2 py-0.5 rounded">v2.1.4</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
