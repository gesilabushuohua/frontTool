window.onload = function() {
  const pathList = ['a', 'b', 'c', 'd'];
  const router = new Router(pathList);
  router.init();
  const nav = document.getElementById('nav');
  nav.addEventListener('click', function onNavClick(event) {
    
    const dom = event.target;
    const path = dom.dataset.path;
    router.replaceURL(path);
  });
};

class Router{
  constructor(pathList) {
    this.pathList = pathList;
    const curPath = pathList[0];
    this.curPath = curPath;
    this.replaceState(curPath);
  }

  init() {
    this.bindEvent();
  }

  bindEvent() {
    const handleEvent = (event) => {
      const path = this.getPath();
      this.updateView(path)
    };
    window.addEventListener('popstate', handleEvent);
  }

  getPath() {
    const old = window.location;
    const path = old.hash.replace('#/', '');
    return path;
  }

  updateView(newPath) {
    const { curPath } = this;
    this.curPath = newPath;
    this.toggleView(curPath);
    this.toggleView(newPath);
  }

  toggleView(id) {
    const dom = document.getElementById(id);
    dom.classList.toggle('hidden');
  }

  replaceURL(path) {
    this.updateView(path);
    this.replaceState(path);
  }

  replaceState(path) {
    const history = window.history;
    history.replaceState({ name: path }, '', `index.html#/${path}`);
  }


}