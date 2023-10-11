import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import { i18n } from "@/locales";
import "@/styles/global.less";

const app = createApp(App);
app.use(router);

const store = createPinia();
app.use(store);
app.use(i18n);

app.mount("#app");
