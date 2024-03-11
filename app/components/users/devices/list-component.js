import InfinityScrollComponent from 'irrigation-system/base-elements/infinity-scroll-component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
export default class UsersDevicesListComponent extends InfinityScrollComponent {
  tagName = '';
  @service('role-type') roleTypes;

  @tracked sortBy = 'serialNumber'
  @tracked orderBy = 'ASC'
  @tracked accessibleByPartyId = this.get('model.partyId');
  refDoc = {
    deviceName:true,
    serialNumber:true,
    facility:{
      facilityName:true
    }
  };
  modelName = 'device';
  endPoint = 'devices'
  queryParamsList = ['sortBy', 'orderBy', 'accessibleByPartyId', 'refDoc', 'refreshHandler'];
}