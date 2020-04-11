import "reflect-metadata";

const isConstructor = (val: any): boolean => {
  return !!val.caller;
};

const isFunction = (val: any): val is Function => {
  return typeof val === "function";
};

// Controller.js
const METHOD_METADATA = "method";
const PATH_METADATA = "path";
const Controller = (path: string): ClassDecorator => {
  return target => {
    Reflect.defineMetadata(PATH_METADATA, path, target);
  };
};
const createMappingDecorator = (method: string) => (
  path: string
): MethodDecorator => {
  return (target, key, descriptor) => {
    Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
    Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value);
  };
};
const Get = createMappingDecorator("GET");
const Post = createMappingDecorator("POST");

function mapRoute(instance: Record<string, any>) {
  const prototype = Object.getPrototypeOf(instance);
  // 筛选出类的 methodName
  const methodsNames = Object.getOwnPropertyNames(prototype).filter(
    item => !isConstructor(item) && isFunction(prototype[item])
  );
  return methodsNames.map(methodName => {
    const fn = prototype[methodName];
    // 取出定义的 metadata
    const route = Reflect.getMetadata(PATH_METADATA, fn);
    const method = Reflect.getMetadata(METHOD_METADATA, fn);
    return {
      route,
      method,
      fn,
      methodName
    };
  });
}

// app.js
@Controller("/test")
class SomeClass {
  @Get("/a")
  someGetMethod() {
    return "hello world";
  }
  @Post("/b")
  somePostMethod() {}
}

console.log("mapRoutes", mapRoute(new SomeClass()));
