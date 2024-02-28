import AppSerializer from 'irrigation-system/serializers/application';
export default class FacilitySerializer extends AppSerializer{
  primaryKey = 'facilityId';
  attrs = {
    facilityParties: {embedded: 'always'}
  }
};
