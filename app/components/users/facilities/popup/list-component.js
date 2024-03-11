import InfinityScrollComponent from 'irrigation-system/base-elements/infinity-scroll-component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
export default class GrantFacilityAccessListComponent extends InfinityScrollComponent {
  @service('role-type') roleTypes;
  @service('current-user') currentUser;

  @tracked sortBy = 'facilityName'
  @tracked orderBy = 'ASC'
  //@tracked excludePartyIds = [];
  modelName = 'facility';
  endPoint =  'facilities';
  queryParamsList = ['sortBy', 'orderBy', 'searchText'];

}