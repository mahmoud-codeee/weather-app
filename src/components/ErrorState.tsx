import { motion } from "framer-motion";

interface Props { message: string; onRetry?: () => void; }

export default function ErrorState({ message, onRetry }: Props) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-4 py-12 text-center"
    >
      <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <div>
        <h3 className="font-display text-lg font-bold text-white/80 mb-1">Oops, something went wrong</h3>
        <p className="text-white/40 text-sm font-sans max-w-xs">{message}</p>
      </div>
      {onRetry && (
        <motion.button onClick={onRetry} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          className="px-5 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white/70 text-sm font-sans hover:bg-white/10 transition-colors"
        >Try again</motion.button>
      )}
    </motion.div>
  );
}
