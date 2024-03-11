import InfinityScrollComponent from 'irrigation-system/base-elements/infinity-scroll-component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action, computed } from '@ember/object';
export default class UsersFacilitiesListComponent extends InfinityScrollComponent {
  tagName = '';
  @service('role-type') roleTypes;
  @service('current-user') currentUser;

  @tracked sortBy = 'facilityName'
  @tracked orderBy = 'ASC'
  @tracked showModal = false;
  @tracked accessibleByPartyId = this.get('model.partyId');

  modelName = 'facility';
  endPoint = 'facilities'
  queryParamsList = ['sortBy', 'orderBy', 'accessibleByPartyId'];

  @action
  async closeGrantAccessModal(){
    this.showModal = false;
    if (this.onAccessChange) {
      this.onAccessChange();
    }
    return await this.refresh();
  }
}