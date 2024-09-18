import { createRouter, createWebHistory } from 'vue-router';
import AboutView from '../views/AboutView.vue';
import CarsView from '../views/CarsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'about',
      component: AboutView
    },
    {
      path: '/cars',
      name: 'cars',
      component: CarsView
    }
  ]
})

export default router
