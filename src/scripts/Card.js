export class Card {

  constructor(name, link) {
    this.name = name;
    this.link = link;

    this.remove = this.remove.bind(this);
  }

  like() {
    this.classList.toggle('place-card__like-icon_liked');
  }

  remove = () => {
    this.removeListeners();
    this.cardElement.remove();
  }

  createCard() {
    const cardContainer = `
    <div class="place-card__image">
      <button class="place-card__delete-icon"></button>
    </div>
    <div class="place-card__description">
      <h3 class="place-card__name"></h3>
      <button class="place-card__like-icon"></button>
    </div>
    `;

    const cardElement = document.createElement('div');
    cardElement.classList.add('place-card');
    cardElement.insertAdjacentHTML('afterbegin', cardContainer);
  
    cardElement.querySelector('.place-card__name').textContent = this.name;
    cardElement.querySelector('.place-card__image').style.backgroundImage = `url(${this.link})`;

    this.cardElement = cardElement;
    this.addEventListeners();
    return cardElement;
  }

  addEventListeners = () => {
    this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
  }

  removeListeners = () => {
    this.cardElement.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
    this.cardElement.querySelector('.place-card__delete-icon').removeEventListener('click', this.remove);
  }
}