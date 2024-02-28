import AppSerializer from 'irrigation-system/serializers/application';
export default class FacilityPartySerializer extends AppSerializer{
  primaryKey = 'facilityPartyId';
  attrs = {
    party: { serialize:'ids',deserialize:'records' },
    facility: { serialize:'ids',deserialize:'records' },
    partyRoleType: { embedded: 'always' }
  }
};
