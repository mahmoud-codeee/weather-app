import { motion } from "framer-motion";
import type { DailyForecast, Unit } from "../types/weather";
import { formatDay, formatTemp, formatPop, capitalize } from "../utils/formatters";
import { getIconUrl } from "../utils/weatherHelpers";

interface Props { forecasts: DailyForecast[]; unit: Unit; }

export default function ForecastCard({ forecasts, unit }: Props) {
  const days = forecasts.slice(1, 5);
  return (
    <div>
      <motion.h2 initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
        className="text-xs font-sans uppercase tracking-widest text-white/40 mb-3"
      >
        4-Day Forecast
      </motion.h2>
      <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl overflow-hidden">
        {days.map((day, i) => (
          <motion.div key={day.date} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className={`flex items-center gap-4 px-5 py-4 ${i < days.length - 1 ? "border-b border-white/[0.06]" : ""}`}
          >
            <span className="font-sans text-sm text-white/60 w-16 shrink-0">{formatDay(day.date, true)}</span>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <img src={getIconUrl(day.icon)} alt={day.description} width={36} height={36} className="shrink-0" />
              <span className="text-white/50 text-xs font-sans truncate capitalize hidden sm:block">{capitalize(day.description)}</span>
            </div>
            {day.pop > 0.1 && <span className="text-blue-300 text-xs font-mono shrink-0">💧 {formatPop(day.pop)}</span>}
            <div className="flex items-center gap-2 shrink-0">
              <span className="font-mono text-sm text-white/40">{formatTemp(day.tempMin, unit)}</span>
              <div className="w-16 h-1 rounded-full bg-white/10 hidden sm:block">
                <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-amber-400" style={{ width: "60%" }} />
              </div>
              <span className="font-mono text-sm text-white font-medium">{formatTemp(day.tempMax, unit)}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
