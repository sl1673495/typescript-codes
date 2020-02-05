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

// 把类型中key为"type"去掉
type ExcludeTypeField<A> = { [K in Exclude<keyof A, "type">]: A[K] }

// 把参数对象中的type去掉
// Extract<A, { type: T }会挑选出能extend { type: T }这个结构的Action中的类型
type ExtractActionParameters<A, T> = ExcludeTypeField<Extract<A, { type: T }>>

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

export {}