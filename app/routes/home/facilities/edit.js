import BaseRoute from 'irrigation-system/base-elements/base-route'; 
export default class FacilityEditRoute extends BaseRoute {
  async model(params) {
    if (params && params.facility_id) {
      const facility = await this.store.queryRecord('facility', {
        endPoint: 'facilities/' + params.facility_id,
      })
      return facility;
    }
  }
}