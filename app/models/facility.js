import { attr, belongsTo, hasMany } from '@ember-data/model'; 
import BaseModel from 'irrigation-system/base-elements/base-model'; 
export default class FacilityModel extends BaseModel { 
  @attr('number') facilityId;    
  @attr('string') facilityName;    
  @attr('number', {    
    defaultValue() { return new Date().getTime(); }    
  }) fromDate;    
  @attr('number') thruDate;   

  @hasMany('device', {    
    defaultValue() {    
      return [];    
    },    
    async: true,     
    inverse: 'facility'    
  }) devices;     
  
  @hasMany('product', {    
    defaultValue() {    
      return [];    
    },    
    async: true,     
    inverse: 'facility'    
  }) products; 
}