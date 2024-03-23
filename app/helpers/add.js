import Ember from 'ember';

export function add(params) {
  if(_getNumber(params[0])==null){
    return null;
  }
  var res=JSON.parse(params[0]);

  for(var i=1;i<params.length;i++){
    if(_getNumber(params[i])==null){
      return null;
    }
    res+=JSON.parse(params[i]);
  }

  return res;
}

export default Ember.Helper.helper(add);
