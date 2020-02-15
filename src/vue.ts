type DataReturn<D> = {
  [Key in keyof D]: D[Key];
};

type Data<D> = () => DataReturn<D>;

type Computed<C, D> = {
  [Key in keyof C]: () => C[Key];
};

type Methods<M> = {
  [Key in keyof M]: M[Key];
};

interface Config<D, C> {
  data: Data<D>;
  computed: Computed<C, D>;
}

declare function vue<D, C>(config: Config<D, C>): D & C;

const vm = vue({
  data() {
    return {
      age: 1
    };
  },
  computed: {
    count() {
      return vm.age + 1;
    }
  }
});
