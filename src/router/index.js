import Vue from "vue";
import VueRouter from 'vue-router';


// 页面懒加载方式导入组件
const Home = () => import('views/home/Home');
const Category = () => import('views/category/Category');
const Cart = () => import('views/cart/Cart');
const Profile = () => import('views/profile/Profile');
const Detail = () => import('views/detail/Detail')

// 安装插件
Vue.use(VueRouter);
// 创建路由映射
const routes = [
  {
    path: '',
    redirect:'/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid', // 详情页用动态路由，拼接一个每个商品唯一的iid
    component: Detail
  }
];
// 创建路由对象
const router = new VueRouter({
  routes,
  mode: "history"
})
// 导出路由对象
export default router;
