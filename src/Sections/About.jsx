import React from "react";

const About = () => {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen bg-[#0a0e27] text-white
                 flex items-center justify-center px-6 py-20"
    >
      <div className="relative z-10 max-w-3xl w-full">
        
        {/* Simple Header */}
        <h2 className="text-4xl font-bold mb-8 text-white">
          About Me
        </h2>

        {/* Main Content */}
        <div className="space-y-6 text-gray-300 text-base leading-relaxed">
          <p>
            I'm Shivayogi, a web developer from India who's learning by doing. 
            I started coding because I was curious about how websites work, and now 
            I spend most of my time building things and figuring out why they break.
          </p>
          
          <p>
            Right now, I'm focused on React and trying to write cleaner code. 
            Every project teaches me something whether it's a better way to structure 
            components or just realizing I've been overthinking a simple problem.
          </p>

          <p>
            I'm not trying to be the best developer. I'm just trying to be better 
            than I was yesterday. 
          </p>

          {/* Simple Code Block */}
          <div className="mt-10 bg-[#0d1117] border border-gray-800 rounded-lg p-5 font-mono text-sm overflow-x-auto">
            <div className="text-gray-500 mb-3">// Current status</div>
            <div className="space-y-1">
              <div>
                <span className="text-gray-500">const</span>{" "}
                <span className="text-blue-400">me</span>{" "}
                <span className="text-gray-500">=</span> {"{"}
              </div>
              <div className="pl-4 text-gray-400">
                location: <span className="text-green-400">"India"</span>,
              </div>
              <div className="pl-4 text-gray-400">
                currentlyLearning: <span className="text-green-400">"React"</span>,
              </div>
              <div className="pl-4 text-gray-400">
                workingOn: <span className="text-green-400">"Building real projects"</span>,
              </div>
              <div className="pl-4 text-gray-400">
                status: <span className="text-green-400">"Always learning"</span>
              </div>
              <div>{"}"}</div>
            </div>
          </div>

          <p className="text-gray-400 text-sm pt-4">
            If you want to build something together or just chat about code, feel free to reach out.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;