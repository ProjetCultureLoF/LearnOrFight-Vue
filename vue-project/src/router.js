import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/home.vue";
import Departments from "@/views/Departments.vue";
import NotFound from "@/views/pageNotFound.vue";
import Admin from "@/views/AdminQuizz.vue";
import Clans from "@/views/ClansSelection.vue";
import { api } from "@/plugins/requete.js";

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
      path: "/admin/:token",
      name: "admin",
      component: Admin,
      beforeEnter: (to, from, next) => {
        const token = to.params.token;
        api
          .get(`/users/?Token_User=${token}`)
          .then((response) => {
            if (response.data[0].isAdmin == true) {
              next();
            } else {
              next("/");
            }
          })
          .catch((error) => {
            console.error("Error checking admin status:", error);
            next("/");
          });
      },
    },
    {
      path: "/account",
      component: Account,
    },
    {
      path: "/clans",
      component: Clans,
    },
    {
      path: "/:catchall(.*)*",
      component: NotFound,
    },
  ],
});
