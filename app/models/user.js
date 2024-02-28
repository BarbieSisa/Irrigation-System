import { attr, belongsTo, hasMany } from '@ember-data/model'; 
import BaseModel from 'irrigation-system/base-elements/base-model'; 
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
export default class UserModel extends BaseModel { 
  @service('role-type') roleTypes;

  @attr('number') userId;
  @attr('string') email;
  @attr('string') password;
  @attr('string') confirmPassword;
  @attr('number', { 
    defaultValue() { return new Date().getTime(); } 
  }) fromDate; 

  @belongsTo('party', { async: true, inverse: "user" }) party;
  @hasMany('user-role', {    
    defaultValue() {    
      return [];    
    },    
    async: true,     
    inverse: 'user'    
  }) userRoles;

  @computed('userId')
  get isSuperUser(){
    return this.get('userRoles.firstObject.roleType.roleTypeId') == this.roleTypes.USER_ROLE_SUPER_USER_ID;
  }

  @computed('userId')
  get isCustomer(){
    return this.get('userRoles.firstObject.roleType.roleTypeId') == this.roleTypes.USER_ROLE_CUSTOMER_ID;
  }
}