import InfinityScrollComponent from 'irrigation-system/base-elements/infinity-scroll-component';
import { tracked } from '@glimmer/tracking';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
export default class GrantUsersListComponent extends InfinityScrollComponent {
  @service('role-type') roleTypes;
  @service('current-user') currentUser;

  @tracked sortBy = 'person.firstName'
  @tracked orderBy = 'ASC'
  @tracked excludePartyIds = [];
  userRoleTypeId = this.roleTypes.USER_ROLE_CUSTOMER_ID;
  makeRequestOnInit = false;
  excludeOrganizations = true;
  modelName = 'party';
  endPoint =  'parties';
  refDoc = {
    person: {
      firstName: true,
      lastName: true
    },
    user: {
      email: true,
      userRoles: {
        roleType: {}
      }
    }
  };
  queryParamsList = ['sortBy', 'orderBy', 'searchText', 'excludeOrganizations', 'refDoc', 'excludePartyIds', 'userRoleTypeId'];

  async init() {
    super.init(...arguments);
    return await this.doStuffOnInit();
  };
  async doStuffOnInit(){
    try {
      if (this.get('baseEndpoint')) {
        let queryParams = {
          refDoc:encodeString({}),
          pageNumber: 1,
          excludeOrganizations:true,
          userRoleTypeid:this.roleTypes.USER_ROLE_CUSTOMER_ID,
          pageSize: 2147483647
        }
        this.set('requestLoading', true);
        let partyIdsForExclude = await this.get('store').query('party', {
          queryParams: queryParams,
          endPoint: this.get('baseEndpoint'),
        })
        this.set('excludePartyIds', (partyIdsForExclude || []).map(p=>p.get('partyId')).join(','));
        return await this.send('refresh');
      } else {
        return await this.send('refresh');
      }
    } catch (error) {
      console.log(error);
    }
  }
  @action
  async customRefresh(){
    return await this.doStuffOnInit();
  }
}