import Ember from 'ember';
import BaseComponent from 'irrigation-system/base-elements/base-component';
import { action, computed } from '@ember/object';
export default class BaseModalComponent extends BaseComponent {
  tagName = 'span';
  @computed()
  get componentId(){
    return Ember.uuid();
  }
  
  @action
  closeModal() {
    this.showModal = false;
  };
}