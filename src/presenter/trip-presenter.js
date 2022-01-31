import { renderPosition, render} from '../render.js';
import TripInfoView from '../view/trip-info-view';
import SortView from '../view/trip-sort-view';
import EventsListView from '../view/trip-events-list-view';
import EmptyListView from '../view/empty-list-view';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/utils.js';

export default class TripPresenter {
  #tripContainer = null;
  #emptyListComponent = new EmptyListView();
  #headerMainElement = document.querySelector('.trip-main');
  #eventsListComponent = new EventsListView();
  #sortComponent = new SortView();
  #infoComponent = new TripInfoView();
  #tripPoints = [];
  #pointPresenter = new Map();

  constructor (tripContainer){
    this.#tripContainer = tripContainer;
  }

  init =(tripPoints) => {
    this.#tripPoints = [...tripPoints];
    this.#renderRoute();
  }

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView() );
  }

  #renderEmptyList = () => {
    render(this.#tripContainer, this.#emptyListComponent, renderPosition.BEFOREEND);
  }

  #renderSort = () => {
    render(this.#tripContainer, this.#sortComponent, renderPosition.BEFOREEND);
  }

  #renderInfo = () => {
    render(this.#headerMainElement, this.#infoComponent,renderPosition.AFTERBEGIN);
  }

  #renderEventsList = () => {
    render(this.#tripContainer, this.#eventsListComponent, renderPosition.BEFOREEND);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#eventsListComponent, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints = () => {
    this.#tripPoints.forEach((point) => this.#renderPoint(point));
  }

  #clearRoute = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy);
    this.#pointPresenter.clear();

  }

  #renderRoute = () => {
    if(this.#tripPoints.length === 0) {
      this.#renderEmptyList();
      return;
    }
    this.#renderInfo();
    this.#renderSort();
    this.#renderEventsList();
    this.#renderPoints();
  }
}
