type StringToTuple<
  S extends string,
  T extends string[] = []
> = S extends `${infer R}${infer Q}`
  ? "" extends Q
    ? [...T, R]
    : StringToTuple<Q, [...T, R]>
  : any;

type Head<T extends string> = T extends `${infer R}${infer Q}` ? R : never;

type Repeat<T extends string, C extends number> = C extends 0
  ? ""
  : StringToTuple<T>["length"] extends C
  ? T
  : Repeat<`${T}${Head<T>}`, C>;

type T = Repeat<"a", 3>;
