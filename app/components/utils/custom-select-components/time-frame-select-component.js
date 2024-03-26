import BaseComponent from 'irrigation-system/base-elements/base-component';
import { action } from '@ember/object';
export default class TimeFrameSelectComponent extends BaseComponent {
  tagName = '';
  setTimeFrameOption(value, fromDate, thruDate) {
    fromDate = fromDate ? fromDate : this.baseFunctions.getBeginningOfDay(fromDate);
    thruDate = thruDate ? thruDate : this.baseFunctions.getEndOfDay(thruDate);
    if (this.onChange) {
      this.onChange(value, fromDate, thruDate);
    } else {
      this.timeFrame = value;
      this.fromDate = fromDate;
      this.thruDate = thruDate;
    }
  };

  @action
  setTimeFrame(value) {
    let fromDate = this.fromDate;
    let thruDate = this.thruDate;
    if (value == 'Today') {
      fromDate = this.baseFunctions.getBeginningOfDay();
      thruDate = this.baseFunctions.getEndOfDay();
    }
    if (value == 'Yesterday') {
      let yesterday = new Date();
      yesterday.setDate(yesterday.getDate()-1);
      fromDate = this.baseFunctions.getBeginningOfDay(yesterday);
      thruDate = this.baseFunctions.getEndOfDay(yesterday);
    }
    this.setTimeFrameOption(value,fromDate,thruDate)
  };

  @action
  setFromDate(date) {
    this.setTimeFrameOption('Custom',date,this.thruDate)
  };

  @action
  setThruDate(date) {
    this.setTimeFrameOption('Custom',this.fromDate,date)
  };
}