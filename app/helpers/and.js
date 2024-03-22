import Ember from 'ember';

export function and(params) {

  var res = params[0];

  for(var i=1;i<params.length;i++){
    res = res && params[i];
  }

  return res;
}

export default Ember.Helper.helper(and);
