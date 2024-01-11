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
    let confirmationKey = this.get('confirmationKey');

    let session = this.get('session');
    await session.authenticate('authenticator:custom', {
        email,
        password,
        confirmationKey
      })
    document.removeEventListener("keyup", this.OnEnterFunc);
    return this.get('router').transitionTo('home');
  }
}