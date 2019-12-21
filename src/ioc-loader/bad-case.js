
export default class Loader {
    constructor(url) {
        this.url = url;
    }

    async load() {
        let result = await fetch(this.url);
        return result.text();
    }
}

export default class List {
    constructor(container) {
        this.container = container;
        // ERROR! 高层次的模块不应该依赖于低层次的模块，他们都应该依赖于抽象
        this.loader = new Loader('list.json');
    }

    async render() {
        let items = await this.loader.load();
        this.container.textContent = items;
    }
}

// loader已经在内部写死了 不能再替换
let list = new List(document.getElementById('a'));
List.render();