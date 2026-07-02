import { motion } from "framer-motion";

export default function EmptyState() {
  const suggestions = ["Muscat", "London", "Tokyo", "New York", "Dubai"];
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }} className="flex flex-col items-center gap-6 py-16 text-center"
    >
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="text-white/10"
      >
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
          <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </motion.div>
      <div>
        <h2 className="font-display text-2xl font-bold text-white/80 mb-2">Where in the world?</h2>
        <p className="text-white/30 text-sm font-sans max-w-xs">Search any city to get real-time weather and a 4-day forecast.</p>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {suggestions.map((city, i) => (
          <motion.span key={city} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
            className="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/40 text-xs font-sans"
          >{city}</motion.span>
        ))}
      </div>
    </motion.div>
  );
}
