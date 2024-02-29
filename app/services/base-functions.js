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
      document.querySelector(opt.selector).reportValidity();
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
}