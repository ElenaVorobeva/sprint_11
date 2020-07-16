export class UserInfo {
  constructor(nameElement, jobElement, api, photo, nameInput, jobInput, popup, form) {
    this._nameElem = nameElement;
    this._jobElem = jobElement;
    this._name = '';
    this._job = '';
    this._api = api;
    this._photo = photo;
    this._nameInput = nameInput;
    this._jobInput = jobInput;
    this._popup = popup;
    this._form = form;
  }

  setUserInfo = (newName, newJob) => {
    this._name = newName;
    this._job = newJob;
  }

  updateUserInfo = () => {
    this._api.uploadUserInfo(this._nameInput.value, this._jobInput.value)
    .then((res) => {
      this.setUserInfo(res.name, res.about);
      this._nameElem.textContent = this._name;
      this._jobElem.textContent = this._job;
      this._popup.close(this._form);
    })
    .catch((error) => {
      console.error('Невозможно продолжить', error);
    });
  }

  uploadUserInfo = () => {
    this._api.getUserInfo()
      .then(res => {
        this._nameElem.textContent = res.name;
        this._jobElem.textContent = res.about;
      })
      .catch((error) => {
        console.error('Невозможно продолжить', error);
      });
  }

  getUserInfo = () => {
    return {
      name: this._name,
      job: this._job,
    };
  }

    setUserPhoto = () => {
    this._api.getUserInfo()
    .then((res) => {
      this._photo.style.backgroundImage = `url(${res.avatar})`
    })
    .catch((error) => {
      console.error('Невозможно продолжить', error);
    });
  }
}