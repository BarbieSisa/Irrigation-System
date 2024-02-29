import Ember from 'ember';
import BaseRoute from 'irrigation-system/base-elements/base-route'; 
import { inject as service } from '@ember/service';
export default class DeviceEditRoute extends BaseRoute {
  @service('device-lock-service') deviceLockService;

  async model(params){
    if (params && params.device_id) {
      let promises = {};
      promises.device = this.store.findRecord('device', params.device_id, {reload: true});
      promises.deviceLock = this.deviceLockService.getDeviceLockModel(params.device_id);
      const hash = await Ember.RSVP.hashSettled(promises);
      let device = hash && hash.device ? hash.device.value : null;
      let deviceLock = hash && hash.deviceLock ? hash.deviceLock.value : null;
      return {device:device, deviceLock:deviceLock};
    }
  };
}