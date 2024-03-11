import BaseRoute from 'irrigation-system/base-elements/base-route'; 
export default class UserCreateRoute extends BaseRoute {
  async model(params) {
    return this.store.createRecord('party', {
      user: this.store.createRecord('user', {
        userRoles: [this.store.createRecord('user-role')]
      }),
      person: this.store.createRecord('person')
    });
  }
}