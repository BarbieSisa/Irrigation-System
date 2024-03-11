import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
export default class BaseController extends Controller {
  @service('base-functions') baseFunctions;
  @service('current-user') currentUser;
  @service('custom-fetch') customFetch;
  @service('store') store;
  @service('active-route-tracker') activeRouteTracker;
  @service notify;
}