import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory("/manage"),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router