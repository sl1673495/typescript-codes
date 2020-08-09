type PluginSlide = {
  next(): void;
  prev(): void;
};

type PickPlugin<T> = {
  [K in keyof T]: K extends "slide" ? PluginSlide : never;
}[keyof T];

class BScroll {
  scroll() {}

  use<T>(options: T): this & PickPlugin<T> {
    return {} as any;
  }
}

const basic = new BScroll();
