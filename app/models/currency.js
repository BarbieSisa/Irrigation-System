import { attr } from '@ember-data/model'; 
import BaseModel from 'irrigation-system/base-elements/base-model';
export default class CurrencyModel extends BaseModel { 
  @attr('number') currencyId;
  @attr('string') currencyCode;
  @attr('string') currencyUom;
  @attr('string') currencyName;
  @attr('number', { 
    defaultValue() { return new Date().getTime(); } 
  }) fromDate; 
  @attr('number') thruDate;
}
