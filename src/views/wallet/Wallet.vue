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

const historyItems = computed(() => [
  { label: t("ovLktXuIHMUA7a1STIy3X"), routeName: "AccountDetails" },
  { label: t("sS7varQIq515z7YNPBvaA"), routeName: "RechargeHistory" },
  { label: t("GgpJxbBFrls3s9evmmpJ1"), routeName: "WithdrawHistory" },
  { label: t("jjnbgg59C6u1sYpfLLfTt"), routeName: "TransferHistory" },
]);
const route = useRoute();
const activeKey = computed(() => [...route.matched.map((i) => i.name)].at(-1));
</script>

<template>
  <div class="px-4" v-if="appStore.isMobile">
    <ComponentTitle :text="$t('VxYFMoZm9I6D7n_8ojjV4')">
      <template #extra>
        <span
          class="text-sm text-gray-400"
          @click="router.push({ name: 'MobileAccountDetails' })"
        >
          {{ $t("ovLktXuIHMUA7a1STIy3X") }}
          <right-outlined
        /></span>
      </template>
    </ComponentTitle>

    <MobileCurrency
      :loading="accountStore.loading"
      :walletAccounts="accountStore.walletAccounts"
      @click="onClick"
    />
  </div>

  <div class="px-4 pb-4" v-else>
    <div class="mb-4">
      <ComponentTitle :text="$t('VxYFMoZm9I6D7n_8ojjV4')" />
      <WebCurrency
        :loading="accountStore.loading"
        :walletAccounts="accountStore.walletAccounts"
        @click="onClick"
      />
      <template>
        <ExModal
          ref="topupModalRef"
          isBottom
          :isMobile="appStore.isMobile"
          :customTitle="$t('p85LUkdtTlZNxvwxEVGX8')"
          width="500px"
        >
          <TopUp class="p-4" :initialCurrency="targetCurrency" />
        </ExModal>
        <ExModal
          ref="withdrawModalRef"
          isBottom
          width="50%"
          :isMobile="appStore.isMobile"
          :customTitle="$t('mtzd-o04L2UDLaN81GSRl')"
        >
          <Withdraw
            class="p-4"
            :initialCurrency="targetCurrency"
            @close="withdrawModalRef.close()"
          />
        </ExModal>
        <ExModal
          ref="transferModalRef"
          isBottom
          :isMobile="appStore.isMobile"
          :customTitle="$t('pGrhTXj8A84ieJpHf6k3L')"
        >
          <Transfer
            class="p-4"
            :initialCurrency="targetCurrency"
            @close="transferModalRef.close()"
          />
        </ExModal>
      </template>
    </div>
    <div>
      <ComponentTitle :text="$t('DDp8hcF2Rq2MMzEK91YXW')" />
      <a-tabs
        v-model:activeKey="activeKey"
        @tabClick="(key) => router.push({ name: key })"
      >
        <a-tab-pane
          :key="item.routeName"
          :tab="item.label"
          v-for="item in historyItems"
        />
      </a-tabs>
    </div>

    <router-view v-slot="{ Component, route }">
      <component :is="Component" :key="route.path" />
    </router-view>
  </div>
</template>
