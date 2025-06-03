import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import React, { useRef } from "react"

export default function ScrollTriggered() {
    const scrollRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return
        const container = scrollRef.current
        const scrollAmount = 340 // Ancho de cada card + gap

        container.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth"
        })
    }

    return (
        <div style={wrapper}>
            <button style={navButtonLeft} onClick={() => scroll("left")}>⬅</button>

            <div style={horizontalContainer} ref={scrollRef} className="hide-scrollbar">
                {projects.map(([imageSrc, hueA, hueB], i) => (
                    <Card key={i} i={i} imageSrc={imageSrc} hueA={hueA} hueB={hueB} />
                ))}
            </div>

            <button style={navButtonRight} onClick={() => scroll("right")}>➡</button>
        </div>
    )
}

interface CardProps {
    imageSrc: string
    hueA: number
    hueB: number
    i: number
}

function Card({ imageSrc, hueA, hueB, i }: CardProps) {
    const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`

    return (
        <motion.div
            style={cardContainer}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.5, once: false }}
        >
            <div style={{ ...splash, background }} />
            <motion.div style={card} variants={cardVariants}>
                <img
                    src={imageSrc}
                    alt={`Project ${i + 1}`}
                    style={{ width: "80%", height: "80%", objectFit: "contain" }}
                />
                <p style={{ fontSize: 20, marginTop: 10 }}>Proyecto {i + 1}</p>
            </motion.div>
        </motion.div>
    )
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
}

const hue = (h: number) => `hsl(${h}, 100%, 50%)`

/** ============== Estilos ============== */

const wrapper: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "100%",
    overflow: "hidden",
    padding: "60px 0",
}

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

    scrollbarWidth: "none",
    msOverflowStyle: "none",
}

const navButtonLeft: React.CSSProperties = {
    position: "absolute",
    left: 10,
    zIndex: 10,
    background: "#ffffffdd",
    border: "none",
    borderRadius: "50%",
    fontSize: 24,
    padding: "10px 14px",
    cursor: "pointer",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
}

const navButtonRight: React.CSSProperties = {
    position: "absolute",
    right: 10,
    zIndex: 10,
    background: "#ffffffdd",
    border: "none",
    borderRadius: "50%",
    fontSize: 24,
    padding: "10px 14px",
    cursor: "pointer",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
}

const cardContainer: React.CSSProperties = {
    flex: "0 0 auto",
    position: "relative",
    scrollSnapAlign: "center",
    width: 300,
    height: 430,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E2EAF4",
    borderRadius: 20,
}

const splash: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
    zIndex: 0,
}

const card: React.CSSProperties = {
    fontSize: 164,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    background: "#D5E8FF",
    boxShadow:
        "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
    transformOrigin: "10% 60%",
    zIndex: 1,
}



/** ============== Proyectos (imagen y colores) ============== */

const projects: [string, number, number][] = [
    ["public/gamepad-svgrepo-com.svg", 340, 10],
    ["public/proyecto1.png", 20, 40],
    ["public/proyecto2.png", 60, 90],
    ["public/proyecto3.png", 80, 120],
    ["public/proyecto4.png", 100, 140],
    ["public/proyecto5.png", 205, 245],
    ["public/proyecto6.png", 260, 290],
    ["public/proyecto7.png", 290, 320],
]
