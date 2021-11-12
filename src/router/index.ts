import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  // 全てのパスを掲示板コンポーネントへ遷移する
  {
    path: "*",
    component: () => import("../components/Bbs.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
