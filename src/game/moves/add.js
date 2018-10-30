import Move from '../move'

export default class Add extends Move {

  static getSymbol() { return '+' }

  getRules() {
    return []
  }

  perform() {
    const {a, b} = this
    return a.value + b.value
  }
}
