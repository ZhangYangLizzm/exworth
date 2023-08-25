<script setup>
import CurrencySelect from "@/components/Select/CurrencySelect.vue";
import { getOtcRate, postCurrencyWithdraw } from "@/api/wallet";
import useFormRules from "@/hooks/useFormRules.js";
import AmountLabel from "@/components/AmountLabel.vue";
const { CurrencyRule, getAmountRule, NetworkRule, AddressRule, SecurityPasswordRule, GoogleAuthCodeRule } = useFormRules()
const step = ref(0);
const props = defineProps({
    initialCurrency: {
        type: String,
        required: true,
    },
});

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
onMounted(async () => {
    const res = await getOtcRate(withdrawState);
    Object.assign(walletInfo, res.content);
});
const AmountRule = computed(() => getAmountRule(walletInfo.balanceAmount))
const rules = reactive({
    currency: CurrencyRule,
    amount: AmountRule,
    network: NetworkRule,
    address: AddressRule,
});

const next = async () => {
    try {
        await validate();
        Object.assign(rules, {
            password: SecurityPasswordRule,
            authCode: GoogleAuthCodeRule
        });
        step.value++;
    } catch (e) {
        console.log(e);
    }
};
const prev = () => {
    step.value--;
};
const confirmResult = reactive({})
const confirmLoading = ref(false)
const handleConfirm = async () => {
    confirmLoading.value = true
    try {
        await validate();
        const res = await postCurrencyWithdraw({ ...withdrawState, type: "withdraw" })
        confirmLoading.value = false
        Object.assign(confirmResult, res.content)
        if (res.statusCode === 200) {
            step.value++
        }
    } catch (e) {
        confirmLoading.value = false
    }
};
const { resetFields, handleValidate, validateInfos, validate } = useForm(
    withdrawState,
    rules
);
const onCurrencyChange = async (value) => {
    const res = await getOtcRate(withdrawState);
    Object.assign(walletInfo, res.content);
}
</script>

<template>
    <div class="px-4">
        <a-steps :current="step">
            <a-step title="填寫提幣信息"> </a-step>
            <a-step title="確認提幣"></a-step>
            <a-step title="完成"></a-step>
        </a-steps>
        <div class="flex justify-center">
            <template v-if="step !== 2">
                <a-form layout="vertical" :rules="rules" class="mt-2 w-1/2">
                    <a-form-item label="提幣類型" required v-bind="validateInfos.currency">
                        <CurrencySelect v-model:currency="withdrawState.currency" :disabled="step"
                            @selectChange="onCurrencyChange" />
                    </a-form-item>
                    <a-form-item label="鏈名稱" v-bind="validateInfos.network">
                        <a-radio-group v-model:value="withdrawState.network" :disabled="step">
                            <a-radio-button v-for="chain in chainOptions" :key="chain" :value="chain">
                                {{ chain }}
                            </a-radio-button>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item class="flex flex-col gap-y-2" v-bind="validateInfos.amount">
                        <template #label>
                            <AmountLabel :title="t('-Q-u4nDHLreIjo2-6Z4MW')" :balanceAmount="walletInfo.balanceAmount"
                                :currency="withdrawState.currency" />
                        </template>
                        <a-input v-model:value="withdrawState.amount" :disabled="step" />
                        <div class="mt-2 text-gray-400">
                            <span>手續費:</span>
                            <span class="float-right">{{ walletInfo.fee }} {{ withdrawState.currency }}</span>
                        </div>
                        <div class="mt-2 text-gray-400">
                            <span>實際到帳:</span>
                            <span class="float-right">{{ walletInfo.receiptAmount }} {{ withdrawState.currency }}</span>
                        </div>
                    </a-form-item>
                    <a-form-item label="提幣地址" v-bind="validateInfos.address">
                        <a-input v-model:value="withdrawState.address" placeholder="請輸入提幣地址" :disabled="step" />
                    </a-form-item>
                    <a-form-item :label="$t('yj74dO9iA9rD0NRDm8h2n')" v-bind="validateInfos.password" v-if="step === 1">
                        <a-input-password :placeholder="$t('g-CkGyBqori4UAmxL4HS5')"
                            v-model:value="withdrawState.password" />
                    </a-form-item>
                    <a-form-item :label="$t('SlJFgfv49xSHi9mbjdw4e')" v-bind="validateInfos.authCode" v-if="step === 1">
                        <a-input-password :placeholder="$t('0A89nPyaGbq5-v9reFOzw')"
                            v-model:value="withdrawState.authCode" />
                    </a-form-item>
                </a-form>
            </template>
            <template v-else>
                <div class="flex flex-col items-center py-4 w-1/2">
                    <div class="flex justify-center items-center ">
                        <check-circle-two-tone class="text-3xl " two-tone-color="#37BF53" />
                        <span class="ml-2">提現中</span>
                    </div>
                    <div class="rounded w-full p-4 m-4 text-md bg-slate-50 text-center">
                        <p>扣除資產 : {{ confirmResult.dealAmount }}</p>
                        <p>手續費 : {{ confirmResult.fee }}</p>
                    </div>

                </div>
            </template>
        </div>
        <div class="flex justify-center gap-x-2">
            <a-button type="primary" @click="next" v-if="step === 0">下一步</a-button>
            <a-button type="primary" @click="prev" v-if="step === 1">上一步</a-button>
            <a-button type="primary" @click="handleConfirm" v-if="step === 1" :loading="confirmLoading">確認</a-button>
            <a-button type="primary" v-if="step === 2" @click="step = 0">再提一筆</a-button>
            <a-button @click="prev" v-if="step === 2">查看記錄</a-button>
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
    width: 100%
}
</style>
