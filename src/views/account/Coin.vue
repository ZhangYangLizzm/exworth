<script setup>
import SvgIcon from '@/libs/components/svgIcon/SvgIcon.vue';
import { useAccountStore } from '@/stores/modules/accounts.js'
import { Format } from '@/libs/hooks/useUtil.js'

const props = defineProps({
  coin: String,
})

const accountStore = useAccountStore()
const available = computed(() => accountStore.walletAccounts.find(i => i.currency === props.coin)?.balanceAmount || 0)
</script>
<template>
  <div class="">
    <div class="bg-gray-100 rounded-b-xl pt-16 pb-6 px-12">
      <div class="flex items-start gap-x-2">
        <SvgIcon class="w-12 h-12" :name="`coin-${coin}`" />
        <span class="font-bold text-xl">{{ coin }}</span>
      </div>
      <div class="">{{ Format(available) }}</div>
    </div>
  </div>
</template>