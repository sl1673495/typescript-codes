namespace Animals {
  export const haveMuscles = true;

  export class Zebra {}

  export class Dog {}

  export interface Create {
    (a: string): number;
  }

  // 仅能在当前namespace里使用haveMuscles变量
  export function getHaveMuscles() {
    return haveMuscles;
  }
}
