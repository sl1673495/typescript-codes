// 抽象接口Loader
interface Loader {
  file: string;

  load(): string;
}

// 还可以有其他不同的loader去实现ILoader
// 他们都可以灵活的注入到List组件中
class JSONLoader implements Loader {
  public file: string;

  constructor(file: string) {
    this.file = file;
  }

  load() {
    return this.file;
  }
}

export default class List {
  // 高层模块依赖底层模块的抽象
  loader: Loader;
  container: HTMLElement | null;

  constructor(container: HTMLElement | null, loader: Loader) {
    this.container = container;
    this.loader = loader;
  }

  async render() {
    this.container.textContent = this.loader.load();
  }
}

const list = new List(
  document.getElementById("a"),
  new JSONLoader("list.json")
);
list.render();
