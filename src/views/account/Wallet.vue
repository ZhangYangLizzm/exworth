<script setup>
import SvgIcon from '@/libs/components/svgIcon'
import { useAccountStore } from '@/stores/modules/accounts.js'

const accountStore = useAccountStore()
</script>
<template>
  <div class="px-12">
    <div
      class="flex items-center gap-x-2 mb-2"
      v-for="asset in accountStore.walletAccounts"
      :key="asset.currency"
    >
      <SvgIcon class="w-8 h-8" :name="`coin-${asset.currency}`" />
      <span>{{ asset.currency }}</span>
    </div>
  </div>
</template>