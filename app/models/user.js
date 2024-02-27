import { attr, belongsTo, hasMany } from '@ember-data/model'; 
import BaseModel from 'irrigation-system/base-elements/base-model'; 
import { computed } from '@ember/object';
export default class UserModel extends BaseModel { 
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
}