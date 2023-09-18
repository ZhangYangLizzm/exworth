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
import FilterForm from "./components/FilterForm.vue";
import { getBalanceHistory } from "@/api/wallet";
import { useList } from "@/hooks";
import { TopUp, WalletTransfer,Withdraw } from "./components/modal";

const { loading, walletAccounts } = storeToRefs(useAccountStore());

const { wrapClick, drawerPattern } = useDrawerInject();

const filterOptions = reactive({
  createTime: undefined,
  type: undefined,
  currency: undefined,
  affectOrderNo: undefined,
});

const {
  fetch,
  list: dataSource,
  loading: detailLoading,
  fetchMore,
  refresh,
} = useList(getBalanceHistory, filterOptions, { mode: "list", pageSize: 16 });
</script>

<template>
  <div class="h-1/4 max-h-[150px] relative">
    <ComponentTitle :title="$t('VxYFMoZm9I6D7n_8ojjV4')">
      <template #extra>
        <div class="flex gap-x-2">
          <a-button
            :disabled="drawerPattern === WALLET_TOPUP"
            type="primary"
            @click="wrapClick(WALLET_TOPUP)"
          >
            {{ $t("p85LUkdtTlZNxvwxEVGX8") }}
          </a-button>
          <a-button
            type="primary"
            :disabled="drawerPattern === WALLET_WITHDRAW"
            @click="wrapClick(WALLET_WITHDRAW)"
          >
            {{ $t("mtzd-o04L2UDLaN81GSRl") }}
          </a-button>
          <a-button
            type="primary"
            :disabled="drawerPattern === WALLET_TRANSFER"
            @click="wrapClick(WALLET_TRANSFER)"
          >
            {{ $t("_iMQNMQatEhTi4yWkEjxs") }}
          </a-button>
        </div>
      </template>
    </ComponentTitle>
    <WebCurrency :loading="loading" :walletAccounts="walletAccounts" />
  </div>

  <div class="flex overflow-hidden mt-4 gap-x-2">
    <div class="flex-grow flex overflow-y-hidden flex-col">
      <ComponentTitle :title="$t('ovLktXuIHMUA7a1STIy3X')"> </ComponentTitle>
      <AccountDetails
        :loading="detailLoading"
        :dataSource="dataSource"
        @fetchMore="fetchMore"
      />
    </div>
    <div class="basis-1/3 overflow-hidden flex flex-col">
      <ComponentTitle title="Fetch Filter"> </ComponentTitle>
      <FilterForm
        :loading="loading"
        v-model:options="filterOptions"
        @fetch="fetch({ noAppend: true })"
      />
    </div>
  </div>

  <ExDrawer>
    <TopUp v-if="drawerPattern === WALLET_TOPUP" />
    <WalletTransfer
      v-if="drawerPattern === WALLET_TRANSFER"
      @refresh="refresh"
    />
    <Withdraw v-if="drawerPattern === WALLET_WITHDRAW" @refresh="refresh" />
  </ExDrawer>
</template>
