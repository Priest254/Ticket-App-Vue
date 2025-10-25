import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '../composables/useAuth';

const Landing = () => import('../pages/Landing.vue');
const Login = () => import('../pages/auth/Login.vue');
const Signup = () => import('../pages/auth/Signup.vue');
const Dashboard = () => import('../pages/Dashboard.vue');
const Tickets = () => import('../pages/Tickets.vue');

const routes = [
  { path: '/', name: 'Landing', component: Landing },
  { path: '/auth/login', name: 'Login', component: Login },
  { path: '/auth/signup', name: 'Signup', component: Signup },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/tickets', name: 'Tickets', component: Tickets },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const { isLoggedIn } = useAuth();
  const publicPages = ['/', '/auth/login', '/auth/signup'];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !isLoggedIn.value) next('/auth/login');
  else next();
});

export default router;
