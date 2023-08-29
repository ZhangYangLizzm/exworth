<script setup>
import { reactive } from "vue";
import { useI18n } from "vue-i18n";
import { postReportLoss } from "@/api/card";

import ExModal from "@/libs/components/antd/modal/ExModal.vue";
import { useAppStore } from "@/libs/stores/modules/app";
import useFormRules from "@/hooks/useFormRules.js";
const { SecurityPasswordRule, GoogleAuthCodeRule } = useFormRules()
import { useAccountStore } from "@/stores/modules/accounts"
const accountStore = useAccountStore()
const appStore = useAppStore();

const props = defineProps({
  cardInfo: {
    type: Object,
    default: () => ({}),
  },
});
const { t } = useI18n();

const rules = reactive({
  password: SecurityPasswordRule,
  authCode: GoogleAuthCodeRule
});
const reportLossState = reactive({
  password: "",
  authCode: "",
});

const { resetFields, handleValidate, validateInfos, validate } = useForm(
  reportLossState,
  rules
);

const modalRef = ref();

const show = () => {
  modalRef?.value.show();
};
defineExpose({ show });

const handleCancel = () => {
  modalRef?.value.close();
};

const handleConfirm = async () => {
  try {
    await validate();
    await postReportLoss({ ...reportLossState, cardKey: props.cardInfo.cardKey });
    await accountStore.fetchWalletAccount()

    modalRef?.value.close();
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <ExModal :customTitle="$t('h0EQGD5w6L9xSdGkk4eG0')" ref="modalRef" :isMobile="appStore.isMobile">
    <div class="px-4">
      <a-form layout="vertical" :rules="rules">
        <a-form-item :label="t('kc9q5L7zBW4hpYFxJwx6H')">
          <a-input autocomplete="off" disabled :placeholder="props.cardInfo.maskCardNo" />
          <div class="text-gray-400 mt-2">
            <span>{{ t("xL0Xq46pD4xDZv4kET1pb") }}:</span>
            <span class="float-right">10 USDT</span>
          </div>
        </a-form-item>

        <a-form-item :label="$t('yj74dO9iA9rD0NRDm8h2n')" v-bind="validateInfos.password">
          <a-input-password :placeholder="$t('g-CkGyBqori4UAmxL4HS5')" v-model:value="reportLossState.password" />
        </a-form-item>
        <a-form-item :label="$t('SlJFgfv49xSHi9mbjdw4e')" v-bind="validateInfos.authCode">
          <a-input-password :placeholder="$t('0A89nPyaGbq5-v9reFOzw')" v-model:value="reportLossState.authCode" />
        </a-form-item>
      </a-form>
      <Tips :title="t('YW-jweHvcceM6FBkLk6c_')" :contents="t('o7dSnn9J8P8x9GAle8MVI')" />
    </div>

    <template #footer>
      <div class="px-4">
        <div class="flex justify-center py-4 border-t border-b-0 border-gray-200 border-solid border-x-0 gap-x-2">
          <a-button @click="handleCancel">
            {{ $t("cT1QFWPt_d3RzSaZhjCUO") }}
          </a-button>
          <a-button type="primary" @click="handleConfirm">
            {{ $t("utkQ-uv-4gXBHkFXvGL5u") }}
          </a-button>
        </div>
      </div>
    </template>
  </ExModal>
</template>
