import { attr } from '@ember-data/model'; 
import BaseModel from 'irrigation-system/base-elements/base-model'; 
export default class ApplicationTypeModel extends BaseModel { 
  @attr('number') applicationTypeId;
  @attr('string') applicationTypeKey;
  @attr('string') applicationTypeName;
  @attr('string') applicationTypeDesc;
  @attr('number', { 
    defaultValue() { return new Date().getTime(); } 
  }) fromDate; 
  @attr('number') thruDate;
}
