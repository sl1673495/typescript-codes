interface Item {
  id: number;
  parentId: number;
  name: string;
}

type TreeItem<T extends string> = Item &
  {
    [key in T]: TreeItem<T>[] | [];
  };

interface Options<T extends string> {
  // 限制为 string 类型
  childrenKey?: T;
}

declare function listToTree<T extends string = "children">(
  list: Item[],
  options?: Options<T>
): TreeItem<T>[];

// key children
const tree = listToTree([{ id: 1, parentId: 0, name: "test1" }]);
tree[0].children.map;

// key childrenList
const tree2 = listToTree([{ id: 1, parentId: 0, name: "test1" }], {
  childrenKey: "childrenList"
});
tree2[0].childrenList.map;
