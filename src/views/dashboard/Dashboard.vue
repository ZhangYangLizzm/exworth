<script setup>
import SvgIcon from '@/libs/components/svgIcon'
import ExModal from '@/libs/components/antd/modal/ExModal.vue'
import TopUp from '@/views/account/TopUp.vue'
import { useAccountStore } from '@/stores/modules/accounts.js'
import { useAppStore } from '@/stores/modules/app.js'
import { Format } from '@/libs/hooks/useUtil.js'

const appStore = useAppStore()
const accountStore = useAccountStore()
const router = useRouter()

const topupModalRef = ref()
const withdrawModalRef = ref()
const transferModalRef = ref()
</script>
<template>
  <div class="px-12">
    <h1 class="text-3xl">{{ $t('HIwApk1j8nh8NDfDaDSKL') }}</h1>
    <div class="flex overflow-x-auto gap-x-2">
      <div
        class="hover:bg-gray-200 cursor-pointer py-8 bg-gray-100 rounded-lg text-center min-w-[220px]"
        v-for="asset in accountStore.walletAccounts"
        :key="asset.currency"
        @click="router.push({ name: 'Coin', params: { coin: asset.currency } })"
      >
        <SvgIcon :name="`coin-${asset.currency}`" class="w-14 h-14" />
        <div class="">{{ asset.currency }}</div>
        <div class="mt-2 mb-1 text-xl font-bold">{{ Format(asset.balanceAmount) }}</div>
        <div class="text-xs text-gray-700">{{ $t('e8DgaMG0nnSK1cxzTVxp1') }}</div>
        <!-- <div class="flex justify-center gap-x-2">
          <a-button
            @click="topupModalRef.show()"
            type="link"
          >
            {{ $t('p85LUkdtTlZNxvwxEVGX8') }}
          </a-button>
          <a-button
            type="link"
          >
            {{ $t('mtzd-o04L2UDLaN81GSRl') }}
          </a-button>
          <a-button
            type="link"
          >
            {{ $t('_iMQNMQatEhTi4yWkEjxs') }}
          </a-button>
        </div> -->
      </div>
    </div>

    <ExModal
      ref="topupModalRef"
      isBottom
      :isMobile="appStore.isMobile"
      :customTitle="$t('p85LUkdtTlZNxvwxEVGX8')"
    >
      <TopUp class="p-5" />
    </ExModal>
  </div>
</template>