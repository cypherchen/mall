import Toast from "./Toast";

const obj = {};

// 声明一个install函数，当toast在main.js里被安装的时候会调用这个函数
obj.install = function (Vue){
  // 1.创建一个Toast组件构造器
  const toastConstructor = Vue.extend(Toast);

  // 2.创建一个toast组件
  const toast = new toastConstructor();

  // 3.将组件手动挂载到某个元素上
  toast.$mount(document.createElement('div'));

  // 4.将toast所挂在的元素添加到body上
  document.body.appendChild(toast.$el);

  // 5.给Vue原型添加一个$toast属性
  Vue.prototype.$toast = toast;
}

export default obj
