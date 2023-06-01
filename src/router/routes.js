import Login from '@/views/login/Login.vue'
import MainLayout from '@/layouts/MainLayout.vue'

import Dashboard from '@/views/dashboard/Dashboard.vue'
import Wallet from '@/views/account/Wallet.vue'
import CoinList from '@/views/account/CoinList.vue'
import Coin from '@/views/account/Coin.vue'
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
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'wallet',
        component: Wallet,
        // meta: { hideBottom: true },
        children: [
          {
            path: '',
            name: 'Wallet',
            component: CoinList
          },
          {
            path: ':coin',
            name: 'Coin',
            component: Coin,
            props: true,
            meta: { hideBottom: true }
          }
        ]
      },
      {
        path: 'my',
        name: 'Setting',
        component: Setting
      }
    ]
  },
  {
    path: '/test',
    component: () => import('@/views/test/Test.vue')
  }
]
export default routes