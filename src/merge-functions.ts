let a = () => ({ a: 1, b: 2 })
let b = () => ({ x: 1, y: 2 })
let c = () => ({ z: 1, k: 2 })


type TUnionToIntersection<U> = (
    U extends any ? (k: U) => void : never
) extends (k: infer I) => void
    ? I
    : never;

let merge = <T extends ((args: any) => any)[]>(...funcs: T): TUnionToIntersection<ReturnType<T[number]>> => {
    return {} as any
}
