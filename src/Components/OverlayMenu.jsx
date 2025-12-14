import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function OverlayMenu({ isOpen, onClose }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const origin = isMobile ? "95% 8%" : "50% 8%";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ clipPath: `circle(0% at ${origin})` }}
          animate={{ clipPath: `circle(150% at ${origin})` }}
          exit={{ clipPath: `circle(0% at ${origin})` }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background: "rgba(0, 0, 0, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white text-3xl cursor-pointer hover:scale-110 transition-transform duration-300"
            aria-label="Close menu"
          >
            <FiX />
          </button>

          {/* Subtle light gradient floating behind */}
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-[100px] opacity-40"></div>

          {/* Menu items */}
          <ul className="space-y-8 text-center">
            {["Home", "About", "Skills", "Experince", "Contact"].map(
              (item, index) => (
                <motion.li
                  key={item}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={onClose}
                    className="text-4xl font-semibold text-white relative group transition-all duration-300"
                  >
                    {item}
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white/60 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </motion.li>
              )
            )}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
