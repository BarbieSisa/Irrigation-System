import BaseComponent from 'irrigation-system/base-elements/base-component';
import { scheduleOnce } from '@ember/runloop';
import { action } from '@ember/object';
export default class FacilityDevicesListItemComponent extends BaseComponent {
  init() {
    super.init(...arguments);
    scheduleOnce('afterRender', this, function () {
      const element = this.element;
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      };

      const callback = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && this.lastAvailableItemIndex == this.index && this.onShouldLoadNextPage) {
            this.onShouldLoadNextPage();
          }
        });
      };

      const observer = new IntersectionObserver(callback, options);

      observer.observe(element);
    });
  }

  @action
  gotoDevice(deviceId){
    this.router.transitionTo('home.devices.edit', deviceId);
  }
}