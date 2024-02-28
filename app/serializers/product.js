import AppSerializer from 'irrigation-system/serializers/application';
export default class ProductSerializer extends AppSerializer{
  primaryKey = 'productId';
  attrs = {
    currency: {embedded: 'always'},
    uom: {embedded: 'always'},
    productType: {embedded: 'always'},
    productRatios: {embedded: 'always'},
    productLoads: {embedded: 'always'},
    facility: {serialize:'ids',deserialize:'records'},
  }
};
