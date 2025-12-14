import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const stars = [
  { top: "12%", left: "18%" },
  { top: "25%", left: "72%" },
  { top: "38%", left: "44%" },
  { top: "55%", left: "83%" },
  { top: "67%", left: "21%" },
  { top: "74%", left: "58%" },
  { top: "81%", left: "36%" },
  { top: "90%", left: "69%" },
  { top: "14%", left: "90%" },
  { top: "48%", left: "10%" },
  { top: "62%", left: "78%" },
  { top: "33%", left: "61%" },
  { top: "88%", left: "47%" },
  { top: "6%", left: "34%" },
  { top: "41%", left: "92%" },
  { top: "71%", left: "15%" },
];

const About = () => {
  const [cursor, setCursor] = useState(true);

  // blinking cursor (very low CPU)
  useEffect(() => {
    const i = setInterval(() => setCursor(c => !c), 500);
    return () => clearInterval(i);
  }, []);

  return (
    <section
      id="about"
      className="relative w-full min-h-screen bg-[#0a0e27] text-white
                 flex items-center justify-center px-6 py-20 overflow-hidden"
    >
      {/* Static nebula glow (no animation = CPU safe) */}
      <div
        className="absolute top-1/3 left-1/4 w-[420px] h-[420px]
                   bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600
                   blur-[150px] opacity-20 rounded-full"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[360px] h-[360px]
                   bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500
                   blur-[130px] opacity-20 rounded-full"
      />

      <div className="relative z-10 max-w-5xl w-full
                      grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT — ABOUT TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2
            className="text-4xl md:text-5xl font-bold
                       text-transparent bg-clip-text
                       bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
          >
            About Me
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed">
            Hi, I’m{" "}
            <span className="text-cyan-400 font-semibold">Shivayogi</span>.
            I learn web development by building real things — testing ideas,
            breaking stuff, fixing bugs, and understanding how everything
            connects.
          </p>

          <p className="text-gray-400 text-lg leading-relaxed">
            I care about clean layouts, readable code, and interfaces that
            feel natural. I don’t chase flashy designs — I chase clarity.
          </p>

          <p className="text-gray-500 text-base">
            Still learning. Still curious. Always improving.
          </p>
        </motion.div>

        {/* RIGHT — DEVELOPER NOTES CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative bg-[#0f1729] border border-gray-800/60
                     rounded-2xl p-6 font-mono text-sm shadow-xl"
        >
          <div className="text-cyan-400 font-bold mb-3">
            developer.notes
          </div>

          <ul className="space-y-2 text-gray-300 list-disc list-inside">
            <li>Learning by building, not memorizing</li>
            <li>Prefer simple UI over noisy designs</li>
            <li>Bugs are part of the process</li>
            <li>Consistency beats motivation</li>
          </ul>

          <div className="mt-4 text-gray-400">
            <span className="text-cyan-400">currently_learning:</span>{" "}
            React
          </div>

          <div className="mt-4 text-green-400">
            <span>&gt; improving step by step {cursor ? "|" : " "}</span>
          </div>

          {/* subtle grid overlay */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none
                       bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),
                           linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]
                       bg-[size:24px_24px]"
          />
        </motion.div>
      </div>

      {/* PREDEFINED STARS — NO CPU COST */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 bg-white/60 rounded-full"
            style={{ top: s.top, left: s.left }}
          />
        ))}
      </div>
    </section>
  );
};

export default About;
