<script setup lang="ts">
import { WalletBalanceProperty } from "@/api/types/account";
import SvgIcon from "@/components/SvgIcon.vue";
import { Format } from "@/utils/formatUtil";

defineProps<{
  loading: boolean;
  walletAccounts: WalletBalanceProperty[];
}>();
</script>

<template>
  <div class="flex min-h-[4rem]">
    <a-spin :spinning="loading" class="translate-x-8">
      <div
        class="flex overflow-x-auto overflow-y-hidden rounded-xl wallet-container"
      >
        <div
          class="flex wallet-account tracking-wider px-4 min-w-[200px]"
          v-for="asset in walletAccounts"
          :key="asset.currency"
        >
          <SvgIcon :name="`coin-${asset.currency}`" class="w-12 h-12 mr-4" />
          <div class="font-medium text-base">
            <div>{{ asset.currency }}</div>
            <div>
              {{ Format(asset.balanceAmount) }}
            </div>
          </div>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<style scoped lang="less">
.wallet-container {
  .wallet-account:not(:last-child) {
    border-right: 2px solid var(--divider-gray);
  }
}
</style>
