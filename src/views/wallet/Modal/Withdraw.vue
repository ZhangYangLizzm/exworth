<script setup>
import CurrencySelect from "@/components/Select/CurrencySelect.vue";
import { Format } from "@/libs/hooks/useUtil.js";
import { getOtcRate, postCurrencyWithdraw } from "@/api/wallet";
import useFormRules from "@/hooks/useFormRules.js";
import { useAccountStore } from "@/stores/modules/accounts.js";
const STEP_INIT = 0;
const STEP_CONFIRM = 1;
const STEP_RESULT = 2;
const accountStore = useAccountStore();
const {
  CurrencyRule,
  getAmountRule,
  NetworkRule,
  AddressRule,
  SecurityPasswordRule,
  GoogleAuthCodeRule,
} = useFormRules();
const step = ref(0);
const props = defineProps({
  initialCurrency: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const chainOptions = computed(() => ["TRC20", "ERC20"]);
const { t } = useI18n();
const withdrawState = reactive({
  currency: props.initialCurrency,
  network: "TRC20",
  amount: 100,
  address: undefined,
  password: undefined,
  authCode: undefined,
});
const walletInfo = reactive({});
const fetchOtcRate = async () => {
  const res = await getOtcRate(withdrawState);
  Object.assign(walletInfo, res.content);
};
onMounted(async () => {
  fetchOtcRate();
});
const AmountRule = computed(() => getAmountRule(walletInfo.balanceAmount));
const rules = reactive({
  currency: CurrencyRule,
  amount: AmountRule,
  network: NetworkRule,
  address: AddressRule,
});

const next = async () => {
  await validate();
  Object.assign(rules, {
    password: SecurityPasswordRule,
    authCode: GoogleAuthCodeRule,
  });
  step.value++;
};
const prev = () => {
  delete rules.password;
  delete rules.authCode;
  step.value--;
};
const confirmResult = reactive({});

const { resetFields, handleValidate, validateInfos, validate } = useForm(
  withdrawState,
  rules
);
const confirmLoading = ref(false);

const handleConfirm = async () => {
  const { values } = await handleValidate()
  if (values) {
    confirmLoading.value = true
    const res = await postCurrencyWithdraw({ ...withdrawState, type: "withdraw" });
    confirmLoading.value = false;
    if (res.statusCode === 200) {
      Object.assign(confirmResult, res.content);
      await accountStore.fetchWalletAccount();
      step.value++;
    }
  }
};

const onCurrencyChange = async () => {
  const res = await getOtcRate(withdrawState);
  Object.assign(walletInfo, res.content);
};
const emit = defineEmits(["close"]);
const onView = () => {
  emit("close");
  router.push({ name: "WithdrawHistory", params: {} });
};
</script>

<template>
  <div class="px-4">
    <a-steps :current="step">
      <a-step :title="t('B1ftJdtGLf6xSUi3t2p7r')"> </a-step>
      <a-step :title="t('oyDbxcO8c-ULaGfjTH3ow')"></a-step>
      <a-step :title="t('ndAUMg4ukM6GeAPDbOXC-')"></a-step>
    </a-steps>
    <div class="flex justify-center">
      <template v-if="step !== STEP_RESULT">
        <a-form layout="vertical" :rules="rules" class="mt-2 w-1/2">
          <a-form-item :label="t('uvkFcBBBuvd5CdyItcTYp')" required v-bind="validateInfos.currency">
            <CurrencySelect :walletAccounts="accountStore.walletAccounts" v-model:currency="withdrawState.currency"
              :disabled="step" @selectChange="onCurrencyChange" />
          </a-form-item>
          <a-form-item :label="t('MSer02pUVq2JGDAxQxERb')" v-bind="validateInfos.network">
            <a-radio-group v-model:value="withdrawState.network" :disabled="step">
              <a-radio-button v-for="chain in chainOptions" :key="chain" :value="chain">
                {{ chain }}
              </a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item class="flex flex-col gap-y-2" v-bind="validateInfos.amount">
            <template #label>
              <AmountLabel :title="t('-Q-u4nDHLreIjo2-6Z4MW')" :balanceAmount="Format(walletInfo.balanceAmount)"
                :currency="withdrawState.currency" />
            </template>
            <a-input autocomplete="off" v-model:value="withdrawState.amount" :disabled="step" @change="fetchOtcRate" />
            <div class="mt-2 text-gray-400">
              <span>{{ t("Q_l0QsgefHPkwvxse3yaA") }}:</span>
              <span class="float-right">{{ walletInfo.fee }} {{ withdrawState.currency }}</span>
            </div>
            <div class="mt-2 text-gray-400">
              <span>{{ t("AhZ8ItHb7nCGWMqoQNgDa") }}:</span>
              <span class="float-right">{{ walletInfo.receiptAmount }} {{ withdrawState.currency }}</span>
            </div>
          </a-form-item>
          <a-form-item :label="t('vURu3r49iRvVFMlYEC5Gg')" v-bind="validateInfos.address">
            <a-input autocomplete="off" v-model:value="withdrawState.address" :placeholder="t('OGq2FiMO8fYn0FBusYtRz')"
              :disabled="step" />
          </a-form-item>
          <a-form-item :label="$t('yj74dO9iA9rD0NRDm8h2n')" v-bind="validateInfos.password" v-if="step === 1">
            <a-input-password :placeholder="$t('g-CkGyBqori4UAmxL4HS5')" v-model:value="withdrawState.password" />
          </a-form-item>
          <a-form-item :label="$t('SlJFgfv49xSHi9mbjdw4e')" v-bind="validateInfos.authCode" v-if="step === 1">
            <a-input-password :placeholder="$t('0A89nPyaGbq5-v9reFOzw')" v-model:value="withdrawState.authCode" />
          </a-form-item>
        </a-form>
      </template>
      <template v-else>
        <div class="flex flex-col items-center py-4 w-2/3">
          <div class="flex justify-center items-center">
            <check-circle-two-tone class="text-3xl" two-tone-color="#37BF53" />
            <span class="ml-2">{{ t("qvT3UQtygmHRlM616X5rh") }}</span>
          </div>
          <div class="rounded w-full p-4 m-4 text-md bg-slate-50">
            <p>
              {{ t("CiN3_LpKa2dGv99rkld0l", { dealAmount: confirmResult.dealAmount }) }}
              {{ withdrawState.currency }}
            </p>
            <p>
              {{ t("ZRqUQYGeMW9mdJidJSS69", { fee: confirmResult.fee }) }}
              {{ withdrawState.currency }}
            </p>
            <p>
              {{
                t("AhZ8ItHb7nCGWMqoQNgDt", { actualAmount: confirmResult.actualAmount })
              }}
              {{ withdrawState.currency }}
            </p>
            <p>{{ t("hlhSxU0JK4TJ4kP_-lBzh", { address: withdrawState.address }) }}</p>
          </div>
        </div>
      </template>
    </div>
    <div class="flex justify-center gap-x-2">
      <a-button type="primary" @click="next" v-if="step === STEP_INIT">{{
        t("SHwfMHPgueW7ATn2nN332")
      }}</a-button>
      <a-button @click="prev" v-if="step === STEP_CONFIRM">{{
        t("c0ShiFkw3869sTmgT4xwe")
      }}</a-button>
      <a-button type="primary" @click="handleConfirm" v-if="step === STEP_CONFIRM" :loading="confirmLoading">{{
        t("utkQ-uv-4gXBHkFXvGL5u") }}</a-button>
      <a-button type="primary" v-if="step === STEP_RESULT" @click="step = STEP_INIT">{{
        t("TK_RAyPkWgdIN3oBxXG2o")
      }}</a-button>
      <a-button @click="onView" v-if="step === STEP_RESULT">{{
        t("Qf7LLz2Qtk3OdMvNmJs_2")
      }}</a-button>
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

:deep(.ant-form-item-required) {
  width: 100%;
}
</style>
