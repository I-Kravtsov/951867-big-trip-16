import { renderPosition, render, replace, remove} from '../render.js';
import EventsListItemView from '../view/trip-events-list-item-view';
import EditEventsListItemView from '../view/trip-edit-event-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class PointPresenter {
  #pointContainer = null;
  #changeData = null;
  #changeMode = null;

  #pointComponent = null;
  #editPointComponent = null;
  #point = null;
  #mode = Mode.DEFAULT;

  constructor (pointContainer, changeData, changeMode) {
    this.#pointContainer = pointContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point) => {
    this.#point = point;
    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;
    this.#pointComponent = new EventsListItemView(point);
    this.#editPointComponent = new EditEventsListItemView(point);
    this.#pointComponent.setRollupClickHandler(this.#handlePointClick);
    this.#editPointComponent.setFormSubmitHandler(this.#handleEditFormSubmit);
    this.#editPointComponent.setRollupClickHandler(this.#handleEditPointClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    if(prevEditPointComponent === null || prevPointComponent === null) {
      render(this.#pointContainer, this.#pointComponent, renderPosition.BEFOREEND);
      return;
    }
    if(this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if(this.#mode === Mode.EDITING) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }
    remove(prevEditPointComponent);
    remove(prevPointComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editPointComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  }

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  };

  #replaceCardToForm = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#EscKeyDownhendler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToCard = () => {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#EscKeyDownhendler);
    this.#mode = Mode.DEFAULT;
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  }

  #EscKeyDownhendler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#editPointComponent.reset(this.#point);
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#EscKeyDownhendler);
    }
  };

  #handlePointClick = () => {
    this.#replaceCardToForm();
  };

  #handleEditPointClick = () => {
    this.#editPointComponent.reset(this.#point);
    this.#replaceFormToCard();
  };

  #handleEditFormSubmit = (point) => {
    this.#changeData(point);
    this.#replaceFormToCard();
  };
}
