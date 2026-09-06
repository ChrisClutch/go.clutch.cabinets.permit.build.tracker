'use client';
import React, { createContext, useContext, useState } from 'react';
import { subDays, parseISO, isWithinInterval } from 'date-fns';

interface FilterContextType {
  startDate: Date;
  endDate: Date;
  presetRange: string;
  setPresetRange: (preset: '30' | '90' | '180' | '365' | '730') => void;
  filterByDate: <T extends { first_seen?: string }>(items: T[]) => T[];
}

const FilterContext = createContext<FilterContextType | null>(null);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [presetRange, setPreset] = useState<'30' | '90' | '180' | '365' | '730'>('90');
  const [endDate, setEndDate] = useState<Date>(new Date('2026-09-06T12:00:00Z'));
  const [startDate, setStartDate] = useState<Date>(subDays(new Date('2026-09-06T12:00:00Z'), 90));

  const setPresetRange = (preset: '30' | '90' | '180' | '365' | '730') => {
    setPreset(preset);
    const end = new Date('2026-09-06T12:00:00Z');
    setStartDate(subDays(end, parseInt(preset)));
    setEndDate(end);
  };

  const filterByDate = <T extends { first_seen?: string }>(items: T[]) => {
    return items.filter((item) => {
      if (!item.first_seen) return true;
      const targetDate = parseISO(item.first_seen);
      return isWithinInterval(targetDate, { start: startDate, end: endDate });
    });
  };

  return (
    <FilterContext.Provider value={{ startDate, endDate, presetRange, setPresetRange, filterByDate }}>
      {children}
    </FilterContext.Provider>
  );
}

export const useGlobalFilter = () => {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error('useGlobalFilter must be inside FilterProvider');
  return ctx;
};
