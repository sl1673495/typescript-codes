// 抽象接口Loader
interface ILoader {
    file: string

    load(): string
}

// 还可以有其他不同的loader去实现ILoader
// 他们都可以灵活的注入到List组件中
class JSONLoader implements ILoader {
    public file: string

    constructor(file: string) {
        this.file = file
    }

    load() {
        return this.file
    }
}

export default class List {
    // 高层模块依赖底层模块的抽象
    loader: ILoader
    container: HTMLElement | null

    constructor(container: HTMLElement | null, loader: ILoader) {
        this.container = container;
        this.loader = loader;
    }

    async render() {
        this.container!.textContent = this.loader.load();
    }
}

let list = new List(document.getElementById('a'), new JSONLoader('list.json'));
list.render();