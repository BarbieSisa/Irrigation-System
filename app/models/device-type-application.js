import { attr } from '@ember-data/model'; 
import BaseModel from 'irrigation-system/base-elements/base-model'; 
export default class DeviceTypeApplicationModel extends BaseModel { 
  @attr('number') deviceApplicationId;
  @attr('string') deviceApplicationName;
  @attr('string') deviceApplicationDescription;
}
