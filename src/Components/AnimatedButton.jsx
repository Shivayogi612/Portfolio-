import React from 'react';

const AnimatedButton = ({ children, onClick, href }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className="inline-block border-none outline-none bg-indigo-500 px-5 py-2.5 text-xs font-bold text-white rounded transition-all duration-100 transform active:translate-y-1 shadow-[0_5px_0_0_#a29bfe] hover:shadow-[0_3px_0_0_#a29bfe] active:shadow-none"
    >
      {children}
    </a>
  );
};

export default AnimatedButton;