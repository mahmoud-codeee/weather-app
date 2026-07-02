import { useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWeather } from "./hooks/useWeather";
import { useGeolocation } from "./hooks/useGeolocation";
import { getConditionGradient } from "./utils/weatherHelpers";
import SearchBar from "./components/ui/SearchBar";
import UnitToggle from "./components/ui/UnitToggle";
import CurrentWeather from "./components/CurrentWeather";
import WeatherDetails from "./components/WeatherDetails";
import ForecastCard from "./components/ForecastCard";
import HourlyForecast from "./components/HourlyForecast";
import LoadingState from "./components/LoadingState";
import EmptyState from "./components/EmptyState";
import ErrorState from "./components/ErrorState";

export default function App() {
  const { current, forecast, loading, error, searchByCity, searchByCoords, setUnit, unit } = useWeather();

  const handleGeoSuccess = useCallback(
    (lat: number, lon: number) => { void searchByCoords(lat, lon); },
    [searchByCoords]
  );

  const { loading: geoLoading, getLocation } = useGeolocation(handleGeoSuccess);

  const bgGradient = current
    ? getConditionGradient(current.conditionCode, current.icon)
    : "from-slate-950 via-slate-900 to-slate-950";

  const todayForecast = forecast[0] ?? null;

  return (
    <div className={`min-h-dvh bg-gradient-to-br ${bgGradient} transition-all duration-1000 ease-in-out`}>
      {/* Noise overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 18a5 5 0 0 0-10 0" />
                <line x1="12" y1="2" x2="12" y2="9" />
                <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
                <line x1="1" y1="18" x2="3" y2="18" />
                <line x1="21" y1="18" x2="23" y2="18" />
                <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
              </svg>
            </div>
            <span className="font-display text-lg font-700 text-white tracking-tight">Skies</span>
          </div>
          <UnitToggle unit={unit} onChange={setUnit} />
        </motion.header>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <SearchBar
            onSearch={searchByCity}
            onLocationClick={getLocation}
            locationLoading={geoLoading}
            loading={loading}
          />
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingState key="loading" />
          ) : error ? (
            <ErrorState key="error" message={error} />
          ) : current ? (
            <motion.div
              key={`${current.city}-${current.country}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-8"
            >
              <CurrentWeather data={current} unit={unit} />
              {todayForecast && (
                <HourlyForecast today={todayForecast} timezone={current.timezone} unit={unit} />
              )}
              <div>
                <h2 className="text-xs font-sans uppercase tracking-widest text-white/40 mb-3">Conditions</h2>
                <WeatherDetails data={current} unit={unit} />
              </div>
              {forecast.length > 1 && <ForecastCard forecasts={forecast} unit={unit} />}
            </motion.div>
          ) : (
            <EmptyState key="empty" />
          )}
        </AnimatePresence>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-white/20 text-xs font-sans">
            Powered by{" "}
            <a href="https://openweathermap.org" target="_blank" rel="noopener noreferrer" className="hover:text-white/40 transition-colors underline underline-offset-2">
              OpenWeatherMap
            </a>
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
