import Service from '@ember/service';
import { inject as service } from '@ember/service';
export default class UserAccessManagingService extends Service {
  @service store;

  unloadRecords(records) {
    (records || []).toArray().forEach((record) => {
      try {
        record.customUnloadRecord();
      } catch (err) {
        console.log(err);
      }
    });
  };

  async setupPersonAccessToFacility({
    partyId,
    facilityId,
    grantFacAccess
  }) {
    try {
      if (partyId == null || facilityId == null || grantFacAccess == null) {
        throw "INVALID_ARGUMENTS";
      }
      let accessType = grantFacAccess ? 'grant-access' : 'remove-access';
      let currentFacilityParties = this.store.peekAll('facility-party')
        .filter(p => p.get('facility.facilityId') == facilityId && p.get('party.partyId') == partyId);

      let facilityParties = await this.store.query('facility-party', {
        endPoint: 'facilities/' + facilityId + '/party/' + partyId + '/' + accessType,
        type: 'POST'
      })
      
      let facilityPartyIdList = (facilityParties || []).toArray().map(p => p.get('facilityPartyId'));
      let facilityPartiesToUnload = currentFacilityParties.filter(p => facilityPartyIdList.indexOf(p.get('facilityPartyId')) == -1);
      this.unloadRecords(facilityPartiesToUnload);
      return facilityParties;
    } catch (error) {
      console.log(error);
    }
  };
}