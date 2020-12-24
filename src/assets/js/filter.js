function formatCount(num) {

  // console.log(typeof num);
  // console.log(num);

  if (typeof num == 'number') {
    if (!num) {
      num = 0;
    } else if (num > 10e8 * 3) {
      num = `${(num / 10e8).toFixed(0)}亿`;
    } else if (num >= 10e8) {
      num = `${(num / 10e8).toFixed(1)}亿`;
    } else if (num >= 10e5) {
      num = `${(num / 10e5).toFixed(0)}万`;
    };
  }
  return num;

}

export {
  formatCount,
}