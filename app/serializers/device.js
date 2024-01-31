import AppSerializer from 'irrigation-system/serializers/application';
export default class DeviceSerializer extends AppSerializer{
  primaryKey = 'deviceId';
  attrs = {
    deviceType: {serialize:'ids', deserialize:"records"},
    deviceAttributes: {embedded: 'always'}
  }
};
