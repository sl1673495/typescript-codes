type CreateStore<S, M> = (options: VuexOptions<S, M>) => VuexStore<S, M>;

interface VuexOptions<S, M> {
  state: S;
  mutation: Mutation<S, M>;
}

type Mutation<S, M> = {
  [K in keyof M]: (state: S, payload: any) => void;
};

type Commit<M> = (fsa: Fsa<M>) => void;

type Fsa<M> = { type: keyof M; payload: any };

type VuexStore<S, M> = {
  state: S;
  commit: Commit<M>;
};

function createStore<S, M>(options: VuexOptions<S, M>): VuexStore<S, M> {
  return {} as any;
}

const store = createStore({
  state: {
    count: 0,
    sum: 1
  },
  mutation: {
    add(state, payload: number) {
      state.count += payload;
    }
  }
});

store.commit({
  type: "add",
  payload: 5
});
