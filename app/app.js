import Ember from 'ember';
import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'irrigation-system/config/environment';

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
