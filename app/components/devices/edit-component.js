import BaseComponent from 'irrigation-system/base-elements/base-component';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
export default class DevicesEditComponent extends BaseComponent {
  @service('device-type') deviceTypes;
  @service('device-lock-service') deviceLockService;

  @tracked serialNumber;
  @tracked deviceName;
  @tracked facilityId;
  @tracked deviceTypeId;
  @tracked showOverwriteLockModal = false;
  @tracked disableEdit = false;

  async init() {
    super.init(...arguments);
    try {
      if (!this.model.deviceId) {
        return this.doStuffOnInit();
      }
      if (this.deviceLock && this.deviceLock.id && !this.deviceLockService.checkDeviceLockKeyMatch(this.deviceLock, this.model.deviceId)) {
        this.showOverwriteLockModal = true;
        return false;
      } else if (this.deviceLock && this.deviceLock.id && this.deviceLockService.checkDeviceLockKeyMatch(this.deviceLock, this.model.deviceId)){
        return await this.enableEditMode();
      }
      let shouldEnableEdit = await this.deviceLockService.setDeviceLockState({
        deviceId: this.get('model.deviceId'),
        lockModel: this.get('deviceLock'),
        lock: true,
        overwriteLock: false
      })
  
      if (shouldEnableEdit) {
        await this.enableEditMode();
        return true;
      }
      return this.router.replaceWith('home.devices');
    } catch (error) {
      console.log(error);
      this.notify.error("Something went wrong..");
    }
  }

  doStuffOnInit(){
    this.serialNumber = this.model.serialNumber;
    this.deviceName = this.model.deviceName;
    this.facilityId = this.model.get('facility.facilityId');
    this.deviceTypeId = this.model.get('deviceType.deviceTypeId');
  }

  async enableEditMode(setLockState, lockEntity){
    try {
      if (setLockState && lockEntity) {
        let shouldEnableEdit = await this.deviceLockService.setDeviceLockState({
          deviceId: this.model.deviceId,
          lockModel: lockEntity,
          lock: true,
          overwriteLock: true
        })
        if (shouldEnableEdit) {
          window.onbeforeunload = async (event) => {          
            await this.unlockDevice(true);
          };
          this.doStuffOnInit();
        }
        return false;
      } else {
        window.onbeforeunload = async (event) => {          
          await this.unlockDevice(true);
        };
        this.doStuffOnInit();
      }
    } catch (error) {
      console.log(error);
      this.notify.error("Something went wrong..");
    }
  };

  async unlockDevice(pageIsBeingDestroyed) {
    try {
      if (pageIsBeingDestroyed) {
        return await this.deviceLockService.resetDeviceLockStateOnDestroy(this.model.deviceId);
      }
      return await this.deviceLockService.setDeviceLockState({
        deviceId: this.model.deviceId,
        lockModel: null,
        lock: false,
        overwriteLock: false
      })
    } catch (error) {
      console.log(error);
      this.notify.error("Something went wrong..");
    }
  };

  async willDestroyElement() {
    super.willDestroyElement(...arguments);
    window.onbeforeunload = null;
    try {
      return await this.unlockDevice(true);
    } catch (error) {
      console.log(error);
      this.notify.error("Something went wrong..");
    }
  };

  @computed('deviceTypeId')
  get devicePattern(){
    let pattern = null;
    if (this.deviceTypeId) {
      switch (parseInt(this.deviceTypeId)) {
        case this.deviceTypes.GOSHO:
          pattern = `^(?=^(G|J))(^[A-Z0-9]*$).*$`;
          break;
        case this.deviceTypes.GOSHO2:
          pattern = `^(?=^G)(^[A-Z0-9]*$).*$`;
          break;
        case this.deviceTypes.GOGO2:
          pattern = `^(?=^(JJ2))(^[A-Z0-9]*$).*$`;
          break;
      }
    }
    return pattern;
  };

  @computed('deviceTypeId')
  get maxSymbolsForSerialNumber(){
    let max = 9;
    if (this.deviceTypeId == this.deviceTypes.GOSHO) {
      max = 6;
    }
    return max;
  };

  @computed('deviceTypeId')
  get minSymbolsForSerialNumber(){
    let min = 9;
    if (this.deviceTypeId == this.deviceTypes.GOSHO) {
      min = 6;
    }
    return min;
  };
  
  @action
  async save(){
    try {
      let formIsValid = this.baseFunctions.formIsValid({
        selector: ".save-device-form"
      });
      if (!formIsValid || this.serialNumber.length < this.minSymbolsForSerialNumber) {
        return;
      }
      this.model.serialNumber = this.serialNumber;
      this.model.deviceName = this.deviceName;
      this.model.facility = this.store.peekRecord('facility', this.facilityId);
      this.model.deviceType = this.store.peekRecord('device-type', this.deviceTypeId);
  
      let queryParams = {};
      let deviceExists = false;
      if (this.model.deviceId) {
        deviceExists = true;
        let lockDeviceModelNameFromStorage =  'deviceLock-' + this.model.deviceId;
        let keyFromSessionStorage = window.sessionStorage[lockDeviceModelNameFromStorage];
        queryParams.deviceLock = keyFromSessionStorage;
      }
  
      let device = await this.model.save({
        adapterOptions: {
          queryParams:queryParams
        }
      });
      this.notify.success('Saved!');
      this.store.removeAllNew_NewMethod(device);
      if (deviceExists) {
        window.onbeforeunload = null;
        await this.unlockDevice();
      }
      this.router.replaceWith('home.devices');
    } catch (error) {
      console.log(error)
      this.notify.error("Something went wrong..");
    }
  };

  @action
  async cancel(){
    window.onbeforeunload = null;
    this.disableEdit = true;
    try {
      await this.unlockDevice();
    } catch (error) {
      console.log(error)
      this.notify.error("Something went wrong..");
    }
    return history.back();
  };

  @action
  async doEdit(setLockState, lockEntity){
    return await this.enableEditMode(setLockState, lockEntity);
  };


  @action
  upperCaseSerialNumber(serialNumber){
    this.serialNumber = serialNumber.toUpperCase();
  }
}