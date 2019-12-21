import { Container } from "inversify";
import { Warrior, Weapon, ThrowableWeapon } from "./interfaces";
import { Ninja, Katana, Shuriken } from "./entities";

const myContainer = new Container();
myContainer.bind<Warrior>(Warrior).to(Ninja);
myContainer.bind<Weapon>(Weapon).to(Katana);
myContainer.bind<ThrowableWeapon>(ThrowableWeapon).to(Shuriken);

export { myContainer };