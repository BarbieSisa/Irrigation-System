import InfinityScrollItemComponent from 'irrigation-system/base-elements/infinity-scroll-item-component';
import { action } from '@ember/object';
export default class UsersListItemComponent extends InfinityScrollItemComponent {
  @action
  gotoUser(userId){
    this.router.transitionTo('home.users.view', userId);
  }
}