type Ref<T> = {
  value: T;
};

const ref = <T>(value: T) => {
  return {
    value
  } as UnwrapRef<Ref<T>>;
};

const count = ref(ref(ref(2)));

count.value;

type UnwrapNestedRef<T> = {
  ref: T extends Ref<infer V> ? UnwrapNestedRef<V> : T;
  normal: T;
}[T extends Ref<any> ? "ref" : "normal"];

type UnwrapRef<T> = T extends Ref<infer V>
  ? V extends Ref<any>
    ? UnwrapNestedRef<V>
    : Ref<V>
  : T;
