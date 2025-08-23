import React, { Suspense, useState, useEffect, useRef } from "react";
import { LazyMotion } from "framer-motion";
import * as m from "framer-motion/m";

// Carga asíncrona de las features de Framer Motion
const loadFeatures = () =>
  import("framer-motion").then(res => res.domAnimation);

// Carga asíncrona del componente pesado
const Projects = React.lazy(() => import("../MotionEffects/ScrollTriggeredAnimation"));

export default function LazyProjects() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [animReady, setAnimReady] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();

          // Retrasamos la carga de las animaciones para que no bloquee el render inicial
          setTimeout(() => {
            setAnimReady(true);
          }, 100); // 100ms de retraso, lo justo para que el contenido aparezca primero
        }
      },
      { rootMargin: "500px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ minHeight: "100px" }}>
      {visible && (
        <Suspense>
          {animReady ? (
            <LazyMotion features={loadFeatures}>
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Projects />
              </m.div>
            </LazyMotion>
          ) : (
            <Projects /> // Se muestra inmediatamente, sin animación
          )}
        </Suspense>
      )}
    </div>
  );
}
