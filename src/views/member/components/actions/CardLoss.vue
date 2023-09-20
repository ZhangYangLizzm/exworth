<script setup lang="ts">
import { postReportLoss } from "@/api/card";
import { useForm, useFormRules } from "@/hooks";
import { useAccountStore } from "@/stores/account";

const accountStore = useAccountStore();
const { SecurityPasswordRule, GoogleAuthCodeRule } = useFormRules();

const props = defineProps({
  cardInfo: {
    type: Object,
    default: () => ({}),
  },
});

const rules = reactive({
  password: SecurityPasswordRule,
  authCode: GoogleAuthCodeRule,
});
const reportLossState = reactive({
  password: "",
  authCode: "",
});

const { handleValidate, validateInfos } = useForm(reportLossState, rules);

const btnLoading = ref(false);
const handleConfirm = async () => {
  const { values } = await handleValidate();
  if (values) {
    btnLoading.value = true;
    await postReportLoss({
      ...reportLossState,
      cardKey: props.cardInfo.cardKey,
    });
    btnLoading.value = false;
    await accountStore.fetchWalletAccount();
  }
};
</script>

<template>
  <div class="px-4">
    <a-form layout="vertical" :rules="rules">
      <a-form-item :label="$t('kc9q5L7zBW4hpYFxJwx6H')">
        <a-input
          autocomplete="off"
          disabled
          :placeholder="props.cardInfo.maskCardNo"
        />
        <AmountLabel
          :title="$t('xL0Xq46pD4xDZv4kET1pb')"
          amount="10"
          currency="USDT"
        >
        </AmountLabel>
      </a-form-item>

      <a-form-item
        :label="$t('yj74dO9iA9rD0NRDm8h2n')"
        v-bind="validateInfos.password"
      >
        <a-input-password
          :placeholder="$t('g-CkGyBqori4UAmxL4HS5')"
          v-model:value="reportLossState.password"
        />
      </a-form-item>
      <a-form-item
        :label="$t('SlJFgfv49xSHi9mbjdw4e')"
        v-bind="validateInfos.authCode"
      >
        <a-input-password
          :placeholder="$t('0A89nPyaGbq5-v9reFOzw')"
          v-model:value="reportLossState.authCode"
        />
      </a-form-item>
    </a-form>

    <a-form-item>
      <Tips
        :title="$t('YW-jweHvcceM6FBkLk6c_')"
        :contents="$t('o7dSnn9J8P8x9GAle8MVI')"
      />
    </a-form-item>
    <a-form-item class="text-center">
      <a-button
        type="primary"
        @click="handleConfirm"
        :loading="btnLoading"
        class="w-40 h-8"
      >
        {{ $t("utkQ-uv-4gXBHkFXvGL5u") }}
      </a-button>
    </a-form-item>
  </div>
</template>
