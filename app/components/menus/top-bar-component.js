import BaseComponent from 'irrigation-system/base-elements/base-component'; 
import { action } from '@ember/object';
export default class TopBarComponent extends BaseComponent {
    @action
    gotoMyProfile(){
        this.router.transitionTo('home.users.view', this.currentUser.get('loggedUser.party.partyId'));
    }
}