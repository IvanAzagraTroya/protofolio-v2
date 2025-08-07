import React, { useRef, useState, useEffect, Suspense, lazy } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import { RiReactjsLine } from "react-icons/ri";
import { FaPython } from "react-icons/fa";
import { FaJava } from "react-icons/fa";
import { FaAndroid } from "react-icons/fa6";
import { SiDotnet, SiKtor, SiMariadb, SiMongodb, SiPostgresql, SiRedis, SiSpring } from "react-icons/si";
import { SiGodotengine } from "react-icons/si";
import { SiOracle } from "react-icons/si";
import { SiNeo4J } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi"
import { TbBrandJavascript, TbBrandKotlin, 
  TbBrandCSharp, TbBrandThreejs,
  TbBrandFramerMotion, TbBrandDocker,
  TbBrandUnity
        } from "react-icons/tb";
 
import { GiCannon } from "react-icons/gi";
 
//import Lottiefiles from "/lottiefiles.svg";
import { IconType } from "react-icons";

/**
 * Componente que muestra las cartas de proyectos en fila horizontal
 * y permite desplazarse por arrastre horizontal en lugar de botones.
 */
export default function ScrollTriggered() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  // Cambia cursor mientras arrastra
  const [cursorType, setCursorType] = useState<"grab" | "grabbing">("grab");
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Handler para iniciar arrastre con ratón
    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      startX.current = e.pageX - container.offsetLeft;
      scrollStart.current = container.scrollLeft;
      setCursorType("grabbing");
    };

    // Handler para iniciar arrastre táctil
    const onTouchStart = (e: TouchEvent) => {
      isDragging.current = true;
      startX.current = e.touches[0].pageX - container.offsetLeft;
      scrollStart.current = container.scrollLeft;
      setCursorType("grabbing");
    };

    // Handler para mover mientras arrastra con ratón
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault(); // Evita selección de texto
      const x = e.pageX - container.offsetLeft;
      const walk = x - startX.current; // Distancia recorrida
      container.scrollLeft = scrollStart.current - walk;
    };

    // Handler para mover mientras arrastra táctil
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = x - startX.current;
      container.scrollLeft = scrollStart.current - walk;
    };

    // Handler para terminar arrastre (ratón)
    const onMouseUp = () => {
      isDragging.current = false;
      setCursorType("grab");
    };

    // Handler para terminar arrastre (táctil)
    const onTouchEnd = () => {
      isDragging.current = false;
      setCursorType("grab");
    };

    // Asociar listeners
    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchend", onTouchEnd);

    // Limpiar listeners al desmontar
    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div style={wrapper}>
      <div
        ref={scrollRef}
        style={{ ...horizontalContainer, cursor: cursorType }}
        className="hide-scrollbar"
      >
        {projects.map(([imageSrc, title, description, technologies, hueA, hueB, links], i) => (
          <Card key={i} i={i} imageSrc={imageSrc} hueA={hueA} 
          hueB={hueB} isSelected={i === selectedCard}
          onClick={() => setSelectedCard(prev => (prev === i ? null : i))} title = {title} 
          description = {description} technologies = {technologies} links = {links}/>
          
        ))}
      </div>
    </div>
  );
}

interface CardProps {
  imageSrc: string;
  hueA: number;
  hueB: number;
  i: number;
  isSelected: boolean;
  onClick: () => void;
  title: string;
  description: string;
  technologies: IconType[];
  links: string[];
}

function Card({ imageSrc, hueA, hueB, i, isSelected, onClick, title, description, technologies, links }: CardProps) {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

  const iconNames: Record<string, string> = {
    // React
    RiReactjsLine: "React",
  
    // Lenguajes
    TbBrandJavascript: "JavaScript",
    FaPython: "Python",
    FaJava: "Java",
    TbBrandKotlin: "Kotlin",
    TbBrandCSharp: "C#",
  
    // .NET y frameworks
    SiDotnet: ".NET",
    SiKtor: "Ktor",
    SiSpring: "Spring",
  
    // Bases de datos
    SiMongodb: "MongoDB",
    SiPostgresql: "PostgreSQL",
    BiLogoPostgresql: "PostgreSQL",
    SiMariadb: "MariaDB",
    SiRedis: "Redis",
    SiOracle: "Oracle",
    SiNeo4J: "Neo4j",
  
    // Motores / librerías gráficas
    TbBrandThreejs: "Three.js",
    TbBrandFramerMotion: "Framer Motion",
    GiCannon: "Cannon.js",
  
    // Motores de juego
    TbBrandUnity: "Unity",
    SiGodotengine: "Godot",
  
    // Contenedores
    TbBrandDocker: "Docker",
  
    // Otros
    FaAndroid: "Android"
  };

  return (
    <motion.div
      onClick={onClick}
      style={{
        ...cardContainer,
        zIndex: isSelected ? 10 : 1,
        scale: isSelected ? 1.05 : 1,
        transition: "scale 0.2s ease",
      }}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.5, once: false }}
    >
      <div style={{ ...splash, background }} />

      {/* Carta “normal” */}
      <motion.div style={card} variants={cardVariants}>
        <img
          src={imageSrc}
          alt={`Project ${i + 1}`}
          style={{ width: "80%", height: "80%", objectFit: "contain" }}
        />
        <p style={{ fontSize: 20, marginTop: 10 }}>{title}</p>
      </motion.div>

      {isSelected && (
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "75%",
          height: "80%",
          backgroundColor: "rgba(216, 226, 223, 0.7)",
          color: "#000000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          borderRadius: 20,
          zIndex: 2,
          textAlign: "center",
          transform: "Rotate(-10deg) ",
          transformOrigin: "75% 50%",

        }}
        variants={cardVariants}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div>
          <h3 style={{ fontSize: 22, marginBottom: 10 }}>{title}</h3>
          <p style={{ fontSize: 16, marginBottom: 10 }}>{description}</p>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
            marginTop: 10
            }}
          >
          {technologies.map((Icon, idx) => {
            const iconName = iconNames[Icon.name] || "Tecnología";

            return (
              <span
                key={idx}
                title={iconName}
                style={{
                  margin: "0 8px",
                  display: "inline-block",
                  transition: "transform 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.3)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              >
                <Icon style={{ fontSize: 24 }} />
              </span>
            );
          })}

          </div>
          <div>
            <h3 style={{ fontSize: 22, marginBottom: 10, textDecoration: "underline" }}>Links: </h3>
            {links.map((link, idx) => {
              const isGithub = link.includes("github");
              const isGithubio = link.includes("github.io");
              const iconSrc = isGithub && !isGithubio
                ? "./github.svg"
                : "./web.svg";  

              return (
                <a
                  key={idx}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginRight: "10px" }}
                >
                  <img
                    src={iconSrc}
                    alt={isGithub && !isGithubio ? "GitHub" : "Web"}
                    style={{ width: "40px", height: "40px" }}
                  />
                </a>
              );
            })}
          </div>
        </div>
      </motion.div>
    )}
    </motion.div>
  );
}

const cardVariants: Variants = {
  offscreen: {
    x: 200,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const hue = (h: number) => `hsl(${h}, 100%, 50%)`;

/** ============== Estilos ============== */

const wrapper: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  width: "100%",
  height: "100%",
  padding: "30px 15px",
  overflow: "visible"
};

const horizontalContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  gap: "40px",
  width: "80vw",
  overflowX: "scroll",
  overflowY: "visible",
  scrollSnapType: "x mandatory",
  padding: "0 60px",
  scrollBehavior: "smooth",

  scrollbarWidth: "none", // Firefox 
  msOverflowStyle: "none", // IE 10+ 
  WebkitUserSelect: "none", // Safari
  userSelect: "none", // Chrome 
  msUserSelect: "none" // IE 10+

};

const cardContainer: React.CSSProperties = {
  flex: "0 0 auto",
  position: "relative",
  scrollSnapAlign: "center",

  width: 250,
  height: 380,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#E2EAF4",
  borderRadius: 20,
};

const splash: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
  zIndex: 0,
};

const card: React.CSSProperties = {
  fontSize: 164,
  width: "90%",
  height: "92%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 20,
  background: "#D5E8FF",
  boxShadow:
    "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
  transformOrigin: "45% 60%",
  zIndex: 1,
};

/** ============== Proyectos (imagen y colores) ============== */

const projects: [string, string, string, IconType[], number, number, string[]][] = [
  ["src/assets/gamepad-svgrepo-com.svg","Portfolio",  "Portfolio web con elementos 3D", [RiReactjsLine, TbBrandJavascript, TbBrandThreejs, TbBrandFramerMotion], 340, 10, ["https://github.com/IvanAzagraTroya/protofolio-v2", "https://ivanazagratroya.github.io/protofolio-v2/"]],
  ["src/assets/gamepad-svgrepo-com.svg", "3DPong", "Juego Pong hecho en 3D", [RiReactjsLine, TbBrandJavascript, TbBrandThreejs, GiCannon], 20, 40, ["https://github.com/IvanAzagraTroya/React-Pong3D", "https://3dpong-sigma.vercel.app/"]],
  ["src/assets/gamepad-svgrepo-com.svg", "Onlycats Backend", "Red social para compartir contenido de gatos", [TbBrandCSharp, SiMongodb, SiPostgresql, TbBrandDocker, SiDotnet], 60, 90, ["https://github.com/IvanAzagraTroya/Onlycats"]],
  ["src/assets/gamepad-svgrepo-com.svg", "Onlycats Frontend", "Web de la red social", [RiReactjsLine, TbBrandJavascript], 80, 120, ["https://github.com/IvanAzagraTroya/onlycatsfrontend"]],
  // ["./src/assets/proyecto4.png", "title5", "description5", [SiGodotengine], 100, 140],
  ["src/assets/gamepad-svgrepo-com.svg", "Slimy Dice", "Juego para la GMTK Jam 2022 con temática 'Roll the dice'", [TbBrandUnity, TbBrandCSharp], 205, 245, []],
  // ["./src/assets/proyecto6.png", "title7", "description7", [], 260, 290],
  ["src/assets/gamepad-svgrepo-com.svg", "Supertechnology", "Proyecto de gestión para e-commerce por microservicios", [TbBrandKotlin, FaJava, SiMongodb, SiRedis, SiMariadb, SiPostgresql, SiSpring, SiKtor], 290, 320, ["https://github.com/IvanAzagraTroya/SuperTechnology"]],
];
