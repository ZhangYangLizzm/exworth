<script setup>
import { postSetCode } from "@/api/setting";
import { useForm } from "@/libs/hooks/useForm";
import useFormRules from "@/hooks/useFormRules";
import { useSettingStore } from "@/stores/modules/setting";
const settingStore = useSettingStore();


const { t } = useI18n();

const formRef = ref();

const { SecurityPasswordRule, GoogleAuthCodeRule } = useFormRules()
const formState = reactive({
    withdrawPassword: undefined,
    confirm: undefined,
    authCode: undefined,
});
const compareToFirstPassword = async (_, value) => {
    if (value && value !== formState.withdrawPassword) {
        return Promise.reject(t("_i4wrqvdjvlH7txojo-Y6"));
    } else {
        return Promise.resolve();
    }
};

const rules = reactive({
    withdrawPassword: SecurityPasswordRule,
    confirm: [
        { required: true, message: t("8dRn48_9RTO6Q2804fgFp") },
        { validator: compareToFirstPassword },
    ],
    authCode: GoogleAuthCodeRule
})

const loading = ref(false);

const { handleValidate, validateInfos } = useForm(formState, rules);

const handleSubmit = async () => {
    const { values } = await handleValidate();
    if (values) {
        loading.value = true;
        const { statusCode } = await postSetCode({
            ...values,
        });
        if (statusCode === 200) {
            loading.value = false;
            settingStore.fetchConfig();
        }
    }
};
</script>

<template>
    <a-form :rules="rules" :ref="formRef" class="px-4 py-2" layout="vertical">
        <a-form-item v-bind="validateInfos.withdrawPassword" :label="t('yj74dO9iA9rD0NRDm8h2n')">
            <a-input-password :placeholder="t('AkYvt09TzAKTkYL1On_p3')" v-model:value="formState.withdrawPassword">
            </a-input-password>
        </a-form-item>
        <a-form-item v-bind="validateInfos.confirm" :label="t('vIf00-9pMhlLRdqg_iRi1')">
            <a-input-password :placeholder="t('vIf00-9pMhlLRdqg_iRi1')" v-model:value="formState.confirm">
            </a-input-password>
        </a-form-item>

        <a-form-item :label="$t('SlJFgfv49xSHi9mbjdw4e')" v-bind="validateInfos.authCode">
            <a-input-password :placeholder="$t('RN0u-0ie4LuZ1u5aetix9')" v-model:value="formState.authCode" />
        </a-form-item>

        <div class="flex justify-center items-center">
            <a-button type="primary" @click="handleSubmit" :loading="loading">
                {{ $t("jLzFLAlFFSK9y4A-QE8Ye") }}
            </a-button>
        </div>
    </a-form>
</template>
