/**
 * 如果泛型中有一部分是自动推导的，那么就不能再另外定义手动传入的泛型了。
 * 只能暂时用高阶函数的方式把两个泛型拆开，本例中 T 是自动推导得出，E 是手动传入。
 */
function createWithExtra<E>() {
  return function<T>(obj: T) {
    return obj as T & {
      extra: E;
    };
  };
}

const obj = createWithExtra<{ a: 1 }>()({ foo: "bar" });
