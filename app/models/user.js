import { attr, belongsTo } from '@ember-data/model'; 
import BaseModel from 'irrigation-system/base-elements/base-model'; 
export default class UserModel extends BaseModel { 
  @attr('number') userId;
  @attr('string') email;
  @attr('string') password;
  @attr('string') confirmPassword;
  @attr('number', { 
    defaultValue() { return new Date().getTime(); } 
  }) fromDate; 

  @belongsTo('party', { async: true, inverse: "user" }) party;
}