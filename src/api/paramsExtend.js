import { CONFIG, SECRET } from "./config/publicParams.js";
// 导入外部模块并立即执行
import { cleanInput, hex_md5 } from "../common/js/utils";
import { date } from "quasar";
let md5 = hex_md5;
/**
 * 扩展网关接口公共参数
 * @param methodName  接口名称
 * @param params      参数对象
 * @param requestMode 传递方式，默认get
 * @returns {*}
 */
export function paramsExtend({ methodName, params = {}, requestMode = "get" }) {
  const extendParams = {
    _mt: methodName,
    _timestamp: date.formatDate(Date.now(), "YYYYMMDDHHmmss"),
    _requestMode: requestMode
  };
  let ret = Object.assign({}, CONFIG, extendParams, params);
  // 对 ret 里的每一个字段做转义处理
  ret = _objClean(ret);
  if (ret.hasOwnProperty("data")) {
    ret._format = "json";
    ret.data = params.data;
  }
  // 添加 _sig 签名
  ret._sig = sign(ret);
  return ret;
}

/**
 * 签名生成器
 * @param params
 * @returns {string}
 */
function sign(params) {
  let signValue = "",
    keyArr = Object.keys(params).sort();
  keyArr.forEach(item => {
    signValue += item + params[item];
  });

  signValue = `${SECRET}${signValue}${SECRET}`;
  signValue = md5(signValue).toUpperCase();
  return signValue;
}

/**
 * 对对象做字符转义处理函数
 * @param obj
 * @returns {*}
 * @private
 */
function _objClean(obj) {
  for (let k in obj) {
    obj[k] = cleanInput(obj[k]);
  }
  return obj;
}
