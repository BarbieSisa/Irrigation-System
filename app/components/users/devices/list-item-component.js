import InfinityScrollItemComponent from 'irrigation-system/base-elements/infinity-scroll-item-component';
import { action } from '@ember/object';
export default class UsersDevicesListItemComponent extends InfinityScrollItemComponent {
  @action
  gotoDevice(deviceId){
    this.router.transitionTo('home.devices.edit', deviceId);
  }
}