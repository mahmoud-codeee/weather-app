import { motion } from "framer-motion";
import type { Unit } from "../../types/weather";

interface UnitToggleProps { unit: Unit; onChange: (unit: Unit) => void; }

export default function UnitToggle({ unit, onChange }: UnitToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-white/[0.06] border border-white/10 rounded-xl p-1">
      {(["metric", "imperial"] as const).map((u) => {
        const isActive = unit === u;
        return (
          <motion.button key={u} onClick={() => onChange(u)} whileTap={{ scale: 0.95 }}
            className={`relative px-3 py-1.5 rounded-lg text-sm font-mono font-medium transition-colors duration-200 ${isActive ? "text-black" : "text-white/50 hover:text-white/80"}`}
          >
            {isActive && (
              <motion.span layoutId="unit-pill" className="absolute inset-0 bg-amber-400 rounded-lg"
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
            <span className="relative z-10">{u === "metric" ? "°C" : "°F"}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
