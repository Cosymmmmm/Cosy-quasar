import axios from "axios";
import qs from "querystring";
import responseHandler from "./responseHandler";
import { getUrlParam } from "../common/js/utils";


/**
 * 设置ticket
 * @param {string} ticket token
 */
export const setToken = (ticket) => {
  const langList = [ 'CN', 'EN' ]
  let lang = getUrlParam('lang').toUpperCase()
  if (!langList.includes(lang)) lang = 'CN'
  lang === 'CN' && (axios.defaults.headers.post.authenticator = `${ticket} FLUXALALYZE 1.0 SIMPLIFIED_CHINESE GMT+8:00`); // 简体中文
  lang === 'EN' && (axios.defaults.headers.post.authenticator = `${ticket} FLUXALALYZE 1.0 ENGLISH GMT+8:00`); // 英文
};

/**
 * 请求头参数规则 token + client + version + language + timezone
 * @returns {string}
 */
// function getAuthenticator() {
//   let token = getToken() || "";
//   return `${token} ${requestHeaderParams.CLIENT_FLAG} ${requestHeaderParams.version} ${requestHeaderParams.language} ${requestHeaderParams.TIMEZONE_FLAG}`;
// }


/**
 * 普通post请求
 * @param url
 * @param params
 * @returns {*}
 */
export const post = async (url, params) => {
  const res = await axios.post(url, qs.stringify(params), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
  return responseHandler(res);
};

/**
 * json格式的Post请求
 * @param url
 * @param params
 * @returns {*}
 */
export const postJson = async (url, params) => {
  const res = await axios.post(url, params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  return responseHandler(res);
};

/**
 * 上传文件
 * @param url
 * @param params
 * @returns {*}
 */
export const postFile = async (url, formdata) => {
  const res = await axios({
    url,
    method: "post",
    data: formdata,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
  return responseHandler(res);
};
/**
 * 上传文件
 * @param url
 * @param params
 * @returns {*}
 */
export const uploadFile = async (url, formdata) => {
  const res = await axios({
    url,
    method: "post",
    data: formdata,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return responseHandler(res);
};
/**
 * 导出
 * @param url
 * @param params
 */
export const postuploadFile = async function(url, params) {
  let res = await axios.post(url, qs.stringify(params), {
    responseType: "blob"
  });
  return res;
};

export const get = async (url, params) => {
  const res = await axios.get(url, {
    params,
  });
  return responseHandler(res);
};
