import { attr, belongsTo } from '@ember-data/model'; 
import BaseModel from 'irrigation-system/base-elements/base-model'; 
export default class UserRoleModel extends BaseModel { 
  @attr('number') userRoleId;
  @belongsTo('user', { async: true, inverse: "userRoles" }) user;
  @belongsTo('role-type', { async: true, inverse: null }) roleType;
}