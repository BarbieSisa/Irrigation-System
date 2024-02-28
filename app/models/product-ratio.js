import { attr, belongsTo } from '@ember-data/model'; 
import BaseModel from 'irrigation-system/base-elements/base-model';
export default class ProductRatioModel extends BaseModel { 
  @attr('number') productRatioId;
  @attr('number') ratio;
  @attr('number', { 
    defaultValue() { return new Date().getTime(); } 
  }) fromDate; 
  @attr('number') thruDate;

  @belongsTo('uom', { async: true, inverse: null }) toUom;
  @belongsTo('product', { async: true, inverse: "productRatios" }) product;
}