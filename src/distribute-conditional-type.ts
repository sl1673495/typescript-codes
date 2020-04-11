// https://stackoverflow.com/questions/55382306/typescript-distributive-conditional-types

/**
 * Distributive conditional types are automatically distributed over union types during instantiation.
 * For example, an instantiation of T extends U ? X : Y with the type argument A | B | C for T
 * is resolved as (A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y).
 */

/**
 * 分布式条件类型生效的前提是：
 *
 * 1. 传入泛型的是 「联合类型」
 * 2. 泛型直接放在 「extends」 前面
 *
 * 不能有包装 如 { x: T } extends ? string ? T : 'no'
 * 不能倒置 如 string extends T ? string ? T : 'no'
 * 必须是 type A<T> = T extends string ? T : 'no'
 * 这样 type<'a' | 'b' | 2> 就会经历
 * ('a' extends string ? 'a' : 'no') | 'b' extends string ? 'b' : 'no' | 2 extends string ? 2: 'no'
 * 最终计算出 'a' | 'b' | 'no'
 */

// ❌ 这不是分布式条件类型 因为 T 在 extends 后面
type A<T> = string extends T ? "yes" : "no"

// ❌ 这不是分布式条件类型 因为 T 不是 naked type 它被用 { x: T } 给包裹起来了
type B<T> = { x: T } extends { x: number } ? "yes" : "no"

// ✅ 这是分布式条件类型 因为 T “裸”的直接跟在 extends 前面
type C<T> = T extends number ? "yes" : "no"

type Union = 1 | "2"

// 'no'
type TestB = B<Union>

// ✅ 一种比较hack的方式实现，虽然 T 在 extends 之前，但是仅仅是一句废话。
// 因为任何东西 extends any 都是 true
// 然而 TS 还是会按照分布式条件类型来解析。
// 达到了 type B 的真正目的
type FixB<T> = T extends {}
  ? { x: T } extends { x: number }
    ? "yes"
    : "no"
  : never

// 'yes' | 'no'
type TestFixB = FixB<Union>
