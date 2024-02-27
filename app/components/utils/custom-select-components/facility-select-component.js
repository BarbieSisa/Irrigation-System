import InfinityScrollComponent from 'irrigation-system/base-elements/infinity-scroll-component';
import { tracked } from '@glimmer/tracking';
import { action, computed } from '@ember/object';
export default class CustomFacilitySelectComponent extends InfinityScrollComponent {
  @tracked value;
  @tracked searchText;
  modelName = 'facility';
  endPoint = 'facilities';
  queryParamsList = ['searchText'];
  makeRequestOnInit = false;

  @computed('value')
  get selectedItem(){
    if (this.value) {
      return this.store.getComputedRecord('facility', this.value);
    }
    return null;
  };

  @action
  selectItem(item){
    this.set('value', item.get('facilityId'));
    this.set('searchText', item.get('facilityName'));

    if (this.get('onChange')) {
      this.get('onChange')(item.get('facilityId'), item);
    }
  };

  @action
  clear() {
    this.set('value', null);
    this.set('searchText', null);

    if (this.get('onChange')) {
      this.get('onChange')(null, null);
    }
  };

  @action
  makeRequestOnSearchTextChange(searchText){
    this.searchText = searchText;
    return this.makeRequestOnFieldChange();
  }
}