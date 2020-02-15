import { injectable, inject } from "inversify";
import "reflect-metadata";
import { Weapon, ThrowableWeapon, Warrior } from "./interfaces";

@injectable()
export class Katana implements Weapon {
  public hit() {
    return "cut!";
  }
}

@injectable()
export class Shuriken implements ThrowableWeapon {
  public throw() {
    return "hit!";
  }
}

@injectable()
export class Ninja implements Warrior {
  public constructor(
    @inject(Weapon) protected katana: Weapon,
    @inject(ThrowableWeapon) protected shuriken: ThrowableWeapon
  ) {}

  public fight() {
    return this.katana.hit();
  }
  public sneak() {
    return this.shuriken.throw();
  }
  public eat() {
    console.log("eat");
  }
}
