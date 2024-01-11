import Service from '@ember/service';
export default class BaseFunctions extends Service {
  formIsValid(opt){
    if (opt == null || opt.selector == null) {
      return false;
    }

    var valid = true;

    if (opt.prepFunc) {
      var prepFuncValidity = opt.prepFunc.call(this);
      if (prepFuncValidity != null && (prepFuncValidity == true || prepFuncValidity == false)) {
        valid = valid && prepFuncValidity;
      }
    }

    if (!document.querySelector(opt.selector).checkValidity()) {
      document.querySelector(opt.selector).classList.add("was-validated")
      valid = false;
    } else {
      document.querySelector(opt.selector).classList.remove("was-validated")
    }

    if (opt.postFunc) {
      var postFuncValidity = opt.postFunc.call(this);
      if (postFuncValidity != null && (postFuncValidity == true || postFuncValidity == false)) {
        valid = valid && postFuncValidity;
      }
    }
    return valid;
    //return true;
  };
  
  tryParse(val, key) {

    if (val != null) {
      if (key) {

        if (val.get && val.get) {
          try {
            return JSON.parse(val.get(key));
          } catch (ex) {
            return val.get(key);
          }
        } else {
          try {
            return JSON.parse(val[key]);
          } catch (ex) {
            return val[key];
          }
        }

      } else {
        try {
          return JSON.parse(val);
        } catch (ex) {
          return val;
        }

      }
    }


    return null;
  };

  removeNulls(obj) {
    var isArray = obj instanceof Array;
    for (var k in obj) {
      if (obj[k] === null) {
        if (isArray) {
          obj.splice(k, 1);
        }else {
          delete obj[k];
        }
      } else if (typeof obj[k] == "object") {
        if(obj[k] instanceof Array && obj[k].length===0){
          delete obj[k];
          continue;
        }
        removeNulls(obj[k]);
      }
    }
  }
  
  removeMainObj(obj,propName,primaryKey,mainId) {
    var isArray = obj instanceof Array;
    for (var k in obj) {
      if (typeof obj[k] == "object") {
        if (k == propName && obj[k] && obj[k][primaryKey] == mainId) {
          delete obj[k];
          continue;
        }
        removeMainObj(obj[k],propName,mainId);
      }
    }
  }
  
  getProperty(obj, prop, defVal) {
    defVal = defVal!=null? defVal : null;
    if (obj == null) {
      return defVal || null;
    }
    try {
      if (obj.get) {
        return obj.get(prop) != null ? obj.get(prop) : defVal;
      } else {
        if(prop.indexOf('.')!==-1){
          var parts = prop.split('.');
          parts.forEach((part)=>{
            obj = getProperty(obj,part);
          });
          return obj != null ? obj : defVal;
        }else{
          return obj[prop] != null ? obj[prop] : defVal;
        }
  
      }
    } catch (ex) {
      return defVal || null;
    }
  };
}