import BaseRoute from 'irrigation-system/base-elements/base-route'; 
export default class ProductCreateRoute extends BaseRoute {
  async model(params) {
    const facility = await this.store.queryRecord('facility', {
      endPoint: 'facilities/' + params.facility_id,
    });
    
    return this.store.createRecord('product',{
      facility:facility
    });
  }
}