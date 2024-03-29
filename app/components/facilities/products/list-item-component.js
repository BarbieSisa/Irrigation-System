import InfinityScrollItemComponent from 'irrigation-system/base-elements/infinity-scroll-item-component';
import { action } from '@ember/object';
export default class FacilityProductsListItemComponent extends InfinityScrollItemComponent {
  @action
  editProduct() {
    this.router.transitionTo('home.facilities.products.edit', this.product.productId);
  };

  @action
  async deleteProduct() {
    try {
      await this.product.destroyRecord();
      this.notify.warning('Deleted!');
      if (this.onDeleteProduct) {
        this.onDeleteProduct(this.product);
      }
      this.product.customUnloadRecord();
    } catch (error) {
      this.notify.error("Something went wrong..");
      console.log(error)
    }
  };
}