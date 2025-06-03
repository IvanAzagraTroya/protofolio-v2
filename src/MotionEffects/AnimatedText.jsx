"use client"

import { useEffect, useRef } from "react"
import { animate, stagger } from "motion"
import { splitText } from "motion-plus"

export default function AnimatedText({ text }) {
    const containerRef = useRef(null)

    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        // Asegurarse que las fuentes están listas
        document.fonts.ready.then(() => {
            const target = el.querySelector(".animated-text")
            if (!target) return

            // Limpiar texto anterior si lo hay
            target.innerHTML = text

            // Split en caracteres
            const { chars } = splitText(target)

            // Mostrar el contenedor
            el.style.visibility = "visible"

            // Animación de entrada
            animate(
                chars,
                { opacity: [0, 1], y: [10, 0] },
                {
                    duration: 1,
                    delay: stagger(0.1),
                    easing: "ease-out",
                }
            )

            // Animación infinita tipo wavy
            animate(
                chars,
                { y: [-10, 10] },
                {
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 2,
                    easing: "easeInOut",
                    delay: stagger(0.15, {
                        startDelay: -chars.length * 0.15,
                    }),
                }
            )
        })
    }, [text]) // <- Se reinicia al cambiar el texto

    return (
        <div className="text-container" ref={containerRef}>
            <h1>
                <span className="animated-text">{text}</span>
            </h1>
            <style>{`
                .text-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: 22vw;
                    width: 100%;
                    visibility: hidden;
                }

                .split-char {
                    display: inline-block;
                    will-change: transform, opacity;
                }
            `}</style>
        </div>
    )
}
