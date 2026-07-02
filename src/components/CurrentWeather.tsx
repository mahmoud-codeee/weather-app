import { motion } from "framer-motion";
import type { CurrentWeather as CWType, Unit } from "../types/weather";
import { formatTemp, formatDate, formatTime, capitalize } from "../utils/formatters";
import { getConditionAccent, getIconUrl } from "../utils/weatherHelpers";

interface Props { data: CWType; unit: Unit; }

export default function CurrentWeather({ data, unit }: Props) {
  const accent = getConditionAccent(data.conditionCode, data.icon);
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="text-center"
    >
      <div className="flex items-center justify-center gap-2 mb-1">
        <svg className="text-white/40" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
        <h1 className="font-display text-xl font-bold text-white tracking-tight">
          {data.city}<span className="text-white/40 font-sans font-normal text-base ml-2">{data.country}</span>
        </h1>
      </div>
      <p className="text-white/40 text-sm font-sans mb-6">
        {formatDate(data.dt)} · {formatTime(data.dt, data.timezone)} local
      </p>
      <div className="flex items-center justify-center gap-2 mb-2">
        <motion.img key={data.icon} src={getIconUrl(data.icon, "4x")} alt={data.description} width={100} height={100}
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }} className="drop-shadow-2xl"
        />
        <motion.span key={data.temp} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="font-display text-8xl font-extrabold text-white leading-none tracking-tighter"
        >
          {data.temp}<span className={`text-5xl ${accent}`}>°{unit === "metric" ? "C" : "F"}</span>
        </motion.span>
      </div>
      <p className="font-sans text-lg text-white/70 capitalize mb-1">{capitalize(data.description)}</p>
      <p className="font-mono text-sm text-white/40">H:{formatTemp(data.tempMax, unit)} · L:{formatTemp(data.tempMin, unit)}</p>
    </motion.div>
  );
}
