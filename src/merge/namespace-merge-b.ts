namespace Animals {
  export interface Legged {
    numberOfLegs: number;
  }

  export interface Create {
    (a: number): string;
  }

  // 在合并前的命名空间export出的变量 可以在合并后通过点操作符找到
  const has = Animals.haveMuscles;
}

// merged from a
Animals.Zebra;

let legged: Animals.Legged;

let create: Animals.Create;

// namespace里的函数interface重载成功
create(2);
create("2");

const haveMuscle = Animals.getHaveMuscles();
