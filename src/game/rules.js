export function exampleRule(state = {}, action) {
  // this rule allows any move
  return {
    nextState: state,
    allowed: true,
  }
}
