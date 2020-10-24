export default class Section {
    constructor({ renderer }, container) {
      this._renderer = renderer;
      this._container = container;
    }
  
    addItem(element) {
      this._container.prepend(element);
    }

    addNewItem(element) {
      this._container.append(element);
    }
  
    renderItems(elements) {  
      elements.forEach(item => {
        this._renderer(item);
      });
    }
}