import { attr } from '@ember-data/model'; 
import BaseModel from 'irrigation-system/base-elements/base-model';
export default class UomModel extends BaseModel { 
  @attr('number') uomId;
  @attr('string') uomCode;
  @attr('number', { 
    defaultValue() { return new Date().getTime(); } 
  }) fromDate; 
  @attr('number') thruDate;
}