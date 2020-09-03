import Vue from 'vue';
import VueRouter from 'vue-router';
import storage from '@/utils/storage';
import Home from '@/views/Home';
import Login from '@/views/Login';
import Redirect from 'comps/Redirect';
import notFound from 'comps/404';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home', name: 'home', component: Home, meta: { requiresAuth: true },
  },
  { path: '/login', name: 'login', component: Login },
  { path: '/redirect/:path*', component: Redirect },
  { path: '*', name: 'notFound', component: notFound },
];

const router = new VueRouter({ mode: 'history', routes });
// 导航守卫
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta && (to.meta.requiresAuth || false);
  const userToken = storage.get('userToken');
  const needLogin = requiresAuth && !userToken;
  if (needLogin) {
    next({ path: '/login' });
    return;
  }
  next();
});

window.router = router;
export default router;
