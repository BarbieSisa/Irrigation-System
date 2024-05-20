import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import BaseController from 'irrigation-system/base-elements/base-controller'; 
export default class LoginController extends BaseController {
  @service session;
  @service router;
  constructor(...args) {
    super(...args);
    this.OnEnterFunc = (e) => {
      if (e && e.keyCode == 13) {
        this.send('login');
      }
    }
    document.addEventListener("keyup", this.OnEnterFunc);
  }
  @action
  async login() {
    if (!this.baseFunctions.formIsValid({
        selector: '.form-signin'
      })) {
      return;
    }
    let email = this.get('email');
    let password = this.get('password');

    let session = this.get('session');
    await session.authenticate('authenticator:custom', {
        email,
        password
      })
    document.removeEventListener("keyup", this.OnEnterFunc);
    await this.get('router').transitionTo('home');
    return this.notify.success('Welcome back ' + this.currentUser.get('loggedUser.party.person.firstName') + "!", {
      closeAfter: 5000
    });
  }
}