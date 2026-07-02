import { motion } from "framer-motion";
import type { DailyForecast, Unit } from "../types/weather";
import { formatTime, formatTemp, formatPop } from "../utils/formatters";
import { getIconUrl } from "../utils/weatherHelpers";

interface Props { today: DailyForecast; timezone: number; unit: Unit; }

export default function HourlyForecast({ today, timezone, unit }: Props) {
  const hours = today.items.slice(0, 8);
  return (
    <div>
      <motion.h2 initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
        className="text-xs font-sans uppercase tracking-widest text-white/40 mb-3"
      >Hourly</motion.h2>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {hours.map((item, i) => (
          <motion.div key={item.dt} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="flex flex-col items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-2xl px-4 py-3 shrink-0 min-w-[72px]"
          >
            <span className="text-white/40 text-xs font-sans">{formatTime(item.dt, timezone)}</span>
            <img src={getIconUrl(item.icon)} alt={item.description} width={36} height={36} />
            <span className="text-white font-mono text-sm font-medium">{formatTemp(item.temp, unit)}</span>
            {item.pop > 0.1 && <span className="text-blue-300 text-xs font-mono">{formatPop(item.pop)}</span>}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
