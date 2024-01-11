import BaseRoute from 'irrigation-system/base-elements/base-route'; 
export default class IndexRoute extends BaseRoute {
  redirect(){
    this.router.transitionTo('home');
  }
}