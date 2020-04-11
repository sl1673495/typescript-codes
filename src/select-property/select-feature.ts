type Feature<A, R> = ((arg: A) => R) & { __IS_FEATURE__?: true };

type FeatureKeys<T> = {
  [P in keyof T]: T[P] extends { __IS_FEATURE__?: true } ? P : never;
}[keyof T];

type Features<T, K extends keyof T> = {
  [P in FeatureKeys<T> & K]: T[P];
};

type RolePlayer<T, K extends FeatureKeys<T>> = Features<T, K>;

class Order {
  public checkout: Feature<number, boolean>;
  public pay: Feature<string, boolean>;
  public hello(abc: string) {
    return false;
  }
}

class CommonPurchase implements RolePlayer<Order, "checkout" | "pay"> {
  public checkout(arg: number) {
    return false;
  }
  public pay(arg: string) {
    return false;
  }
  public hello(abc: number) {
    return true;
  }
}
