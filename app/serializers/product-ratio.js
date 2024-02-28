import AppSerializer from 'irrigation-system/serializers/application';
export default class ProductRatioSerializer extends AppSerializer{
  primaryKey = 'productRatioId';
  attrs = {
    product: {serialize:'ids',deserialize:'records'},
    toUom: {embedded: 'always'},
  }
};
