import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home,
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
//   },
// ];

const routes = store.state.routes.map((one) => {
  // eslint-disable-next-line prefer-template
  one.component = () => import(/* webpackChunkName: "page" */ '../views/' + one.name + '.vue');
  return one;
});
routes.push({ path: '*', component: () => import(/* webpackChunkName: "page" */ '../components/404.vue') });

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

window.router = router;
export default router;
