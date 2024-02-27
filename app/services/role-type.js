import Service from '@ember/service';
import { inject as service } from '@ember/service';
export default class RoleTypeService extends Service {
  @service store;
  all = [];
  
  async setup(){
    const roleTypes = await this.store.query('role-type', {
      endPoint: "roleTypes",
      queryParams:{
        pageNumber: 1,
        pageSize: 2147483647
      }
    })
    if (roleTypes != null){
      this.all = (roleTypes || []).toArray().filter(p=>p.roleTypeId == this.USER_ROLE_SUPER_USER_ID || p.roleTypeId == this.USER_ROLE_CUSTOMER_ID);
    }
  }

  USER_ROLE_SUPER_USER = "USER_ROLE_SUPER_USER";
  USER_ROLE_CUSTOMER = "USER_ROLE_CUSTOMER";

  FACILITY_PARTY_ROLE_OWNER = "FACILITY_PARTY_ROLE_OWNER";
  FACILITY_PARTY_ROLE_USER_ASSOC = "FACILITY_PARTY_ROLE_USER_ASSOC";

  USER_ROLE_SUPER_USER_ID = 2;
  USER_ROLE_CUSTOMER_ID = 4;

  FACILITY_PARTY_ROLE_OWNER_ID = 16;
  FACILITY_PARTY_ROLE_RESTRICTED_ID = 17;
  FACILITY_PARTY_ROLE_USER_ASSOC_ID = 18;
}
