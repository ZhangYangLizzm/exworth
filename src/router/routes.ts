import Login from "@/views/login/Login.vue";
import Layout from "@/layouts/Layout.vue";

import User from "@/views/user/User.vue";

import MerchantList from "@/views/merchant/MerchantList.vue";
import MerchantId from "@/views/merchant/MerchantId.vue";

import Channel from "@/views/channel/Channel.vue";

import { switchPPC } from "@/api/login";
import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    component: Layout,
    beforeEnter: async (to: any, from: any, next: () => void) => {
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
        children: [
          { path: "", component: MerchantList, name: "MerchantList" },
          {
            path: ":merchantId",
            name: "MerchantId",
            component: MerchantId,
            props: (route) => ({
              merchantName: route.query.merchantName,
              merchantId: route.params.merchantId,
            }),
          },
        ],
      },
    ],
  },
];

export default routes;
