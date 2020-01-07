type MergeParameters<U> = (U extends any
? (k: U) => void
: never) extends (k: infer I) => void
  ? I
  : never

type F = {a: 1} | {b: 2}
type Merged = MergeParameters<F>
