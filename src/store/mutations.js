export default {
  keepAlivesPush(state, component) {
    // 对指定组件进行动态更改缓存（缓存）--组件调用该方法时，判断该组件是否存在于该缓存数组，无则添加
    let keepAlives = state.keepAlives;
    !keepAlives.includes(component) && keepAlives.push(component);
  },
  keepAlivesDel(state, component) {
    // 对指定组件进行动态更改缓存（不缓存）--组件调用该方法时，从缓存数组中删除对应的组件元素
    let keepAlives = state.keepAlives;
    let index = keepAlives.indexOf(component);
    index > -1 && keepAlives.splice(index, 1);
  },
}