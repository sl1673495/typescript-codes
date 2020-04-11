// TypeScript 编译期计算: 选择属性
// https://zhuanlan.zhihu.com/p/102288466?utm_source=wechat_session&utm_medium=social&utm_oi=649356511948705792

// 选择非函数的属性
type DataFieldKeys<T> = {
  [P in keyof T]: T[P] extends Function ? never : P;
}[keyof T];

type DataFields<T> = {
  [P in DataFieldKeys<T>]?: T[P];
};

type Constructor<T> = new (...args: any[]) => T;

function createEntity<T>(clazz: Constructor<T>, init: DataFields<T>): T {
  const entity = new clazz();
  Object.assign(entity, init);
  return entity;
}

class Order {
  public createdAt: number;
  public lineItems: any[];
  public deliver() {}
}
createEntity(Order, { createdAt: new Date().getTime() });

export {};
