import "./style.css";

import { Api } from "./scripts/Api.js";
import { Header } from "./scripts/Header.js";
import { Profile } from "./scripts/Profile.js";
import { CardsContainer } from "./scripts/CardsContainer.js";
import { CardList } from "./scripts/CardList.js";
import { Card } from "./scripts/Card.js";
import { Popup } from "./scripts/Popup.js";
import { UserInfo } from "./scripts/UserInfo.js";
import { FormValidator } from "./scripts/FormValidator.js";

(function () {
/*------------------------------------------------------------------------------
Переменные для отрисовки темплейтов
------------------------------------------------------------------------------*/
const root = document.querySelector('.root');
const header = new Header();
const profile = new Profile();
const cardsContainer = new CardsContainer();
const popup = new Popup();

/*------------------------------------------------------------------------------
Отрисовка темплейтов
------------------------------------------------------------------------------*/
// отрисовка темплейтов
header.render(root);
profile.render(root);
cardsContainer.render(root);
popup.render(root);


/*------------------------------------------------------------------------------
Переменные после отрисовки
------------------------------------------------------------------------------*/
const spans = root.querySelectorAll('.popup__error-message');
const cardForm = root.querySelector('#cardForm');
const infoForm = root.querySelector('#infoForm');
const cardFormName = root.querySelector('.popup__card-form-input_type_name');
const cardFormLink = root.querySelector('.popup__card-from-input_type_link-url');
const infoFormName = root.querySelector('.popup__info-form-input_type_name');
const infoFormLink = root.querySelector('.popup__info-form-input_type_text-description');
const cardPopup = root.querySelector('.popup__form_card');
const infoPopup = root.querySelector('.popup__form_info');
const placesList = root.querySelector('.places-list');

const userEditButton = root.querySelector('.user-info-edit__button');
const userPhoto = root.querySelector('.user-info__photo');
const nameEditProfile = root.querySelector('.user-info__name');
const jobEditProfile = root.querySelector('.user-info__job');

const nameInput = infoForm.querySelector('[name=name]');
const jobInput = infoForm.querySelector('[name=info]');

const formValidatorAddCard = new FormValidator(cardFormName, cardFormLink, cardForm);
const formValidatorEditInfo = new FormValidator(infoFormName, infoFormLink, infoForm);

/*------------------------------------------------------------------------------
Переменные для апи
------------------------------------------------------------------------------*/
const cardConfig = {
  url: 'https://praktikum.tk/cohort11/cards',
  headers: {
    authorization: '1800825d-661f-4200-a76e-67715bff8281'
  }
}

const userConfig = {
  url: 'https://praktikum.tk/cohort11/users/me',
  headers: {
    method: 'PATCH',
    authorization: '1800825d-661f-4200-a76e-67715bff8281',
    'Content-Type': 'application/json'
  }
}

const apiUser = new Api(userConfig);
const userInfo = new UserInfo(nameEditProfile, jobEditProfile, apiUser, userPhoto, nameInput, jobInput, popup, infoForm);



/*------------------------------------------------------------------------------
Слушатели событий
------------------------------------------------------------------------------*/
// открыте попапов
root.addEventListener('click', function(evt) {
  const imagePopup = root.querySelector('.place-card-popup');

  if (evt.target.classList.contains('user-info-edit__button')) {

    infoPopup.reset();
    userInfo.setUserInfo(root);
    formValidatorEditInfo.setSubmitButtonState(true);
    popup.open(infoForm);
  }

  if (evt.target.classList.contains('user-info__button')) {

    formValidatorAddCard.setSubmitButtonState(false)
    popup.open(cardForm);
  }

  if (evt.target.classList.contains('popup__close')) {
    popup.close(evt.target.parentElement.parentElement);

    evt.currentTarget.querySelector('.popup__form').reset();

    for (let i = 0; i < spans.length; i++) {
      spans[i].textContent = '';
    }
  }


  if (event.target.classList.contains('place-card__image')) {
    const imageUrl = event.target.parentElement.firstElementChild.style.cssText.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '');
    const image = root.querySelector('.place-card-popup__image');

    image.src = imageUrl;
    popup.open(imagePopup.parentElement);
  }
})

// добавление карточек пользователем
cardForm.addEventListener('submit', function(evt) {

  evt.preventDefault();
  const cardLink = root.querySelector('#cardLink');
  const cardName = root.querySelector('#cardName');

  placesList.append(createACard(cardName.value, cardLink.value));
  popup.close(cardForm);
  formValidatorAddCard.setSubmitButtonState(false);
  cardPopup.reset();
});

// изменени профиля
  infoForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  userInfo.updateUserInfo();
});

// заполнение открытия формы
userEditButton.addEventListener('click', () => {
  userInfo.setUserInfo(nameEditProfile.textContent, jobEditProfile.textContent);
  const getUserInfo = userInfo.getUserInfo(nameEditProfile.textContent, jobEditProfile.textContent);

  nameInput.setAttribute('value', getUserInfo.name);
  jobInput.setAttribute('value', getUserInfo.job);
})

// вывод 10 карточек
function createACard(name, link) {
  return new Card(name, link).createCard();
}


/*------------------------------------------------------------------------------
Функции
------------------------------------------------------------------------------*/
formValidatorAddCard.setEventListeners();
formValidatorEditInfo.setEventListeners();
userInfo.uploadUserInfo();
userInfo.setUserPhoto();


/*------------------------------------------------------------------------------
Апи
------------------------------------------------------------------------------*/
const api = new Api(cardConfig);
api.getCards()
  .then(res => {
    const cards = new CardList(placesList, res, createACard, api);
    cards.render();
  })
  .catch((error) => {
    console.error('Невозможно продолжить', error);
  });

})();
