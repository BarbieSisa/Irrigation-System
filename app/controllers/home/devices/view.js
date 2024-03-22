import BaseController from 'irrigation-system/base-elements/base-controller'; 
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
export default class DevicesViewController extends BaseController {
  @service router;
  @tracked selectedTab = 'liveData';
  @action
  edit(deviceId) {
    this.router.transitionTo('home.devices.edit', deviceId)
  }
  @action
  async deleteDevice() {
    try {
      await this.customFetch.makeRequest({
        endPoint: "devices/delete-device/" + this.model.deviceId,
        type: "DELETE",
      })
      this.notify.warning('Device deleted!');
      this.model.customUnloadRecord();
      return this.router.transitionTo('home.devices.index');
    } catch (error) {
      this.notify.error("Something went wrong..");
      console.log(error)
    }
  };
}