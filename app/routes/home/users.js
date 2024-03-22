import BaseRoute from 'irrigation-system/base-elements/base-route';
import { inject as service } from '@ember/service';
export default class UsersRoute extends BaseRoute {
  @service('current-user') currentUser;

  beforeModel(transition) {
    super.beforeModel(...arguments);
    if (transition.targetName == 'home.users.index' && this.currentUser.isCustomer) {
        this.router.transitionTo('home.insufficient-permissions');
    }
  };
}