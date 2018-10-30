import React from 'react'

export default function Move({ x, y, angle, move, show, onClick }) {
  return <div
    onClick={onClick}
    className="Move"
    style={show
      ? {
        transform: `
          rotate(${angle}rad)
          translateX(${50}px)
          rotate(${-angle}rad)
        `
      }
      : {
        // display: 'none',
      }}
  >{move.getSymbol()}</div>
}
