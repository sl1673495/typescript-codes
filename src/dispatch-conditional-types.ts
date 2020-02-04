// https://artsy.github.io/blog/2018/11/21/conditional-types-in-typescript/

type Action =
  | {
      type: "INIT"
    }
  | {
      type: "SYNC"
    }
  | {
      type: "LOG_IN"
      emailAddress: string
    }
  | {
      type: "LOG_IN_SUCCESS"
      accessToken: string
    }

// 用类型查询查出Action中所有type的联合类型
type ActionType = Action["type"]

// 把传入的联合类型中"type"类型去除掉
type ExcludeTypeKey<K> = K extends "type" ? never : K

// 把类型中key为"type"去掉
type ExcludeTypeField<A> = {
  [K in ExcludeTypeKey<keyof A>]: A[K]
}

// 把参数对象中的type去掉
type ExtractActionParameters<A, T> = A extends { type: T }
  ? ExcludeTypeField<A> // 这里也可以用Omit<A, "type">
  : never

type ExtractSimpleAction<A> = A extends any
  ? {} extends ExcludeTypeField<A>
    ? A
    : never
  : never

type SimpleActionType = ExtractSimpleAction<Action>["type"]
type ComplexActionType = Exclude<ActionType, SimpleActionType>

// 简单参数类型
function dispatch<T extends SimpleActionType>(type: T): void
// 复杂参数类型
function dispatch<T extends ComplexActionType>(
  type: T,
  args: ExtractActionParameters<Action, T>,
): void
// 实现
function dispatch(arg: any, payload?: any) {}

dispatch("SYNC")

dispatch("INIT")

dispatch("LOG_IN_SUCCESS", {
  accessToken: "123",
})

dispatch("LOG_IN", {
  emailAddress: "123",
})

export { dispatch }
