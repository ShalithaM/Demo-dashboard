import Vue from "vue";
import Router from "vue-router";


//View For Router
import Dashboard from "@/views/Dashboard";

Vue.use(Router);

var router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: Dashboard,
    }
  ]
});

export default router;
