/**
 * @Author: Gavin
 * @Begin: 2020-12-30 10:49:29
 * @Update: 2021-2-25 16:46:29
 * @Update log: 工具箱
 */
import Vue from 'vue';
export {
  toPages, // 页面跳转
}

function toPages(to = {}, success, fail, complete) {
  const that = this;
  console.log(`to = `, to);
  let {
    name,
    params,
    path,
    query,
  } = to;
  try {
    if (typeof name == 'string') {
      that.$router.push({ name, params });
    } else {
      that.$router.push({ path, query });
    };
    success && success();
  } catch (error) { fail && fail(); }
  complete && complete();

}

function setCookie(key, value, expire) {
  const date = new Date();

  date.setSeconds(date.getSeconds() + expire);
  document.cookie = key + "=" + escape(value) + "; expires=" + date.toGMTString();



  console.log(date.toGMTString());
  console.log(document.cookie);
}

function getCookie(key) {

  let length = document.cookie.length;


  if (length > 0) {
    let c_start = document.cookie.indexOf(key + "=");
    if (c_start != -1) {
      c_start = c_start + key.length + 1;
      let c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) c_end = length;
      return unescape(document.cookie.substring(c_start, c_end));
    };
  };
  return false;
}

function delCookie(key) {
  setCookie(key, "", -1);
}

Vue.prototype.$cookie = {
  setCookie, // 编辑Cookie
  getCookie, // 获取Cookie
  delCookie, // 删除Cookie
};