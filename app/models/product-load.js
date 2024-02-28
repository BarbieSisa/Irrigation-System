import { attr, belongsTo } from '@ember-data/model'; 
import BaseModel from 'irrigation-system/base-elements/base-model';
export default class ProductLoadModel extends BaseModel { 
  @attr('number') productLoadId;
  @attr('string') notes;
  @attr('string') additionalNotes;
  @attr('number', { 
    defaultValue() { return new Date().getTime(); } 
  }) fromDate; 
  @attr('number') thruDate;
  @attr('number') loadedQty;
  @attr('number') atRemQty;
  @attr('number') price;

  @belongsTo('currency', { async: true, inverse: null }) currency;
  @belongsTo('party', { async: true, inverse: null }) party;
  @belongsTo('product', { async: true, inverse: "productLoads" }) product;
}
