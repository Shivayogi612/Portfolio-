import React, { useEffect, useRef } from "react";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaPython,
  FaJava
} from "react-icons/fa";
import { SiMongodb, SiTailwindcss, SiExpress } from "react-icons/si";
import { motion } from "framer-motion";

const skills = [
  { name: "React", icon: FaReact, color: "text-cyan-400" },
  // { name: "Node.js", icon: FaNodeJs, color: "text-green-400" },
  // { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
  { name: "JavaScript", icon: FaHtml5, color: "text-yellow-400" },
  { name: "Python", icon: FaPython, color: "text-blue-400" },
  { name: "HTML5", icon: FaHtml5, color: "text-orange-500" },
  { name: "CSS3", icon: FaCss3Alt, color: "text-blue-500" },
  { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-300" },
        // { name: "Express", icon: SiExpress, color: "text-gray-300" },
  { name: "Java", icon: FaJava, color: "text-red-500" },
  { name: "Git", icon: FaGitAlt, color: "text-red-500" },
];

export default function Skills() {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const timeRef = useRef(0);

  // Canvas stars (lighter than Home)
  useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let animationId;
  let lastTime = 0;
  let running = true;

  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

  const resize = () => {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    starsRef.current = Array.from({ length: 28 }, () => {
      const baseOpacity = Math.random() * 0.4 + 0.2;
      return {
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        size: Math.random() * 1.2 + 0.4,
        opacity: baseOpacity,
        delta: (Math.random() * 0.01 + 0.004) * (Math.random() > 0.5 ? 1 : -1),
        min: baseOpacity - 0.15,
        max: baseOpacity + 0.15,
      };
    });
  };

  resize();
  window.addEventListener("resize", resize);

  const animate = (time) => {
    if (!running) return;

    // 🔒 30 FPS throttle
    if (time - lastTime < 33) {
      animationId = requestAnimationFrame(animate);
      return;
    }
    lastTime = time;

    ctx.fillStyle = "rgba(10,14,39,0.35)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    starsRef.current.forEach((s) => {
      s.opacity += s.delta;
      if (s.opacity > s.max || s.opacity < s.min) s.delta *= -1;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
      ctx.fill();
    });

    animationId = requestAnimationFrame(animate);
  };

  // 🛑 Pause when tab hidden
  const onVisibilityChange = () => {
    running = !document.hidden;
    if (running) animationId = requestAnimationFrame(animate);
  };

  document.addEventListener("visibilitychange", onVisibilityChange);
  animationId = requestAnimationFrame(animate);

  return () => {
    running = false;
    cancelAnimationFrame(animationId);
    window.removeEventListener("resize", resize);
    document.removeEventListener("visibilitychange", onVisibilityChange);
  };
}, []);


  return (
    <section className="relative w-full py-24 bg-[#0a0e27] overflow-hidden">
      {/* Canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Nebula glow */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full blur-[140px] opacity-20 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600"
        animate={{ scale: [1, 1.15, 1], x: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            My <span className="text-cyan-400">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mt-4 rounded-full" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Technologies I use to build modern, scalable and visually engaging applications
          </p>
        </div>

        {/* Skills Card */}
        <div className="rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-[#0e1629] to-[#050a18] backdrop-blur-xl shadow-[0_0_50px_rgba(34,211,238,0.12)] p-10">
          <h3 className="text-center text-2xl font-semibold text-cyan-300 mb-10">
            Technologies & Tools
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10">
            {skills.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <div
                  key={i}
                  className="group flex flex-col items-center gap-4"
                >
                  <div className="w-20 h-20 rounded-full flex items-center justify-center border border-cyan-400/40 bg-[#0b1225]
                    shadow-[0_0_20px_rgba(34,211,238,0.25)]
                    transition-all duration-300
                    group-hover:scale-110
                    group-hover:shadow-[0_0_40px_rgba(34,211,238,0.5)]"
                  >
                    <Icon className={`text-4xl ${skill.color}`} />
                  </div>
                  <span className="text-sm text-gray-300 group-hover:text-white">
                    {skill.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0e27] to-transparent pointer-events-none" />
    </section>
  );
}
