import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import { inject as service } from '@ember/service';
export default class CustomAuthenthicator extends Base {
  @service('custom-fetch') customFetch;

  async restore(data) {
    let promise = new Ember.RSVP.Promise(function (resolve, reject) {
      if (!Ember.isEmpty(data)) {
        resolve(data);
      } else {
        reject();
      }
    });
    await promise;
  };

  async authenticate(options) {
    const response = await this.customFetch.makeRequest({
      endPoint: "users/login",
      type: "POST",
      data: JSON.stringify({
        email: options.email,
        password: options.password
      })
    });

    return response;
  };

  async invalidate(data) {
    return await Promise.resolve();
  };
}