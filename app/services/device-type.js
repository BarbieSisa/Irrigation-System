import Service from '@ember/service';
import { inject as service } from '@ember/service';
export default class DeviceTypeService extends Service {
  @service store;
  all = [];
  async setup(){
    const deviceTypes = await this.store.query('device-type', {
      endPoint: "deviceTypes",
      queryParams:{
        pageNumber: 1,
        pageSize: 2147483647
      }
    })
    if (deviceTypes != null){
      this.all = (deviceTypes || []).toArray();
    }
  };
}