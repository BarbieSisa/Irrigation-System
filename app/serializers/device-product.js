import AppSerializer from 'irrigation-system/serializers/application';
export default class DeviceProductSerializer extends AppSerializer{
  primaryKey = 'deviceProductId';
  attrs = {
    device:  { serialize:'ids',deserialize:'records' },
    product:  { serialize:'ids',deserialize:'records' },
  }
};
