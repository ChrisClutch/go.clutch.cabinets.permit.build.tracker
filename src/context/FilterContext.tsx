'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { subDays, parseISO, isAfter } from 'date-fns';
import { ProjectItem } from '@/data/mockData';

type PresetRange = '30D' | '90D' | '180D' | '1Y' | '2Y';

interface FilterContextType {
  presetRange: PresetRange;
  setPresetRange: (range: PresetRange) => void;
  savedProjectIds: string[];
  toggleSaveProject: (id: string) => void;
  filterByDate: (projects: ProjectItem[]) => ProjectItem[];
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [presetRange, setPresetRange] = useState<PresetRange>('1Y');
  const [savedProjectIds, setSavedProjectIds] = useState<string[]>([]);

  // Load saved projects from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('clutch_saved_projects');
    if (stored) {
      try {
        setSavedProjectIds(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse saved projects', e);
      }
    }
  }, []);

  const toggleSaveProject = (id: string) => {
    setSavedProjectIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('clutch_saved_projects', JSON.stringify(next));
      return next;
    });
  };

  const filterByDate = (projects: ProjectItem[]) => {
    const daysMap: Record<PresetRange, number> = {
      '30D': 30,
      '90D': 90,
      '180D': 180,
      '1Y': 365,
      '2Y': 730,
    };

    const cutoff = subDays(new Date(), daysMap[presetRange]);
    return projects.filter((p) => {
      try {
        return isAfter(parseISO(p.filingDate), cutoff);
      } catch {
        return true;
      }
    });
  };

  return (
    <FilterContext.Provider
      value={{
        presetRange,
        setPresetRange,
        savedProjectIds,
        toggleSaveProject,
        filterByDate,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useGlobalFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useGlobalFilter must be used within FilterProvider');
  }
  return context;
}
