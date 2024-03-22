import BaseController from 'irrigation-system/base-elements/base-controller'; 
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
export default class FacilitiesViewController extends BaseController {
  @service router;
  @tracked selectedTab = 'devices';
  @action
  edit(facilityId) {
    this.router.transitionTo('home.facilities.edit', facilityId)
  }
  @action
  async deleteFacility() {
    try {
      await this.model.destroyRecord();
      this.notify.warning('Facility deleted!');
      this.model.customUnloadRecord();
      return this.router.transitionTo('home.facilities.index');
    } catch (error) {
      this.notify.error("Something went wrong..");
      console.log(error)
    }
  };
}