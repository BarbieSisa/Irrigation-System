import BaseRoute from 'irrigation-system/base-elements/base-route'; 
export default class DeviceCreateRoute extends BaseRoute {
  async model() {
    return {device:this.store.createRecord('device')};
  }
}