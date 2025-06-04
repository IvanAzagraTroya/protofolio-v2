// ScatterText.jsx
"use client";

import React, { useEffect, useRef } from "react";
import { animate, hover } from "motion";         // :contentReference[oaicite:1]{index=1}
import { splitText } from "motion-plus";          // :contentReference[oaicite:2]{index=2}
import { useMotionValue } from "motion/react";    // :contentReference[oaicite:3]{index=3}

import "./ScatterText.css";

export default function ScatterText() {
  const containerRef = useRef(null);
  const velocityX = useMotionValue(0); 
  const velocityY = useMotionValue(0);
  const prevEvent = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Rompemos el contenido de <h1> en caracteres individuales
    //    Nota: querySelector(".h1") encuentra el <h1 className="h1">…</h1>
    const h1Element = containerRef.current.querySelector(".contact-title");
    if (!h1Element) return;
    const { chars } = splitText(h1Element);        // :contentReference[oaicite:4]{index=4}

    // 2. Listener que calcula la velocidad del puntero (pointermove)
    const handlePointerMove = (event) => {
      const now = performance.now();
      const deltaTime = (now - prevEvent.current) / 1000; // segundos
      prevEvent.current = now;

      // movementX/movementY son el desplazamiento desde el último evento
      velocityX.set(event.movementX / deltaTime);
      velocityY.set(event.movementY / deltaTime);
    };
    document.addEventListener("pointermove", handlePointerMove);

    // 3. Al pasar el ratón sobre cada carácter (hover), los “disparamos” con animate()
    hover(chars, (element) => {
      // 3.1. Calculamos la “velocidad” real combinando X e Y
      const vx = velocityX.get();
      const vy = velocityY.get();
      const speed = Math.sqrt(vx * vx + vy * vy);
      const angle = Math.atan2(vy, vx);
      // 3.2. Distancia de desplazamiento (50 ms * velocidad del puntero × factor)
      const distance = speed * 0.1; // Ajusta el factor para más/menos dispersión

      animate(
        element,
        {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
        },
        { type: "spring", stiffness: 100, damping: 50 }
      );
    });

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div className="scatter-container" ref={containerRef}>
      <h2 className="contact-title">📬 Contáctame</h2>
    </div>
  );
}
