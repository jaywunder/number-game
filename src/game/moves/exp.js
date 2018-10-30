import Move from '../move'

export default class Exp extends Move {

  static getSymbol() { return '^' }

  getRules() {
    return []
  }

  perform() {
    const {a, b} = this
    return Math.pow(a.value, b.value)
  }
}
