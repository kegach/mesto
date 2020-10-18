export default class Section {
    constructor({ data, renderer }, container) {
      this._renderedItems = data;
      this._renderer = renderer;
      this._container = container;
    }
  
    addItem(element) {
      this._container.prepend(element);
    }
  
    renderItems() {  
      this._renderedItems.forEach(item => {
        this._renderer(item);
      });
    }
}