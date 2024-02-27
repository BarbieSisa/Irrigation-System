import InfinityScrollComponent from 'irrigation-system/base-elements/infinity-scroll-component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
export default class FacilitiesListComponent extends InfinityScrollComponent {
  @tracked sortBy = 'facilityName'
  @tracked orderBy = 'ASC'
  modelName = 'facility';
  endPoint = 'facilities';
  queryParamsList = ['sortBy', 'orderBy', 'searchText'];

  @action
  createFacility(){
    this.router.transitionTo('home.facilities.create');
  };
}