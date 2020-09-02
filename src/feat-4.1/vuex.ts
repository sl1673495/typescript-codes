type VuexOptions<M, N> = {
  namespace?: N,
  mutations: M,
}

type Action<M, N> = N extends string ? `${N}/${keyof M & string}` : keyof M

type Store<M, N> = {
  dispatch(action: Action<M, N>): void
}

declare function Vuex<M, N>(options: VuexOptions<M, N>): Store<M, N>

const store = Vuex({
  namespace: "cart" as const,
  mutations: {
     add() { },
     remove() { }
  }
})

store.dispatch("cart/add")
store.dispatch("cart/remove")