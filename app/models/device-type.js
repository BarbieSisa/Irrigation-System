import { attr, belongsTo, hasMany } from '@ember-data/model'; 
import BaseModel from 'irrigation-system/base-elements/base-model'; 
export default class DeviceTypeModel extends BaseModel { 
  @attr('number') deviceTypeId;
  @attr('string') deviceTypeCode;
  @attr('string') description;
  @attr('number', { 
    defaultValue() { return new Date().getTime(); } 
  }) fromDate; 
  @attr('number') thruDate;

  @belongsTo('application-type', { async: true, inverse: null }) applicationType;
  @belongsTo('device-type-application', { async: true, inverse: null }) deviceTypeApplication;
  @hasMany('event-type', { async: true, inverse: 'deviceType' }) eventTypes;
}
