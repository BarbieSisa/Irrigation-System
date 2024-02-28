import InfinityScrollComponent from 'irrigation-system/base-elements/infinity-scroll-component';
import { tracked } from '@glimmer/tracking';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
export default class UsersListComponent extends InfinityScrollComponent {
  @service('role-type') roleTypes;
  @service('current-user') currentUser;

  @tracked sortBy = 'person.firstName'
  @tracked orderBy = 'ASC'
  @tracked includeRestricted = false;
  @tracked includeAllowed = true;
  modelName = 'party';

  @computed('facilityId')
  get endPoint(){
    return 'facilities/' + this.facilityId + '/parties';
  }

  queryParamsList = ['sortBy', 'orderBy', 'searchText', 'facilityId'];
}