import { attr, belongsTo } from '@ember-data/model'; 
import BaseModel from 'irrigation-system/base-elements/base-model'; 
export default class EventTypeModel extends BaseModel { 
  @attr('number') eventTypeId;
  @attr('string') associatedTo;
  @attr('string') eventTypeName;
  @attr('number') internalEventTypeId;
  @attr('number', { 
    defaultValue() { return new Date().getTime(); } 
  }) fromDate; 
  @attr('number') thruDate;

  @belongsTo('device-type', { async: true, inverse: 'eventTypes' }) deviceType;
}
