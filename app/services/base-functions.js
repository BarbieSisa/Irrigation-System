import Service from '@ember/service';
import { inject as service } from '@ember/service';
export default class BaseFunctions extends Service {
  @service('custom-fetch') customFetch;

  formIsValid(opt){
    if (opt == null || opt.selector == null) {
      return false;
    }

    var valid = true;

    if (opt.prepFunc) {
      var prepFuncValidity = opt.prepFunc.call(this);
      if (prepFuncValidity != null && (prepFuncValidity == true || prepFuncValidity == false)) {
        valid = valid && prepFuncValidity;
      }
    }

    if (!document.querySelector(opt.selector).checkValidity()) {
      document.querySelector(opt.selector).classList.add("was-validated")
      valid = false;
      document.querySelector(opt.selector).reportValidity();
    } else {
      document.querySelector(opt.selector).classList.remove("was-validated")
    }

    if (opt.postFunc) {
      var postFuncValidity = opt.postFunc.call(this);
      if (postFuncValidity != null && (postFuncValidity == true || postFuncValidity == false)) {
        valid = valid && postFuncValidity;
      }
    }
    return valid;
    //return true;
  };

  async loadDeviceConfig(device) {
    if (device == null) {
      return null;
    }
    try {
      let reqData = await this.customFetch.makeRequest({
        endPoint: "syncdrives/" + device.get('deviceId') + "/conf",
      })
      let config = reqData !== null ? reqData.data : null;
      let parsedConfig = this.parseConfig(config);
      return parsedConfig;
    } catch (error) {
      if (error && error.statusCode === "FAILURE" && error.errorCode === "ERROR_DEVICE_SYNCDRIVE_DOES_NOT_EXIST") {
        return null;
      }
      throw err;
    }
  };

  parseConfig(data) {
    let config = '';
    if (data && data.deviceSyncblocks) {

      for (let idx = 0; idx < data.deviceSyncblocks.length; idx++) {
        let block = data.deviceSyncblocks[idx];
        block = block.deviceSyncblockData;
        block = atob(idx !== data.deviceSyncblocks.length ? block : block.substr(0, block.length - 8));
        block = block.substr(0, block.indexOf('\0') !== -1 ? block.indexOf('\0') : block.length);
        if (!block || block.length === 0) {
          break;
        }
        config = config + block;
      }
      config = JSON.parse(config || null);
    }
    return config ? config : null;
  };

  getDateOnly(dateTime){
    dateTime = new Date(dateTime || new Date());
    return new Date(dateTime.getFullYear(),dateTime.getMonth(),dateTime.getDate()).getTime();
  };

  getBeginningOfDay(date){
    return this.getDateOnly(date);
  };

  getEndOfDay(date){
    date = new Date(this.getDateOnly(date));
    date.setSeconds(59);
    date.setMinutes(59);
    date.setHours(23);
    return date.getTime();
  };
}