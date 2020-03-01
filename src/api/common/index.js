import { post } from "../request.js";
import urls from "./apilist.js";

let apis = {};
for (let url in urls) {
  apis[url] = params => {
    return post(urls[url], params);
  };
}
export default apis;
