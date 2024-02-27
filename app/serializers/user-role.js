import AppSerializer from 'irrigation-system/serializers/application';
export default class UserRoleSerializer extends AppSerializer{
  primaryKey = 'userRoleId';
  attrs = {
    roleType: {serialize:'ids', deserialize:'records'},
  }
};
