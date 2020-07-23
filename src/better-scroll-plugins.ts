import { UnionToIntersection } from 'utility-types';

interface Slide {
    name: 'slide';
    next(): void;
}

interface Pullup {
    name: 'pullup';
    prev(): void;
}

type StringOnly<T> = T extends string ? T : any

type Keys<T extends { name: string }> = T extends { name: infer A } ? { [P in StringOnly<A>]: T } : never

type Options<Plugins extends { name: string }> = UnionToIntersection<Keys<Plugins>>

class BS<P extends { name: string }> {
    plugins: Options<P> = {} as any
}

new BS<Slide | Pullup>().plugins.slide.next()