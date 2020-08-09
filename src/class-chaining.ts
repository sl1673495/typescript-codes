class PluginSlide {
  next() {}
  prev() {}
}

class BScroll {
  scroll() {}

  use<T>(pluginInstance: T): this & T {
    return Object.assign(this, pluginInstance);
  }
}

new BScroll().use(new PluginSlide()).next();
