import BaseRoute from 'irrigation-system/base-elements/base-route'; 
export default class ProductEditRoute extends BaseRoute {
  async model(params) {
    if (params && params.product_id) {
      const product = await this.store.queryRecord('product', {
        endPoint: 'products/' + params.product_id,
      })
      return product;
    }
  }
}