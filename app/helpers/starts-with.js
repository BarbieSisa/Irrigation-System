import Ember from 'ember';

export function startsWith([str, key]) {
  return str != null && key != null ? str.indexOf(key) == 0 : false;
}

export default Ember.Helper.helper(startsWith);
