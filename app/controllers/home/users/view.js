import BaseController from 'irrigation-system/base-elements/base-controller'; 
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
export default class UsersViewController extends BaseController {
  @service router;
  @tracked selectedTab = 'facilities';
  @action
  edit(userId) {
    this.router.transitionTo('home.users.edit', userId)
  }
}