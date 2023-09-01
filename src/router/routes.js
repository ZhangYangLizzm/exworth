import Login from '@/views/login/Login.vue'
// import Reset from '@/views/login/Reset.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import BlankLayout from '@/layouts/BlankLayout.vue'

import Wallet from '@/views/wallet/Wallet.vue'
import AccountDetails from '@/views/wallet/history/AccountDetails.vue'
import MobileAccountDetails from "@/views/wallet/mobile/AccountDetails.vue"

// import MemberLayout from '@/views/member/MemberLayout.vue'
import MemberList from "@/views/member/member/MemberList.vue";
// import Profile from '@/views/member/member/Profile.vue'
// import Invitation from '@/views/member/invitation/Invitation.vue'

import CardManagement from "@/views/card/CardManagement.vue"

import Setting from '@/views/setting/Setting.vue'

/**
 * @meta
 * hideSider: 隱藏左側導航
 * hideBottom: 隱藏底部導航
 */
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    redirect: "/wallet",
    component: MainLayout,
    children: [
      {
        path: 'wallet',
        name: 'Wallet',
        component: Wallet,
        children: [
          {
            path: '',
            name: 'AccountDetails',
            component: AccountDetails,
          },
          {
            path: 'recharge-history',
            name: 'RechargeHistory',
            component: () => import("@/views/wallet/history/RechargeHistory.vue"),
          },
          {
            path: 'transfer-history',
            name: 'TransferHistory',
            component: () => import("@/views/wallet/history/TransferHistory.vue"),
          }, {
            path: 'withdraw-history',
            name: 'WithdrawHistory',
            component: () => import("@/views/wallet/history/WithdrawHistory.vue"),
          }
        ],

      },
      { path: 'mobile-account-details', component: MobileAccountDetails, name: 'MobileAccountDetails' },

      {
        path: 'member',
        // components: { default: BlankLayout, 'header-extra': MemberLayout },
        component: BlankLayout,
        name: "Member",
        meta: {
          "headerExtra": true
        },
        children: [
          {
            path: 'member-list',
            component: MemberList,
            name: 'MemberList',
          },
          // {
          //   path: 'invitation',
          //   name: "Invitation",
          //   component: Invitation
          // },
          {
            path: ':uuid',
            component: () => import("@/views/member/member/Profile.vue"),
            name: 'MemberProfile'
          },
        ]
      },
      {
        path: 'my',
        name: 'Setting',
        component: Setting,
      },
      {
        path: "card",
        name: "Card",
        component: CardManagement,
      }
    ]
  },

]
export default routes