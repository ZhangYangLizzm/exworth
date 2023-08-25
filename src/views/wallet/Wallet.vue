<script setup>
import ExModal from "@/libs/components/antd/modal/ExModal.vue";
import { TopUp, Transfer, Withdraw } from "./Modal";
import { useAccountStore } from "@/stores/modules/accounts.js";
import { useAppStore } from "@/stores/modules/app.js";
import WebCurrency from "./web/WebCurrency.vue";
import MobileCurrency from "./mobile/MobileCurrency.vue";
import { useRouter } from "vue-router";
const appStore = useAppStore();
const accountStore = useAccountStore();
const { t } = useI18n();
const router = useRouter();
const targetCurrency = ref();

const topupModalRef = ref();
const transferModalRef = ref();
const withdrawModalRef = ref();
const modalRefs = {
  topup: topupModalRef,
  transfer: transferModalRef,
  withdraw: withdrawModalRef,
};

const onClick = ({ currency, type }) => {
  targetCurrency.value = currency;
  const modalRef = modalRefs[type];
  modalRef?.value.show();
};

const historyItems = reactive([
  { label: "動帳明細", routeName: "AccountDetails" },
  { label: "充值記錄", routeName: "RechargeHistory" },
  { label: "提現記錄", routeName: "WithdrawHistory" },
  { label: "轉帳記錄", routeName: "TransferHistory" },
]);

</script>

<template>
  <div class="px-4" v-if="appStore.isMobile">
    <ComponentTitle :text="t('VxYFMoZm9I6D7n_8ojjV4')">
      <template #extra>
        <span class="text-sm text-gray-400" @click="router.push({ name: 'MobileAccountDetails' })">
          账单明细
          <right-outlined /></span>
      </template>
    </ComponentTitle>

    <MobileCurrency :loading="accountStore.loading" :walletAccounts="accountStore.walletAccounts" @click="onClick" />
  </div>

  <div class="px-4 pb-4" v-else>
    <div class="flex">
      <div class="flex-grow">
        <ComponentTitle :text="t('VxYFMoZm9I6D7n_8ojjV4')" />

        <WebCurrency :loading="accountStore.loading" :walletAccounts="accountStore.walletAccounts" @click="onClick" />
      </div>
      <div class="basis-1/6">
        <ComponentTitle text="更多記錄" />
        <div class="flex flex-col gap-y-2">
          <div v-for="item in historyItems"
            class="py-2 px-4 cursor-pointer bg-slate-100 rounded hover:shadow flex hover:text-primary"
            @click="router.push({ name: item.routeName })" :key="item.routeName">
            <span class="flex-grow">{{ item.label }}</span>
            <span> <arrow-right-outlined /></span>
          </div>
        </div>
      </div>
    </div>

    <ExModal ref="topupModalRef" isBottom :isMobile="appStore.isMobile" :customTitle="$t('p85LUkdtTlZNxvwxEVGX8')"
      width="500px">
      <TopUp class="p-4" :initialCurrency="targetCurrency" />
    </ExModal>
    <ExModal ref="withdrawModalRef" isBottom width="50%" :isMobile="appStore.isMobile"
      :customTitle="t('mtzd-o04L2UDLaN81GSRl')">
      <Withdraw class="p-4" :initialCurrency="targetCurrency" />
    </ExModal>
    <ExModal ref="transferModalRef" isBottom :isMobile="appStore.isMobile" :customTitle="t('pGrhTXj8A84ieJpHf6k3L')">
      <Transfer class="p-4" :initialCurrency="targetCurrency" />
    </ExModal>
    <router-view v-slot="{ Component, route }">
      <component :is="Component" :key="route.path" />
    </router-view>
  </div>
</template>
