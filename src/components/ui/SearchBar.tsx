import { useState, type FormEvent, type KeyboardEvent } from "react";
import { motion } from "framer-motion";

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationClick: () => void;
  locationLoading: boolean;
  loading: boolean;
}

export default function SearchBar({ onSearch, onLocationClick, locationLoading, loading }: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => { e.preventDefault(); if (value.trim()) onSearch(value.trim()); };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { e.preventDefault(); if (value.trim()) onSearch(value.trim()); }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
          </div>
          <input
            type="text" value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown}
            placeholder="Search any city..." disabled={loading}
            className="w-full pl-11 pr-4 py-3.5 bg-white/[0.06] border border-white/10 rounded-2xl text-white placeholder:text-white/30 font-sans text-sm focus:outline-none focus:border-amber-400/50 focus:bg-white/[0.08] transition-all duration-200 disabled:opacity-50"
          />
        </div>
        <motion.button type="button" onClick={onLocationClick} disabled={locationLoading || loading}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center rounded-2xl bg-white/[0.06] border border-white/10 text-white/60 hover:text-amber-400 hover:border-amber-400/40 hover:bg-amber-400/10 transition-all duration-200 disabled:opacity-50 px-3.5"
          aria-label="Use my location"
        >
          {locationLoading ? (
            <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
            </svg>
          )}
        </motion.button>
        <motion.button type="submit" disabled={!value.trim() || loading}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-black font-sans font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
        >
          Search
        </motion.button>
      </div>
    </form>
  );
}
