class Profile {

  static _template = document.querySelector('#profile-template').content;

  render(container) {
    this._view = Profile._template.cloneNode(true).children[0];
    container.append(this._view);
  }
}