import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Dashboard from './Dashboard';
import LicenseOptimization from './LicenseOptimization';
import SystemHealth from './SystemHealth';
import { 
  Menu, 
  ChevronLeft, 
  Bell, 
  User, 
  Search, 
  Moon, 
  Sun, 
  LayoutDashboard, 
  PieChart, 
  Activity, 
  ShieldCheck, 
  LineChart, 
  Settings,
  Aperture,
  ChevronDown,
  Check,
  Sparkles,
  Zap,
  Lightbulb,
  TrendingUp,
  ChevronRight,
  X
} from 'lucide-react';

const INSIGHTS = [
  {
    id: 1,
    type: 'attention',
    title: 'Lovable API Usage Spike',
    description: 'Engineering compute costs increased by 15% in the last 7 days due to Lovable.dev API rate tier escalation.',
    action: 'Review Usage Logs',
    time: '2 hours ago',
    icon: TrendingUp,
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-100 dark:bg-amber-500/10',
    border: 'border-amber-200 dark:border-amber-500/20'
  },
  {
    id: 2,
    type: 'optimization',
    title: 'Unused License Optimization',
    description: '5 ChatGPT Enterprise seats have been inactive for over 30 days. Reassigning them could save $300/mo.',
    action: 'Manage Seats',
    time: 'Yesterday',
    icon: Lightbulb,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-500/10',
    border: 'border-blue-200 dark:border-blue-500/20'
  },
  {
    id: 3,
    type: 'observation',
    title: 'Cursor IDE Tier Limit',
    description: 'Provisioned seats are at 95% of the current enterprise agreement limit.',
    action: 'View Agreement',
    time: '3 days ago',
    icon: Zap,
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-100 dark:bg-emerald-500/10',
    border: 'border-emerald-200 dark:border-emerald-500/20'
  }
];

const NAVIGATION_ITEMS = [
  { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
  { id: 'optimization', label: 'License Optimization', icon: PieChart },
  { id: 'health', label: 'Health Monitor', icon: Activity },
  { id: 'enablement', label: 'Enablement Panel', icon: ShieldCheck },
  { id: 'predictive', label: 'Predictive Modeling', icon: LineChart },
  { id: 'admin', label: 'Admin Portal', icon: Settings },
];

const WORKSPACES = [
  { id: 'acme-prod', org: 'Acme Corp', env: 'Production' },
  { id: 'acme-sand', org: 'Acme Corp', env: 'Sandbox' },
  { id: 'globex-prod', org: 'Globex', env: 'Prod' },
  { id: 'globex-dev', org: 'Globex', env: 'Dev' },
  { id: 'globex-test', org: 'Globex', env: 'Test' },
];

export default function AppShell() {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [showInsightsFeed, setShowInsightsFeed] = useState(false);
  
  const [activeWorkspace, setActiveWorkspace] = useState(WORKSPACES[0]);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className={`flex h-screen w-full overflow-hidden ${isDark ? 'dark' : ''}`}>
      <div className="flex h-full w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-200">
        
        {/* Navigation Sidebar */}
        <AnimatePresence initial={false}>
          {isNavOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 256, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="h-full bg-zinc-200/50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden shrink-0"
            >
              {/* Workspace Switcher in Sidebar Top */}
              <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 relative z-20">
                <button 
                  onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
                  className="w-full flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors text-left outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <div className="flex flex-col flex-1 pl-1 pr-2">
                    <span className="font-semibold text-sm leading-none text-zinc-900 dark:text-zinc-100 tracking-tight">
                      {activeWorkspace.org}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-none mt-1.5 focus:outline-none">
                      {activeWorkspace.env}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isWorkspaceOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isWorkspaceOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsWorkspaceOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: -4, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.98 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-[calc(100%-8px)] left-3 right-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl z-50 overflow-hidden"
                      >
                        <div className="py-2">
                          <div className="px-3 py-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                            Workspaces
                          </div>
                          {WORKSPACES.map(ws => (
                            <button
                              key={ws.id}
                              onClick={() => {
                                setActiveWorkspace(ws);
                                setIsWorkspaceOpen(false);
                              }}
                              className={`w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors ${
                                activeWorkspace.id === ws.id 
                                  ? 'bg-blue-50 dark:bg-blue-500/10' 
                                  : 'hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                              }`}
                            >
                              <div className="flex flex-col">
                                <span className={`text-sm font-medium ${activeWorkspace.id === ws.id ? 'text-blue-700 dark:text-blue-400' : 'text-zinc-700 dark:text-zinc-200'}`}>
                                  {ws.org}
                                </span>
                                <span className={`${activeWorkspace.id === ws.id ? 'text-blue-600/80 dark:text-blue-400/80' : 'text-zinc-500 dark:text-zinc-400'} text-xs mt-0.5`}>
                                  {ws.env}
                                </span>
                              </div>
                              {activeWorkspace.id === ws.id && (
                                <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              )}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Menu Items */}
              <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {NAVIGATION_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeItem === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveItem(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors whitespace-nowrap ${
                        isActive 
                          ? 'bg-blue-600 text-white dark:bg-blue-600 dark:text-white' 
                          : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-100'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Bottom Info Placeholder */}
              <div className="p-4 px-6 border-t border-zinc-200 dark:border-zinc-800/50 shrink-0 whitespace-nowrap">
                <span className="text-xs text-zinc-500 font-mono tracking-tight">v1.2.0 • Online</span>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Application Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-zinc-950 transition-colors duration-200">
          
          {/* Global Header */}
          <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shrink-0 z-10 transition-colors duration-200">
            {/* Left Box: Controls & Identity */}
            <div className="flex items-center gap-4 sm:gap-6">
              <button 
                onClick={() => setIsNavOpen(!isNavOpen)} 
                className="p-1.5 -ml-1.5 rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label="Toggle Navigation"
              >
                {isNavOpen ? (
                  <ChevronLeft className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
              
              {/* App Logo & Name */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900 shadow-sm shrink-0">
                  <Aperture className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col hidden sm:flex">
                  <span className="font-bold text-base leading-none text-zinc-900 dark:text-zinc-100 tracking-tight">
                    Aperture
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-none mt-1">
                    AI Tools Observability
                  </span>
                </div>
              </div>
            </div>

            {/* Right Box: App Controls */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Global Search */}
              <button className="hidden md:flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800/80 transition-colors px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-500 dark:text-zinc-400 outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                <Search className="w-4 h-4 shrink-0" />
                <span className="pr-12 text-left">Find user, seat, or tag...</span>
                <kbd className="font-mono text-[10px] bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-300 dark:border-zinc-700 shadow-sm text-zinc-600 dark:text-zinc-300 pointer-events-none">
                  ⌘K
                </kbd>
              </button>

              {/* Theme Toggle */}
              <button 
                onClick={() => setIsDark(!isDark)}
                className="p-2 ml-2 rounded-full text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Insights */}
              <button 
                onClick={() => setShowInsightsFeed(true)}
                className="relative p-2 rounded-full text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <Sparkles className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-blue-600 dark:bg-blue-500 rounded-full border border-white dark:border-zinc-950 flex items-center justify-center text-[8px] font-bold text-white shadow-sm">
                  3
                </span>
              </button>

              {/* Profile */}
              <button className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-300 dark:border-zinc-700 ml-1 outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                <User className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
              </button>
            </div>
          </header>

          {/* Scrolling Content Anchor */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto w-full p-6 lg:p-8 flex flex-col">
            
            {activeItem === 'dashboard' && <Dashboard />}
            {activeItem === 'optimization' && <LicenseOptimization />}
            {activeItem === 'health' && <SystemHealth />}
            
            {activeItem !== 'dashboard' && activeItem !== 'optimization' && activeItem !== 'health' && (
              <div className="flex-1 w-full border-2 border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/50">
                <div className="text-center select-none max-w-sm px-6">
                  <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-200 mb-3">
                    Page Content
                  </h1>
                  <div className="text-left mt-4 mb-2 text-sm text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-950 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm mx-auto w-full max-w-2xl">
                    <p className="mb-4 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                      {NAVIGATION_ITEMS.find(i => i.id === activeItem)?.label} Components:
                    </p>
                    
                    {activeItem === 'enablement' && (
                      <ul className="list-disc pl-5 space-y-2.5 marker:text-zinc-400">
                        <li><strong className="text-zinc-800 dark:text-zinc-200 font-medium">k-Anonymity Guardrail:</strong> Automatic privacy masking for departments under 5 users</li>
                        <li><strong className="text-zinc-800 dark:text-zinc-200 font-medium">Adoption Velocity Metrics:</strong> WAU/MAU ratios and average prompt activity</li>
                        <li><strong className="text-zinc-800 dark:text-zinc-200 font-medium">Feature Utilization Matrix:</strong> Low/High complexity vs Agentic tool usage tracking</li>
                        <li><strong className="text-zinc-800 dark:text-zinc-200 font-medium">Training Opportunity Heatmap:</strong> Cross-referencing seat counts with feature utilization depth</li>
                      </ul>
                    )}

                    {activeItem === 'predictive' && (
                      <ul className="list-disc pl-5 space-y-2.5 marker:text-zinc-400">
                        <li><strong className="text-zinc-800 dark:text-zinc-200 font-medium">Forecasting Input Sidebar:</strong> Attrition sliders, hiring steppers, and seasonality shifts</li>
                        <li><strong className="text-zinc-800 dark:text-zinc-200 font-medium">Prediction Visualization Canvas:</strong> 3/6/12 month probabilistic AI consumption graph</li>
                        <li><strong className="text-zinc-800 dark:text-zinc-200 font-medium">Confidence Intervals:</strong> Variance representation driven by cloud/token consumption spikes</li>
                        <li><strong className="text-zinc-800 dark:text-zinc-200 font-medium">What-If Scenarios:</strong> Toggles for expansion vs conservative maintenance planning</li>
                      </ul>
                    )}

                    {activeItem === 'admin' && (
                      <ul className="list-disc pl-5 space-y-2.5 marker:text-zinc-400">
                        <li><strong className="text-zinc-800 dark:text-zinc-200 font-medium">Connector & Gateway Configurations:</strong> API keys, CSV drag-and-drop, and metadata tags</li>
                        <li><strong className="text-zinc-800 dark:text-zinc-200 font-medium">Ingestion Heartbeat Table:</strong> Sync times, region tracking, and telemetry payload status</li>
                        <li><strong className="text-zinc-800 dark:text-zinc-200 font-medium">Security Indicators:</strong> Encryption/Data Residency Badges and SSO Active Synchronization</li>
                        <li><strong className="text-zinc-800 dark:text-zinc-200 font-medium">Role Based Access Policies:</strong> Dynamic RBAC mappings for organization-wide tools</li>
                      </ul>
                    )}
                  </div>
                  <div className="mt-6 flex justify-center">
                    <div className="px-3 py-1 font-mono text-xs rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      Route: /{activeItem}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
          </main>
        </div>

        {/* Global Insights Feed Pane (Sidebar) */}
        {showInsightsFeed && (
          <>
            <div 
              className="fixed inset-0 bg-black/20 dark:bg-black/40 z-[60] transition-opacity"
              onClick={() => setShowInsightsFeed(false)}
            />
            <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl z-[70] p-6 overflow-y-auto font-sans flex flex-col">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  Insights Feed
                </h2>
                <button 
                  onClick={() => setShowInsightsFeed(false)}
                  className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 rounded-lg transition-colors"
                  aria-label="Close panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4 flex-1">
                {INSIGHTS.map((insight) => {
                  const Icon = insight.icon;
                  return (
                    <div key={insight.id} className={`p-4 rounded-xl border ${insight.bg} ${insight.border} transition-colors`}>
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 p-1.5 rounded-md bg-white/50 dark:bg-black/20 ${insight.color} shrink-0`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{insight.title}</h3>
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-500">{insight.time}</span>
                          </div>
                          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-3">
                            {insight.description}
                          </p>
                          <button className="text-xs font-semibold text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 px-3 py-1.5 rounded-lg transition shadow-sm font-sans flex items-center gap-1.5">
                            {insight.action}
                            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
