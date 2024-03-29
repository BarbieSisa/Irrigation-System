import { attr, belongsTo, hasMany } from '@ember-data/model'; 
import BaseModel from 'irrigation-system/base-elements/base-model'; 
import { computed } from '@ember/object';
export default class DeviceModel extends BaseModel { 
  @attr('number') deviceId;    
  @attr('string') deviceName;    
  @attr('string') serialNumber;    
  @attr('boolean') active;    
  @attr('number', {    
    defaultValue() { return new Date().getTime(); }    
  }) fromDate;    
  @attr('number') thruDate;   
  @attr('string') deviceProductsToRemove;       
  @attr('string') configData;
  @belongsTo('device-type', { async: true, inverse: null }) deviceType;    
  @belongsTo('facility', { async: true, inverse: 'devices' }) facility;  

  @hasMany('device-attr', {    
    defaultValue() {    
      return [];    
    },    
    async: true,     
    inverse: 'device'    
  }) deviceAttributes;    

  @hasMany('device-product', {       
    defaultValue() {       
      return [];       
    },      
    async: true,       
    inverse: 'device'      
  }) deviceProducts;    
  
  @computed('deviceName', 'serialNumber')    
  get deviceNameAndSerialNumber() {    
    var result = "";    
    if (this.get('serialNumber')) {    
      result = this.get('serialNumber');    
    }    
    if (this.get('deviceName')) {    
      if (result) {    
        result += " - ";    
      }    
      result += this.get('deviceName');    
    }    
    return result;    
  };   
}