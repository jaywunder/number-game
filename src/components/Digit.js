import React, { Component } from 'react'

import * as moves from '../game/moves'

import Move from './Move'

export default class Digit extends Component {

  constructor(...args) {
    super(...args)

    const moves2 = Object.values(moves)
    moves2.pop()

    this.state = {
      x: Math.random() * 300 + 200,
      y: Math.random() * 200,
      moves: moves2, // TODO: change this to reflect different moves
      showMoves: false,
    }
  }

  toggleMoves = () =>
    this.setState(({showMoves}) => ({ showMoves: !showMoves }))

  render() {
    const angleRatio = 2 * Math.PI / this.state.moves.length

    return this.props.digit.toDigits().map((d, i) =>
      <div className="Digit" key={i}
        onClick={this.props.shouldInitMove ? undefined : this.props.onCompleteMove}
        onMouseEnter={this.toggleMoves}
        onMouseLeave={this.toggleMoves}
      >
        <span>{ this.props.digit.value }</span>
        {this.state.moves.map((move, i) =>
          <Move
            onClick={this.props.shouldInitMove ? this.props.onInitMove(move) : undefined}
            angle={(i - 1/4) * angleRatio}
            show={this.state.showMoves}
            move={move}
            key={i}
          />
        )}

      </div>
    )
  }
}
