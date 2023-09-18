<script setup lang="ts">
import CurrencySelect from "@/components/Select/CurrencySelect.vue";
import { Format } from "@/utils/number";
import { getOtcRate, postCurrencyWithdraw } from "@/api/wallet";
import { useForm, useFormRules } from "@/hooks";
import { useAccountStore } from "@/stores/account";
const accountStore = useAccountStore();

const available = computed(() => walletInfo.balanceAmount);
const {
  CurrencyRule,
  NetworkRule,
  AmountRule,
  AddressRule,
  SecurityPasswordRule,
  GoogleAuthCodeRule,
} = useFormRules({ available });

const chainOptions = computed(() => ["TRC20", "ERC20"]);
const withdrawState = reactive({
  currency: "USDE",
  network: "TRC20",
  amount: 100,
  address: undefined,
  password: undefined,
  authCode: undefined,
});
const walletInfo = reactive({});
const fetchOtcRate = async () => {
  if (!withdrawState.amount) {
    return;
  }
  const res = await getOtcRate(withdrawState);
  Object.assign(walletInfo, res.content);
};

const rules = reactive({
  currency: CurrencyRule,
  amount: AmountRule,
  network: NetworkRule,
  address: AddressRule,
  password: SecurityPasswordRule,
  authCode: GoogleAuthCodeRule,
});

const { resetFields, handleValidate, validateInfos, validate } = useForm(
  withdrawState,
  rules
);
const confirmLoading = ref(false);
const emit = defineEmits("refresh");
const handleConfirm = async () => {
  const { values } = await handleValidate();
  if (values) {
    confirmLoading.value = true;
    const res = await postCurrencyWithdraw({
      ...withdrawState,
      type: "withdraw",
    });
    confirmLoading.value = false;
    if (res.statusCode === 200) {
      await accountStore.fetchWalletAccount();
      emit("refresh");
      resetFields();
    }
  }
};

const onCurrencyChange = async () => {
  if (!withdrawState.amount) {
    return;
  }
  const res = await getOtcRate(withdrawState);
  Object.assign(walletInfo, res.content);
};

onMounted(async () => {
  fetchOtcRate();
});
</script>

<template>
  <div class="px-4">
    <div class="flex justify-center">
      <a-form layout="vertical" :rules="rules" class="mt-2 w-full">
        <a-form-item
          :label="$t('uvkFcBBBuvd5CdyItcTYp')"
          required
          v-bind="validateInfos.currency"
        >
          <CurrencySelect
            :walletAccounts="accountStore.walletAccounts"
            v-model:currency="withdrawState.currency"
            @selectChange="onCurrencyChange"
          />
        </a-form-item>
        <a-form-item
          :label="$t('MSer02pUVq2JGDAxQxERb')"
          v-bind="validateInfos.network"
        >
          <a-radio-group v-model:value="withdrawState.network">
            <a-radio-button
              v-for="chain in chainOptions"
              :key="chain"
              :value="chain"
            >
              {{ chain }}
            </a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          class="flex flex-col gap-y-2"
          v-bind="validateInfos.amount"
          :label="$t('-Q-u4nDHLreIjo2-6Z4MW')"
        >
          <a-input
            autocomplete="off"
            v-model:value="withdrawState.amount"
            @change="fetchOtcRate"
          />
          <AmountLabel
            :title="$t('e8DgaMG0nnSK1cxzTVxp1')"
            :amount="Format(walletInfo.balanceAmount)"
            :currency="withdrawState.currency"
          />
          <AmountLabel
            :title="$t('Q_l0QsgefHPkwvxse3yaA')"
            :amount="Format(walletInfo.fee)"
            :currency="withdrawState.currency"
          />
          <AmountLabel
            :title="$t('AhZ8ItHb7nCGWMqoQNgDa')"
            :amount="Format(walletInfo.receiptAmount)"
            :currency="withdrawState.currency"
          />
        </a-form-item>
        <a-form-item
          :label="$t('vURu3r49iRvVFMlYEC5Gg')"
          v-bind="validateInfos.address"
        >
          <a-input
            autocomplete="off"
            v-model:value="withdrawState.address"
            :placeholder="$t('OGq2FiMO8fYn0FBusYtRz')"
          />
        </a-form-item>
        <a-form-item
          :label="$t('yj74dO9iA9rD0NRDm8h2n')"
          v-bind="validateInfos.password"
        >
          <a-input-password
            :placeholder="$t('g-CkGyBqori4UAmxL4HS5')"
            v-model:value="withdrawState.password"
          />
        </a-form-item>
        <a-form-item
          :label="$t('SlJFgfv49xSHi9mbjdw4e')"
          v-bind="validateInfos.authCode"
        >
          <a-input-password
            :placeholder="$t('0A89nPyaGbq5-v9reFOzw')"
            v-model:value="withdrawState.authCode"
          />
        </a-form-item>
        <a-form-item class="text-center">
          <a-button
            type="primary"
            class="w-40 h-8"
            @click="handleConfirm"
            :loading="confirmLoading"
            >{{ $t("utkQ-uv-4gXBHkFXvGL5u") }}</a-button
          >
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style scoped lang="less">
.check-icon {
  svg {
    path {
      fill: red;
    }
  }
}
</style>
