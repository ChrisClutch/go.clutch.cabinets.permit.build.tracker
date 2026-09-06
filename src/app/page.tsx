'use client';

import React, { useState, useMemo } from 'react';
import {
  SEED_PROJECTS,
  SEED_BUILDERS,
  ProjectItem,
} from '@/data/mockData';
import { FilterProvider, useGlobalFilter } from '@/context/FilterContext';
import {
  Building2,
  HardHat,
  LayoutDashboard,
  Search,
  RotateCw,
  Calendar,
  X,
  TrendingUp,
  Bookmark,
  BookmarkCheck,
  MapPin,
  FileSpreadsheet,
  CheckCircle2
} from 'lucide-react';

function RadarApp() {
  const { presetRange, setPresetRange, filterByDate, savedProjectIds, toggleSaveProject } = useGlobalFilter();
  const [tab, setTab] = useState<'dashboard' | 'projects' | 'saved' | 'builders'>('dashboard');
  const [search, setSearch] = useState('');
  const [activeDrawer, setActiveDrawer] = useState<ProjectItem | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);

  // Filter projects by date window and keyword
  const filteredProjects = useMemo(() => {
    return filterByDate(SEED_PROJECTS).filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.builder.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase()) ||
      p.county.toLowerCase().includes(search.toLowerCase())
    );
  }, [filterByDate, search]);

  // Saved / My Pipeline list
  const mySavedProjects = useMemo(() => {
    return SEED_PROJECTS.filter((p) => savedProjectIds.includes(p.id));
  }, [savedProjectIds]);

  // Rollup Metrics
  const totalDoors = useMemo(() => filteredProjects.reduce((acc, p) => acc + p.doors, 0), [filteredProjects]);
  const highPriorityLeads = useMemo(() => filteredProjects.filter((p) => p.leadScore >= 4).length, [filteredProjects]);
  const savedDoors = useMemo(() => mySavedProjects.reduce((acc, p) => acc + p.doors, 0), [mySavedProjects]);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setSynced(true);
      setTimeout(() => setSynced(false), 3000);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-amber-500 flex items-center justify-center font-bold text-slate-950 text-lg shadow-md shadow-amber-500/20">
            CC
          </div>
          <div>
            <h1 className="font-bold text-base tracking-wide text-white leading-tight">CLUTCH CABINETS</h1>
            <p className="text-xs font-semibold tracking-widest text-slate-400">OREGON RADAR</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center bg-slate-900 rounded-lg p-1 border border-slate-800">
          <button
            onClick={() => setTab('dashboard')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition ${
              tab === 'dashboard' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutDashboard size={14} /> Dashboard
          </button>
          <button
            onClick={() => setTab('projects')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition ${
              tab === 'projects' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 size={14} /> Oregon Projects ({filteredProjects.length})
          </button>
          <button
            onClick={() => setTab('saved')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition ${
              tab === 'saved' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bookmark size={14} /> My Pipeline ({mySavedProjects.length})
          </button>
          <button
            onClick={() => setTab('builders')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition ${
              tab === 'builders' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <HardHat size={14} /> Builder Directory
          </button>
        </div>

        {/* Date Filters & Sync */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 gap-1 text-xs">
            <Calendar size={13} className="text-slate-400 mr-1" />
            <span className="text-slate-400 mr-1 hidden sm:inline">Filter:</span>
            {(['30D', '90D', '180D', '1Y', '2Y'] as const).map((rng) => (
              <button
                key={rng}
                onClick={() => setPresetRange(rng)}
                className={`px-2 py-1 rounded text-xs transition ${
                  presetRange === rng ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {rng}
              </button>
            ))}
          </div>

          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 transition"
          >
            <RotateCw size={13} className={syncing ? 'animate-spin text-amber-500' : ''} />
            {synced ? 'Synced' : syncing ? 'Ingesting...' : 'Sync Now'}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="p-6 max-w-7xl mx-auto w-full flex-1">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Filtered Projects</p>
            <p className="text-3xl font-extrabold text-white mt-1">{filteredProjects.length}</p>
            <p className="text-[11px] text-slate-500 mt-1">Within selected {presetRange} window</p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Doors In Scope</p>
            <p className="text-3xl font-extrabold text-amber-500 mt-1">{totalDoors.toLocaleString()}</p>
            <p className="text-[11px] text-slate-500 mt-1">Total estimated cabinet packages</p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">High Priority Leads</p>
            <p className="text-3xl font-extrabold text-emerald-400 mt-1">{highPriorityLeads}</p>
            <p className="text-[11px] text-slate-500 mt-1">Lead score 4 or 5</p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">My Pipeline Doors</p>
            <p className="text-3xl font-extrabold text-cyan-400 mt-1">{savedDoors.toLocaleString()}</p>
            <p className="text-[11px] text-slate-500 mt-1">{mySavedProjects.length} projects saved in memory</p>
          </div>
        </div>

        {/* Tab 1: Dashboard Overview */}
        {tab === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                  <TrendingUp size={16} className="text-amber-500" /> Top Oregon Multifamily Builders ({presetRange})
                </h2>
              </div>
              <div className="divide-y divide-slate-800">
                {SEED_BUILDERS.map((builder, i) => (
                  <div key={builder.id} className="py-3 flex items-center justify-between hover:bg-slate-800/30 px-3 rounded-lg transition">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-slate-500 w-4">{i + 1}.</span>
                      <div>
                        <p className="text-sm font-semibold text-white">{builder.name}</p>
                        <p className="text-xs text-slate-400">HQ: {builder.hq} • {builder.specialty}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {builder.totalDoors} Target Doors
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2 & 3: Oregon Projects or My Saved Pipeline */}
        {(tab === 'projects' || tab === 'saved') && (
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3.5 top-3 text-slate-500" size={16} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects by builder, city, county, or project name..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Projects Table */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5 w-10">Save</th>
                    <th className="p-3.5">Project / Location</th>
                    <th className="p-3.5">General Contractor</th>
                    <th className="p-3.5">Doors</th>
                    <th className="p-3.5">Filing Date</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {(tab === 'projects' ? filteredProjects : mySavedProjects).map((proj) => {
                    const isSaved = savedProjectIds.includes(proj.id);
                    return (
                      <tr key={proj.id} className="hover:bg-slate-800/40 transition">
                        <td className="p-3.5 text-center">
                          <button
                            onClick={() => toggleSaveProject(proj.id)}
                            className={`p-1 rounded transition ${
                              isSaved ? 'text-amber-400 hover:text-amber-300' : 'text-slate-600 hover:text-slate-400'
                            }`}
                            title={isSaved ? 'Remove from My Pipeline' : 'Save to My Pipeline'}
                          >
                            {isSaved ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}
                          </button>
                        </td>
                        <td className="p-3.5">
                          <p className="font-semibold text-white text-sm">{proj.name}</p>
                          <p className="text-slate-500 flex items-center gap-1 mt-0.5">
                            <MapPin size={11} /> {proj.city}, {proj.county} Co.
                          </p>
                        </td>
                        <td className="p-3.5 font-medium text-slate-200">{proj.builder}</td>
                        <td className="p-3.5">
                          <span className="font-bold text-amber-400">{proj.doors}</span>
                        </td>
                        <td className="p-3.5 text-slate-400">{proj.filingDate}</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                            {proj.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => setActiveDrawer(proj)}
                            className="text-amber-500 hover:text-amber-400 font-semibold"
                          >
                            Inspect →
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {(tab === 'projects' ? filteredProjects : mySavedProjects).length === 0 && (
                <div className="p-8 text-center text-slate-500 text-sm">
                  {tab === 'saved'
                    ? 'No saved projects yet. Click the bookmark icon next to any permit lead in Oregon Projects to pin it to your pipeline.'
                    : 'No projects found for the selected filters.'}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Builder Directory */}
        {tab === 'builders' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SEED_BUILDERS.map((b) => (
              <div key={b.id} className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-white text-base">{b.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{b.hq} • {b.specialty}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {b.leadTier}
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-1.5 text-xs">
                  <p className="text-slate-400">
                    <span className="text-slate-500 font-medium">Estimated Pipeline:</span>{' '}
                    <span className="text-amber-400 font-bold">{b.totalDoors} Doors</span> across {b.activeProjects} permits
                  </p>
                  <p className="text-slate-400">
                    <span className="text-slate-500 font-medium">Preferred Spec:</span> {b.preferredCaseworkSpec}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Slide-out Inspection Drawer */}
      {activeDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Permit Lead Detail</span>
                <button
                  onClick={() => setActiveDrawer(null)}
                  className="text-slate-400 hover:text-white p-1 rounded-md"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <h2 className="text-lg font-bold text-white leading-snug">{activeDrawer.name}</h2>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <MapPin size={12} /> {activeDrawer.city}, {activeDrawer.county} County, OR
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-xs">
                  <div>
                    <p className="text-slate-500">Doors in Scope</p>
                    <p className="text-amber-400 font-bold text-base mt-0.5">{activeDrawer.doors}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Valuation</p>
                    <p className="text-white font-bold text-base mt-0.5">{activeDrawer.valuation}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Permit #</p>
                    <p className="text-slate-300 font-mono mt-0.5">{activeDrawer.permitNumber}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Filing Date</p>
                    <p className="text-slate-300 mt-0.5">{activeDrawer.filingDate}</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <p className="text-slate-500 font-medium">General Contractor</p>
                    <p className="text-white font-semibold">{activeDrawer.builder}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium">Casework & Cabinetry Scope</p>
                    <p className="text-slate-300 bg-slate-950 p-2.5 rounded border border-slate-800/80 mt-1">
                      {activeDrawer.caseworkScope}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500 font-medium">Point of Contact</p>
                    <p className="text-white">{activeDrawer.contactName} • {activeDrawer.contactPhone}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex gap-2">
              <button
                onClick={() => toggleSaveProject(activeDrawer.id)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
                  savedProjectIds.includes(activeDrawer.id)
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                }`}
              >
                {savedProjectIds.includes(activeDrawer.id) ? (
                  <>
                    <BookmarkCheck size={14} /> Saved in My Pipeline
                  </>
                ) : (
                  <>
                    <Bookmark size={14} /> Save to My Pipeline
                  </>
                )}
              </button>
            </div>
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
