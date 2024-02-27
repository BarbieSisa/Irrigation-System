import BaseRoute from 'irrigation-system/base-elements/base-route'; 
export default class FacilityCreateRoute extends BaseRoute {
  async model() {
    return this.store.createRecord('facility');
  }
}