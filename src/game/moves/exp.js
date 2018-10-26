import Move from '../move'

export default class Exp extends Move {

  getRules() {
    return []
  }

  perform() {
    const {a, b} = this
    return Math.pow(a.value, b.value)
  }
}
