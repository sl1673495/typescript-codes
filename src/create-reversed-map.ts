type AnyObject = Record<string, any>;

type PickKey<T extends AnyObject, K> = {
  [Key in keyof T]: T[Key] extends K ? Key : never;
}[keyof T];

type Reversed<T extends AnyObject> = {
  [V in T[keyof T]]: PickKey<T, V>;
};
/**
 * 将对象的 key -> value 倒置 适合反向查找的场景
 *
 * @example
 * const obj = { foo: 'bar' } as const
 * createReversedMap(obj) // { bar: 'foo' }
 */
export const createReversedMap = <T extends {}>(obj: T): Reversed<T> => {
  const ret = {} as Reversed<T>;
  if (!obj || typeof obj !== "object") {
    return ret;
  }
  Object.keys(obj).forEach((key) => {
    const val = obj[key];
    ret[val] = key;
  });
  return ret;
};
