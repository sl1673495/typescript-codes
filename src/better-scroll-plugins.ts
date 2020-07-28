import { UnionToIntersection } from "utility-types";

interface Slide {
  name: "slide";
  next(): void;
}

interface Pullup {
  name: "pullup";
  prev(): void;
}

type StringOnly<T> = T extends string ? T : any;

type Keys<T extends { name: string }> = T extends { name: infer A }
  ? { [P in StringOnly<A>]: T }
  : never;

type Options<Plugins extends { name: string }> = UnionToIntersection<
  Keys<Plugins>
>;

class BS<P extends { name: string }> {
  plugins: Options<P> = {} as any;
}

new BS<Slide | Pullup>().plugins.slide.next();

// 最终采用的方案：
type BSOptions = {
  el: string;
};

type BSInstance = {
  scroll(): void;
};

type PluginSlide = {
  next(): void;
  prev(): void;
};

type PluginPullUp = {
  refresh(): void;
};

type PluginMap = {
  slide: PluginSlide;
  pullUp: PluginPullUp;
};

type WithPlugins<O> = {
  [K in keyof O]: K extends keyof PluginMap ? PluginMap[K] : never;
}[keyof O];

function createBS<O = {}>(
  options: BSOptions & O
): UnionToIntersection<WithPlugins<O>> & BSInstance {
  return options as any;
}

let bs = createBS({
  el: "e",
  slide: true,
  pullUp: true,
});

bs.refresh;
bs.next;
bs.scroll;