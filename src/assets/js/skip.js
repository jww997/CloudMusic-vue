/**
 * @Author: Gavin
 * @Begin: 2020-12-30 10:49:29
 * @Update: 2020-12-30 10:49:29
 * @Update log: 跳转操作
 */
export {
  toPages,
}

function toPages(to = {}) {
  const that = this;
  console.log(`to = `, to);

  let {
    name,
    params,
    path,
    query
  } = to;
  if (typeof to.name == 'string') {
    that.$router.push({ name, params });
  } else {
    that.$router.push({ path, query });
  };

}