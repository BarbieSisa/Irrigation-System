import Service from '@ember/service';
import { inject as service } from '@ember/service';
export default class CurrentUser extends Service {
  @service store;
  loggedUser = null;
  async setup(){
    let user = await this.store.queryRecord('user', {
      endPoint: "users/me"
    })
    if (user != null){
      this.loggedUser = user;
    }
  };
}