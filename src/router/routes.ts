import Login from "@/views/login/Login.vue";
import Layout from "@/layouts/Layout.vue";
import User from "@/views/user/User.vue";
import Merchant from "@/views/merchant/Merchant.vue";
import Channel from "@/views/channel/Channel.vue";


import { switchPPC } from "@/api/login";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    component: Layout,
    beforeEnter: async(to: any, from: any, next: () => void) => {
      await switchPPC();
      next();
    },
    children: [
      {
        path: "user",
        name: "User",
        component: User,
      },
      {
        path: "channel",
        name: "Channel",
        component: Channel,
      },
      {
        path: "merchant",
        name: "Merchant",
        component: Merchant,
      },
    ],
  },
];

export default routes;
