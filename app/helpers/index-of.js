import Ember from 'ember';

export function indexOf([lhs, rhs]) {
  return (lhs || "").indexOf(rhs) >= 0;
}

export default Ember.Helper.helper(indexOf);
