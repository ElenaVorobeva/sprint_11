export class CardsContainer {
  static _template = document.querySelector('#place-list-template').content;

  render(container) {
    this._view = CardsContainer._template.cloneNode(true).children[0];
    container.append(this._view);
  }
}