const Rectangle = (function() {
  function compareMin(a, b) {
    return a > b ? b : a;
  }

  //  创建 prototype，继承父类
  function packageFatherProto(obj) {
    function fn() {}
    fn.prototype = obj;
    return fn;
  }

  function packageFnParam(param) {
    Draw.call(this, param);
  }
  //  继承原型链
  let fatherProto = packageFatherProto(Draw.prototype);
  //  继承 原型实例
  packageFnParam.prototype = fatherProto;
  //  修复实例
  fatherProto.constructor = packageFnParam;

  let rectangle = new packageFnParam();

  const rectangle = function(context, w, h) {
    Draw.call(this, context, w, h);
  };

  console.log(rectangle.prototype);

  return rectangle;
})();
