import type { WeatherCondition } from "../types/weather";

export function getConditionType(code: number): WeatherCondition {
  if (code >= 200 && code < 300) return "thunderstorm";
  if (code >= 300 && code < 400) return "drizzle";
  if (code >= 500 && code < 600) return "rain";
  if (code >= 600 && code < 700) return "snow";
  if (code >= 700 && code < 800) return "atmosphere";
  if (code === 800) return "clear";
  return "clouds";
}

export function getConditionGradient(code: number, icon: string): string {
  const isNight = icon.endsWith("n");
  const condition = getConditionType(code);
  if (isNight) return "from-slate-950 via-indigo-950 to-slate-900";
  switch (condition) {
    case "clear": return "from-amber-950 via-orange-900 to-slate-900";
    case "clouds": return "from-slate-800 via-slate-700 to-slate-900";
    case "rain":
    case "drizzle": return "from-blue-950 via-slate-800 to-slate-900";
    case "thunderstorm": return "from-slate-950 via-purple-950 to-slate-900";
    case "snow": return "from-slate-700 via-blue-900 to-slate-900";
    case "atmosphere": return "from-slate-700 via-slate-600 to-slate-900";
    default: return "from-slate-900 via-slate-800 to-slate-900";
  }
}

export function getConditionAccent(code: number, icon: string): string {
  const isNight = icon.endsWith("n");
  if (isNight) return "text-indigo-300";
  const condition = getConditionType(code);
  switch (condition) {
    case "clear": return "text-amber-400";
    case "clouds": return "text-slate-300";
    case "rain":
    case "drizzle": return "text-blue-300";
    case "thunderstorm": return "text-purple-300";
    case "snow": return "text-sky-200";
    case "atmosphere": return "text-slate-400";
    default: return "text-amber-400";
  }
}

export function getIconUrl(icon: string, size: "1x" | "2x" | "4x" = "2x"): string {
  return `https://openweathermap.org/img/wn/${icon}@${size}.png`;
}

export function getHumidityLabel(humidity: number): string {
  if (humidity < 30) return "Low";
  if (humidity < 60) return "Comfortable";
  if (humidity < 80) return "High";
  return "Very High";
}

export function isDaytime(dt: number, sunrise: number, sunset: number): boolean {
  return dt >= sunrise && dt <= sunset;
}
