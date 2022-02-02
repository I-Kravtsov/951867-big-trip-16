import { renderPosition, render} from './render.js';
import TripPresenter from './presenter/trip-presenter.js';
import { generatePoint } from './mock/point';
import TabsView from './view/trip-tabs-view';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';

const POINT_COUNT = 6;
const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');
const points = Array.from({length: POINT_COUNT}, generatePoint);

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

pointsModel.points = points;
const tripPresenter = new TripPresenter(tripEventsElement, pointsModel, filterModel);
const headerMainElement = document.querySelector('.trip-main');
const headerMenuElement = headerMainElement.querySelector('.trip-controls__navigation');
const headerFilterElement = headerMainElement.querySelector('.trip-controls__filters');
render(headerMenuElement, new TabsView(), renderPosition.BEFOREEND);
const filterPresenter = new FilterPresenter(headerFilterElement, filterModel, pointsModel);

filterPresenter.init();
tripPresenter.init();
document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});
