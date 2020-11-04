import Vue from 'vue';
import VueRouter from 'vue-router';
import storage from '@/utils/storage';
import Login from '@/views/Login';
import Layout from 'comps/Layouts';
import Redirect from 'comps/Redirect';
import notFound from 'comps/404';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "pages" */ '../views/Home.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/list',
        name: 'list',
        component: () => import(/* webpackChunkName: "pages" */ '../views/List/Index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/details/:id',
        name: 'details',
        component: () => import(/* webpackChunkName: "pages" */ '../views/Details/Index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/admin',
        name: 'adminIndex',
        component: () => import(/* webpackChunkName: "pages" */ '../views/Admin/Index.vue'),
      },
      {
        path: '/authorite',
        name: 'authorite',
        component: () => import(/* webpackChunkName: "pages" */ '../views/Admin/Authorite.vue'),
      },
    ],
  },
  { path: '/login', name: 'login', component: Login },
  { path: '/redirect/:path*', component: Redirect },
  { path: '*', name: 'notFound', component: notFound },
];

const router = new VueRouter({ mode: 'history', routes });
// 导航守卫
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta && (to.meta.requiresAuth || false);
  const userToken = storage.get('wms_user_token');
  const needLogin = requiresAuth && !userToken;
  if (needLogin) {
    next({ path: '/login' });
    return;
  }
  next();
});

window.router = router;
export default router;
