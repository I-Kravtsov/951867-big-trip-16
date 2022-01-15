import { createElement } from '../render';
const createTripEventsListTemplate = () => (
  `<ul class="trip-events__list">
  </ul>
  `
);


export default class EventsListView{
  #element = null;

  get element () {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template () {
    return createTripEventsListTemplate();
  }

  removeElement () {
    this.#element = null;
  }
}
