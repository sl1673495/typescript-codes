import "reflect-metadata";

class Person2 {
  public name: string;
  public surname: string;
  constructor(name: string, surname: string) {
    this.name = name;
    this.surname = surname;
  }
  public saySomething(
    @logParameter something: string,
    @logParameter other: number
  ): string {
    return this.name + " " + this.surname + " says: " + something;
  }
}

function logParameter(target: any, key: string, index: number) {
  const paramTypes = Reflect.getMetadata("design:paramtypes", target, key);
  const type = paramTypes[index];

  console.log(`param ${index} type is [${type.name}]`);
}
