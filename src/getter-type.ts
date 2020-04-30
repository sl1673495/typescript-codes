interface Option<S, G> {
  state: S;
  getters: {
    [K in keyof G]: (state: S) => G[K];
  };
}

interface Dispatch<G, T extends keyof G> {
  (type: T): G[T];
}

const create = <S, G, T extends keyof G>(
  option: Option<S, G>
): Dispatch<G, T> => {
  option;
  return (() => {}) as any;
};

const dispatch = create({
  state: {
    count: 1
  },
  getters: {
    countPlus(state) {
      return state.count + 1;
    }
  }
});

// number
const countPlus = dispatch("countPlus");

export { countPlus };
