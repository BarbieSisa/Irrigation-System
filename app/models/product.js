import { attr, belongsTo, hasMany } from '@ember-data/model'; 
import BaseModel from 'irrigation-system/base-elements/base-model';
export default class ProductModel extends BaseModel { 
  @attr('number') productId;
  @attr('string') productName;
  @attr('number', { 
    defaultValue() { return new Date().getTime(); } 
  }) fromDate; 
  @attr('number') thruDate;
  @attr('number') price;
  @attr('number') remQty;

  @belongsTo('facility',{ async: true, inverse:'products' }) facility;
  @belongsTo('currency', { async: true, inverse: null }) currency;
  @belongsTo('uom', { async: true, inverse: null }) uom;
  @belongsTo('product-type', { async: true, inverse: "products" }) productType;

  @hasMany('product-ratio', { 
    defaultValue() { 
      return []; 
    },
    async: true, 
    inverse: "product"
  }) productRatios; 

  @hasMany('product-load', { 
    defaultValue() { 
      return []; 
    },
    async: true, 
    inverse: "product"
  }) productLoads; 
}