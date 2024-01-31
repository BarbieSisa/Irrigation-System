import { attr, belongsTo, hasMany } from '@ember-data/model';
import BaseModel from 'irrigation-system/base-elements/base-model'; 

export default class DeviceListComponentModel extends BaseModel {
  @attr('number') deviceId;
  @attr('string') deviceName;
  @attr('string') serialNumber; 
  @attr('number', { 
    defaultValue() { return new Date().getTime(); } 
  }) fromDate;

  @belongsTo('party', { async: true, inverse: "device" }) party;

  @hasMany('device-type', { async: true, inverse: "device" }) deviceTypes;

  @hasMany('device-attr', { async: true, inverse: "device" }) deviceAttributes;
}