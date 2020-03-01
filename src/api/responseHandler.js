import ERROR_CODE from "./config/errorcode";
import { typeOf } from "../common/js/utils";

/**
 * 这个函数的作用就是，简化根据stat.code判断是否成功的逻辑，不需要在多个页面写大量if else
 * @param res          后台返回的原始res数据
 * @returns {Promise}
 */
export default function(res) {
  const originData = res.data || {};
  // 格式1：result:ok,code:113099
  if (
    originData.hasOwnProperty("result") &&
    originData.hasOwnProperty("code")
  ) {
    return new Promise((resolve, reject) => {
      if (originData.code === ERROR_CODE.SUCCESS) {
        resolve(originData.data);
      } else if (originData.code === ERROR_CODE.TOKEN_INVALID) {
        // token过期直接跳转到登录页
        alert("登录已过期");
      } else {
        console.error(originData.result);
        reject(originData); // 返回整个错误体
      }
    });
  }
  if (
    originData.hasOwnProperty("result") &&
    originData.hasOwnProperty("data")
  ) {
    return new Promise((resolve, reject) => {
      if (
        originData.result === ERROR_CODE.OK ||
        originData.result === ERROR_CODE.OK_ZH
      ) {
        resolve(originData.data);
      } else {
        reject(originData.result); // 只返回相关的错误信息部分
      }
    });
  }
  //返回格式为{rows:[],total:100}
  if (originData.hasOwnProperty("rows") && originData.hasOwnProperty("total")) {
    return new Promise((resolve, reject) => {
      if (originData.total >= 0) {
        resolve({ rows: originData.rows, total: originData.total });
      } else {
        reject("暂无数据");
      }
    });
  }
  if (typeOf(originData) === "array") {
    // 格式2：[]
    return new Promise(resolve => {
      resolve(originData);
    });
  }
  return Promise.resolve(originData);
}
