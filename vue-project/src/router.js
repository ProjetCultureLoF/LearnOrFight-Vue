import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/home.vue';
import Departments from '@/views/Departments.vue';

// import Account from './views/Account.vue';
import Map from './views/map.vue';
// import Leaderboard from './components/Leaderboard.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/map',
      name: "map",
      component: Map,
    },
    {
      path: '/departments/:dep',
      name: "departments",
      component: Departments
    },
    // {
    //   path: '/account',
    //   component: Account
    // },
    // {
    //   path: '/leaderboard',
    //   component: Leaderboard
    // }
  ]
})