import InfinityScrollComponent from 'irrigation-system/base-elements/infinity-scroll-component';
import { tracked } from '@glimmer/tracking';
export default class ProductsListComponent extends InfinityScrollComponent {
  @tracked sortBy = 'productName'
  @tracked orderBy = 'ASC'
  modelName = 'product';
  endPoint = 'products';
  queryParamsList = ['sortBy', 'orderBy', 'searchText', 'facilityId'];
}