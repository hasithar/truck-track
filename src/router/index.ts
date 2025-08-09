import { createWebHistory, createRouter } from 'vue-router';

import DashboardPage from '@/pages/Dashboard.vue';
import AboutPage from '@/pages/About.vue';

const routes = [
  { path: '/', component: DashboardPage, name: 'Dashboard' },
  { path: '/about', component: AboutPage, name: 'About' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
