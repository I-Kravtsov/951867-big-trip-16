import AbstractView from './abstract-view';
import dayjs from 'dayjs';
import {cities, offersSet, pointTypes} from '../mock/data';

const createEventDestinationlist = (destinationPoints) => {
  const eventDestination = destinationPoints.map((destinationPoint) => `<option value="${destinationPoint}" ></option>`);
  return  eventDestination.join('');
};

const createOfferListTemplate = (pointOffers, pointTipe) => {
  const createOfferList = (offerType) => {
    for(const offerSet of offersSet) {
      if (offerSet.type === offerType){
        return offerSet.offers;
      }
    }
  };
  const offerList = createOfferList(pointTipe);
  const createOffersTemplate = (offers) => offers.map((offer) => `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}-1" type="checkbox" name="event-offer-${offer.id}" ${pointOffers.includes(offer) ? 'checked' : ''} >
  <label class="event__offer-label" for="event-offer-${offer.id}-1">
    <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </label>
</div>`).join('');
  return offerList ? (
    `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${createOffersTemplate(offerList)}
        <div>
    </section>
    `
  ) : '';

};
const createEditEventTemplate = (point = {}) => {
  const {
    basePrice ='',
    dateFrom = dayjs(),
    dateTo = dayjs().toISOString(),
    destination = {
      name: '',
      description: null,
      pictures: null,
    },
    type = 'bus',
    offers = null,
  } = point;
  return (`<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${pointTypes.map((pointType) => `
              <div class="event__type-item">
                <input id="event-type-${pointType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" ${pointType === type ? 'checked' : '' }>
                <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-1" style="text-transform: capitalize" >${pointType}</label>
              </div>
              `).join('')}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${createEventDestinationlist(cities)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(dateFrom).format('DD/MM/YY hh:mm')}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(dateTo).format('DD/MM/YY hh:mm')}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${createOfferListTemplate(offers, type)}
        ${destination.description ? `
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination.description}</p>
          ${destination.pictures ? `
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${destination.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('')}
            </div>
          </div>` : ''}
        </section>` : ''}
      </section>
    </form>
  </li>`);
};

export default class EditEventsListItemView extends AbstractView {
  #point  = null;
  constructor (point) {
    super();
    this.#point = point;
  }

  get template () {
    return createEditEventTemplate(this.#point);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(this.#point);
  }

  setRollupClickHandler = (callback) => {
    this._callback.rollupClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupClickHandler);
  }

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.rollupClick();
  }
}

