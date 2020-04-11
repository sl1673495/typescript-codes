import "reflect-metadata";

function classDecorator(): ClassDecorator {
  return target => {
    // 在类上定义元数据，key 为 `classMetaData`，value 为 `a`
    Reflect.defineMetadata("classMetaData", "class", target);
  };
}

function Get(method: string): MethodDecorator {
  return (target, key, descriptor) => {
    // 在类的原型属性 'someMethod' 上定义元数据，key 为 `methodMetaData`，value 为 `b`
    Reflect.defineMetadata("methodMetaData", method, target, key);
  };
}

@classDecorator()
class SomeClass {
  @Reflect.metadata("inMethod", 123)
  someMethod(a: string, b: number): string {
    return a + b;
  }
}

@Reflect.metadata("inClass", "A")
class Test {
  @Reflect.metadata("inMethod", "B")
  public hello(): string {
    return "hello world";
  }
}
console.log(Reflect.getMetadata("inClass", Test)); // 'A'
console.log(Reflect.getMetadata("inMethod", new SomeClass(), "someMethod")); // 'B'

function logParamTypes(target: any, key: string) {
  const types = Reflect.getMetadata("design:paramtypes", target, key);
  const ret = Reflect.getMetadata("design:returntype", target, key);

  const s = types.map(a => a.name).join();
  console.log(`${key} param types: ${s}`);
  console.log(`${key} return type is ${ret.name}`);
}

class Foo {}
interface IFoo {}
class Demo {
  // 应用参数装饰器
  // 打印出：doSomething param types: String, Number, Foo, Object, Object, Function
  @logParamTypes
  doSomething(
    param1: string,
    param2: number,
    param3: Foo,
    param4: { test: string },
    param5: IFoo,
    param6: (a: number) => void
  ): number {
    return 1;
  }
}

// 所有的元数据都是存在于对象下面的 [[Metadata]] 属性下面，但是不是通过 Symbol 实现的：
@Reflect.metadata("name", "A")
class A {}

A;
