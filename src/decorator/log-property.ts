class Person {
  @logProperty
  public name: string;
  public surname: string;
  constructor(name: string, surname: string) {
    this.name = name;
    this.surname = surname;
  }
}

function logProperty(target: any, key: string) {
  // 属性值
  let _val = this[key];
  // 属性 getter
  const getter = function() {
    console.log(`Get: ${key} => ${_val}`);
    return _val;
  };
  // 属性 setter
  const setter = function(newVal) {
    console.log(`Set: ${key} => ${newVal}`);
    _val = newVal;
  };
  // 从类原型中删除原始属性
  // 如果属性被成功删除
  // Object.defineProperty() 方法用于使用原始属性的名称创建一个新的属性
  if (delete this[key]) {
    // 使用 getter 和 setter 创建新属性
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  }
}

const person = new Person("ssh", "sh"); // Set: name => ssh
person.name; // Get: name => ssh
