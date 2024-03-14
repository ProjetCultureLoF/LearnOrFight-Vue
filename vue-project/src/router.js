import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/home.vue";
import Departments from "@/views/Departments.vue";
import NotFound from "@/views/pageNotFound.vue";
import Admin from "@/views/AdminQuizz.vue";

import Account from "./views/Account.vue";
// import Leaderboard from './components/Leaderboard.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },

    {
      path: "/departments/:dep",
      name: "departments",
      component: Departments,
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
    },
    {
      path: "/account",
      component: Account,
    },
    // {
    //   path: '/leaderboard',
    //   component: Leaderboard
    // }
    {
      path: "/:catchall(.*)*",
      component: NotFound,
    },
  ],
});
