import AppSerializer from 'irrigation-system/serializers/application';
export default class DeviceSerializer extends AppSerializer{
  primaryKey = 'deviceId';
  attrs = {
    deviceAttributes: { embedded: 'always' },
    deviceType: { serialize:'ids',deserialize:'records' },
  }
};
