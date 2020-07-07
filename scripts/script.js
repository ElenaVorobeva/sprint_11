
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


/*REVIEW. Резюме.

Неплохая работа, но надо в полной мере учитывать возможность неуспешности запросов к серверу,
хоть её и трудно смоделировать.

Что надо исправить

1. + В методах Api нужна проверка статуса ответа сервера (подробный комментарий и образец в файле класса Api).

2. + Аргументами метода api.uploadUserInfo должны быть значения из полей ввода формы профиля, а не свойства класса
(подробный комментарий в файле класса UserInfo).

3. + В методе updateUserInfo класса UserInfo обязательно нужно вызывать метод setUserInfo класса UserInfo
(подробные комментарии в файле класса UserInfo и в этом файле в слушателе сабмита формы профиля).

4. + Команда закрытия формы профиля должна быть в методе then обработки ответа сервера
(подробные комментарии в файле класса UserInfo и в этом файле в слушателе сабмита формы профиля).


REVIEW2. Резюме2.

Ошибки взаимодействия с сервером исправлены.

Проект стал хорошим.


Что можно лучше.

1. Не вижу особого смысла в оборачивании существующей размётки форм в тег template.

Тег template уместно применять, когда у Вас много объектов с одной структурой (карточек, например), с которыми нужно работать в каком-либо цикле.

2. Не очень правильно происходит валидация форм.
В начале работы с формой карточки, при вводе информации в одно поле и появления под ним сообщения об ошибке, появляется сообщение "Это обязательное поле"
и под другим полем, хотя, если в поле ничего ещё не вводили, под ним не должны высвечиваться никакие сообщения об ошибке.
Нужно подумать почему так происходит и лучше исправить.


Работа принимается.

Желаю успехов в дальнейшем обучении!




*/
