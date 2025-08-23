// ScatterTextOptimized.jsx
"use client";

import React, { useEffect, useRef } from "react";
import { animate, hover } from "motion";
import { splitText } from "motion-plus";
import { useMotionValue } from "motion/react";

import "./ScatterText.css";

export default function ScatterTextOptimized() {
  const containerRef = useRef(null);
  const velocityX = useMotionValue(0);
  const velocityY = useMotionValue(0);
  const prevEventTime = useRef(performance.now());
  const scheduled = useRef(false);
  const pointerDelta = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Detectamos si el dispositivo tiene puntero fino (mouse)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    if (!containerRef.current) return;

    const h1Element = containerRef.current.querySelector(".contact-title");
    if (!h1Element) return;

    const { chars } = splitText(h1Element);

    const handlePointerMove = (event) => {
      const now = performance.now();
      const deltaTime = (now - prevEventTime.current) / 1000;
      prevEventTime.current = now;

      pointerDelta.current.x += event.movementX / deltaTime;
      pointerDelta.current.y += event.movementY / deltaTime;

      if (!scheduled.current) {
        scheduled.current = true;
        requestAnimationFrame(() => {
          const vx = pointerDelta.current.x;
          const vy = pointerDelta.current.y;

          velocityX.set(vx);
          velocityY.set(vy);

          pointerDelta.current.x = 0;
          pointerDelta.current.y = 0;
          scheduled.current = false;
        });
      }
    };

    document.addEventListener("pointermove", handlePointerMove);

    hover(chars, (element) => {
      const vx = velocityX.get();
      const vy = velocityY.get();
      const speed = Math.sqrt(vx * vx + vy * vy);
      const angle = Math.atan2(vy, vx);
      const distance = speed * 0.1;

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
