import { useEffect, useState } from "react"
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
            <div style={{ width: "100vw", height: "100vh" }}>
              <section className="section">
                  <h2>Hola soy Iván Azagra👋</h2>
                  <AnimatedText text={titles[currentIndex]} />
              </section>
            </div>
            <div style={{ width: "100vw", height: "100vh" }}>
                <section className="projects-section">
                    <h2> Projects </h2>
                    <div className="projects-container">
                    <ScrollTriggered />
                  </div>
                </section>
            </div>
            <div style={{ width: "100vw", height: "100vh" }}>
                <section className="technologies-section">
                  <h2 className="technologies-title">Technologies</h2>
                  <Technologies />
                </section>
            </div>
            <div style={{ width: "100vw", height: "100vh" }}>
                <section className="section">
                    <Contact />
                </section>
            </div>
        </>
    )
}