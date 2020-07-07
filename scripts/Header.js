class Header {

  static _template = document.querySelector('#header-template').content;

  render = (container) => {
    this._view = Header._template.cloneNode(true).children[0];
    container.append(this._view);
  }
}