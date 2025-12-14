import React from "react";
import { motion } from "framer-motion";
import { FaBookOpen } from "react-icons/fa";

const journey = [
  {
    title: "10th Standard",
    year: "2022",
    institute: "St, Mary's High School",
    place: "Belagavi",
  },
  {
    title: "Diploma in Computer Science",
    year: "2022 – 2025",
    institute: "Jain Polytechnic",
    place: "Belagavi",
  },
  {
    title: "B.E in Information Science (Pursuing)",
    year: "2023 – Present",
    institute: "Gogte Institute of Technology",
    place: "Belagavi",
  },
];

const Experience = () => {
  return (
    <section
      id="journey"
      className="w-full bg-[#0a0e27] text-white py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
        >
          My Journey
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 hidden md:block" />

          <div className="space-y-16">
            {journey.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0
                    ? "md:justify-start"
                    : "md:justify-end"
                }`}
              >
                {/* Timeline Dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] z-10" />

                {/* Card */}
                <div className="w-full md:w-[45%] bg-[#0f1729] border border-cyan-500/20 rounded-xl p-6 shadow-lg hover:shadow-cyan-500/20 transition">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-black">
                      <FaBookOpen size={22} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="text-cyan-400 text-sm">{item.year}</p>
                    </div>
                  </div>

                  <p className="text-gray-300 font-medium">
                    {item.institute}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    {item.place}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
