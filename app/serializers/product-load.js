import AppSerializer from 'irrigation-system/serializers/application';
export default class ProductLoadSerializer extends AppSerializer{
  primaryKey = 'productLoadId';
  attrs = {
    party: {serialize:'ids',deserialize:'records'},
    currency: {embedded: 'always'},
    product: {serialize:'ids',deserialize:'records'},
  }
};
