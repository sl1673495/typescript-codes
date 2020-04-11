/**
 * For optional properties,
 * you can indeed detect them and therefore extract or exclude them.
 * The insight here is that {} extends {a?: string},
 * but {} does not extend {a: string} or even {a: string | undefined}.
 * Here's how you could build a way to remove optional properties from a type
 */

type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K;
}[keyof T];

type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends { [P in K]: T[K] } ? K : never;
}[keyof T];

type ExcludeOptionalProps<T> = Pick<T, RequiredKeys<T>>;

type I3 = {
  a: string;
  b?: number;
  c: boolean | undefined;
};

type OP = OptionalKeys<I3>;
type RQ = RequiredKeys<I3>;
