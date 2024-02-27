import Ember from 'ember';

export function regex([key]) {

  let patterns = {

    password: "(?=.*\\d)(?=.*\\W)(.){8,128}",//At least one digit, at least one special character
    email:"[\\w\\.-]{2,30}@(([\\w_-]+\\.)+[^\\W_]{2,4})$",

    //userName: "[^\\d\\^@#%*/&\\+-=~`':;,\\.<>()№€{}\\$\\?\\!\\|\\[\\]\\\"_\\\\]{1,45}",//Anything except characters in the [brackets]
    //organizationName: ".*",
    //deviceName: ".*",
    //attributeName: ".*",
    //productName: ".*",
    //notificationName: ".*",

    serialNumber:"([A-Za-z]{1})([0-9A-Za-z]{5})",
    flowRate : "^([0-9])*[.{1}]([0-9])*$"
  }

  return patterns[key];
}

export default Ember.Helper.helper(regex);

