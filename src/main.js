import { renderPosition, render} from './render.js';
import TripPresenter from './presenter/trip-presenter.js';
import { generatePoint } from './mock/point';
import TabsView from './view/trip-tabs-view';
import FilterView from './view/trip-filters-view';

const POINT_COUNT = 6;
const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');
const points = Array.from({length: POINT_COUNT}, generatePoint);
const tripPresenter = new TripPresenter(tripEventsElement);
const headerMainElement = document.querySelector('.trip-main');
const headerMenuElement = headerMainElement.querySelector('.trip-controls__navigation');
const headerFilterElement = headerMainElement.querySelector('.trip-controls__filters');
render(headerMenuElement, new TabsView(), renderPosition.BEFOREEND);
render(headerFilterElement,new FilterView(), renderPosition.BEFOREEND);
tripPresenter.init(points);
