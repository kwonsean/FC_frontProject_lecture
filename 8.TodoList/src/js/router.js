export class Router {
  routes = [];
  notFoundCallback = () => {};

  addRoute(url, callback) {
    this.routes.push({ url, callback });
    return this;
  }

  checkRoute = () => {
    const currentRoute = this.routes.find(
      route => route.url === window.location.hash,
    );
    if (!currentRoute) {
      this.notFoundCallback();
      return;
    }
    currentRoute.callback();
  };

  init() {
    window.addEventListener('hashchange', this.checkRoute);
    if (!window.location.hash) {
      window.location.hash = '#/';
    }
    this.checkRoute();
  }

  setNotFound(callback) {
    this.notFoundCallback = callback;
    return this;
  }
}
