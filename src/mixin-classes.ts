// 1. Mixins
class User {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

type Constructor<T = {}> = new (...args: any[]) => T;

function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  };
}

// 2. Mixins with a Constructor
function Tagged<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    tag: string | null;

    constructor(...args: any[]) {
      super(...args);
      this.tag = null;
    }
  };
}

// Create a new class by mixing `Tagged` into `User`
const TaggedUser = Tagged(User);

// We can now assign values to any property defined in either
// the `User` class or our `Tagged` mixin in a type-safe manner.
// TypeScript will type-check those assignments!
const user2 = new TaggedUser("John Doe");
user2.name = "Jane Doe";
user2.tag = "janedoe";

// 3. Mixins with Methods

function Activatable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    isActivated = false;

    activate() {
      this.isActivated = true;
    }

    deactivate() {
      this.isActivated = false;
    }
  };
}

const ActivatableUser = Activatable(User);

// Instantiate the new `ActivatableUser` class
const user3 = new ActivatableUser("John Doe");

// Initially, the `isActivated` property is false
console.log(user3.isActivated);

// Activate the user
user3.activate();

// Now, `isActivated` is true
console.log(user3.isActivated);

// 4. Composing Multiple Mixins
const SpecialUser = Activatable(Tagged(Timestamped(User)));
const user = new SpecialUser("John Doe");

export {};
