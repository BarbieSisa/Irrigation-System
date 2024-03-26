import Ember from 'ember';
import Chart from 'chart.js/auto'
import BaseComponent from 'irrigation-system/base-elements/base-component';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';
export default class DevicesSettingsComponent extends BaseComponent {
  @service('device-type') deviceTypes;
  @service('device-lock-service') deviceLockService;
  @service('custom-fetch') customFetch;

  @tracked selectedTab = 'consumption';
  @tracked mode = "VIEW";
  @tracked currentLockEntity;
  @tracked facilityProducts = [];
  @tracked deviceSettings;
  @tracked config;
  @tracked showOverwriteLockModal = false;
  @tracked loadingSettings = false;
  @tracked loadingConsumption = false;
  @tracked timeFrame = "Today";
  @tracked fromDate = this.baseFunctions.getBeginningOfDay();
  @tracked thruDate = this.baseFunctions.getEndOfDay();
  @tracked productsForPieChart = [];
  @tracked productDatasetsForBarChart = [];

  async init() {
    super.init(...arguments);
    await this.loadDeviceSettings();
    await this.loadConsumptionData();
  }

  async loadConsumptionData(){
    let barChartStatus = Chart.getChart("consumptionBarChart");
    if (barChartStatus != undefined) {
      barChartStatus.destroy();
    }
    let pieChartStatus = Chart.getChart("consumptionPieChart");
    if (pieChartStatus != undefined) {
      pieChartStatus.destroy();
    }
    this.loadingConsumption = true;
    let consumptionData = await this.customFetch.makeRequest({
      endPoint: "events/consumption",
      type: "GET",
      queryParams:{
        deviceId:this.model.deviceId,
        fromDate:this.fromDate,
        thruDate:this.thruDate,
        pageNumber:1,
        pageSize:2147483647
      }
    });
    consumptionData.data.results = consumptionData.data.results.sortBy("eventDate");
    let productsForPieChart = [];
    let uniqueDaysForBarChart = (consumptionData.data.results || []).map((dayResult) => {
      return this.getDateStringFromTimeStamp(dayResult.eventDate);
    }).uniq();
    (consumptionData.data.results || []).forEach((dataByDay)=>{
      let productsForDay = (dataByDay.products || []).map((product)=>{
        return {
          productId: product.productId,
          productName: product.name,
          consumption: (product.qty || 0) / 10
        }
      });

      let productIdsForDay = productsForDay.map(p=>p.productId).uniq();
      productIdsForDay.forEach((productId)=>{
        let currentProductReference = productsForDay.find(p=>p.productId == productId)
        if (currentProductReference != null) {
          let uniqueProductReference = productsForPieChart.find(p=>p.productId == productId)
          if (!uniqueProductReference) {
            productsForPieChart.push({
              productId: currentProductReference.productId,
              productName: currentProductReference.productName,
              consumption: currentProductReference.consumption
            });
          } else {
            uniqueProductReference.consumption += currentProductReference.consumption;
          }
        }
      })
    })
    productsForPieChart = productsForPieChart.sortBy('productName');
    let productDatasetsForBarChart = productsForPieChart.map((p)=>{
      return {
        productId: p.productId,
        label: p.productName,
        data: []
      }
    });
    let productsIdsForBarChart = productsForPieChart.map(p=>p.productId);
    productsIdsForBarChart.forEach((productId)=>{
      uniqueDaysForBarChart.forEach((day)=>{
        let productForDay = (consumptionData.data.results || []).find(p=>this.getDateStringFromTimeStamp(p.eventDate) == day).products.find(p=>p.productId == productId);
        let productDatasetReference = productDatasetsForBarChart.find(p=>p.productId == productId);
        if (productForDay != null) {
          productDatasetReference.data.push(productForDay.qty / 10);
        } else {
          productDatasetReference.data.push(0);
        }
      })
    })
    this.productsForPieChart = productsForPieChart;
    this.productDatasetsForBarChart = productDatasetsForBarChart;
    this.loadingConsumption = false;
    scheduleOnce('afterRender', this, function () {
      if (productsForPieChart.length) {
        new Chart(
          document.getElementById('consumptionPieChart'),
          {
            type: 'pie',
            data: {
              labels: productsForPieChart.map(row => row.productName),
              datasets: [
                {
                  label: '',
                  data: productsForPieChart.map(row => row.consumption)
                }
              ]
            },
            options: {
                maintainAspectRatio: false
            }
          }
        );
      }
      if (productDatasetsForBarChart.length) {
        new Chart(
          document.getElementById('consumptionBarChart'),
          {
            type: 'bar',
            data: {
              labels: uniqueDaysForBarChart,
              datasets: productDatasetsForBarChart
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                  y: {
                    ticks: {
                      callback: (label) => `${label} ml`,
                    },
                  },
                },
            }
          }
        );
      }
    });
  };
  getDateStringFromTimeStamp(timeStamp){
    if (!timeStamp) {
      return "";
    }
    let dateObj = new Date(timeStamp);
    return (dateObj.getDate() > 10 ? dateObj.getDate() : "0" + dateObj.getDate()) + "." + ((dateObj.getMonth() +  1) > 10 ? (dateObj.getMonth() +  1) : "0" + (dateObj.getMonth() +  1)) + "." + dateObj.getFullYear()
  }
  @computed('mode')
  get disabled(){
    return this.mode == 'VIEW';
  }
  
  async loadDeviceSettings(){
    try {
      this.loadingSettings = true;
      let config = await this.baseFunctions.loadDeviceConfig(this.model);
      this.config = config || {};
      let facilityProducts = await this.loadFacilityProducts();
      this.facilityProducts = facilityProducts;
      let deviceSettings = {
        mainSettings: {
          deviceName: this.model.deviceName
        }
      };
      deviceSettings.pumpSettings = this.extractPumpSettings(config, this.model);
      deviceSettings.scheduledSettings = this.extractScheduledSettings(config, this.model);
      this.deviceSettings = deviceSettings;
      return deviceSettings;
    } catch (error) {
      console.log(error);
      this.notify.error("Something went wrong..");
    } finally {
      this.loadingSettings = false;
    }
  }

  async loadFacilityProducts(){
    try {
      let products = await this.store.query('product', {
        endPoint: "products",
        queryParams:{
          pageNumber: 1,
          pageSize: 2147483647,
          facilityId: this.model.get('facility.facilityId')
        }
      })
      return products ? products.toArray() : [];
    } catch (error) {
      console.log(error);
      this.notify.error("Something went wrong..");
    }
  }

  extractPumpSettings(config,device) {
    config = config || {};
    let pumpSettings = [];
    for (let i = 0; i < 4; i++) {
      let configPumpSetting = config['pump' + i] || {};
      let pumpSetting = {};
      let deviceProduct = device.get('deviceProducts').find((item) => item.get('key') == 'q' + i);

      pumpSetting.idx = i;
      pumpSetting.type = configPumpSetting.type || 0;
      pumpSetting.productId = deviceProduct ? deviceProduct.get('product.productId') : null;
      pumpSetting.flowrate = (configPumpSetting.flowrate || 0) / 10;

      pumpSettings.pushObject(Ember.Object.create(pumpSetting))
    }
    return pumpSettings;
  };

  extractScheduledSettings(config) {
    config = config || {};
    let scheduledDosingSettings = [];

    for (var i = 0; i < 4; i++) {
      let masterKey = 'sch' + i;
      config[masterKey] = config[masterKey] || {};
      let configScheduledDosings = config[masterKey];
      let scheduledDosingSetting = Ember.Object.create();

      scheduledDosingSetting.set('idx', i);

      scheduledDosingSetting.set('codeName', "Schedule " + (i + 1));

      scheduledDosingSetting.set('type', configScheduledDosings['type'] || 0);
      scheduledDosingSetting.set('gmt', configScheduledDosings['gmt'] || 0);
      scheduledDosingSetting.set('intvl', configScheduledDosings['intvl'] || 180);
      scheduledDosingSetting.set('at', (configScheduledDosings['at'] || []).map((p, index) => {
        return {
          idx: index,
          value: p
        }
      }));

      for (var j = 0; j < 7; j++) {
        scheduledDosingSetting.set('day' + j, bit_test((configScheduledDosings['days'] || 0), j));
      }
      for (var j = 0; j < 4; j++) {
        scheduledDosingSetting.set('q' + j, (configScheduledDosings['q' + j] || 0) / 10);
      }

      scheduledDosingSettings.pushObject(scheduledDosingSetting);
    }

    return scheduledDosingSettings;
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
          await this.loadDeviceSettings();
          this.mode = "EDIT";
          return true;
        }
        return false;
      } else {
        window.onbeforeunload = async (event) => {          
          await this.unlockDevice(true);
        };
        await this.loadDeviceSettings();
        this.mode = "EDIT";
        return true;
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

  mergeConfigWithPumpSettings(device) {
    let config = this.config;
    for (var i = 0; i < 4; i++) {
      var pumpSetting = copyObject(this.get('deviceSettings.pumpSettings')[i]);
        if (pumpSetting.type != null && pumpSetting.type != 0 && pumpSetting.productId) {
          pumpSetting.productId = parseInt(pumpSetting.productId);
          var deviceProduct = device.get('deviceProducts').find((item) => item.get('key') == 'q' + i);
          if (deviceProduct) {
            deviceProduct.set('product', this.store.peekRecord('product', pumpSetting.productId));
          } else {
            deviceProduct = this.store.createRecord('device-product', {
              product: this.store.peekRecord('product', pumpSetting.productId),
              key: 'q' + i,
              device: device
            });
            device.get('deviceProducts').pushObject(deviceProduct);
          }

          pumpSetting.name = encodeString(deviceProduct.get('product.productName'));
          pumpSetting.flowrate = parseInt(pumpSetting.flowrate || 150) * 10;

          config['pump' + i] = pumpSetting;

        } else {
          delete config['pump' + i];
          var deviceProduct = device.get('deviceProducts').find((item) => item.get('key') == 'q' + i);
          if (deviceProduct && deviceProduct.get('deviceProductId')) {
            var toRemove = device.get('deviceProductsToRemove') ? device.get('deviceProductsToRemove').split(',') : [];
            toRemove.push(deviceProduct.get('deviceProductId'));
            device.set('deviceProductsToRemove', toRemove.join(','));
            device.get('deviceProducts').removeObject(deviceProduct);
          }
        }
    }
  }

  mergeConfigWithScheduledDosingSettings() {
    let config = this.config;
    this.get('deviceSettings.scheduledSettings').forEach((scheduledDosingSetting, idx) => {
      let masterKey = "sch" + idx;
      config[masterKey] = config[masterKey] || {};
      let configScheduledDosing = config[masterKey];

      configScheduledDosing['type'] = parseInt(scheduledDosingSetting.get('type') || 0);
      configScheduledDosing['gmt'] = parseInt(scheduledDosingSetting.get('gmt') || 0);
      configScheduledDosing['intvl'] = parseInt(scheduledDosingSetting.get('intvl') || 180);
      configScheduledDosing['at'] = (scheduledDosingSetting.get('at') || []).map(p => p.value);

      let days = configScheduledDosing['days'] || 0;
      for (var j = 0; j < 7; j++) {
        days = scheduledDosingSetting.get('day' + j) ? bit_set(days, j) : bit_clear(days, j);
      }
      configScheduledDosing['days'] = days;

      for (var j = 0; j < 4; j++) {
        configScheduledDosing['q' + j] = (scheduledDosingSetting['q' + j] || 0) * 10;
      }
    });
  }

  @action
  async save(){
    try {
      let formIsValid = this.baseFunctions.formIsValid({
        selector: ".save-device-settings-form"
      });
      if (!formIsValid) {
        return;
      }
      this.config = copyObject(this.config);
      this.model.deviceName = this.deviceSettings.mainSettings.deviceName;
      this.mergeConfigWithPumpSettings(this.model);
      this.mergeConfigWithScheduledDosingSettings();
      this.model.set('configData', JSON.stringify(this.config));
      let lockEntityModelNameFromStorage =  'deviceLock-' + this.model.deviceId;
      let keyFromSessionStorage = sessionStorage[lockEntityModelNameFromStorage];
      let queryParams = {
        deviceLock: keyFromSessionStorage
      };
  
      let device = await this.model.save({
        adapterOptions: {
          queryParams:queryParams
        }
      });
      this.store.removeAllNew_NewMethod(device);
      await device.reload();
      await this.loadDeviceSettings();

      device.set('configData', null);
      this.notify.success('Saved!');
      try {
        await this.unlockDevice();
      } catch (err) {
        console.log(err)
        this.notify.error("Couldn't unlock device..");
      }
      window.onbeforeunload = null;
      this.mode = "VIEW";
    } catch (error) {
      console.log(error)
      this.notify.error("Something went wrong..");
    }
  };

  @action
  async cancel(){
    window.onbeforeunload = null;
    try {
      await this.unlockDevice();
      this.mode = "VIEW";
      return await this.loadDeviceSettings();
    } catch (error) {
      console.log(error)
      this.notify.error("Something went wrong..");
    }
  };

  @action
  async edit(){
    try {
      const deviceLock = await this.deviceLockService.getDeviceLockModel(this.model.deviceId);
      if (deviceLock && deviceLock.id && !this.deviceLockService.checkDeviceLockKeyMatch(deviceLock, this.model.deviceId)) {
        this.showOverwriteLockModal = true;
        this.currentLockEntity = deviceLock;
        return false;
      } else if (deviceLock && deviceLock.id && this.deviceLockService.checkDeviceLockKeyMatch(deviceLock, this.model.deviceId)){
        return await this.enableEditMode();
      }
      let shouldEnableEdit = await this.deviceLockService.setDeviceLockState({
        deviceId: this.get('model.deviceId'),
        lockModel: deviceLock,
        lock: true,
        overwriteLock: false
      })
  
      if (shouldEnableEdit) {
        await this.enableEditMode();
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      this.notify.error("Something went wrong..");
    }
  }
  @action
  async doEdit(setLockState, lockEntity){
    return await this.enableEditMode(setLockState, lockEntity);
  };

  @action
  async reload(){
    if (this.selectedTab == 'consumption') {
      return this.loadConsumptionData()
    }
    return await this.loadDeviceSettings();
  };

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
  @action
  fetchConsumption(){
    this.selectedTab = 'consumption';
    this.loadConsumptionData();
  };
  @action
  changeSelectedPeriod(timeFrame, fromDate, thruDate){
    let skipRequest = timeFrame == 'Custom' && this.timeFrame != timeFrame;
    this.timeFrame = timeFrame;
    this.fromDate = fromDate;
    this.thruDate = thruDate;
    if (skipRequest) {
      return;
    }
    this.loadConsumptionData();
  }
}