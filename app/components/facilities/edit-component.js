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
  async save(){
    let formIsValid = this.baseFunctions.formIsValid({
      selector: ".save-facility-form"
    });
    if (!formIsValid) {
      return;
    }
    this.model.facilityName = this.facilityName;
    let options = null;
    if (this.model.facilityId == null) {
      options = {
        adapterOptions: {
          endPoint: "facilities/create-fac",
        }
      }
    }
    await this.model.save(options);
    this.notify.success('Saved!');
  }

  @action
  cancel(){
    this.store.removeAllNew_NewMethod();
    return history.back();
  }
}