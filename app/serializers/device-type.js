import AppSerializer from 'irrigation-system/serializers/application';
export default class DeviceTypeSerializer extends AppSerializer{
  primaryKey = 'deviceTypeId';
  attrs = {
    applicationType: {embedded: 'always'},
    deviceTypeApplication: {embedded: 'always'},
    eventTypes: {embedded: 'always'},
  }
};
