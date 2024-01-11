import BaseRoute from 'irrigation-system/base-elements/base-route'; 
import { inject as service } from '@ember/service';
export default class IndexRoute extends BaseRoute {
  @service session;
  @service('current-user') currentUser;

  async beforeModel(){
    if (!this.session.isAuthenticated) {
      this.router.transitionTo('login');
      return;
    }
    await this.currentUser.setup();
  }
}