import BaseComponent from 'irrigation-system/base-elements/base-component';
import { action, computed } from '@ember/object';
export default class DeviceLockOverwritePopupComponent extends BaseComponent {
  tagName = '';
  @computed('lockModel.user.partyId')
  get editingUserIsCurrentUser(){
    return this.get('currentUser.loggedUser.party.partyId') == this.get('lockModel.user.partyId');
  }
  
  @action
  confirm(event) {
    if (this.onConfirm) {
      this.onConfirm(true, this.get('lockModel'));
    }
    this.onCloseModal();
  };
  @action
  cancel() {
    if (this.onCancel) {
      this.onCancel();
    }
    this.onCloseModal();
  };
  @action
  gotoUser() {
    if (this.get('lockModel.user.partyId') && this.currentUser.isSuperUser) {
      this.router.transitionTo('home.users.view', this.get('lockModel.user.partyId'));
    }
  };
}