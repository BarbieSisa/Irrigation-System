import DS from 'ember-data';
import JSONSerializer from '@ember-data/serializer/json';
import { camelize } from '@ember/string';
export default JSONSerializer.extend(DS.EmbeddedRecordsMixin,{

  normalizeDeleteRecordResponse(store, primaryModelClass, payload, id, requestType) {
    arguments[2] = null;
    return this._super(...arguments);
  },

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    if (payload.statusCode === "SUCCESS" && payload.data) {
      var meta;
      if (payload.data.results && Array.isArray(payload.data.results)) {
        meta = payload;
        payload = payload.data.results;
        delete meta.data.results;
        payload.meta = meta;
      } else {
        meta = payload;
        payload = payload.data;
        delete meta.data;
        payload.meta = meta;
      }
      removeNulls(payload);
      if(requestType=="createRecord"){
        var modelName = camelize(primaryModelClass.modelName);
        var primaryIdKey = modelName + "Id";
        removeMainObj(payload,modelName,primaryIdKey,payload[primaryIdKey]);
      }
      arguments[2] = payload;
    }
    return this._super(...arguments);
  },

  serializeBelongsTo(snapshot, json, relationship) {
    var key = relationship.key;
    var record = snapshot.record.get(key);
    var serializer = this.store.serializerFor(snapshot.modelName);
    if(serializer && serializer.attrs && serializer.attrs[key]){
      if(serializer.attrs[key].serialize=="ids"){
        var objSerializer = this.store.serializerFor(relationship.type);
        var id = tryParse(getProperty(record,objSerializer.primaryKey));
        if(id){
          var obj={};
          obj[objSerializer.primaryKey] = id;
          json[key] = obj;
        }
      }else if(serializer.attrs[key].serialize==false){

      }else{
        this._super(snapshot, json, relationship);
      }
    }
  },

  serializeHasMany(snapshot, json, relationship) {
    var key = relationship.key;
    var serializer = this.store.serializerFor(snapshot.modelName);

    if(serializer && serializer.attrs && serializer.attrs[key]){
      if(serializer.attrs[key].serialize=="ids"){
        json[key] = [];
        var objSerializer = this.store.serializerFor(relationship.type);
        var hasManyRecords = snapshot.record.get(key) || [];
        hasManyRecords.forEach((item)=>{
          var id = tryParse(getProperty(item,objSerializer.primaryKey));
          if(id){
            var obj={};
            obj[objSerializer.primaryKey] = id;
            json[key].push(obj);
          }
        })
      }else if(serializer.attrs[key].serialize==false){

      }else{
        this._super(snapshot, json, relationship);
      }
    }
  },

});