import Move from '../move'

export default class Subtract extends Move {

  static getSymbol() { return '–' }

  getRules() {
    return []
  }

  perform() {
    const {a, b} = this
    return a.value - b.value
  }
}
