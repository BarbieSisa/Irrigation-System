export function initialize() {
  window.tryParse = function (val, key) {

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

  window.removeNulls = (obj) => {
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
  
  window.removeMainObj = (obj,propName,primaryKey,mainId) => {
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
  
  window.getProperty = (obj, prop, defVal) => {
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
export default {
  name: 'utils',
  initialize
};
