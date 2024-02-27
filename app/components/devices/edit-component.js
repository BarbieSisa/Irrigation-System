import BaseComponent from 'irrigation-system/base-elements/base-component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
export default class DevicesEditComponent extends BaseComponent {
  @tracked serialNumber;
  @tracked deviceName;
  @tracked facilityId;
  init() {
    super.init(...arguments);
    this.serialNumber = this.model.serialNumber;
    this.deviceName = this.model.deviceName;
    this.facilityId = this.model.get('facility.facilityId');
    this.deviceTypeId = this.model.get('deviceType.deviceTypeId');
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);
    try {
      this.store.removeAllNew_NewMethod();
    } catch (error) {
      
    }
  }

  @action
  save(){
    this.model.serialNumber = this.serialNumber;
    this.model.deviceName = this.deviceName;
    this.model.facility = this.store.peekRecord('facility', this.facilityId);
    let options = null;
    if (this.model.deviceId == null) {
      options = {
        adapterOptions: {
          endPoint: "devices/create-dev",
        }
      }
    }
    return this.model.save(options);
  }

  @action
  cancel(){
    this.store.removeAllNew_NewMethod();
    return history.back();
  }
}