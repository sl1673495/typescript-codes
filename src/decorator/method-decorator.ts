class C {
  @logMethod
  foo(n: number) {
    return n * 2;
  }
}

/**
 *
 * @param target 被注解的方法
 * @param key 被注解方法的名字
 * @param value
 * 属性的描述，如果这个属性不存在于对象上则为 undefined
 * 可以通过 Object.getOwnPropertyDescriptor() 函数获得
 */
function logMethod(target: any, key: string, value: any) {
  // target === C.prototype
  // key === "foo"
  // value === Object.getOwnPropertyDescriptor(C.prototype, "foo")
  return {
    value(...args: any[]) {
      // 将 foo 参数列表转换为字符串
      const a = args.map(a => JSON.stringify(a)).join();
      // 调用 foo() 并获取其返回值
      const result = value.value.apply(this, args);
      // 将结果转换为字符串
      const r = JSON.stringify(result);
      // 在控制台中显示函数调用详细信息
      console.log(`Call: ${key}(${a}) => ${r}`);
      // 返回调用 foo 的结果
      return result;
    }
  };
}

new C().foo(2); // Call: foo(2) => 4
