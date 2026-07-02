import { motion } from "framer-motion";
import type { CurrentWeather, Unit } from "../types/weather";
import { formatTime, formatWindSpeed, formatVisibility, formatWindDeg } from "../utils/formatters";
import { getHumidityLabel } from "../utils/weatherHelpers";

interface Props { data: CurrentWeather; unit: Unit; }

function Tile({ icon, label, value, sub, index }: { icon: React.ReactNode; label: string; value: string; sub?: string; index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4 flex flex-col gap-3"
    >
      <div className="flex items-center gap-2 text-white/40">{icon}<span className="text-xs font-sans uppercase tracking-wider">{label}</span></div>
      <div><p className="text-white font-display text-xl font-bold leading-none">{value}</p>{sub && <p className="text-white/40 text-xs font-sans mt-1">{sub}</p>}</div>
    </motion.div>
  );
}

export default function WeatherDetails({ data, unit }: Props) {
  const lt = (unix: number) => formatTime(unix, data.timezone);
  const tiles = [
    { label: "Humidity", value: `${data.humidity}%`, sub: getHumidityLabel(data.humidity), icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg> },
    { label: "Wind", value: formatWindSpeed(data.windSpeed, unit), sub: `Direction: ${formatWindDeg(data.windDeg)}`, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" /><path d="M9.6 4.6A2 2 0 1 1 11 8H2" /><path d="M12.6 19.4A2 2 0 1 0 14 16H2" /></svg> },
    { label: "Pressure", value: `${data.pressure} hPa`, sub: data.pressure > 1013 ? "Above average" : data.pressure < 1013 ? "Below average" : "Normal", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg> },
    { label: "Visibility", value: formatVisibility(data.visibility), sub: data.visibility >= 10000 ? "Clear" : data.visibility >= 5000 ? "Moderate" : "Low", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg> },
    { label: "Sunrise", value: lt(data.sunrise), sub: "Local time", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 18a5 5 0 0 0-10 0" /><line x1="12" y1="2" x2="12" y2="9" /><line x1="4.22" y1="10.22" x2="5.64" y2="11.64" /><line x1="1" y1="18" x2="3" y2="18" /><line x1="21" y1="18" x2="23" y2="18" /><line x1="18.36" y1="11.64" x2="19.78" y2="10.22" /><path d="M4 18h16" /></svg> },
    { label: "Sunset", value: lt(data.sunset), sub: "Local time", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 18a5 5 0 0 0-10 0" /><line x1="12" y1="9" x2="12" y2="2" /><line x1="4.22" y1="10.22" x2="5.64" y2="11.64" /><line x1="1" y1="18" x2="3" y2="18" /><line x1="21" y1="18" x2="23" y2="18" /><line x1="18.36" y1="11.64" x2="19.78" y2="10.22" /><path d="M4 18h16" /></svg> },
    { label: "Feels Like", value: `${data.feelsLike}°${unit === "metric" ? "C" : "F"}`, sub: Math.abs(data.feelsLike - data.temp) <= 1 ? "Similar to actual" : data.feelsLike > data.temp ? "Warmer w/ humidity" : "Cooler w/ wind", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" /></svg> },
    { label: "Coordinates", value: `${data.lat.toFixed(2)}°N`, sub: `${data.lon.toFixed(2)}°E`, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg> },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {tiles.map((tile, i) => <Tile key={tile.label} {...tile} index={i} />)}
    </div>
  );
}
