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
  @tracked meta;
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
          if (qpName == 'refDoc') {
            queryParams[qpName] = encodeString(this[qpName]);
          } else {
            queryParams[qpName] = this[qpName];
          }
        }) 
      }
      let models = await this.store.query(this.modelName, {
        endPoint: this.endPoint,
        queryParams: queryParams
      })
      this.loadedItems = this.loadedItems.concat(models.toArray());
      this.meta = models.meta.data;
      this.requestLoading = false;
    } catch (error) {
      if ((error || {}).errorCode !== "ERROR_USER_DOES_NOT_HAVE_PERMISSIONS") {
        this.notify.error("Something went wrong..");
      }
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
    if (!this.requestLoading) {
      this.pageNumber = 1;
      this.loadedItems = [];
      return await this.makeRequest();
    }
  }
}