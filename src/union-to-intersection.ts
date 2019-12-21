type MergeParameters<U> = (U extends any
? (k: U) => void
: never) extends (k: infer I) => void
  ? I
  : never;

type F = { a: 1 } | { b: 2 };
let f = (a: F) => 1
type P = Parameters<typeof f>;

type Merged = MergeParameters<F>;
