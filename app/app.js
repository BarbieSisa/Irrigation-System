import Ember from 'ember';
import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'irrigation-system/config/environment';
import DS from 'ember-data';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

Ember.apiUrl = 'https://dev.cm2w.net/cm2w-api/v2/';
Ember.headers = {
  "Accept": "application/json, text/javascript, */*; q=0.01",
  'Content-type': 'application/json'
};
Ember.withCredentials = true;

loadInitializers(App, config.modulePrefix);

DS.Store.reopen({
  removeAllNew_NewMethod: function (prop) {
    prop = prop || {};
    var model = prop.model || null;
    var modelNames = prop.modelNames || null;

    if(model && model.eachRelationship){
      model.eachRelationship((name,descriptor)=>{
        // clearRelationships(model.get(name));
        if(descriptor.kind == "hasMany"){
          model.get(name).filter((item)=>{
            return item.get('id')==null;
          }).forEach((item)=>{
            model.get(name).removeObject(item);
          });
        }
      });
    }


    modelNames = modelNames || Ember.getOwner(this).lookup('container-debug-adapter:main').catalogEntriesByType('model');

    for (var i = 0; i < modelNames.length; i++) {

      var items =   this.peekAll(modelNames[i]);
      try{
        items = items.toArray();
      }catch(err){
        try{
          items = items.content.toArray();
        }catch(err){

        }
      }
      try{
        items.forEach(function (record) {
          if (record && record.get && record.get('isNew')) {
            if(record.clearRelationships){
              record.clearRelationships();
            }
            this.unloadRecord(record);
          }
        }, this);
      }catch(err){

      }
    }
  },
  removeAllNew: function () {
    for (var i = 0; i < arguments.length; i++) {
      this.peekAll(arguments[i]).forEach(function (record) {
        if (record.get('isNew')) {
          this.unloadRecord(record);
        }
      }, this);
    }
  },

  unloadRecords(records) {
    records.forEach((record) => {
      try {
        record.customUnloadRecord();
      } catch (err) {
        console.log(err);
      }
    });
  },

  getRecord: function (type, id) {
    var record = this.peekRecord(type, id);
    if (record) {
      return Ember.RSVP.Promise.resolve(record);
    }
    return this.findRecord(type, id, {reload: true});
  },

  getComputedRecord(type, id, refDoc) {
    var record = this.peekRecord(type, id);
    if (record) {
      return record;
    }
    let options = {};
    if (refDoc) {
      options.adapterOptions = {};
      options.adapterOptions.queryParams = {};
      options.adapterOptions.queryParams.refDoc = encodeString(refDoc);
    }
    return this.findRecord(type, id, options);
  }
});