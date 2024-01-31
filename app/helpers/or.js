import Ember from 'ember';

export function or(params) {
  let val = null;
  (params || []).toArray().forEach((item, i) => {
    val = val || item;
  });

  return val;
}

export default Ember.Helper.helper(or);
