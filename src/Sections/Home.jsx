import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaXTwitter, FaLinkedin, FaGithub } from "react-icons/fa6";

const socials = [
  { Icon: FaXTwitter, label: "X", href: "https://x.com/HugarShiva50433" },
  { Icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/shivayogi-hugar-155a45348/" },
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/shivayogi" },
];

export default function Home() {
  const roles = useMemo(() => ["Frontend Designer", "Web Developer", "Software Developer"], []);
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Generate static stars once
  const stars = useRef(
    Array.from({ length: 90 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`
    }))
  );

  // Typewriter effect
  useEffect(() => {
    const current = roles[index];
    const timeout = setTimeout(() => {
      if (!deleting && subIndex < current.length) setSubIndex(v => v + 1);
      else if (!deleting && subIndex === current.length) setTimeout(() => setDeleting(true), 1200);
      else if (deleting && subIndex > 0) setSubIndex(v => v - 1);
      else {
        setDeleting(false);
        setIndex(p => (p + 1) % roles.length);
      }
    }, deleting ? 40 : 60);

    return () => clearTimeout(timeout);
  }, [index, subIndex, deleting, roles]);

  return (
    <section id="home" className="w-full min-h-screen relative bg-[#0a0e27] overflow-hidden">

      {/* ===== STATIC STARS ===== */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {stars.current.map((star, i) => (
          <span
            key={i}
            className="absolute w-[2px] h-[2px] bg-white/60 rounded-full"
            style={{ top: star.top, left: star.left }}
          />
        ))}
      </div>

      {/* Nebula and content remain the same */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500"
        animate={{ scale: [1, 1.3, 1], x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-25 bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]"
        animate={{ scale: [1, 1.2, 1], x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* LEFT COLUMN */}
      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 py-20 lg:py-0 min-h-screen">
        <div className="flex flex-col justify-center h-full mt-9 text-center lg:text-left space-y-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-bold text-white mb-4">HI I'm</h1>
            <motion.h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-6xl mb-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 relative inline-block">
              SHIVAYOGI
            </motion.h1>
          </motion.div>

          <p className="text-cyan-400 font-mono text-xl h-8">
            {roles[index].slice(0, subIndex)}
            <span className="animate-pulse">|</span>
          </p>

          <motion.div className="space-y-4 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
            <p className="relative pl-4 border-l-2 border-cyan-500/50">
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff007f] via-[#ff8c00] to-[#ffd700]">
                A Developer who judges a book by its cover…
              </span>
              <br />
              Because if the UI doesn't impress you, will you even check the logic? 😏
            </p>

            <p className="relative pl-4 border-l-2 border-purple-500/50">
              Still learning, still experimenting. I'm a Software Engineer in progress, crafting code that (hopefully) looks as good as it works.
            </p>
          </motion.div>

          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <a href="#projects" className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-semibold">View my Work</a>
            <a href="/resume.pdf" download className="px-8 py-4 rounded-full border-2 border-cyan-400/50 text-white">My Resume</a>
          </motion.div>

          <div className="flex gap-4 justify-center lg:justify-start pt-4">
            {socials.map(({ Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border-2 border-cyan-400/30 text-cyan-400 flex items-center justify-center">
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="hidden lg:flex items-center justify-center h-full relative">
          <div className="w-[32rem] h-[32rem] rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-2 border-cyan-500/30 flex items-center justify-center">
            <img src="/dev.png" alt="Dev Avatar" className="w-full h-full object-cover rounded-full" />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0e27] to-transparent pointer-events-none" />
    </section>
  );
}
