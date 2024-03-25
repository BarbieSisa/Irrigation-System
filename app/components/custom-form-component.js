import Ember from 'ember';
import BaseComponent from 'irrigation-system/base-elements/base-component';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { scheduleOnce } from '@ember/runloop';
import { set } from '@ember/object';
export default class CustomFormComponent extends BaseComponent {
  tagName = '';
  @tracked dateElement;
  @tracked disableOnDateChange = false;
  @tracked onDateFocusOutFunc;
  init() {
    super.init(...arguments);
    if (this.componentType == 'date') {
      scheduleOnce('afterRender', this, function () {
        let onDateFocusOut = (e) => {
          if (this.disableOnDateChange) {
            this.disableOnDateChange = false;
            this.doChangeDate(e.target.value);
          }
        }
        this.onDateFocusOutFunc = onDateFocusOut;
        let element = document.getElementsByClassName('date-component-' + this.get('componentId'))[0];
        if (element != null) {
          this.dateElement = element;
          element.addEventListener("focusout", (event) => {
            this.onDateFocusOutFunc(event);
          });
        }
      });
    }
  };

  willDestroyElement() {
    super.willDestroyElement(...arguments);
    
    if (this.get('dateElement') != null) {
      this.get('dateElement').removeEventListener("focusout", (event) => {
        this.get('onDateFocusOutFunc')(event);
      });
    }
  };
  
  @computed()
  get internalDateValue(){
    let value = this.value
    if (this.componentType == 'date' && value) {
      if (typeof value == 'string') {
        value = parseInt(value)
      }
      let date = new Date(value);
      let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      let year = date.getFullYear();

      return year + "-" + month + "-" + day;
    }
    return null;
  };

  @computed('value')
  get componentId(){
    return Ember.uuid();
  };

  doChangeDate(value) {
    if (this.onChange) {
      if (value) {
        let dateParts = value.split("-");
        let year = parseInt(dateParts[0]);
        let month = parseInt(dateParts[1]) - 1;
        let date = parseInt(dateParts[2]);
        let finalTimestamp = new Date(year, month, date).getTime();
        if (finalTimestamp <= 0) {
          finalTimestamp = new Date().getTime();
        }
        this.onChange(finalTimestamp);
      } else {
        this.onChange(null);
      }
    }
  };

  @action
  onDateKeyDown() {
    this.disableOnDateChange = true;
  };

  @action
  onDateChange(e) {
    if (!this.disableOnDateChange) {
      this.doChangeDate(e.target.value);
    }
  };

  @action
  onNewSelectChange(event) {
    if (this.onChange) {
      this.onChange(event.target.value);
    } else {
      set(this, 'value', event.target.value)
    }
  };

  @action
  onRawInputChange(event) {
    let value = null;
    if (this.componentType === 'checkbox') {
      value = event.target.checked;
    } else {
      value = event.target.value;
    }
    if (this.onChange) {
      this.onChange(value);
    } else {
      set(this, 'value', value)
    }
  };
}