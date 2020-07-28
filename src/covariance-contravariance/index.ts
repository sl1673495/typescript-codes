interface SuperType {
  base: string;
}
interface SubType extends SuperType {
  addition: string;
}
let sup: SuperType;
let sub: SubType;

sup = sub;

// subtype compatibility
let superType: SuperType = { base: "base" };
const subType: SubType = { base: "myBase", addition: "myAddition" };
superType = subType;
// Covariant
type Covariant<T> = T[];
let coSuperType: Covariant<SuperType> = [];
const coSubType: Covariant<SubType> = [];
coSuperType = coSubType;

// Contravariant --strictFunctionTypes true
type Contravariant<T> = (p: T) => void;
const contraSuperType: Contravariant<SuperType> = function(p) {
  p.base;
};
let contraSubType: Contravariant<SubType> = function(p) {
  p.base;
  p.addition;
};
contraSubType = contraSuperType;

// Bivariant --strictFunctionTypes false
type Bivariant<T> = (p: T) => void;
let biSuperType: Bivariant<SuperType> = function(p) {};
let biSubType: Bivariant<SubType> = function(p) {};
// both are ok
biSubType = biSuperType;
biSuperType = biSubType;

// Invariant --strictFunctionTypes true
type Invariant<T> = { a: Covariant<T>; b: Contravariant<T> };
let inSuperType: Invariant<SuperType> = { a: coSuperType, b: contraSuperType };
let inSubType: Invariant<SubType> = { a: coSubType, b: contraSubType };
// both are not ok
inSubType = inSuperType;
inSuperType = inSubType;
