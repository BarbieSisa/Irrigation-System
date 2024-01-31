import BaseController from 'irrigation-system/base-elements/base-controller'; 
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
export default class HomeController extends BaseController {
  @service session;
  @service router;

  @action
  async logout() {
    await this.customFetch.makeRequest({
      endPoint: "users/logout",
      type: "POST"
    });
    await this.session.invalidate();
    this.currentUser.loggedUser = null;
  }
  @action
  goto(route){
      return this.router.transitionTo(route)
  }
}