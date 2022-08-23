import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/HomeView.vue';
import About from '@/pages/AboutView.vue';
import Faq from '@/pages/FaqView.vue';
import Login from '@/pages/LoginView.vue';
import Register from '@/pages/RegisterView.vue';

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
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
