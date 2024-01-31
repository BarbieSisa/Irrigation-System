import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
export default class ActiveRouteTracker extends Service {
  @service router;
  @tracked activeRouteName;

  async setup(){
    this.activeRouteName = this.router.currentRouteName;
    return Promise.resolve();
  }
  
  init() {
    super.init(...arguments);
    this.routeDidChange = () => {
      this.activeRouteName = this.router.currentRouteName;
    };

    this.router.on('routeDidChange', this.routeDidChange);
  };
}