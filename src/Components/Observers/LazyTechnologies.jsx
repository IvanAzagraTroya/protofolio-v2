import React, { Suspense, useEffect, useRef, useState } from "react";
import { LazyMotion } from "framer-motion";
import * as m from "framer-motion/m";

// Carga asíncrona de las features de animación
const loadFeatures = () =>
  import("framer-motion").then(res => res.domAnimation);

// Carga asíncrona del componente
const TechnologiesTabs = React.lazy(() => import("../Technologies"));

export default function LazyTechnologies() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [animReady, setAnimReady] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();

          // Retrasamos un poco la carga de animaciones
          setTimeout(() => {
            setAnimReady(true);
          }, 100);
        }
      },
      { rootMargin: "1200px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ minHeight: "500px" }}>
      {visible && (
        <Suspense>
          {animReady ? (
            <LazyMotion features={loadFeatures}>
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <TechnologiesTabs />
              </m.div>
            </LazyMotion>
          ) : (
            <TechnologiesTabs /> // Se muestra de inmediato sin animación
          )}
        </Suspense>
      )}
    </div>
  );
}
