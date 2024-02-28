import Service from '@ember/service';
import { inject as service } from '@ember/service';
export default class ProductTypeService extends Service {
  @service store;
  all = [];
  
  async setup(){
    const productTypes = await this.store.query('product-type', {
      endPoint: "productTypes",
      queryParams:{
        pageNumber: 1,
        pageSize: 2147483647
      }
    })
    if (productTypes != null){
      this.all = (productTypes || []).toArray();
    }
  }
  
  ORGANIZATION_PRODUCT = 'ORGANIZATION_PRODUCT';
  FACILITY_PRODUCT = 'FACILITY_PRODUCT';
}
