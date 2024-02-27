import BaseComponent from 'irrigation-system/base-elements/base-component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
export default class DevicesEditComponent extends BaseComponent {
  @tracked serialNumber;
  @tracked deviceName;
  init() {
    super.init(...arguments);
    this.serialNumber = this.model.serialNumber;
    this.deviceName = this.model.deviceName;
  }

  @action
  save(){
    this.model.serialNumber = this.serialNumber;
    this.model.deviceName = this.deviceName;
    let options = null;
    if (this.model.facilityId == null) {
      options = {
        adapterOptions: {
          endPoint: "facilities/create-fac",
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