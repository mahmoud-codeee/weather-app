import type { CurrentWeather, ForecastItem, DailyForecast, Unit } from "../types/weather";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string;

interface OWMWeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface OWMCurrentResponse {
  name: string;
  sys: { country: string; sunrise: number; sunset: number };
  coord: { lat: number; lon: number };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: { speed: number; deg: number };
  visibility: number;
  weather: OWMWeatherCondition[];
  timezone: number;
  dt: number;
}

interface OWMForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };
  wind: { speed: number; deg: number };
  weather: OWMWeatherCondition[];
  pop: number;
}

interface OWMForecastResponse {
  list: OWMForecastItem[];
}

function mapCurrentWeather(raw: OWMCurrentResponse): CurrentWeather {
  const w = raw.weather[0] ?? { id: 800, main: "Clear", description: "clear sky", icon: "01d" };
  return {
    city: raw.name,
    country: raw.sys.country,
    lat: raw.coord.lat,
    lon: raw.coord.lon,
    temp: Math.round(raw.main.temp),
    feelsLike: Math.round(raw.main.feels_like),
    tempMin: Math.round(raw.main.temp_min),
    tempMax: Math.round(raw.main.temp_max),
    humidity: raw.main.humidity,
    windSpeed: raw.wind.speed,
    windDeg: raw.wind.deg,
    pressure: raw.main.pressure,
    visibility: raw.visibility,
    sunrise: raw.sys.sunrise,
    sunset: raw.sys.sunset,
    description: w.description,
    icon: w.icon,
    conditionCode: w.id,
    conditionMain: w.main,
    timezone: raw.timezone,
    dt: raw.dt,
  };
}

function mapForecastItem(raw: OWMForecastItem): ForecastItem {
  const w = raw.weather[0] ?? { id: 800, main: "Clear", description: "clear sky", icon: "01d" };
  return {
    dt: raw.dt,
    temp: Math.round(raw.main.temp),
    tempMin: Math.round(raw.main.temp_min),
    tempMax: Math.round(raw.main.temp_max),
    feelsLike: Math.round(raw.main.feels_like),
    humidity: raw.main.humidity,
    windSpeed: raw.wind.speed,
    description: w.description,
    icon: w.icon,
    conditionCode: w.id,
    conditionMain: w.main,
    pop: raw.pop,
  };
}

function groupIntoDays(items: ForecastItem[]): DailyForecast[] {
  const map = new Map<string, ForecastItem[]>();

  for (const item of items) {
    const date = new Date(item.dt * 1000);
    const key = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`;
    const bucket = map.get(key) ?? [];
    bucket.push(item);
    map.set(key, bucket);
  }

  return Array.from(map.entries()).map(([, dayItems]) => {
    const temps = dayItems.map((i) => i.temp);
    const mostRepresentative = dayItems[Math.floor(dayItems.length / 2)] ?? dayItems[0];
    const maxPop = Math.max(...dayItems.map((i) => i.pop));

    return {
      date: dayItems[0]!.dt,
      tempMin: Math.min(...dayItems.map((i) => i.tempMin)),
      tempMax: Math.max(...temps),
      description: mostRepresentative!.description,
      icon: mostRepresentative!.icon,
      conditionCode: mostRepresentative!.conditionCode,
      pop: maxPop,
      items: dayItems,
    };
  });
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Unknown error" })) as { message?: string };
    throw new Error(err.message ?? `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function getCurrentWeather(city: string, unit: Unit): Promise<CurrentWeather> {
  const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`;
  const raw = await fetchJson<OWMCurrentResponse>(url);
  return mapCurrentWeather(raw);
}

export async function getCurrentWeatherByCoords(lat: number, lon: number, unit: Unit): Promise<CurrentWeather> {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`;
  const raw = await fetchJson<OWMCurrentResponse>(url);
  return mapCurrentWeather(raw);
}

export async function getForecast(city: string, unit: Unit): Promise<DailyForecast[]> {
  const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}&cnt=40`;
  const raw = await fetchJson<OWMForecastResponse>(url);
  return groupIntoDays(raw.list.map(mapForecastItem));
}

export async function getForecastByCoords(lat: number, lon: number, unit: Unit): Promise<DailyForecast[]> {
  const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}&cnt=40`;
  const raw = await fetchJson<OWMForecastResponse>(url);
  return groupIntoDays(raw.list.map(mapForecastItem));
}
