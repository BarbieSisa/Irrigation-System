import BaseRoute from 'irrigation-system/base-elements/base-route'; 
import { inject as service } from '@ember/service';
export default class LoginRoute extends BaseRoute {
  @service session;
  
  beforeModel(){
    if (this.session.isAuthenticated) {
      this.router.transitionTo('home');
      return;
    }
  }
}