import BaseRoute from 'irrigation-system/base-elements/base-route'; 
import { inject as service } from '@ember/service';
export default class IndexRoute extends BaseRoute {
  @service session;
  @service('current-user') currentUser;
  @service('device-type') deviceTypes;
  @service('role-type') roleTypes;
  @service('uom-service') uomService;
  @service('product-type') productTypeService;

  async beforeModel(){
    if (!this.session.isAuthenticated) {
      this.router.transitionTo('login');
      return;
    }
    await this.currentUser.setup();
    await this.deviceTypes.setup();
    await this.roleTypes.setup();
    await this.uomService.setup();
    await this.productTypeService.setup();
    await this.activeRouteTracker.setup();
  }
}