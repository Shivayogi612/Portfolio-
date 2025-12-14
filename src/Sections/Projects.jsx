// import React, { useEffect, useRef, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const projectsData = [
//   {
//     id: 1,
//     title: "E-Commerce Platform",
//     description: "A full-stack e-commerce solution with real-time inventory management and secure payment integration.",
//     image: "🛒",
//     tech: ["React", "Node.js", "MongoDB"],
//     github: "https://github.com/yourusername/project1",
//     live: "https://project1.com",
//     gradient: "from-cyan-500/20 via-blue-500/20 to-purple-500/20"
//   },
//   {
//     id: 2,
//     title: "AI Chat Application",
//     description: "Real-time chat app with AI-powered responses and sentiment analysis using modern NLP techniques.",
//     image: "💬",
//     tech: ["React", "Socket.io", "Python"],
//     github: "https://github.com/yourusername/project2",
//     live: "https://project2.com",
//     gradient: "from-purple-500/20 via-pink-500/20 to-rose-500/20"
//   },
//   {
//     id: 3,
//     title: "Task Management Dashboard",
//     description: "Collaborative project management tool with drag-and-drop functionality and team analytics.",
//     image: "📊",
//     tech: ["React", "Tailwind", "Supabase"],
//     github: "https://github.com/yourusername/project3",
//     live: "https://project3.com",
//     gradient: "from-green-500/20 via-teal-500/20 to-cyan-500/20"
//   },
//   {
//     id: 4,
//     title: "Portfolio Website",
//     description: "Modern portfolio with 3D animations, dark mode, and smooth scrolling interactions.",
//     image: "🎨",
//     tech: ["React", "Three.js", "Framer Motion"],
//     github: "https://github.com/yourusername/project4",
//     live: "https://project4.com",
//     gradient: "from-orange-500/20 via-red-500/20 to-pink-500/20"
//   },
//   {
//     id: 5,
//     title: "Weather Forecast App",
//     description: "Real-time weather application with interactive maps and 7-day forecasts.",
//     image: "🌤️",
//     tech: ["React", "API", "Chart.js"],
//     github: "https://github.com/yourusername/project5",
//     live: "https://project5.com",
//     gradient: "from-blue-500/20 via-indigo-500/20 to-violet-500/20"
//   }
// ];

// const Projects = () => {
//   const canvasRef = useRef(null);
//   const starsRef = useRef([]);
//   const timeRef = useRef(0);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [direction, setDirection] = useState(0);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     let animationFrameId;

//     const resizeCanvas = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = document.documentElement.scrollHeight;

//       starsRef.current = Array.from({ length: 100 }, () => ({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         size: Math.random() * 1.5 + 0.5,
//         baseOpacity: Math.random() * 0.4 + 0.2,
//         twinkleSpeed: Math.random() * 0.015 + 0.008
//       }));
//     };

//     resizeCanvas();
//     window.addEventListener('resize', resizeCanvas);

//     const animate = () => {
//       timeRef.current += 0.015;
//       ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       starsRef.current.forEach(star => {
//         const twinkle = Math.sin(timeRef.current * star.twinkleSpeed) * 0.2;
//         ctx.beginPath();
//         ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(255, 255, 255, ${star.baseOpacity + twinkle})`;
//         ctx.fill();
//       });

//       animationFrameId = requestAnimationFrame(animate);
//     };

//     animate();

//     return () => {
//       window.removeEventListener('resize', resizeCanvas);
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, []);

//   const slideVariants = {
//     enter: (direction) => ({
//       x: direction > 0 ? 1000 : -1000,
//       opacity: 0,
//       scale: 0.8
//     }),
//     center: {
//       zIndex: 1,
//       x: 0,
//       opacity: 1,
//       scale: 1
//     },
//     exit: (direction) => ({
//       zIndex: 0,
//       x: direction < 0 ? 1000 : -1000,
//       opacity: 0,
//       scale: 0.8
//     })
//   };

//   const swipeConfidenceThreshold = 10000;
//   const swipePower = (offset, velocity) => {
//     return Math.abs(offset) * velocity;
//   };

//   const paginate = (newDirection) => {
//     setDirection(newDirection);
//     setCurrentIndex((prevIndex) => {
//       let nextIndex = prevIndex + newDirection;
//       if (nextIndex < 0) nextIndex = projectsData.length - 1;
//       if (nextIndex >= projectsData.length) nextIndex = 0;
//       return nextIndex;
//     });
//   };

//   const currentProject = projectsData[currentIndex];

//   return (
//     <section id="projects" className="relative w-full min-h-screen bg-[#0a0e27] text-white flex items-center justify-center py-20 px-4 overflow-hidden">
//       <canvas 
//         ref={canvasRef}
//         className="absolute inset-0 w-full h-full pointer-events-none"
//       />

//       <div className="relative z-10 w-full max-w-7xl mx-auto">
//         {/* Header */}
//         <motion.div 
//           className="text-center mb-16"
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">
//             Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Projects</span>
//           </h2>
//           <p className="text-gray-400 text-lg">
//             Swipe to explore my work
//           </p>
//         </motion.div>

//         {/* Slider Container */}
//         <div className="relative w-full max-w-5xl mx-auto">
//           <AnimatePresence initial={false} custom={direction} mode="wait">
//             <motion.div
//               key={currentIndex}
//               custom={direction}
//               variants={slideVariants}
//               initial="enter"
//               animate="center"
//               exit="exit"
//               transition={{
//                 x: { type: "spring", stiffness: 300, damping: 30 },
//                 opacity: { duration: 0.2 },
//                 scale: { duration: 0.2 }
//               }}
//               drag="x"
//               dragConstraints={{ left: 0, right: 0 }}
//               dragElastic={1}
//               onDragEnd={(e, { offset, velocity }) => {
//                 const swipe = swipePower(offset.x, velocity.x);

//                 if (swipe < -swipeConfidenceThreshold) {
//                   paginate(1);
//                 } else if (swipe > swipeConfidenceThreshold) {
//                   paginate(-1);
//                 }
//               }}
//               className="w-full cursor-grab active:cursor-grabbing"
//             >
//               <div className="relative bg-[#0f1729]/40 backdrop-blur-sm border border-gray-800/50 rounded-3xl overflow-hidden">
//                 <div className="grid md:grid-cols-2 gap-0">
//                   {/* Left - Image */}
//                   <div className={`relative h-96 md:h-[500px] bg-gradient-to-br ${currentProject.gradient} flex items-center justify-center p-12 overflow-hidden`}>
//                     <motion.div
//                       className="text-9xl md:text-[12rem] select-none"
//                       animate={{ 
//                         y: [0, -20, 0],
//                         rotate: [0, 5, 0]
//                       }}
//                       transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//                     >
//                       {currentProject.image}
//                     </motion.div>

//                     {/* Decorative elements */}
//                     <div className="absolute top-10 right-10 w-20 h-20 border border-white/10 rounded-full" />
//                     <div className="absolute bottom-10 left-10 w-32 h-32 border border-white/5 rounded-full" />
                    
//                     <motion.div
//                       className="absolute inset-0 bg-gradient-to-t from-[#0f1729] via-transparent to-transparent"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ duration: 0.5 }}
//                     />
//                   </div>

//                   {/* Right - Content */}
//                   <div className="p-8 md:p-12 flex flex-col justify-between">
//                     <div>
//                       <motion.div
//                         className="flex items-center gap-2 mb-6"
//                         initial={{ opacity: 0, x: 20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: 0.1 }}
//                       >
//                         <div className="w-2 h-2 bg-cyan-400 rounded-full" />
//                         <span className="text-sm text-cyan-400 font-medium">0{currentProject.id} / 0{projectsData.length}</span>
//                       </motion.div>

//                       <motion.h3 
//                         className="text-3xl md:text-4xl font-bold mb-4 text-white"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.2 }}
//                       >
//                         {currentProject.title}
//                       </motion.h3>

//                       <motion.p 
//                         className="text-gray-400 text-base md:text-lg leading-relaxed mb-8"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.3 }}
//                       >
//                         {currentProject.description}
//                       </motion.p>

//                       <motion.div 
//                         className="flex flex-wrap gap-2 mb-8"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 0.4 }}
//                       >
//                         {currentProject.tech.map((tech, i) => (
//                           <span 
//                             key={i}
//                             className="px-4 py-2 text-sm bg-white/5 text-gray-300 rounded-full border border-white/10 backdrop-blur-sm"
//                           >
//                             {tech}
//                           </span>
//                         ))}
//                       </motion.div>
//                     </div>

//                     <motion.div 
//                       className="flex gap-4"
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.5 }}
//                     >
//                       <a
//                         href={currentProject.github}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 text-center font-medium backdrop-blur-sm"
//                       >
//                         View Code
//                       </a>
//                       <a
//                         href={currentProject.live}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl text-center font-medium transition-all duration-300 shadow-lg shadow-cyan-500/20"
//                       >
//                         Live Demo
//                       </a>
//                     </motion.div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </AnimatePresence>

//           {/* Navigation Arrows */}
//           <button
//             onClick={() => paginate(-1)}
//             className="absolute left-0 md:-left-20 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-full flex items-center justify-center text-white text-xl transition-all duration-300 z-20"
//             aria-label="Previous project"
//           >
//             ←
//           </button>
//           <button
//             onClick={() => paginate(1)}
//             className="absolute right-0 md:-right-20 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-full flex items-center justify-center text-white text-xl transition-all duration-300 z-20"
//             aria-label="Next project"
//           >
//             →
//           </button>

//           {/* Pagination Dots */}
//           <div className="flex justify-center gap-2 mt-12">
//             {projectsData.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => {
//                   setDirection(index > currentIndex ? 1 : -1);
//                   setCurrentIndex(index);
//                 }}
//                 className={`h-2 rounded-full transition-all duration-300 ${
//                   index === currentIndex 
//                     ? 'w-8 bg-gradient-to-r from-cyan-400 to-blue-500' 
//                     : 'w-2 bg-white/20 hover:bg-white/40'
//                 }`}
//                 aria-label={`Go to project ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* View All Link */}
//         <motion.div 
//           className="text-center mt-16"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.6 }}
//         >
//           <a
//             href="https://github.com/shivayogi"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300 group"
//           >
//             <span>View all projects on GitHub</span>
//             <motion.span
//               animate={{ x: [0, 5, 0] }}
//               transition={{ duration: 1.5, repeat: Infinity }}
//             >
//               →
//             </motion.span>
//           </a>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Projects;






import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Projects = () => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const runningRef = useRef(true);
  const lastFrameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;

    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);
    const TARGET_FPS = 30;
    const FRAME_TIME = 1000 / TARGET_FPS;

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * DPR;
      canvas.height = height * DPR;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      starsRef.current = Array.from({ length: 35 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.2 + 0.4,
        opacity: Math.random() * 0.4 + 0.2,
        dir: Math.random() > 0.5 ? 1 : -1,
        speed: Math.random() * 0.003 + 0.002
      }));
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleVisibility = () => {
      runningRef.current = !document.hidden;
      if (runningRef.current) {
        lastFrameRef.current = performance.now();
        animate(lastFrameRef.current);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    const animate = (time) => {
      if (!runningRef.current) return;

      if (time - lastFrameRef.current < FRAME_TIME) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      lastFrameRef.current = time;

      ctx.fillStyle = "rgba(10, 14, 39, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const star of starsRef.current) {
        star.opacity += star.dir * star.speed;

        if (star.opacity > 0.7 || star.opacity < 0.2) {
          star.dir *= -1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section
      id="projects"
      className="relative w-full min-h-screen bg-[#0a0e27] text-white flex items-center justify-center py-20 px-4 overflow-hidden"
    >
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Nebula glows */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full blur-[100px] opacity-25 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              &lt;Projects
            </span>
            <span className="text-gray-600 ml-2">/&gt;</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-400 mb-3 font-mono">
            <span className="text-cyan-400">status:</span>{" "}
            <span className="text-yellow-400">"building"</span>
          </p>

          <p className="text-gray-500 font-mono">
            // TODO: Deploy amazing projects 🚀
          </p>
        </motion.div>

        {/* Orbit rings */}
        <motion.div
          className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-cyan-500/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-purple-500/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </section>
  );
};

export default Projects;
