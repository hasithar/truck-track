import { createWebHistory, createRouter } from 'vue-router';

import DashboardPage from '@/pages/Dashboard.vue';
import AboutPage from '@/pages/About.vue';
import VehicleHistoryPage from '@/pages/VehicleHistory.vue';
import VehicleListPage from '@/pages/VehicleList.vue';

const routes = [
  { path: '/', component: DashboardPage, name: 'Dashboard' },
  { path: '/about', component: AboutPage, name: 'About' },
  {
    path: '/route/:id',
    component: VehicleHistoryPage,
    name: 'Vehicle Route History',
    props: true,
  },
  { path: '/list', component: VehicleListPage, name: 'All Vehicles' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
