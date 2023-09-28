<script setup lang="ts">
import {
  useDrawerInject,
  WALLET_TOPUP,
  WALLET_WITHDRAW,
  WALLET_TRANSFER,
} from "@/hooks/useDrawer.ts";
import { useAccountStore } from "@/stores/account.ts";
import {
  WebCurrency,
  AccountDetails,
  FilterForm,
  MobileCurrency,
} from "./components";
import { getBalanceHistory } from "@/api/wallet";
import { useList } from "@/hooks";
import { TopUp, WalletTransfer, Withdraw } from "./components/actions";
import { useAppStore } from "@/stores/app";

const appStore = useAppStore();
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
} = useList(getBalanceHistory, filterOptions, { mode: "list", pageSize: 8 });
</script>

<template>
  <div class="relative bg-white p-4 rounded-xl">
    <ComponentTitle :title="$t('VxYFMoZm9I6D7n_8ojjV4')">
      <template #extra>
        <div class="flex gap-x-2" v-if="appStore.isMobile">
          <ADropdown>
            <AButton type="primary">Actions <DownOutlined /></AButton>
            <template #overlay>
              <AMenu>
                <AMenuItem>
                  <AButton
                    type="text"
                    :disabled="drawerPattern === WALLET_TOPUP"
                    @click="wrapClick(WALLET_TOPUP)"
                  >
                    {{ $t("p85LUkdtTlZNxvwxEVGX8") }}
                  </AButton>
                </AMenuItem>
                <AMenuItem>
                  <AButton
                    type="text"
                    :disabled="drawerPattern === WALLET_WITHDRAW"
                    @click="wrapClick(WALLET_WITHDRAW)"
                  >
                    {{ $t("mtzd-o04L2UDLaN81GSRl") }}
                  </AButton>
                </AMenuItem>
                <AMenuItem>
                  <AButton
                    type="text"
                    :disabled="drawerPattern === WALLET_TRANSFER"
                    @click="wrapClick(WALLET_TRANSFER)"
                  >
                    {{ $t("_iMQNMQatEhTi4yWkEjxs") }}
                  </AButton>
                </AMenuItem>
              </AMenu>
            </template>
          </ADropdown>
          <AButton type="primary" @click="$router.push({ name: 'Details' })">
            {{ $t("ovLktXuIHMUA7a1STIy3X") }}
          </AButton>
        </div>
        <div class="flex gap-x-2" v-if="!appStore.isMobile">
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
    <WebCurrency
      v-if="!appStore.isMobile"
      :loading="loading"
      :walletAccounts="walletAccounts"
      class="py-2"
    />
    <MobileCurrency
      v-if="appStore.isMobile"
      :loading="loading"
      :walletAccounts="walletAccounts"
    />
  </div>

  <div
    class="flex overflow-hidden mt-4 gap-x-2 flex-grow"
    v-if="!appStore.isMobile"
  >
    <div
      class="flex-grow flex overflow-y-hidden flex-col bg-white p-4 rounded-xl"
    >
      <ComponentTitle :title="$t('ovLktXuIHMUA7a1STIy3X')"> </ComponentTitle>
      <AccountDetails
        :loading="detailLoading"
        :dataSource="dataSource"
        @fetchMore="fetchMore"
      />
    </div>

    <div
      class="basis-1/3 overflow-hidden flex flex-col bg-white p-4 rounded-xl"
    >
      <ComponentTitle :title="$t('WfWtL5wXzB2jAE8bKp-hF')" class="mb-4">
      </ComponentTitle>
      <FilterForm
        :loading="detailLoading"
        v-model:options="filterOptions"
        @fetch="fetch({ noAppend: true })"
      />
    </div>
  </div>

  <ExDrawer
    :open="drawerPattern === WALLET_TOPUP"
    :title="$t('p85LUkdtTlZNxvwxEVGX8')"
  >
    <TopUp />
  </ExDrawer>
  <ExDrawer
    :open="drawerPattern === WALLET_TRANSFER"
    :title="$t('mtzd-o04L2UDLaN81GSRl')"
  >
    <WalletTransfer @refresh="refresh" />
  </ExDrawer>
  <ExDrawer
    :open="drawerPattern === WALLET_WITHDRAW"
    :title="$t('_iMQNMQatEhTi4yWkEjxs')"
  >
    <Withdraw @refresh="refresh" />
  </ExDrawer>
</template>
