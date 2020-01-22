type IfEquals<X, Y, A=X, B=never> =
(<T>() => T extends X ? 1 : 2) extends
(<T>() => T extends Y ? 1 : 2) ? A : B;

type ReadonlyKeys<T> = {
[P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, never, P>
}[keyof T];

type A = {
  readonly a: string
  b: number
}

// "a"
type B = ReadonlyKeys<A>