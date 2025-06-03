import React, { useEffect, useRef } from "react"

export default function StarFieldHtml() {
  const containerRef = useRef(null)

  useEffect(() => {
    const sizes = [1, 1, 2, 3, 4]

    // Distribución sesgada: más estrellas arriba
    function biasedTop() {
      return Math.pow(Math.random(), 2) * 100 // valores cercanos a 0 son más frecuentes
    }

    function randomLeft() {
      return Math.floor(Math.random() * 101) // 0 a 100
    }

    const container = containerRef.current

    for (let i = 0; i < 100; i++) {
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

      if (i <= 50) div.classList.add("star1")
      else if (i <= 100) div.classList.add("star2")
      else if (i <= 150) div.classList.add("star3")
      else if (i <= 200) div.classList.add("star4")
      else if (i <= 250) div.classList.add("star5")
      else div.classList.add("star6")

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
