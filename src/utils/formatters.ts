import type { Unit } from "../types/weather";

export function formatTemp(temp: number, unit: Unit): string {
  return `${temp}°${unit === "metric" ? "C" : "F"}`;
}

export function formatTime(unixTimestamp: number, timezoneOffsetSeconds: number): string {
  const date = new Date((unixTimestamp + timezoneOffsetSeconds) * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes} ${ampm}`;
}

export function formatDay(unixTimestamp: number, short = false): string {
  const date = new Date(unixTimestamp * 1000);
  return date.toLocaleDateString("en-US", { weekday: short ? "short" : "long", timeZone: "UTC" });
}

export function formatDate(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000);
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export function formatWindDeg(deg: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(deg / 45) % 8;
  return dirs[index] ?? "N";
}

export function formatWindSpeed(speed: number, unit: Unit): string {
  if (unit === "imperial") return `${speed.toFixed(1)} mph`;
  return `${(speed * 3.6).toFixed(1)} km/h`;
}

export function formatVisibility(meters: number): string {
  if (meters >= 1000) return `${(meters / 1000).toFixed(1)} km`;
  return `${meters} m`;
}

export function formatPop(pop: number): string {
  return `${Math.round(pop * 100)}%`;
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
