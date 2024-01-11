import Ember from 'ember';
import { inject as service } from '@ember/service';
import JSONAPIAdapter from '@ember-data/adapter/json-api';
import Inflector from 'ember-inflector';
import { camelize } from '@ember/string';
export default class ApplicationAdapter extends JSONAPIAdapter {
  @service store;
  @service('custom-fetch') customFetch;
  
  url = Ember.apiUrl
  inflector = Inflector.inflector;

  prepare(snapshot,type,includeId){
    var endPoint = '';
    var queryParams = null;
    var ignore401 = false;
    type = type || "GET";

    if (snapshot.adapterOptions && snapshot.adapterOptions.hasOwnProperty('endPoint')) {
      endPoint = snapshot.adapterOptions.endPoint;
    } else {
      endPoint = camelize(inflector.pluralize(snapshot.modelName));
    }

    if(snapshot.adapterOptions && snapshot.adapterOptions.includeId!=null){
      if(snapshot.adapterOptions.includeId){
        endPoint += "/" + Ember.get(snapshot, 'id');
      }
    }else if(includeId){
        endPoint += "/" + Ember.get(snapshot, 'id');
    }

    if (snapshot.adapterOptions && snapshot.adapterOptions.hasOwnProperty('type')) {
      type = snapshot.adapterOptions.type;
    }

    if (snapshot.adapterOptions && snapshot.adapterOptions.hasOwnProperty('queryParams')) {
      queryParams = snapshot.adapterOptions.queryParams;
    }

    if (snapshot.adapterOptions && snapshot.adapterOptions.hasOwnProperty('ignore401')) {
      ignore401 = snapshot.adapterOptions.ignore401;
    }


    return {
      endPoint:endPoint,
      queryParams:queryParams,
      ignore401:ignore401 || false,
      type:type
    }
  }

  async query(store, type, queryObject) {
    queryObject = queryObject || {};
    return await this.customFetch.makeRequest({
      url: this.url,
      type: queryObject.type || 'GET',
      endPoint: queryObject.endPoint,
      data:queryObject.data,
      ignore401: queryObject.ignore401 || false,
      queryParams: queryObject.queryParams || queryObject.filter
    });
  }

  async queryRecord(store, type, query) {
    return await this.query(store, type, query);
  }

  async createRecord(store, type, snapshot) {
    var data = this.serialize(snapshot, {includeId: true});
    var {endPoint,queryParams,type,ignore401} = this.prepare(snapshot,"POST");
    return await this.customFetch.makeRequest({
      type: type,
      endPoint: endPoint,
      ignore401:ignore401,
      data: JSON.stringify(data),
      queryParams:queryParams
    })
  }

  async updateRecord(store, type, snapshot) {
    var data = this.serialize(snapshot, {includeId: true});
    var {endPoint,queryParams,type,ignore401} = this.prepare(snapshot,"PUT",true);
    return await this.customFetch.makeRequest({
      type: type,
      endPoint: endPoint,
      ignore401:ignore401,
      data: JSON.stringify(data),
      queryParams:queryParams
    })
  }

  async findRecord(store, type, id, snapshot) {
    var {endPoint,queryParams,type,ignore401} = this.prepare(snapshot,"GET",true);
    return await this.customFetch.makeRequest({
      type: type,
      endPoint: endPoint,
      ignore401:ignore401,
      queryParams: queryParams
    });
  }

  async deleteRecord(store, type, snapshot) {
    var {endPoint,queryParams,type,ignore401} = this.prepare(snapshot,"DELETE",true);
    return await this.customFetch.makeRequest({
      type: type,
      endPoint: endPoint,
      ignore401:ignore401,
      queryParams: queryParams
    });
  }
}