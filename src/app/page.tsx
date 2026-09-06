'use client';
import React, { useState, useMemo } from 'react';
import { SEED_PROJECTS, SEED_BUILDERS, ProjectItem } from '@/data/mockData';
import { FilterProvider, useGlobalFilter } from '@/context/FilterContext';
import { 
  Building2, 
  HardHat, 
  LayoutDashboard, 
  Search, 
  RotateCw, 
  CheckCircle2, 
  Calendar,
  X,
  TrendingUp,
  Award,
  ExternalLink
} from 'lucide-react';

function RadarApp() {
  const { startDate, endDate, presetRange, setPresetRange, filterByDate } = useGlobalFilter();
  const [tab, setTab] = useState<'dashboard' | 'projects' | 'builders'>('dashboard');
  const [search, setSearch] = useState('');
  const [activeDrawer, setActiveDrawer] = useState<ProjectItem | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);

  const filteredProjects = useMemo(() => {
    return filterByDate(SEED_PROJECTS).filter(p => 
      p.project_name.toLowerCase().includes(search.toLowerCase()) || 
      p.gc_name.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase())
    );
  }, [filterByDate, search]);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setSynced(true);
      setTimeout(() => setSynced(false), 2500);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* Dark Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-5 flex flex-col justify-between flex-shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm">
              CC
            </div>
            <div>
              <div className="font-bold text-xs tracking-tight text-white uppercase">Clutch Cabinets</div>
              <div className="text-[10px] text-amber-400 font-semibold tracking-wider">OREGON RADAR</div>
            </div>
          </div>
          <nav className="space-y-1 text-xs font-semibold">
            <button 
              onClick={() => setTab('dashboard')} 
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded transition ${tab === 'dashboard' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              <LayoutDashboard className="w-4 h-4"/> Dashboard
            </button>
            <button 
              onClick={() => setTab('projects')} 
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded transition ${tab === 'projects' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              <Building2 className="w-4 h-4"/> Oregon Projects
            </button>
            <button 
              onClick={() => setTab('builders')} 
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded transition ${tab === 'builders' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              <HardHat className="w-4 h-4"/> Builder Directory
            </button>
          </nav>
        </div>
        <div className="text-[11px] text-slate-500 border-t border-slate-800 pt-3">
          Session: <strong className="text-slate-300">Chris Anderson (Admin)</strong>
        </div>
      </aside>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header Bar with Date Range Filter */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2 text-xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400 ml-1" />
            <span className="text-slate-400 font-medium">Filter Range:</span>
            {(['30', '90', '180', '365', '730'] as const).map((days) => (
              <button
                key={days}
                onClick={() => setPresetRange(days)}
                className={`px-2 py-1 rounded text-xs font-semibold transition ${
                  presetRange === days ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {days === '730' ? '2Y' : days === '365' ? '1Y' : `${days}D`}
              </button>
            ))}
          </div>

          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded text-xs font-semibold"
          >
            {synced ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <RotateCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin text-amber-400' : ''}`} />}
            {synced ? 'Synced' : syncing ? 'Syncing...' : 'Sync Now'}
          </button>
        </header>

        {/* Dynamic Route Body */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-950">
          {tab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Filtered Projects</div>
                  <div className="text-2xl font-black text-amber-400 mt-1">{filteredProjects.length}</div>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Doors in Scope</div>
                  <div className="text-2xl font-black text-white mt-1">{filteredProjects.reduce((a, b) => a + b.units_or_keys, 0)}</div>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Leads ≥ 4 Score</div>
                  <div className="text-2xl font-black text-emerald-400 mt-1">{filteredProjects.filter(p => p.lead_score >= 4).length}</div>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Directory Builders</div>
                  <div className="text-2xl font-black text-blue-400 mt-1">{SEED_BUILDERS.length}</div>
                </div>
              </div>

              {/* Volume Ranking */}
              <div className="bg-slate-900 p-5 rounded-lg border border-slate-800">
                <h2 className="text-sm font-bold text-white uppercase flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-amber-500" /> Top Oregon Multifamily Builders (Selected Window)
                </h2>
                <div className="divide-y divide-slate-800 text-xs">
                  {SEED_BUILDERS.map((b, i) => (
                    <div key={b.id} className="py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-slate-500 font-bold">{i + 1}.</span>
                        <div>
                          <strong className="text-slate-200">{b.name}</strong>
                          <span className="text-slate-500 text-[11px] ml-2">HQ: {b.hq_city}, OR</span>
                        </div>
                      </div>
                      <span className="bg-slate-800 text-amber-400 font-mono px-2 py-0.5 rounded text-[11px] font-bold">
                        {b.typical_product}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'projects' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="relative w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5"/>
                  <input 
                    value={search} 
                    onChange={e => setSearch(e.target.value)} 
                    placeholder="Search projects, GC, or city..." 
                    className="w-full pl-9 pr-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <span className="text-xs text-slate-500">{filteredProjects.length} projects loaded</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/60 text-slate-400 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="p-3">Project / Location</th>
                      <th className="p-3">Asset</th>
                      <th className="p-3">Units</th>
                      <th className="p-3">Valuation</th>
                      <th className="p-3">General Contractor</th>
                      <th className="p-3">Stage</th>
                      <th className="p-3">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {filteredProjects.map(p => (
                      <tr 
                        key={p.project_id} 
                        onClick={() => setActiveDrawer(p)}
                        className="hover:bg-slate-800/50 cursor-pointer transition"
                      >
                        <td className="p-3">
                          <strong className="text-white block">{p.project_name}</strong>
                          <span className="text-[11px] text-slate-500">{p.address}, {p.city}</span>
                        </td>
                        <td className="p-3 capitalize">{p.asset_class}</td>
                        <td className="p-3 font-semibold">{p.units_or_keys}</td>
                        <td className="p-3 font-mono text-emerald-400">${(p.valuation_usd / 1000000).toFixed(1)}M</td>
                        <td className="p-3 font-bold text-amber-400">{p.gc_name}</td>
                        <td className="p-3 uppercase text-[10px]"><span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300">{p.stage.replace('_', ' ')}</span></td>
                        <td className="p-3 font-black text-amber-400">{p.lead_score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'builders' && (
            <div className="space-y-4">
              <h2 className="text-base font-bold uppercase text-white">Oregon Apartment Builders Directory</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SEED_BUILDERS.map(b => (
                  <div key={b.id} className="bg-slate-900 border border-slate-800 rounded-lg p-5">
                    <h3 className="font-bold text-white text-sm">{b.name}</h3>
                    <div className="text-xs text-slate-400 mt-0.5">HQ: {b.hq_city}, OR • CCB #{b.ccb_number}</div>
                    <div className="mt-3 text-xs bg-slate-800 p-2 rounded text-slate-300">
                      Product: <strong>{b.typical_product}</strong>
                    </div>
                    <div className="mt-2 text-[11px] text-slate-500">
                      Active: {b.counties_active.join(', ')} Counties
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Slide-Over Drawer */}
      {activeDrawer && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded uppercase">
                    Score {activeDrawer.lead_score} / 5
                  </span>
                  <h3 className="text-base font-bold text-white mt-2">{activeDrawer.project_name}</h3>
                  <p className="text-xs text-slate-400">{activeDrawer.address}, {activeDrawer.city}, OR</p>
                </div>
                <button onClick={() => setActiveDrawer(null)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5"/>
                </button>
              </div>

              <div className="divide-y divide-slate-800 text-xs space-y-2 pt-2">
                <div className="flex justify-between py-1.5"><span className="text-slate-400">Valuation</span><span className="font-mono text-emerald-400 font-bold">${(activeDrawer.valuation_usd / 1000000).toFixed(1)}M</span></div>
                <div className="flex justify-between py-1.5"><span className="text-slate-400">Door Scope</span><span className="font-bold text-white">{activeDrawer.units_or_keys} Units</span></div>
                <div className="flex justify-between py-1.5"><span className="text-slate-400">General Contractor</span><span className="font-bold text-amber-400">{activeDrawer.gc_name}</span></div>
                <div className="flex justify-between py-1.5"><span className="text-slate-400">CCB License</span><span className="font-mono text-slate-300">{activeDrawer.gc_ccb}</span></div>
                <div className="flex justify-between py-1.5"><span className="text-slate-400">Permit #</span><span className="font-mono text-slate-300">{activeDrawer.permit_or_case_number}</span></div>
                <div className="flex justify-between py-1.5"><span className="text-slate-400">Cabinet Window</span><span className="capitalize text-slate-200">{activeDrawer.cabinet_opportunity}</span></div>
              </div>
            </div>

            <button 
              onClick={() => { alert(`Added ${activeDrawer.gc_name} to CRM Prospects.`); setActiveDrawer(null); }}
              className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded"
            >
              + Add to CRM Prospects
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <FilterProvider>
      <RadarApp />
    </FilterProvider>
  );
}
