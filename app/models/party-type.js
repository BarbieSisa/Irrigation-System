import { attr } from '@ember-data/model'; 
import BaseModel from 'irrigation-system/base-elements/base-model'; 
export default class PartyTypeModel extends BaseModel { 
  @attr('number') partyTypeId;
  @attr('string') partyTypeName;
  @attr('string') partyTypeCode;
}