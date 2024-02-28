import InfinityScrollComponent from 'irrigation-system/base-elements/infinity-scroll-component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
export default class DevicesListComponent extends InfinityScrollComponent {
  @tracked sortBy = 'serialNumber'
  @tracked orderBy = 'ASC'
  modelName = 'device';
  endPoint = 'devices';
  refDoc = {
    "active": true,
    "deviceName": true,
    "serialNumber": true,
    "fromDate": true,
    "facility": {
      "facilityName": true,
      "facilityParties": {
        "party": {
          "organization": {
            "organizationName": true
          }
        },
        "partyRoleType": {}
      }
    },
    "owner": {
      "organization": {
        "organizationName": true
      }
    },
    "deviceAttributes": {
      "attrName": true,
      "attrValue": true
    },
    "deviceProducts": {
      "key": true,
      "product": {
        "productName": true,
      }
    },
    "deviceType": {}
  }
  queryParamsList = ['sortBy', 'orderBy', 'searchText', 'facilityId', 'refDoc'];

  @action
  createDevice(){
    this.router.transitionTo('home.devices.create');
  };
}