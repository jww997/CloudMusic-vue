/**
 * @Author: Gavin
 * @Begin: 2020-12-30 10:49:29
 * @Update: 2020-12-30 10:49:29
 * @Update log: 跳转操作
 */
export {
  toPages,
}

function toPages(path, query) {
  const that = this;
  console.log(`path = ${path}, query = `, query);
  that.$router.push({ path, query });
}