import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const [time, setTime] = useState(new Date());
  const [focus, setFocus] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    const onBlur = () => setFocus(false);
    const onFocus = () => setFocus(true);

    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  return (
    <footer className="relative bg-[#070a1f] overflow-hidden">
      {/* faint system glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-[#070a1f] to-[#070a1f]" />

      {/* signal noise */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        animate={{ opacity: [0.02, 0.05, 0.02] }}
        transition={{ duration: 6, repeat: Infinity }}
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)"
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 font-mono text-xs text-gray-400">
        {/* top separator */}
        <div className="mb-6 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

        {/* system panel */}
        <div className="grid md:grid-cols-3 gap-6 items-center">
          {/* left */}
          <div className="space-y-1">
            <div>
              <span className="text-purple-400">SYSTEM</span>: PORTFOLIO
            </div>
            <div>
              <span className="text-purple-400">MODE</span>: PRODUCTION
            </div>
          </div>

          {/* center */}
          <div className="text-center space-y-1">
            <div>
              <span className="text-cyan-400">TIME</span>:{" "}
              {time.toLocaleTimeString()}
            </div>
            <div>
              <span className="text-cyan-400">FOCUS</span>:{" "}
              {focus ? "ACTIVE" : "IDLE"}
            </div>
          </div>

          {/* right */}
          <div className="text-right space-y-1">
            <div>
              <span className="text-green-400">STATUS</span>: STABLE
            </div>
            <div>
              <span className="text-green-400">BUILDER</span>: SHIVAYOGI
            </div>
          </div>
        </div>

        {/* cursor line */}
        <div className="mt-8 flex items-center gap-2 text-gray-500">
          <span>&gt;</span>
          <span>await next_interaction()</span>
          <motion.span
            className="w-2 h-4 bg-cyan-400"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
