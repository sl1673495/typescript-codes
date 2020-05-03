type GetterShape = { [K in PropertyKey]: (...args: any[]) => any };

type Option<G extends GetterShape> = {
  getters: G;
};

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
    }
  }
});

// number
const count = store.count;

export { count };
