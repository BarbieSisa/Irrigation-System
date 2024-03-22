import BaseRoute from 'irrigation-system/base-elements/base-route'; 
import { inject as service } from '@ember/service';
export default class UserEditRoute extends BaseRoute {
  @service('current-user') currentUser;

  beforeModel(transition) {
    super.beforeModel(...arguments);
    if (this.currentUser.isCustomer && transition.to.params.party_id != this.currentUser.get('loggedUser.party.partyId')) {
      this.router.transitionTo('home.insufficient-permissions');
    }
  };

  async model(params) {
    if (params && params.party_id) {
      const party = await this.store.queryRecord('party', {
        endPoint: 'parties/' + params.party_id,
      })
      return party;
    }
  }
}