import AppSerializer from 'irrigation-system/serializers/application';
export default class DeviceSerializer extends AppSerializer{
  primaryKey = 'deviceId';
  attrs = {
    deviceAttributes: { embedded: 'always' },
    deviceProducts:{ embedded: 'always' },
    deviceType: { serialize:'ids',deserialize:'records' },
    facility: { serialize:'ids',deserialize:'records' },
  }
};
