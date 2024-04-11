import AppSerializer from 'irrigation-system/serializers/application';
export default class ProductSerializer extends AppSerializer{
  primaryKey = 'productId';
  attrs = {
    uom: {embedded: 'always'},
    productType: {embedded: 'always'},
    facility: {serialize:'ids',deserialize:'records'},
  }
};
