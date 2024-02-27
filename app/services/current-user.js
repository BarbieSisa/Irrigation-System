import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
export default class CurrentUser extends Service {
  @service store;
  loggedUser = null;
  async setup(){
    let user = await this.store.queryRecord('user', {
      endPoint: "users/me"
    })
    if (user != null){
      this.loggedUser = user;
    }
  };

  @computed('loggedUser.userId')
  get isAdmin(){
    if (this.loggedUser == null) {
      return false;
    }

    return this.loggedUser.get('userRoles.firstObject.roleType.roleTypeId') == this.roleTypes.USER_ROLE_ADMIN_ID;
  }

  @computed('loggedUser.userId')
  get isSuperUser(){
    if (this.loggedUser == null) {
      return false;
    }

    return this.loggedUser.get('userRoles.firstObject.roleType.roleTypeId') == this.roleTypes.USER_ROLE_SUPER_USER_ID;
  }

  @computed('loggedUser.userId')
  get isCustomer(){
    if (this.loggedUser == null) {
      return false;
    }

    return this.loggedUser.get('userRoles.firstObject.roleType.roleTypeId') == this.roleTypes.USER_ROLE_CUSTOMER_ID;
  }
}