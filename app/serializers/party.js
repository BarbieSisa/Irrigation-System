import AppSerializer from 'irrigation-system/serializers/application';
export default class PartySerializer extends AppSerializer{
  primaryKey = 'partyId';
  attrs = {
    user: {serialize:'ids',deserialize:'records'},
    person: {embedded: 'always'},
  }
};
