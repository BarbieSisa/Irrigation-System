import BaseComponent from 'irrigation-system/base-elements/base-component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
export default class UsersEditComponent extends BaseComponent {
  @tracked firstName;
  @tracked lastName;
  @tracked email;
  @tracked pwd;
  @tracked confirmPassword;
  @tracked userRoleId;
  init() {
    super.init(...arguments);
    this.firstName = this.model.get('person.firstName');
    this.lastName = this.model.get('person.lastName');
    this.email = this.model.get('user.email');
    this.pwd = "";
    this.confirmPassword = "";
    this.userRoleId = this.model.get('user.userRoles.firstObject.roleType.roleTypeId');
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);
    try {
      this.store.removeAllNew_NewMethod();
    } catch (error) {
      
    }
  }

  @action
  save(){
    this.model.set('person.firstName', this.firstName);
    this.model.set('person.lastName', this.lastName);
    this.model.set('user.email', this.email);
    this.model.set('user.password', this.pwd);
    this.model.set('user.confirmPassword', this.confirmPassword);
    this.model.set('user.userRoles.firstObject.roleType', this.store.peekRecord('role-type', this.userRoleId));
    let options = null;
    if (this.model.partyId == null) {
      options = {
        adapterOptions: {
          endPoint: "users/create-user",
        }
      }
    }
    return getObject(this.model.user).save(options);
  }

  @action
  cancel(){
    return history.back();
  }
}