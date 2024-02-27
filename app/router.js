import EmberRouter from '@ember/routing/router';
import config from 'irrigation-system/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('home', {path: '/home'}, function(){
    this.route('users', {path: '/users'}, function () {
      this.route('view', {path: '/view/:party_id'})
      this.route('edit', {path: '/view/:party_id'})
      this.route('create', {path: '/create'})
    })
    this.route('facilities', {path: '/facilities'}, function () {
      this.route('view', {path: '/edit/:facility_id'})
      this.route('edit', {path: '/edit/:facility_id'})
      this.route('create', {path: '/create'})
    })
    this.route('devices', {path: '/devices'}, function () {
      this.route('view', {path: '/view/:device_id'})
      this.route('edit', {path: '/view/:device_id'})
      this.route('create', {path: '/create'})
    })
  });
});
