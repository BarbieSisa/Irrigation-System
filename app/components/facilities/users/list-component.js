import InfinityScrollComponent from 'irrigation-system/base-elements/infinity-scroll-component';
import { tracked } from '@glimmer/tracking';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
export default class UsersListComponent extends InfinityScrollComponent {
  @service('role-type') roleTypes;
  @service('current-user') currentUser;

  @tracked sortBy = 'person.firstName'
  @tracked orderBy = 'ASC'
  @tracked includeRestricted = false;
  @tracked includeAllowed = true;
  @tracked showModal = false;
  modelName = 'party';

  @computed('facilityId')
  get endPoint(){
    return 'facilities/' + this.facilityId + '/parties';
  }

  queryParamsList = ['sortBy', 'orderBy', 'searchText', 'facilityId'];

  @action
  async closeGrantAccessModal(){
    this.showModal = false;
    return await this.refresh();
  }
}