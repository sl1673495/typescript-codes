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
type Head<Tuple extends any[]> = Tuple extends [infer Result, ...any[]]
  ? Result
  : never

type Func = (args: any) => any

type FirstParam<T extends Func> = Head<Parameters<T>>

type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]

type Connect<M> = {
  [K in FunctionKeys<M>]: Convert<M[K]>
} &
  {
    [K in Exclude<keyof M, FunctionKeys<M>>]: M[K]
  }

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
