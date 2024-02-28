import { attr, belongsTo } from '@ember-data/model'; 
import BaseModel from 'irrigation-system/base-elements/base-model'; 
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
export default class FacilityPartyModel extends BaseModel { 
  @service('role-type') roleTypes;

  @attr('number') facilityPartyId;
  @attr('number') startActiveDate;
  @attr('number') endActiveDate;
  @attr('number', { 
    defaultValue() { return new Date().getTime(); } 
  }) fromDate; 
  @attr('number') thruDate;

  @belongsTo('party', { async: true, inverse: 'facilityParties' }) party;
  @belongsTo('facility', { async: true, inverse: 'facilityParties' }) facility;
  @belongsTo('role-type', { async: true, inverse: null }) partyRoleType;

  @computed('party.partyId')
  get partyId() {
    return this.get('party.partyId');
  };
  @computed('partyRoleType.roleTypeId')
  get partyRoleTypeId() {
    return this.get('partyRoleType.roleTypeId');
  };
  @computed('partyRoleType.roleTypeId')
  get isRestricted() {
    return this.get('partyRoleType.roleTypeId') == this.get('roleTypes.FACILITY_PARTY_ROLE_RESTRICTED_ID');
  };
  @computed('partyRoleType.roleTypeId')
  get isAllowed() {
    return this.get('partyRoleType.roleTypeId') == this.get('roleTypes.FACILITY_PARTY_ROLE_USER_ASSOC_ID');
  };
}
