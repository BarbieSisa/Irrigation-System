import Ember from 'ember';

export function optIsEqual([lhs, rhs]) {
  if(lhs === '' || rhs === '' || lhs === null || rhs === null || lhs === undefined || rhs === undefined){
      return lhs === rhs;
  }
  return lhs == rhs;
}

export default Ember.Helper.helper(optIsEqual);
