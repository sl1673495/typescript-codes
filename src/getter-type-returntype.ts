interface Option<G> {
  getters: G;
}

type GetterShape = { [K in PropertyKey]: (...args: any[]) => any };

type Store<G extends GetterShape> = {
  [K in keyof G]: ReturnType<G[K]>;
};

const create = <G extends GetterShape>(option: Option<G>): Store<G> => {
  return option as any;
};

const store = create({
  getters: {
    count() {
      return 1 + 1;
    },
    main() {
      return {
        a: 1,
        b: "2"
      };
    }
  }
});

// number
const count = store.count;

// { a: number, b: string }
const main = store.main;

export { count, main };
