<script setup>
import { useAccountStore } from "@/stores/modules/accounts.js";
import { Format } from "@/libs/hooks/useUtil.js";
import CurrencySelect from "@/components/Select/CurrencySelect.vue";
import { postWithdrawTransfer } from "@/api/wallet";
import useFormRules from "@/hooks/useFormRules.js";

const { UUIDRule, CurrencyRule, getAmountRule, SecurityPasswordRule, GoogleAuthCodeRule } = useFormRules()
const { t } = useI18n();
const accountStore = useAccountStore();
const props = defineProps({
  initialCurrency: String,
});

const transferState = reactive({
  uuid: "",
  currency: props.initialCurrency || "USDE",
  amount: undefined,
  password: "",
  authCode: "",
});

const available = computed(
  () =>
    accountStore.availableBalance(transferState.currency)
);
const AmountRule = computed(() => getAmountRule(available.value))

const rules = reactive({
  uuid: UUIDRule,
  currency: CurrencyRule,
  amount: AmountRule,
  password: SecurityPasswordRule,
  authCode: GoogleAuthCodeRule,
});

const { resetFields, handleValidate, validateInfos, validate } = useForm(
  transferState,
  rules
);

const emits = defineEmits(["close"])
const handleTransfer = async () => {
  try {
    await validate();
    if (transferState.uuid.includes('@')) {
      transferState.email = transferState.uuid
      delete transferState.uuid
    }
    await postWithdrawTransfer({ ...transferState, type: "transfer" });
    await accountStore.fetchWalletAccount()
    emits("close")
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <div class="p-4">
    <a-form layout="vertical" :rules="rules">
      <a-form-item :label="$t('tOfYePGWd06TTHZ9HxG5V')" v-bind="validateInfos.uuid">
        <a-input autocomplete="off" v-model:value="transferState.uuid" :placeholder="t('_T9boCEgvfyd17ol1g2yp')" />
      </a-form-item>
      <a-form-item :label="$t('AMeo68ZI28aaFVqr0swF7')" v-bind="validateInfos.currency">
        <CurrencySelect v-model:value="transferState.currency" />
      </a-form-item>
      <a-form-item v-bind="validateInfos.amount">
        <template #label>
          <AmountLabel :title="$t('aT1xkA__dmUFiEHrDNAph')" :balanceAmount="Format(available)"
            :currency="transferState.currency" />
        </template>
        <a-input autocomplete="off" :placeholder="$t('tdOb7WZfAthhIqC2_HIAg')" v-model:value="transferState.amount" />
      </a-form-item>
      <a-form-item :label="$t('yj74dO9iA9rD0NRDm8h2n')" v-bind="validateInfos.password">
        <a-input-password :placeholder="$t('L8_JRGabLnJGC2tBI9Hqc')" v-model:value="transferState.password" />
      </a-form-item>
      <a-form-item :label="$t('SlJFgfv49xSHi9mbjdw4e')" v-bind="validateInfos.authCode">
        <a-input-password :placeholder="$t('RN0u-0ie4LuZ1u5aetix9')" v-model:value="transferState.authCode" />
      </a-form-item>
    </a-form>
  </div>
  <div class="px-4">
    <div class="flex justify-center py-4 border-t border-b-0 border-gray-200 border-solid border-x-0 gap-x-2">
      <a-button type="primary" @click="handleTransfer">
        {{ $t("utkQ-uv-4gXBHkFXvGL5u") }}
      </a-button>
    </div>
  </div>
</template>

<style scoped lang="less">
:deep(.ant-form-item-required) {
  width: 100%
}
</style>

