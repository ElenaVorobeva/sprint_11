class FormValidator {
  constructor(name, link, form) {
    this.name = name;
    this.link = link;
    this.form = form;
    this.handlerInput = this.handlerInput.bind(this);
  }

  checkInputValidity(inputElement) {
    const isALink = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

    if (inputElement.type === 'text') {
      if (inputElement.value.length < 1) {
        inputElement.nextElementSibling.textContent = 'Это обязательное поле';
        return false;
      }
  
      if (inputElement.value.length === 1 || inputElement.value.length > 30) {
        inputElement.nextElementSibling.textContent = 'Должно быть от 2 до 30 символов';
        return false;
      }
  
      if (inputElement.value.length > 1 && inputElement.value.length < 31) {
        inputElement.nextElementSibling.textContent = '';
        return true;
      }
    }
  
    if (inputElement.type === 'url') {
      if (inputElement.value.length < 1) {
        inputElement.nextElementSibling.textContent = 'Это обязательное поле';
        return false;
      }
      if (inputElement.value.match(isALink)) {
        inputElement.nextElementSibling.textContent = '';
      return true;
     } else {
      inputElement.nextElementSibling.textContent = 'Здесь должна быть ссылка';
      return false;
     }
    }
  
  }

  setSubmitButtonState(state) {
    if (state) {
      this.button.classList.add('popup__button_is-active');
      this.button.removeAttribute('disabled');
    } else {
      this.button.classList.remove('popup__button_is-active');
      this.button.setAttribute('disabled', 'disabled');
    }
  }


  handlerInput(evt) {
    
    let validation;

    this.checkInputValidity(evt.target);
    if (this.checkInputValidity(this.name) && this.checkInputValidity(this.link)) {
      validation = true;
    } else {
      validation = false;
    }
    this.setSubmitButtonState(validation);
  }

  setEventListeners() {
    this.button = this.form.querySelector('.popup__button');
    this.form.addEventListener('input', this.handlerInput);
  }
}