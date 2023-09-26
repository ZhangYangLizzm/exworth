<script setup lang="ts">
import { postRecharge, postRechargeVCC } from "@/api/card";
import { useAccountStore } from "@/stores/account";
import { Format } from "@/utils/formatUtil";
import useFormRules from "@/hooks/useFormRules.js";
import { CARD_MODE_PHYSICAL, CARD_MODE_VIRTUAL } from "@/hooks/useCard";
import { useForm } from "@/hooks";
import Big from "big.js";

const accountStore = useAccountStore();
const props = defineProps({
  cardInfo: {
    type: Object,
    default: () => ({}),
  },
  topupMode: String,
});

const available = computed(() =>
  accountStore.availableBalance(rechargeState.currency)
);

const { AmountRule, SecurityPasswordRule, GoogleAuthCodeRule } = useFormRules({
  available,
});
const rechargeState = reactive({
  currency: "USDE",
  amount: 0,
  password: "",
  authCode: "",
});

const rules = reactive({
  amount: AmountRule,
  password: SecurityPasswordRule,
  authCode: GoogleAuthCodeRule,
});

const { handleValidate, validateInfos } = useForm(rechargeState, rules);

const btnLoading = ref(false);

const handleConfirm = async () => {
  const { values } = await handleValidate();
  if (values) {
    btnLoading.value = true;
    if (props.topupMode === CARD_MODE_PHYSICAL) {
      await postRecharge({ ...rechargeState, cardKey: props.cardInfo.cardKey });
    } else if (props.topupMode === CARD_MODE_VIRTUAL) {
      await postRechargeVCC({
        ...rechargeState,
        cardKey: props.cardInfo.cardKey,
      });
    }
    await accountStore.fetchWalletAccount();
    btnLoading.value = false;
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
  <div class="px-4">
    <a-form layout="vertical" :rules="rules">
      <a-form-item :label="$t('kc9q5L7zBW4hpYFxJwx6H')">
        <a-input
          autocomplete="off"
          disabled
          :placeholder="props.cardInfo.maskCardNo"
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
          :amount="Format(+fee)"
          :currency="rechargeState.currency"
        />
        <AmountLabel
          :title="$t('AhZ8ItHb7nCGWMqoQNgDa')"
          :amount="Format(+actualAmount)"
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
    </a-form>
  </div>
</template>
