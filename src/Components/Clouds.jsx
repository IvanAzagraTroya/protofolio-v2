import React from "react"
import './CloudsPane.css' // Asume que el CSS correspondiente está ahí

const Cloud = ({ id }) => (
  <div className="bigCloud" id={id}>
    <div className="largeCircle" id="circ1">
      <div className="largeCircle" id="circ1shadow" />
    </div>
    <div className="middleCircle" id="circ2">
      <div className="middleCircle" id="circ2shadow" />
    </div>
    <div className="middleCircle" id="circ3">
      <div className="middleCircle" id="circ3shadow" />
    </div>
    <div className="smallCircle" id="circ4" />
    <div className="smallCircle" id="circ5">
      <div className="smallCircle" id="circ5shadow" />
    </div>
    <div className="smallCircle" id="circ6">
      <div className="smallCircle" id="circ6shadow" />
    </div>
  </div>
)

export default function CloudPane() {
  return (
    <div className="cloudPane">
      {Array.from({ length: 7 }, (_, i) => (
        <Cloud key={i} id={`cloud${i + 1}`} />
      ))}
    </div>
  )
}
