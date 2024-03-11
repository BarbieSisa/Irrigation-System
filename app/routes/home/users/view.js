import BaseRoute from 'irrigation-system/base-elements/base-route'; 
export default class UserViewRoute extends BaseRoute {
  async model(params) {
    if (params && params.party_id) {
      const user = await this.store.queryRecord('party', {
        endPoint: 'parties/' + params.party_id,
      })
      return user;
    }
  }
}