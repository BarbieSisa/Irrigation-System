import InfinityScrollItemComponent from 'irrigation-system/base-elements/infinity-scroll-item-component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
export default class FacilityUsersListItemComponent extends InfinityScrollItemComponent {
  @service('user-access-managing') userAccessManagingService;
  
  @computed('facility.facilityId', 'facility.facilityParties.@each.{partyRoleTypeId,partyId}', 'party.partyId')
  get hasFacAccess() {
    let facilityParty = (this.get('facility.facilityParties') || []).find(p => p.get('party.partyId') == this.get('party.partyId'));
    if (facilityParty) {
      if (facilityParty.get('partyRoleType.roleTypeId') == this.roleTypes.FACILITY_PARTY_ROLE_RESTRICTED_ID) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  };

  @action
  async toggleAccess() {
    try {
      let grantFacAccess = !this.get('hasFacAccess');
      const promise = await this.userAccessManagingService.setupPersonAccessToFacility({
        partyId: this.get('party.partyId'),
        facilityId: this.get('facility.facilityId'),
        grantFacAccess: grantFacAccess
      });
      if (grantFacAccess) {
        this.notify.success('Access granted');
      } else {
        this.notify.warning('Access removed')
      }
      console.log(grantFacAccess ? 'Access granted' : 'Access removed');
      return promise;
    } catch (error) {
      this.notify.error(error);
      console.log(error)
    }
  }

  @action
  gotoUser(userId){
    this.router.transitionTo('home.users.edit', userId);
  }
}