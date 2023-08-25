<script setup>
import { reactive } from "vue";
import { useI18n } from "vue-i18n";
import { postRecharge } from "@/api/card";
import ExModal from "@/libs/components/antd/modal/ExModal.vue";
import CurrencySelect from "@/components/Select/CurrencySelect.vue";
import { useAccountStore } from "@/stores/modules/accounts.js";
import { Format } from "@/libs/hooks/useUtil.js";
import { useAppStore } from "@/libs/stores/modules/app";
import useFormRules from "@/hooks/useFormRules.js";
const appStore = useAppStore();

const accountStore = useAccountStore();

const props = defineProps({
  cardInfo: {
    type: Object,
    default: () => ({}),
  },
});
const { t } = useI18n();
const { getAmountRule, SecurityPasswordRule, GoogleAuthCodeRule } = useFormRules()
const rechargeState = reactive({
  currency: "USDE",
  amount: undefined,
  password: "",
  authCode: "",
});
const available = computed(
  () =>
    accountStore.availableBalance(rechargeState.currency)
);
const AmountRule = computed(() => getAmountRule(available.value))

const rules = reactive({
  amount: AmountRule,
  password: SecurityPasswordRule,
  authCode: GoogleAuthCodeRule
});



const { resetFields, handleValidate, validateInfos, validate } = useForm(
  rechargeState,
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
    await postRecharge({ ...rechargeState, cardKey: props.cardInfo.cardKey });
    modalRef?.value.close();
  } catch (e) {
    console.log(e);
  }
};

const fee = computed(
  () => rechargeState.amount * props.cardInfo.topUpRate || 0
);
</script>

<template>
  <ExModal :customTitle="$t('Y8Q4sAZg7x3OGpUJ7N-Wr')" ref="modalRef" :isMobile="appStore.isMobile">
    <div class="px-4">
      <a-form layout="vertical" :rules="rules">
        <a-form-item :label="$t('kc9q5L7zBW4hpYFxJwx6H')">
          <a-input disabled :placeholder="props.cardInfo.maskCardNo" :autoComplete="off"> </a-input>
        </a-form-item>
        <a-form-item :label="$t('AMeo68ZI28aaFVqr0swF7')" v-bind="validateInfos.currency">
          <CurrencySelect v-model:currency="rechargeState.currency" />
        </a-form-item>
        <a-form-item v-bind="validateInfos.amount">
          <template #label>
            <AmountLabel :title="$t('NI3dffhiC9cI6NmBo_UBh')" :balanceAmount="Format(available)"
              :currency="rechargeState.currency" />
          </template>
          <a-input :placeholder="$t('_aLRJTwT0z5fy-yMREIle')" v-model:value="rechargeState.amount" />

          <div class="text-gray-400">
            <span>{{ t("Q_l0QsgefHPkwvxse3yaA") }}:</span>
            <span class="float-right">{{
              fee + " " + rechargeState.currency
            }}</span>
          </div>
          <div class="text-gray-400">
            <span>{{ t("AhZ8ItHb7nCGWMqoQNgDa") }}:</span>
            <span class="float-right">{{
              rechargeState.amount - fee || 0 + " " + rechargeState.currency
            }}</span>
          </div>
        </a-form-item>
        <a-form-item :label="$t('yj74dO9iA9rD0NRDm8h2n')" v-bind="validateInfos.password">
          <a-input-password :placeholder="$t('g-CkGyBqori4UAmxL4HS5')" v-model:value="rechargeState.password" />
        </a-form-item>
        <a-form-item :label="$t('SlJFgfv49xSHi9mbjdw4e')" v-bind="validateInfos.authCode">
          <a-input-password :placeholder="$t('0A89nPyaGbq5-v9reFOzw')" v-model:value="rechargeState.authCode" />
        </a-form-item>
      </a-form>
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

<style scoped lang="less">
:deep(.ant-form-item-required) {
  width: 100%
}
</style>
