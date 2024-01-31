import { attr } from '@ember-data/model';
import BaseModel from 'irrigation-system/base-elements/base-model'; 
export default class DeviceTypeModel extends BaseModel {
  @attr('number') deviceTypeId;
  @attr('string') deviceTypeCode;

}