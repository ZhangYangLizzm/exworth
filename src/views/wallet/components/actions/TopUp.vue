<script setup lang="ts">
import { useAccountStore } from "@/stores/account";
import {  loadWalletAddress } from "@/api/account";
import { WalletAddressReqParams, WalletAddressRes } from "@/api/types/account";

const accountStore = useAccountStore();
const chainOptions = computed(() => ["TRC20", "ERC20"]);
const formState:WalletAddressReqParams = reactive({
  currency: "USDE",
  chain: "TRC20",
});

let walletAddress: WalletAddressRes = reactive({
  address: "",
  codeImgUrl: "",
});

const loading = ref(false);

const fetchAddress = async () => {
  if (!loading.value) {
    loading.value = true;
    const { statusCode, content } = await loadWalletAddress(formState);
    if (statusCode === 200) {
      loading.value = false;
      Object.assign(walletAddress, content);
    }
  }
};

const { t } = useI18n();

const depositTipsContent = computed(() => [
  t("bccqYtXK6oqkAxhQPSlKt"),
  t("U7P1XxNW_ub2B9iCV1uzz"),
  t("cq-SHcVuf2g6cPSxUEdXY"),
  t("MVtFjbEHcG7-UNyutz-34", { currency: formState.currency }),
]);

onMounted(() => {
  fetchAddress();
});
</script>

<template>
  <a-form layout="vertical">
    <a-form-item :label="$t('evuxmuH6llDaxntrGcczN')">
      <CurrencySelect
        :walletAccounts="accountStore.walletAccounts"
        v-model:currency="formState.currency"
        @selectChange="fetchAddress"
      />
    </a-form-item>

    <a-form-item :label="$t('6cwCXkwYyh-ubcR0nZWea')">
      <a-radio-group v-model:value="formState.chain" @change="fetchAddress">
        <a-radio-button
          v-for="chain in chainOptions"
          :key="chain"
          :value="chain"
        >
          {{ chain }}
        </a-radio-button>
      </a-radio-group>
    </a-form-item>

    <a-spin :spinning="loading">
      <div class="mx-auto my-5 text-center">
        <img
          :src="walletAddress.codeImgUrl"
          :alt="walletAddress.address"
          class="w-[200px] h-[200px]"
        />
        <p>
          {{ walletAddress.address }}
          <Copy :text="walletAddress.address" />
        </p>
      </div>
    </a-spin>
    <Tips :title="$t('l75199YEqw9hJchJu1YXo')" :contents="depositTipsContent" />
  </a-form>
</template>
