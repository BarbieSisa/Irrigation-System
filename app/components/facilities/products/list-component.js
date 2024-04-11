import InfinityScrollComponent from 'irrigation-system/base-elements/infinity-scroll-component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
export default class ProductsListComponent extends InfinityScrollComponent {
  @tracked sortBy = 'productName'
  @tracked orderBy = 'ASC'
  modelName = 'product';
  endPoint = 'products';
  refDoc = {
    productName: true,
    price:true,
    facility: {},
    party:{
      user:{
        userAttributes:{
          attrName:true,
          attrValue:true
        }
      }
    },
    uom:{}
  };
  queryParamsList = ['sortBy', 'orderBy', 'searchText', 'facilityId', 'refDoc'];

  @action
  createProduct(){
    this.router.transitionTo('home.facilities.products.create', this.model.facilityId);
  };

  @action
  removeProductOnDelete(product){
    (this.loadedItems || []).removeObject(product);
  }
}