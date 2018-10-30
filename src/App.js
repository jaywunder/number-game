import React, { Component } from 'react';

import * as gameUtils from './game/util'
import GameDigit from './game/digit';
import AddMove from './game/moves/add'

import Digit from './components/Digit'

import './App.css';

const DEBOUNCE_PERIOD = 100

class App extends Component {

  constructor(...args) {
    super(...args)

    const digits = []
    for (var i = 0; i < 2; i++) {
      digits.push(new GameDigit(gameUtils.randomInt(), i, null))
    }

    this.state = {
      moves: [],
      currentMove: null,
      digits,
    }
  }

  addFirstTwoDigits = () => {
    const nextMove = new AddMove(this.state.digits[0], this.state.digits[1])

    nextMove.result.subscribe(() => this.debounceRerender()) // TODO: LOL THIS IS FUCKED UP AND BAD BUDDYYYY

    this.setState(({moves, digits}) => ({
      moves: moves.concat(nextMove),
      digits: [nextMove.result, ...digits],
    }))
  }

  regenerateDigit = digit => () => {
    digit.value = gameUtils.randomInt()
  }

  debounceRerender() {
    if (this.rerenderScheduled) return

    this.rerenderScheduled = true

    this.cancelRerender = setTimeout(() => {
      this.setState({...this.state})
      this.rerenderScheduled = false
    }, DEBOUNCE_PERIOD)
  }

  componentWillUnmount() {
    clearTimeout(this.cancelRerender)
  }

  handleInitMove = digit => Move => () => {
    console.log('digit', digit)
    console.log('Move', Move)
    console.log('INITIALIZING A MOVE', digit.id);
    this.setState({
      currentMove: { a: digit, Move }
    })
  }

  handleCompleteMove = digit => () => {
    console.log('COMPLETING A MOVE', digit.id);
    const {a, Move} = this.state.currentMove
    const b = digit

    const nextMove = new Move(a, b)
    nextMove.result.subscribe(() => this.debounceRerender()) // TODO: LOL THIS IS FUCKED UP AND BAD BUDDYYYY

    this.setState(({moves, digits}) => ({
      moves: moves.concat(nextMove),
      digits: digits.concat(nextMove.result),
      currentMove: null
    }))
  }

  render() {
    const {digits} = this.state
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.addFirstTwoDigits}>Add first two digits plxx</button>
          <button onClick={this.regenerateDigit(digits[digits.length - 1])}>regenerateDigit meh</button>
          <div className="digits">
            {this.state.digits.map((n, i) =>
              <span key={i}> {n.value} </span>
            )}
          </div>
        </header>
        <div
          className={
            'MathSpace' +
            (this.state.currentMove && 'move-initialized')
          }
        >
          {this.state.digits.map((digit, i) =>
            <Digit
              key={i}
              digit={digit}
              shouldInitMove={!this.state.currentMove}
              onInitMove={this.handleInitMove(digit)}
              onCompleteMove={this.handleCompleteMove(digit)}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
