import Move from '../move'

export default class Divide extends Move {

  static getSymbol() { return '÷' }

  getRules() {
    return []
  }

  perform() {
    const {a, b} = this
    return Math.floor(a.value / b.value)
  }
}
