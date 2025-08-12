import { useEffect, useRef, useState } from "react"
import { animate, stagger } from "motion"
import React from "react"

function AnimatedText({ text }) {
  const containerRef = useRef(null)
  const [chars, setChars] = useState([])

  // Cuando cambia el texto, lo convertimos a array de caracteres
  useEffect(() => {
    setChars(text.split(''))
  }, [text])

  useEffect(() => {
    if (!containerRef.current) return

    const elements = containerRef.current.querySelectorAll('.split-char')
    if (elements.length === 0) return

    // Animación entrada
    animate(
      elements,
      { opacity: [0, 1], y: [10, 0] },
      {
        duration: 1,
        delay: stagger(0.1),
        easing: "ease-out",
      }
    )

    // Animación wavy infinita
    animate(
      elements,
      { y: [-10, 10] },
      {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 2,
        easing: "easeInOut",
        delay: stagger(0.15, {
          startDelay: -elements.length * 0.15,
        }),
      }
    )
  }, [chars])

  return (
    <div
      className="text-container"
      ref={containerRef}
      style={{ visibility: chars.length ? 'visible' : 'hidden' }}
    >
      <h1>
        {chars.map((char, i) => (
          <span key={i} className="split-char">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
      <style>{`
        .text-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }
        .split-char {
          display: inline-block;
          will-change: transform, opacity;
        }
      `}</style>
    </div>
  )
}

export default React.memo(AnimatedText)