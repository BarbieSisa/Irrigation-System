import BaseComponent from 'irrigation-system/base-elements/base-component';
import { action } from '@ember/object';
export default class CustomFormComponent extends BaseComponent {
  tagName = '';

  @action
  onNewSelectChange(event) {
    this.value = event.target.value;
    if (this.get('onChange')) {
      this.get('onChange')(event.target.value);
    }
  };

  @action
  onRawInputChange(event) {
    let value = null;
    if (this.get('componentType') === 'checkbox' || this.get('componentType') === 'switch') {
      value = event.target.checked;
      this.value = value;
    } else {
      this.value = event.target.value;
    }
    if (this.get('onChange')) {
      this.get('onChange')(value);
    }
  };
}