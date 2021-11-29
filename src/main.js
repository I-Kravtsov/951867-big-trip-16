import { renderPosition, renderTemplate } from './render';
import { createTripTabsTemplate } from './view/trip-tabs-view';
import { createTripInfoTemplate } from './view/trip-info-view';
import { createTripFilterTemplate } from './view/trip-filters-view';
import { createTripSortTemplate } from './view/trip-sort-view';
import { createTripEventsListTemplate } from './view/trip-events-list-view';
import { createEventsListItemTemplate } from './view/trip-events-list-item-view';
import { createEditEventTemplate } from './view/trip-edit-event-view';

const POINT_COUNT = 3;

const headerMainElement = document.querySelector('.trip-main');
const pageMainElement = document.querySelector('.page-main');
const headerMenuElement = headerMainElement.querySelector('.trip-controls__navigation');
const headerFilterElement = headerMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = pageMainElement.querySelector('.trip-events');

renderTemplate(headerMainElement, createTripInfoTemplate,renderPosition.AFTERBEGIN);
renderTemplate(headerMenuElement, createTripTabsTemplate, renderPosition.BEFOREEND);
renderTemplate(headerFilterElement,createTripFilterTemplate,renderPosition.BEFOREEND);
renderTemplate(tripEventsElement, createTripSortTemplate, renderPosition.BEFOREEND);
renderTemplate(tripEventsElement, createTripEventsListTemplate, renderPosition.BEFOREEND);

const eventsListElement = tripEventsElement.querySelector('.trip-events__list');
for (let i = 0; i < POINT_COUNT; i++) {
  renderTemplate(eventsListElement, i === 0 ? createEditEventTemplate : createEventsListItemTemplate, renderPosition.BEFOREEND);
}

