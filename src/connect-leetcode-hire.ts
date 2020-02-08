/**
 * LeetCode 的一道 TypeScript 面试题
 * https://github.com/LeetCode-OpenSource/hire/blob/master/typescript_zh.md
 * 前段时间，在 GitHub 上，发现一道来自 LeetCode TypeScript 的面试题，比较有意思，题目的大致意思是：

 * 假设有一个这样的类型（原题中给出的是类，这里简化为 interface）：
 */

interface Action<T> {
  payload?: T
  type: string
}

/**
 * 经过Connect以后，要求返回值为
 * 
   type Result {
    asyncMethod<T, U>(input: T): Action<U>;
    syncMethod<T, U>(action: T): Action<U>;
  }
 */

type Func = (args: any) => any

// 通过infer操作符取出元组中的第一个参数类型
type Head<Tuple extends any[]> = Tuple extends [infer Result, ...any[]]
  ? Result
  : never

// 挑选出第一个参数
type FirstParam<T extends Func> = Head<Parameters<T>>

// 挑选出所有Function类型的key
type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]

// Connect核心实现 参数和结果的拆包
type Connect<M> = {
  // 对函数进行转换
  [K in FunctionKeys<M>]: Convert<M[K]>
} &
  // 除了函数以外的保留
  Omit<M, FunctionKeys<M>>

type Convert<M extends Func> = (arg: ConvertArg<M>) => ConvertReseult<M>

// 转换参数
type ConvertArg<M extends Func> = FirstParam<M> extends Promise<infer P>
  ? P
  : FirstParam<M> extends Action<infer A>
  ? A
  : FirstParam<M>

// 转换结果
type ConvertReseult<M extends Func> = ReturnType<M> extends Promise<infer P>
  ? P
  : ReturnType<M>

const EffectModule = {
  count: 1,
  message: "hello!",

  delay(input: Promise<number>) {
    return input.then(i => ({
      payload: `hello ${i}!`,
      type: "delay",
    }))
  },

  setMessage(action: Action<Date>) {
    return {
      payload: action.payload!.getMilliseconds(),
      type: "set-message",
    }
  },
}

// 函数实现
const connect = <M>(model: M): Connect<M> => {
  return model as any
}

const connected = connect(EffectModule)

// 类型测试通过
connected.count = 5
connected.message = "hello"
connected.setMessage(new Date()).type
connected.delay(5).type

export {}

type GetArrayMembers<T> = T extends Readonly<Array<infer V>> ? V : never
const example = [1, 2, 3] as const
type Members = GetArrayMembers<typeof example> // 1, 2, 3
