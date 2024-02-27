import InfinityScrollComponent from 'irrigation-system/base-elements/infinity-scroll-component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
export default class UsersListComponent extends InfinityScrollComponent {
  @tracked sortBy = 'person.firstName'
  @tracked orderBy = 'ASC'
  modelName = 'party';
  endPoint = 'parties';
  excludeOrganizations = true;
  userRoleTypeIdList = [this.roleTypes.USER_ROLE_CUSTOMER_ID, this.roleTypes.USER_ROLE_SUPER_USER_ID].join(',');
  queryParamsList = ['sortBy', 'orderBy', 'searchText', 'excludeOrganizations', 'userRoleTypeIdList'];

  @action
  createUser(){
    this.router.transitionTo('home.users.create');
  };
}