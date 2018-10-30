import Digit from './digit'
import * as rules from './rules'

export default class Move {

  constructor(a, b) {
    this.id = Math.random()
    this.a = a
    this.b = b
    this.ruleStates = {}

    this.result = new Digit(null, this)
    Move.runPerform(this)

    a.subscribe(this.listenEither.bind(this))
    b.subscribe(this.listenEither.bind(this))

    for (let rule of this.getRules()) {
      this.ruleStates[rule.name] = rule(null)
    }
  }

  static runPerform(move) {
    if (!move.canPerform()) return
    move.result.value = move.perform()
  }

  static getSymbol() { return 'DEFAULT' }

  canPerform() {
    const {a, b} = this
    return this.getRules().reduce((rule, sum) => {
      const { nextState, allowed } = rule(this.ruleStates[rule.name], { a, b })
      this.ruleStates[rule.name] = nextState
      return sum && allowed
    }, true)
  }

  listenEither() {
    Move.runPerform(this)
  }

  perform() {return 0}

  getRules() {
    return [rules.exampleRule]
  }

  static childMovesOf(moves, number) {

  }
}
