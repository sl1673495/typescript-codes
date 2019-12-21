import 'reflect-metadata';

function classDecorator(): ClassDecorator {
  return target => {
    // 在类上定义元数据，key 为 `classMetaData`，value 为 `a`
    Reflect.defineMetadata('classMetaData', 'class', target);
  };
}

function Get(method: string): MethodDecorator {
  return (target, key, descriptor) => {
    // 在类的原型属性 'someMethod' 上定义元数据，key 为 `methodMetaData`，value 为 `b`
    Reflect.defineMetadata('methodMetaData', method, target, key);
  };
}

@classDecorator()
class SomeClass {
  @Get('a')
  someMethod(a: string,b: number): string {
    return a + b
  }
}

console.log(
  Reflect.getMetadata('design:paramtypes', new SomeClass(), 'someMethod'),
  Reflect.getMetadata('design:returntype', new SomeClass(), 'someMethod'),
  Reflect.getMetadata('design:type', new SomeClass(), 'someMethod'),
);
