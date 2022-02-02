import { renderPosition, render, remove} from '../render.js';
import TripInfoView from '../view/trip-info-view';
import SortView from '../view/trip-sort-view';
import EventsListView from '../view/trip-events-list-view';
import EmptyListView from '../view/empty-list-view';
import PointPresenter from './point-presenter.js';
import PointNewPresenter from './point-new-presenter.js';
import dayjs from 'dayjs';
import { UpdateType, UserAction, FilterType } from '../const.js';
import { filter } from '../utils/filter.js';

export default class TripPresenter {
  #tripContainer = null;
  #emptyListComponent = null;
  #headerMainElement = document.querySelector('.trip-main');
  #eventsListComponent = new EventsListView();
  #sortComponent = new SortView();
  #infoComponent = new TripInfoView();
  #pointPresenter = new Map();
  #pointNewPresenter = null;
  #currentSortType = 'sort-day';
  #filterType = FilterType.EVERYTHING;
  #pointsModel = null;
  #filterModel = null;

  constructor (tripContainer, pointsModel, filterModel){
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#pointNewPresenter = new PointNewPresenter(this.#tripContainer, this.#handleViewAction);
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }


  get points () {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);
    switch(this.#currentSortType) {
      case 'sort-time':
        return filteredPoints.sort((pointA, pointB) => (dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom)) - (dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom)))));
      case 'sort-price':
        return filteredPoints.sort((pointA, pointB) => (pointB.basePrice - pointA.basePrice));
    }
    return filteredPoints;
  }

  init =() => {
    this.#renderRoute();
  }

  createPoint = () => {
    this.#currentSortType = 'sort-day';
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch(actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch(updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearRoute();
        this.#renderRoute();
        break;
      case UpdateType.MAJOR:
        this.#clearRoute();
        this.#renderRoute();
        break;
    }
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView() );
    this.#pointNewPresenter.destroy();
  }

  #handlerSortTypeCange = (sortType) => {
    if(this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearRoute();
    this.#renderRoute();
  }

  #renderEmptyList = () => {
    this.#emptyListComponent = new EmptyListView(this.#filterType);
    render(this.#tripContainer, this.#emptyListComponent, renderPosition.BEFOREEND);
  }

  #renderSort = () => {
    render(this.#tripContainer, this.#sortComponent, renderPosition.BEFOREEND);
    this.#sortComponent.setSortTypeChangeHandler(this.#handlerSortTypeCange);
  }

  #renderInfo = () => {
    render(this.#headerMainElement, this.#infoComponent,renderPosition.AFTERBEGIN);
  }

  #renderEventsList = () => {
    render(this.#tripContainer, this.#eventsListComponent, renderPosition.BEFOREEND);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#eventsListComponent, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderRoute = () => {
    if(this.points.length === 0) {
      this.#renderEmptyList();
      return;
    }
    this.#renderInfo();
    this.#renderSort();
    this.#renderEventsList();
    this.#renderPoints(this.points);
  }

  #clearRoute = (resetSortType = false) => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
    remove(this.#infoComponent);
    remove(this.#sortComponent);
    remove(this.#eventsListComponent);
    if(this.#emptyListComponent) {
      remove(this.#emptyListComponent);
    }
    if(resetSortType) {
      this.#currentSortType = 'sort-day';
    }
  }
}
