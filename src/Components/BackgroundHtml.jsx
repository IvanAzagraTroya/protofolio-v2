import React, { useEffect, useRef, useState } from "react"

export default function StarFieldHtml() {
  const containerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mobile = /Mobi|Android/i.test(navigator.userAgent)
    setIsMobile(mobile)

    const numStars = mobile ? 50 : 100
    const sizes = [1, 1, 2, 3, 4, 2]

    function biasedTop() {
      return Math.pow(Math.random(), 2) * numStars
    }

    function randomLeft() {
      return Math.random() * 100
    }

    const container = containerRef.current
    if (!container) return

    // Limpiar estrellas previas si hay
    container.innerHTML = ""

    for (let i = 0; i < numStars; i++) {
      const top = biasedTop()
      const left = randomLeft()
      const randomSize = sizes[Math.floor(Math.random() * sizes.length)]

      const div = document.createElement("div")
      div.style.position = "absolute"
      div.style.top = top + "%"
      div.style.left = left + "%"
      div.style.height = randomSize + "px"
      div.style.width = randomSize + "px"
      div.style.backgroundColor = "#FFFFFF"
      div.style.borderRadius = "50%"

      // Clases opcionales
      div.classList.add(`star${(i % 6) + 1}`)

      container.appendChild(div)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        zIndex: 0,
      }}
    />
  )
}
