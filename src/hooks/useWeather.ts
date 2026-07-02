import { useState, useCallback } from "react";
import type { CurrentWeather, DailyForecast, Unit } from "../types/weather";
import {
  getCurrentWeather,
  getCurrentWeatherByCoords,
  getForecast,
  getForecastByCoords,
} from "../services/weatherApi";

interface WeatherState {
  current: CurrentWeather | null;
  forecast: DailyForecast[];
  loading: boolean;
  error: string | null;
  lastCity: string;
}

interface UseWeatherReturn extends WeatherState {
  searchByCity: (city: string) => Promise<void>;
  searchByCoords: (lat: number, lon: number) => Promise<void>;
  setUnit: (unit: Unit) => void;
  unit: Unit;
}

export function useWeather(): UseWeatherReturn {
  const [unit, setUnitState] = useState<Unit>("metric");
  const [state, setState] = useState<WeatherState>({
    current: null,
    forecast: [],
    loading: false,
    error: null,
    lastCity: "",
  });

  const fetchAll = useCallback(
    async (
      fetchCurrent: () => Promise<CurrentWeather>,
      fetchForecast: () => Promise<DailyForecast[]>,
      cityLabel: string
    ) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const [current, forecast] = await Promise.all([fetchCurrent(), fetchForecast()]);
        setState({ current, forecast, loading: false, error: null, lastCity: cityLabel });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to fetch weather data";
        setState((prev) => ({
          ...prev,
          loading: false,
          error: message.includes("city not found")
            ? "City not found. Please check the spelling and try again."
            : message.includes("401")
            ? "Invalid API key. Add your OpenWeatherMap key to .env file."
            : `Something went wrong: ${message}`,
        }));
      }
    },
    []
  );

  const searchByCity = useCallback(
    async (city: string) => {
      if (!city.trim()) return;
      await fetchAll(() => getCurrentWeather(city, unit), () => getForecast(city, unit), city.trim());
    },
    [unit, fetchAll]
  );

  const searchByCoords = useCallback(
    async (lat: number, lon: number) => {
      await fetchAll(
        () => getCurrentWeatherByCoords(lat, lon, unit),
        () => getForecastByCoords(lat, lon, unit),
        ""
      );
    },
    [unit, fetchAll]
  );

  const setUnit = useCallback(
    (newUnit: Unit) => {
      setUnitState(newUnit);
      if (state.current) {
        const city = state.lastCity || state.current.city;
        void fetchAll(
          () => getCurrentWeather(city, newUnit),
          () => getForecast(city, newUnit),
          city
        );
      }
    },
    [state.current, state.lastCity, fetchAll]
  );

  return { ...state, searchByCity, searchByCoords, setUnit, unit };
}
