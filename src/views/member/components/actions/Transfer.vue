<script setup lang="ts">
import { useFormRules, useForm } from "@/hooks";
import { postMemberTransfer } from "@/api/wallet";
import { useAccountStore } from "@/stores";
import { Format } from "@/utils/formatUtil";

const accountStore = useAccountStore();

const transferState = reactive({
  uuid: "",
  currency: "USDE",
  amount: undefined,
  password: "",
  authCode: "",
});

const available = computed(() =>
  accountStore.availableBalance(transferState.currency)
);

const { CurrencyRule, AmountRule, SecurityPasswordRule, GoogleAuthCodeRule } =
  useFormRules({ available });

const rules = reactive({
  currency: CurrencyRule,
  amount: AmountRule,
  password: SecurityPasswordRule,
  authCode: GoogleAuthCodeRule,
});

const { resetFields, validateInfos, handleValidate } = useForm(
  transferState,
  rules
);

const transferConfirmLoading = ref(false);

const handleTransfer = async () => {
  const { values } = await handleValidate();
  if (values) {
    transferConfirmLoading.value = true;
    await postMemberTransfer({ ...transferState });
    await accountStore.fetchWalletAccount();
    transferConfirmLoading.value = false;
    resetFields();
  }
};
</script>

<template>
  <div class="p-4">
    <a-form layout="vertical" :rules="rules">
      <a-form-item :label="$t('tOfYePGWd06TTHZ9HxG5V')" required>
        <a-input
          autocomplete="off"
          :placeholder="$t('Ig7Obh5SnlDU1vzDmOUOV')"
          v-model:value="transferState.uuid"
        />
      </a-form-item>
      <a-form-item :label="$t('AMeo68ZI28aaFVqr0swF7')" required>
        <CurrencySelect
          :walletAccounts="accountStore.walletAccounts"
          v-model:currency="transferState.currency"
        />
      </a-form-item>
      <a-form-item
        v-bind="validateInfos.amount"
        :label="$t('aT1xkA__dmUFiEHrDNAph')"
      >
        <a-input
          autocomplete="off"
          :placeholder="$t('sMkxYlIlj4SgxGAKFOjgJ')"
          v-model:value="transferState.amount"
        />
        <AmountLabel
          :title="$t('e8DgaMG0nnSK1cxzTVxp1')"
          :amount="Format(+available)"
          :currency="transferState.currency"
        />
      </a-form-item>
      <a-form-item
        :label="$t('yj74dO9iA9rD0NRDm8h2n')"
        v-bind="validateInfos.password"
      >
        <a-input-password
          :placeholder="$t('L8_JRGabLnJGC2tBI9Hqc')"
          v-model:value="transferState.password"
        />
      </a-form-item>
      <a-form-item
        :label="$t('SlJFgfv49xSHi9mbjdw4e')"
        v-bind="validateInfos.authCode"
      >
        <a-input-password
          :placeholder="$t('RN0u-0ie4LuZ1u5aetix9')"
          v-model:value="transferState.authCode"
        />
      </a-form-item>
      <a-form-item class="text-center">
        <a-button
          type="primary"
          @click="handleTransfer"
          :loading="transferConfirmLoading"
          class="w-40 h-8"
        >
          {{ $t("utkQ-uv-4gXBHkFXvGL5u") }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
