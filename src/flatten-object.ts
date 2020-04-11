// https://zhuanlan.zhihu.com/p/91144493
// 挑选出非对象的字段
type NonObjectPropKeys<T> = {
  [K in keyof T]: T[K] extends any[] ? K : T[K] extends object ? never : K
}[keyof T]

// 选出非对象的 {字段: 属性}
type NonObjectPicks<T> = Pick<T, NonObjectPropKeys<T>>

type Obj<T> = T extends object ? T : never

type Values<T> = T[keyof T]

// 只挑选嵌套层级的
type DeepValues<T> = Obj<Values<T>>

type ComposedValues<T> = NonObjectPicks<T> & UnionToIntersection<DeepValues<T>>

const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
  },
  d: {
    h: [],
    g: {
        s: 3
    }
  },
}

type T = ComposedValues<typeof obj>

export {}