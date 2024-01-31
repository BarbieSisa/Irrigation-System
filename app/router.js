import EmberRouter from '@ember/routing/router';
import config from 'irrigation-system/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('home',{path: '/home'}, function(){
    this.route('devices', {path: '/devices'})
  });
  
});
