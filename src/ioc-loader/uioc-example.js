import {IoC} from 'uioc';

const config = {
    listA: {
        creator: List,
        args: [document.getElementById('a'), {$ref: 'loader'}]
    },
    listB: {
        creator: List,
        args: [document.getElementById('b'), {$ref: 'thirdLoader'}]
    },
    loader: {
        creator: Loader,
        args: ['list.json']
    },
    thirdLoader: {
        creator: ThirdLoader
    }
};

let ioc = new IoC(config);

// 获取应用初始化需要的组件
ioc.getComponent(['listA', 'listB']).then(([listA, listB]) => {
    listA.render();
    listB.render();
});