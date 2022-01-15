import { createElement } from '../render';

const createTripTabsTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn" href="#">Table</a>
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Stats</a>
  </nav>`
);

export default class TabsView {
  #element= null;

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createTripTabsTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
