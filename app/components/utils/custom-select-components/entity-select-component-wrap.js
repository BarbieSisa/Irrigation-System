import BaseComponent from 'irrigation-system/base-elements/base-component';
import { scheduleOnce } from '@ember/runloop';
import { action } from '@ember/object';
export default class EntitySelectComponentWrap extends BaseComponent {
  init() {
    super.init(...arguments);
    let closeOnClickOutside = (event) => {
      if (this.element != null && !this.element.contains(event.target) && this.element.querySelector('input') != document.activeElement) {
        this.set('isOpened', false);
        this.removeClickOutsideEvent();
      }
    }
    this.set('closeOnClickOutside', closeOnClickOutside.bind(this));
  };

  willDestroyElement() {
    super.willDestroyElement(...arguments);
    document.removeEventListener('click', this.get('closeOnClickOutside'));
  };

  addClickOutsideEvent() {
    document.addEventListener('click', this.get('closeOnClickOutside'));
  };

  removeClickOutsideEvent() {
    document.removeEventListener('click', this.get('closeOnClickOutside'));
  };

  moveUpOnList() {
    let selectedItemIdx = this.get('selectedItemIdx');
    if (selectedItemIdx == null) {
      return
    }
    selectedItemIdx--;
    this.set('selectedItemIdx', selectedItemIdx >= 0 ? selectedItemIdx : 0);
    this.focusOnSelectedItem();
  };

  moveDownOnList() {
    let selectedItemIdx = this.get('selectedItemIdx');
    if (selectedItemIdx == null) {
      selectedItemIdx = 0
    } else {
      selectedItemIdx++
    }
    this.set('selectedItemIdx', selectedItemIdx < this.get('loadedItems.length') ? selectedItemIdx : this.get('loadedItems.length') - 1);
    this.focusOnSelectedItem();
  };


  focusOnSelectedItem() {
    scheduleOnce('afterRender', this, function() {
      if (!this.utils.isMobile()) {
        let element = this.get('element').querySelector("li.on-focus");
        if (element != null) {
          element.scrollIntoView(false);
        }
      }
    });
  };

  selectItemBySelectedItemIdx() {
    if (this.get('onSelectItem') && this.get('selectedItemIdx') && this.get('loadedItems') && this.get('loadedItems')[this.get('selectedItemIdx')]) {
      this.set('isOpened', false);
      this.removeClickOutsideEvent();
      this.get('onSelectItem')(this.get('items')[this.get('selectedItemIdx')]);
    }
  };

  @action
  selectItem(item) {
    if (this.get('checkIfShouldKeepListOpened')) {
      if (this.get('onSelectItem')) {
        if (this.get('onSelectItem')(item) != true) {
          this.set('isOpened', false);
          this.removeClickOutsideEvent();
        }
      }
    } else {
      this.set('isOpened', false);
      this.removeClickOutsideEvent();
      if (this.get('onSelectItem')) {
        this.get('onSelectItem')(item);
      }
    }
  };

  @action
  onKeyUp(event) {
    var code = (event.keyCode ? event.keyCode : event.which);
    switch (code) {
      case 40:
        break;
      case 38:
        break;
      case 13:
        this.selectItemBySelectedItemIdx();
        break;
      default:
        if (this.get('onSearchTextChange')) {
          this.get('onSearchTextChange')(event.target.value);
        }
    }
  };

  @action
  onKeyDown(event) {
    var code = (event.keyCode ? event.keyCode : event.which);
    switch (code) {
      case 40:
        this.moveDownOnList();
        break;
      case 38:
        this.moveUpOnList();
        break;
    }
  };

  @action
  close(event){
    this.set('isOpened', false);
    this.removeClickOutsideEvent();
    this.set('selectedItemIdx', null);
    event.stopPropagation();
  };

  @action
  open(event) {
    this.set('isOpened', true);
    this.addClickOutsideEvent();
    event.stopPropagation();
    this.set('selectedItemIdx', null);
    scheduleOnce('afterRender', this, function() {
      let element = this.get('element').querySelector("input");
      if (element != null) {
        element.focus();
      }
    });
    if (this.get('onOpen')) {
      this.get('onOpen')();
    }
  }
}