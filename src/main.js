import { renderPosition, render } from './render';
import TabsView from './view/trip-tabs-view';
import TripInfoView from './view/trip-info-view';
import FilterView from './view/trip-filters-view';
import SortView from './view/trip-sort-view';
import EventsListView from './view/trip-events-list-view';
import EventsListItemView from './view/trip-events-list-item-view';
import EditEventsListItemView from './view/trip-edit-event-view';

import { generatePoint } from './mock/point';
import EmptyListView from './view/empty-list-view';

const POINT_COUNT = 5;
const headerMainElement = document.querySelector('.trip-main');
const pageMainElement = document.querySelector('.page-main');
const headerMenuElement = headerMainElement.querySelector('.trip-controls__navigation');
const headerFilterElement = headerMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = pageMainElement.querySelector('.trip-events');
const points = Array.from({length: POINT_COUNT}, generatePoint);
const renderPoint = (listElement, point) => {
  const pointComponent = new EventsListItemView(point);
  const editPointComponent = new EditEventsListItemView(point);
  const replaceCardToForm = () => {
    listElement.replaceChild(editPointComponent.element, pointComponent.element);
  };

  const replaceFormToCard = () => {
    listElement.replaceChild(pointComponent.element, editPointComponent.element);
  };
  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceCardToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  editPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  editPointComponent.element.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(listElement, pointComponent.element, renderPosition.BEFOREEND);
};
const renderRoute = (container, routePoints) => {
  const eventsListComponent = new EventsListView().element;
  if(routePoints.length === 0) {
    render(container, new EmptyListView().element, renderPosition.BEFOREEND);
    return;
  }
  render(container, new SortView().element, renderPosition.BEFOREEND);
  render(container, eventsListComponent, renderPosition.BEFOREEND);
  for (let i = 0; i < routePoints.length; i++) {
    renderPoint(eventsListComponent, routePoints[i]);
  }
};
render(headerMainElement, new TripInfoView().element,renderPosition.AFTERBEGIN);
render(headerMenuElement, new TabsView().element, renderPosition.BEFOREEND);
render(headerFilterElement,new FilterView().element, renderPosition.BEFOREEND);
renderRoute(tripEventsElement, points);
