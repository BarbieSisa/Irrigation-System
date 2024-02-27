import BaseComponent from 'irrigation-system/base-elements/base-component';
import { computed } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
export default class EntitySelectItemComponent extends BaseComponent {
  tagName = 'li';
  classNameBindings = ['isOnFocus'];

  init() {
    super.init(...arguments);
    let fn = () => {
      this.get('onHover')(this.get('index'));
    }
    this.set('onHoverFunction', fn);

    scheduleOnce('afterRender', this, function () {
      const element = this.element;
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      };

      const callback = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && this.lastAvailableItemIndex == this.index && this.onShouldLoadNextPage) {
            this.onShouldLoadNextPage();
          }
        });
      };

      const observer = new IntersectionObserver(callback, options);

      observer.observe(element);
    });
  };

  didInsertElement() {
    super.didInsertElement(...arguments);
    this.element.addEventListener('mouseenter', this.get('onHoverFunction'));
  };

  willDestroyElement() {
    super.willDestroyElement(...arguments);
    this.element.removeEventListener('mouseenter', this.get('onHoverFunction'));
  };

  @computed('index', 'selectedItemIdx')
  get isOnFocus(){
    return this.get('index') == this.get('selectedItemIdx') ? 'on-focus' : '';
  };

  click(){
    this.get('onSelect')();
  }
}