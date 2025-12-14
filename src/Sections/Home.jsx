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
  
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const shootingStarsRef = useRef([]);
  const timeRef = useRef(0);

  // Typewriter effect
  useEffect(() => {
    const current = roles[index];
    const timeout = setTimeout(() => {
      if (!deleting && subIndex < current.length) setSubIndex((v) => v + 1);
      else if (!deleting && subIndex === current.length) setTimeout(() => setDeleting(true), 1200);
      else if (deleting && subIndex > 0) setSubIndex((v) => v - 1);
      else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((p) => (p + 1) % roles.length);
      }
    }, deleting ? 40 : 60);

    return () => clearTimeout(timeout);
  }, [index, subIndex, deleting, roles]);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Reduced stars from 200 to 80 for cleaner background
      starsRef.current = Array.from({ length: 80 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        baseOpacity: Math.random() * 0.6 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2
      }));
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const createShootingStar = () => {
      if (Math.random() > 0.99) {
        shootingStarsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.5,
          vx: Math.random() * 5 + 4,
          vy: Math.random() * 2.5 + 1.5,
          life: 1,
          color: Math.random() > 0.5 ? [28, 216, 210] : [139, 92, 246]
        });
      }
    };

    const animate = () => {
      timeRef.current += 0.02;
      
      ctx.fillStyle = 'rgba(10, 14, 39, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars with twinkling
      starsRef.current.forEach(star => {
        const twinkle = Math.sin(timeRef.current * star.twinkleSpeed + star.pulsePhase) * 0.4;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.baseOpacity + twinkle})`;
        ctx.fill();
      });

      // Shooting stars
      createShootingStar();
      shootingStarsRef.current = shootingStarsRef.current.filter(star => {
        star.x += star.vx;
        star.y += star.vy;
        star.life -= 0.012;

        if (star.life > 0) {
          const [r, g, b] = star.color;
          const gradient = ctx.createLinearGradient(
            star.x, star.y,
            star.x - star.vx * 10, star.y - star.vy * 10
          );
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${star.life * 0.9})`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(star.x - star.vx * 10, star.y - star.vy * 10);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2.5;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(star.x, star.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${star.life * 0.7})`;
          ctx.shadowBlur = 20;
          ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.9)`;
          ctx.fill();
          ctx.shadowBlur = 0;

          return true;
        }
        return false;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="home" className="w-full min-h-screen relative bg-[#0a0e27] overflow-hidden">
      {/* Animated canvas background */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Nebula effects */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500"
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-25 bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, -40, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          initial={{ 
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`
          }}
          animate={{
            y: ['-5%', '105%'],
            opacity: [0, 0.8, 0.8, 0],
            scale: [0, 1, 1, 0]
          }}
          transition={{
            duration: Math.random() * 8 + 12,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "linear"
          }}
        />
      ))}

      {/* Left and Right Columns */}
      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 py-20 lg:py-0 min-h-screen">
        {/* Left Column */}
        <div className="flex flex-col justify-center h-full mt-9 text-center lg:text-left space-y-6">
          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-bold text-white mb-4">
              HI I'm
            </h1>
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-6xl mb-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 relative inline-block"
              style={{ fontFamily: "Cinzel Decorative", letterSpacing: "0.05em" }}
              animate={{ 
                backgroundPosition: ['0%', '100%', '0%']
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              SHIVAYOGI
              <motion.span
                className="absolute -top-4 -right-8 text-cyan-400 text-2xl"
                animate={{ rotate: [0, 360], scale: [1, 1.3, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >✦</motion.span>
              <motion.span
                className="absolute -bottom-4 -left-8 text-purple-400 text-xl"
                animate={{ rotate: [360, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              >✧</motion.span>
            </motion.h1>
          </motion.div>

          {/* Description */}
          <motion.div
            className="space-y-4 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <p className="relative pl-4 border-l-2 border-cyan-500/50">
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff007f] via-[#ff8c00] to-[#ffd700]">
                A Developer who judges a book by its cover…
              </span>
              <br />
              Because if the UI doesn't impress you, will you even check the logic? 😏
            </p>

            <p className="relative pl-4 border-l-2 border-purple-500/50">
              Still learning, still experimenting. I'm a Software Engineer in progress, crafting code that (hopefully)
              looks as good as it works.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.a
              href="#projects"
              className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-semibold overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative z-10">View my Work</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
              />
            </motion.a>

            <motion.a
              href="/resume.pdf"
              download="Shivayogi_Resume.pdf"
              className="group relative px-8 py-4 rounded-full border-2 border-cyan-400/50 text-white font-semibold backdrop-blur-sm overflow-hidden"
              whileHover={{ scale: 1.05, borderColor: "rgba(34, 211, 238, 1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">My Resume</span>
            </motion.a>
          </motion.div>

          {/* Social Icons */}
          <motion.div 
            className="flex gap-4 justify-center lg:justify-start pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {socials.map(({ Icon, label, href }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group relative w-12 h-12 rounded-full border-2 border-cyan-400/30 text-cyan-400 flex items-center justify-center backdrop-blur-sm overflow-hidden"
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  delay: 1.0 + i * 0.1, 
                  duration: 0.5, 
                  type: "spring", 
                  stiffness: 200 
                }}
                whileHover={{ 
                  scale: 1.15,
                  borderColor: "rgba(34, 211, 238, 1)",
                  boxShadow: "0 0 20px rgba(34, 211, 238, 0.5)"
                }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/20 group-hover:to-purple-500/20 transition-all duration-300"
                />
                <Icon className="w-5 h-5 relative z-10" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Right Column - Avatar */}
        <div className="hidden lg:flex items-center justify-center h-full relative">
          {/* Orbital rings and avatar */}
          <motion.div className="absolute inset-0 rounded-full border border-cyan-500/20" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} style={{ width: '550px', height: '550px' }} />
          <motion.div className="absolute inset-0 rounded-full border border-purple-500/20" animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} style={{ width: '650px', height: '650px' }} />
          <motion.div className="absolute inset-0 rounded-full border border-blue-500/10" animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} style={{ width: '750px', height: '750px' }} />

          {/* Avatar glow */}
          <motion.div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-[100px]" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} style={{ width: '500px', height: '500px' }} />

          <motion.div className="relative z-10" initial={{ opacity: 0, scale: 0.8, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.6, duration: 1, type: "spring", stiffness: 100 }}>
            <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="w-80 h-80 md:w-[32rem] md:h-[32rem] rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-2 border-cyan-500/30 flex items-center justify-center overflow-hidden relative">
              <motion.div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent opacity-50" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
              <span className="text-9xl z-10"><img src="dev.png.png" alt="Dev Avatar" /></span>
            </motion.div>
          </motion.div>

          {/* Floating elements */}
          <motion.div className="absolute top-1/4 right-1/4 text-cyan-400 text-4xl" animate={{ y: [0, -15, 0], rotate: [0, 180, 360] }} transition={{ duration: 6, repeat: Infinity }}>◆</motion.div>
          <motion.div className="absolute bottom-1 -1/4 left-1/4 text-purple-400 text-3xl"
            animate={{ 
              y: [0, 15, 0],
              rotate: [360, 180, 0]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            ✦
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0e27] to-transparent pointer-events-none" />
    </section>
  );
}

