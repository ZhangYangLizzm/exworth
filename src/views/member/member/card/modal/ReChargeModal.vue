<script setup>
import { postRecharge } from "@/api/card";
import ExModal from "@/libs/components/antd/modal/ExModal.vue";
import CurrencySelect from "@/components/Select/CurrencySelect.vue";
import { useAccountStore } from "@/stores/modules/accounts.js";
import { Format } from "@/libs/hooks/useUtil.js";
import { useAppStore } from "@/libs/stores/modules/app";
import useFormRules from "@/hooks/useFormRules.js";
import Big from "big.js";
const appStore = useAppStore();

const accountStore = useAccountStore();

const props = defineProps({
  cardInfo: {
    type: Object,
    default: () => ({}),
  },
});
const { getAmountRule, SecurityPasswordRule, GoogleAuthCodeRule } =
  useFormRules();
const rechargeState = reactive({
  currency: "USDE",
  amount: 0,
  password: "",
  authCode: "",
});
const available = computed(() =>
  accountStore.availableBalance(rechargeState.currency)
);
const AmountRule = computed(() => getAmountRule(available.value));

const rules = reactive({
  amount: AmountRule,
  password: SecurityPasswordRule,
  authCode: GoogleAuthCodeRule,
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

const btnLoading = ref(false);
const handleConfirm = async () => {
  const { values } = await handleValidate();
  if (values) {
    btnLoading.value = true;
    await postRecharge({ ...rechargeState, cardKey: props.cardInfo.cardKey });
    await accountStore.fetchWalletAccount();
    btnLoading.value = false;
    modalRef?.value.close();
  }
};

const fee = computed(() => {
  if (rechargeState.currency === "USDE") {
    return new Big(0).toFixed(2);
  }
  const amount = new Big(rechargeState.amount || 0);
  const topUpRate = new Big(props.cardInfo.topUpRate);
  return amount.times(topUpRate).toFixed(2); // 控制保留两位小数
});

const actualAmount = computed(() => {
  const amout = new Big(rechargeState.amount || 0);
  return amout.minus(fee.value).toFixed(2);
});
</script>

<template>
  <ExModal
    :customTitle="$t('Y8Q4sAZg7x3OGpUJ7N-Wr')"
    ref="modalRef"
    :isMobile="appStore.isMobile"
  >
    <div class="px-4">
      <a-form layout="vertical" :rules="rules">
        <a-form-item :label="$t('kc9q5L7zBW4hpYFxJwx6H')">
          <a-input
            autocomplete="off"
            disabled
            :placeholder="props.cardInfo.maskCardNo"
            :autoComplete="off"
          >
          </a-input>
        </a-form-item>
        <a-form-item
          :label="$t('evuxmuH6llDaxntrGcczN')"
          v-bind="validateInfos.currency"
        >
          <CurrencySelect
            :walletAccounts="accountStore.walletAccounts"
            v-model:currency="rechargeState.currency"
          />
        </a-form-item>
        <a-form-item
          v-bind="validateInfos.amount"
          :label="$t('NI3dffhiC9cI6NmBo_UBh')"
        >
          <a-input
            autocomplete="off"
            :placeholder="$t('_aLRJTwT0z5fy-yMREIle')"
            v-model:value="rechargeState.amount"
          />
          <AmountLabel
            :title="$t('e8DgaMG0nnSK1cxzTVxp1')"
            :amount="Format(available)"
            :currency="rechargeState.currency"
          />
          <AmountLabel
            :title="$t('Q_l0QsgefHPkwvxse3yaA')"
            :amount="Format(fee)"
            :currency="rechargeState.currency"
          />
          <AmountLabel
            :title="$t('AhZ8ItHb7nCGWMqoQNgDa')"
            :amount="Format(actualAmount)"
            :currency="rechargeState.currency"
          />
        </a-form-item>
        <a-form-item
          :label="$t('yj74dO9iA9rD0NRDm8h2n')"
          v-bind="validateInfos.password"
        >
          <a-input-password
            :placeholder="$t('g-CkGyBqori4UAmxL4HS5')"
            v-model:value="rechargeState.password"
          />
        </a-form-item>
        <a-form-item
          :label="$t('SlJFgfv49xSHi9mbjdw4e')"
          v-bind="validateInfos.authCode"
        >
          <a-input-password
            :placeholder="$t('0A89nPyaGbq5-v9reFOzw')"
            v-model:value="rechargeState.authCode"
          />
        </a-form-item>
      </a-form>
    </div>
    <template #footer>
      <div class="px-4">
        <div
          class="flex justify-center py-4 border-t border-b-0 border-gray-200 border-solid border-x-0 gap-x-2"
        >
          <a-button @click="handleCancel">
            {{ $t("cT1QFWPt_d3RzSaZhjCUO") }}
          </a-button>
          <a-button type="primary" @click="handleConfirm" :loading="btnLoading">
            {{ $t("utkQ-uv-4gXBHkFXvGL5u") }}
          </a-button>
        </div>
      </div>
    </template>
  </ExModal>
</template>
