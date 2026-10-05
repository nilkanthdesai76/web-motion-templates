"use client";

import React, { useRef, useState } from "react";

/**
 * GlowCard - Spotlight cursor-following gradient glow card
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 * @param {string} [props.glowColor="rgba(56, 189, 248, 0.15)"]
 */
export function GlowCard({
  children,
  className = "",
  glowColor = "rgba(56, 189, 248, 0.18)",
  ...props
}) {
  const cardRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    setCursorPosition({
      x: e.clientX - left,
      y: e.clientY - top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCursorPosition({ x: -1000, y: -1000 });
      }}
      className={`relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-md transition-shadow hover:border-slate-700 ${className}`}
      {...props}
    >
      {/* Dynamic radial glow overlay */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${cursorPosition.x}px ${cursorPosition.y}px, ${glowColor}, transparent 80%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
