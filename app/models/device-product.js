import { attr, belongsTo } from '@ember-data/model'; 
import BaseModel from 'irrigation-system/base-elements/base-model';
import { computed } from '@ember/object';
export default class DeviceProductModel extends BaseModel { 
  @attr('number') deviceProductId;
  @attr('string') key;
  @attr('number', { 
    defaultValue() { return new Date().getTime(); } 
  }) fromDate; 
  @attr('number') thruDate;

  @belongsTo('device', { async: true, inverse: 'deviceProducts' }) device;
  @belongsTo('product', { async: true, inverse: null }) product;

  @computed('key')
  get index() {
    if(this.get('key')){
      return parseInt(this.get('key').replace('q','').replace('p',''));
    }
    return null;
  };

  @computed('key')
  get pumpId() {
    if(this.get('key')){
      var index = parseInt(this.get('key').replace('q',''));
      return index % 10;
    }
    return null;
  };
}
