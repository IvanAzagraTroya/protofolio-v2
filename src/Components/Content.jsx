import React, { useEffect, useState, Suspense, lazy } from "react"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import AnimatedText from "../MotionEffects/AnimatedText"
import ScrollTriggered from "../MotionEffects/ScrollTriggeredAnimation"
import Technologies from "./Technologies"

import StarFieldHtml from './BackgroundHtml.jsx'
import './Clouds.css'
import Contact from "./Contact.jsx"

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
            <div className="clouds clouds-2" />
            <div className="clouds clouds-3" />
            
            <StarFieldHtml />
            <div className="div_section">
                <section className="section">
                    <h2>Hola soy Iván Azagra👋</h2>
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
                        <ScrollTriggered />
                        <Suspense fallback= {<div>Pulse en la carta</div>}>
                            <DotLottieReact src={"./touch.json"} loop={true} autoplay={true} style={{height: "100px", width: "100px"}}/>
                        </Suspense>
                    </div>
                </section>
            </div>
            <br/>
            <div className="div_section">
                <section className="technologies-section">
                  <h2 className="technologies-title">Technologies</h2>
                  <Technologies />
                </section>
            </div>
            <div className="div_section">
                <section className="section">
                    <Contact />
                    <Suspense fallback={<div>Miau, aquí hay un gato</div>}>
                        <DotLottieReact src={"./CatMovement.json"} loop={true} autoplay={true} />
                    </Suspense>
                </section>
            </div>
        </>
    )
}