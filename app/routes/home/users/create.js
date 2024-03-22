import BaseRoute from 'irrigation-system/base-elements/base-route'; 
import { inject as service } from '@ember/service';
export default class UserCreateRoute extends BaseRoute {
  @service('current-user') currentUser;

  beforeModel(transition) {
    super.beforeModel(...arguments);
    if (this.currentUser.isCustomer && transition.to.params.party_id != this.currentUser.get('loggedUser.party.partyId')) {
      this.router.transitionTo('home.insufficient-permissions');
    }
  };

  async model(params) {
    return this.store.createRecord('party', {
      user: this.store.createRecord('user', {
        userRoles: [this.store.createRecord('user-role')]
      }),
      person: this.store.createRecord('person')
    });
  }
}