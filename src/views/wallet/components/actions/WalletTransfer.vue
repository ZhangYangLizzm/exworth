<script setup lang="ts">
import { useAccountStore } from "@/stores/account";
import { Format } from "@/utils/formatUtil";
import { postWithdrawTransfer } from "@/api/wallet";
import { useForm, useFormRules } from "@/hooks";
import { RuleObject } from "ant-design-vue/es/form";

const transferState = reactive({
  uuid: "",
  currency: "USDE",
  amount: "",
  password: "",
  authCode: "",
});

const accountStore = useAccountStore();
const available = computed(() =>
  accountStore.availableBalance(transferState.currency)
);

const {
  UUIDRule,
  CurrencyRule,
  AmountRule,
  SecurityPasswordRule,
  GoogleAuthCodeRule,
} = useFormRules({ available });

const rules: Record<string, RuleObject[]> = reactive({
  uuid: UUIDRule,
  currency: CurrencyRule,
  amount: AmountRule,
  password: SecurityPasswordRule,
  authCode: GoogleAuthCodeRule,
});

const { resetFields, handleValidate, validateInfos } = useForm(
  transferState,
  rules
);
const emit = defineEmits(["refresh"]);

const btnLoading = ref(false);
const handleTransfer = async () => {
  const { values } = await handleValidate();
  if (values) {
    btnLoading.value = true;
    let tempState = {};
    if (transferState.uuid.includes("@")) {
      tempState = {
        ...transferState,
        uuid: undefined,
        email: transferState.uuid,
      };
    }
    tempState={...transferState}
    const { statusCode } = await postWithdrawTransfer({
      ...tempState,
      type: "transfer",
    });
    btnLoading.value = false;
    if (statusCode == 200) {
      resetFields();
      await accountStore.fetchWalletAccount();
      emit("refresh");
    }
  }
};
</script>

<template>
  <div class="px-4">
    <a-form layout="vertical" :rules="rules">
      <a-form-item
        :label="$t('tOfYePGWd06TTHZ9HxG5V')"
        v-bind="validateInfos.uuid"
      >
        <a-input
          autocomplete="off"
          v-model:value="transferState.uuid"
          :placeholder="$t('_T9boCEgvfyd17ol1g2yp')"
        />
      </a-form-item>
      <a-form-item
        :label="$t('AMeo68ZI28aaFVqr0swF7')"
        v-bind="validateInfos.currency"
      >
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
          :placeholder="$t('tdOb7WZfAthhIqC2_HIAg')"
          v-model:value="transferState.amount"
        />
        <AmountLabel
          :title="$t('e8DgaMG0nnSK1cxzTVxp1')"
          :amount="Format(available)"
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
          :loading="btnLoading"
          class="w-40 h-8"
        >
          {{ $t("utkQ-uv-4gXBHkFXvGL5u") }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
