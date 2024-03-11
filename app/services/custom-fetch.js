import Ember from 'ember';
import Service from '@ember/service';
import { inject as service } from '@ember/service';
export default class CustomFetch extends Service {
  @service('session') session;
  @service notify;

  getQueryString (queryParams) {
    if (queryParams == null) {
      return '';
    }

    let queryString = '?';

    for (var property in queryParams) {
      if (queryParams.hasOwnProperty(property) && queryParams[property] != null) {
        queryString += property + "=" + queryParams[property] + "&";
      }
    }

    return queryString.slice(0, -1);

  };

  getObjectFromQueryString(queryString){
    if (!queryString) {
      return;
    }
    let params = new URLSearchParams(queryString);
    var entries = params.entries();
    return Object.fromEntries(entries) || {};
  };
  
  toSimpleObject(data) {
    if (data && data.toArray) {
      var tempData = [];

      data = data.toArray();
      if (data[0] && data[0].serialize) {
        for (var i = 0; i < data.length; i++) {
          tempData.push(data[i].serialize({includeId: true}));
        }
        data = tempData;
      }

    } else if (data && data.serialize) {
      data = data.serialize({includeId: true});
    }

    return data;
  };
  unpack(payload) {
    var meta, data;
    if (payload.data.results && Array.isArray(payload.data.results)) {
      meta = payload;
      data = payload.data.results;
      delete meta.data.results;
    } else {
      meta = payload;
      data = payload.data;
      delete meta.data;
    }

    return {data, meta};
  };
  removeNulls(obj) {
    var isArray = obj instanceof Array;
    for (var k in obj) {
      if (obj[k] === null) {
        if (isArray) {
          obj.splice(k, 1);
        }
        else {
          delete obj[k];
        }
      } else if (typeof obj[k] == "object") {
        if (obj[k] instanceof Array && obj[k].length === 0) {
          delete obj[k];
          continue;
        }
        this.removeNulls(obj[k]);
      }
    }
  };
  async makeRequest(opt) {
    opt = opt || {};
    opt.endPoint = opt.endPoint || '';
    let url = opt.url || Ember.apiUrl;
    let data = opt.data;
    let headers = new Headers();
    if (!opt.noDefaultHeaders) {
      for (let key in (Ember.headers || {})) {
        headers.append(key, Ember.headers[key]);
      }
    }

    if (opt.headers) {
      for (let prop in opt.headers) {
        headers.append(prop, opt.headers[prop]);
      }
    }

    let fetchOptions = {
      method: opt.type || "GET",
      body: data,
      headers: headers,
      referrerPolicy: 'no-referrer'
    };

    if (Ember.withCredentials) {
      fetchOptions.credentials = 'include';
    }

    try {
      const fetchRequestData = await fetch(url + opt.endPoint + this.getQueryString(opt.queryParams), fetchOptions);
      if (fetchRequestData.ok) {
        const response = await fetchRequestData.json();
        if (response.statusCode !== "SUCCESS") {
          return Promise.reject(response);
        }
        return Promise.resolve(response);
      } else {
        this.handleFetchRejection(fetchRequestData);
        return Promise.reject();
      }
    } catch (error) {
      this.notify.error(error);
      console.log(error);
    }
    return Promise.reject();
  };

  handleFetchRejection(data){
    var status = null;
    if(data && data.status){
      status = data.status;
    }
    if (status == 401) {
      this.get('session').invalidate();
    } else {
      if(data && data.status === 0){
        this.notify.error("Network connection problem!");
        console.log("Network connection problem!");
      }else{
        this.notify.error("Seems like there is an error... : HTTP " + data.status + (data.statusText ? "(" + data.statusText + ")" : ""));
        console.log(data);
      }
    }
  }
}