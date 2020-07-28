class BasicCalculator {
  public constructor(protected value: number = 0) {}
  public currentValue(): number {
    return this.value;
  }
  public add(operand: number): this {
    this.value += operand;
    return this;
  }
  public multiply(operand: number): this {
    this.value *= operand;
    return this;
  }
  // ... other operations go here ...
}

let v = new BasicCalculator(2)
  .multiply(5)
  .add(1)
  .currentValue();

class ScientificCalculator extends BasicCalculator {
  public constructor(value = 0) {
    super(value);
  }
  public sin() {
    this.value = Math.sin(this.value);
    return this;
  }
  // ... other operations go here ...
}

// 由于 BasicCalculator 中的 multiply 方法返回的是 this 类型
// 才使得返回的实例可以调用 ScientificCalculator 中的 sin 方法
let v2 = new ScientificCalculator(2)
  .multiply(5)
  .sin()
  .add(1)
  .currentValue();
