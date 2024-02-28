import { attr, hasMany } from '@ember-data/model'; 
import BaseModel from 'irrigation-system/base-elements/base-model'; 
export default class ProductTypeModel extends BaseModel { 
  @attr('number') productTypeId;
  @attr('string') productTypeCode;
  @attr('number', { 
    defaultValue() { return new Date().getTime(); } 
  }) fromDate; 
  @attr('number') thruDate;

  @hasMany('product',{
    defaultValue(){return [];},
    async: true, 
    inverse: "productType"
  }) products;
}