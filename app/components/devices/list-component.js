import InfinityScrollComponent from 'irrigation-system/base-elements/infinity-scroll-component';
import { tracked } from '@glimmer/tracking';
export default class DevicesListComponent extends InfinityScrollComponent {
  @tracked sortBy = 'serialNumber'
  @tracked orderBy = 'ASC'
  modelName = 'device';
  endPoint = 'devices';
  queryParamsList = ['sortBy', 'orderBy', 'searchText'];
}