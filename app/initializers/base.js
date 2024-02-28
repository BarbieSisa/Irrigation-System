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

  window.getObject = function(obj){
    if(obj && obj.constructor && obj.constructor.modelName){
      return obj;
    }
    if(obj && obj.content !== undefined){
      return obj.content;
    }
    return obj;
  };

  window.base64URLEncode = function (input) {
    return input.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
  }

  window.base64URLDecode = function(input) {
    // Replace non-url compatible chars with base64 standard chars
    input = input
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    // Pad out with standard base64 required padding characters
    var pad = input.length % 4;
    if(pad) {
      if(pad === 1) {
        throw new Error('InvalidLengthError: Input base64url string is the wrong length to determine padding');
      }
      input += new Array(5-pad).join('=');
    }

    return input;
  }

  window.encodeString = function (str) {
    try{
      if(typeof str != 'string'){
        str = JSON.stringify(str);
      }

      if(str){
        return base64URLEncode(btoa(unescape(encodeURIComponent(str || ""))));
      }
    }catch(err){
      logger(err);
    }
    return '';
  };

  window.tryDecodeString = function (str) {
    try{
      if(str){
        return decodeURIComponent(escape(window.atob(base64URLDecode(str))))|| "";
      }
    }catch(err){
      // logger(err);
    }
    return str;
  };
}
export default {
  name: 'utils',
  initialize
};
