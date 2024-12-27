import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import NoteView from '@/views/NoteView.vue';
import ResetPassword from '@/views/ResetPassword.vue';
import ProductDetails from '@/views/ProductDetails.vue';
import AboutView from '@/views/AboutView.vue';
import LoginRegister from '@/views/LoginRegister.vue';
import UpdateProfile from '@/views/UpdateProfile.vue'; // 引入新頁面
import AddProduct from '@/views/AddProduct.vue'; // 新增 AddProduct 頁面

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/note',
    name: 'note',
    component: NoteView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/auth/reset-password/:token',
    name: 'ResetPassword',
    component: ResetPassword,
    meta: { requiresAuth: false },
  },
  {
    path: '/product/:productName',
    name: 'ProductDetails',
    component: ProductDetails,
    props: true,
  },
  {
    path: '/login', // 新增 LoginRegister 的路由
    name: 'login-register',
    component: LoginRegister,
    meta: { requiresAuth: false }, // 不需要认证
  },
  {
    path: '/update-profile', // 新增的路由
    name: 'update-profile',
    component: UpdateProfile, // 綁定 UpdateProfile 頁面
    meta: { requiresAuth: false }, // 不需要身份驗證
  },
  {
    path: '/add-product', // 新增 AddProduct 路由
    name: 'add-product',
    component: AddProduct, // 綁定 AddProduct 頁面
    meta: { requiresAuth: true }, // 需要身份驗證
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL || '/'),
  routes,
});

// 路由守衛，檢查是否需要認證
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('userToken'); // 獲取存儲的 token
  if (to.meta.requiresAuth && !token) {
    // 如果需要身份驗證且沒有 token，跳轉到登入頁
    next('/login');
  } else {
    // 否則允許導航
    next();
  }
});

export default router;
