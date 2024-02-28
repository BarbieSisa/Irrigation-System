import InfinityScrollComponent from 'irrigation-system/base-elements/infinity-scroll-component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
export default class UsersListComponent extends InfinityScrollComponent {
  @service('role-type') roleTypes;

  @tracked sortBy = 'party.person.firstName'
  @tracked orderBy = 'ASC'
  @tracked includeRestricted = false;
  @tracked includeAllowed = true;
  @tracked roleTypeId = this.roleTypes.FACILITY_PARTY_ROLE_USER_ASSOC_ID;

  modelName = 'facility-party';
  endPoint = 'facilityParties'

  queryParamsList = ['sortBy', 'orderBy', 'searchText', 'facilityId', 'roleTypeId'];
}