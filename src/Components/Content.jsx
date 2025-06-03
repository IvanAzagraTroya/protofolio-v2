import { useEffect, useState } from "react"
import AnimatedText from "../MotionEffects/AnimatedText"
import ScrollTriggered from "../MotionEffects/ScrollTriggeredAnimation"
import Technologies from "./Technologies"

import './Clouds.css'

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
            <div className="clouds clouds-1"></div>
            <div className="clouds clouds-2"></div>
            <div className="clouds clouds-3"></div>
            <section className="section">
                <h2>Hola soy Iván Azagra👋</h2>
                <AnimatedText text={titles[currentIndex]} />
            </section>
            <section className="projects-section">
                <h2> Projects </h2>
                <div className="projects-container">
                    <ScrollTriggered />
                </div>
            </section>
            <section className="technologies-section">
                <h2 className="technologies-title">Technologies</h2>
                <Technologies />
            </section>
            <section className="section">📬 Contáctame</section>
        </>
    )
}