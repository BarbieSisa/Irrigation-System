import BaseRoute from 'irrigation-system/base-elements/base-route'; 

export default class DevicesRoute extends BaseRoute {
  async model() {
    const devices = await this.store.query('device', {
      endPoint:'devices',
      queryParams:{
        pageNumber: 1,
        pageSize: 20,
      }
    });
    return devices;
  }
}
