import FilterView from '../view/trip-filters-view';
import {render, renderPosition, replace, remove} from '../render';
import {filter} from '../utils/filter.js';
import {FilterType, UpdateType,} from '../const.js';

export default class FilterPresenter {
   #filterContainer = null;
   #filterModel = null;
   #pointsModel = null;

   #filterComponent = null;

   constructor(filterContainer, filterModel, pointModel) {
     this.#filterContainer = filterContainer;
     this.#filterModel = filterModel;
     this.#pointsModel = pointModel;

     this.#pointsModel.addObserver(this.#handleModelEvent);
     this.#filterModel.addObserver(this.#handleModelEvent);
   }

   get filters() {
     const points = this.#pointsModel.points;

     return [
       {
         type: FilterType.EVERYTHING,
         name: 'Everything',
         count: 1,
       },
       {
         type: FilterType.FUTURE,
         name: 'Future',
         count: filter[FilterType.FUTURE](points).length,
       },
       {
         type: FilterType.PAST,
         name: 'Past',
         count: filter[FilterType.PAST](points).length,
       },
     ];
   }

   init = () => {
     const filters = this.filters;
     const prevFilterComponent = this.#filterComponent;

     this.#filterComponent = new FilterView(filters, this.#filterModel.filter);
     this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

     if (prevFilterComponent === null) {
       render(this.#filterContainer, this.#filterComponent, renderPosition.BEFOREEND);
       return;
     }

     replace(this.#filterComponent, prevFilterComponent);
     remove(prevFilterComponent);
   }

   #handleModelEvent = () => {
     this.init();
   }

   #handleFilterTypeChange = (filterType) => {

     if (this.#filterModel.filter === filterType) {
       return;
     }

     this.#filterModel.setFilter(UpdateType.MINOR, filterType);
   }
}
