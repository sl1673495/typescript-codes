type InitStateKey = 'initialState'

type StateMationDefinition<T extends string> = {
  initialState: T
  transform: {
    [K in T]: MachineOption<T>
  }
}

type MachineOption<T extends string> = {
  actions: {
    onEnter?: () => any
    onExit?: () => any
  }
  transitions?: {
    switch?: {
      target: T
      action?: () => any
    }
  }
}

function createMachine<T extends string>(
  stateMachineDefinition: StateMationDefinition<T>,
) {
  const machine = {
    value: stateMachineDefinition.initialState,
    transition(currentState, event) {
      const currentStateDefinition = stateMachineDefinition.transform[currentState]
      const destinationTransition = currentStateDefinition.transitions[event]
      if (!destinationTransition) {
        return
      }
      const destinationState = destinationTransition.target
      const destinationStateDefinition =
        stateMachineDefinition.transform[destinationState]
      destinationTransition.action()
      currentStateDefinition.actions.onExit()
      destinationStateDefinition.actions.onEnter()
      machine.value = destinationState
      return machine.value
    },
  }
  return machine
}

const machine = createMachine({
  initialState: 'off',
  transform: {
    off: {
      actions: {
        onEnter() {
          console.log('off: onEnter')
        },
        onExit() {
          console.log('off: onExit')
        },
      },
      transitions: {
        switch: {
          target: 'on',
          action() {
            console.log('transition action for "switch" in "off" state')
          },
        },
      },
    },
    on: {
      actions: {
        onEnter() {
          console.log('on: onEnter')
        },
        onExit() {
          console.log('on: onExit')
        },
      },
      transitions: {
        switch: {
          target: 'off',
          action() {
            console.log('transition action for "switch" in "on" state')
          },
        },
      },
    },
  },
})

let state = machine.value
console.log(`current state: ${state}`)
state = machine.transition(state, 'switch')
console.log(`current state: ${state}`)
state = machine.transition(state, 'switch')
console.log(`current state: ${state}`)