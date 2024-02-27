import BaseRoute from 'irrigation-system/base-elements/base-route'; 
export default class DeviceEditRoute extends BaseRoute {
  async model(params) {
    if (params && params.party_id) {
      const party = await this.store.queryRecord('party', {
        endPoint: 'parties/' + params.party_id,
      })
      return party;
    }
  }
}