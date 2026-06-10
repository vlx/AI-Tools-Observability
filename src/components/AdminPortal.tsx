import React, { useState } from 'react';
import { 
  Key, UploadCloud, Activity, ShieldCheck, Users, Database, 
  RefreshCw, CheckCircle2, Lock, Globe, Info, Server, Package, Plus, MoreHorizontal
} from 'lucide-react';
import SystemHealth from './SystemHealth';

const CONNECTORS = [
  { id: 1, name: 'AWS Cost Explorer Integration', type: 'API Gateway', status: 'connected', lastSync: '10 mins ago', region: 'us-east-1' },
  { id: 2, name: 'Google Cloud Billing', type: 'Service Account', status: 'connected', lastSync: '45 mins ago', region: 'global' },
  { id: 3, name: 'Azure Consumption API', type: 'OAuth 2.0', status: 'error', lastSync: '2 hours ago', region: 'eu-west-1' },
  { id: 4, name: 'OpenAI Enterprise Usage', type: 'API Key', status: 'connected', lastSync: '5 mins ago', region: 'global' },
  { id: 5, name: 'CASB Network Egress', type: 'Log Sync', status: 'connected', lastSync: '1 min ago', region: 'global' },
];

const AUDIT_LOGS = [
  { id: 1, action: 'API Key Rotated', user: 'admin@acme.com', timestamp: '2026-06-08 13:42:10 UTC', detail: 'OpenAI primary key rotated' },
  { id: 2, action: 'Policy Updated', user: 'security@acme.com', timestamp: '2026-06-07 09:15:22 UTC', detail: 'RBAC: Data Science team added to Snowflake insights' },
  { id: 3, action: 'SSO Sync Complete', user: 'system', timestamp: '2026-06-07 00:00:00 UTC', detail: 'Okta directory synchronization successful' },
  { id: 4, action: 'Discovery Scan', user: 'system', timestamp: '2026-06-06 18:00:00 UTC', detail: 'Shadow AI egress scan completed, 3 new endpoints detected' },
];

const AI_TOOLS = [
  { id: 1, name: 'Cursor IDE', category: 'Developer Tools', vendor: 'Cursor', status: 'managed', connector: 'API Key Management', seatsAllocated: 120 },
  { id: 2, name: 'GitHub Copilot', category: 'Developer Tools', vendor: 'Microsoft', status: 'managed', connector: 'Azure Consumption API', seatsAllocated: 145 },
  { id: 3, name: 'Figma', category: 'Design & Creative', vendor: 'Figma', status: 'managed', connector: 'API Key Management', seatsAllocated: 85 },
  { id: 4, name: 'Lovable.dev', category: 'Design & Creative', vendor: 'Lovable', status: 'managed', connector: 'Manual Ingestion', seatsAllocated: 20 },
  { id: 5, name: 'ChatGPT Ent.', category: 'General Productivity', vendor: 'OpenAI', status: 'managed', connector: 'OpenAI Enterprise Usage', seatsAllocated: 320 },
  { id: 6, name: 'ChatGPT Plus', category: 'Consumer Subscriptions', vendor: 'OpenAI', status: 'shadow', connector: 'CASB Discovery', seatsAllocated: 112 },
  { id: 7, name: 'Claude Pro', category: 'Consumer Subscriptions', vendor: 'Anthropic', status: 'shadow', connector: 'CASB Discovery', seatsAllocated: 45 },
  { id: 8, name: 'Midjourney', category: 'Design & Creative', vendor: 'Midjourney', status: 'shadow', connector: 'Network Egress', seatsAllocated: 32 },
];

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState<'infrastructure' | 'portfolio' | 'security' | 'health'>('infrastructure');

  return (
    <div className="w-full flex-1 flex flex-col font-sans space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between px-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">Admin Portal</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Configure data connectors, manage your AI portfolio, and monitor security policies.</p>
        </div>
        
        {/* Tab Toggle */}
        <div className="bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-lg flex items-center shrink-0 w-full lg:w-auto overflow-x-auto">
          <button 
            onClick={() => setActiveTab('infrastructure')}
            className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
              activeTab === 'infrastructure' 
                ? 'bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-zinc-100' 
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            <Server className="w-4 h-4" /> Data Connectors
          </button>
          <button 
            onClick={() => setActiveTab('portfolio')}
            className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
              activeTab === 'portfolio' 
                ? 'bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-zinc-100' 
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            <Package className="w-4 h-4" /> AI Portfolio
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
              activeTab === 'security' 
                ? 'bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-zinc-100' 
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> Security & Access
          </button>
          <button 
            onClick={() => setActiveTab('health')}
            className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
              activeTab === 'health' 
                ? 'bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-zinc-100' 
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            <Activity className="w-4 h-4" /> System Health
          </button>
        </div>
      </div>

      <div className="mt-2">
        {activeTab === 'infrastructure' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Top section: Add new source */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
              <div className="mb-5">
                <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-semibold mb-1">
                  <Plus className="w-4 h-4 text-indigo-500" />
                  Add New Data Source
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Choose how you want to ingest consumption and token telemetry data.</p>
              </div>
              
              {/* API Keys Configuration Area */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 group hover:border-indigo-200 dark:hover:border-indigo-500/30 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-all cursor-pointer flex items-start gap-3 bg-white dark:bg-zinc-900">
                  <div className="p-2 bg-zinc-100 dark:bg-zinc-800 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 text-zinc-600 dark:text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 rounded-md transition-colors">
                    <Key className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">API Key Management</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Configure webhooks and REST endpoints</p>
                  </div>
                </div>
                <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 group hover:border-emerald-200 dark:hover:border-emerald-500/30 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-all cursor-pointer flex items-start gap-3 bg-white dark:bg-zinc-900">
                  <div className="p-2 bg-zinc-100 dark:bg-zinc-800 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20 text-zinc-600 dark:text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 rounded-md transition-colors">
                    <UploadCloud className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Manual Ingestion</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Drag and drop CSV metadata payloads</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom section: Live Connectors */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-semibold mb-1">
                    <Database className="w-4 h-4 text-emerald-500" />
                    Live Connectors & Heartbeat
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Live status of connected telemetry sources and background sync times.</p>
                </div>
              </div>

              {/* Ingestion Heartbeat Table */}
              <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
                <div className="bg-zinc-50 dark:bg-zinc-800/50 px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Ingestion Heartbeat</span>
                  <div className="flex items-center gap-1.5 relative group cursor-help w-max">
                    <Info className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 transition-colors" />
                    <div className="absolute top-full right-0 mt-2 w-64 bg-zinc-900 dark:bg-zinc-800 text-zinc-100 text-xs p-3 rounded-lg shadow-xl border border-zinc-700 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-[100] normal-case tracking-normal font-normal leading-relaxed">
                      Live status of connected telemetry sources, background sync times, and origin regions.
                    </div>
                  </div>
                </div>
                <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {CONNECTORS.map(connector => (
                    <div key={connector.id} className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                      <div className="flex items-center gap-3">
                        {connector.status === 'connected' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : (
                          <Activity className="w-4 h-4 text-rose-500 shrink-0" />
                        )}
                        <div>
                          <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{connector.name}</div>
                          <div className="flex items-center gap-2 mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                            <span>{connector.type}</span>
                            <span>•</span>
                            <span className="uppercase">{connector.region}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className={`text-xs px-2 py-0.5 rounded font-medium ${connector.status === 'connected' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400'}`}>
                          {connector.status === 'connected' ? 'Healthy' : 'Sync Error'}
                        </span>
                        <span className="text-xs text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
                          <RefreshCw className="w-3 h-3" /> {connector.lastSync}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-semibold">
                    <Package className="w-4 h-4 text-indigo-500" />
                    Tracked AI Portfolio
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Manage AI applications mapped to your ingestion sources.</p>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors">
                  <Plus className="w-3.5 h-3.5" /> Add Tool
                </button>
              </div>
              
              <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
                <div className="bg-zinc-50 dark:bg-zinc-800/50 px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider hidden md:grid md:grid-cols-12 gap-4">
                  <div className="col-span-4">Application</div>
                  <div className="col-span-3">Category</div>
                  <div className="col-span-3">Data Source</div>
                  <div className="col-span-2 text-right">Status</div>
                </div>
                <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {AI_TOOLS.map(tool => (
                    <div key={tool.id} className="p-4 bg-white dark:bg-zinc-900 grid grid-cols-1 md:grid-cols-12 gap-4 items-start md:items-center group hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                      <div className="col-span-1 md:col-span-4 flex justify-between pr-0 md:pr-4">
                        <div>
                          <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{tool.name}</div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400">{tool.vendor} • {tool.seatsAllocated} seats</div>
                        </div>
                        {/* Mobile menu button */}
                        <button className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors md:hidden">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="col-span-1 md:col-span-3">
                        <span className="inline-block text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md">{tool.category}</span>
                      </div>
                      <div className="col-span-1 md:col-span-3 text-sm text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
                        <Database className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <span className="truncate">{tool.connector}</span>
                      </div>
                      <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end gap-3 mt-2 md:mt-0">
                        <span className="text-xs text-zinc-500 md:hidden uppercase font-semibold">Status</span>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs px-2 py-0.5 rounded font-medium border ${
                            tool.status === 'managed' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : 
                            tool.status === 'shadow' ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20' : 
                            'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700'
                          }`}>
                            {tool.status.charAt(0).toUpperCase() + tool.status.slice(1)}
                          </span>
                          <button className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors hidden md:block opacity-0 group-hover:opacity-100">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            
            {/* Security Posture Status */}
            <div className="lg:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm border-l-4 border-l-emerald-500">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Security Posture: Optimized</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Platform-level security controls and directory synchronizations are active.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-md text-xs font-medium text-emerald-700 dark:text-emerald-400">
                  <ShieldCheck className="w-4 h-4" /> SSO Active
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-md text-xs font-medium text-zinc-700 dark:text-zinc-400">
                  <Globe className="w-4 h-4" /> EU Data Residency
                </div>
              </div>
            </div>

            {/* RBAC Matrix Snapshot */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-zinc-900 dark:text-zinc-100 font-semibold">
                <Users className="w-4 h-4 text-indigo-500" />
                Role Based Access
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">Manage dynamic policies and organizational permissions mapped to user identities.</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/30">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Super Admin</span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">3 Users</span>
                  </div>
                  <button className="text-indigo-600 dark:text-indigo-400 text-xs font-medium hover:underline focus:outline-none">Edit</button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/30">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Financial Analyst</span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">12 Users</span>
                  </div>
                  <button className="text-indigo-600 dark:text-indigo-400 text-xs font-medium hover:underline focus:outline-none">Edit</button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/30">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Read-Only Manager</span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">45 Users</span>
                  </div>
                  <button className="text-indigo-600 dark:text-indigo-400 text-xs font-medium hover:underline focus:outline-none">Edit</button>
                </div>
              </div>
            </div>

            {/* Compliance & Audit Log */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-zinc-900 dark:text-zinc-100 font-semibold">
                <Lock className="w-4 h-4 text-zinc-400" />
                Compliance Log
              </div>
              
              <div className="space-y-4">
                {AUDIT_LOGS.map(log => (
                  <div key={log.id} className="relative pl-4 border-l border-zinc-200 dark:border-zinc-800">
                    <div className="absolute w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700 -left-[4.5px] top-1.5"></div>
                    <div className="flex justify-between items-start mb-0.5">
                      <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{log.action}</span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">{log.detail}</p>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
                      <span>{log.user}</span>
                      <span>•</span>
                      <span>{log.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors focus:outline-none">
                Download Full Audit Trail
              </button>
            </div>
          </div>
        )}

        {activeTab === 'health' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <SystemHealth hideHeader />
          </div>
        )}
      </div>
    </div>
  );
}
