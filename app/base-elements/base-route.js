import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default class BaseRoute extends Route {
  @service router;
  @service store;
  @service('active-route-tracker') activeRouteTracker;
  @service notify;
}