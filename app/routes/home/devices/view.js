import BaseRoute from 'irrigation-system/base-elements/base-route'; 
export default class DeviceViewRoute extends BaseRoute {
  async model(params) {
    if (params && params.device_id) {
      const device = await this.store.queryRecord('device', {
        endPoint: 'devices/' + params.device_id,
      })
      return device;
    }
  }
}