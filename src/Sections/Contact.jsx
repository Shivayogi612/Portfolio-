import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const timeRef = useRef(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState(null);

  /* ================= Canvas Stars ================= */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;

      starsRef.current = Array.from({ length: 60 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        baseOpacity: Math.random() * 0.5 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.02,
        twinkleOffset: Math.random() * Math.PI * 2
      }));
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      timeRef.current += 0.02;
      ctx.fillStyle = 'rgba(10, 14, 39, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach(star => {
        const twinkle =
          Math.sin(timeRef.current * star.twinkleSpeed + star.twinkleOffset) * 0.7;
        const opacity = Math.max(0, star.baseOpacity + twinkle);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  /* ================= Handlers ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  /* ================= Social Links (REAL ICONS) ================= */
  const socialLinks = [
    {
      name: 'GitHub',
      icon: FaGithub,
      url: 'https://github.com/shivayogi',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://www.linkedin.com/in/shivayogi-hugar-155a45348/',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      url: 'https://x.com/HugarShiva50433',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      url: 'https://instagram.com/yourusername',
      color: 'from-pink-500 to-purple-500'
    }
  ];

  return (
    <section
      id="contact"
      className="relative w-full bg-[#0a0e27] text-white py-20 px-4 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Let&apos;s{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              Connect
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Have a project in mind? Let’s build something amazing together
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* ================= LEFT: FORM ================= */}
          <div className="space-y-6">
            {['name', 'email', 'message'].map((field) => (
              <div key={field} className="relative">
                <label
                  className={`block text-sm font-mono mb-2 ${
                    focusedField === field ? 'text-cyan-400' : 'text-gray-400'
                  }`}
                >
                  {'<'} YOUR_{field.toUpperCase()} {'/>'}
                </label>

                {field !== 'message' ? (
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(field)}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 bg-white/5 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:border-cyan-400/50"
                  />
                ) : (
                  <textarea
                    rows="5"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(field)}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 bg-white/5 border border-gray-700/50 rounded-lg text-white resize-none"
                  />
                )}
              </div>
            ))}

            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-lg font-semibold"
            >
              Send Message →
            </button>
          </div>

          {/* ================= RIGHT: SOCIALS ================= */}
          <div>
            <h3 className="text-xl font-bold mb-4">Connect on Social</h3>

            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-white/5 border border-gray-700/50 rounded-xl p-4 hover:bg-white/10 transition-all"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-15 transition-opacity`}
                    />
                    <div className="relative z-10 flex flex-col items-center gap-2">
                      <Icon size={28} />
                      <span className="text-sm">{social.name}</span>
                    </div>
                  </a>
                );
              })}
            </div>
            {/* Code Block Decoration */}
            <motion.div 
              className="bg-[#0f1729]/60 backdrop-blur-sm border border-gray-800/50 mt-13 rounded-xl p-6 font-mono text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <pre className="text-gray-400">
                <span className="text-purple-400">const</span> <span className="text-blue-400">contact</span> = {'{'}{'\n'}
                {'  '}status: <span className="text-green-400">"open"</span>,{'\n'}
                {'  '}availability: <span className="text-green-400">"ready"</span>,{'\n'}
                {'  '}response: <span className="text-green-400">"fast"</span>{'\n'}
                {'}'};
              </pre>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Contact;
