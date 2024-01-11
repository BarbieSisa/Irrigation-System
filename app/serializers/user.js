import AppSerializer from 'irrigation-system/serializers/application';
export default class UserSerializer extends AppSerializer{
  primaryKey = 'userId';
  attrs = {
    party: {embedded: 'always'}
  }
};
