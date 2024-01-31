import { attr, belongsTo } from '@ember-data/model'; 
import BaseModel from 'irrigation-system/base-elements/base-model'; 
export default class DeviceAttrModel extends BaseModel { 
  @attr('number') deviceAttrId;
  @attr('string') attrName;
  @attr('string') attrValue;
  @attr('number', { 
    defaultValue() { return new Date().getTime(); } 
  }) fromDate; 
  @attr('number') thruDate;
  @attr('boolean') createEvent;

  @belongsTo('device', { async: true, inverse: 'deviceAttributes' }) device;
}
