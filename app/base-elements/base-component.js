import Component from '@ember/component';
import { inject as service } from '@ember/service';
export default class BaseComponent extends Component {
  @service('base-functions') baseFunctions;
  @service('current-user') currentUser;
  @service('custom-fetch') customFetch;
  @service store;
  @service router;
  @service('active-route-tracker') activeRouteTracker;
  @service('role-type') roleTypes;
}