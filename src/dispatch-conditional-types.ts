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


declare function dispatch(type: SimpleActionType): void
declare function dispatch<T extends ActionType>(type: Exclude<ActionType, SimpleActionType>, args: ExtractActionParameters<Action, T>): void
dispatch("SYNC")

dispatch("LOG_IN", {
  emailAddress: '123'
})

