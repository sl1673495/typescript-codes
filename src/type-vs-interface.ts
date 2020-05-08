// ================= type alias ===============
type Point = {
  x: number;
  y: number;
};

// 别名可以声明方法类型
type SetPoint = (x: number, y: number) => void;

// 类可以实现类型别名
class PointY implements Point {
  x: number;
  y: number;
  z: number;
}

// 接口可以继承类型别名
interface PointZ extends Point {
  z: number;
}

// ================= interface ===============
interface PointI {
  x: number;
  y: number;
}

// interface可以扩展字段（哪怕跨文件也可以扩展）
interface PointI {
  o: string | number;
}

// 类可以实现接口
class PointYI implements PointI {
  x: number;
  y: number;
  o: number;
}

// 接口可以继承接口
interface PointZI extends PointI {
  z: number;
}

// 接口可以声明方法类型
interface SetPointI<T> {
  (x: T, y: T): void;
}

// ================= diffrence ===============

// 别名可以声明联合类型 而interface不行
type PointMixin = Point & {
  o: number;
};

// 别名继承别名 需要用联合类型
type PointModel = Point & SetPoint;
