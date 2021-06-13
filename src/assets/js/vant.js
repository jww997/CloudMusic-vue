/**
 * @Author: Gavin
 * @Begin: 2020-12-30 10:49:29
 * @Update: 2021-2-25 16:46:29
 * @Update log: 轻量、可靠的移动端 Vue 组件库
 */
import Vue from 'vue'
import {

  // Button, // 按钮用于触发一个操作，如提交表单。
  // Cell, CellGroup, // 单元格为列表中的单个展示项。
  Icon, // 基于字体的图标集，可以通过 Icon 组件使用，也可以在其他组件中通过 icon 属性引用。
  Image as VanImage, // 增强版的 img 标签，提供多种图片填充模式，支持图片懒加载、加载中提示、加载失败提示。
  Col, Row, // Layout 提供了 van-row 和 van-col 两个组件来进行行列布局。
  Popup, // 弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加展示。
  Toast, // 在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。

  // Calendar, // 日历组件用于选择日期或日期区间，2.4 版本开始支持此组件。
  // Cascader, // 级联选择框，用于多层级数据的选择，典型场景为省市区选择，2.12 版本开始支持此组件。
  // Checkbox, CheckboxGroup, // 用于在选中和非选中状态之间进行切换。、
  // DatetimePicker, // 时间选择器，支持日期、年月、时分等维度，通常与弹出层组件配合使用。
  // Field, // 表单中的输入框组件。
  // Form, // 用于数据录入、校验，支持输入框、单选框、复选框、文件上传等类型，2.5 版本开始支持此组件。
  // NumberKeyboard, // 虚拟数字键盘，可以配合密码输入框组件或自定义的输入框组件使用。
  // PasswordInput, // 带网格的输入框组件，可以用于输入密码、短信验证码等场景，通常与数字键盘组件配合使用。
  // Picker, // 提供多个选项集合供用户选择，支持单列选择和多列级联，通常与弹出层组件配合使用。
  // RadioGroup, Radio, // 用于在多个选项中选择单个结果。
  // Rate, // 用于对事物进行评级操作。
  Search, // 用于搜索场景的输入框组件。
  Slider, // 滑动输入条，用于在给定的范围内选择一个值。
  // Stepper, // 步进器由增加按钮、减少按钮和输入框组成，用于在一定范围内输入、调整数字。
  // Switch, // 用于在打开和关闭状态之间进行切换。
  // Uploader, // 用于将本地的图片或文件上传至服务器，并在上传过程中展示预览图和上传进度。目前 Uploader 组件不包含将文件上传至服务器的接口逻辑，该步骤需要自行实现。

  // ActionSheet, // 底部弹起的模态面板，包含与当前情境相关的多个选项。
  Dialog, // 弹出模态框，常用于消息提示、消息确认，或在当前页面内完成特定的交互操作。弹出框组件支持函数调用和组件调用两种方式。
  // DropdownMenu, DropdownItem, // 向下弹出的菜单列表。
  Loading, // 加载图标，用于表示加载中的过渡状态。
  Notify, // 在页面顶部展示消息提示，支持函数调用和组件调用两种方式。
  // Overlay, // 创建一个遮罩层，用于强调特定的页面元素，并阻止用户进行其他操作。
  // PullRefresh, // 用于提供下拉刷新的交互操作。
  // ShareSheet, // 底部弹起的分享面板，用于展示各分享渠道对应的操作按钮，不含具体的分享逻辑。2.6 版本开始支持此组件。
  // SwipeCell, // 可以左右滑动来展示操作按钮的单元格组件。

  // Badge, // 在右上角展示徽标数字或小红点。
  // Circle,// 圆环形的进度条组件，支持进度渐变动画。
  // Collapse, CollapseItem, // 将一组内容放置在多个折叠面板中，点击面板的标题可以展开或收缩其内容。
  // CountDown, // 用于实时展示倒计时数值，支持毫秒精度。
  // Divider, // 用于将内容分隔为多个区域。
  // Empty, // 空状态时的占位提示，2.6 版本开始支持此组件。
  ImagePreview, // 图片放大预览，支持函数调用和组件调用两种方式。
  Lazyload, // Lazyload 是 Vue 指令，使用前需要对指令进行注册。
  // List, // 瀑布流滚动加载，用于展示长列表，当列表即将滚动到底部时，会触发事件并加载更多列表项。
  // NoticeBar, // 用于循环播放展示一组消息通知。
  // Popover, // 弹出式的气泡菜单，2.11 版本开始支持此组件。
  Progress, // 用于展示操作的当前进度。
  // Skeleton, // 用于在内容加载过程中展示一组占位图形。
  // Step, Steps, // 用于展示操作流程的各个环节，让用户了解当前的操作在整体流程中的位置。
  // Sticky, // Sticky 组件与 CSS 中position: sticky属性实现的效果一致，当组件在屏幕范围内时，会按照正常的布局排列，当组件滚出屏幕范围时，始终会固定在屏幕顶部。
  Swipe, SwipeItem, // 用于循环播放一组图片或内容。
  Tag,

  // Grid, GridItem, // 宫格可以在水平方向上把页面分隔成等宽度的区块，用于展示内容或进行页面导航。
  // IndexBar, IndexAnchor,
  // NavBar,
  // Pagination,
  // Sidebar, SidebarItem,
  // Tab, Tabs,
  Tabbar, TabbarItem,

  // AddressEdit, // 收货地址编辑组件，用于新建、更新、删除收货地址。
  // AddressList, // 展示收货地址列表。
  // Area, // 省市区三级联动选择，通常与弹出层组件配合使用。
  // Card, // 商品卡片，用于展示商品的图片、价格等信息。
  // ContactCard, // 以卡片的形式展示联系人信息。
  // ContactEdit, // 编辑并保存联系人信息。
  // ContactList, // 展示联系人列表。
  // CouponCell, CouponList,
  // GoodsAction, GoodsActionIcon, GoodsActionButton,
  // SubmitBar,
  // Sku,

} from "vant";

// import "vant/lib/index.css"; // 定制主题
// import "vant/lib/index.less"; // 定制主题
// import "../../assets/less/var.less"; // 定制主题

// 基础组件
// Vue.use(Button); // 按钮
// Vue.use(Cell); // 单元格
// Vue.use(CellGroup);
Vue.use(Icon); // 图标
Vue.use(VanImage); // 图片
Vue.use(Col); // 布局
Vue.use(Row);
Vue.use(Popup); // 弹出层
// Vue.use(Toast); // 轻提示

// 表单组件
// Vue.use(Calendar); // 日历
// Vue.use(Cascader); // 级联选择      // 不知道为啥,正常引入会报错
// Vue.use(Checkbox); // 复选框
// Vue.use(CheckboxGroup);
// Vue.use(DatetimePicker); // 时间选择
// Vue.use(Field); // 输入框
// Vue.use(Form); // 表单
// Vue.use(NumberKeyboard); // 数字键盘
// Vue.use(PasswordInput); // 密码输入框
// Vue.use(Picker); // 选择器
// Vue.use(RadioGroup); // 单选框
// Vue.use(Radio);
// Vue.use(Rate); // 评分
Vue.use(Search); // 搜索
Vue.use(Slider); // 滑块
// Vue.use(Stepper); // 步进器
// Vue.use(Switch); // 开关
// Vue.use(Uploader); // 文件上传

// 反馈组件
// Vue.use(ActionSheet);// 动作面板
// Vue.use(Dialog); // 弹出框
// Vue.use(DropdownMenu); // 下来菜单
// Vue.use(DropdownItem);
Vue.use(Loading); // 加载
// Vue.use(Notify); // 消息通知
// Vue.use(Overlay); // 遮罩层
// Vue.use(PullRefresh); // 下拉刷新
// Vue.use(ShareSheet); // 分享面板
// Vue.use(SwipeCell); // 滑动单元格

// 展示组件
// Vue.use(Badge); // 徽标
// Vue.use(Circle); // 环形进度条
// Vue.use(Collapse); // 折叠面板
// Vue.use(CollapseItem);
// Vue.use(CountDown); // 倒计时
// Vue.use(Divider); // 分割线
// Vue.use(Empty); // 空状态
Vue.use(ImagePreview); // 图片预览
Vue.use(Lazyload); // 懒加载
// Vue.use(List); // 列表
// Vue.use(NoticeBar); // 通知栏
// Vue.use(Popover); // 气泡弹出框
Vue.use(Progress); // 进度条
// Vue.use(Skeleton); // 骨架屏
// Vue.use(Step); // 步骤条
// Vue.use(Steps);
// Vue.use(Sticky); // 粘性布局
Vue.use(Swipe); // 轮播
Vue.use(SwipeItem);
Vue.use(Tag); // 标签

// 导航组件
// Vue.use(Grid); // 宫格
// Vue.use(GridItem);
// Vue.use(IndexBar); // 索引栏
// Vue.use(IndexAnchor);
// Vue.use(NavBar); // 导航栏
// Vue.use(Pagination); // 分页
// Vue.use(Sidebar); // 侧边导航
// Vue.use(SidebarItem);
// Vue.use(Tab); // 标签页
// Vue.use(Tabs);
Vue.use(Tabbar); // 标签栏
Vue.use(TabbarItem);

// 业务组件
// Vue.use(AddressEdit); // 地址编辑
// Vue.use(AddressList); // 地址列表
// Vue.use(Area); // 省市区选择
// Vue.use(Card); // 商品卡片
// Vue.use(ContactCard); // 联系人卡片
// Vue.use(ContactEdit); // 联系人编辑
// Vue.use(ContactList); // 联系人列表
// Vue.use(CouponCell); // 优惠券
// Vue.use(CouponList);
// Vue.use(GoodsAction); // 商品导航
// Vue.use(GoodsActionButton);
// Vue.use(GoodsActionIcon);
// Vue.use(SubmitBar); // 提交订单栏
// Vue.use(Sku); // 商品规格

Vue.prototype.$vant = { // 挂载
  Toast, Dialog, ImagePreview, Lazyload, Notify,
};