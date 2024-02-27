import BaseComponent from 'irrigation-system/base-elements/base-component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { computed } from '@ember/object';
export default class InfinityScrollComponent extends BaseComponent {
  @tracked loadedItems = [];
  @tracked requestLoading = false;
  @tracked pageSize = 30;
  @tracked pageNumber = 1;
  @tracked sleepHandler;

  makeRequestOnInit = true;

  init() {
    super.init(...arguments)
    if (this.makeRequestOnInit) {
      this.makeRequest();
    }
  };

  willDestroyElement() {
    super.willDestroyElement(...arguments);
    clearTimeout(this.sleepHandler);
  }

  async makeRequest(){
    this.requestLoading = true;
    try {
      let queryParams =  {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      };
      if (this.queryParamsList != null && this.queryParamsList.length) {
        this.queryParamsList.forEach((qpName)=>{
          queryParams[qpName] = this[qpName];
        }) 
      }
      let models = await this.store.query(this.modelName, {
        endPoint: this.endPoint,
        queryParams: queryParams
      })
      this.loadedItems = this.loadedItems.concat(models.toArray());
      this.requestLoading = false;
    } catch (error) {
      this.requestLoading = false;
    }
    return true;
  };

  @computed('pageSize', 'pageNumber')    
  get lastAvailableItemIndex() {    
    return (this.pageNumber * this.pageSize) - 1;
  };   

  @action
  makeRequestOnFieldChange(){
    clearTimeout(this.sleepHandler);
    this.sleepHandler = setTimeout(() => {
      this.pageNumber = 1;
      this.loadedItems = [];
      this.makeRequest();
    }, 550);
  }

  @action
  async loadNextPage() {
    this.pageNumber++;
    return await this.makeRequest();
  };

  @action
  async refresh() {
    this.pageNumber = 1;
    this.loadedItems = [];
    return await this.makeRequest();
  }
}