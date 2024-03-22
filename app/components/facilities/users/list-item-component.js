import InfinityScrollItemComponent from 'irrigation-system/base-elements/infinity-scroll-item-component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
export default class FacilityUsersListItemComponent extends InfinityScrollItemComponent {
  @service('user-access-managing') userAccessManagingService;
  
  @computed('facility.facilityId', 'facility.isDeleted', 'facility.isDestroyed', 'facility.isDestroying', 'facility.facilityParties.@each.{partyRoleTypeId,partyId}', 'party.partyId')
  get hasFacAccess() {
    let facilityIsUnderDestruction = this.get('facility.isDeleted') || this.get('facility.isDestroyed') || this.get('facility.isDestroying');
    if (facilityIsUnderDestruction) {
      return false;
    }
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
      this.notify.error("Something went wrong..");
      console.log(error)
    }
  }

  @action
  gotoUser(userId){
    if (this.currentUser.isCustomer && this.currentUser.get('loggedUser.party.partyId') != userId) {
      this.notify.warning('You do not have permissions to view this user!');
      return;
    }
    this.router.transitionTo('home.users.view', userId);
  }
}