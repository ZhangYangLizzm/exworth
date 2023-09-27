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
        children: [
          {
            path: "",
            name: "Wallet",
            component: Wallet,
          },
          {
            path: "details",
            name: "Details",
            component: () => import("@/views/wallet/Details.vue"),
          },
        ],
      },
      {
        path: "member",
        children: [
          {
            path: "",
            name: "Member",
            component: () => import("@/views/member/Member.vue"),
          },
          {
            path: ":uuid",
            name: "MemberCard",
            component: () => import("@/views/member/components/MemberCard.vue"),
          },
        ],
      },
      {
        path: "invitation",
        name: "Invitation",
        component: () => import("@/views/invitation/Invitation.vue"),
      },
      {
        path: "setting",
        name: "Setting",
        component: () => import("@/views/setting/Setting.vue"),
      },
      // {
      //   path: "card-manage",
      //   name: "CardManage",
      //   component: () => import("@/views/cardManage/CardManage.vue"),
      // },
    ],
  },
];

export default routes;
