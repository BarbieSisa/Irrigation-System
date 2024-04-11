import BaseComponent from 'irrigation-system/base-elements/base-component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
export default class ProductsEditComponent extends BaseComponent {
  @service('uom-service') uomService;
  @service('product-type') productTypeService;

  @tracked productName;
  @tracked price;

  init() {
    super.init(...arguments);
    this.productName = this.model.productName;
    this.price = this.model.price;
    this.facilityId = this.model.get('facility.facilityId');
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
    try {
      let formIsValid = this.baseFunctions.formIsValid({
        selector: ".save-product-form"
      });
      if (!formIsValid) {
        return;
      }
      this.model.productName = this.productName;
      this.model.price = this.price;
      this.model.productType = (this.productTypeService.get('all') || []).find(p=>p.get('productTypeCode') == this.productTypeService.FACILITY_PRODUCT);
      this.model.uom = (this.uomService.get('all') || []).find(p=>p.get('uomCode') == this.uomService.L)
      await this.model.save();
      this.notify.success('Saved!');
      return this.router.transitionTo('home.facilities.view', this.model.get('facility.facilityId'));
    } catch (error) {
      this.notify.error("Something went wrong..");
      console.log(error);
    }
  }

  @action
  cancel(){
    this.store.removeAllNew_NewMethod();
    return history.back();
  }
}