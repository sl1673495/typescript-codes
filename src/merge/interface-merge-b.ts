// interface合并必须保证某个 key 的类型是独一无二的
// 可以有重复的 key 但类型必须与合并前相同
interface Box {
  scale: number;
  create(a: number): number;
}

// 和a文件里的合并了
const box: Box = {
  height: 5,
  width: 6,
  scale: 10,
  create(a) {
    return a;
  }
};

// 函数重载合并成功
box.create(2);
box.create("2");
