"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * AnimatedTabs - Sliding pill indicator navigation tabs
 *
 * @param {Object} props
 * @param {Array<{ id: string, label: string, icon?: string }>} props.tabs
 * @param {string} props.activeTab
 * @param {(id: string) => void} props.onChange
 */
export function AnimatedTabs({ tabs = [], activeTab, onChange }) {
  return (
    <div className="inline-flex p-1.5 bg-slate-900/90 border border-slate-800 rounded-full backdrop-blur-md">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="relative px-4 py-2 text-sm font-medium transition-colors rounded-full select-none text-slate-400 hover:text-white"
          >
            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 bg-blue-600 rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span
              className={`relative z-10 flex items-center gap-1.5 ${
                isActive ? "text-white font-semibold" : ""
              }`}
            >
              {tab.icon && <span>{tab.icon}</span>}
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
