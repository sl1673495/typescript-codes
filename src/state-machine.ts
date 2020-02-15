type InitStateKey = "initialState";

type StateMationDefinition<T extends string, K extends string> = {
  initialState: T;
} & {
  [Key in T]: MachineOption<T, K>;
};

type MachineOption<T, K extends string> = {
  actions: {
    onEnter: () => any;
    onExit: () => any;
  };
  transitions: {
    [Key in K]: {
      target: T;
      action: () => any;
    };
  };
};

function createMachine<T extends string, K extends string>(
  stateMachineDefinition: StateMationDefinition<T, K>
) {
  const machine = {
    value: stateMachineDefinition.initialState,
    transition(currentState: T, event: string) {
      const currentStateDefinition = stateMachineDefinition[currentState];
      const destinationTransition = currentStateDefinition.transitions[event];
      if (!destinationTransition) {
        return;
      }
      const destinationState = destinationTransition.target;
      const destinationStateDefinition =
        stateMachineDefinition[destinationState];
      destinationTransition.action();
      currentStateDefinition.actions.onExit();
      destinationStateDefinition.actions.onEnter();
      machine.value = destinationState;
      return machine.value;
    }
  };
  return machine;
}

type Types = "on" | "off";
type Transitions = "switch";
const machine = createMachine<Types, Transitions>({
  initialState: "off",
  off: {
    actions: {
      onEnter() {
        console.log("off: onEnter");
      },
      onExit() {
        console.log("off: onExit");
      }
    },
    transitions: {
      switch: {
        target: "on",
        action() {
          console.log('transition action for "switch" in "off" state');
        }
      }
    }
  },
  on: {
    actions: {
      onEnter() {
        console.log("on: onEnter");
      },
      onExit() {
        console.log("on: onExit");
      }
    },
    transitions: {
      switch: {
        target: "off",
        action() {
          console.log('transition action for "switch" in "on" state');
        }
      }
    }
  }
});

let state = machine.value;
console.log(`current state: ${state}`);
state = machine.transition(state, "switch");
console.log(`current state: ${state}`);
state = machine.transition(state, "switch");
console.log(`current state: ${state}`);
