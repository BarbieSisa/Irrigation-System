import AppSerializer from 'irrigation-system/serializers/application';
export default class ProductTypeSerializer extends AppSerializer{
  primaryKey = 'productTypeId';
  attrs = {
    products: {serialize:false,deserialize:'records'}
  }
};
