import Ember from 'ember';

export function not([val]) {
  return !val;
}

export default Ember.Helper.helper(not);
