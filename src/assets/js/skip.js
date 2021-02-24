/**
 * @Author: Gavin
 * @Begin: 2020-12-30 10:49:29
 * @Update: 2020-12-30 10:49:29
 * @Update log: 跳转操作
 */
export {
  toPages,
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