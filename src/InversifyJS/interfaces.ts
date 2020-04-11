// 定义服务对象标识
export const Warrior = Symbol.for("Warrior");
export const Weapon = Symbol.for("Weapon");
export const ThrowableWeapon = Symbol.for("ThrowableWeapon");

export interface Warrior {
  fight(): string;
  sneak(): string;
  eat(): void;
}

export interface Weapon {
  hit(): string;
}

export interface ThrowableWeapon {
  throw(): string;
}
