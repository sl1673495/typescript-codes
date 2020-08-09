// function merge
function buildLabel(name: string): string {
  return buildLabel.prefix + name + buildLabel.suffix;
}

namespace buildLabel {
  export const suffix = "";
  export const prefix = "Hello, ";
}

console.log(buildLabel("Sam Smith"));

// class merge
class Animal {
  name: string;
}

// 扩展静态属性
namespace Animal {
  export const name = "Animal";

  export function getName() {
    return name;
  }
}

let animal: Animal;

animal.name;
Animal.getName();

// 扩展实例属性
interface Animal {
  age: number;
}

animal.age;

// enmu merge
enum Color {
  red = 1,
  green = 2,
  blue = 4
}

namespace Color {
  export function mixColor(colorName: string) {
    if (colorName == "yellow") {
      return Color.red + Color.green;
    } else if (colorName == "white") {
      return Color.red + Color.green + Color.blue;
    } else if (colorName == "magenta") {
      return Color.red + Color.blue;
    } else if (colorName == "cyan") {
      return Color.green + Color.blue;
    }
  }
}

Color.mixColor("white");

export {}