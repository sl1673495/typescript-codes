/**
 * 虽然是两种相同的类型 但是却可以通过__brand这个技巧来实现类型保护
 */
type Brand<K, T> = K & { __brand: T };

type USD = Brand<number, "USD">;
type EUR = Brand<number, "EUR">;

const usd = 10 as USD;
const eur = 10 as EUR;

function gross(net: USD, tax: USD): USD {
  return (net + tax) as USD;
}

gross(usd, usd); // ok
gross(eur, usd); // Type '"EUR"' is not assignable to type '"USD"'.

/**
 * 通过类私有属性实现__brand
 */
class Currency<T extends string> {
  private as: T;
}

type USD2 = number & Currency<"USD">;
type EUR2 = number & Currency<"EUR">;

const usd2 = 10 as USD2;
const eur2 = 10 as EUR2;

function gross2(net: USD2, tax: USD2) {
  return (net + tax) as USD2;
}
gross2(usd2, usd2); // ok
gross2(eur2, usd2); // Type '"EUR"' is not assignable to type '"USD"'.

export {};
