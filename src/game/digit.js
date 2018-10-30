export default class Digit {

  #value = null
  #listeners = []

  constructor(value, index, parentMove) {
    this.id = Math.random()
    this.#value = value
    this.parentMove = parentMove
  }

  get value() { return this.#value }
  set value(next) {
    this.#value = next
    this.#listeners.map(fn => setTimeout(() => fn(this), 0))
  }

  toDigits() {
    const digits = []
    for (let i = 10; i < this.value && i < 1000; i *= 10) {
      digits.push(Math.floor(this.value / (i / 10) % i))
    }
    return digits
  }

  subscribe(fn) {
    this.#listeners.push(fn)
  }
}
