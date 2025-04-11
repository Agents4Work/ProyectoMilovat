"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TabItem {
  title: string;
  value: string;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs: TabItem[];
  containerClassName?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  contentClassName?: string;
}

export function AnimatedTabs({
  tabs,
  containerClassName,
  tabClassName,
  activeTabClassName,
  contentClassName,
}: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].value);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabChange = (value: string, index: number) => {
    setActiveTab(value);
    setActiveIndex(index);
  };

  return (
    <div className="w-full h-full">
      <div className={cn("flex flex-row items-center justify-start", containerClassName)}>
        {tabs.map((tab, index) => (
          <button
            key={tab.value}
            onClick={() => handleTabChange(tab.value, index)}
            className={cn(
              "relative px-4 py-2 rounded-full transition-all duration-300 ease-out focus:outline-none",
              activeTab === tab.value ? activeTabClassName : "",
              tabClassName
            )}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className={cn("mt-8", contentClassName)}>
        {tabs.map((tab, index) => (
          <motion.div
            key={tab.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: activeTab === tab.value ? 1 : 0,
              y: activeTab === tab.value ? 0 : 20,
              zIndex: activeTab === tab.value ? 1 : 0,
              position: activeTab === tab.value ? "relative" : "absolute",
              pointerEvents: activeTab === tab.value ? "auto" : "none",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
          >
            {tab.content}
          </motion.div>
        ))}
      </div>
    </div>
  );
}