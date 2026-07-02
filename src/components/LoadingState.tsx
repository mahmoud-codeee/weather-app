import { motion } from "framer-motion";

export default function LoadingState() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex flex-col items-center gap-6 py-16"
    >
      <div className="relative w-20 h-20">
        {[0, 1, 2].map((i) => (
          <motion.div key={i} className="absolute inset-0 rounded-full border-2 border-amber-400/30"
            animate={{ scale: [1, 1.5 + i * 0.3], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, delay: i * 0.4, repeat: Infinity, ease: "easeOut" }}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500"
            animate={{ scale: [1, 0.85, 1] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-3 w-full max-w-xs">
        {[140, 100, 80].map((w, i) => (
          <motion.div key={i} className="h-3 rounded-full bg-white/10" style={{ width: w }}
            animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
      </div>
      <p className="text-white/30 text-sm font-sans">Fetching weather data...</p>
    </motion.div>
  );
}
