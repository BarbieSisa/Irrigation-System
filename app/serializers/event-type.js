import AppSerializer from 'irrigation-system/serializers/application';
export default class EventTypeSerializer extends AppSerializer{
  primaryKey = 'eventTypeId';
  attrs = {
    deviceType: {serialize:'ids',deserialize:'records'},
  }
};
