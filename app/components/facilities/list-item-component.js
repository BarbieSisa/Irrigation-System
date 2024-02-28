import InfinityScrollItemComponent from 'irrigation-system/base-elements/infinity-scroll-item-component';
import { action } from '@ember/object';
export default class FacilitiesListItemComponent extends InfinityScrollItemComponent {
  @action
  gotoFacility(facilityId){
    this.router.transitionTo('home.facilities.view', facilityId);
  }
}