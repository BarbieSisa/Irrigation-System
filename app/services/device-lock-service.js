import Ember from 'ember';
import Service from '@ember/service';
import { inject as service } from '@ember/service';
export default class DeviceLockService extends Service {
  @service store;
  @service('custom-fetch') customFetch;
  @service notify;

  checkDeviceLockKeyMatch(lockModel,deviceId){
    if (!deviceId) {
      return null;
    }
    let lockDeviceModelNameFromStorage = 'deviceLock-' + deviceId;
    let keyFromSessionStorage =  window.sessionStorage[lockDeviceModelNameFromStorage]
    return lockModel.id == keyFromSessionStorage;
  };

  async getDeviceLockModel(deviceId){
    if (deviceId) {
      try {
        let data = await this.customFetch.makeRequest({
          endPoint: "devices/" + deviceId + "/locks/active",
        });
        let unpacked = data && data.data ? this.customFetch.unpack(data) : null;
        unpacked = unpacked ? unpacked.data : null;
        return unpacked;
      } catch (error) {
        this.notify.error("Something went wrong..");
        console.log(error);
      }
    }
    return await new Promise((resolve, reject) => {
      resolve(null);
    });
  };

  async setDeviceLockState({
    deviceId: deviceId,
    lockModel: lockModel,
    lock: lock,
    overwriteLock: overwriteLock
  }) {
    if (!deviceId) {
      return await new Promise((resolve, reject) => {
        resolve(null);
      });
    }
    let lockDeviceModelNameFromStorage = 'deviceLock-' + deviceId;
    let keyFromSessionStorage = window.sessionStorage[lockDeviceModelNameFromStorage];

    try {
      if (!lock) {
        if (keyFromSessionStorage) {
          await this.customFetch.makeRequest({
            type: "DELETE",
            endPoint: "locks/" + keyFromSessionStorage,
          })
          delete window.sessionStorage[lockDeviceModelNameFromStorage] ;
        }
        return await new Promise((resolve, reject) => {
          resolve(true);
        });
      }
  
      if (lockModel && lockModel.id) {
        if (keyFromSessionStorage || overwriteLock) {
          let data = await this.customFetch.makeRequest({
            type: "POST",
            endPoint: "devices/" + deviceId + "/locks",
            queryParams:{
              force:overwriteLock
            }
          });
          var unpacked = this.customFetch.unpack(data),
          unpacked = unpacked ? unpacked.data : {};
          unpacked.id ? window.sessionStorage[lockDeviceModelNameFromStorage] = unpacked.id : delete window.sessionStorage[lockDeviceModelNameFromStorage];
          return unpacked ? true : false;
        }
        console.log('Device is already being edited!')
        return await new Promise((resolve, reject) => {
          resolve(false);
        });
  
      } else {
        let data = await this.customFetch.makeRequest({
          type: "POST",
          endPoint: "devices/" + deviceId + "/locks",
          queryParams:{
            force:overwriteLock
          }
        })
        var unpacked = this.customFetch.unpack(data),
        unpacked = unpacked ? unpacked.data : null;
        if (unpacked && unpacked.id) {
          window.sessionStorage[lockDeviceModelNameFromStorage] = unpacked.id;
          return true;
        }
        return false;
      }
    } catch (error) {
      this.notify.error("Something went wrong..");
      console.log(error);
    }
  };

  async resetDeviceLockStateOnDestroy(deviceId){
    if (!deviceId) {
      return await new Promise((resolve, reject) => {
        resolve(null);
      });
    }
    let lockDeviceModelNameFromStorage = 'deviceLock-' + deviceId;
    let keyFromSessionStorage = window.sessionStorage[lockDeviceModelNameFromStorage];
    delete window.sessionStorage[lockDeviceModelNameFromStorage];
    if (keyFromSessionStorage) {
      let url = Ember.apiUrl + 'locks/' + keyFromSessionStorage;
      var headers = new Headers();
      for (let key in (Ember.headers || {})) {
        headers.append(key, Ember.headers[key]);
      }
      var fetchOptions = {
        method: "DELETE",
        headers: headers,
        referrerPolicy: 'no-referrer',
        credentials:'include',
        keepalive: true
      };
  
      return await fetch(url, fetchOptions);
    }
    return await new Promise((resolve, reject) => {
      resolve(null);
    });
  };
}
