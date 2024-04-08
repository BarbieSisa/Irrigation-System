import Ember from 'ember';

export function regex([key]) {

  let patterns = {

    password: "(?=.*\\d)(?=.*\\W)(.){8,128}",//At least one digit, at least one special character
    email:"[\\w\\.-]{2,30}@(([\\w_-]+\\.)+[^\\W_]{2,4})$",
    serialNumber:"([A-Za-z]{1})([0-9A-Za-z]{5})",
  }

  return patterns[key];
}

export default Ember.Helper.helper(regex);

