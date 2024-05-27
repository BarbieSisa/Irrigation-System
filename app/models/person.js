import { attr } from '@ember-data/model'; 
import BaseModel from 'irrigation-system/base-elements/base-model'; 
import { computed } from '@ember/object';
export default class PersonModel extends BaseModel { 
  @attr('number') personId;
  @attr('string') firstName;
  @attr('string') lastName;

  @computed('firstName', 'lastName')
  get fullName(){
    return this.firstName + " " + this.lastName;
  }
}
