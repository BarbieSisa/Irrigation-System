import BaseComponent from 'irrigation-system/base-elements/base-component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
export default class FacilitiesEditComponent extends BaseComponent {
  @tracked facilityName;
  init() {
    super.init(...arguments);
    this.facilityName = this.model.facilityName;
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
    this.model.facilityName = this.facilityName;
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