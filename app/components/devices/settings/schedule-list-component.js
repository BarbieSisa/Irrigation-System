import BaseComponent from 'irrigation-system/base-elements/base-component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
export default class ScheduleListComponent extends BaseComponent {
  tagName = '';
  @tracked selectedTab = 'schedule0';
  @tracked selectedSchedule = null;
  @tracked scheduleLoading = false;

  init() {
    super.init(...arguments);
    this.selectedSchedule = (this.deviceSettings.scheduledSettings || [])[0];
  };

  @action
  changeScheduleTab(idx){
    this.selectedTab = 'schedule' + idx;
    this.selectedSchedule = (this.deviceSettings.scheduledSettings || []).find(p=>p.get('idx') == idx);
    this.scheduleLoading = true;
    setTimeout(() => {
      this.scheduleLoading = false;
    }, 100);
  };
}