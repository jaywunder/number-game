export default class Digit {

  #value = null

  constructor(value, index, parentMove) {
    this.id = Math.random()
    this.index = index
    this.#value = value
    this.parentMove = parentMove
    this.listeners = []
  }

  get value() { return this.#value }
  set value(next) {
    this.#value = next
    this.listeners.map(fn => setTimeout(() => fn(this), 0))
  }

  subscribe(fn) {
    this.listeners.push(fn)
  }
}
