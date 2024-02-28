import InfinityScrollComponent from 'irrigation-system/base-elements/infinity-scroll-component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
export default class DevicesListComponent extends InfinityScrollComponent {
  @tracked sortBy = 'serialNumber'
  @tracked orderBy = 'ASC'
  modelName = 'device';
  endPoint = 'devices';
  queryParamsList = ['sortBy', 'orderBy', 'searchText', 'facilityId'];

  @action
  createDevice(){
    this.router.transitionTo('home.devices.create');
  };
}