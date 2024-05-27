import { attr } from '@ember-data/model'; 
import BaseModel from 'irrigation-system/base-elements/base-model'; 
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
export default class RoleTypeModel extends BaseModel { 
  @attr('number') roleTypeId;
  @attr('string') roleTypeCode;
  @service('role-type') roleTypes;
  
  @computed('roleTypeCode')
  get cssClass(){
    if (this.get('roleTypeCode') == this.roleTypes.USER_ROLE_ADMIN) {
      return 'txt-red';
    } else if (this.get('roleTypeCode') == this.roleTypes.USER_ROLE_SUPER_USER) {
      return 'txt-super-user';
    } else if (this.get('roleTypeCode') == this.roleTypes.USER_ROLE_CUSTOMER) {
      return 'txt-basic-user';
    }
    return null;
  }

  @computed('roleTypeCode')
  get beautifiedRoleTypeCode(){
    if (this.get('roleTypeCode') == this.roleTypes.USER_ROLE_ADMIN) {
      return 'Admin';
    } else if (this.get('roleTypeCode') == this.roleTypes.USER_ROLE_SUPER_USER) {
      return 'Super User';
    } else if (this.get('roleTypeCode') == this.roleTypes.USER_ROLE_CUSTOMER) {
      return 'Basic User';
    }
    return null;
  }
}
