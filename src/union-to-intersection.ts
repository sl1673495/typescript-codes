type MergeParameters<U> = (U extends any
? (k: U) => void
: never) extends (k: infer I) => void
  ? I
  : never;

// 应用在mixin上
type Ctor<T> = { new (...args: any[]): T };
declare function mixin<T extends Ctor<any>[]>(
  ...traits: T
): Ctor<UnionToIntersection<InstanceType<T[number]>>>;

class Flyable {
  fly() {}
}
class Walkable {
  walk() {}
}

class Mixed extends mixin(Flyable, Walkable) {
  test() {
    this.fly(); // ok
    this.walk(); // ok
  }
}
