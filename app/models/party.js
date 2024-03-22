import { attr, belongsTo, hasMany } from '@ember-data/model'; 
import BaseModel from 'irrigation-system/base-elements/base-model'; 
export default class PartyModel extends BaseModel {
  @attr('number') partyId;
  @attr('number', { 
    defaultValue() { return new Date().getTime(); } 
  }) fromDate; 
  @attr('number') thruDate;
  
  @belongsTo('user', { async: true, inverse: "party" }) user;
  @belongsTo('person', { async: true, inverse: null }) person;
  @belongsTo('party-type', { async: true, inverse: null }) partyType;

  @hasMany('facility-party', {    
    defaultValue() {    
      return [];    
    },    
    async: true,     
    inverse: 'party'    
  }) facilityParties; 
}