"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * MagneticButton - Cursor-following magnetic physics button
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 * @param {number} [props.strength=0.35] Attraction strength (0.1 to 0.8)
 * @param {() => void} [props.onClick]
 */
export function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  onClick,
  ...props
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (clientX - centerX) * strength;
    const deltaY = (clientY - centerY) * strength;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 220, damping: 14, mass: 0.1 }}
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center px-6 py-3 font-medium text-white transition-colors bg-blue-600 rounded-full hover:bg-blue-500 active:bg-blue-700 select-none ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
