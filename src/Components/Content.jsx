import React, { useEffect, useState, Suspense, lazy } from "react"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import AnimatedText from "./MotionEffects/AnimatedText.jsx"
import ScrollTriggered from "./MotionEffects/ScrollTriggeredAnimation.js"

import StarFieldHtml from './BackgroundHtml.jsx'
import './Clouds.css'
import Contact from "./Contact.jsx"
import LazyTechnologies from "./Observers/LazyTechnologies.jsx"
import LazyProjects from "./Observers/LazyProjects.jsx"

//const LazyDotLottie = React.lazy(() => import("@lottiefiles/dotlottie-react"));

export default function Content() {
    const titles = ["Backend Developer", "Game Developer"]
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length)
        }, 6000)

        return () => clearInterval(interval)
    }, [titles.length])
    return (
        <>
            <div className="clouds clouds-1" />
            <div className="clouds clouds-3" />
            
            <StarFieldHtml />
            <div className="div_section">
                <section className="section">
                    <h2 style={{marginTop: "30%"}}>Hola soy Iván Azagra👋</h2>
                    <AnimatedText text={titles[currentIndex]} />
                    <Suspense fallback={<div>Scroll down</div>}>
                        <DotLottieReact src={"./ScrollDownArrows.json"} loop={true} autoplay={true} />
                    </Suspense>
                </section>
            </div>
            <div className="div_section">
            <section id="section">
                <h2>Sobre mí</h2>
                <p>
                    Soy <strong>desarrollador backend</strong> con experiencia en APIs, microservicios y bases de datos SQL/NoSQL. 
                    He trabajado en proyectos relacionados con <strong>energía y control ambiental</strong>, usando tecnologías como 
                    <strong>.NET Core</strong>, <strong>Java Spring Boot</strong> y <strong>Docker</strong>.
                </p>
                <p>
                    También tengo conocimientos sobre <strong>desarrollo de videojuegos</strong>, lo que me aporta una visión creativa y orientada al rendimiento. 
                    En paralelo, desarrollo proyectos personales como una red social propia y un portal inmobiliario.
                </p>
                <p>
                    Me interesa el <strong>código limpio</strong>, la <strong>arquitectura escalable</strong> y seguir creciendo 
                    profesionalmente.
                </p>
            </section>

            </div>
            <div className="div_section">
                <section className="projects-section">
                    <h2> Projects </h2>
                    <div className="projects-container">
                        <LazyProjects />
                        <Suspense fallback={
                            <div
                            style={{
                                width: "80vw",
                                height: "380px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                background: "rgba(255,255,255,0.05)",
                                borderRadius: "20px",
                            }}
                            >
                            <p style={{ color: "#aaa" }}>Touch the cards</p>
                            </div>
                        }>
                            <DotLottieReact src={"./touch.json"} loop={true} autoplay={true} style={{height: "100px", width: "100px"}}/>
                        </Suspense>
                    </div>
                </section>
            </div>
            <br/>
            <div className="div_section">
                <section className="technologies-section">
                  <h2 className="technologies-title">Technologies</h2>
                  <LazyTechnologies />
                </section>
            </div>
            <div className="div_section">
                <section className="section">
                    <Contact />
                    <Suspense fallback={<div>🐈‍⬛</div>}>
                        <DotLottieReact src={"./CatMovement.json"} loop={true} autoplay={true} />
                    </Suspense>
                </section>
            </div>
        </>
    )
}