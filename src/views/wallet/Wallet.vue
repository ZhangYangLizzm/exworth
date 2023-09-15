<script setup lang="ts">
import {
  useDrawerInject,
  WALLET_TOPUP,
  WALLET_WITHDRAW,
  WALLET_TRANSFER,
} from "@/hooks/useDrawer.ts";
import { useAccountStore } from "@/stores/account.ts";
import WebCurrency from "./components/WebCurrency.vue";
import AccountDetails from "./components/AccountDetails.vue";
const { loading, walletAccounts } = storeToRefs(useAccountStore());

const { isDisabled, wrapClick } = useDrawerInject();
</script>

<template>
  <div class="h-1/4 max-h-[150px] relative">
    <ComponentTitle :title="$t('VxYFMoZm9I6D7n_8ojjV4')">
      <template #extra>
        <div class="flex gap-x-2">
          <a-button
            :disabled="isDisabled(WALLET_TOPUP)"
            type="primary"
            @click="wrapClick(WALLET_TOPUP)"
          >
            {{ $t("p85LUkdtTlZNxvwxEVGX8") }}
          </a-button>
          <a-button
            type="primary"
            :disabled="isDisabled(WALLET_WITHDRAW)"
            @click="wrapClick(WALLET_WITHDRAW)"
          >
            {{ $t("mtzd-o04L2UDLaN81GSRl") }}
          </a-button>
          <a-button
            type="primary"
            :disabled="isDisabled(WALLET_TRANSFER)"
            @click="wrapClick(WALLET_TRANSFER)"
          >
            {{ $t("_iMQNMQatEhTi4yWkEjxs") }}
          </a-button>
        </div>
      </template>
    </ComponentTitle>
    <WebCurrency :loading="loading" :walletAccounts="walletAccounts" />
  </div>

  <div class="overflow-hidden flex-grow mt-4">
    <ComponentTitle :title="$t('ovLktXuIHMUA7a1STIy3X')">
      <template #extra>
        <div
          class="!bg-slate-100 text-slate-500 hover:text-black px-4 rounded text-base"
        >
          Filter <FilterOutlined />
        </div>
      </template>
    </ComponentTitle>
    <AccountDetails />
  </div>
</template>
