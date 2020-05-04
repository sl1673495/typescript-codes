// map.ts
import { Observable } from "./module-augmentation-a";

declare module "./module-augmentation-a" {
  interface Observable<T> {
    map<U>(f: (x: T) => U): Observable<U>;
  }
}

let ob: Observable<number>;

ob.map;
