import Service from '@ember/service';
import { inject as service } from '@ember/service';
export default class UomService extends Service {
  @service store;
  all = [];
  
  async setup(){
    const uoms = await this.store.query('uom', {
      endPoint: "uoms",
      queryParams:{
        pageNumber: 1,
        pageSize: 2147483647
      }
    })
    if (uoms != null){
      this.all = (uoms || []).toArray();
    }
  }
  
  GR = "gr";
  ML = "ml";
  L = "l";
  KG = "kg";
}
