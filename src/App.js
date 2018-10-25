import React, { Component } from 'react';
import * as gameUtils from './game/util'
import Digit from './game/digit'
import Add from './game/moves/add'
import './App.css';

const DEBOUNCE_PERIOD = 100

class App extends Component {

  constructor(...args) {
    super(...args)

    const digits = []
    for (var i = 0; i < 2; i++) {
      digits.push(new Digit(gameUtils.randomInt(), i, null))
    }

    this.state = {
      moves: [],
      digits,
    }
  }

  addFirstTwoDigits = () => {
    const nextMove = new Add(this.state.digits[0], this.state.digits[1])

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
      </div>
    );
  }
}

export default App;
