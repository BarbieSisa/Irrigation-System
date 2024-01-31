import Model from '@ember-data/model';
import { inject as service } from '@ember/service';
export default class BaseModel extends Model {
  @service('store') store;
  @service('base-functions') baseFunctions;
  @service('current-user') currentUser;
  @service('active-route-tracker') activeRouteTracker;
  
  customUnloadRecord() {
    try {
      let record = this;
      let relationships = {};
      let hasRelationships = false;
      if (record && record.eachRelationship) {
        record.eachRelationship((name, {
          kind
        }) => {
          hasRelationships = true;
          relationships[name] = {
            data: kind === 'hasMany' ? [] : null
          };
        });
      }
      if (hasRelationships) {
        this.get('store').push({
          data: {
            type: record.constructor.modelName,
            id: record.id,
            relationships: relationships
          }
        });
      }
      record.unloadRecord();
    } catch (err) {
      logger(err);
    }

  }
}