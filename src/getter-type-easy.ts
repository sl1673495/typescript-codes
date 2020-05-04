interface Option<G> {
  getters: {
    [K in keyof G]: () => G[K];
  };
}

type Store<G extends {}> = {
  [K in keyof G]: G[K];
};

const create = <G>(option: Option<G>): Store<G> => {
  return {} as any;
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

export {};
