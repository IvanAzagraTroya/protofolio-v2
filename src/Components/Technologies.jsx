import { RiReactjsLine } from "react-icons/ri";
import { FaPython } from "react-icons/fa";
import { FaJava } from "react-icons/fa";
import { FaAndroid } from "react-icons/fa6";
import { SiMongodb } from "react-icons/si";
import { SiGodotengine } from "react-icons/si";
import { SiOracle } from "react-icons/si";
import { SiNeo4J } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi"
import { TbBrandJavascript, TbBrandKotlin, 
  TbBrandCSharp, TbBrandThreejs,
  TbBrandFramerMotion, TbBrandDocker,
  TbBrandUnity
 } from "react-icons/tb";

import { motion, AnimatePresence } from "motion/react";
import { useState } from 'react'

import './Technologies.css'

const categorizedIcons = {
    Frontend: [
      { Icon: RiReactjsLine, colorClass: "cyan", delay: 2.5 },
      { Icon: TbBrandJavascript, colorClass: "yellow", delay: 4 },
      { Icon: TbBrandThreejs, colorClass: "yellow", delay: 3 },
      { Icon: TbBrandFramerMotion, colorClass: "orange", delay: 6 },
      { Icon: FaAndroid, colorClass: "green", delay: 5 },
    ],
    Backend: [
      { Icon: FaPython, colorClass: "blue", delay: 2.5 },
      { Icon: TbBrandCSharp, colorClass: "dark-green", delay: 6 },
      { Icon: TbBrandKotlin, colorClass: "purple", delay: 4 },
      { Icon: SiGodotengine, colorClass: "blue", delay: 3.5 },
      { Icon: TbBrandDocker, colorClass: "cyan", delay: 5 },
      { Icon: TbBrandUnity, colorClass: "", delay: 7 },
      { Icon: FaJava, colorClass:"red", delay: 8}
    ],
    Databases: [
      { Icon: SiMongodb, colorClass: "green", delay: 2 },
      { Icon: BiLogoPostgresql, colorClass: "sky", delay: 3 },
      { Icon: SiOracle, colorClass: "red", delay: 5 },
      { Icon: SiNeo4J, colorClass: "light-blue", delay: 4 }
    ],
  };
  
  const tabs = [
    { icon: "⚛️", label: "Frontend" },
    { icon: "🐍", label: "Backend" },
    { icon: "💾", label: "Databases" },
  ];
  
  export default function TechnologiesTabs() {
    const [selectedTab, setSelectedTab] = useState(tabs[0]);
  
    return (
        <div style={container}>
        <nav style={nav}>
          <ul style={tabsContainer}>
            {tabs.map((item) => (
              <motion.li
                key={item.label}
                initial={false}
                animate={{
                  backgroundColor: item === selectedTab ? "#eee" : "#eee0",
                }}
                style={tab}
                onClick={() => setSelectedTab(item)}
              >
                {`${item.icon} ${item.label}`}
                {item === selectedTab ? (
                  <motion.div
                    style={underline}
                    layoutId="underline"
                    id="underline"
                  />
                ) : null}
              </motion.li>
            ))}
          </ul>
        </nav>
        <main style={iconContainer}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab ? selectedTab.label : "empty"}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ width: "100%" }}
            >
              <div className="technologies-container">
                <div className="technologies-grid">
                {categorizedIcons[selectedTab.label].map(
                  ({ Icon, colorClass, delay }, index) => (
                    <div key={index} className={`icon-wrapper bounce-${delay}`}>
                      <Icon className={`icon ${colorClass}`} />
                    </div>
                  )
                )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    );
  }
  
  const container = {
    width: "100%",
    maxWidth: 700,
    margin: "0 auto",
    height: "500px",
    borderRadius: 10,
    background: "rgb(255, 255, 255, 0.2)",
    overflow: "hidden",
    boxShadow:
      "0 1px 1px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg 0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075)",
    display: "flex",
    flexDirection: "column",
  };
  
  const nav = {
    background: "#fdfdfd",
    padding: "5px 5px 0",
    borderRadius: "10px",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottom: "1px solid #eeeeee",
    height: 44,
  };
  
  const tabsStyles = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    fontWeight: 500,
    fontSize: 14,
  };
  
  const tabsContainer = {
    ...tabsStyles,
    display: "flex",
    width: "100%",
  };
  
  const tab = {
    ...tabsStyles,
    borderRadius: 5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: "100%",
    padding: "10px 15px",
    position: "relative",
    background: "white",
    cursor: "pointer",
    height: 24,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    minWidth: 0,
    userSelect: "none",
    color: "#0f1115",
  };
  
  const underline = {
    position: "absolute",
    bottom: -2,
    left: 0,
    right: 0,
    height: 2,
    background: "var(--accent)",
  };
  
  const iconContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
    flex: 1,
    padding: 20,
  };
  