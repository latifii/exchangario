import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/HomeView.vue';
import About from '@/pages/AboutView.vue';
import Faq from '@/pages/FaqView.vue';
import Login from '@/pages/LoginView.vue';
import Profile from '@/pages/ProfileView.vue';
import Register from '@/pages/RegisterView.vue';
import ExchangeCreate from '@/pages/ExchangeCreate.vue';
import { getAuth } from 'firebase/auth';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/faq',
    name: 'faq',
    component: Faq,
  },
  {
    path: '/exchanges/new',
    name: 'ExchangeCreate',
    component: ExchangeCreate,
    meta: { onlyUser: true },
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { onlyUser: true },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { onlyGuest: true },
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { onlyGuest: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach(async (to, _, next) => {
  const isAuth = await getAuth().currentUser;
  if (to.meta.onlyGuest) {
    if (isAuth) {
      next({ name: 'home' });
    } else {
      next();
    }
  } else if (to.meta.onlyUser) {
    if (!isAuth) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
