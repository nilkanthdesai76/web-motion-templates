"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * CommandPalette - Mac Spotlight / Raycast-style keyboard command menu
 *
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {() => void} props.onClose
 * @param {Array<{ id: string, title: string, icon?: string, shortcut?: string, action: () => void }>} props.items
 */
export function CommandPalette({ isOpen, onClose, items = [] }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative z-10 w-full max-w-lg overflow-hidden border border-slate-700/80 bg-slate-900/95 shadow-2xl rounded-2xl backdrop-blur-xl"
          >
            {/* Input Header */}
            <div className="flex items-center px-4 border-b border-slate-800">
              <span className="text-slate-400">🔍</span>
              <input
                autoFocus
                type="text"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-3 py-4 text-sm text-white bg-transparent placeholder-slate-500 focus:outline-none"
              />
              <kbd className="px-2 py-0.5 text-xs text-slate-400 bg-slate-800 rounded border border-slate-700">
                ESC
              </kbd>
            </div>

            {/* Items list */}
            <div className="p-2 max-h-72 overflow-y-auto space-y-1">
              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-sm text-slate-500">
                  No commands found.
                </div>
              ) : (
                filteredItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      item.action();
                      onClose();
                    }}
                    className="flex items-center justify-between w-full px-3 py-2.5 text-sm text-left text-slate-200 transition-colors rounded-lg hover:bg-blue-600 hover:text-white group"
                  >
                    <div className="flex items-center gap-2.5">
                      {item.icon && <span>{item.icon}</span>}
                      <span>{item.title}</span>
                    </div>
                    {item.shortcut && (
                      <kbd className="px-1.5 py-0.5 text-xs text-slate-400 bg-slate-800 rounded border border-slate-700 group-hover:bg-blue-700 group-hover:text-white group-hover:border-blue-500">
                        {item.shortcut}
                      </kbd>
                    )}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
