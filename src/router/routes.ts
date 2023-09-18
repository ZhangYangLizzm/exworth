import Login from "@/views/login/Login.vue";
import Wallet from "@/views/wallet/Wallet.vue";
import MainLayout from "@/layouts/MainLayout.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "wallet",
        name: "Wallet",
        component: Wallet,
      },
      {
        path: "setting",
        name: "Setting",
        component: () => import("@/views/setting/Setting.vue"),
      },
    ],
  },
  {
    path: "",
    redirect: "/login",
  },
];

export default routes;