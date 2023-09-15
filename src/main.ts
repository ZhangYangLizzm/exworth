import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import { Permission } from "./router/permission";
import "virtual:svg-icons-register";
import App from "./App.vue";
import { i18n } from "@/locales";
import "@/styles/global.less";

const app = createApp(App);
app.use(router);

const store = createPinia();
app.use(store);
app.use(i18n);
app.use(Permission);
app.mount("#app");
