class CardList {
  constructor(container, cards, card) {
    this._container = container;
    this._card = card;
    this._cards = cards;
  }

  addCard(name, link) {
    const newCard = this._card(name, link);
    this._container.append(newCard);
  }
  
  render() {
    // отрисовка карточек
    this._cards.forEach(card => {
      this.addCard(card.name, card.link);
    })
  }
}