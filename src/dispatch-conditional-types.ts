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

type ExtractActionParameters<A, T> = A extends { type: T }
  // 这里也可以用Omit<A, "type">
  ? ExcludeTypeField<A>
  : never

declare function dispatch<T extends ActionType>(
  type: T,
  args: ExtractActionParameters<Action, T>,
): void

dispatch("LOG_IN", {
  emailAddress: "123",
})
