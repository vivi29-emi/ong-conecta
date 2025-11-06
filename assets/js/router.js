export class Router {
  #routes = {};
  #notFound = () => {};

  register(path, handler) { this.#routes[path] = handler; }
  notFound(handler) { this.#notFound = handler; }

  start() {
    const go = () => {
      const hash = location.hash || '#/home';
      const route = hash.replace(/\?.*$/, '');
      (this.#routes[route] || this.#notFound)();
    };
    window.addEventListener('hashchange', go);
    go();
  }
}
