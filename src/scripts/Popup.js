export class Popup {

  static _template = document.querySelector('#popup-form-template').content;
  
  open(popupElement) {
    popupElement.classList.add('popup_is-opened');
  }

  close(popupElement) {
    popupElement.classList.remove('popup_is-opened');
  }

  render(container) {
    this._view = Popup._template.cloneNode(true).children[0];
    container.append(this._view);
  }
}