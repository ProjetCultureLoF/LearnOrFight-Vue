import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/home.vue';
import Game from '@/views/Game.vue';
// import Account from './views/Account.vue';
import Map from './views/map.vue';
// import Leaderboard from './components/Leaderboard.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/map',
      component: Map,
    },
    {
      path: '/game',
      component: Game
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