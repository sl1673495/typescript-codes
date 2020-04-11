// ['1','2','3'] -> ['2','3']
type Tail<Tuple extends any[]> = ((...args: Tuple) => void) extends (
  a: any,
  ...args: infer T
) => void
  ? T
  : never;
// ['1','2','3'] -> '1'
type Head<Tuple extends any[]> = Tuple extends [infer Result, ...any[]]
  ? Result
  : never;
// (['2','3'],'1') -> ['1','2','3']
type Unshift<Tuple extends any[], Element> = ((
  a: Element,
  ...args: Tuple
) => void) extends (...args: infer T) => void
  ? T
  : never;

type T1 = Tail<[1, 2, 3]>;

type T2 = Head<[1, 2, 3]>;

type T3 = Unshift<["2", "3"], "1">;
