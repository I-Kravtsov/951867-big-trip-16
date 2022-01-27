import { renderPosition, render, replace } from './render';
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
    replace(editPointComponent, pointComponent);
  };

  const replaceFormToCard = () => {
    replace(pointComponent, editPointComponent);
  };
  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  // const onformSubmit = (evt) => {
  //   evt.preventDefault();
  //   replaceFormToCard();
  //   document.removeEventListener('keydown', onEscKeyDown);
  // };

  pointComponent.setRollupClickHandler(() => {
    replaceCardToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  editPointComponent.setRollupClickHandler(() => {
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  editPointComponent.setRollupSubmitHandler(() => {
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(listElement, pointComponent, renderPosition.BEFOREEND);
};
const renderRoute = (container, routePoints) => {
  const eventsListComponent = new EventsListView();
  if(routePoints.length === 0) {
    render(container, new EmptyListView(), renderPosition.BEFOREEND);
    return;
  }
  render(container, new SortView(), renderPosition.BEFOREEND);
  render(container, eventsListComponent, renderPosition.BEFOREEND);
  for (let i = 0; i < routePoints.length; i++) {
    renderPoint(eventsListComponent, routePoints[i]);
  }
};
render(headerMainElement, new TripInfoView(),renderPosition.AFTERBEGIN);
render(headerMenuElement, new TabsView(), renderPosition.BEFOREEND);
render(headerFilterElement,new FilterView(), renderPosition.BEFOREEND);
renderRoute(tripEventsElement, points);
