import Move from '../move'

export default class Subtract extends Move {

  getRules() {
    return []
  }

  perform() {
    const {a, b} = this
    return a.value - b.value
  }
}
